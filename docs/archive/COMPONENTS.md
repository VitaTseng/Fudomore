# Component Reference Guide

This document provides a comprehensive reference for all components in the Fudomore design system.

## Table of Contents

1. [StatusBar](#statusbar)
2. [Avatar](#avatar)
3. [SearchBar](#searchbar)
4. [Chips](#chips)
5. [Badge](#badge)
6. [Logo](#logo)
7. [ProductCard](#productcard)
8. [StoreCard](#storecard)
9. [SectionTitle](#sectiontitle)

---

## StatusBar

iOS-style status bar showing time and system indicators.

### Usage
```jsx
import StatusBar from './components/StatusBar';

<StatusBar className="w-full h-[54px]" />
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | '' | Additional CSS classes |

### Features
- Shows time (9:41)
- Battery indicator
- Signal strength indicators
- WiFi indicator

---

## Avatar

User avatar with gradient background and image overlay.

### Usage
```jsx
import Avatar from './components/Avatar';

<Avatar 
  image="https://example.com/avatar.jpg"
  text="A"
  className="size-12"
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | string | undefined | Avatar image URL |
| text | string | '縣' | Fallback text when no image |
| className | string | '' | Additional CSS classes |

### Features
- Gradient background
- Text fallback
- Image overlay
- Circular shape

---

## SearchBar

Search input with icons for voice and menu.

### Usage
```jsx
import SearchBar from './components/SearchBar';

<SearchBar 
  placeholder="Search products..."
  className="w-full"
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| placeholder | string | '搜尋店家、飲料' | Input placeholder text |
| className | string | '' | Additional CSS classes |

### Features
- Search icon (left)
- Input field
- Microphone icon (right)
- More options icon (right)
- Rounded corners (24px)

---

## Chips

Filter chips for category selection.

### Usage
```jsx
import Chips from './components/Chips';

const [selected, setSelected] = useState('all');

<Chips 
  label="☕️ 咖啡"
  selected={selected === 'coffee'}
  onClick={() => setSelected('coffee')}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | required | Chip label text |
| selected | boolean | false | Selection state |
| onClick | function | undefined | Click handler |
| className | string | '' | Additional CSS classes |

### States
- **Default**: Black background, white text
- **Selected**: White background, black text
- **Hover**: Opacity transition

---

## Badge

Small informational badge with rounded corners.

### Usage
```jsx
import Badge from './components/Badge';

<Badge label="#咖啡" />
<Badge label="10-15分鐘" />
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | required | Badge text |
| className | string | '' | Additional CSS classes |

### Features
- Capsule shape (20px border radius)
- Semi-transparent background
- White text
- Compact padding

---

## Logo

Brand logo component with multiple variants.

### Usage
```jsx
import Logo from './components/Logo';

<Logo variant="coffee" className="h-[60px] w-[120px]" />
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'default' | Logo variant type |
| className | string | '' | Additional CSS classes |

### Variants
- default
- coffee
- prima
- tea
- pearl
- fresh

---

## ProductCard

Card component displaying product information.

### Usage
```jsx
import ProductCard from './components/ProductCard';

<ProductCard
  image="https://example.com/product.jpg"
  provider="不可思議茶bar"
  providerLogo="https://example.com/logo.jpg"
  rating={4.8}
  name="金培烏龍茶王"
  description="大杯 | 熱 | 無糖"
  price={45}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | string | required | Product image URL |
| provider | string | required | Provider name |
| providerLogo | string | required | Provider logo URL |
| rating | number | required | Product rating (0-5) |
| name | string | required | Product name |
| description | string | required | Product description |
| price | number | required | Product price |
| className | string | '' | Additional CSS classes |

### Layout
```
┌─────────────────┐
│                 │
│     Image       │ 240x240px
│                 │
├─────────────────┤
│ 🏪 Provider ⭐4.8│ 12px text
│ Product Name    │ 14px bold
│ Description     │ 11px
│ $45             │ 14px bold
└─────────────────┘
```

---

## StoreCard

Card component displaying store information.

### Usage
```jsx
import StoreCard from './components/StoreCard';

<StoreCard
  image="https://example.com/store.jpg"
  name="7-ELEVEn 道生門市"
  rating={4.8}
  distance="150m"
  walkTime="🚶 3分鐘"
  badges={['#咖啡', '#CITY PRIMA']}
  estimatedTime="10-15分鐘"
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | string | required | Store image URL |
| name | string | required | Store name |
| rating | number | required | Store rating (0-5) |
| distance | string | required | Distance to store |
| walkTime | string | required | Estimated walk time |
| badges | array | [] | Category badges |
| estimatedTime | string | undefined | Delivery estimate |
| className | string | '' | Additional CSS classes |

### Layout
```
┌────────────────────────────┐
│                            │
│        Store Image         │ 361x240px
│     [10-15分鐘]            │ Time badge
│                            │
├────────────────────────────┤
│ Store Name          ⭐ 4.8 │ 14px
│ 150m  🚶3分鐘  #咖啡      │ 12px
└────────────────────────────┘
```

---

## SectionTitle

Section title with optional navigation arrow.

### Usage
```jsx
import SectionTitle from './components/SectionTitle';

<SectionTitle 
  title="熱門品牌" 
  showArrow={true}
  onArrowClick={() => navigate('/brands')}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Section title text |
| showArrow | boolean | false | Show arrow button |
| onArrowClick | function | undefined | Arrow click handler |
| className | string | '' | Additional CSS classes |

### Features
- Bold 16px title text
- Optional right arrow button
- Full width layout
- Consistent padding

---

## Component Patterns

### Responsive Images
All image components use:
```jsx
<img 
  alt="Description"
  className="w-full h-full object-cover"
  src={imageUrl}
/>
```

### Color Usage
```jsx
// Text colors
text-text-main      // #424242 - Primary text
text-text-subtle    // #616161 - Secondary text
text-text-subtlest  // #9e9e9e - Tertiary text
text-text-white     // #ffffff - White text

// Background colors
bg-surface-general  // #fafafa - Main background
bg-card-container   // #ffffff - Card background
bg-badge-common     // rgba(0,0,0,0.08) - Badge background
```

### Typography
```jsx
// Chinese text
className="font-noto-sans font-semibold text-sm"

// English text and numbers
className="font-poppins font-semibold text-sm"
```

### Spacing
```jsx
// Gaps
gap-100    // 8px
gap-150    // 12px
gap-200    // 16px

// Padding
p-100      // 8px
p-150      // 12px
p-200      // 16px
px-200     // horizontal 16px
py-200     // vertical 16px
```

### Border Radius
```jsx
rounded-input-l      // 24px - Input fields
rounded-card-m       // 20px - Cards
rounded-badge-capsule // 20px - Badges
rounded-chips        // 24px - Filter chips
```

### Shadows
```jsx
shadow-card  // 0px 0px 4px 0px rgba(0, 0, 0, 0.05)
```

---

## Best Practices

### 1. Consistent Spacing
Always use the spacing scale (100, 150, 200) for margins and gaps.

### 2. Typography Hierarchy
- Use Noto Sans TC for Chinese
- Use Poppins for English/numbers
- Maintain consistent line heights

### 3. Color Semantics
- Use semantic color names
- Maintain contrast ratios (WCAG AA)
- Test in dark mode

### 4. Image Optimization
- Use appropriate image sizes
- Add descriptive alt text
- Implement lazy loading for off-screen images

### 5. Accessibility
- Provide keyboard navigation
- Add ARIA labels
- Ensure sufficient color contrast
- Use semantic HTML

### 6. Performance
- Import only needed components
- Optimize images
- Use React.memo for expensive components
- Avoid unnecessary re-renders

---

## Testing Components

### Visual Testing
Check components at different screen sizes:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+

### Interaction Testing
Test all interactive states:
- Default
- Hover
- Active
- Focus
- Disabled

### Accessibility Testing
Verify:
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Focus indicators

---

## Component Development Checklist

When creating a new component:

- [ ] Follow naming conventions
- [ ] Use design tokens from Tailwind config
- [ ] Add PropTypes or TypeScript types
- [ ] Include default props
- [ ] Add className support for customization
- [ ] Document in this file
- [ ] Test responsiveness
- [ ] Verify accessibility
- [ ] Optimize performance
- [ ] Add usage examples
