import React from 'react';

const Chips = ({ label, selected = false, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${selected 
          ? 'bg-white border-[#424242]' 
          : 'bg-white border-[#eeeeee]'}
        border-[0.5px] border-solid
        flex h-9 items-center justify-center overflow-clip 
        pl-2 pr-2.5 py-2 relative rounded-chips shrink-0
        transition-colors duration-200
        ${className}
      `}
    >
      <div className="flex items-center justify-center mr-[-2px] px-2 relative shrink-0">
        <div className={`
          flex flex-col font-noto-sans 
          ${selected ? 'font-semibold text-text-main' : 'font-normal text-text-subtle'}
          justify-center leading-[0] max-w-[180px] 
          overflow-hidden relative shrink-0 text-sm text-center 
          text-ellipsis whitespace-nowrap
        `}>
          <p className="leading-[1.5] overflow-hidden">{label}</p>
        </div>
      </div>
    </button>
  );
};

export default Chips;
