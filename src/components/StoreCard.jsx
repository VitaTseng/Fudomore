import React from 'react';
import Badge from './Badge';

const StoreCard = ({ 
  image, 
  name, 
  rating, 
  distance, 
  walkTime,
  badges = [],
  estimatedTime,
  className = ''
}) => {
  return (
    <div className={`bg-white flex flex-col items-start overflow-clip relative rounded-card-m shadow-card shrink-0 w-full ${className}`}>
      {/* Image Area */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="flex flex-col items-start overflow-clip relative shrink-0 w-full">
          <img 
            alt={name} 
            className="w-full h-[240px] object-cover" 
            src={image || 'https://via.placeholder.com/361x240'} 
          />
        </div>
        
        {/* Estimated Time Badge */}
        {estimatedTime && (
          <div className="absolute bg-badge-common flex items-center justify-center min-h-[24px] px-1 py-0.5 right-2 rounded-badge-capsule top-2">
            <div className="flex items-center justify-center px-1 relative shrink-0">
              <p className="font-noto-sans font-normal leading-[1.5] max-h-9 overflow-hidden relative shrink-0 text-xs text-text-white text-ellipsis">
                {estimatedTime}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex flex-col gap-2 items-start pb-4 pt-3 px-3 relative shrink-0 w-full">
        {/* Name and Rating */}
        <div className="flex gap-2 items-center justify-center leading-[1.5] relative shrink-0 text-sm w-full">
          <p className="font-noto-sans font-semibold overflow-hidden relative shrink-0 text-text-main text-ellipsis w-[290px] whitespace-pre-wrap">
            {name}
          </p>
          <p className="font-poppins not-italic relative shrink-0 text-text-subtle">
            ⭐ {rating}
          </p>
        </div>
        
        {/* Options Area */}
        <div className="flex flex-wrap gap-3 items-center relative shrink-0 w-full">
          <p className="font-noto-sans font-normal leading-[1.5] relative shrink-0 text-xs text-text-subtlest">
            {distance}
          </p>
          <p className="font-noto-sans font-normal leading-[1.5] relative shrink-0 text-xs text-text-subtlest">
            {walkTime}
          </p>
          
          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex gap-2 items-center relative shrink-0">
              {badges.map((badge, index) => (
                <Badge key={index} label={badge} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
