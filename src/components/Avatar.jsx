import React from 'react';

const Avatar = ({ image, text = '縣', className = '' }) => {
  return (
    <div className={`bg-avatar-container overflow-clip relative rounded-[40px] ${className}`}>
      {/* Gradient background */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 160 160\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"0.20000000298023224\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(4.8986e-16 8 -8 4.8986e-16 80 80)\"><stop stop-color=\"rgba(0,0,0,1)\" offset=\"0\"/><stop stop-color=\"rgba(0,0,0,0)\" offset=\"0.75\"/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 160 160\" preserveAspectRatio=\"none\"><g transform=\"matrix(-1.6552 7.5746 -8.0079 -1.7498 80 80)\"><foreignObject x=\"-220.75\" y=\"-220.75\" width=\"441.5\" height=\"441.5\"><div xmlns=\"http://www.w3.org/1999/xhtml\" style=\"background-image: conic-gradient(from 90deg, rgb(255, 125, 198) -1.2425%, rgb(207, 141, 194) 3.3181%, rgb(159, 157, 190) 7.8788%, rgb(111, 172, 186) 12.439%, rgb(63, 188, 182) 17%, rgb(56, 153, 187) 27.267%, rgb(49, 117, 192) 37.533%, rgb(42, 82, 198) 47.8%, rgb(35, 47, 203) 58.066%, rgb(62, 57, 202) 63.153%, rgb(90, 67, 202) 68.239%, rgb(145, 86, 200) 78.412%, rgb(200, 106, 199) 88.585%, rgb(255, 125, 198) 98.758%, rgb(207, 141, 194) 103.32%, rgb(159, 157, 190) 107.88%, rgb(111, 172, 186) 112.44%, rgb(63, 188, 182) 117%); opacity:1; height: 100%; width: 100%;\"></div></foreignObject></g></svg>')" 
        }}
      />
      
      {/* Text fallback */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-noto-sans font-semibold justify-center leading-[0] left-1/2 not-italic text-[26px] text-text-white text-center top-1/2 w-[36px] h-[36px]">
        <p className="leading-normal whitespace-pre-wrap">{text}</p>
      </div>
      
      {/* Image overlay */}
      {image && (
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 w-full h-full">
          <img 
            alt="Avatar" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            src={image} 
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
