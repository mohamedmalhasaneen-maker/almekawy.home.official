import React from 'react';
import logoImage from '../assets/images/almekawy_home_logo_1787688217328.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative flex-shrink-0 ${sizeClasses[size]} rounded-xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/15 bg-slate-950 group`}>
        <img
          src={logoImage}
          alt="Al-Mekawy Home UPVC Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {/* Active verified indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif tracking-widest text-amber-400 font-bold text-sm sm:text-base leading-tight">
            ALMEKAWY
          </span>
          <span className="font-serif tracking-wider text-slate-300 font-semibold text-xs sm:text-sm leading-tight">
            HOME
          </span>
        </div>
      )}
    </div>
  );
};
