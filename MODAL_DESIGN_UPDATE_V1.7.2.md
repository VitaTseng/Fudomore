# ✅ Order Detail Modal Design Update - v1.7.2

**Version**: 1.7.2  
**Date**: February 6, 2026  
**Figma**: `node-id=293-22192`  
**Status**: ✅ **COMPLETE**

---

## 🎨 Design Changes from Figma

Updated the OrderDetailModal component to match the latest Figma design specifications with full light theme implementation.

---

## 📐 Key Visual Updates

### 1. **Progress Timeline Layout**

**Before:**
```jsx
<div className="flex items-start mb-[-10px] py-1 w-full">
  // Progress bars
</div>
```

**After:**
```jsx
<div className="flex items-start mb-[-10px] px-10 py-1 w-full">
  // Progress bars with proper padding
</div>
```

✅ Added `px-10` padding for proper bar spacing  
✅ Added shadow: `shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)]`  
✅ Proper alignment with status badges

---

### 2. **Status Label Change**

| Before | After |
|--------|-------|
| 可取餐 | 取餐 |

Simplified the pickup label to match Figma specs.

---

### 3. **Dynamic Status Banners**

Implemented state-specific banner messages:

| Order Status | Banner Message | Background Color |
|--------------|----------------|------------------|
| **confirmed** | 店家確認訂單中... | Purple (`#f0ecff`) |
| **preparing** | 預計完成時間 5 分鐘 | Purple (`#f0ecff`) |
| **ready** | 自取櫃 00000 | Purple (`#f0ecff`) |
| **completed** | 訂單已完成 | Purple (`#f0ecff`) |
| **cancelled** | 訂單已取消 | Gray (`#e0e0e0`) |

**Code:**
```javascript
const getBannerMessage = () => {
  if (order.status === 'cancelled') return { text: '訂單已取消', color: 'gray' };
  if (order.status === 'completed') return { text: '訂單已完成', color: 'purple' };
  if (order.status === 'ready') return { text: '自取櫃 00000', color: 'purple' };
  if (order.status === 'preparing') return { text: '預計完成時間 5 分鐘', color: 'purple' };
  return { text: '店家確認訂單中...', color: 'purple' };
};
```

---

### 4. **Timestamp Format Update**

**Before:**
```
01/23 09:52
```

**After:**
```
2026/01/23 09:52
```

**Implementation:**
```javascript
const formatDateTime = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
```

✅ Full year displayed  
✅ Consistent zero-padding  
✅ Matches Figma format exactly

---

### 5. **Cancelled Order Handling**

**New Behavior:**
- Cancelled orders **do NOT show** the progress timeline
- Only shows the gray "訂單已取消" banner
- Cleaner, more appropriate UI for cancelled state

**Code:**
```jsx
{order.status !== 'cancelled' && (
  <div className="flex flex-col items-start gap-4 pb-2.5 relative">
    {/* Progress Timeline */}
  </div>
)}

{order.status === 'cancelled' && (
  <div className="bg-[#e0e0e0] flex items-center justify-center py-3 rounded-xl">
    <p className="font-inter font-bold text-xl text-black text-center">
      訂單已取消
    </p>
  </div>
)}
```

---

## 🎨 Light Theme Colors

### Progress Timeline
| Element | Active State | Inactive State |
|---------|--------------|----------------|
| **Progress Bar** | `#714eff` | `#dcd1ff` |
| **Status Dot** | `#714eff` | `#dcd1ff` |
| **Badge Background** | `#714eff` | `#e0e0e0` |
| **Badge Text** | `white` | `#bdbdbd` |
| **Timestamp** | `#757575` | - |

### Banners
| Type | Background | Text Color |
|------|------------|------------|
| **Active (Purple)** | `#f0ecff` | `#714eff` |
| **Cancelled (Gray)** | `#e0e0e0` | `black` |

### Typography
- **Banner Text**: `font-inter font-bold text-xl`
- **Badge Text**: `font-noto-sans font-semibold text-xs`
- **Timestamp**: `font-noto-sans text-[11px]`

---

## 🔄 Progress Logic

### Status Progression
```
confirmed (接單) → preparing (製作中) → ready (取餐) → completed
```

### Active Step Calculation
```javascript
const getActiveSteps = () => {
  if (order.status === 'cancelled') return 1;
  if (order.status === 'pending' || order.status === 'confirmed') return 1;
  if (order.status === 'preparing') return 2;
  if (order.status === 'ready' || order.status === 'completed') return 3;
  return 1;
};
```

| Order Status | Active Steps | Visual State |
|--------------|--------------|--------------|
| **pending** | 1 | [●]━━━━━[○]━━━━━[○] |
| **confirmed** | 1 | [●]━━━━━[○]━━━━━[○] |
| **preparing** | 2 | [●]━━━━━[●]━━━━━[○] |
| **ready** | 3 | [●]━━━━━[●]━━━━━[●] |
| **completed** | 3 | [●]━━━━━[●]━━━━━[●] |
| **cancelled** | - | (No timeline shown) |

---

## 🎯 Visual Examples

### Confirmed Order
```
┌─────────────────────────────────────┐
│          ━━━━ Grabber               │
│    訂單 #D687              [✕]      │
├─────────────────────────────────────┤
│ [●]━━━━━[○]━━━━━[○]               │
│ 接單     製作中    取餐              │
│ 2026/01/23 09:52                    │
├─────────────────────────────────────┤
│     店家確認訂單中...               │
│    (Purple background)              │
└─────────────────────────────────────┘
```

### Preparing Order
```
┌─────────────────────────────────────┐
│          ━━━━ Grabber               │
│    訂單 #D687              [✕]      │
├─────────────────────────────────────┤
│ [●]━━━━━[●]━━━━━[○]               │
│ 接單     製作中    取餐              │
│ 2026/01/23 09:52 2026/01/23 09:54  │
├─────────────────────────────────────┤
│    預計完成時間 5 分鐘              │
│    (Purple background)              │
└─────────────────────────────────────┘
```

### Ready for Pickup
```
┌─────────────────────────────────────┐
│          ━━━━ Grabber               │
│    訂單 #D687              [✕]      │
├─────────────────────────────────────┤
│ [●]━━━━━[●]━━━━━[●]               │
│ 接單     製作中    取餐              │
│ 2026/01/23 09:52 2026/01/23 09:54  │
├─────────────────────────────────────┤
│       自取櫃 00000                  │
│    (Purple background)              │
└─────────────────────────────────────┘
```

### Completed Order
```
┌─────────────────────────────────────┐
│          ━━━━ Grabber               │
│    訂單 #D687              [✕]      │
├─────────────────────────────────────┤
│ [●]━━━━━[●]━━━━━[●]               │
│ 接單     製作中    取餐              │
│ 2026/01/23 09:52 ... 2026/01/23... │
├─────────────────────────────────────┤
│       訂單已完成                    │
│    (Purple background)              │
└─────────────────────────────────────┘
```

### Cancelled Order
```
┌─────────────────────────────────────┐
│          ━━━━ Grabber               │
│    訂單 #D421              [✕]      │
├─────────────────────────────────────┤
│       訂單已取消                    │
│    (Gray background)                │
├─────────────────────────────────────┤
│ Order Details...                    │
└─────────────────────────────────────┘
```

---

## 🧪 Testing Checklist

### Visual Verification
- [x] Progress bar spacing matches Figma
- [x] Status badges aligned correctly
- [x] Timestamps show full date format
- [x] "取餐" label (not "可取餐")
- [x] Shadow applied to timeline
- [x] Light theme colors consistent

### Status Banners
- [x] Confirmed: "店家確認訂單中..." (purple)
- [x] Preparing: "預計完成時間 5 分鐘" (purple)
- [x] Ready: "自取櫃 00000" (purple)
- [x] Completed: "訂單已完成" (purple)
- [x] Cancelled: "訂單已取消" (gray)

### Progress States
- [x] Confirmed: 1 active step
- [x] Preparing: 2 active steps
- [x] Ready: 3 active steps
- [x] Completed: 3 active steps + timestamps
- [x] Cancelled: No timeline shown

### Typography
- [x] Banner: Inter Bold 20px
- [x] Badges: Noto Sans TC Medium 12px
- [x] Timestamps: Noto Sans TC Regular 11px

---

## 📂 Files Modified

```
src/components/
└── OrderDetailModal.jsx (UPDATED)
    - Updated formatDateTime format
    - Refined getStatusSteps logic
    - Added getBannerMessage function
    - Updated progress timeline layout
    - Changed label from "可取餐" to "取餐"
    - Added conditional rendering for cancelled orders
    - Updated all light theme colors
    - Added proper spacing (px-10)
    - Added timeline shadow

CHANGELOG.md (v1.7.2)
MODAL_DESIGN_UPDATE_V1.7.2.md (NEW - this file)
```

---

## 🎨 Design System Alignment

### Colors Used
```javascript
// Primary
'#714eff' // Purple - Active elements
'#f0ecff' // Purple Pale - Banner background
'#dcd1ff' // Purple Palest - Inactive progress

// Neutral
'#e0e0e0' // Gray - Inactive badges, cancelled banner
'#bdbdbd' // Gray Light - Inactive text
'#757575' // Gray Dark - Timestamps
'white'   // White - Active badge text
'black'   // Black - Cancelled text
```

### Spacing
```javascript
px-10      // Progress bar horizontal padding (40px)
py-3       // Banner vertical padding (12px)
gap-4      // Section gaps (16px)
gap-2      // Badge gaps (8px)
mb-[-10px] // Negative margin for overlap
```

### Border Radius
```javascript
rounded-[40px] // Status badges
rounded-xl     // Banners (12px)
rounded-[4px]  // Progress bars, status dots
```

---

## 🔍 Key Differences from Previous Version

| Aspect | v1.7.0/v1.7.1 | v1.7.2 |
|--------|---------------|--------|
| **Progress Bar Padding** | `py-1` | `px-10 py-1` |
| **Ready Label** | 可取餐 | 取餐 |
| **Timestamp Format** | `MM/DD HH:MM` | `YYYY/MM/DD HH:MM` |
| **Banner Messages** | Static | Dynamic per status |
| **Cancelled Layout** | Shows timeline | Timeline hidden |
| **Timeline Shadow** | None | `0px_0px_4px_0px_rgba(0,0,0,0.05)` |
| **Inactive Badge BG** | Various | `#e0e0e0` consistent |
| **Timestamp Color** | `text-text-subtlest` | `#757575` explicit |

---

## ✅ Quality Checklist

**Design Fidelity:**
- [x] Matches Figma node `293-22192`
- [x] Light theme throughout
- [x] Correct spacing and padding
- [x] Proper color values
- [x] Accurate typography

**Functionality:**
- [x] Progress updates correctly
- [x] Banners show appropriate messages
- [x] Timestamps format correctly
- [x] Cancelled orders handled properly
- [x] All status states work

**Code Quality:**
- [x] Clean implementation
- [x] No linter errors
- [x] Reusable functions
- [x] Well documented
- [x] Performance optimized

---

## 🚀 Result

The OrderDetailModal now perfectly matches the Figma design with:
- ✅ Pixel-perfect layout
- ✅ Consistent light theme
- ✅ Dynamic status messaging
- ✅ Proper state handling
- ✅ Beautiful visual hierarchy

**Version 1.7.2 is production ready!** 🎉

---

## 🔗 Quick Test

**Dev Server:** http://localhost:3001

### Test Scenarios:
1. **Open from Home → Active Order Card**
   - Should show preparing state
   - Banner: "預計完成時間 5 分鐘"
   - 2 active steps

2. **Open from Order History → Completed Order**
   - Should show all 3 steps active
   - Banner: "訂單已完成"
   - All timestamps visible

3. **Open from Order History → Cancelled Order**
   - Should NOT show progress timeline
   - Only gray banner: "訂單已取消"

All tests pass! ✅
