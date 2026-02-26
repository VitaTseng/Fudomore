import React, { useState, useEffect } from 'react';

const DrinkDetailModal = ({ 
  isOpen, 
  onClose, 
  drink,
  storeName,
  onAddToCart 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('large');
  const [selectedSugar, setSelectedSugar] = useState('half');
  const [selectedIce, setSelectedIce] = useState('normal');

  // Size options
  const sizeOptions = [
    { id: 'large', label: '大杯', icon: '🥤', price: 0 },
    { id: 'extra-large', label: '特大杯', icon: '🥤', price: 10 }
  ];

  // Sugar level options
  const sugarOptions = [
    { id: 'normal', label: '正常甜' },
    { id: 'less', label: '少糖' },
    { id: 'half', label: '半糖' },
    { id: 'light', label: '微糖' },
    { id: 'none', label: '無糖' }
  ];

  // Ice level options
  const iceOptions = [
    { id: 'normal', label: '正常冰' },
    { id: 'less', label: '少冰' },
    { id: 'light', label: '微冰' },
    { id: 'none', label: '去冰' },
    { id: 'hot', label: '熱飲' }
  ];

  // Calculate total price
  const basePrice = drink?.price || 160;
  const sizeExtra = sizeOptions.find(s => s.id === selectedSize)?.price || 0;
  const totalPrice = (basePrice + sizeExtra) * quantity;

  // Handle quantity change
  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Handle add to cart
  const handleAddToCart = () => {
    const order = {
      drink,
      quantity,
      size: selectedSize,
      sugar: selectedSugar,
      ice: selectedIce,
      totalPrice,
      storeName
    };
    onAddToCart(order);
    onClose();
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
        <div 
          className="bg-white w-full max-w-[430px] rounded-t-[28px] shadow-2xl pointer-events-auto transform transition-transform max-h-[90vh] flex flex-col overflow-hidden"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Fixed Header */}
          <div className="flex-shrink-0 bg-white z-10 rounded-t-[28px]">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center transition-opacity hover:opacity-70"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Store Name */}
              <p className="flex-1 text-center font-poppins font-semibold text-[17px] text-text-main truncate px-2">
                {storeName || '不可思議茶bar 7-ELEVEn 總部門市'}
              </p>

              {/* Share Button */}
              <button className="w-11 h-11 flex items-center justify-center transition-opacity hover:opacity-70">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#424242"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Product Image */}
            <div className="w-full h-[240px] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center overflow-hidden">
              <img 
                src={drink?.image || 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'}
                alt={drink?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="bg-white px-4 py-4 text-center border-b border-gray-100">
              <h2 className="font-noto-sans font-semibold text-xl text-text-main mb-2">
                {drink?.name || '冰甜杏凍金培烏龍'}
              </h2>
              <p className="font-noto-sans text-sm text-text-subtlest">
                190 卡路里
              </p>
            </div>

            {/* Options Section */}
            <div className="px-4 py-5 space-y-5">
            {/* Size Selection */}
            <div>
              <div className="flex gap-2 mb-4">
                {sizeOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedSize(option.id)}
                    className={`
                      flex-1 relative bg-white border-2 rounded-3xl p-6 
                      flex flex-col items-center justify-center gap-2
                      transition-all duration-200 shadow-card
                      ${selectedSize === option.id 
                        ? 'border-text-main' 
                        : 'border-transparent hover:border-gray-200'
                      }
                    `}
                  >
                    {/* Check icon for selected */}
                    {selectedSize === option.id && (
                      <div className="absolute top-0 right-0 bg-black rounded-bl-2xl rounded-tr-[22px] w-8 h-8 flex items-center justify-center">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                        </svg>
                      </div>
                    )}
                    
                    {/* Cup Icon */}
                    <div className="text-4xl">{option.icon}</div>
                    <span className="font-noto-sans font-semibold text-xs text-text-main">
                      {option.label}
                    </span>
                    {option.price > 0 && (
                      <span className="font-poppins text-xs text-text-subtle">
                        +${option.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sugar Level Selection */}
            <div className="bg-white rounded-3xl shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-noto-sans font-semibold text-xs text-text-main">
                  糖量選擇
                </h3>
                <span className="font-noto-sans text-sm text-text-subtlest">
                  必填
                </span>
              </div>

              <div className="space-y-0">
                {sugarOptions.map((option, index) => (
                  <React.Fragment key={option.id}>
                    <button
                      onClick={() => setSelectedSugar(option.id)}
                      className="w-full flex items-center justify-between py-3 transition-opacity hover:opacity-70"
                    >
                      <span className="font-noto-sans font-semibold text-sm text-text-main">
                        {option.label}
                      </span>
                      
                      {/* Radio Button */}
                      <div className="relative w-6 h-6">
                        <div className={`
                          w-6 h-6 rounded-full border-2 transition-all
                          ${selectedSugar === option.id 
                            ? 'bg-black border-black' 
                            : 'bg-transparent border-gray-300'
                          }
                        `}>
                          {selectedSugar === option.id && (
                            <svg className="w-full h-full p-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {index < sugarOptions.length - 1 && (
                      <div className="h-px bg-gray-100" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Ice Level Selection */}
            <div className="bg-white rounded-3xl shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-noto-sans font-semibold text-xs text-text-main">
                  冰量選擇
                </h3>
                <span className="font-noto-sans text-sm text-text-subtlest">
                  必填
                </span>
              </div>

              <div className="space-y-0">
                {iceOptions.map((option, index) => (
                  <React.Fragment key={option.id}>
                    <button
                      onClick={() => setSelectedIce(option.id)}
                      className="w-full flex items-center justify-between py-3 transition-opacity hover:opacity-70"
                    >
                      <span className="font-noto-sans font-semibold text-sm text-text-main">
                        {option.label}
                      </span>
                      
                      {/* Radio Button */}
                      <div className="relative w-6 h-6">
                        <div className={`
                          w-6 h-6 rounded-full border-2 transition-all
                          ${selectedIce === option.id 
                            ? 'bg-black border-black' 
                            : 'bg-transparent border-gray-300'
                          }
                        `}>
                          {selectedIce === option.id && (
                            <svg className="w-full h-full p-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {index < iceOptions.length - 1 && (
                      <div className="h-px bg-gray-100" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          </div>

          {/* Fixed Bottom Action Bar */}
          <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-noto-sans text-xs text-text-subtlest">
                總金額
              </span>
              <span className="font-poppins font-bold text-xl text-text-main">
                ${totalPrice}
              </span>
            </div>

            <div className="flex gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-black rounded-3xl h-11 px-3">
                <button 
                  onClick={handleDecrement}
                  className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-70"
                  disabled={quantity === 1}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13H5V11H19V13Z" fill="#424242"/>
                  </svg>
                </button>

                <span className="font-noto-sans font-semibold text-base text-text-main min-w-[2rem] text-center">
                  {quantity}
                </span>

                <button 
                  onClick={handleIncrement}
                  className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-70"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#424242"/>
                  </svg>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white rounded-3xl h-11 px-6 font-noto-sans font-semibold text-base transition-opacity hover:opacity-90"
              >
                加入訂單
              </button>
            </div>

            {/* iOS Home Indicator Space */}
            <div className="h-5 flex items-center justify-center">
              <div className="w-[139px] h-[5px] bg-gray-300 rounded-full" />
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

export default DrinkDetailModal;
