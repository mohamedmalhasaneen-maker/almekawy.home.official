import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Download, Share2, Sparkles } from 'lucide-react';
import { CompanyConfig, AppLanguage } from '../types';
import { copyToClipboard, downloadVCard } from '../utils/helpers';
import logoImage from '../assets/images/almekawy_home_logo_1787688217328.jpg';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  lang: AppLanguage;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, config, lang }) => {
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://almekawy-upvc.com';

  const handleCopy = async () => {
    const ok = await copyToClipboard(currentUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.companyNameAr} | UPVC`,
          text: `تواصل مع شركة المكاوي هوم لقطاعات UPVC`,
          url: currentUrl
        });
      } catch (e) {
        console.log('Share canceled');
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 sm:top-5 sm:left-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1.5 pt-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <QrCode className="w-3.5 h-3.5" />
            <span>{isAr ? 'رمز QR السريع' : 'Quick QR Code'}</span>
          </div>
          <h3 className="text-xl font-black text-white">
            {isAr ? config.companyNameAr : config.companyNameEn}
          </h3>
          <p className="text-xs text-slate-400">
            {isAr ? 'امسح الرمز بكاميرا هاتفك لفتح جميع الأرقام والحسابات فوراً' : 'Scan with your mobile camera to access all contacts'}
          </p>
        </div>

        {/* High-Contrast Crisp QR Code Card */}
        <div className="mx-auto w-56 h-56 p-4 rounded-2xl bg-white flex flex-col items-center justify-center shadow-xl relative">
          {/* Stylized QR Matrix Pattern */}
          <div className="w-full h-full relative grid grid-cols-6 grid-rows-6 gap-1 p-2">
            {/* Top-Left Corner Box */}
            <div className="col-span-2 row-span-2 border-4 border-slate-950 rounded-lg p-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-slate-950 rounded-sm" />
            </div>
            
            {/* Top-Right Corner Box */}
            <div className="col-span-2 col-start-5 row-span-2 border-4 border-slate-950 rounded-lg p-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-slate-950 rounded-sm" />
            </div>

            {/* Bottom-Left Corner Box */}
            <div className="col-span-2 row-span-2 row-start-5 border-4 border-slate-950 rounded-lg p-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-slate-950 rounded-sm" />
            </div>

            {/* Center Brand Mini Badge */}
            <div className="col-span-2 row-span-2 col-start-3 row-start-3 rounded-lg overflow-hidden border border-amber-500/50 shadow-md flex items-center justify-center bg-slate-950 p-0.5">
              <img 
                src={logoImage} 
                alt="Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-md" 
              />
            </div>

            {/* Decorative Data cells */}
            <div className="col-start-3 row-start-1 bg-slate-950 rounded-[2px]" />
            <div className="col-start-4 row-start-1 bg-slate-950 rounded-[2px]" />
            <div className="col-start-3 row-start-2 bg-slate-950 rounded-[2px]" />
            <div className="col-start-1 row-start-3 bg-slate-950 rounded-[2px]" />
            <div className="col-start-2 row-start-4 bg-slate-950 rounded-[2px]" />
            <div className="col-start-5 row-start-3 bg-slate-950 rounded-[2px]" />
            <div className="col-start-6 row-start-4 bg-slate-950 rounded-[2px]" />
            <div className="col-start-3 row-start-5 bg-slate-950 rounded-[2px]" />
            <div className="col-start-4 row-start-6 bg-slate-950 rounded-[2px]" />
            <div className="col-start-5 row-start-5 bg-slate-950 rounded-[2px]" />
            <div className="col-start-6 row-start-6 bg-slate-950 rounded-[2px]" />
          </div>
        </div>

        {/* Link Input & Copy */}
        <div className="mt-6 flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent text-xs text-slate-300 font-mono px-2 outline-none truncate"
            dir="ltr"
          />
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الرابط' : 'Copy')}</span>
          </button>
        </div>

        {/* Secondary Download vCard action */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <button
            onClick={() => downloadVCard(config)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'حفظ جهة الاتصال' : 'Save vCard'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'مشاركة البطاقة' : 'Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
