# Routing Guide

This document explains the routing setup and navigation in the Fudomore application.

## Overview

The application uses React Router (v6) for client-side routing and navigation between pages.

## Routes

### Home Page
- **Path**: `/`
- **Component**: `Home`
- **Description**: Main landing page showing store listings, product history, and brand logos

### Store Detail Page
- **Path**: `/store/:id`
- **Component**: `StoreDetail`
- **Description**: Detailed view of a store with menu items, categories, and ordering functionality
- **Parameters**:
  - `id`: Store identifier (string or number)

## Navigation

### Programmatic Navigation

Use the `useNavigate` hook from React Router:

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  // Navigate to store detail
  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };
  
  // Go back
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <button onClick={() => handleStoreClick(1)}>
      View Store
    </button>
  );
}
```

### Link Navigation

Use the `Link` component for declarative navigation:

```jsx
import { Link } from 'react-router-dom';

function StoreList() {
  return (
    <div>
      <Link to="/store/1">Store 1</Link>
      <Link to="/store/2">Store 2</Link>
    </div>
  );
}
```

### URL Parameters

Access route parameters using the `useParams` hook:

```jsx
import { useParams } from 'react-router-dom';

function StoreDetail() {
  const { id } = useParams();
  
  // Use the id to fetch store data
  console.log('Store ID:', id);
  
  return <div>Store {id}</div>;
}
```

## Route Configuration

The main routing configuration is in `src/App.jsx`:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoreDetail from './pages/StoreDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store/:id" element={<StoreDetail />} />
      </Routes>
    </Router>
  );
}
```

## Page Components

### Home (`src/pages/Home.jsx`)
- Main landing page
- Shows store cards, product history, brand logos
- Clicking a store card navigates to store detail

### StoreDetail (`src/pages/StoreDetail.jsx`)
- Displays store information and menu
- Has back button to return to home
- Shows categories and menu items
- Includes cart functionality

## Adding New Routes

To add a new route:

1. Create the page component in `src/pages/`
2. Import it in `src/App.jsx`
3. Add a new `<Route>` in the `<Routes>` component

```jsx
// 1. Create component
// src/pages/Cart.jsx
export default function Cart() {
  return <div>Cart Page</div>;
}

// 2. Import in App.jsx
import Cart from './pages/Cart';

// 3. Add route
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/store/:id" element={<StoreDetail />} />
  <Route path="/cart" element={<Cart />} />  {/* New route */}
</Routes>
```

## Navigation Patterns

### Store Card Click
```jsx
// In Home.jsx
const handleStoreClick = (storeId) => {
  navigate(`/store/${storeId}`);
};

// Usage
<div onClick={() => handleStoreClick(store.id)}>
  <StoreCard {...store} />
</div>
```

### Back Navigation
```jsx
// In StoreDetail.jsx
const navigate = useNavigate();

const handleBack = () => {
  navigate(-1); // Go back one step in history
};

<button onClick={handleBack}>Back</button>
```

### Cart Navigation (Future)
```jsx
const handleCartClick = () => {
  navigate('/cart');
};
```

## URL Structure

Current URL patterns:

```
Home Page:
https://example.com/

Store Detail:
https://example.com/store/1
https://example.com/store/2
https://example.com/store/abc

Future routes (to be implemented):
https://example.com/cart
https://example.com/profile
https://example.com/orders
https://example.com/orders/123
```

## Navigation State

### Passing State with Navigation

You can pass state when navigating:

```jsx
navigate('/store/1', { 
  state: { 
    fromPage: 'home',
    scrollPosition: 100 
  } 
});

// Access in destination component
import { useLocation } from 'react-router-dom';

function StoreDetail() {
  const location = useLocation();
  const { fromPage, scrollPosition } = location.state || {};
}
```

### Query Parameters

Add query parameters:

```jsx
// Navigate with query params
navigate('/store/1?category=tea&sort=price');

// Access query params
import { useSearchParams } from 'react-router-dom';

function StoreDetail() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // 'tea'
  const sort = searchParams.get('sort'); // 'price'
}
```

## Protected Routes (Future)

For authentication-protected routes:

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

## Best Practices

1. **Use Programmatic Navigation**: For actions (clicks, form submissions)
2. **Use Links**: For navigation elements (nav bars, menus)
3. **Handle Back Button**: Use `navigate(-1)` for back navigation
4. **Validate Route Params**: Check if params exist and are valid
5. **Loading States**: Show loading while fetching data based on route params
6. **Error Handling**: Handle invalid routes with a 404 page

## Error Handling

Add a catch-all route for 404 pages:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/store/:id" element={<StoreDetail />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Testing Navigation

Test navigation in your components:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

test('navigates to store detail on card click', () => {
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));
  
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  
  fireEvent.click(screen.getByText('Store Name'));
  expect(mockNavigate).toHaveBeenCalledWith('/store/1');
});
```

## Troubleshooting

### Issue: Routes not working after build
**Solution**: Configure your hosting provider to serve `index.html` for all routes

### Issue: Page refreshes instead of navigating
**Solution**: Make sure you're using `Link` or `navigate()`, not `<a>` tags

### Issue: Cannot access params
**Solution**: Make sure the component is rendered within a `<Route>` with the parameter defined

### Issue: Back button doesn't work
**Solution**: Use `navigate(-1)` instead of `navigate('/')` to preserve history

---

**Related Documentation**:
- [React Router Documentation](https://reactrouter.com/)
- [Components Guide](./COMPONENTS.md)
- [README](./README.md)
