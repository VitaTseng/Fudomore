# Fudomore - Features Documentation

**Last Updated**: February 6, 2026  
**Version**: 1.4.0

---

## Overview

This document is the single source of truth for all implemented features in Fudomore. Each feature includes implementation details, file locations, and usage instructions.

---

## Table of Contents

1. [Home Page](#home-page)
2. [Active Order Card](#active-order-card)
3. [Order Detail Modal](#order-detail-modal)
4. [Store Detail](#store-detail)
5. [Drink Customization Modal](#drink-customization-modal)
6. [Shopping Cart](#shopping-cart)
7. [Order Confirmation](#order-confirmation)
8. [Order Status](#order-status)
9. [Order History](#order-history)
10. [Design System](#design-system)

---

## Home Page

**Route**: `/`  
**Status**: ✅ Complete  
**Theme**: Light  
**Version**: v1.7.3 - Buy Again Feature

### Features
- **Buy Again** ("再點一次") - Reorder previous orders with one click
- **Active Order Card** - Shows current order status (floating at top)
- **Popular Brands** ("熱門品牌") - Featured brand logos
- **Nearby Stores** ("附近店家") - Store listings with filtering
- Category filtering (coffee, tea, fruit tea, milk tea)
- Conditional cart button (shows when items > 0)
- Location display (內湖區 · 石潭路)
- Order history icon for quick access

### Components Used
- `StatusBar.jsx` - iOS status bar
- `Avatar.jsx` - User avatar
- `SearchBar.jsx` - Search functionality
- `Chips.jsx` - Category filters
- `BuyAgainCard.jsx` - **NEW** - Previous order cards with cart integration
- `ActiveOrderCard.jsx` - Floating order status card
- `StoreCard.jsx` - Store listings
- `Logo.jsx` - Brand logos

### Buy Again Feature (v1.7.3)
**Component:** `BuyAgainCard.jsx`  
**Design:** Light theme, 165x194px cards

**Functionality:**
- Single item display: One circular image (65x65px)
- Multiple items: Overlapping circles with white borders
- Dynamic title and description generation
- Green add button (#00704a)
- Click to add entire order to cart
- Preserves all customizations (ice, sugar, size)

**Card Types:**
1. **Single Item Card**
   - One centered circular image
   - Item name
   - Specs: "大杯 · 熱 · 無糖"
   - Price and add button

2. **Multiple Items Card**
   - Two overlapping circular images
   - Combined title (up to 2 items)
   - Item count: "2 項商品 · 大杯 1杯"
   - Total price and add button

### Key Files
- `src/pages/Home.jsx` - Main home page component
- `src/components/BuyAgainCard.jsx` - Buy again card component
- `src/components/ActiveOrderCard.jsx` - Active order display
- Integrated with CartContext for cart operations

### User Flow
```
Home → Select Store → Store Detail
     → Click Cart Button (if items exist) → Cart
```

---

## Active Order Card

**Component**: `ActiveOrderCard.jsx`  
**Location**: Floating on Home page (below search bar)  
**Status**: ✅ Complete  
**Theme**: Purple gradient

### Features
- **Real-time Status Display**: Shows current order status with dynamic text
- **Visual Progress Bar**: 3-dot timeline showing order progress
- **Gradient Background**: Purple radial gradient design
- **Clickable**: Navigate to full order status page
- **Conditional Display**: Only shows when order is active (not completed/cancelled)

### Status Messages
```javascript
'pending'    → '等待店家確認...'
'confirmed'  → '店家已接單！'
'preparing'  → '正在製作餐點...'
'ready'      → '餐點已完成！'
```

### Progress Stages
```
[●] ━━━━ [●] ━━━━ [●]
Start   Mid    End

- pending: 33% (first dot)
- confirmed: 50% (first line filled)
- preparing: 66% (second dot filled)
- ready: 100% (all filled)
```

### Layout
```
┌──────────────────────────────────┐
│ 正在製作餐點...                   │ ← Status text
│ 預計取餐時間 08:00-08:15          │ ← Pickup time
│ [●]━━━[●]━━━[○]                 │ ← Progress bar
│ 總金額 $160｜已付款           ›  │ ← Total & chevron
└──────────────────────────────────┘
```

### Design Specs
- **Height**: 140px
- **Padding**: 16px
- **Border Radius**: 20px
- **Background**: Purple radial gradient
  - Start: `rgba(151,117,255,1)`
  - Mid: `rgba(139,101,255,1)`
  - End: `rgba(78,34,255,1)`
- **Shadow**: `0px 8px 20px -6px rgba(7,3,23,0.2)`

### User Interactions
- **Click Card Body**: Open order detail modal
- **Click Chevron**: Toggle expand/collapse card

### States
**Collapsed (140px height):**
- Status text
- Pickup time (or completion message if ready)
- **Items count and store info** (if ready): "2 份餐點 7-ELEVEN總部門市自取"
- Progress bar (if not ready)
- Total amount with chevron down

**Expanded (auto height):**
- Pickup number (if ready)
- Completion message
- Items count and store info
- Total amount with chevron up
- **White card** with:
  - Pickup counter number (purple)
  - Pickup location (with store icon)
  - Pickup method and time (with takeout icon)
  - Instruction text (gray)
  - Order items list with quantities
  - Gray dividers between sections

### Files
- `src/components/ActiveOrderCard.jsx` (100+ lines)

### Integration
```javascript
// In Home.jsx
<ActiveOrderCard order={activeOrder} />

// Order object structure
{
  id: '1',
  status: 'preparing',
  storeName: 'Store Name',
  pickupTimeStart: '08:00',
  pickupTimeEnd: '08:15',
  total: 160,
  orderedAt: Date
}
```

### Conditional Rendering
Only displays when:
- Order exists
- Status is NOT 'completed'
- Status is NOT 'cancelled'

---

## Order Detail Modal

**Component**: `OrderDetailModal.jsx`  
**Trigger**: Click active order card or order history card  
**Status**: ✅ Complete  
**Theme**: Light (iOS bottom sheet style)  
**Version**: v1.7.2 - Updated to match Figma design

### Features
- **Bottom Sheet Design**: Slides up from bottom with iOS-style grabber
- **Progress Timeline**: 3-stage visual timeline with timestamps (hidden for cancelled orders)
  - 接單 (Confirmed)
  - 製作中 (Preparing)
  - 取餐 (Pickup) - *Updated label*
- **Dynamic Status Banners**: Context-aware messages based on order state
  - 確認訂單: "店家確認訂單中..." (purple)
  - 製作中: "預計完成時間 5 分鐘" (purple)
  - 可取餐: "自取櫃 00000" (purple)
  - 已完成: "訂單已完成" (purple)
  - 已取消: "訂單已取消" (gray, no timeline)
- **Order Details Card**: Complete order information
  - Pickup location
  - Pickup method and time
  - Full items list with customizations
  - Total amount
- **Store Information**: Address with directions, phone with call button
- **Dismissible**: Click backdrop or close button

### Timeline Stages
**Preparing State:**
```
接單 (2026/01/23 09:52)   製作中 (2026/01/23 09:54)   取餐
      [●]━━━━━━━━━━━━━━━━[●]━━━━━━━━━━━━━━━━[○]
    Purple               Purple                 Gray
```

**Completed State:**
```
接單 (2026/01/23 09:52)   製作中 (2026/01/23 09:54)   取餐 (2026/01/23 09:56)
      [●]━━━━━━━━━━━━━━━━[●]━━━━━━━━━━━━━━━━[●]
    Purple               Purple                Purple
```

### Layout
```
┌─────────────────────────────────────┐
│          ━━━━ Grabber               │
│    訂單 #D687              [✕]      │
├─────────────────────────────────────┤
│ Progress Timeline with Badges       │
│ (with px-10 padding)                │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 預計完成時間 5 分鐘              │ │
│ │ (Purple or Gray background)      │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ ┌─ Order Details Card ─────────────┐│
│ │ 🏪 取餐地點                      ││
│ │ 🥡 外帶取餐  08:00-08:40        ││
│ │ Items List                       ││
│ │ 總計 $275                       ││
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 🏪 店家資訊                         │
│ [ Address Card with Directions ]    │
│ [ Phone Card with Call Button ]     │
└─────────────────────────────────────┘
```

### Design Specs
- **Border Radius**: 40px (top corners)
- **Max Height**: 90vh (scrollable)
- **Shadow**: `0px 15px 75px 0px rgba(0,0,0,0.18)`
- **Timeline Shadow**: `0px 0px 4px 0px rgba(0,0,0,0.05)`
- **Animation**: Slide up 300ms
- **Backdrop**: Black 40% opacity
- **Timestamp Format**: `YYYY/MM/DD HH:MM`

### Color Scheme (Light Theme)
- **Timeline Active**: `#714eff` (purple)
- **Timeline Inactive**: `#dcd1ff` (light purple)
- **Banner Purple**: `#f0ecff` background, `#714eff` text
- **Banner Gray**: `#e0e0e0` background, `black` text
- **Inactive Badge**: `#e0e0e0` background, `#bdbdbd` text
- **Timestamps**: `#757575`
- **Card Background**: White
- **Store Cards**: `#fafafa` (very light gray)

### Components
- Grabber indicator (iOS style)
- Close button (X)
- Progress timeline with dots and bars
- Status badges (colored pills: purple/gray)
- Timestamp labels (full date format)
- Dynamic status banner
- Store information cards
- Action buttons (directions, call)

### Files
- `src/components/OrderDetailModal.jsx` (280+ lines)

### User Flow
```
Active Order Card → Click → Order Detail Modal
Order History → Click order → Order Detail Modal
Modal → View Details → Dismiss → Back to previous page
```

---

## Store Detail

**Route**: `/store/:id`  
**Status**: ✅ Complete  
**Theme**: Light

### Features
- Store cover image with fixed navigation
- Category tabs (tea, coffee, fresh tea)
- Menu items with "add to cart" functionality
- Fixed cart button at bottom (always visible)
- Fixed store logo overlay
- Scrollable menu content

### Layout Structure
```
├── Fixed Elements (top)
│   ├── Status Bar
│   └── Navigation Buttons (back, share)
├── Scrollable Content
│   ├── Cover Image
│   ├── Store Info
│   └── Menu Section (categorized)
├── Fixed Elements (bottom)
│   ├── Store Logo
│   ├── Cart Button
│   └── iOS Home Indicator
```

### Components Used
- `MenuItemCard.jsx` - Menu items with add button
- `CategoryTab.jsx` - Category navigation
- `DrinkDetailModal.jsx` - Drink customization

### Key Implementation
- Fixed header/footer with scrollable content
- Category-based filtering
- Item click opens customization modal
- Add button updates cart count

### Files
- `src/pages/StoreDetail.jsx` (287 lines)
- Uses CartContext for state management

---

## Drink Customization Modal

**Trigger**: Click menu item in Store Detail  
**Status**: ✅ Complete  
**Type**: Bottom sheet modal

### Features
- **Customization Options**:
  - Size: 大杯 (Large), 特大杯 (Extra Large)
  - Sugar: 正常甜, 少糖, 半糖, 微糖, 無糖
  - Ice: 正常冰, 少冰, 微冰, 去冰, 熱
- **Quantity Control**: +/- buttons
- **Price Calculation**: Real-time updates
- **Fixed Header**: Product image and info
- **Fixed Footer**: Total and "加入訂單" button

### Layout
```
├── Backdrop (click to close)
└── Modal (slides up from bottom)
    ├── Fixed Header
    │   ├── Close/Store Name/Share
    │   ├── Product Image (88x88)
    │   └── Product Info
    ├── Scrollable Options
    │   ├── Size Selection
    │   ├── Sugar Level
    │   └── Ice Level
    └── Fixed Footer
        ├── Total Price
        ├── Quantity Adjuster
        └── Add to Cart Button
```

### Key Features
- Slide-up animation
- Real-time price calculation
- Multi-option selection
- Integration with CartContext

### Files
- `src/components/DrinkDetailModal.jsx` (250+ lines)
- Props: `isOpen`, `onClose`, `drink`, `storeName`, `onAddToCart`

### Data Structure
```javascript
{
  drink: { id, name, price, image, category },
  quantity: number,
  size: 'large' | 'extra-large',
  sugar: 'normal' | 'less' | 'half' | 'light' | 'none',
  ice: 'normal' | 'less' | 'light' | 'none' | 'hot',
  totalPrice: number,
  storeName: string
}
```

---

## Shopping Cart

**Route**: `/cart`  
**Status**: ✅ Complete  
**Theme**: Light

### Features
- **Store-Grouped Items**: Orders organized by store
- **Item Management**: 
  - Adjust quantities with +/- buttons
  - Remove items when quantity = 0
  - Real-time price updates
- **Delivery Options**: Self-pickup selection
- **Order Options** (conditional display):
  - Marketing offers
  - Plastic bag
  - Invoice (手機載具)
  - Payment method (iCash)
- **Empty State**: Friendly message when cart is empty
- **Checkout Button**: Navigates to order confirmation

### Global State
Uses `CartContext` for state management:
- `cartItems` - Array of cart items
- `addToCart` - Add item
- `removeFromCart` - Remove item
- `updateQuantity` - Change quantity
- `getTotalPrice` - Calculate total
- `getTotalItems` - Count items
- `getItemsByStore` - Group by store

### Components
- `CartItem.jsx` - Individual cart item with quantity controls

### Layout
```
├── Fixed Header (114px)
├── Scrollable Content
│   ├── Store Sections (grouped)
│   │   ├── Store Header
│   │   ├── Cart Items
│   │   └── Add More Items Button
│   ├── Delivery Method (when items exist)
│   ├── Marketing Offers (when items exist)
│   ├── Plastic Bag (when items exist)
│   ├── Invoice (when items exist)
│   └── Payment Method (when items exist)
└── Fixed Bottom Bar (140px)
    ├── Total Price
    ├── Checkout Button
    └── Home Indicator
```

### Files
- `src/pages/Cart.jsx` (225+ lines)
- `src/components/CartItem.jsx` (120 lines)
- `src/context/CartContext.jsx` (73 lines)

### User Actions
- **View Cart**: Click cart button from any page
- **Adjust Quantity**: Use +/- buttons
- **Remove Item**: Decrease quantity to 0
- **Add More**: Click "新增餐點" per store
- **Checkout**: Click "前往結帳"

---

## Order Confirmation

**Route**: `/order-confirmation`  
**Status**: ✅ Complete  
**Theme**: Light  
**Data Flow**: Via React Router state

### Features
- **Order Review**: All items grouped by store
- **Store Information**:
  - Pickup location (取餐地點)
  - Pickup method (外帶取餐)
  - Pickup time (08:00-08:40)
- **Item Details**: Quantity, name, size, sugar, ice, price
- **Cost Breakdown**:
  - Subtotal (小計)
  - Service fee (服務費: $5)
  - Total (總計)
- **Order Information**:
  - Delivery method
  - Invoice type
  - Payment method
- **Confirmation Button**: Submit order

### Data Flow
```javascript
// From Cart
const orderData = {
  items: cartItems,              // Array of cart items
  totalPrice: number,            // Subtotal
  deliveryMethod: string,        // 'self-pickup'
  invoice: string,               // '手機載具'
  paymentMethod: string          // 'iCash 5830'
};

navigate('/order-confirmation', { state: { orderData } });
```

### Layout
```
├── Fixed Header (114px)
├── Scrollable Content
│   ├── Store Sections
│   │   ├── Pickup Location
│   │   ├── Pickup Time
│   │   └── Item List with Quantity Badges
│   ├── Delivery Method
│   ├── Cost Breakdown
│   ├── Invoice
│   └── Payment Method
└── Fixed Bottom Bar (130px)
    ├── Total Amount
    ├── Confirm Button (確認下單)
    └── Home Indicator
```

### Files
- `src/pages/OrderConfirmation.jsx` (280+ lines)

### Validation
- Redirects to cart if no order data
- Fallback values for missing data
- Format helpers for display

### User Flow
```
Cart → Click "前往結帳" → Order Confirmation
     → Review Order → Click "確認下單"
     → Order Confirmed → Navigate to Home
```

---

## Order Status

**Route**: `/order-status/:orderId`  
**Status**: ✅ Complete  
**Theme**: Light

### Features
- **Real-time Status Display**: Visual status indicator with icon and color
- **Status Timeline**: Progress bar showing order stages
  - 已送出 (Pending)
  - 已確認 (Confirmed)
  - 製作中 (Preparing)
  - 完成 (Ready)
- **Estimated Time**: Shows time remaining for preparing orders
- **Order Details**:
  - Order number
  - Order time
  - Pickup time window
  - Pickup method
- **Store Information**: Name, address, contact button
- **Order Items**: Full item list with customizations
- **Price Breakdown**: Subtotal, service fee, total
- **Payment Info**: Payment method and invoice number

### Status Types
```javascript
{
  pending: '訂單已送出',     // Gray - Waiting for confirmation
  confirmed: '訂單已確認',   // Blue - Store accepted
  preparing: '製作中',       // Orange - Being prepared
  ready: '已完成',          // Green - Ready for pickup
  completed: '已完成',      // Gray - Order completed
  cancelled: '已取消'       // Red - Cancelled
}
```

### Layout
```
├── Fixed Header
│   └── Back Button + "訂單狀態" Title
├── Scrollable Content
│   ├── Status Card
│   │   ├── Status Icon (colored circle with emoji)
│   │   ├── Status Label
│   │   ├── Description
│   │   ├── Estimated Time (if preparing)
│   │   └── Status Timeline (progress bar)
│   ├── Order Details Card
│   ├── Store Info Card (with contact button)
│   ├── Order Items Card (with price breakdown)
│   └── Payment Info Card
└── Fixed Home Indicator
```

### Components
- Visual status indicator with color coding
- 4-step progress timeline
- Contact store button (opens phone dialer)
- View order history button (when completed)

### Files
- `src/pages/OrderStatus.jsx` (280+ lines)

### User Flow
```
Order Confirmation → Click "確認下單" → Order Status
Order History → Click order card → Order Status
```

---

## Order History

**Route**: `/order-history`  
**Status**: ✅ Complete  
**Theme**: Light

### Features
- **Filter Tabs**: All, Completed, Cancelled
- **Order Cards**: List of past orders
  - Date (今天, 昨天, X天前)
  - Status badge (colored)
  - Store name
  - Items count
  - Total price
  - Order number
- **Empty State**: Shows when no orders match filter
- **Click to View**: Navigate to order status for details

### Order Card Display
```
┌────────────────────────────────┐
│ 昨天                    已完成  │ ← Date & Status
│ 🏪 Store Name                  │ ← Store
│ 2 項商品 · ORD-xxx      $275  │ ← Summary & Price
└────────────────────────────────┘
```

### Filters
- **全部** (All): Shows all orders
- **已完成** (Completed): Only completed orders
- **已取消** (Cancelled): Only cancelled orders

### Layout
```
├── Fixed Header (with filter tabs)
│   ├── Back Button + Title
│   └── Filter Tabs (全部, 已完成, 已取消)
├── Scrollable Order List
│   └── Order Cards (clickable)
└── Fixed Home Indicator
```

### Date Formatting
- Today: "今天"
- Yesterday: "昨天"
- < 7 days: "X天前"
- Older: "MM月DD日"

### Files
- `src/pages/OrderHistory.jsx` (240+ lines)

### User Flow
```
Order Status → Click "查看訂單記錄" → Order History
Order History → Click order card → Order Detail Modal (not navigation)
Home → Order History Icon → Order History → Click order → Modal
Active Order Card → Click → Order Detail Modal
```

---

## Design System

**Version**: 1.1.1  
**Theme**: Light  
**File**: `design-system.json`

### Color Tokens
```javascript
// Text
text.main: #424242 (dark gray)
text.subtle: #9e9e9e (gray)
text.subtlest: #757575 (light gray)
text.white: #ffffff

// Backgrounds
surface.general: #ffffff (white)
bg-white: #ffffff

// Components
button.filled.main: #000000 (black)
chips.selected: #ffffff (white)
badge.common: rgba(255,255,255,0.1)
```

### Typography
```javascript
// Chinese (Noto Sans TC)
H1: 20px, weight 600
H2: 16px, weight 600
H3: 14px, weight 600
Body 1: 14px, weight 400/600
Body 2: 12px, weight 600
Body 3: 11px, weight 400/600

// English (Poppins, SF Pro)
Numbers and labels: 14px, 17px
```

### Spacing (8px base)
```javascript
0: 0px
100: 8px
150: 12px
200: 16px
```

### Component Specifications
- **Cards**: 20px-24px border radius, white background, shadow
- **Buttons**: 24px border radius, 44px height
- **Chips**: 24px border radius, 36px height
- **Badges**: 20px border radius (capsule)
- **Input**: 24px border radius

### Files
- `design-system.json` - Token definitions
- `tailwind.config.js` - Tailwind integration
- `src/constants/designTokens.js` - JS constants

---

## Navigation Structure

```
Home (/)
  ├─→ Active Order Card → Order Detail Modal (component)
  ├─→ Order History Icon → Order History (/order-history)
  │                           └─→ Order Status (/order-status/:orderId)
  ├─→ Store Detail (/store/:id)
  │     ├─→ Drink Modal (component)
  │     └─→ Cart (/cart)
  │           └─→ Order Confirmation (/order-confirmation)
  │                 └─→ Order Status (/order-status/:orderId)
  │                       └─→ Order History (/order-history)
  │                             └─→ Order Status (any order)
  └─→ Cart (/cart)
        └─→ Order Confirmation (/order-confirmation)
```

---

## Key Technologies

- **React 18** - UI framework
- **React Router DOM v6** - Routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Context API** - State management (cart)

---

## Implementation Notes

### Fixed vs Scrollable Layout
All pages use this pattern:
```jsx
<div className="flex flex-col size-full overflow-hidden">
  {/* Fixed Header */}
  <div className="fixed top-0 z-40">...</div>
  
  {/* Scrollable Content */}
  <div className="flex-1 overflow-y-auto pt-[114px] pb-[140px]">
    ...
  </div>
  
  {/* Fixed Bottom */}
  <div className="fixed bottom-0 z-30">...</div>
</div>
```

### Cart State Management
Global cart state via React Context:
- Persists across navigation
- Real-time updates
- Store grouping
- Price calculation

### Theme Consistency
All pages use light theme:
- White backgrounds
- Dark text (#424242)
- Good contrast ratios (WCAG AA)
- Consistent spacing and typography

---

## Future Enhancements

### Planned Features
- [ ] User authentication
- [ ] Payment integration
- [ ] Order tracking
- [ ] Order history
- [ ] Favorites system
- [ ] Promo codes
- [ ] Multiple delivery addresses
- [ ] Time slot selection
- [ ] Real-time order updates
- [ ] Push notifications

### Technical Improvements
- [ ] localStorage for cart persistence
- [ ] API integration
- [ ] Error boundary components
- [ ] Loading states
- [ ] Skeleton screens
- [ ] Image optimization
- [ ] PWA capabilities
- [ ] Analytics integration

---

## Quick Reference

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Test User Flow
1. Browse home page
2. Select a store
3. Click menu item to customize
4. Add to cart
5. View cart
6. Proceed to checkout
7. Review order
8. Confirm order

### Key Files to Know
```
src/
├── pages/
│   ├── Home.jsx              # Home page
│   ├── StoreDetail.jsx       # Store detail
│   ├── Cart.jsx              # Shopping cart
│   └── OrderConfirmation.jsx # Order review
├── components/
│   ├── DrinkDetailModal.jsx  # Drink customization
│   ├── CartItem.jsx          # Cart item
│   └── [other components]
├── context/
│   └── CartContext.jsx       # Global cart state
└── constants/
    └── designTokens.js       # Design tokens
```

---

**Documentation Maintained By**: Development Team  
**For Questions**: Refer to code comments or CHANGELOG.md for specific changes
