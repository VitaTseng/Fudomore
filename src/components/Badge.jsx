import React from 'react';

const Badge = ({ label, className = '' }) => {
  return (
    <div className={`bg-badge-common flex items-center justify-center min-h-[24px] px-1 py-0.5 rounded-badge-capsule ${className}`}>
      <div className="flex items-center justify-center px-1 relative shrink-0">
        <p className="font-noto-sans font-normal leading-[1.5] max-h-9 overflow-hidden relative shrink-0 text-xs text-text-white text-ellipsis">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Badge;
