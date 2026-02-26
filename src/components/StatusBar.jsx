import React from 'react';

const StatusBar = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <div className="bg-status-bar-main h-[54px] relative w-full">
        <div className="-translate-y-1/2 absolute h-[54px] left-0 right-[64.25%] top-1/2">
          <p className="absolute font-['SF_Pro:Semibold',sans-serif] inset-[33.96%_36.19%_25.3%_36.21%] leading-[22px] not-italic text-[17px] text-text-main text-center">
            9:41
          </p>
        </div>
        <div className="-translate-y-1/2 absolute h-[54px] left-[64.25%] right-0 top-1/2">
          <div className="-translate-x-1/2 absolute bottom-[33.33%] left-[calc(50%+24.63px)] top-[42.59%]">
            <div className="-translate-x-1/2 absolute border border-text-main border-solid bottom-[33.33%] left-[calc(50%+23.47px)] opacity-35 rounded-[4.3px] top-[42.59%] w-[25px]" />
            <div className="-translate-x-1/2 absolute bg-text-main bottom-[37.04%] left-[calc(50%+23.47px)] rounded-[2.5px] top-[46.3%] w-[21px]" />
          </div>
          <div className="-translate-x-1/2 absolute bottom-[33.4%] left-[calc(50%-4.76px)] top-[43.77%] w-[17.142px]">
            <svg viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.57 2.29C10.76 0.22 14.24 0.22 16.43 2.29L17.14 2.97C17.32 3.14 17.32 3.42 17.14 3.59L15.71 4.97C15.62 5.06 15.48 5.06 15.39 4.97L14.43 4.05C12.97 2.66 10.53 2.66 9.07 4.05L8.04 5.02C7.95 5.11 7.81 5.11 7.72 5.02L6.29 3.64C6.11 3.47 6.11 3.19 6.29 3.02L8.57 2.29ZM18.86 5.68L20.14 6.91C20.32 7.08 20.32 7.36 20.14 7.53L14.86 12.61C14.68 12.78 14.39 12.78 14.21 12.61L11.29 9.79C11.24 9.74 11.16 9.74 11.11 9.79L8.19 12.61C8.01 12.78 7.72 12.78 7.54 12.61L2.26 7.53C2.08 7.36 2.08 7.08 2.26 6.91L3.54 5.68C3.72 5.51 4.01 5.51 4.19 5.68L7.11 8.5C7.16 8.55 7.24 8.55 7.29 8.5L10.21 5.68C10.39 5.51 10.68 5.51 10.86 5.68L13.78 8.5C13.83 8.55 13.91 8.55 13.96 8.5L16.88 5.68C17.06 5.51 17.35 5.51 18.86 5.68Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="-translate-x-1/2 absolute bottom-[33.77%] left-[calc(50%-30.43px)] top-[43.58%] w-[19.2px]">
            <svg viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.5 0H17C16.17 0 15.5 0.67 15.5 1.5V12.5C15.5 13.33 16.17 14 17 14H18.5C19.33 14 20 13.33 20 12.5V1.5C20 0.67 19.33 0 18.5 0ZM12.5 3H11C10.17 3 9.5 3.67 9.5 4.5V12.5C9.5 13.33 10.17 14 11 14H12.5C13.33 14 14 13.33 14 12.5V4.5C14 3.67 13.33 3 12.5 3ZM5 6.5H6.5C7.33 6.5 8 7.17 8 8V12.5C8 13.33 7.33 14 6.5 14H5C4.17 14 3.5 13.33 3.5 12.5V8C3.5 7.17 4.17 6.5 5 6.5ZM0.5 10H2C2.83 10 3.5 10.67 3.5 11.5V12.5C3.5 13.33 2.83 14 2 14H0.5C-0.33 14 -1 13.33 -1 12.5V11.5C-1 10.67 -0.33 10 0.5 10Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
