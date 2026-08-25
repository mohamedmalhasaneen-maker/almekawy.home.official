import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Heart, ArrowUp, Sparkles, MapPin, Clock } from 'lucide-react';
import { CompanyConfig, AppLanguage } from '../types';

interface FooterProps {
  config: CompanyConfig;
  lang: AppLanguage;
  onOpenQr: () => void;
  onOpenEdit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, lang, onOpenQr, onOpenEdit }) => {
  const isAr = lang === 'ar';
  const primaryPhone = config.phones.find(p => p.isPrimary) || config.phones[0];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs pt-12 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Brand Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                UPVC
              </div>
              <h4 className="text-base font-black text-white">
                {isAr ? config.companyNameAr : config.companyNameEn}
              </h4>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              {isAr ? config.taglineAr : config.taglineEn}
            </p>
            <div className="flex items-center gap-2 pt-1 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'قطاعات معتمدة بضمان 10 سنوات ضد عيوب الصناعة وتغير اللون' : '10-Year Certified Warranty'}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-2.5">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              {isAr ? 'روابط سريعة' : 'Quick Actions'}
            </h5>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://al-mekawy-home.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 font-bold hover:underline transition-colors flex items-center gap-1"
                >
                  <span>{isAr ? 'برنامج عمل عروض الأسعار ↗' : 'Price Quotation App ↗'}</span>
                </a>
              </li>
              <li>
                <a href="#contact-numbers-section" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'أرقام الاتصال المباشرة' : 'Direct Phone Numbers'}
                </a>
              </li>
              <li>
                <a href="#social-media-hub" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'حسابات السوشيال ميديا' : 'Social Media Accounts'}
                </a>
              </li>
              <li>
                <button onClick={onOpenQr} className="hover:text-amber-400 transition-colors text-left">
                  {isAr ? 'رمز الـ QR والمشاركة' : 'QR Code & Share'}
                </button>
              </li>
              <li>
                <button onClick={onOpenEdit} className="hover:text-amber-400 transition-colors text-left">
                  {isAr ? 'تعديل بيانات الاتصال' : 'Edit Contact Info'}
                </button>
              </li>
            </ul>
          </div>

          {/* Hotline & Control Column */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              {isAr ? 'الخط الساخن والدعم' : 'Hotline & Support'}
            </h5>
            {primaryPhone && (
              <a
                href={`tel:${primaryPhone.number}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-mono font-bold hover:border-amber-500/50 transition-colors"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{primaryPhone.displayNumber}</span>
              </a>
            )}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenEdit}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                ⚙️ {isAr ? 'لوحة تعديل أرقام وحسابات الشركة' : 'Edit Company Numbers'}
              </button>
              <button
                onClick={onOpenQr}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                📱 {isAr ? 'عرض رمز الاستجابة السريعة (QR Code)' : 'Show QR Code'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {isAr ? config.companyNameAr : config.companyNameEn}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>{isAr ? 'للأعلى' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
