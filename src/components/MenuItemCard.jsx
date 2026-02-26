import React from 'react';

const MenuItemCard = ({ 
  image, 
  name, 
  price,
  onAdd,
  className = '' 
}) => {
  const handleCardClick = (e) => {
    // Only trigger if not clicking the add button
    if (!e.target.closest('button')) {
      onAdd();
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-white flex items-start overflow-clip relative rounded-card-m shadow-card shrink-0 w-full cursor-pointer transition-transform hover:scale-[1.02] ${className}`}
    >
      {/* Product Image */}
      <div className="relative rounded-bl-[16px] rounded-tl-[16px] shrink-0 size-[88px]">
        <div className="absolute inset-0 bg-[#bdbdbd] rounded-bl-[16px] rounded-tl-[16px]" />
        <img 
          alt={name} 
          className="absolute inset-0 max-w-none object-cover rounded-bl-[16px] rounded-tl-[16px] size-full" 
          src={image || 'https://via.placeholder.com/88'} 
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col items-end min-h-px min-w-px p-2 relative self-stretch">
        {/* Product Name */}
        <div className="flex flex-1 flex-col items-start min-h-px min-w-px relative w-full">
          <p className="font-noto-sans font-semibold leading-[1.5] relative shrink-0 text-xs text-text-main">
            {name}
          </p>
        </div>
        
        {/* Price and Add Button */}
        <div className="flex items-center justify-between relative shrink-0 w-full">
          <p className="font-noto-sans font-semibold leading-[1.5] relative shrink-0 text-sm text-text-main">
            ${price}
          </p>
          
          {/* Add Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="overflow-clip relative shrink-0 size-6 transition-opacity hover:opacity-80 hover:scale-110"
          >
            <div className="absolute bg-[#eeeeee] left-0 rounded-2xl size-6 top-0" />
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-9 top-1/2">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#424242"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
