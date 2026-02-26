import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderStatus } from '../hooks/useOrders';
import StatusBar from '../components/StatusBar';

const OrderStatus = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  
  // Fetch order from Supabase with real-time updates
  const { order, loading } = useOrderStatus(orderId);

  const handleBack = () => {
    navigate('/');
  };

  const handleContactStore = () => {
    // Open phone dialer
    if (order?.storePhone) {
      window.location.href = `tel:${order.storePhone}`;
    }
  };

  const handleViewOrderHistory = () => {
    navigate('/order-history');
  };

  // Status configuration
  const statusConfig = {
    pending: {
      label: '訂單已送出',
      color: 'bg-gray-500',
      icon: '📝',
      description: '等待店家確認'
    },
    confirmed: {
      label: '訂單已確認',
      color: 'bg-blue-500',
      icon: '✓',
      description: '店家已接單'
    },
    preparing: {
      label: '製作中',
      color: 'bg-orange-500',
      icon: '👨‍🍳',
      description: '正在為您準備餐點'
    },
    ready: {
      label: '已完成',
      color: 'bg-green-500',
      icon: '✓',
      description: '可以前往取餐囉'
    },
    completed: {
      label: '已完成',
      color: 'bg-gray-400',
      icon: '✓',
      description: '訂單已完成'
    },
    cancelled: {
      label: '已取消',
      color: 'bg-red-500',
      icon: '✕',
      description: '訂單已取消'
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white flex flex-col relative size-full overflow-hidden">
        <div className="fixed left-0 right-0 top-0 z-40">
          <StatusBar />
        </div>
        <div className="flex items-center justify-center h-full">
          <p className="font-noto-sans text-text-subtle">載入訂單中...</p>
        </div>
      </div>
    );
  }

  // Show error state if no order found
  if (!order) {
    return (
      <div className="bg-white flex flex-col relative size-full overflow-hidden">
        <div className="fixed left-0 right-0 top-0 z-40">
          <StatusBar />
        </div>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="font-noto-sans text-text-subtle">找不到訂單</p>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-6 py-2 rounded-full font-noto-sans"
          >
            返回首頁
          </button>
        </div>
      </div>
    );
  }

  // Calculate subtotal and service fee for display
  const subtotal = order.total - 5;
  const serviceFee = 5;

  const currentStatus = statusConfig[order.status];

  // Status timeline
  const statusTimeline = [
    { key: 'pending', label: '已送出', active: true },
    { key: 'confirmed', label: '已確認', active: ['confirmed', 'preparing', 'ready', 'completed'].includes(order.status) },
    { key: 'preparing', label: '製作中', active: ['preparing', 'ready', 'completed'].includes(order.status) },
    { key: 'ready', label: '完成', active: ['ready', 'completed'].includes(order.status) }
  ];

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
            訂單狀態
          </p>

          {/* Placeholder for alignment */}
          <div className="w-11 h-11 opacity-0" />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[114px] pb-6">
        <div className="flex flex-col gap-4 px-4 py-4">
          
          {/* Status Card */}
          <div className="bg-white rounded-3xl shadow-card p-6">
            {/* Status Icon and Label */}
            <div className="flex flex-col items-center mb-6">
              <div className={`${currentStatus.color} w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4`}>
                {currentStatus.icon}
              </div>
              <h2 className="font-noto-sans font-semibold text-2xl text-text-main mb-2">
                {currentStatus.label}
              </h2>
              <p className="font-noto-sans text-sm text-text-subtle">
                {currentStatus.description}
              </p>
              
              {/* Estimated Time for preparing/confirmed status */}
              {(order.status === 'preparing' || order.status === 'confirmed') && (
                <div className="mt-4 bg-orange-50 rounded-2xl px-4 py-3">
                  <p className="font-noto-sans text-sm text-orange-600">
                    預計完成時間：<span className="font-semibold">{getTimeRemaining()}</span>
                  </p>
                </div>
              )}

              {/* Ready message */}
              {order.status === 'ready' && (
                <div className="mt-4 bg-green-50 rounded-2xl px-6 py-4 w-full">
                  <p className="font-noto-sans text-base text-green-600 text-center font-semibold">
                    您的餐點已經準備好了！
                  </p>
                  <p className="font-noto-sans text-sm text-green-600 text-center mt-1">
                    請前往店家取餐
                  </p>
                </div>
              )}
            </div>

            {/* Status Timeline */}
            {order.status !== 'cancelled' && (
              <div className="relative">
                <div className="flex justify-between items-start">
                  {statusTimeline.map((step, index) => (
                    <div key={step.key} className="flex flex-col items-center flex-1">
                      {/* Circle */}
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${step.active 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-400'
                        }
                        transition-colors duration-300
                      `}>
                        {step.active ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-current" />
                        )}
                      </div>

                      {/* Label */}
                      <p className={`
                        mt-2 font-noto-sans text-xs text-center
                        ${step.active ? 'text-text-main font-semibold' : 'text-text-subtle'}
                      `}>
                        {step.label}
                      </p>

                      {/* Connecting Line */}
                      {index < statusTimeline.length - 1 && (
                        <div className="absolute top-5 w-full" style={{
                          left: `${(100 / statusTimeline.length) * (index + 0.5)}%`,
                          width: `${100 / statusTimeline.length}%`
                        }}>
                          <div className={`h-0.5 ${
                            statusTimeline[index + 1].active ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-3xl shadow-card p-4">
            <h3 className="font-noto-sans font-semibold text-base text-text-main mb-4">
              訂單資訊
            </h3>

            {/* Order Number */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
              <p className="font-noto-sans text-sm text-text-subtle">
                訂單編號
              </p>
              <p className="font-noto-sans text-sm text-text-main font-semibold">
                {order.orderNumber}
              </p>
            </div>

            {/* Order Time */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
              <p className="font-noto-sans text-sm text-text-subtle">
                訂購時間
              </p>
              <p className="font-noto-sans text-sm text-text-main">
                {formatTime(order.orderedAt)}
              </p>
            </div>

            {/* Pickup Time */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
              <p className="font-noto-sans text-sm text-text-subtle">
                取餐時間
              </p>
              <p className="font-noto-sans text-sm text-text-main">
                {order.pickupTimeStart}-{order.pickupTimeEnd}
              </p>
            </div>

            {/* Pickup Method */}
            <div className="flex items-center justify-between">
              <p className="font-noto-sans text-sm text-text-subtle">
                取餐方式
              </p>
              <p className="font-noto-sans text-sm text-text-main">
                {order.pickupMethod}
              </p>
            </div>
          </div>

          {/* Store Info Card */}
          <div className="bg-white rounded-3xl shadow-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" fill="#424242"/>
                </svg>
              </div>

              <div className="flex-1">
                <p className="font-noto-sans font-semibold text-sm text-text-main mb-1">
                  {order.storeName}
                </p>
                <p className="font-noto-sans text-xs text-text-subtle mb-2">
                  {order.storeAddress}
                </p>
                
                <button 
                  onClick={handleContactStore}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="font-noto-sans text-sm">
                    聯絡店家
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Items Card */}
          <div className="bg-white rounded-3xl shadow-card p-4">
            <h3 className="font-noto-sans font-semibold text-base text-text-main mb-4">
              訂購項目
            </h3>

            {order.items.map((item, index) => (
              <div key={item.id} className={`${index > 0 ? 'mt-3 pt-3 border-t border-gray-100' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-gray-100 rounded px-2 py-0.5 text-xs font-semibold text-text-main">
                        {item.quantity}
                      </span>
                      <p className="font-noto-sans text-sm text-text-main font-semibold">
                        {item.name}
                      </p>
                    </div>
                    <p className="font-noto-sans text-xs text-text-subtle ml-7">
                      {item.size} | {item.ice} | {item.sugar}
                    </p>
                  </div>
                  <p className="font-noto-sans text-sm text-text-main font-semibold">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}

            {/* Price Summary */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-noto-sans text-sm text-text-subtle">
                  小計
                </p>
                <p className="font-noto-sans text-sm text-text-main">
                  ${order.subtotal}
                </p>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-noto-sans text-sm text-text-subtle">
                  服務費
                </p>
                <p className="font-noto-sans text-sm text-text-main">
                  ${order.serviceFee}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <p className="font-noto-sans text-base text-text-main font-semibold">
                  總計
                </p>
                <p className="font-noto-sans text-lg text-text-main font-semibold">
                  ${order.total}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info Card */}
          <div className="bg-white rounded-3xl shadow-card p-4">
            <h3 className="font-noto-sans font-semibold text-base text-text-main mb-4">
              付款資訊
            </h3>

            <div className="flex items-center justify-between mb-3">
              <p className="font-noto-sans text-sm text-text-subtle">
                付款方式
              </p>
              <p className="font-noto-sans text-sm text-text-main">
                {order.paymentMethod}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-noto-sans text-sm text-text-subtle">
                發票
              </p>
              <p className="font-noto-sans text-sm text-text-main">
                {order.invoiceNumber}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {order.status === 'completed' && (
            <button 
              onClick={handleViewOrderHistory}
              className="bg-black w-full h-12 rounded-3xl font-noto-sans font-semibold text-base text-white transition-opacity hover:opacity-90"
            >
              查看訂單記錄
            </button>
          )}

          {(order.status === 'ready' || order.status === 'preparing') && (
            <button 
              onClick={handleContactStore}
              className="border-2 border-black w-full h-12 rounded-3xl font-noto-sans font-semibold text-base text-black transition-colors hover:bg-gray-50"
            >
              聯絡店家
            </button>
          )}
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-[21px] flex items-center justify-center bg-white">
        <div className="w-[139px] h-[5px] bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default OrderStatus;
