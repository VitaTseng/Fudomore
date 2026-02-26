import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useStores } from '../hooks/useStores';
import { useActiveOrder, useUserOrders } from '../hooks/useOrders';
import StatusBar from '../components/StatusBar';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import Chips from '../components/Chips';
import BuyAgainCard from '../components/BuyAgainCard';
import StoreCard from '../components/StoreCard';
import SectionTitle from '../components/SectionTitle';
import ActiveOrderCard from '../components/ActiveOrderCard';
import ChooseStoreModal from '../components/ChooseStoreModal';
import OrderDetailModal from '../components/OrderDetailModal';

// Previous order data is now fetched from Supabase via useUserOrders hook

// STORE_DATA removed - now fetched from Supabase via useStores hook

const CHIP_CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'coffee', label: '☕️ 咖啡' },
  { id: 'tea', label: '🧋 手搖茶' },
  { id: 'fruit', label: '🥤 果茶' },
  { id: 'milk', label: '🥛 奶蓋' }
];

// Import brand logo images
import logoCafe from '../assets/brands/logo-cafe.png';
import logoPrima from '../assets/brands/logo-prima.png';
import logoTea from '../assets/brands/logo-tea.png';
import logoTeaBar from '../assets/brands/logo-tea-bar.png';

const BRAND_LOGOS = [
  { id: 1, name: 'I+? CAFE RESERVE', image: logoCafe },
  { id: 2, name: 'CITY PRIMA 精品咖啡', image: logoPrima },
  { id: 3, name: 'CITY TEA 現萃茶', image: logoTea },
  { id: 4, name: 'CITY TEA BAR 現萃茶吧', image: logoTeaBar }
];

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems, addItem } = useCart();
  const [selectedChip, setSelectedChip] = useState('all');
  const [isChooseStoreModalOpen, setIsChooseStoreModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

  // When returning from OrderConfirmation with a just-placed order, show OrderDetailModal
  useEffect(() => {
    const orderJustPlaced = location.state?.orderJustPlaced;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/05e99855-75f1-4536-9f4c-224603a58af3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.jsx:useEffect orderJustPlaced',message:'Effect ran',data:{pathname:location.pathname,hasState:!!location.state,hasOrderJustPlaced:!!orderJustPlaced,orderId:orderJustPlaced?.id},timestamp:Date.now(),hypothesisId:'H4'})}).catch(()=>{});
    // #endregion
    if (orderJustPlaced) {
      setSelectedOrder(orderJustPlaced);
      setIsOrderDetailModalOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.orderJustPlaced, location.pathname, navigate]);

  // Fetch stores, active order, and order history from Supabase
  const { stores, loading: storesLoading, error: storesError } = useStores();
  const { activeOrder, loading: orderLoading } = useActiveOrder();
  const { orders, loading: ordersLoading } = useUserOrders();

  const cartCount = getTotalItems();

  // Transform completed orders for "再點一次" section
  const recentCompletedOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    
    // Filter completed orders and get the most recent 3
    const completedOrders = orders
      .filter(order => order.status === 'completed')
      .slice(0, 3);
    
    // Transform to match BuyAgainCard format
    return completedOrders.map(order => ({
      id: order.id,
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        size: item.size || '大杯',
        ice: item.ice || '正常冰',
        sugar: item.sugar || '正常甜',
        price: item.price,
        quantity: item.quantity,
        image: item.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
        customizations: {
          size: item.size,
          ice: item.ice,
          sugar: item.sugar
        }
      })),
      totalPrice: order.total
    }));
  }, [orders]);

  // Handle adding previous order items to cart
  const handleBuyAgain = (order) => {
    // Add all items from the order to cart
    order.items.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        size: item.size,
        customizations: item.customizations
      });
    });
  };

  // Check if order should be displayed (not completed or cancelled)
  const shouldShowOrder = activeOrder && 
    activeOrder.status !== 'completed' && 
    activeOrder.status !== 'cancelled';

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleOrderHistory = () => {
    navigate('/order-history');
  };

  return (
    <div className="bg-white relative size-full overflow-hidden">
      {/* Status Bar */}
      <StatusBar className="absolute bg-status-bar-main h-[54px] left-0 right-0 top-0" />
      
      {/* Main Content */}
      <div className="absolute flex flex-col gap-200 h-full items-start left-0 py-200 top-[54px] w-full overflow-y-auto">
        {/* Header */}
        <div className="flex gap-100 items-start px-200 relative shrink-0 w-full">
          <div className="flex flex-1 flex-col items-start min-h-px min-w-px overflow-clip px-100 relative">
            <p className="font-noto-sans font-semibold leading-normal min-w-full relative shrink-0 text-xl text-text-main w-min whitespace-pre-wrap">
              天冷上班，來點熱咖啡吧～
            </p>
            <div className="flex h-8 items-center justify-center overflow-clip pl-2 pr-2.5 py-[7px] relative shrink-0">
              <div className="mr-[-2px] overflow-clip relative shrink-0 size-9">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#424242"/>
                </svg>
              </div>
              <div className="flex items-center justify-center mr-[-2px] px-1 relative shrink-0">
                <p className="font-noto-sans font-semibold leading-[1.5] relative shrink-0 text-xs text-text-main text-center">
                  內湖區 · 石潭路
                </p>
              </div>
              <div className="mr-[-2px] overflow-clip relative shrink-0 size-9">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10L12 15L17 10H7Z" fill="#424242"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Order History Icon */}
          <button
            onClick={handleOrderHistory}
            className="w-11 h-11 flex items-center justify-center bg-gray-100 rounded-full transition-opacity hover:opacity-70 mr-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.25 15.52L17.02 14.24L13.5 12.15V8H12Z" fill="#424242"/>
            </svg>
          </button>

          <Avatar 
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
            text="縣"
            className="shrink-0 size-12"
          />
        </div>

        {/* Search Bar */}
        <div className="flex flex-col items-start px-200 relative shrink-0 w-full">
          <SearchBar className="w-full" />
        </div>

        {/* Active Order Card */}
        {shouldShowOrder && (
          <ActiveOrderCard order={activeOrder} />
        )}

        {/* History Section - Buy Again - Only show if there are completed orders */}
        {!ordersLoading && recentCompletedOrders.length > 0 && (
          <div className="flex flex-col gap-100 items-start overflow-clip relative shrink-0 w-full">
            <SectionTitle title="再點一次" />
            
            <div className="flex gap-2 items-start overflow-x-auto px-200 relative shrink-0 w-full hide-scrollbar">
              {recentCompletedOrders.map(order => (
                <BuyAgainCard 
                  key={order.id} 
                  order={order}
                  onAddToCart={handleBuyAgain}
                />
              ))}
            </div>
          </div>
        )}

        {/* Brands Section */}
        <div className="flex flex-col gap-100 items-start px-0 relative shrink-0 w-full">
          <SectionTitle title="熱門品牌" showArrow onArrowClick={() => setIsChooseStoreModalOpen(true)} />
          
          <div className="flex flex-col gap-100 items-start relative shrink-0 w-full">
            <div className="flex gap-100 items-center justify-center px-200 relative shrink-0 w-full">
              {BRAND_LOGOS.slice(0, 3).map(brand => (
                <div 
                  key={brand.id}
                  className="bg-white flex flex-1 flex-col h-[68px] items-center justify-center min-h-px min-w-[72px] p-3 relative rounded-card-m shadow-card cursor-pointer transition-transform hover:scale-105"
                  onClick={() => console.log(`Clicked ${brand.name}`)}
                >
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-100 items-center justify-center px-200 relative shrink-0 w-full">
              {BRAND_LOGOS.slice(3, 4).map(brand => (
                <div 
                  key={brand.id}
                  className="bg-white flex flex-1 flex-col h-[68px] items-center justify-center min-h-px min-w-[72px] p-3 relative rounded-card-m shadow-card cursor-pointer transition-transform hover:scale-105"
                  onClick={() => console.log(`Clicked ${brand.name}`)}
                >
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
              <div className="flex-1 min-w-[72px]" /> {/* Spacer */}
              <div className="flex-1 min-w-[72px]" /> {/* Spacer */}
            </div>
          </div>
        </div>

        {/* Store Section */}
        <div className="flex flex-col gap-100 items-start overflow-clip relative shrink-0 w-full">
          <SectionTitle title="附近店家" />
          
          {/* Category Chips */}
          <div className="flex gap-100 h-9 items-center overflow-x-auto px-200 relative shrink-0 w-full hide-scrollbar">
            {CHIP_CATEGORIES.map(category => (
              <Chips
                key={category.id}
                label={category.label}
                selected={selectedChip === category.id}
                onClick={() => setSelectedChip(category.id)}
              />
            ))}
          </div>
          
          {/* Store Cards */}
          <div className="flex flex-col gap-150 items-start overflow-clip px-200 py-150 relative shrink-0 w-full">
            {storesLoading ? (
              <div className="w-full text-center py-8">
                <p className="font-noto-sans text-text-subtle">載入中...</p>
              </div>
            ) : storesError ? (
              <div className="w-full text-center py-8">
                <p className="font-noto-sans text-red-500">載入失敗: {storesError}</p>
                <p className="font-noto-sans text-text-subtle text-sm mt-2">請確認已設定 Supabase 環境變數</p>
              </div>
            ) : stores.length === 0 ? (
              <div className="w-full text-center py-8">
                <p className="font-noto-sans text-text-subtle">附近沒有店家</p>
              </div>
            ) : (
              stores.map(store => (
                <div 
                  key={store.id} 
                  onClick={() => handleStoreClick(store.id)}
                  className="cursor-pointer w-full"
                >
                  <StoreCard {...store} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-0 h-[21px] left-0 overflow-clip w-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[5px] items-center justify-center left-1/2 top-1/2 w-[139px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="bg-gray-300 h-[5px] rounded-[100px] w-[139px]" />
          </div>
        </div>
      </div>

      {/* Floating Cart Button (only show if cart has items) */}
      {cartCount > 0 && (
        <div className="fixed bottom-[35px] left-1/2 -translate-x-1/2 z-20">
          <button 
            className="bg-black flex gap-2 h-[50px] items-center justify-center px-5 py-3.5 rounded-[1000px] w-[186px] transition-opacity hover:opacity-90 shadow-lg"
            onClick={handleCartClick}
          >
            <div className="overflow-clip relative shrink-0 size-9">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="white"/>
              </svg>
            </div>
            <p className="font-noto-sans font-semibold leading-normal relative shrink-0 text-base text-white text-center">
              購物車({cartCount})
            </p>
          </button>
        </div>
      )}

      {/* Choose Store Modal */}
      <ChooseStoreModal 
        isOpen={isChooseStoreModalOpen}
        onClose={() => setIsChooseStoreModalOpen(false)}
      />

      {/* Order Detail Modal - e.g. after placing order */}
      <OrderDetailModal
        isOpen={isOrderDetailModalOpen}
        onClose={() => {
          setIsOrderDetailModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </div>
  );
}

export default Home;
