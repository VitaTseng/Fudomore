import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderDetailModal from './OrderDetailModal';

const ActiveOrderCard = ({ order }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!order) return null;

  // Calculate progress based on status
  const getProgress = () => {
    switch (order.status) {
      case 'pending':
        return 33;
      case 'confirmed':
        return 50;
      case 'preparing':
        return 66;
      case 'ready':
        return 100;
      default:
        return 0;
    }
  };

  const progress = getProgress();

  const getStatusText = () => {
    switch (order.status) {
      case 'pending':
        return '等待店家確認...';
      case 'confirmed':
        return '店家已接單！';
      case 'preparing':
        return '正在製作餐點...';
      case 'ready':
        return '取餐號碼 00000';
      default:
        return '處理中...';
    }
  };

  const getSubtitleText = () => {
    switch (order.status) {
      case 'ready':
        return '餐點已完成，請儘速取用';
      default:
        return '預計取餐時間';
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="px-4 w-full">
      <div 
        className={`flex flex-col gap-1 p-4 rounded-[20px] shadow-[0px_8px_20px_-6px_rgba(7,3,23,0.2)] relative overflow-hidden transition-all duration-300 ${
          isExpanded ? 'h-auto' : 'h-[140px]'
        }`}
        style={{
          background: 'radial-gradient(circle at 10% -10%, rgba(151,117,255,1) 0%, rgba(139,101,255,1) 50%, rgba(108,68,255,1) 73%, rgba(78,34,255,1) 95%)'
        }}
      >
        {/* Clickable area for navigation - everything except toggle button */}
        <div 
          onClick={handleCardClick}
          className="cursor-pointer"
        >
          {/* Status Title */}
          <p className="font-noto-sans font-bold text-xl text-white leading-normal">
            {getStatusText()}
          </p>

          {/* Subtitle */}
          <div className="flex items-center gap-[5px] font-noto-sans text-[11px] text-white leading-[1.5]">
            <p>{getSubtitleText()}</p>
            {order.status !== 'ready' && (
              <p>{order.pickupTimeStart}-{order.pickupTimeEnd}</p>
            )}
          </div>

          {/* Order Details (both collapsed and expanded state when ready) */}
          {order.status === 'ready' && (
            <div className="flex font-noto-sans text-[11px] text-white leading-[1.5] gap-[5px] items-start mt-1">
              <p>{order.items?.length || 2} 份餐點</p>
              <p>{order.storeName || '7-ELEVEN總部門市'}自取</p>
            </div>
          )}
        </div>

        {/* Progress Bar (only in collapsed state and not ready) */}
        {!isExpanded && order.status !== 'ready' && (
          <div className="flex items-center gap-2 h-10 w-full">
            <div className="bg-white rounded w-2 h-2 shrink-0" />
            <div 
              className="bg-white h-1 flex-1 rounded-[5px] transition-opacity duration-300"
              style={{ opacity: progress >= 50 ? 1 : 0.4 }}
            />
            <div 
              className="bg-white rounded w-2 h-2 shrink-0 transition-opacity duration-300"
              style={{ opacity: progress >= 50 ? 1 : 0.4 }}
            />
            <div 
              className="bg-white h-1 flex-1 rounded-[5px] transition-opacity duration-300"
              style={{ opacity: progress >= 100 ? 1 : 0.4 }}
            />
            <div 
              className="bg-white rounded w-2 h-2 shrink-0 transition-opacity duration-300"
              style={{ opacity: progress >= 100 ? 1 : 0.4 }}
            />
          </div>
        )}

        {/* Toggle Button - Order Meta */}
        <button
          onClick={handleToggleExpand}
          className="flex items-center justify-between w-full mt-auto"
        >
          <p className="font-noto-sans font-semibold text-sm text-white leading-normal">
            總金額 ${order.total}｜已付款
          </p>
          <div 
            className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div 
            onClick={handleCardClick}
            className="flex flex-col gap-4 mt-4 cursor-pointer"
          >
            {/* Order Details Card - Light Theme */}
            <div className="bg-white rounded-[24px] p-4 flex flex-col gap-4 shadow-card">
              <div className="flex flex-col gap-3">
                {/* Pickup Counter Number */}
                <p className="font-noto-sans font-bold text-xl text-[#714eff] text-center w-full">
                  自取櫃 00000
                </p>

                {/* Pickup Location */}
                <div className="flex items-center justify-between min-h-[24px]">
                  <div className="flex items-center gap-1">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" fill="#424242"/>
                    </svg>
                    <p className="font-noto-sans font-semibold text-sm text-text-main leading-[1.5]">
                      取餐地點
                    </p>
                  </div>
                  <p className="font-noto-sans text-sm text-text-main leading-[1.5] text-right flex-1 ml-2">
                    {order.storeName || '不可思議茶bar 7-ELEVEn 總部門市'}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gray-200 w-full" />

                {/* Pickup Method */}
                <div className="flex items-center justify-between min-h-[24px]">
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

                {/* Instruction Text */}
                <p className="font-noto-sans text-xs text-text-subtle leading-[1.5]">
                  請向取餐櫃檯夥伴報上您的訂單編號 #A123。為了維持飲品最佳風味，建議您準時取餐，開啟美好的一天！
                </p>

                {/* Order Items */}
                {order.items?.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="bg-gray-100 rounded-[20px] px-2 py-1 min-h-[28px] flex items-center justify-center shrink-0">
                      <p className="font-noto-sans font-semibold text-xs text-text-main leading-[1.5]">
                        {item.quantity}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-0">
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
            </div>
          </div>
        )}

      </div>
    </div>

      {/* Order Detail Modal */}
      <OrderDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={order}
      />
    </>
  );
};

export default ActiveOrderCard;
