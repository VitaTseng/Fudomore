import React from 'react';

const SectionTitle = ({ title, showArrow = false, onArrowClick, className = '' }) => {
  return (
    <div className={`flex gap-[18px] items-center overflow-clip px-4 relative shrink-0 w-full ${className}`}>
      <div className="flex flex-1 flex-col gap-1 items-center justify-center min-h-px min-w-px py-2 relative">
        <div className="flex flex-col font-noto-sans font-semibold justify-end leading-[0] overflow-hidden relative shrink-0 text-base text-text-main text-ellipsis w-full">
          <p className="leading-normal whitespace-pre-wrap">{title}</p>
        </div>
      </div>
      
      {showArrow && (
        <button
          onClick={onArrowClick}
          className="bg-button-inverse-subtle overflow-clip relative rounded-[40px] shrink-0 size-8 transition-opacity hover:opacity-80"
        >
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-9 top-1/2">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#424242"/>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default SectionTitle;
