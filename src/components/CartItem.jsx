import React from 'react';

const CartItem = ({ 
  item,
  onUpdateQuantity,
  onRemove,
  className = ''
}) => {
  const { drink, quantity, size, sugar, ice, totalPrice, cartId } = item;
  const unitPrice = totalPrice != null && quantity > 0
    ? totalPrice / quantity
    : (item.price ?? drink?.price ?? 0);

  const handleIncrement = () => {
    onUpdateQuantity(cartId, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(cartId, quantity - 1);
    } else {
      onRemove(cartId);
    }
  };

  // Format size label
  const getSizeLabel = () => {
    if (size === 'extra-large') return '特大杯';
    return '大杯';
  };

  // Format sugar label
  const getSugarLabel = () => {
    const sugarMap = {
      'normal': '正常甜',
      'less': '少糖',
      'half': '半糖',
      'light': '微糖',
      'none': '無糖'
    };
    return sugarMap[sugar] || sugar;
  };

  // Format ice label
  const getIceLabel = () => {
    const iceMap = {
      'normal': '正常冰',
      'less': '少冰',
      'light': '微冰',
      'none': '去冰',
      'hot': '熱'
    };
    return iceMap[ice] || ice;
  };

  return (
    <div className={`flex items-start justify-between w-full ${className}`}>
      {/* Product Image */}
      <div className="relative rounded-[44px] shrink-0 size-[88px]">
        <div className="absolute inset-0 bg-[#bdbdbd] rounded-[44px]" />
        <img 
          alt={drink?.name || item.name}
          className="absolute inset-0 w-full h-full object-cover rounded-[44px]"
          src={drink?.image || item.image || 'https://via.placeholder.com/88'}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-3 items-start px-2">
        {/* Name and Price */}
        <div className="flex gap-2.5 items-start w-full">
          <div className="flex flex-1 flex-col items-start">
            <p className="font-noto-sans font-semibold text-xs text-text-main">
              {drink?.name || item.name || '未知飲品'}
            </p>
            <p className="font-noto-sans text-[11px] text-text-subtlest whitespace-pre-wrap">
              飲料容量: {getSizeLabel()}
            </p>
            <p className="font-noto-sans text-[11px] text-text-subtlest whitespace-pre-wrap">
              {getIceLabel()} {getSugarLabel()}
            </p>
          </div>
          <p className="font-noto-sans font-semibold text-sm text-text-main">
            ${unitPrice}
          </p>
        </div>

        {/* Quantity Adjuster */}
        <div className="bg-[#00704a] flex gap-2 h-6 items-center justify-center px-1 py-[3px] rounded-2xl">
          <button 
            onClick={handleDecrement}
            className="w-4 h-4 flex items-center justify-center transition-opacity hover:opacity-70"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H5V11H19V13Z" fill="#424242"/>
            </svg>
          </button>

          <p className="font-noto-sans font-semibold text-[11px] text-[#424242] text-center min-w-[16px]">
            {quantity}
          </p>

          <button 
            onClick={handleIncrement}
            className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#424242"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
