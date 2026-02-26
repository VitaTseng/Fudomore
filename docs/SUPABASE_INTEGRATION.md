# Supabase Integration Guide

**Version**: 1.5.0  
**Updated**: February 6, 2026

This guide provides the complete database schema and integration plan for connecting Fudomore to Supabase.

---

## Table of Contents

1. [Database Schema](#database-schema)
2. [Setup Instructions](#setup-instructions)
3. [Frontend Integration](#frontend-integration)
4. [API Hooks](#api-hooks)
5. [Migration from Mock Data](#migration-from-mock-data)
6. [Testing](#testing)

---

## Database Schema

### Core Tables

#### 1. Brands
```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT,
  logo_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. Stores (with Geolocation)
```sql
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT,
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT) NOT NULL, -- PostGIS for distance calculations
  phone TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  estimated_prep_time TEXT, -- e.g., "10-15分鐘"
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Index for distance queries
CREATE INDEX idx_stores_location ON stores USING GIST(location);
```

#### 3. Store Categories (Tags)
```sql
CREATE TABLE store_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  category_name TEXT NOT NULL, -- '#咖啡', '#手搖茶', etc.
  UNIQUE(store_id, category_name)
);
```

#### 4. Menu Categories
```sql
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- 'tea-bar', 'coffee', 'fresh-tea'
  display_name TEXT NOT NULL, -- '茶 Bar', '咖啡', '現萃茶'
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. Menu Items
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  calories INTEGER,
  is_available BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 6. Variation Types
```sql
CREATE TABLE variation_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- 'size', 'sugar', 'ice'
  display_name TEXT NOT NULL, -- '容量', '甜度', '冰塊'
  display_order INTEGER DEFAULT 0
);

-- Insert default variation types
INSERT INTO variation_types (name, display_name, display_order) VALUES
  ('size', '容量', 1),
  ('sugar', '甜度', 2),
  ('ice', '冰塊', 3);
```

#### 7. Item Variations
```sql
CREATE TABLE item_variations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variation_type_id UUID REFERENCES variation_types(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  value TEXT NOT NULL, -- 'large', 'half-sugar', 'hot'
  display_name TEXT NOT NULL, -- '大杯', '半糖', '熱'
  price_adjustment DECIMAL(10,2) DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  UNIQUE(variation_type_id, menu_item_id, value)
);
```

#### 8. Users (phone-based accounts)

Visitors create an account by entering their phone number when placing an order (Order Confirmation page). The app gets or creates a row in `public.users` and attaches the order to that user. Current user is stored in localStorage so Order History and Active Order show their data.

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

To add this table and point `orders.user_id` to it (instead of `auth.users`), run the migration in **`docs/supabase_migrations/002_users_and_orders_user_id.sql`** in the Supabase SQL Editor.

#### 9. Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  store_id UUID REFERENCES stores(id) ON DELETE SET NULL,
  
  -- Order identification
  order_number TEXT UNIQUE NOT NULL,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending',
  -- Values: 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'
  
  -- Pricing
  subtotal DECIMAL(10,2) NOT NULL,
  service_fee DECIMAL(10,2) DEFAULT 5,
  discount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Pickup/Delivery
  pickup_method TEXT DEFAULT 'self-pickup',
  pickup_time_start TIME,
  pickup_time_end TIME,
  estimated_ready_at TIMESTAMP WITH TIME ZONE,
  
  -- Payment
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  invoice_type TEXT,
  invoice_number TEXT,
  
  -- Notes
  customer_note TEXT,
  
  -- Timestamps
  ordered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  preparing_at TIMESTAMP WITH TIME ZONE,
  ready_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 10. Order Items
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  
  -- Snapshot of item at order time
  item_name TEXT NOT NULL,
  item_image_url TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  
  -- Selected variations
  variations JSONB, -- {"size": "large", "sugar": "half", "ice": "hot"}
  variation_display JSONB, -- {"size": "大杯", "sugar": "半糖", "ice": "熱"}
  variation_price DECIMAL(10,2) DEFAULT 0,
  
  -- Pricing
  item_total DECIMAL(10,2) NOT NULL,
  
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 11. Order Status History
```sql
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL
);
```
(After running `002_users_and_orders_user_id.sql`, the FK is updated from `auth.users` to `public.users`.)

---

## Database Functions

### 1. Get Stores by Distance
```sql
CREATE OR REPLACE FUNCTION get_stores_by_distance(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  max_distance_meters INTEGER DEFAULT 5000
)
RETURNS TABLE (
  id UUID,
  brand_id UUID,
  name TEXT,
  image_url TEXT,
  address TEXT,
  rating DECIMAL,
  estimated_prep_time TEXT,
  distance_meters INTEGER,
  walk_time TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.brand_id,
    s.name,
    s.image_url,
    s.address,
    s.rating,
    s.estimated_prep_time,
    CAST(
      ST_Distance(
        s.location,
        ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
      ) AS INTEGER
    ) AS distance_meters,
    CASE 
      WHEN CAST(ST_Distance(s.location, ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography) AS INTEGER) < 200 
        THEN '🚶 2分鐘'
      WHEN CAST(ST_Distance(s.location, ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography) AS INTEGER) < 400 
        THEN '🚶 4分鐘'
      ELSE '🚶 6分鐘'
    END AS walk_time
  FROM stores s
  WHERE s.is_active = true
    AND ST_DWithin(
      s.location,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
      max_distance_meters
    )
  ORDER BY distance_meters ASC;
END;
$$ LANGUAGE plpgsql;
```

### 2. Generate Order Number
```sql
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  order_date TEXT;
  order_count INTEGER;
BEGIN
  order_date := TO_CHAR(NOW(), 'YYYYMMDD');
  
  SELECT COUNT(*) + 1 INTO order_count
  FROM orders
  WHERE ordered_at::DATE = CURRENT_DATE;
  
  RETURN 'ORD-' || order_date || '-' || LPAD(order_count::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate order number
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();
```

### 3. Track Order Status Changes
```sql
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    -- Log status change
    INSERT INTO order_status_history (order_id, status, created_by)
    VALUES (NEW.id, NEW.status, auth.uid());
    
    -- Update timestamp based on status
    CASE NEW.status
      WHEN 'confirmed' THEN NEW.confirmed_at := NOW();
      WHEN 'preparing' THEN NEW.preparing_at := NOW();
      WHEN 'ready' THEN NEW.ready_at := NOW();
      WHEN 'completed' THEN NEW.completed_at := NOW();
      WHEN 'cancelled' THEN NEW.cancelled_at := NOW();
      ELSE NULL;
    END CASE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_order_status
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION log_order_status_change();
```

---

## Row Level Security (RLS)

When using **phone-based users** (no Supabase Auth), run `docs/supabase_migrations/002_users_and_orders_user_id.sql` instead of the policies below; that migration adds `public.users`, points `orders.user_id` to it, and sets RLS so anon can SELECT/INSERT on `users` and on `orders`.

If using Supabase Auth only (no phone-based flow):

```sql
-- Enable RLS on all tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

-- Orders: Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Public read for stores and menu
CREATE POLICY "Anyone can view active stores" ON stores
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view available menu items" ON menu_items
  FOR SELECT USING (is_available = true);

CREATE POLICY "Anyone can view menu categories" ON menu_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view variations" ON item_variations
  FOR SELECT USING (true);
```

---

## Frontend Integration

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
```

### 2. Environment Variables

Create `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Create Supabase Client

```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 4. Create Data Hooks

#### useStores Hook
```javascript
// src/hooks/useStores.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useStores = (userLocation) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase.rpc('get_stores_by_distance', {
          user_lat: userLocation.lat,
          user_lng: userLocation.lng,
          max_distance_meters: 5000
        });

        if (error) throw error;
        
        // Fetch categories for each store
        const storeIds = data.map(s => s.id);
        const { data: categoriesData } = await supabase
          .from('store_categories')
          .select('*')
          .in('store_id', storeIds);

        // Group categories by store
        const categoryMap = {};
        categoriesData?.forEach(cat => {
          if (!categoryMap[cat.store_id]) categoryMap[cat.store_id] = [];
          categoryMap[cat.store_id].push(cat.category_name);
        });

        // Add categories to stores
        const storesWithCategories = data.map(store => ({
          ...store,
          badges: categoryMap[store.id] || [],
          distance: `${store.distance_meters}m`,
          walkTime: store.walk_time
        }));
        
        setStores(storesWithCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userLocation) {
      fetchStores();
    }
  }, [userLocation]);

  return { stores, loading, error };
};
```

#### useMenuItems Hook
```javascript
// src/hooks/useMenuItems.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useMenuItems = (storeId) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('menu_categories')
          .select('*')
          .eq('store_id', storeId)
          .eq('is_active', true)
          .order('display_order');

        setCategories(categoriesData || []);

        // Fetch menu items with variations
        const { data: itemsData } = await supabase
          .from('menu_items')
          .select(`
            *,
            category:menu_categories(id, name, display_name),
            variations:item_variations(
              id,
              value,
              display_name,
              price_adjustment,
              is_default,
              type:variation_types(name, display_name)
            )
          `)
          .eq('store_id', storeId)
          .eq('is_available', true)
          .order('display_order');

        // Group variations by type for each item
        const processedItems = itemsData?.map(item => {
          const variationsByType = {};
          item.variations?.forEach(v => {
            const typeName = v.type.name;
            if (!variationsByType[typeName]) {
              variationsByType[typeName] = {
                displayName: v.type.display_name,
                options: []
              };
            }
            variationsByType[typeName].options.push({
              value: v.value,
              display: v.display_name,
              priceAdjustment: v.price_adjustment,
              isDefault: v.is_default
            });
          });

          return {
            ...item,
            variationsByType
          };
        });

        setMenuItems(processedItems || []);
      } catch (err) {
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchMenu();
    }
  }, [storeId]);

  return { menuItems, categories, loading };
};
```

#### useOrders Hook
```javascript
// src/hooks/useOrders.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useUserOrders = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            store:stores(id, name, image_url, address, phone),
            items:order_items(*)
          `)
          .eq('user_id', userId)
          .order('ordered_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
      
      // Real-time subscription
      const subscription = supabase
        .channel('user_orders')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
            filter: `user_id=eq.${userId}`
          },
          () => fetchOrders()
        )
        .subscribe();

      return () => subscription.unsubscribe();
    }
  }, [userId]);

  return { orders, loading };
};

export const useOrderStatus = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          store:stores(*),
          items:order_items(*)
        `)
        .eq('id', orderId)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
      } else {
        setOrder(data);
      }
      setLoading(false);
    };

    if (orderId) {
      fetchOrder();

      // Real-time updates for this order
      const subscription = supabase
        .channel(`order_${orderId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `id=eq.${orderId}`
          },
          (payload) => {
            setOrder(payload.new);
          }
        )
        .subscribe();

      return () => subscription.unsubscribe();
    }
  }, [orderId]);

  return { order, loading };
};
```

### 5. Order Service

```javascript
// src/services/orderService.js
import { supabase } from '../lib/supabase';

export const createOrder = async ({ userId, storeId, items, orderData }) => {
  try {
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
    const serviceFee = 5;
    const total = subtotal + serviceFee;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        store_id: storeId,
        subtotal,
        service_fee: serviceFee,
        total_amount: total,
        pickup_method: orderData.pickupMethod || 'self-pickup',
        pickup_time_start: orderData.pickupTimeStart,
        pickup_time_end: orderData.pickupTimeEnd,
        payment_method: orderData.paymentMethod,
        invoice_type: orderData.invoiceType,
        invoice_number: orderData.invoiceNumber,
        customer_note: orderData.customerNote,
        estimated_ready_at: new Date(Date.now() + 15 * 60 * 1000) // 15 min from now
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      menu_item_id: item.menuItemId,
      item_name: item.name,
      item_image_url: item.image,
      base_price: item.basePrice,
      quantity: item.quantity,
      variations: item.variations,
      variation_display: item.variationDisplay,
      variation_price: item.variationPrice || 0,
      item_total: item.itemTotal,
      special_instructions: item.specialInstructions
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { success: true, order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

---

## Migration from Mock Data

### Step 1: Update Home.jsx

Replace mock data:
```javascript
// Before
const STORE_DATA = [/* hardcoded */];

// After
import { useStores } from '../hooks/useStores';

const [userLocation] = useState({ lat: 25.0330, lng: 121.5654 });
const { stores, loading } = useStores(userLocation);
```

### Step 2: Update StoreDetail.jsx

```javascript
// Before
const MENU_ITEMS = [/* hardcoded */];

// After
import { useMenuItems } from '../hooks/useMenuItems';

const { menuItems, categories, loading } = useMenuItems(id);
```

### Step 3: Update OrderStatus.jsx

```javascript
// Before
const [order, setOrder] = useState({/* mock data */});

// After
import { useOrderStatus } from '../hooks/useOrders';

const { order, loading } = useOrderStatus(orderId);
```

### Step 4: Update OrderHistory.jsx

```javascript
// Before
const [orders] = useState([/* mock data */]);

// After
import { useUserOrders } from '../hooks/useOrders';

const { orders, loading } = useUserOrders(userId);
```

---

## Data Seeding

### Sample Data

```sql
-- Insert Brands
INSERT INTO brands (id, name, logo_url) VALUES
  ('brand-1', '不可思議', 'https://...'),
  ('brand-2', 'CITY PRIMA', 'https://...');

-- Insert Stores (Taipei coordinates)
INSERT INTO stores (id, brand_id, name, image_url, address, location, phone, rating, estimated_prep_time) VALUES
  (
    'store-1',
    'brand-1',
    '不可思議茶bar 7-ELEVEn 總部門市',
    'https://...',
    '台北市內湖區石潭路',
    ST_SetSRID(ST_MakePoint(121.5654, 25.0330), 4326)::geography,
    '02-1234-5678',
    4.8,
    '10-15分鐘'
  );

-- Insert Store Categories
INSERT INTO store_categories (store_id, category_name) VALUES
  ('store-1', '#咖啡'),
  ('store-1', '#手搖茶');

-- Insert Menu Categories
INSERT INTO menu_categories (id, store_id, name, display_name, display_order) VALUES
  ('cat-1', 'store-1', 'tea-bar', '茶 Bar', 1),
  ('cat-2', 'store-1', 'fresh-tea', '現萃茶', 2),
  ('cat-3', 'store-1', 'coffee', '咖啡', 3);

-- Insert Menu Items
INSERT INTO menu_items (id, store_id, category_id, name, image_url, base_price, calories) VALUES
  (
    'item-1',
    'store-1',
    'cat-1',
    '冰甜杏凍金培烏龍',
    'https://...',
    160,
    85
  );

-- Insert Variations
INSERT INTO item_variations (menu_item_id, variation_type_id, value, display_name, price_adjustment, is_default) VALUES
  -- Size options
  ('item-1', (SELECT id FROM variation_types WHERE name = 'size'), 'large', '大杯', 0, true),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'size'), 'extra-large', '特大杯', 20, false),
  
  -- Sugar options
  ('item-1', (SELECT id FROM variation_types WHERE name = 'sugar'), 'normal', '正常甜', 0, true),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'sugar'), 'less', '少糖', 0, false),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'sugar'), 'half', '半糖', 0, false),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'sugar'), 'light', '微糖', 0, false),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'sugar'), 'none', '無糖', 0, false),
  
  -- Ice options
  ('item-1', (SELECT id FROM variation_types WHERE name = 'ice'), 'hot', '熱', 0, false),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'ice'), 'normal', '正常冰', 0, true),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'ice'), 'less', '少冰', 0, false),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'ice'), 'light', '微冰', 0, false),
  ('item-1', (SELECT id FROM variation_types WHERE name = 'ice'), 'none', '去冰', 0, false);
```

---

## Real-time Updates

### Subscribe to Order Status Changes

```javascript
// In OrderStatus.jsx
useEffect(() => {
  const subscription = supabase
    .channel(`order_${orderId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`
      },
      (payload) => {
        setOrder(payload.new);
        
        // Show notification for status changes
        if (payload.new.status === 'ready') {
          showNotification('您的餐點已經準備好了！');
        }
      }
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, [orderId]);
```

---

## Testing Queries

### Test Distance Query
```sql
-- Find stores near Taipei 101
SELECT * FROM get_stores_by_distance(25.0330, 121.5654, 5000);
```

### Test Menu Query
```sql
-- Get full menu for a store
SELECT 
  mi.*,
  mc.display_name as category_name,
  json_agg(
    json_build_object(
      'type', vt.display_name,
      'value', iv.display_name,
      'price', iv.price_adjustment
    )
  ) as variations
FROM menu_items mi
LEFT JOIN menu_categories mc ON mi.category_id = mc.id
LEFT JOIN item_variations iv ON iv.menu_item_id = mi.id
LEFT JOIN variation_types vt ON iv.variation_type_id = vt.id
WHERE mi.store_id = 'store-1'
GROUP BY mi.id, mc.display_name;
```

### Test Order Creation
```sql
-- Create test order
INSERT INTO orders (user_id, store_id, subtotal, service_fee, total_amount)
VALUES (auth.uid(), 'store-1', 270, 5, 275)
RETURNING *;
```

---

## Performance Optimizations

### 1. Indexes
```sql
-- Common query patterns
CREATE INDEX idx_menu_items_store_category ON menu_items(store_id, category_id);
CREATE INDEX idx_orders_user_status_date ON orders(user_id, status, ordered_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

### 2. Materialized Views (Optional)
```sql
-- For frequently accessed store data
CREATE MATERIALIZED VIEW store_summary AS
SELECT 
  s.*,
  COUNT(DISTINCT mi.id) as menu_count,
  array_agg(DISTINCT sc.category_name) as categories
FROM stores s
LEFT JOIN menu_items mi ON mi.store_id = s.id
LEFT JOIN store_categories sc ON sc.store_id = s.id
GROUP BY s.id;

CREATE INDEX ON store_summary(id);

-- Refresh periodically
REFRESH MATERIALIZED VIEW store_summary;
```

---

## Summary

### Implementation Checklist

**Database Setup**:
- [ ] Create Supabase project
- [ ] Run schema SQL
- [ ] Set up RLS policies
- [ ] Create database functions
- [ ] Seed initial data

**Frontend Integration**:
- [ ] Install Supabase client
- [ ] Create hooks (useStores, useMenuItems, useOrders)
- [ ] Update pages to use hooks
- [ ] Implement order creation
- [ ] Add real-time subscriptions

**Testing**:
- [ ] Test store queries with distance
- [ ] Test menu fetching
- [ ] Test order creation
- [ ] Test order status updates
- [ ] Test real-time updates

---

**Ready to integrate Supabase!**  
Follow the steps above to replace mock data with real database queries.

**Phone-based users:** Current user is determined by phone number entered at first order (Order Confirmation) and stored in localStorage (`fudomore_user_id`). Order History and Active Order use this user id to show that user's orders.
