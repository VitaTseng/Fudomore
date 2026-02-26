# Changelog

All notable changes to the Fudomore project will be documented in this file.

## [1.8.3] - 2026-02-09

### Purchase flow improvements
- **Cart cost recalculation**: Changing quantity in the cart now recalculates line total and cart total in real time. `CartContext.updateQuantity` derives unit price and sets `totalPrice = unitPrice * newQuantity`. `addItem` sets `totalPrice` when adding.
- **CartItem**: Unit price and display use fallbacks for items with `price` but no `totalPrice`, and for `item.name` / `item.image` when `drink` is absent (e.g. Buy Again items).
- **Post-order flow**: After confirming an order on Order Confirmation, the app now navigates to Home and opens OrderDetailModal with the new order instead of the Order Status page. Cart is cleared on successful order. Home reads `location.state.orderJustPlaced` and shows the modal, then clears state so refresh does not reopen it.

---

## [1.8.2] - 2026-02-09

### Added - Choose Store Modal
- **ChooseStoreModal Component** (`src/components/ChooseStoreModal.jsx`):
  - Full-screen modal showing all stores from Supabase
  - Accessible by clicking "熱門品牌" arrow on Home page
  - Real-time search functionality for stores and addresses
  - Displays store name, distance, and address
  - Smooth scroll to top button
  - Click any store to navigate to store detail page
  - iOS-style modal with grabber handle

### Updated
- **useStores Hook**: Now includes `address` and `distanceMeters` fields
  - Distance formatting: Shows "Xm" for < 1km, "X.Xkm" for >= 1km
  - Address field for display in store lists

- **Home.jsx**: Integrated Choose Store modal
  - Opens modal when clicking "熱門品牌" section arrow
  - Modal state management with `isChooseStoreModalOpen`

---

## [1.8.1] - 2026-02-09

### Updated - Home Page
- **"再點一次" Section**: Now fetches real order history from Supabase
  - Displays the 3 most recent completed orders
  - Automatically hides section when no completed orders exist
  - Removed mock PREVIOUS_ORDERS data
  - Uses `useUserOrders()` hook to fetch order history
  - Transforms Supabase order data to match BuyAgainCard format

- **Chips Component - Light Theme**
  - Updated "附近店家" category chips to light theme
  - Default state: white background with light gray border (#eeeeee)
  - Selected state: white background with dark border (#424242)
  - Better contrast and modern appearance

- **Brand Logos**
  - Replaced Logo component with actual brand images
  - Added 4 brand logos: I+? CAFE RESERVE, CITY PRIMA, CITY TEA, CITY TEA BAR
  - Stored in `src/assets/brands/` directory
  - Images scale properly within 68px height cards
  - Added hover effect (scale-105) for interactive feedback

### Fixed
- Order history integration with "Buy Again" feature
- Conditional rendering based on actual database state
- Brand logo display with proper image assets

---

## [1.8.0] - 2026-02-06

### Added - Supabase Database Integration
- **Supabase Client** (`src/lib/supabase.js`): Database connection setup
  - Environment variable configuration
  - Mock user ID and location constants
  - Supabase client initialization

- **Custom Hooks** (Data fetching layer):
  - `useStores` (`src/hooks/useStores.js`): Fetch stores by distance
  - `useMenuItems` (`src/hooks/useMenuItems.js`): Fetch menu items and categories
  - `useUserOrders` (`src/hooks/useOrders.js`): Fetch user order history with real-time updates
  - `useActiveOrder` (`src/hooks/useOrders.js`): Fetch active order with real-time status updates
  - `useOrderStatus` (`src/hooks/useOrders.js`): Fetch single order with real-time updates

- **Order Service** (`src/services/orderService.js`):
  - `createOrder()`: Create new orders in database
  - `updateOrderStatus()`: Update order status
  - Automatic order number generation via database trigger

### Updated - Pages Migrated to Supabase
- **Home.jsx**: Now uses `useStores` and `useActiveOrder` hooks
  - Stores fetched from database sorted by distance
  - Active order updates in real-time
  - Loading and error states

- **StoreDetail.jsx**: Now uses `useMenuItems` hook
  - Menu items and categories from database
  - Dynamic category loading
  - Loading states for menu

- **OrderHistory.jsx**: Now uses `useUserOrders` hook
  - Real-time order updates
  - Historical orders from database

- **OrderConfirmation.jsx**: Now uses `createOrder` service
  - Real order creation in database
  - Navigation to actual order ID
  - Error handling for failed orders

- **OrderStatus.jsx**: Now uses `useOrderStatus` hook
  - Real-time status updates
  - Live order data from database

- **CartContext.jsx**: Added `addItem` method
  - Fixes bug where Home.jsx was calling non-existent method
  - Consistent API with `addToCart`

### Features - Real-time Updates
- ✅ Order status changes update automatically
- ✅ Active order card reflects live status
- ✅ Order history refreshes on new orders
- ✅ Supabase real-time subscriptions

### Infrastructure
- ✅ PostgreSQL database with PostGIS
- ✅ Row Level Security (RLS) policies
- ✅ Database functions for distance and order numbers
- ✅ Mock user location (Taipei - 內湖區)
- ✅ Environment variable configuration

### Dependencies Added
- `@supabase/supabase-js` - Supabase client library

---

## [1.7.3] - 2026-02-06

### Added - Buy Again Feature
- **BuyAgainCard Component** (`BuyAgainCard.jsx`): New card component for "再點一次" section
  - ✅ Light theme design with white background
  - ✅ Single item display: One circular image
  - ✅ Multiple items display: Overlapping circular images (2 items shown)
  - ✅ Dynamic title and description generation
  - ✅ Green add button (`#00704a`)
  - ✅ Total price display
  - ✅ Responsive 165px x 194px card size
  - ✅ Shadow: `0px 0px 4px 0px rgba(0,0,0,0.05)`
  - ✅ Rounded corners: 20px

### Updated
- **Home.jsx**: Replaced ProductCard with BuyAgainCard in "再點一次" section
  - Added `handleBuyAgain` function to add previous order items to cart
  - Added `PREVIOUS_ORDERS` mock data with complete order information
  - Integrated with CartContext to add items
  - Clicking add button adds all items from that order to cart

### Features
- **Buy Again Functionality**: Click to reorder previous orders
- **Smart Item Display**: Shows single or multiple items with overlapping images
- **Cart Integration**: Adds all order items with correct customizations
- **Mock Data**: 3 sample previous orders with various item combinations

---

## [1.7.2] - 2026-02-06

### Updated - Order Detail Modal Design (Figma Update)
- **OrderDetailModal.jsx**: Updated to match latest Figma design
  - ✅ Refined progress timeline layout with proper spacing
  - ✅ Updated progress bar positioning (with px-10 padding)
  - ✅ Changed "可取餐" to "取餐" label
  - ✅ Progress dots now use `outline` instead of `border` (better rendering)
  - ✅ Dynamic status banners based on order state:
    - 確認訂單: "店家確認訂單中..."
    - 製作中: "預計完成時間 5 分鐘"
    - 可取餐/ready: "自取櫃 00000"
    - 已完成: "訂單已完成"
    - 已取消: "訂單已取消" (gray background)
  - ✅ Improved timestamp format: `YYYY/MM/DD HH:MM`
  - ✅ Light theme colors throughout:
    - Active badges: `#714eff` (purple)
    - Inactive badges: `#e0e0e0` (gray)
    - Inactive text: `#bdbdbd`
    - Timestamps: `#757575`
    - Banner backgrounds: `#f0ecff` (purple pale) / `#e0e0e0` (gray)
  - ✅ Cancelled orders show only the banner (no progress timeline)
  - ✅ Shadow on progress timeline: `shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)]`

### Visual Improvements
- More accurate spacing and padding
- Cleaner progress bar connections with outline-based dots
- Better visual hierarchy
- Consistent light theme application

---

## [1.7.1] - 2026-02-06

### Updated - Order History Modal Integration
- **OrderHistory.jsx**: Opens OrderDetailModal instead of navigation
  - Click order card → Open modal (not navigate to order status page)
  - View complete order details inline
  - Better UX with contextual information
  - Updated mock data with complete order information (items, timestamps)

### User Experience Improvements
- Stay on order history page when viewing details
- Faster access to order information
- No page navigation needed
- Consistent modal experience across app

---

## [1.7.0] - 2026-02-06

### Added - Order Detail Modal
- **OrderDetailModal Component** (`OrderDetailModal.jsx`): Pop-up modal for order details
  - Bottom sheet style with rounded top corners
  - Grabber for iOS-style interaction
  - Close button in header
  - Progress timeline with status badges and timestamps
  - Estimated completion time banner (purple)
  - Order details card with items list
  - Store information section (address with directions, phone with call)
  - Smooth slide-up animation
  - Light theme design

### Updated
- **ActiveOrderCard.jsx**: Opens modal instead of navigation
  - Click card → Open modal (not navigate)
  - Modal shows detailed order information
  - Maintains expand/collapse for quick view
  - Better UX with inline details

### Features
- Full-screen bottom sheet modal
- 3-stage progress timeline (接單 → 製作中 → 可取餐)
- Timestamps for each completed stage
- Estimated completion time display
- Complete order items list with customizations
- Store address with directions button
- Store phone with call button
- Backdrop with smooth animations

---

## [1.6.3] - 2026-02-06

### Updated - Order Card UX Improvements
- **ActiveOrderCard.jsx**: Improved information display
  - Removed QR code button from expanded state (simplified UI)
  - Added order details to collapsed state (better visibility)
  - "2 份餐點 7-ELEVEN總部門市自取" now visible in both states
  - Cleaner, more focused expanded view

### User Experience
- Order information visible without expanding
- Simplified expanded state focuses on details
- Better information hierarchy

---

## [1.6.2] - 2026-02-06

### Updated - Light Theme Consistency
- **ActiveOrderCard.jsx**: Updated expanded card to light theme
  - Changed background from dark (#424242) to white
  - Updated all text colors for light background readability
  - Icons changed from white to dark (#424242)
  - Dividers now use gray-200 (visible on white)
  - Quantity badges use gray-100 background
  - Instruction text uses text-subtle color
  - Item details use text-subtlest color
  - Added shadow-card for depth
  - Improved text alignment and spacing

### Design Improvements
- Consistent light theme throughout the app
- Better readability on white background
- Clear visual hierarchy with proper color contrast
- Maintains purple gradient for main card
- Light inner card for detailed information

---

## [1.6.1] - 2026-02-06

### Added - Expand/Collapse Interaction
- **Expand/Collapse functionality**: Toggle between collapsed and expanded states
  - Click chevron (bottom area) to expand/collapse
  - Click other areas to navigate to order detail page
  - Smooth height animation transition
  - Expanded state shows full order details
  - QR code button in expanded state (top right corner)

### Expanded State Features
- **Pickup Counter Number**: Large purple text showing counter number
- **Pickup Location**: Store icon with store name
- **Pickup Method**: Takeout icon with time window
- **Instruction Text**: Helpful pickup instructions
- **Order Items List**: Full list with quantities, customizations, and prices
- **Dividers**: Visual separation between sections

### Updated
- **ActiveOrderCard.jsx**: Major refactor for expand/collapse
  - Added `isExpanded` state
  - Separate click handlers for navigation vs toggle
  - Dynamic height with transitions
  - Conditional rendering for collapsed/expanded content
  - Rotated chevron icon when expanded
- **Home.jsx**: Updated mock data with order items
- **docs/FEATURES.md**: Updated Active Order Card section

### User Interactions
```
Collapsed State:
- Click card body → Navigate to order status
- Click chevron → Expand details

Expanded State:
- Click card body → Navigate to order status
- Click chevron → Collapse details
- Click QR button → Show QR code (future)
```

---

## [1.6.0] - 2026-02-06

### Added - Active Order Card on Home
- **Active Order Card Component** (`ActiveOrderCard.jsx`): Floating order status module
  - Purple gradient background design from Figma
  - Real-time status display with dynamic text
  - Visual progress bar (3-dot timeline)
  - Clickable to navigate to full order status
  - Shows pickup time and total amount
  - Conditional display (only when order is active)
  - Smooth hover and click animations

### Updated
- **Home.jsx**: Integrated active order card below search bar
- **docs/FEATURES.md**: Added Active Order Card section

### Features
- Order status indicator with 4 states (pending, confirmed, preparing, ready)
- Animated progress bar based on order status
- Gradient design matching Figma specifications
- Touch-optimized interactions
- Seamless navigation to order status page

### User Experience
```
Home → See Active Order Card → Click → Order Status Details
```

---

## [1.5.0] - 2026-02-06

### Added - Order Status and History
- **Order Status Page** (`/order-status/:orderId`): Real-time order tracking
  - Visual status indicator with colored icons and labels
  - 4-step progress timeline (送出 → 確認 → 製作 → 完成)
  - Estimated time remaining for preparing orders
  - Order details (number, times, pickup method)
  - Store information with contact button
  - Full item list with customizations
  - Price breakdown (subtotal, service fee, total)
  - Payment and invoice information
  - Status-based action buttons

- **Order History Page** (`/order-history`): View past orders
  - Filter tabs (全部, 已完成, 已取消)
  - Order cards with date, status, store, items, total
  - Smart date formatting (今天, 昨天, X天前)
  - Click to view detailed order status
  - Empty state when no orders
  - Hover effects and smooth interactions

### Updated
- **App.jsx**: Added routes for order status and history
- **OrderConfirmation.jsx**: Navigate to order status after confirmation
- **docs/FEATURES.md**: Added documentation for new pages

### Features
- Order status tracking with 6 states (pending, confirmed, preparing, ready, completed, cancelled)
- Visual progress timeline showing order stages
- Real-time estimated completion time
- Contact store functionality (phone dialer)
- Order history with filtering
- Navigate between order status and history
- Light theme design throughout

### User Flows
```
Order Confirmation → Confirm → Order Status → View History
Order History → Click Order → Order Status
```

---

## [1.4.1] - 2026-02-06

### Changed - Documentation Refactor
- **Consolidated Documentation**: Merged 20+ markdown files into single source of truth
  - Created `docs/FEATURES.md` - Complete features documentation
  - Created `docs/README.md` - Documentation index
  - Moved redundant files to `docs/archive/`
  - Kept only essential files in root: README.md, CHANGELOG.md, SETUP.md
- **Improved Maintainability**: Single file to update for feature documentation
- **Cleaner Structure**: Easier to navigate and find information

### Documentation Structure
```
Root:
  ├── README.md (project overview)
  ├── CHANGELOG.md (version history)
  ├── SETUP.md (setup instructions)
  └── docs/
      ├── README.md (docs index)
      ├── FEATURES.md (single source of truth)
      └── archive/ (historical docs)
```

---

## [1.4.0] - 2026-02-06

### Added - Order Confirmation Page
- **OrderConfirmation Page** (`/order-confirmation`): Complete order review interface
  - Fixed header with back button and "確認訂單" title
  - Store-grouped order sections showing:
    - Store name (取餐地點)
    - Pickup method and time (外帶取餐)
    - Quantity badge and item details
    - Item prices
  - Delivery method display (運送方式)
  - Cost breakdown:
    - Subtotal (小計)
    - Service fee (服務費: $5)
    - Total (總計)
  - Invoice information (發票)
  - Payment method display (iCash)
  - Fixed bottom action bar with total and "確認下單" button
  - Light theme design matching rest of app

- **Data Flow**: Cart passes order data via React Router state
- **Validation**: Redirects to cart if no order data
- **Format Helpers**: Functions for size, sugar, ice labels
- **Store Grouping**: Automatic grouping of items by store

### Updated
- **App.jsx**: Added `/order-confirmation` route
- **Cart.jsx**: Updated checkout handler to navigate with order data

### Features
- Complete order review before confirmation
- Store-grouped display for multi-store orders
- Automatic service fee calculation
- Back navigation to cart for modifications
- Order confirmation with user feedback
- Responsive layout with fixed header/footer

### Documentation
- **ORDER_CONFIRMATION_IMPLEMENTATION.md**: Complete guide
- Updated routing documentation

---

## [1.3.2] - 2026-02-06

### Changed - Light Theme for Home Page
- **Home.jsx**: Updated iOS home indicator from white to gray (`bg-gray-300`) for visibility
- **Chips.jsx**: Changed unselected chip text from white to subtle gray for better contrast
- **StoreCard.jsx**: Changed store name text from white to dark (`text-text-main`)
- **SectionTitle.jsx**: Changed section title text from white to dark (`text-text-main`)
- All text now properly visible on white background
- Improved readability and contrast throughout home page

---

## [1.3.1] - 2026-02-06

### Changed
- **Cart Page**: Hide delivery options and all option sections when cart is empty
  - Delivery method (運送方式) only shows when items exist
  - Marketing offers (行銷優惠) only shows when items exist
  - Plastic bag (塑膠袋) only shows when items exist
  - Invoice (發票) only shows when items exist
  - Payment method only shows when items exist
  - Cleaner UX for empty cart state

---

## [1.3.0] - 2026-02-06

### Added - Cart System Implementation
- **Cart Page** (`/cart`): Complete cart interface with all features
  - Fixed header with back button
  - Scrollable cart items grouped by store
  - Store sections with distance and navigation
  - Cart items with product image, details, and customizations
  - Quantity adjuster (green pill with +/- buttons)
  - "新增餐點" button to add more items from same store
  - Empty cart state with friendly message
  - Fixed bottom action bar with total and checkout button

- **CartContext**: Global cart state management
  - Add/Remove/Update cart items
  - Real-time price calculation
  - Total items count
  - Group items by store
  - Clear cart functionality
  - React Context API implementation

- **CartItem Component**: Reusable cart item display
  - Product image (88x88 rounded)
  - Drink name and customization details
  - Size, sugar, ice level display
  - Price display
  - Quantity controls with green pill design
  - Remove on quantity 0

### Updated Pages
- **App.jsx**: Added CartProvider and /cart route
- **Home.jsx**: Added conditional floating cart button (shows when items > 0)
- **StoreDetail.jsx**: Integrated cart context, cart button navigates to /cart

### Features
- Global cart state management with React Context
- Real-time cart count updates across all pages
- Items automatically grouped by store
- Quantity adjustment with instant price updates
- Cart button appears/disappears based on cart state
- Navigation to cart from any page
- Empty cart state handling
- Checkout button (disabled when empty)

### Sections in Cart
- Delivery method selection (自取)
- Marketing offers (行銷優惠)
- Plastic bag option (塑膠袋)
- Invoice type (發票 - 手機載具)
- Payment method (iCash 5830)

### Documentation
- **CART_IMPLEMENTATION.md**: Complete cart system guide
- Updated routing documentation

---

## [1.2.3] - 2026-02-06

### Fixed - Store Detail Scroll Issue (Final Fix)
- **Critical Fix**: Corrected broken JSX tag structure in StoreDetail
  - Fixed mismatched closing div tags
  - Moved menu section inside scrollable container
  - Menu section was outside overflow-y-auto div (line 190 closed too early)
  - Consolidated duplicate cart button structure
  - Removed orphaned closing tags
  - Fixed component hierarchy
  - **Scrolling now works properly**

### Technical Details
- Scrollable container now properly contains cover image, store info, AND menu section
- All content flows naturally and scrolls as expected
- Fixed navigation stays at top while content scrolls

---

## [1.2.2] - 2026-02-06

### Fixed - Store Detail Scroll Issue (Attempted Fix)
- **StoreDetail Page**: Complete restructuring for proper fixed positioning
  - Restructured entire page layout using flexbox
  - Added proper scrollable content container (flex-1 overflow-y-auto)
  - Changed all absolute positioning to fixed for headers/footers
  - Status bar now properly fixed at top (z-40)
  - Navigation buttons properly fixed at top (z-30)
  - Store logo fixed at proper position (z-20)
  - Cart button fixed at bottom (z-20)
  - Home indicator fixed at bottom (z-10)
  - Menu section now flows naturally in scrollable content
  - Removed all absolute positioning from scrollable elements

### Technical Improvements
- Proper flexbox layout for fixed header/footer pattern
- Correct z-index hierarchy management
- Smooth native browser scrolling
- Optimized pointer events handling
- Better shadow visibility on buttons

---

## [1.2.1] - 2026-02-06

### Fixed - Header Scroll Issues (Initial Attempt)
- **DrinkDetailModal**: Fixed top bar to stay at top while scrolling
  - Restructured layout to use flexbox with fixed header/footer
  - Top bar (close, store name, share) now stays fixed
  - Product image and info scroll naturally with content
  - Bottom action bar stays fixed at bottom
  - Smooth scrolling in content area

- **StoreDetail Page**: Fixed navigation and status bar positioning
  - Changed navigation buttons from absolute to fixed positioning
  - Status bar now stays fixed at top (z-40)
  - Navigation buttons stay visible while scrolling (z-30)
  - Added subtle shadows for better button visibility
  - Improved z-index hierarchy

### Technical Improvements
- Better scroll performance with optimized layout
- Proper separation of fixed vs scrollable content
- Pointer events optimization for click handling
- Consistent z-index management across components

### Documentation
- **SCROLL_FIX.md**: Complete documentation of scroll fixes

---

## [1.2.0] - 2026-02-06

### Added - Drink Detail Modal
- **DrinkDetailModal Component**: Full-featured bottom sheet modal for drink customization
  - Slide-up animation from bottom
  - Product image and details display
  - Size selection (Large / Extra Large)
  - Sugar level selection (5 options)
  - Ice level selection (5 options)
  - Quantity adjuster (+/- buttons)
  - Real-time price calculation
  - Add to cart functionality

### Enhanced Components
- **MenuItemCard**: Now clickable on entire card
  - Opens drink detail modal
  - Hover effects added
  - Better UX with scale animation

### Updated Pages
- **StoreDetail**: Integrated drink detail modal
  - Modal state management
  - Cart items tracking
  - Click handlers for menu items
  - Pass drink data to modal

### Features
- Complete customization workflow
- Real-time price updates
- Smooth animations and transitions
- Mobile-optimized bottom sheet
- Keyboard accessibility (Escape to close)
- Body scroll prevention
- Backdrop overlay with click-to-close

### Documentation
- **DRINK_MODAL_IMPLEMENTATION.md**: Complete implementation guide
- Usage examples and API documentation
- User flow and interaction patterns

---

## [1.1.1] - 2026-02-06

### Changed - Light Theme Implementation
- **Theme System**: Applied consistent light theme across all pages
- **Background Colors**: Changed all backgrounds to pure white (#ffffff)
- **Button Colors**: Updated navigation buttons to white with black icons
- **Cart Button**: Changed to black background with white text (stands out as primary CTA)
- **Design System**: Updated to version 1.1.1 with proper theme documentation

### Updated Components
- **StoreDetail**: Complete light theme application
  - White backgrounds throughout
  - White navigation buttons with black icons
  - Black cart button (primary action)
  - Proper text colors for readability
- **Home**: White background instead of off-white
- **StoreCard**: Explicit white background
- **MenuItemCard**: White cards with light gray add buttons
- **CategoryTab**: White background for selected state

### Updated Design Tokens
- Added new color tokens (divider, category selected, etc.)
- Updated surface colors to pure white
- Added button.filled.main color
- Added icon.black color
- Version: 1.1.1
- Theme: "light" explicitly defined

### Documentation
- **THEME_UPDATE.md**: Technical theme change details
- **LIGHT_THEME_SUMMARY.md**: Complete theme overview
- **QUICK_REFERENCE_LIGHT_THEME.md**: Quick reference guide
- Updated design-system.json with theme metadata

### Accessibility
- All contrast ratios verified (WCAG AA compliant)
- Dark text on white: 8.51:1 contrast
- White text on black: 21:1 contrast
- Improved readability across all pages

---

## [1.1.0] - 2026-02-06

### Added
- **Store Detail Page**: Complete implementation of store detail view from Figma
  - Header with store cover image
  - Back, favorite, and share buttons
  - Store logo overlay
  - Store name, rating, and distance display
  - Info cards showing wait time and pickup time
  - Sidebar category navigation with 12+ categories
  - Menu items list with product cards
  - Horizontal menu item cards (88x88 image size)
  - Add to cart buttons on menu items
  - Floating cart button with count indicator
  - Smooth scrolling for categories and menu items

- **New Components**:
  - `MenuItemCard`: Horizontal card for displaying menu items
  - `CategoryTab`: Sidebar category button for menu navigation
  - `Home`: Separated home page component
  - `StoreDetail`: Full store detail page implementation

- **Routing System**:
  - React Router v6 integration
  - Home page route (`/`)
  - Store detail route (`/store/:id`)
  - Navigation between pages
  - URL parameter handling
  - Back button navigation

- **Documentation**:
  - `ROUTING.md`: Complete routing and navigation guide
  - `CHANGELOG.md`: Project changelog (this file)

### Changed
- **App.jsx**: Refactored to use React Router with route definitions
- **Home Component**: Moved from App.jsx to separate file (`src/pages/Home.jsx`)
- **StoreCard**: Now clickable and navigates to store detail page
- **Tailwind Config**: Added `surface-strong` color for dark backgrounds
- **README.md**: Updated to include routing information and new components

### Dependencies
- Added `react-router-dom` (^6.x) for client-side routing

### Technical Details
- Store detail page implements Figma design node-id: 165-17798
- All design tokens and spacing maintained from Figma
- Sidebar uses sticky positioning for category navigation
- Smooth scrolling with `hide-scrollbar` utility class
- Cart count state management with React hooks
- Responsive layout optimized for 375px mobile width

---

## [1.0.0] - 2026-02-06

### Added
- **Initial Release**: Complete Fudomore application implementation
- **Design System**: Full design system from Figma with all variables
  - Colors: 23 color definitions
  - Typography: Chinese (Noto Sans TC) & English (Poppins)
  - Spacing: 8px base unit system
  - Border radius values
  - Shadow effects

- **Core Components** (9 components):
  - StatusBar: iOS-style status bar
  - Avatar: User avatar with gradient
  - SearchBar: Search input with icons
  - Chips: Filter chips for categories
  - Badge: Information badges
  - Logo: Brand logo display
  - ProductCard: Product display cards
  - StoreCard: Store information cards
  - SectionTitle: Section headers

- **Home Page Features**:
  - iOS status bar
  - User greeting and location
  - Search functionality
  - Product history section
  - Brand logos grid (3+2 layout)
  - Store listings with filters
  - Category chips (5 categories)
  - Horizontal scrolling for products

- **Documentation** (7 files):
  - README.md: Project overview
  - SETUP.md: Installation guide
  - QUICKSTART.md: 3-step quick start
  - DESIGN_SYSTEM.md: Design specifications
  - COMPONENTS.md: Component reference
  - IMPLEMENTATION_SUMMARY.md: Implementation details
  - design-system.json: Design tokens in JSON

- **Development Setup**:
  - Vite build configuration
  - Tailwind CSS with custom design tokens
  - ESLint configuration
  - PostCSS setup
  - Google Fonts integration (Noto Sans TC, Poppins)

### Technical Stack
- React 18.3.1
- Vite 5.4.2
- Tailwind CSS 3.4.10
- ESLint 8.57.0

---

## Version History

- **v1.1.0** (Current): Added store detail page and routing
- **v1.0.0**: Initial release with home page and core components

---

## Upcoming Features

### Phase 2 (Planned)
- [ ] Shopping cart page
- [ ] Product detail modal
- [ ] Order customization (size, sugar, ice)
- [ ] Real-time order tracking
- [ ] User authentication

### Phase 3 (Future)
- [ ] Payment integration
- [ ] Order history
- [ ] User profile
- [ ] Favorites/bookmarks
- [ ] Push notifications
- [ ] Dark mode

### Phase 4 (Enhancement)
- [ ] Animations and transitions
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Multi-language support (i18n)
- [ ] Unit and integration tests

---

**For detailed routing information, see [ROUTING.md](./ROUTING.md)**

**For component usage, see [COMPONENTS.md](./COMPONENTS.md)**

**For design system details, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**
