# Cart System - Quick Start Guide

## 🚀 Getting Started

The cart system is now fully integrated! Here's how to use it:

## 📍 Accessing the Cart

### From Home Page
When items are in cart, a floating button appears at the bottom:
```
┌─────────────────┐
│ 🛒 購物車(2)   │ ← Click to open cart
└─────────────────┘
```

### From Store Detail Page
Cart button is always visible at the bottom (even when empty):
```
┌─────────────────┐
│ 🛒 購物車(5)   │ ← Click to open cart
└─────────────────┘
```

### From Cart Page
Back button (←) returns to previous page

## ➕ Adding Items to Cart

### Step 1: Select a Drink
- On Store Detail page, click any menu item
- Drink detail modal opens

### Step 2: Customize
- Select size (大杯 or 特大杯)
- Choose sugar level (正常甜, 少糖, 半糖, 微糖, 無糖)
- Choose ice level (正常冰, 少冰, 微冰, 去冰, 熱)
- Adjust quantity (+/-)

### Step 3: Add to Cart
- Click "加入訂單" button
- Modal closes
- Item added to cart
- Cart count increases

## 🛒 Cart Page Features

### Cart Items
Each item shows:
- Product image
- Drink name
- Customizations (size, sugar, ice)
- Price
- Quantity adjuster (green pill with +/-)

### Store Sections
Items grouped by store:
```
┌────────────────────────────────┐
│ 🏪 Store Name         250m  ▶ │ ← Clickable
│                                │
│ [Item 1]                       │
│ [Item 2]                       │
│                                │
│ + 新增餐點                     │ ← Add more from this store
└────────────────────────────────┘
```

### Options
- **運送方式**: Self-pickup (自取)
- **行銷優惠**: Marketing offers
- **塑膠袋**: Plastic bag option
- **發票**: Invoice (手機載具)
- **Payment**: iCash 5830

### Bottom Action Bar
```
總金額                     $275
┌──────────────────────────────┐
│       前往結帳               │ ← Checkout button
└──────────────────────────────┘
```

## ➖➕ Adjusting Quantities

### Increase Quantity
Click the **+** button:
- Quantity increases by 1
- Price updates automatically
- No maximum limit

### Decrease Quantity
Click the **-** button:
- Quantity decreases by 1
- Price updates automatically
- Item removed when quantity reaches 0

### Quantity Display
```
┌─────────────┐
│  -  2  +   │ ← Green pill (#00704a)
└─────────────┘
   ↑  ↑  ↑
   │  │  └─ Increase
   │  └──── Current quantity
   └─────── Decrease (removes at 0)
```

## 🗑️ Removing Items

### Method 1: Decrease to Zero
1. Click **-** button repeatedly
2. When quantity reaches 0
3. Item automatically removed

### Method 2: Future Enhancement
(Swipe to delete - to be implemented)

## 💰 Price Calculation

### Automatic Updates
- Total price shown at bottom
- Updates instantly when:
  - Adding items
  - Removing items
  - Changing quantities

### Formula
```
Total = Item1_Price × Item1_Qty 
      + Item2_Price × Item2_Qty 
      + ...
```

## 🏪 Multiple Stores

### Smart Grouping
Items from different stores are automatically grouped:

```
┌─────────────────────────────┐
│ 🏪 不可思議茶bar             │
│ [Item 1]                    │
│ [Item 2]                    │
│ + 新增餐點                  │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🏪 CITY PRIMA               │
│ [Item 3]                    │
│ + 新增餐點                  │
└─────────────────────────────┘
```

Each store section:
- Shows store name and distance
- Lists all items from that store
- Has "Add more items" button

## 🎯 Common Actions

### View Cart
**From anywhere**: Click cart button → Navigate to `/cart`

### Add Item
**From store**: Click menu item → Customize → Add to cart

### Update Quantity
**In cart**: Use +/- buttons on item

### Remove Item
**In cart**: Click - until quantity = 0

### Continue Shopping
**From cart**: Click back (←) or store name or "新增餐點"

### Checkout
**From cart**: Click "前往結帳" (when items exist)

## 🔄 Navigation Flow

```
Home
  ↓ (Click store card)
Store Detail
  ↓ (Click menu item)
Drink Modal
  ↓ (Add to cart)
Cart (via cart button)
  ↓ (Click checkout)
Checkout (future)
```

## 📱 Cart Button States

### Home Page
- **Hidden**: When cart is empty
- **Visible**: When cart has items
- **Shows count**: "購物車(3)"

### Store Detail
- **Always visible**: Even when empty
- **Shows count**: "購物車(0)" or "購物車(5)"

### Cart Page
- **No cart button**: You're already there!
- **Back button instead**: Returns to previous page

## 🎨 Visual States

### Empty Cart
```
     🛒 (gray)
  購物車是空的
去添加一些美味的飲料吧！
```

**Note**: When empty, delivery options and all option sections are hidden.

### Cart with Items
```
┌──────────────────────┐
│ 🏪 Store Name        │
│ [Item 1]             │
│ [Item 2]             │
│ + 新增餐點           │
└──────────────────────┘

總金額           $275
[前往結帳]
```

### Checkout Button
- **Enabled**: Black background, white text
- **Disabled**: Gray background, gray text
- **State**: Enabled when cart has items

## ⚡ Quick Tips

### Tip 1: Fast Add
Click product → Adjust options → Add
(Takes ~5 seconds)

### Tip 2: Bulk Add
Stay on store page, add multiple items before viewing cart

### Tip 3: Store Switch
Can order from multiple stores in one cart

### Tip 4: Quick Remove
Instead of multiple clicks, hold - button (future feature)

### Tip 5: Review Before Checkout
Always check quantities and customizations before checkout

## 🛠️ For Developers

### Use Cart Context
```jsx
import { useCart } from '../context/CartContext';

function MyComponent() {
  const {
    cartItems,       // All items
    addToCart,       // Add item
    updateQuantity,  // Update quantity
    removeFromCart,  // Remove item
    getTotalPrice,   // Get total
    getTotalItems,   // Get count
    getItemsByStore  // Group by store
  } = useCart();
}
```

### Add to Cart
```jsx
const order = {
  drink: drinkObject,
  quantity: 2,
  size: 'large',
  sugar: 'half',
  ice: 'normal',
  totalPrice: 320,
  storeName: 'Store Name'
};

addToCart(order);
```

### Navigate to Cart
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/cart');
```

## 📊 Data Structure

### Cart Item
```javascript
{
  cartId: 1707234567890.123,  // Unique ID
  drink: {
    id: 1,
    name: "冰甜杏凍金培烏龍",
    price: 160,
    image: "url",
    category: "tea-bar"
  },
  quantity: 2,
  size: "extra-large",
  sugar: "half",
  ice: "normal",
  totalPrice: 320,  // price × quantity
  storeName: "不可思議茶bar",
  addedAt: Date object
}
```

## 🧪 Testing

### Test 1: Add Item
1. Go to Store Detail
2. Click menu item
3. Customize and add
4. ✅ Cart count increases
5. ✅ Cart button appears (Home)

### Test 2: View Cart
1. Click cart button
2. ✅ Navigate to /cart
3. ✅ Items displayed correctly

### Test 3: Update Quantity
1. In cart, click +
2. ✅ Quantity increases
3. ✅ Total updates
4. Click -
5. ✅ Quantity decreases

### Test 4: Remove Item
1. Click - until 0
2. ✅ Item removed
3. ✅ Total updates

### Test 5: Empty Cart
1. Remove all items
2. ✅ Empty message shows
3. ✅ Checkout disabled

## 🎯 User Stories

### Story 1: First-time User
"I want to add a drink to my cart"
1. Open store detail
2. Click menu item
3. Customize drink
4. Add to cart
5. ✅ Success feedback

### Story 2: Multiple Items
"I want to order multiple drinks"
1. Add first drink
2. Add second drink
3. Add third drink
4. Open cart
5. ✅ All items visible

### Story 3: Change Mind
"I want to change quantity"
1. Open cart
2. Adjust quantities with +/-
3. ✅ Instant updates

### Story 4: Review Order
"I want to review before checkout"
1. Open cart
2. See all items
3. Check customizations
4. Verify total
5. Click checkout
6. ✅ Ready to order

## 🔍 Troubleshooting

### Cart button not showing?
✅ Add at least one item to cart

### Can't click checkout?
✅ Cart must have at least one item

### Total price wrong?
✅ Each item price × quantity is summed

### Items not grouped by store?
✅ Automatic - ensure storeName is set

### Can't remove item?
✅ Click - button until quantity = 0

## 🎁 Coming Soon

- [ ] Edit item customizations
- [ ] Swipe to delete
- [ ] Save for later
- [ ] Favorites
- [ ] Order history
- [ ] Promo codes
- [ ] Delivery options
- [ ] Payment integration
- [ ] Order tracking

---

**Quick Start Guide**  
**Cart System v1.3.0**  
**Updated**: February 6, 2026  

🎉 **Enjoy your shopping experience!**
