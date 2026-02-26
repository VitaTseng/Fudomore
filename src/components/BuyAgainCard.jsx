import React from 'react';

const BuyAgainCard = ({ order, onAddToCart }) => {
  const { items, totalPrice } = order;
  const isSingleItem = items.length === 1;
  const firstItem = items[0];

  // Generate title based on items
  const getTitle = () => {
    if (isSingleItem) {
      return firstItem.name;
    }
    return items.slice(0, 2).map(item => item.name).join('、');
  };

  // Generate description based on items
  const getDescription = () => {
    if (isSingleItem) {
      const specs = [firstItem.size];
      if (firstItem.ice) specs.push(firstItem.ice);
      if (firstItem.sugar) specs.push(firstItem.sugar);
      return specs.join(' · ');
    }
    return `${items.length} 項商品 · ${items.map(item => `${item.size} ${item.quantity}杯`).join('·')}`;
  };

  const handleClick = () => {
    if (onAddToCart) {
      onAddToCart(order);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-2 h-[194px] items-center overflow-clip p-3 rounded-[20px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] shrink-0 w-[165px]">
      {/* Image(s) */}
      <div className="relative w-full flex items-center justify-center h-[65px] shrink-0">
        {isSingleItem ? (
          // Single circular image
          <div className="w-[65px] h-[65px] rounded-[33px] overflow-hidden bg-gray-100">
            <img
              src={firstItem.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'}
              alt={firstItem.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          // Multiple overlapping images
          <div className="relative w-full h-[65px]">
            <div className="absolute left-[18px] top-0 w-[65px] h-[65px] rounded-[33px] overflow-hidden bg-gray-100 border-2 border-white">
              <img
                src={items[0].image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'}
                alt={items[0].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute left-[58px] top-0 w-[65px] h-[65px] rounded-[33px] overflow-hidden bg-gray-100 border-2 border-white">
              <img
                src={items[1]?.image || 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'}
                alt={items[1]?.name || items[0].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start flex-1 min-h-0 w-full leading-[1.5] text-[11px]">
        <p className="font-noto-sans font-semibold text-text-main w-full line-clamp-2">
          {getTitle()}
        </p>
        <p className="font-noto-sans text-text-subtlest w-full line-clamp-2">
          {getDescription()}
        </p>
      </div>

      {/* Price and Add Button */}
      <div className="flex items-center justify-between w-full shrink-0">
        <p className="font-noto-sans font-semibold text-sm leading-[1.5] text-text-main">
          ${totalPrice}
        </p>
        <button
          onClick={handleClick}
          className="w-6 h-6 bg-[#00704a] rounded-full flex items-center justify-center transition-opacity hover:opacity-80 active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BuyAgainCard;
