import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import StoreDetail from './pages/StoreDetail';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderStatus from './pages/OrderStatus';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store/:id" element={<StoreDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-status/:orderId" element={<OrderStatus />} />
            <Route path="/order-history" element={<OrderHistory />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
