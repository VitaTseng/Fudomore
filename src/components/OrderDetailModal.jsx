import React from 'react';

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  // Format date/time to match Figma format: 2026/01/23 09:52
  const formatDateTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  const getStatusSteps = () => {
    const steps = [
      { key: 'confirmed', label: '接單', time: order.orderedAt },
      { key: 'preparing', label: '製作中', time: order.preparingAt },
      { key: 'ready', label: '取餐', time: order.status === 'completed' ? new Date(order.orderedAt.getTime() + 4 * 60 * 1000) : null }
    ];

    // Determine which steps are active based on status
    const getActiveSteps = () => {
      if (order.status === 'cancelled') return 1;
      if (order.status === 'pending' || order.status === 'confirmed') return 1;
      if (order.status === 'preparing') return 2;
      if (order.status === 'ready' || order.status === 'completed') return 3;
      return 1;
    };

    const activeCount = getActiveSteps();

    return steps.map((step, index) => ({
      ...step,
      isActive: index < activeCount
    }));
  };

  const steps = getStatusSteps();

  // Get banner message based on status
  const getBannerMessage = () => {
    if (order.status === 'cancelled') return { text: '訂單已取消', color: 'gray' };
    if (order.status === 'completed') return { text: '訂單已完成', color: 'purple' };
    if (order.status === 'ready') return { text: '自取櫃 00000', color: 'purple' };
    if (order.status === 'preparing') return { text: '預計完成時間 5 分鐘', color: 'purple' };
    return { text: '店家確認訂單中...', color: 'purple' };
  };

  const banner = getBannerMessage();

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
        <div 
          className="bg-white w-full max-w-[430px] rounded-tl-[40px] rounded-tr-[40px] shadow-[0px_15px_75px_0px_rgba(0,0,0,0.18)] max-h-[90vh] overflow-y-auto"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Header */}
          <div className="flex flex-col items-center pb-2.5 relative">
            {/* Grabber */}
            <div className="flex flex-col h-4 items-start pt-1.5">
              <div className="bg-[#cfcfcf] h-[5px] rounded-full w-9" />
            </div>

            {/* Title and Close Button */}
            <div className="flex items-center justify-between px-4 relative w-full">
              <div className="w-8 h-11" /> {/* Spacer */}
              <p className="font-poppins font-semibold text-[17px] text-text-main text-center leading-[22px] tracking-[-0.43px]">
                訂單 #{order.orderNumber || 'D687'}
              </p>
              <button
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4 px-4 pb-6">
            {/* Progress Timeline - Only show if not cancelled */}
            {order.status !== 'cancelled' && (
              <div className="flex flex-col items-start gap-4 pb-2.5 relative">
                <div className="flex flex-col items-start pb-2.5 relative w-full">
                  {/* Progress Bar */}
                  <div className="flex items-start mb-[-10px] px-10 py-1 w-full">
                    <div 
                      className={`flex-1 h-1 rounded-[4px] ${
                        steps[1].isActive ? 'bg-[#714eff]' : 'bg-[#dcd1ff]'
                      }`}
                    />
                    <div 
                      className={`flex-1 h-1 rounded-[5px] ${
                        steps[2].isActive ? 'bg-[#714eff]' : 'bg-[#dcd1ff]'
                      }`}
                    />
                  </div>

                  {/* Status Steps */}
                  <div className="flex items-start justify-between mb-[-10px] w-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)]">
                    {steps.map((step, index) => (
                      <div key={step.key} className="flex flex-col gap-2 items-center w-[88px]">
                        {/* Dot */}
                        <div 
                          className={`w-2 h-2 rounded outline outline-4 outline-white shrink-0 ${
                            step.isActive ? 'bg-[#714eff]' : 'bg-[#dcd1ff]'
                          }`}
                        />
                        {/* Badge */}
                        <div 
                          className={`flex items-center px-1.5 py-0.5 rounded-[40px] ${
                            step.isActive ? 'bg-[#714eff]' : 'bg-[#e0e0e0]'
                          }`}
                        >
                          <p className={`font-noto-sans font-semibold text-xs leading-[1.5] ${
                            step.isActive ? 'text-white' : 'text-[#bdbdbd]'
                          }`}>
                            {step.label}
                          </p>
                        </div>
                        {/* Time */}
                        {step.time && (
                          <p className="font-noto-sans text-[11px] text-[#757575] leading-[1.5]">
                            {formatDateTime(step.time)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Banner */}
                <div className={`flex items-center justify-center py-3 rounded-xl w-full ${
                  banner.color === 'purple' ? 'bg-[#f0ecff]' : 'bg-[#e0e0e0]'
                }`}>
                  <p className={`font-inter font-bold text-xl text-center ${
                    banner.color === 'purple' ? 'text-[#714eff]' : 'text-black'
                  }`}>
                    {banner.text}
                  </p>
                </div>
              </div>
            )}

            {/* Cancelled Banner - Only show if cancelled */}
            {order.status === 'cancelled' && (
              <div className="bg-[#e0e0e0] flex items-center justify-center py-3 rounded-xl">
                <p className="font-inter font-bold text-xl text-black text-center">
                  訂單已取消
                </p>
              </div>
            )}

            {/* Order Details Card */}
            <div className="bg-white rounded-[24px] py-4 shadow-card">
              <div className="flex flex-col gap-4">
                {/* Pickup Location */}
                <div className="flex items-center justify-between min-h-[24px] px-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" fill="#424242"/>
                    </svg>
                    <p className="font-noto-sans font-semibold text-sm text-text-main leading-[1.5]">
                      取餐地點
                    </p>
                  </div>
                  <p className="font-noto-sans text-sm text-text-main leading-[1.5]">
                    {order.storeName || '50嵐 瑞光店'}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gray-200 w-full" />

                {/* Pickup Method */}
                <div className="flex items-center justify-between min-h-[24px] px-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.26 11H9.74L8.5 7.82L5.26 11ZM15 11H20L15.5 5L15 11ZM12 11H13L12.5 5.5L12 11ZM11 11H11.5L11 5.5L11 11ZM8.5 13H15.5L16 16H8L8.5 13ZM17 5L19 11H21C21.55 11 22 11.45 22 12V17H20.96C20.72 18.14 19.73 19 18.54 19C17.35 19 16.36 18.14 16.12 17H7.88C7.64 18.14 6.65 19 5.46 19C4.27 19 3.28 18.14 3.04 17H2V12C2 11.45 2.45 11 3 11H4.43L9 5H17Z" fill="#424242"/>
                    </svg>
                    <p className="font-noto-sans font-semibold text-sm text-text-main leading-[1.5]">
                      外帶取餐
                    </p>
                  </div>
                  <p className="font-noto-sans text-sm text-text-main leading-[1.5]">
                    {order.pickupTimeStart}-{order.pickupTimeEnd}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gray-200 w-full" />

                {/* Order Items */}
                <div className="flex flex-col gap-3 px-4">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="bg-gray-100 rounded-[20px] px-2 py-1 min-h-[28px] flex items-center justify-center shrink-0">
                        <p className="font-noto-sans font-semibold text-xs text-text-main leading-[1.5]">
                          {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex gap-2.5 items-start leading-[1.5] w-full">
                          <div className="flex flex-1 flex-col">
                            <p className="font-noto-sans font-semibold text-xs text-text-main">
                              {item.name}
                            </p>
                            <p className="font-noto-sans text-[11px] text-text-subtlest leading-[1.5]">
                              飲料容量: {item.size || '大杯'}
                            </p>
                            <p className="font-noto-sans text-[11px] text-text-subtlest leading-[1.5]">
                              {item.ice || '熱'} {item.sugar || '3分糖'}
                            </p>
                          </div>
                          <p className="font-noto-sans font-semibold text-sm text-text-main">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gray-200 w-full" />

                {/* Total */}
                <div className="flex items-center justify-between min-h-[24px] px-4">
                  <p className="font-noto-sans font-semibold text-sm text-text-main leading-[1.5]">
                    總計
                  </p>
                  <p className="font-noto-sans text-sm text-text-main leading-[1.5]">
                    ${order.total}
                  </p>
                </div>
              </div>
            </div>

            {/* Store Information */}
            <div className="flex flex-col gap-2">
              {/* Section Title */}
              <div className="flex items-center justify-between min-h-[24px]">
                <div className="flex items-center gap-1">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" fill="#424242"/>
                  </svg>
                  <p className="font-noto-sans font-semibold text-sm text-text-main leading-[1.5]">
                    店家資訊
                  </p>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-[#fafafa] rounded-[24px] px-4 py-2 flex items-center justify-between min-h-[52px]">
                <div className="flex flex-col flex-1">
                  <p className="font-noto-sans text-[11px] text-text-subtlest leading-[1.5]">
                    店面地址
                  </p>
                  <p className="font-noto-sans font-semibold text-sm text-text-main leading-[1.5]">
                    台北市內湖區石潭路153號1樓
                  </p>
                </div>
                <button className="w-6 h-6">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.71 11.29L12.71 2.29C12.32 1.9 11.69 1.9 11.3 2.29L2.3 11.29C1.91 11.68 1.91 12.31 2.3 12.7C2.69 13.09 3.32 13.09 3.71 12.7L4 12.41V20C4 20.55 4.45 21 5 21H9C9.55 21 10 20.55 10 20V14H14V20C14 20.55 14.45 21 15 21H19C19.55 21 20 20.55 20 20V12.41L20.29 12.7C20.68 13.09 21.31 13.09 21.7 12.7C22.09 12.32 22.09 11.68 21.71 11.29Z" fill="#424242"/>
                  </svg>
                </button>
              </div>

              {/* Phone Card */}
              <div className="bg-[#fafafa] rounded-[24px] px-4 py-2 flex items-center justify-between min-h-[52px]">
                <p className="font-noto-sans font-semibold text-sm text-text-main leading-[1.5]">
                  02-2253-1610
                </p>
                <button className="w-6 h-6">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#424242"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default OrderDetailModal;
