import React from 'react';

const CategoryTab = ({ 
  label, 
  selected = false, 
  onClick,
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${selected ? 'bg-white' : 'bg-transparent'}
        flex items-center justify-center overflow-clip 
        px-3 py-2 relative rounded-[100px] shrink-0
        transition-colors duration-200
        ${className}
      `}
    >
      <p className={`
        font-noto-sans font-semibold leading-[1.5] relative shrink-0 text-[11px]
        ${selected ? 'text-[#00704a]' : 'text-text-main'}
      `}>
        {label}
      </p>
    </button>
  );
};

export default CategoryTab;
