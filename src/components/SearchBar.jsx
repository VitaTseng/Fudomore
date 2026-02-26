import React from 'react';

const SearchBar = ({ placeholder = '搜尋店家、飲料', className = '' }) => {
  return (
    <div className={`bg-search-bar-container flex gap-1 h-[44px] items-center overflow-clip px-2 py-1 relative rounded-input-l ${className}`}>
      {/* Search Icon */}
      <div className="overflow-clip relative shrink-0 size-9">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-9 top-1/2">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#616161"/>
          </svg>
        </div>
      </div>
      
      {/* Input Content */}
      <div className="flex flex-1 gap-0.5 items-center min-h-px min-w-px relative">
        <input
          type="text"
          placeholder={placeholder}
          className="font-noto-sans font-normal leading-[1.5] w-full bg-transparent border-none outline-none text-sm text-text-subtlest placeholder:text-text-subtlest"
        />
      </div>
      
      {/* Trailing Elements */}
      <div className="flex items-center relative shrink-0">
        {/* Microphone Icon */}
        <div className="overflow-clip relative shrink-0 size-9">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-9 top-1/2">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM17.91 11C17.91 14 15.41 16.41 12.5 16.91V20H11.5V16.91C8.59 16.41 6.09 14 6.09 11H5C5 14.42 7.72 17.24 11 17.72V20H13V17.72C16.28 17.24 19 14.42 19 11H17.91Z" fill="#616161"/>
            </svg>
          </div>
        </div>
        
        {/* More Icon */}
        <div className="overflow-clip relative shrink-0 size-9">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-9 top-1/2">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="#616161"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
