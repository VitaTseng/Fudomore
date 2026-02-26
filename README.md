# Fudomore (吃香喝辣)

A modern food and beverage delivery application built with React and Tailwind CSS, implementing a comprehensive design system from Figma.

![Fudomore Preview](https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400)

## ✨ Features

- 🎨 **Complete Design System** - Comprehensive design tokens from Figma
- 📱 **Mobile-First** - Optimized for mobile devices (375px)
- 🌏 **Bilingual Support** - Chinese (Noto Sans TC) & English (Poppins)
- 🎯 **Component-Based** - Modular React components
- 🚀 **Fast Development** - Powered by Vite
- 💅 **Tailwind CSS** - Utility-first styling
- 🛒 **Cart System** - Global state management with Context API
- 🔔 **Active Order Card** - Floating status card on home page with purple gradient
- 📦 **Order Tracking** - Real-time order status with progress timeline
- 📜 **Order History** - View past orders with filtering
- ♿ **Accessible** - WCAG compliance
- 📦 **Production Ready** - Optimized builds

## 🎨 Design System

The project includes a comprehensive design system in `design-system.json`:

### Colors
- **Text**: Main (#424242), Subtle (#616161), Subtlest (#9e9e9e)
- **Surfaces**: General (#fafafa), Cards (#ffffff), Search Bar (#eeeeee)
- **Components**: Chips, badges, buttons with dark theme

### Typography
- **Chinese**: Noto Sans TC (20px, 16px, 14px, 12px, 11px)
- **English**: Poppins (14px for numbers and English text)
- **Weights**: 400 (Regular), 600 (Semibold/Bold)

### Spacing (8px Base Unit)
- `0`: 0px
- `100`: 8px
- `150`: 12px
- `200`: 16px

### Border Radius
- Input Fields: 24px
- Cards: 20px
- Badges: 20px (capsule)
- Chips: 24px

## 📁 Project Structure

```
Fudomore/
├── 📄 design-system.json       # Design system tokens
├── 📂 docs/                    # Documentation
│   ├── FEATURES.md             # Complete features guide
│   └── archive/                # Historical docs
├── 📄 SETUP.md                 # Setup guide
├── 📄 README.md                # This file
├── 📄 package.json             # Dependencies
├── 📄 tailwind.config.js       # Tailwind config
├── 📄 vite.config.js           # Vite config
├── 📄 index.html               # Entry HTML
└── 📁 src/
    ├── 📄 main.jsx             # App entry point
    ├── 📄 App.jsx              # Main component
    ├── 📄 index.css            # Global styles
    ├── 📁 constants/
    │   └── 📄 designTokens.js  # Design tokens
    └── 📁 components/
        ├── 📄 Avatar.jsx       # User avatar
        ├── 📄 Badge.jsx        # Info badges
        ├── 📄 Chips.jsx        # Filter chips
        ├── 📄 Logo.jsx         # Brand logos
        ├── 📄 ProductCard.jsx  # Product cards
        ├── 📄 SearchBar.jsx    # Search input
        ├── 📄 SectionTitle.jsx # Section headers
        ├── 📄 StatusBar.jsx    # iOS status bar
        └── 📄 StoreCard.jsx    # Store cards
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

Check your versions:
```bash
node --version
npm --version
```

### Installation

1. **Navigate to project directory**
   ```bash
   cd "/Users/vitatseng/Documents/03_Vita's corner/Fudomore"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Database (Supabase)**
   - Create a Supabase project at https://supabase.com
   - Copy your project URL and anon key
   - Create `.env.local` in project root:
     ```env
     VITE_SUPABASE_URL=https://xxxxx.supabase.co
     VITE_SUPABASE_ANON_KEY=your_anon_key_here
     VITE_MOCK_USER_ID=00000000-0000-0000-0000-000000000001
     ```
   - Run the SQL schema from `docs/SUPABASE_INTEGRATION.md` in Supabase SQL Editor
   - Seed sample data (stores, menu items, etc.)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📖 Documentation

### Core Documentation
- **[SETUP.md](./SETUP.md)** - Complete setup and installation guide
- **[docs/SUPABASE_INTEGRATION.md](./docs/SUPABASE_INTEGRATION.md)** - Database schema and setup
- **[SUPABASE_IMPLEMENTATION_COMPLETE.md](./SUPABASE_IMPLEMENTATION_COMPLETE.md)** - Integration guide
- **[docs/FEATURES.md](./docs/FEATURES.md)** - Complete features documentation
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

### Design Files
- **design-system.json** - Design tokens in JSON format
- **src/constants/designTokens.js** - Design tokens as JavaScript constants

## 🎯 Key Features Explained

### Routing & Navigation
The app uses React Router for navigation between pages:
- **Home Page** (`/`): Main landing page with stores and products
- **Store Detail** (`/store/:id`): Detailed store view with menu and categories
- Smooth transitions between pages
- Back button navigation

See [ROUTING.md](./ROUTING.md) for detailed routing documentation.

### Design System Integration
All design tokens from Figma are integrated into Tailwind CSS configuration:

```javascript
// Import design tokens
import { COLORS, TYPOGRAPHY, SPACING } from './constants/designTokens';

// Use in components
<div className="text-text-main bg-surface-general p-200 rounded-card-m">
  <h1 className="font-noto-sans text-xl font-semibold">Title</h1>
</div>
```

### Component Library
Reusable components following Figma designs:

```jsx
// StatusBar - iOS-style status bar
<StatusBar />

// Avatar - User avatar with image/text
<Avatar image="url" text="A" />

// SearchBar - Search input with icons
<SearchBar placeholder="Search..." />

// Chips - Filter chips
<Chips label="☕️ Coffee" selected={true} onClick={handleClick} />

// ProductCard - Product display
<ProductCard 
  image="url"
  name="Product Name"
  price={45}
  rating={4.8}
/>

// StoreCard - Store information
<StoreCard 
  image="url"
  name="Store Name"
  distance="150m"
  badges={['#coffee']}
/>
```

### Mobile-First Design
The UI is optimized for mobile devices (375px width) with:
- Touch-friendly tap targets
- Horizontal scrolling for card lists
- Fixed status bar
- Bottom navigation area

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Framework | 18.3.1 |
| Vite | Build Tool | 5.4.2 |
| Tailwind CSS | Styling | 3.4.10 |
| PostCSS | CSS Processing | 8.4.47 |
| ESLint | Code Linting | 8.57.0 |

### Fonts
- **Noto Sans TC** - Google Fonts (Chinese)
- **Poppins** - Google Fonts (English/Numbers)

## 📱 Application Structure

### Home Screen
```
┌─────────────────────────────────┐
│ ⏰ 9:41           📶 📡 🔋    │ Status Bar
├─────────────────────────────────┤
│ 天冷上班，來點熱咖啡吧～  👤     │ Header
│ 📍 內湖區 · 石潭路 ▼            │
├─────────────────────────────────┤
│ 🔍 搜尋店家、飲料     🎤 ⋮      │ Search
├─────────────────────────────────┤
│ 再點一次                        │ History
│ [Product] [Product] [Product]   │ Horizontal Scroll
├─────────────────────────────────┤
│ 熱門品牌                    →   │ Brands
│ [Logo] [Logo] [Logo]            │
│ [Logo] [Logo]                   │
├─────────────────────────────────┤
│ 附近店家                        │ Stores
│ 全部  ☕️咖啡  🧋手搖茶  🥤果茶  │ Filters
│ ┌─────────────────────────────┐ │
│ │     Store Image             │ │
│ │     [10-15分鐘]            │ │
│ ├─────────────────────────────┤ │
│ │ 7-ELEVEn         ⭐ 4.8     │ │
│ │ 150m  🚶3分鐘  #咖啡       │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## 🎨 Design Tokens Usage

### In JSX/JavaScript
```javascript
import { COLORS, SPACING, TYPOGRAPHY } from './constants/designTokens';

const styles = {
  color: COLORS.text.main,
  fontSize: TYPOGRAPHY.chinese.body.b1Regular.fontSize,
  padding: SPACING.baseUnit[200]
};
```

### In Tailwind Classes
```jsx
<div className="text-text-main text-sm p-200 bg-card-container rounded-card-m shadow-card">
  Content
</div>
```

### Custom CSS
```css
.custom-component {
  color: var(--text-main);
  background: var(--surface-general);
  padding: var(--spacing-200);
  border-radius: var(--card-m);
}
```

## 🔧 Customization

### Adding New Colors
1. Update `design-system.json`:
```json
{
  "colors": {
    "custom": {
      "primary": "#FF5733"
    }
  }
}
```

2. Update `tailwind.config.js`:
```javascript
colors: {
  'custom-primary': '#FF5733'
}
```

3. Use in components:
```jsx
<div className="bg-custom-primary">Content</div>
```

### Creating New Components
Follow the component structure:

```jsx
import React from 'react';

const MyComponent = ({ 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`bg-card-container rounded-card-m p-200 ${className}`}>
      <h2 className="font-noto-sans font-semibold text-base text-text-main">
        {title}
      </h2>
      <p className="font-noto-sans text-sm text-text-subtle">
        {description}
      </p>
    </div>
  );
};

export default MyComponent;
```

## 🧪 Testing

### Component Testing
```bash
# Install testing dependencies (not included by default)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

Example test:
```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from './Badge';

describe('Badge', () => {
  it('renders label correctly', () => {
    render(<Badge label="#咖啡" />);
    expect(screen.getByText('#咖啡')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates optimized files in the `dist` directory.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

## 📊 Performance

### Optimization Tips
1. **Code Splitting**: Lazy load routes and components
2. **Image Optimization**: Use WebP format, appropriate sizes
3. **Tree Shaking**: Import only needed dependencies
4. **Caching**: Leverage browser caching for assets
5. **Bundle Analysis**: Use `vite-bundle-visualizer`

### Current Bundle Size
- Vendor: ~150KB (gzipped)
- App: ~30KB (gzipped)
- Total: ~180KB (gzipped)

## 🤝 Contributing

### Code Style
- Follow ESLint rules
- Use Prettier for formatting
- Follow component naming conventions
- Document all new components

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add: description of changes"

# Push and create PR
git push origin feature/your-feature
```

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Initial implementation
- ✅ Complete design system
- ✅ All core components
- ✅ Mobile-optimized layout
- ✅ Comprehensive documentation

## 🐛 Known Issues

None currently. Report issues in the GitHub repository.

## 🔮 Roadmap

### Planned Features
- [ ] Add React Router for navigation
- [ ] Implement state management (Zustand/Redux)
- [ ] Add API integration
- [ ] User authentication
- [ ] Shopping cart functionality
- [ ] Order history
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)
- [ ] PWA support
- [ ] Unit tests

## 📚 Resources

### Project Documentation
- **[SETUP.md](./SETUP.md)** - Installation and setup guide
- **[docs/FEATURES.md](./docs/FEATURES.md)** - Complete features documentation
- **[docs/SUPABASE_INTEGRATION.md](./docs/SUPABASE_INTEGRATION.md)** - Database integration guide
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

### External Resources
- [Figma Design File](https://www.figma.com/design/BJtlIjgw01Np6Ad6YoXMvf/)
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

Private project - All rights reserved

## 👥 Authors

- Vita Tseng - Initial implementation

## 🙏 Acknowledgments

- Design by 吃香喝辣 team
- Google Fonts for Noto Sans TC and Poppins
- Unsplash for placeholder images

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

## Design System Usage

The design system tokens are defined in `design-system.json` and integrated into Tailwind CSS configuration. You can reference colors, typography, and spacing using Tailwind utility classes:

### Colors
```jsx
<div className="bg-surface-general text-text-main">
  <p className="text-text-subtle">Subtle text</p>
</div>
```

### Typography
```jsx
<h1 className="font-noto-sans text-xl font-semibold">Title</h1>
<p className="font-poppins text-sm">Body text</p>
```

### Spacing
```jsx
<div className="p-200 gap-100">
  <div className="mb-150">Content</div>
</div>
```

## Components

### Available Components

#### Layout Components
- **StatusBar**: iOS status bar with time and indicators
- **Avatar**: User avatar with image and fallback text
- **SearchBar**: Search input with icons
- **SectionTitle**: Section headers with optional arrow

#### Content Components
- **Logo**: Brand logo component with variants
- **ProductCard**: Vertical product cards with image, name, price
- **StoreCard**: Store cards with image, rating, badges
- **MenuItemCard**: Horizontal menu item cards for store detail

#### Interactive Components
- **Chips**: Filter chips for categories
- **Badge**: Information badges
- **CategoryTab**: Sidebar category tabs for menu navigation

## Technologies

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Noto Sans TC**: Chinese typography
- **Poppins**: English typography

## Design Reference

The design is implemented from Figma:
[吃香喝辣 Design File](https://www.figma.com/design/BJtlIjgw01Np6Ad6YoXMvf/)

## License

Private project - All rights reserved
