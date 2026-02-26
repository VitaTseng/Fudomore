import React from 'react';

const Logo = ({ variant = 'default', className = '' }) => {
  return (
    <div className={`h-[60px] relative w-[120px] ${className}`}>
      {/* Placeholder for logo - Replace with actual logo images */}
      <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-orange-400 to-red-500 rounded-lg">
        <span className="text-white font-bold text-lg">Logo</span>
      </div>
    </div>
  );
};

export default Logo;
