# Home Page - Light Theme Verification ✅

## Current State

The Home page (`src/pages/Home.jsx`) **already has the light theme fully applied**.

## Applied Changes

### 1. Main Background
```jsx
// Line 104
<div className="bg-white relative size-full overflow-hidden">
```
**Result**: Pure white background (#ffffff)

### 2. Brand Logo Cards
```jsx
// Lines 166 and 176
<div className="bg-white flex flex-1 flex-col h-[68px] items-center justify-between min-h-px min-w-[72px] p-4 relative rounded-card-m shadow-card">
```
**Result**: White cards with subtle shadows

### 3. Status Bar
```jsx
// Line 106
<StatusBar className="absolute bg-status-bar-main h-[54px] left-0 right-0 top-0" />
```
**Result**: Maintains #fafafa (slight off-white) as per design spec

### 4. Store Cards
Store cards inherit white background from the `StoreCard` component, which was updated to use `bg-white`.

## Visual Structure

```
┌─────────────────────────────────────┐
│ ⏰ 9:41    STATUS BAR      🔋📶    │ #fafafa (status bar)
├─────────────────────────────────────┤
│                                     │
│  天冷上班，來點熱咖啡吧～        👤  │
│  📍 內湖區 · 石潭路                 │
│                                     │
│  🔍 搜尋店家、飲料    🎤  ⋮         │ WHITE BACKGROUND
│                                     │ #ffffff
│  ┌───────────────────────────────┐ │
│  │ 再點一次                       │ │
│  │ [Product Cards] ───→          │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 熱門品牌                    →  │ │
│  │ ┌────┐ ┌────┐ ┌────┐        │ │ White cards
│  │ │Logo│ │Logo│ │Logo│        │ │ with shadows
│  │ └────┘ └────┘ └────┘        │ │
│  │ ┌────┐ ┌────┐               │ │
│  │ │Logo│ │Logo│               │ │
│  │ └────┘ └────┘               │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 附近店家                       │ │
│  │ [全部] [☕️咖啡] [🧋手搖茶]    │ │
│  │                               │ │
│  │ ┌─────────────────────────┐  │ │ White store
│  │ │ 7-ELEVEn 道生門市  ⭐4.8│  │ │ cards
│  │ │ 150m · 🚶 3分鐘        │  │ │
│  │ └─────────────────────────┘  │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

## Color Breakdown

| Element | Color | Class Name |
|---------|-------|------------|
| Main Background | `#ffffff` | `bg-white` |
| Status Bar | `#fafafa` | `bg-status-bar-main` |
| Brand Cards | `#ffffff` | `bg-white` |
| Store Cards | `#ffffff` | `bg-white` (inherited) |
| Product Cards | `#ffffff` | `bg-white` (inherited) |
| Text (Primary) | `#424242` | `text-text-main` |
| Search Bar | `#eeeeee` | `bg-search-bar-container` |

## Components Using Light Theme

1. **StatusBar** - iOS-style status bar with time, battery, etc.
2. **Avatar** - User profile picture (top right)
3. **SearchBar** - Light gray background (#eeeeee)
4. **ProductCard** - White cards in "再點一次" section
5. **Logo** - Brand logos in white containers
6. **StoreCard** - White cards showing nearby stores
7. **Chips** - Category filter chips
8. **SectionTitle** - Section headers

All these components work together on the white background.

## Verification Steps

### To verify the light theme is working:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Visit the home page:**
   ```
   http://localhost:3000/
   ```

3. **Check these elements:**
   - [ ] Background is pure white (not gray)
   - [ ] Brand logo cards are white with shadows
   - [ ] Store cards are white with shadows
   - [ ] Product cards are white
   - [ ] All text is dark and readable
   - [ ] Search bar is light gray (#eeeeee)
   - [ ] Status bar area is very light gray (#fafafa)

## Expected Result

You should see:
- ✨ Clean, bright white background
- ✨ White cards that "float" with subtle shadows
- ✨ Dark text (#424242) that's easy to read
- ✨ Light gray search bar
- ✨ Professional, modern appearance

## If Something Looks Wrong

### Issue: Background looks gray instead of white
**Solution**: The dev server might be caching. Try:
```bash
# Stop the server (Ctrl+C)
# Delete cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Issue: Cards don't have shadows
**Solution**: Check that Tailwind is properly configured:
```bash
# Verify tailwind.config.js exists
# Restart the dev server
```

### Issue: Colors look different
**Solution**: Check browser zoom is at 100%
- Press `Cmd+0` (Mac) or `Ctrl+0` (Windows) to reset zoom

## Files Involved

- `src/pages/Home.jsx` - Main home page (✅ Updated)
- `src/components/StoreCard.jsx` - Store cards (✅ Updated)
- `src/components/ProductCard.jsx` - Product cards (uses design system)
- `tailwind.config.js` - Theme configuration
- `design-system.json` - Color tokens

## Confirmation

✅ **Main background**: White (#ffffff)  
✅ **Brand cards**: White (#ffffff)  
✅ **Store cards**: White (#ffffff)  
✅ **Text colors**: Dark and readable  
✅ **Consistent with Store Detail page**  

---

**Status**: ✅ LIGHT THEME FULLY APPLIED  
**Version**: 1.1.1  
**Last Updated**: February 6, 2026  

The Home page is using the correct light theme! 🎉
