# Setup Guide

This guide will help you set up and run the Fudomore project.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher (comes with Node.js)

You can check your versions with:
```bash
node --version
npm --version
```

## Installation

1. **Navigate to the project directory**
   ```bash
   cd "/Users/vitatseng/Documents/03_Vita's corner/Fudomore"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - React 18
   - Vite (build tool)
   - Tailwind CSS
   - ESLint

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

This will:
- Start a local development server on `http://localhost:3000`
- Automatically open your browser
- Enable hot module replacement (HMR) for instant updates

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
Fudomore/
├── design-system.json          # Design system tokens
├── DESIGN_SYSTEM.md            # Design system documentation
├── index.html                  # HTML entry point
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
├── postcss.config.js           # PostCSS configuration
├── .eslintrc.cjs               # ESLint configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Project overview
├── SETUP.md                    # This file
└── src/
    ├── main.jsx                # Application entry point
    ├── App.jsx                 # Main App component
    ├── index.css               # Global styles
    ├── constants/
    │   └── designTokens.js     # Design tokens as JS constants
    └── components/
        ├── Avatar.jsx          # Avatar component
        ├── Badge.jsx           # Badge component
        ├── Chips.jsx           # Filter chips component
        ├── Logo.jsx            # Logo component
        ├── ProductCard.jsx     # Product card component
        ├── SearchBar.jsx       # Search bar component
        ├── SectionTitle.jsx    # Section title component
        ├── StatusBar.jsx       # Status bar component
        └── StoreCard.jsx       # Store card component
```

## Development Tips

### Hot Reload
The development server supports hot module replacement. Changes to your code will be reflected immediately without a full page reload.

### Linting
Run ESLint to check code quality:
```bash
npm run lint
```

### Tailwind CSS
- All Tailwind classes are available
- Custom design tokens are defined in `tailwind.config.js`
- View the design system in `DESIGN_SYSTEM.md`

### Design Tokens
Design tokens can be imported from:
- `design-system.json` - Full design system specification
- `src/constants/designTokens.js` - JavaScript constants

Example:
```javascript
import { COLORS, TYPOGRAPHY, SPACING } from './constants/designTokens';

const textColor = COLORS.text.main;
const fontSize = TYPOGRAPHY.chinese.body.b1Regular.fontSize;
```

## Fonts

The project uses two font families:
- **Noto Sans TC**: For Chinese text
- **Poppins**: For English text and numbers

These fonts are loaded from Google Fonts in `index.html`.

## Browser Support

The application is optimized for:
- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can:
1. Kill the process using port 3000
2. Or modify the port in `vite.config.js`

### Dependencies Issues
If you encounter dependency issues:
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Build Errors
If you encounter build errors:
1. Check that all dependencies are installed
2. Ensure you're using Node.js 18+
3. Clear the cache: `rm -rf node_modules/.vite`

## Next Steps

1. **Customize the Design**: Edit components in `src/components/`
2. **Add New Features**: Create new components following the design system
3. **Update Styles**: Modify `tailwind.config.js` or `design-system.json`
4. **Add Routes**: Install React Router for navigation
5. **Connect to API**: Add data fetching with fetch/axios

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Design System Documentation](./DESIGN_SYSTEM.md)

## Support

For issues or questions:
1. Check the documentation files
2. Review the design system specifications
3. Examine the component examples in `App.jsx`

Happy coding! 🚀
