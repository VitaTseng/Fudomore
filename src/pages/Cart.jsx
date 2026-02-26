import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StatusBar from '../components/StatusBar';
import CartItem from '../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getItemsByStore } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState('self-pickup');

  const itemsByStore = getItemsByStore();
  const totalPrice = getTotalPrice();

  const deliveryOptions = [
    { id: 'self-pickup', label: '自取', icon: '🏪' }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddMoreItems = (storeName) => {
    // Navigate back to store detail to add more items
    console.log('Add more items from:', storeName);
    navigate(-1);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Prepare order data
    const orderData = {
      items: cartItems,
      totalPrice: totalPrice,
      deliveryMethod: selectedDelivery,
      invoice: '手機載具',
      paymentMethod: 'iCash 5830'
    };

    console.log('Proceeding to order confirmation with:', orderData);
    
    // Navigate to order confirmation page with order data
    navigate('/order-confirmation', { state: { orderData } });
  };

  return (
    <div className="bg-white flex flex-col relative size-full overflow-hidden">
      {/* Fixed Status Bar */}
      <div className="fixed left-0 right-0 top-0 z-40">
        <StatusBar />
      </div>

      {/* Fixed Header */}
      <div className="fixed left-0 right-0 top-[54px] bg-white z-30 border-b border-gray-100">
        <div className="flex h-[60px] items-center px-4 py-2">
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="w-11 h-11 flex items-center justify-center transition-opacity hover:opacity-70"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#424242"/>
            </svg>
          </button>

          {/* Title */}
          <p className="flex-1 font-poppins font-semibold text-[17px] text-text-main text-center">
            購物車
          </p>

          {/* Placeholder for alignment */}
          <div className="w-11 h-11 opacity-0" />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[114px] pb-[140px]">
        <div className="flex flex-col gap-2 px-4 py-1">
          {Object.keys(itemsByStore).length === 0 ? (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 mb-4 opacity-20">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="#9e9e9e"/>
                </svg>
              </div>
              <p className="font-noto-sans text-base text-text-subtle mb-2">
                購物車是空的
              </p>
              <p className="font-noto-sans text-sm text-text-subtlest">
                去添加一些美味的飲料吧！
              </p>
            </div>
          ) : (
            /* Cart Items by Store */
            Object.entries(itemsByStore).map(([storeName, items]) => (
              <div 
                key={storeName}
                className="bg-white rounded-3xl shadow-card overflow-hidden mb-2"
              >
                {/* Store Header */}
                <div className="flex h-[52px] items-center px-4">
                  <div className="flex gap-1 items-center flex-1">
                    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" fill="#424242"/>
                    </svg>
                    <p className="font-noto-sans font-semibold text-sm text-text-main flex-1">
                      {storeName}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="font-noto-sans text-sm text-text-main">
                      250m
                    </p>
                    <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#424242"/>
                    </svg>
                  </div>
                </div>

                {/* Cart Items */}
                {items.map((item, index) => (
                  <React.Fragment key={item.cartId}>
                    <div className="px-4 py-2">
                      <CartItem 
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    </div>
                    {index < items.length - 1 && (
                      <div className="h-px bg-gray-100 mx-4" />
                    )}
                  </React.Fragment>
                ))}

                {/* Divider */}
                <div className="h-px bg-gray-100 mx-4 my-2" />

                {/* Add More Items Button */}
                <div className="px-4 pb-2">
                  <button 
                    onClick={() => handleAddMoreItems(storeName)}
                    className="bg-black w-full h-9 rounded-3xl flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white"/>
                    </svg>
                    <span className="font-noto-sans font-semibold text-sm text-white">
                      新增餐點
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Options Section - Only show when cart has items */}
          {cartItems.length > 0 && (
            <>
              {/* Delivery Method */}
              <div className="bg-white rounded-3xl shadow-card overflow-hidden p-4">
                <div className="flex h-8 items-center justify-center mb-2">
                  <p className="font-noto-sans font-semibold text-sm text-text-main">
                    運送方式
                  </p>
                </div>

                <div className="flex gap-2">
                  {deliveryOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedDelivery(option.id)}
                      className={`
                        flex-1 relative bg-white border-2 rounded-3xl p-6 
                        flex flex-col items-center justify-center gap-2
                        transition-all duration-200
                        ${selectedDelivery === option.id 
                          ? 'border-text-main' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      {selectedDelivery === option.id && (
                        <div className="absolute top-0 left-0 bg-black rounded-br-xl rounded-tl-[22px] w-7 h-7 flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                          </svg>
                        </div>
                      )}
                      
                      <div className="text-4xl">{option.icon}</div>
                      <span className="font-noto-sans font-semibold text-xs text-text-main">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Marketing Offers */}
              <button className="bg-white rounded-3xl shadow-card px-4 h-[52px] flex items-center justify-between w-full transition-opacity hover:opacity-80">
                <p className="font-noto-sans font-semibold text-sm text-text-main">
                  行銷優惠
                </p>
                <div className="flex gap-1 items-center">
                  <p className="font-noto-sans text-sm text-text-main">
                    無
                  </p>
                  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#424242"/>
                  </svg>
                </div>
              </button>

              {/* Plastic Bag */}
              <button className="bg-white rounded-3xl shadow-card px-4 h-[52px] flex items-center justify-between w-full transition-opacity hover:opacity-80">
                <p className="font-noto-sans font-semibold text-sm text-text-main">
                  塑膠袋
                </p>
                <div className="flex gap-1 items-center">
                  <p className="font-noto-sans text-sm text-text-main">
                    無
                  </p>
                  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#424242"/>
                  </svg>
                </div>
              </button>

              {/* Invoice */}
              <button className="bg-white rounded-3xl shadow-card px-4 h-[52px] flex items-center justify-between w-full transition-opacity hover:opacity-80">
                <p className="font-noto-sans font-semibold text-sm text-text-main">
                  發票
                </p>
                <div className="flex gap-1 items-center">
                  <p className="font-noto-sans text-sm text-text-main">
                    手機載具
                  </p>
                  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#424242"/>
                  </svg>
                </div>
              </button>

              {/* Payment Method */}
              <button className="bg-white rounded-3xl shadow-card px-4 h-[52px] flex items-center justify-between w-full transition-opacity hover:opacity-80">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-[25px] border border-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs font-semibold text-red-600">iCash</span>
                  </div>
                  <p className="font-noto-sans font-semibold text-sm text-text-main">
                    iCash 5830
                  </p>
                </div>
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#424242"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30">
        <div className="flex flex-col gap-4 px-4 py-4">
          {/* Total Price */}
          <div className="flex items-center justify-between">
            <p className="font-noto-sans text-xs text-text-subtlest">
              總金額
            </p>
            <p className="font-noto-sans font-semibold text-xl text-text-main">
              ${totalPrice}
            </p>
          </div>

          {/* Checkout Button */}
          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className={`
              w-full h-11 rounded-3xl font-noto-sans font-semibold text-base
              transition-opacity
              ${cartItems.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:opacity-90'
              }
            `}
          >
            前往結帳
          </button>
        </div>

        {/* iOS Home Indicator */}
        <div className="h-[21px] flex items-center justify-center">
          <div className="w-[139px] h-[5px] bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
