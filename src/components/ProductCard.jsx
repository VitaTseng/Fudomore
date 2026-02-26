import React from 'react';
import Badge from './Badge';

const ProductCard = ({ 
  image, 
  provider, 
  providerLogo, 
  rating, 
  name, 
  description, 
  price,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-3 items-start relative shrink-0 ${className}`}>
      {/* Image */}
      <div className="flex flex-col items-start overflow-clip relative shrink-0 w-[240px]">
        <img 
          alt={name} 
          className="w-full h-[240px] object-cover" 
          src={image || 'https://via.placeholder.com/240'} 
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col gap-1 items-start px-2 relative shrink-0 w-full">
        {/* Provider */}
        <div className="flex gap-1 items-center relative shrink-0 w-full">
          <div className="border-[0.5px] border-[rgba(255,255,255,0.05)] border-solid relative rounded-avatar shrink-0 size-4">
            <img 
              alt={provider} 
              className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-avatar size-full" 
              src={providerLogo || 'https://via.placeholder.com/16'} 
            />
          </div>
          <p className="flex-1 font-noto-sans font-normal leading-[1.5] min-h-px min-w-px overflow-hidden text-xs text-text-subtle text-ellipsis whitespace-nowrap">
            {provider}
          </p>
          <p className="font-poppins leading-[1.5] not-italic shrink-0 text-sm text-text-subtle">
            ⭐ {rating}
          </p>
        </div>
        
        {/* Name */}
        <p className="font-noto-sans font-semibold leading-[1.5] overflow-hidden relative shrink-0 text-sm text-text-main text-ellipsis w-full whitespace-nowrap">
          {name}
        </p>
        
        {/* Description */}
        <p className="font-noto-sans font-normal leading-[1.5] relative shrink-0 text-[11px] text-text-subtlest w-full whitespace-pre-wrap">
          {description}
        </p>
        
        {/* Price */}
        <p className="font-poppins font-semibold leading-[1.5] not-italic relative shrink-0 text-sm text-text-main w-full whitespace-pre-wrap">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
