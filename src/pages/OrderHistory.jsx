import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserOrders } from '../hooks/useOrders';
import StatusBar from '../components/StatusBar';
import OrderDetailModal from '../components/OrderDetailModal';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders from Supabase
  const { orders, loading } = useUserOrders();

  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'cancelled'

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOrderClick = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatDate = (date) => {
    const now = new Date();
    const orderDate = new Date(date);
    const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    
    return orderDate.toLocaleDateString('zh-TW', {
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      'completed': '已完成',
      'cancelled': '已取消',
      'ready': '已完成',
      'preparing': '製作中',
      'confirmed': '已確認',
      'pending': '處理中'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'text-green-600 bg-green-50',
      'cancelled': 'text-red-600 bg-red-50',
      'ready': 'text-green-600 bg-green-50',
      'preparing': 'text-orange-600 bg-orange-50',
      'confirmed': 'text-blue-600 bg-blue-50',
      'pending': 'text-gray-600 bg-gray-50'
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
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
            訂單記錄
          </p>

          {/* Placeholder for alignment */}
          <div className="w-11 h-11 opacity-0" />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center px-4 pb-3 gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`
              px-4 py-2 rounded-full font-noto-sans text-sm transition-colors
              ${filter === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-text-subtle hover:bg-gray-200'
              }
            `}
          >
            全部
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`
              px-4 py-2 rounded-full font-noto-sans text-sm transition-colors
              ${filter === 'completed'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-text-subtle hover:bg-gray-200'
              }
            `}
          >
            已完成
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`
              px-4 py-2 rounded-full font-noto-sans text-sm transition-colors
              ${filter === 'cancelled'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-text-subtle hover:bg-gray-200'
              }
            `}
          >
            已取消
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[174px] pb-6">
        <div className="px-4">
          {loading ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-20">
              <p className="font-noto-sans text-base text-text-subtle">載入訂單中...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 mb-4 opacity-20">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM19 19H5V5H7V7H17V5H19V19Z" fill="#9e9e9e"/>
                </svg>
              </div>
              <p className="font-noto-sans text-base text-text-subtle mb-2">
                沒有訂單記錄
              </p>
              <p className="font-noto-sans text-sm text-text-subtlest">
                開始點餐，建立您的第一筆訂單
              </p>
            </div>
          ) : (
            /* Order List */
            <div className="flex flex-col gap-3">
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  onClick={() => handleOrderClick(order.id)}
                  className="bg-white rounded-3xl shadow-card p-4 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Header: Date and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-noto-sans text-sm text-text-subtle">
                      {formatDate(order.orderedAt)}
                    </p>
                    <span className={`
                      px-3 py-1 rounded-full font-noto-sans text-xs font-semibold
                      ${getStatusColor(order.status)}
                    `}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {/* Store Name */}
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" fill="#424242"/>
                    </svg>
                    <p className="font-noto-sans text-sm text-text-main font-semibold">
                      {order.storeName}
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="flex items-center justify-between">
                    <p className="font-noto-sans text-sm text-text-subtle">
                      {order.itemsCount} 項商品 · {order.orderNumber}
                    </p>
                    <p className="font-noto-sans text-base text-text-main font-semibold">
                      ${order.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-[21px] flex items-center justify-center bg-white">
        <div className="w-[139px] h-[5px] bg-gray-300 rounded-full" />
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderHistory;
