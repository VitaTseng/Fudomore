import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { normalizePhone } from '../services/userService';
import StatusBar from '../components/StatusBar';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const { setUserId } = useUser();
  const { orderData } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // If no order data, redirect to cart
  if (!orderData) {
    navigate('/cart');
    return null;
  }

  const { items, totalPrice, deliveryMethod, invoice, paymentMethod } = orderData;

  // Group items by store
  const itemsByStore = items.reduce((acc, item) => {
    const storeName = item.storeName || 'Unknown Store';
    if (!acc[storeName]) {
      acc[storeName] = [];
    }
    acc[storeName].push(item);
    return acc;
  }, {});

  // Calculate costs
  const subtotal = totalPrice;
  const serviceFee = 5;
  const total = subtotal + serviceFee;

  // Format time (mock - in real app would be user-selected)
  const pickupTime = '08:00-08:40';

  const handleBack = () => {
    navigate('/cart');
  };

  const normalizedPhone = normalizePhone(phone);
  const isPhoneValid = normalizedPhone.length === 10;

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (phoneError) setPhoneError('');
  };

  const handleConfirmOrder = async () => {
    if (!isPhoneValid) {
      setPhoneError('請輸入有效的手機號碼（10 碼，例如 09xxxxxxxx）');
      return;
    }
    setIsSubmitting(true);
    try {
      const storeId = items[0]?.storeId || null;

      const result = await createOrder({
        storeId,
        phone: normalizedPhone,
        items: items.map(item => {
          const unitPrice = item.totalPrice != null && item.quantity > 0
            ? item.totalPrice / item.quantity
            : (item.drink?.price ?? item.price ?? 0);
          return {
            id: item.id || item.drink?.id,
            name: item.drink?.name || item.name,
            price: unitPrice,
            quantity: item.quantity,
            image: item.drink?.image || item.image,
            customizations: item.customizations || {}
          };
        }),
        orderData: {
          deliveryMethod: deliveryMethod || 'self-pickup',
          pickupTime: { start: '08:00', end: '08:40' }, // Mock time for now
          paymentMethod: paymentMethod || 'cash',
          invoiceType: invoice?.type || 'none',
          invoiceCarrier: invoice?.carrier || '',
          note: ''
        }
      });

      if (result.success) {
        setUserId(result.order.user_id);
        const storeName = items[0]?.storeName || 'Unknown Store';
        const orderNumber = result.order.order_number?.split('-').pop() || result.order.id?.slice(0, 4) || 'D687';
        const orderForModal = {
          id: result.order.id,
          orderNumber,
          status: result.order.status || 'pending',
          storeName,
          orderedAt: new Date(result.order.ordered_at || Date.now()),
          preparingAt: result.order.preparing_at ? new Date(result.order.preparing_at) : null,
          pickupTimeStart: result.order.pickup_time_start || '08:00',
          pickupTimeEnd: result.order.pickup_time_end || '08:40',
          total: parseFloat(result.order.total_amount),
          items: items.map(item => {
            const unitPrice = item.totalPrice != null && item.quantity > 0
              ? item.totalPrice / item.quantity
              : (item.drink?.price ?? item.price ?? 0);
            return {
              id: item.cartId,
              name: item.drink?.name || item.name,
              quantity: item.quantity,
              size: item.size || '大杯',
              ice: item.ice || '正常冰',
              sugar: item.sugar || '正常甜',
              price: unitPrice
            };
          })
        };
        clearCart();
        navigate('/', { state: { orderJustPlaced: orderForModal } });
      } else {
        alert('訂單建立失敗: ' + result.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('訂單建立失敗，請稍後再試');
      setIsSubmitting(false);
    }
  };

  // Format size
  const getSizeLabel = (size) => {
    if (size === 'extra-large') return '特大杯';
    return '大杯';
  };

  // Format sugar
  const getSugarLabel = (sugar) => {
    const map = {
      'normal': '正常甜',
      'less': '少糖',
      'half': '半糖',
      'light': '微糖',
      'none': '無糖'
    };
    return map[sugar] || sugar;
  };

  // Format ice
  const getIceLabel = (ice) => {
    const map = {
      'normal': '正常冰',
      'less': '少冰',
      'light': '微冰',
      'none': '去冰',
      'hot': '熱'
    };
    return map[ice] || ice;
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
            確認訂單
          </p>

          {/* Placeholder for alignment */}
          <div className="w-11 h-11 opacity-0" />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[114px] pb-[140px]">
        <div className="flex flex-col gap-2 px-4 py-1">
          {/* Order Items by Store */}
          {Object.entries(itemsByStore).map(([storeName, storeItems]) => (
            <div key={storeName} className="bg-white rounded-3xl shadow-card p-4">
              {/* Store Info */}
              <div className="flex items-center gap-1 h-6 mb-3">
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" fill="#424242"/>
                </svg>
                <p className="font-noto-sans font-semibold text-sm text-text-main flex-1">
                  取餐地點
                </p>
                <p className="font-noto-sans text-sm text-text-main">
                  {storeName}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 my-3" />

              {/* Pickup Info */}
              <div className="flex items-center gap-1 h-6 mb-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 8H16V4H8V8H4C2.9 8 2 8.9 2 10V20H4V22H6V20H18V22H20V20H22V10C22 8.9 21.1 8 20 8ZM10 6H14V8H10V6ZM20 18H4V10H20V18Z" fill="#424242"/>
                </svg>
                <p className="font-noto-sans font-semibold text-sm text-text-main flex-1 ml-1">
                  外帶取餐
                </p>
                <p className="font-noto-sans text-sm text-text-main">
                  {pickupTime}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 my-3" />

              {/* Items */}
              {storeItems.map((item) => (
                <div key={item.cartId} className="flex gap-3 items-start mb-3 last:mb-0">
                  {/* Quantity Badge */}
                  <div className="bg-[rgba(0,0,0,0.1)] rounded-[20px] px-2 py-1 min-w-[28px] h-7 flex items-center justify-center">
                    <p className="font-noto-sans font-semibold text-xs text-text-main">
                      {item.quantity}
                    </p>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex gap-2.5 items-start">
                    <div className="flex-1 flex flex-col">
                      <p className="font-noto-sans font-semibold text-xs text-text-main">
                        {item.drink?.name || '未知飲品'}
                      </p>
                      <p className="font-noto-sans text-[11px] text-text-subtlest">
                        飲料容量: {getSizeLabel(item.size)}
                      </p>
                      <p className="font-noto-sans text-[11px] text-text-subtlest">
                        {getIceLabel(item.ice)} {getSugarLabel(item.sugar)}
                      </p>
                    </div>
                    <p className="font-noto-sans font-semibold text-sm text-text-main">
                      ${item.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Phone (required for account / order) */}
          <div className="bg-white rounded-3xl shadow-card p-4">
            <p className="font-noto-sans font-semibold text-sm text-text-main mb-2">
              手機號碼 <span className="text-red-500">*</span>
            </p>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="09xxxxxxxx"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => {
                if (phone && !isPhoneValid) {
                  setPhoneError('請輸入有效的手機號碼（10 碼）');
                }
              }}
              className="font-noto-sans text-sm text-text-main w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-gray-400"
            />
            {phoneError ? (
              <p className="font-noto-sans text-xs text-red-500 mt-1">{phoneError}</p>
            ) : null}
          </div>

          {/* Delivery Method */}
          <div className="bg-white rounded-3xl shadow-card px-4 h-[52px] flex items-center justify-between">
            <p className="font-noto-sans font-semibold text-sm text-text-main">
              運送方式
            </p>
            <p className="font-noto-sans text-sm text-text-main">
              {deliveryMethod === 'self-pickup' ? '自取' : '外送'}
            </p>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-3xl shadow-card p-4">
            <div className="flex flex-col gap-3">
              {/* Subtotal */}
              <div className="flex items-center justify-between h-6">
                <p className="font-noto-sans font-semibold text-sm text-text-main">
                  小計
                </p>
                <p className="font-noto-sans text-sm text-text-main">
                  ${subtotal}
                </p>
              </div>

              {/* Service Fee */}
              <div className="flex items-center justify-between h-6">
                <p className="font-noto-sans font-semibold text-sm text-text-main">
                  服務費
                </p>
                <p className="font-noto-sans text-sm text-text-main">
                  ${serviceFee}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Total */}
              <div className="flex items-center justify-between h-6">
                <p className="font-noto-sans font-semibold text-sm text-text-main">
                  總計
                </p>
                <p className="font-noto-sans text-sm text-text-main">
                  ${total}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice */}
          <div className="bg-white rounded-3xl shadow-card px-4 h-[52px] flex items-center justify-between">
            <p className="font-noto-sans font-semibold text-sm text-text-main">
              發票
            </p>
            <p className="font-noto-sans text-sm text-text-main">
              {invoice || '/ABC00932'}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl shadow-card px-4 h-[52px] flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-[25px] border border-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-red-600">iCash</span>
              </div>
              <p className="font-noto-sans font-semibold text-sm text-text-main">
                {paymentMethod || 'iCash 5830'}
              </p>
            </div>
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#424242"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black z-30">
        <div className="flex flex-col gap-4 px-4 py-4">
          {/* Total Price */}
          <div className="flex items-center justify-between">
            <p className="font-noto-sans text-xs text-[rgba(255,255,255,0.6)]">
              總金額
            </p>
            <p className="font-noto-sans font-semibold text-xl text-white">
              ${total}
            </p>
          </div>

          {/* Confirm Button */}
          <button 
            onClick={handleConfirmOrder}
            disabled={isSubmitting || !isPhoneValid}
            className="bg-white w-full h-11 rounded-3xl font-noto-sans font-semibold text-base text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? '處理中...' : '確認下單'}
          </button>
        </div>

        {/* iOS Home Indicator */}
        <div className="h-[21px] flex items-center justify-center">
          <div className="w-[139px] h-[5px] bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
