import React from 'react';
import { Globe, Calculator, ExternalLink, QrCode } from 'lucide-react';
import { CompanyConfig, AppLanguage } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  config: CompanyConfig;
  lang: AppLanguage;
  onToggleLang: () => void;
  onOpenQr?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  lang,
  onToggleLang,
  onOpenQr
}) => {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 sm:gap-4">
          <BrandLogo size="md" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                {isAr ? config.companyNameAr : config.companyNameEn}
                <span className="inline-flex items-center justify-center w-4.5 h-4.5 bg-blue-500 text-white rounded-full text-[10px]" title="حساب رسمي معتمد">
                  ✓
                </span>
              </h1>
            </div>
            <p className="text-xs text-amber-400/90 font-medium hidden sm:block">
              {isAr ? config.subtitleAr : config.subtitleEn}
            </p>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300">
          <a href="#contact-numbers-section" className="hover:text-amber-400 text-slate-300 transition-colors">
            {isAr ? 'أرقام الاتصال' : 'Phone Numbers'}
          </a>
          <a href="#quotation-app-section" className="hover:text-amber-400 text-amber-400 font-bold transition-colors flex items-center gap-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isAr ? 'حساب عروض الأسعار' : 'Price Quotations'}</span>
          </a>
          <a href="#social-media-hub" className="hover:text-amber-400 text-slate-300 transition-colors">
            {isAr ? 'حسابات التواصل' : 'Social Hub'}
          </a>
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Quotation Direct Link */}
          <a
            id="header-quotation-direct-link"
            href="https://al-mekawy-home.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            title={isAr ? 'فتح منظومة عمل عروض الأسعار' : 'Open Price Quotation App'}
          >
            <Calculator className="w-4 h-4" />
            <span>{isAr ? 'عمل عرض سعر' : 'Get Quotation'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* QR Code trigger */}
          {onOpenQr && (
            <button
              id="header-qr-btn"
              onClick={onOpenQr}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
              title={isAr ? 'عرض رمز QR' : 'Show QR Code'}
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">{isAr ? 'رمز QR' : 'QR Code'}</span>
            </button>
          )}

          {/* Language switch */}
          <button
            id="header-lang-btn"
            onClick={onToggleLang}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
            title="تغيير اللغة / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
