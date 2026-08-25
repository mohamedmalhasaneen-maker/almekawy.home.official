import React from 'react';
import { Calculator, ExternalLink, Sparkles, FileText, CheckCircle, ArrowLeft, ArrowRight, Layers, Sliders } from 'lucide-react';
import { AppLanguage } from '../types';

interface QuotationOfferSectionProps {
  lang: AppLanguage;
}

export const QuotationOfferSection: React.FC<QuotationOfferSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const quotationAppUrl = 'https://al-mekawy-home.vercel.app/';

  return (
    <section 
      id="quotation-app-section" 
      className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900/95 to-amber-950/20 p-3.5 sm:p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3.5"
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex-shrink-0">
          <Calculator className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-white">
              {isAr ? 'برنامج عمل عروض الأسعار والمقايسات' : 'Online Price Quotations & Calculator'}
            </h3>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 text-[10px] font-bold">
              {isAr ? 'تطبيق فوري' : 'Live App'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {isAr 
              ? 'احسب تكلفة شبابيك وأبواب الـ UPVC بالمقاسات والمواصفات الفنية المعتمدة' 
              : 'Calculate instant UPVC windows & doors pricing with custom dimensions'}
          </p>
        </div>
      </div>

      <a
        id="open-quotation-app-btn"
        href={quotationAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto flex-shrink-0 group inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Calculator className="w-4 h-4 text-slate-950" />
        <span>{isAr ? 'فتح البرنامج' : 'Launch App'}</span>
        <ExternalLink className="w-3.5 h-3.5 text-slate-950 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  );
};
