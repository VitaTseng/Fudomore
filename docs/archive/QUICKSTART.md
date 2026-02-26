# Quick Start Guide

Get the Fudomore app running in 3 simple steps!

## 🚀 Step 1: Install Dependencies (2 minutes)

Open your terminal and navigate to the project:

```bash
cd "/Users/vitatseng/Documents/03_Vita's corner/Fudomore"
```

Install all required packages:

```bash
npm install
```

You should see:
```
added 245 packages, and audited 246 packages in 45s
```

## 🎨 Step 2: Start Development Server (30 seconds)

Run the development server:

```bash
npm run dev
```

You should see:
```
  VITE v5.4.2  ready in 523 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## 👀 Step 3: View in Browser (instant)

Your browser should automatically open to `http://localhost:3000`

If it doesn't, manually open your browser and go to:
```
http://localhost:3000
```

## ✅ You're Done!

You should now see the Fudomore home screen with:
- iOS status bar at the top
- User greeting and location
- Search bar
- "再點一次" section with product cards
- "熱門品牌" section with brand logos
- "附近店家" section with store cards

## 🎯 What to Try Next

### 1. Click Around
- Try selecting different category chips (全部, ☕️ 咖啡, etc.)
- Scroll through the product cards horizontally
- Check the responsive design by resizing your browser

### 2. Make Your First Edit

Open `src/App.jsx` and change the greeting:

```jsx
// Find this line (around line 156):
<p className="font-noto-sans font-semibold leading-normal...">
  天冷上班，來點熱咖啡吧～
</p>

// Change to:
<p className="font-noto-sans font-semibold leading-normal...">
  歡迎使用 Fudomore！
</p>
```

Save the file and watch it update instantly in your browser!

### 3. Explore Components

Open `src/components/` and explore each component:

```bash
src/components/
├── Avatar.jsx       # User avatars
├── Badge.jsx        # Info badges
├── Chips.jsx        # Filter chips
├── Logo.jsx         # Brand logos
├── ProductCard.jsx  # Product displays
├── SearchBar.jsx    # Search input
├── SectionTitle.jsx # Section headers
├── StatusBar.jsx    # iOS status bar
└── StoreCard.jsx    # Store displays
```

### 4. Check the Design System

Open `design-system.json` to see all design tokens:

```json
{
  "colors": { ... },
  "typography": { ... },
  "spacing": { ... },
  "borderRadius": { ... },
  "effects": { ... }
}
```

### 5. Read the Documentation

- **README.md** - Project overview and features
- **SETUP.md** - Detailed setup guide
- **DESIGN_SYSTEM.md** - Complete design system docs
- **COMPONENTS.md** - Component API reference
- **IMPLEMENTATION_SUMMARY.md** - What was built

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🎨 Customization Examples

### Change Background Color

Edit `tailwind.config.js`:

```javascript
colors: {
  'surface-general': '#f5f5f5', // Change from #fafafa
}
```

### Add New Product

Edit `src/App.jsx` and add to `PRODUCT_DATA`:

```javascript
const PRODUCT_DATA = [
  // ... existing products
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
    provider: 'Your Brand',
    providerLogo: 'https://via.placeholder.com/16',
    rating: 5.0,
    name: 'New Product',
    description: 'Medium | Hot | Sweet',
    price: 50
  }
];
```

### Change Font Size

Edit any component or `tailwind.config.js`:

```jsx
// In component
<p className="text-base">Text</p> // Change to text-lg

// Or in tailwind.config.js
fontSize: {
  'base': '16px', // Change from 14px
}
```

## 📱 Mobile Testing

### Test on Real Device

1. Find your computer's IP address:
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet "
   
   # On Windows
   ipconfig
   ```

2. Start dev server with host flag:
   ```bash
   npm run dev -- --host
   ```

3. On your mobile device, go to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

### Test with Browser DevTools

1. Open browser DevTools (F12)
2. Click the device toggle icon (Ctrl+Shift+M)
3. Select "iPhone SE" or "iPhone 12 Pro" (375px width)

## ❓ Troubleshooting

### Port Already in Use

Change port in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Change from 3000
    open: true
  }
});
```

### Dependencies Not Installing

Try clearing npm cache:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working

1. Save the file again
2. Refresh the browser (Cmd/Ctrl + R)
3. Restart the dev server (Ctrl+C, then `npm run dev`)

### Fonts Not Loading

Check internet connection (fonts load from Google Fonts)

### Styles Look Wrong

1. Make sure Tailwind is working:
   ```bash
   npm run dev
   ```
2. Check browser console for errors
3. Clear browser cache (Cmd/Ctrl + Shift + R)

## 🎓 Learning Resources

### For This Project
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design tokens and guidelines
- [COMPONENTS.md](./COMPONENTS.md) - How to use each component
- [SETUP.md](./SETUP.md) - Detailed setup information

### External Resources
- [React Tutorial](https://react.dev/learn) - Learn React basics
- [Vite Guide](https://vitejs.dev/guide/) - Vite documentation
- [Tailwind Docs](https://tailwindcss.com/docs) - Tailwind CSS
- [Figma Design](https://www.figma.com/design/BJtlIjgw01Np6Ad6YoXMvf/) - Original design

## 💡 Tips

1. **Use Hot Reload**: Save any file to see instant changes
2. **Check Console**: Open browser console (F12) for errors
3. **Use DevTools**: Inspect elements to understand styling
4. **Read Components**: Learn by reading component code
5. **Experiment**: Don't be afraid to change things!

## 🎉 You're Ready!

You now have a fully functional React app with:
- ✅ Modern React setup
- ✅ Tailwind CSS styling
- ✅ Complete design system
- ✅ Reusable components
- ✅ Mobile-optimized layout
- ✅ Fast development workflow

Start building your features and enjoy coding! 🚀

---

Need help? Check the documentation files or review the component examples in `App.jsx`.
