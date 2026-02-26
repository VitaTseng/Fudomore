# Quick Reference Card

## 🎨 Theme Colors (Light Theme)

### Backgrounds
```
Main: #ffffff (white)
Subtle: #eeeeee (light gray)
Cards: #ffffff (white)
Status Bar: #fafafa (off-white)
```

### Text
```
Primary: #424242 (dark gray)
Subtle: #616161 (medium gray)
Subtlest: #9e9e9e (light gray)
On Dark: #ffffff (white)
```

### Buttons
```
Primary CTA: #000000 (black bg, white text)
Navigation: #ffffff (white bg, black icons)
Add Button: #eeeeee (light gray bg)
```

### Accents
```
Selected Category: #00704a (green)
Borders: #eeeeee (light gray)
Dividers: rgba(0, 0, 0, 0.15)
```

## 🧩 Component Quick Use

### MenuItemCard
```jsx
<MenuItemCard
  image="url"
  name="Product Name"
  price={160}
  onAdd={() => handleAdd()}
/>
```

### CategoryTab
```jsx
<CategoryTab
  label="茶 Bar"
  selected={true}
  onClick={() => select('tea')}
/>
```

### StoreCard (with navigation)
```jsx
<div onClick={() => navigate(`/store/${id}`)}>
  <StoreCard {...storeData} />
</div>
```

## 🛣️ Routes

```
/ - Home page
/store/:id - Store detail page
```

## 🚀 Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Check code
```

## 📱 Layout Widths

```
Mobile: 375px (primary)
Tablet: 768px
Desktop: 1024px+
```

## 🎯 Design Tokens

### Spacing
```
0: 0px
100: 8px
150: 12px
200: 16px
```

### Border Radius
```
Input: 24px
Card: 20px
Badge: 20px
Chips: 24px
Avatar: 40px (circular)
```

### Typography
```
H1: 20px/600 (Noto Sans TC)
H2: 16px/600 (Noto Sans TC)
Body 1: 14px/400 or 600
Body 2: 12px/400 or 600
Body 3: 11px/400
```

## 📁 Key Files

```
src/
├── App.jsx - Router setup
├── pages/
│   ├── Home.jsx - Landing page
│   └── StoreDetail.jsx - Store view
└── components/
    ├── MenuItemCard.jsx - Menu items
    ├── CategoryTab.jsx - Categories
    └── [9 more components]
```

## 🔗 Quick Links

- [README](./README.md) - Overview
- [SETUP](./SETUP.md) - Installation
- [QUICKSTART](./QUICKSTART.md) - 3-step start
- [ROUTING](./ROUTING.md) - Navigation
- [COMPONENTS](./COMPONENTS.md) - Component API
- [DESIGN_SYSTEM](./DESIGN_SYSTEM.md) - Design specs
- [THEME_UPDATE](./THEME_UPDATE.md) - Theme details

---

**Keep this card handy for quick reference!** 📌
