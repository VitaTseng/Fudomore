# Design System Documentation

## Overview

This design system is based on the Figma design "吃香喝辣" (Fudomore) and provides a comprehensive set of design tokens, components, and patterns for building consistent user interfaces.

## Design Tokens

Design tokens are stored in `design-system.json` and integrated into the Tailwind configuration.

### Color System

#### Text Colors
- `text-main`: #424242 - Primary text color
- `text-subtle`: #616161 - Secondary text color
- `text-subtlest`: #9e9e9e - Tertiary text color
- `text-white`: #ffffff - White text
- `text-inverse`: #ffffff - Inverse text color

#### Surface Colors
- `surface-general`: #fafafa - Main background
- `status-bar-main`: #fafafa - Status bar background
- `card-container`: #ffffff - Card background
- `search-bar-container`: #eeeeee - Search input background

#### Component Colors
- `avatar-container`: #bdbdbd - Avatar background
- `badge-common`: rgba(0, 0, 0, 0.08) - Badge background
- `chips-default`: #000000 - Chip default background
- `chips-selected`: #ffffff - Chip selected background
- `chips-stroke-default`: #eeeeee - Chip default border
- `chips-stroke-selected`: #424242 - Chip selected border

### Typography

#### Font Families
- **Chinese**: Noto Sans TC (for Chinese content)
- **English**: Poppins (for English content and numbers)

#### Typography Scale

##### Chinese Typography

**Titles**
- H1 Bold: 20px, weight 600, line-height 1
- H2 Bold: 16px, weight 600, line-height 1

**Body**
- B1 Regular: 14px, weight 400, line-height 1.5
- B1 Bold: 14px, weight 600, line-height 1.5
- B2 Regular: 12px, weight 400, line-height 1.5
- B2 Bold: 12px, weight 600, line-height 1.5
- B3 Regular: 11px, weight 400, line-height 1.5

##### English Typography

**Body**
- B1 Regular: 14px, weight 400, line-height 1.5
- B1 Bold: 14px, weight 600, line-height 1.5

### Spacing System

Based on an 8px base unit:
- `0`: 0px
- `100`: 8px
- `150`: 12px
- `200`: 16px

### Border Radius

- `input-l`: 24px - Large input fields
- `card-m`: 20px - Medium cards
- `badge-capsule`: 20px - Badge capsule
- `avatar`: 120px - Avatar (circular)
- `chips`: 24px - Filter chips

### Shadows

**Card Shadow**
```css
box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);
```

## Components

### StatusBar
iOS-style status bar component showing time and system indicators.

```jsx
<StatusBar className="w-full h-[54px]" />
```

### Avatar
User avatar with gradient background and optional image overlay.

**Props:**
- `image`: string (optional) - Avatar image URL
- `text`: string (default: '縣') - Fallback text
- `className`: string - Additional CSS classes

```jsx
<Avatar 
  image="https://example.com/avatar.jpg"
  text="A"
  className="size-12"
/>
```

### SearchBar
Search input with microphone and menu icons.

**Props:**
- `placeholder`: string (default: '搜尋店家、飲料')
- `className`: string - Additional CSS classes

```jsx
<SearchBar placeholder="Search..." />
```

### Chips
Filter chips for category selection.

**Props:**
- `label`: string (required) - Chip label
- `selected`: boolean (default: false) - Selection state
- `onClick`: function - Click handler
- `className`: string - Additional CSS classes

```jsx
<Chips 
  label="☕️ 咖啡"
  selected={true}
  onClick={() => handleSelect('coffee')}
/>
```

### Badge
Small informational badge with rounded corners.

**Props:**
- `label`: string (required) - Badge text
- `className`: string - Additional CSS classes

```jsx
<Badge label="#咖啡" />
```

### ProductCard
Card component for displaying product information.

**Props:**
- `image`: string - Product image URL
- `provider`: string - Provider name
- `providerLogo`: string - Provider logo URL
- `rating`: number - Product rating
- `name`: string - Product name
- `description`: string - Product description
- `price`: number - Product price
- `className`: string - Additional CSS classes

```jsx
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

### StoreCard
Card component for displaying store information.

**Props:**
- `image`: string - Store image URL
- `name`: string - Store name
- `rating`: number - Store rating
- `distance`: string - Distance to store
- `walkTime`: string - Estimated walk time
- `badges`: array - Store category badges
- `estimatedTime`: string - Estimated delivery time
- `className`: string - Additional CSS classes

```jsx
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

### SectionTitle
Section title with optional navigation arrow.

**Props:**
- `title`: string (required) - Section title
- `showArrow`: boolean (default: false) - Show arrow button
- `onArrowClick`: function - Arrow click handler
- `className`: string - Additional CSS classes

```jsx
<SectionTitle 
  title="熱門品牌" 
  showArrow={true}
  onArrowClick={() => navigate('/brands')}
/>
```

### Logo
Brand logo component with multiple variants.

**Props:**
- `variant`: string (default: 'default') - Logo variant
- `className`: string - Additional CSS classes

```jsx
<Logo variant="coffee" />
```

## Usage Guidelines

### Color Usage
1. Always use semantic color names from the design system
2. Use `text-main` for primary content
3. Use `text-subtle` for secondary information
4. Use `text-subtlest` for tertiary or disabled content

### Typography Guidelines
1. Use Noto Sans TC for all Chinese text
2. Use Poppins for English text and numbers (especially prices and ratings)
3. Maintain consistent line-heights: 1 for titles, 1.5 for body text
4. Use appropriate font weights: 400 (regular), 600 (semibold/bold)

### Spacing Guidelines
1. Use the spacing scale (8px base unit) for all margins and paddings
2. Common gaps: 100 (8px), 150 (12px), 200 (16px)
3. Card padding: typically 12px or 16px
4. Section gaps: 16px between major sections

### Component Guidelines
1. Cards should have `shadow-card` and `rounded-card-m`
2. Interactive elements should have hover states
3. All images should have appropriate alt text
4. Use proper semantic HTML elements

## Responsive Design

The design is primarily optimized for mobile devices (375px width). Key breakpoints:
- Mobile: 375px - 767px (primary focus)
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Accessibility

1. Maintain sufficient color contrast (WCAG AA minimum)
2. Provide alt text for all images
3. Ensure interactive elements are keyboard accessible
4. Use semantic HTML elements
5. Include proper ARIA labels where needed

## Browser Support

- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)

## Performance Considerations

1. Images should be optimized and properly sized
2. Use lazy loading for off-screen images
3. Minimize bundle size by importing only needed components
4. Use CSS Grid and Flexbox for layouts
5. Avoid unnecessary re-renders in React components
