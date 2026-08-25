import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Download, 
  Share2, 
  ShieldCheck, 
  VolumeX, 
  Award, 
  MapPin, 
  Clock, 
  Check, 
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';
import { CompanyConfig, AppLanguage } from '../types';
import { downloadVCard, copyToClipboard } from '../utils/helpers';

interface HeroCardProps {
  config: CompanyConfig;
  lang: AppLanguage;
  onOpenQr: () => void;
  onScrollToContact: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  config,
  lang,
  onOpenQr,
  onScrollToContact
}) => {
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);
  const primaryPhone = config.phones.find(p => p.isPrimary) || config.phones[0];
  const primaryWhatsapp = config.socials.find(s => s.platform === 'whatsapp');

  const OFFICIAL_SITE_URL = 'https://almekawy-home-official.vercel.app/';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.companyNameEn} | ${config.companyNameAr}`,
          text: `${config.companyNameAr} - ${config.taglineAr}`,
          url: OFFICIAL_SITE_URL
        });
      } catch (e) {
        console.log('Share canceled');
      }
    } else {
      const ok = await copyToClipboard(OFFICIAL_SITE_URL);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const handleDownloadContact = () => {
    downloadVCard(config);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top verified & status badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>{isAr ? 'المنصة الرسمية المعتمدة لقطاعات UPVC' : 'Official Certified UPVC Portal'}</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{isAr ? 'فريق خدمة العملاء متاح للرد الآن' : 'Customer Support Online'}</span>
        </div>
      </div>

      {/* Main Company Title & Description */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {isAr ? config.companyNameAr : config.companyNameEn}
            </h1>
            <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              {isAr ? config.subtitleAr : config.subtitleEn}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {isAr ? config.taglineAr : config.taglineEn}
          </p>

          {/* Quick info row */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{isAr ? config.workingHoursAr : config.workingHoursEn}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'المعاينة والتركيب متاح لجميع المحافظات' : 'Installations nationwide'}</span>
            </div>
          </div>
        </div>

        {/* Feature Pill Highlights */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center justify-center text-center">
            <VolumeX className="w-7 h-7 text-amber-400 mb-1.5" />
            <span className="text-xl font-extrabold text-white">{config.soundInsulationRate}</span>
            <span className="text-xs text-slate-300 font-medium">{isAr ? 'عزل صوت وضوضاء' : 'Sound Insulation'}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center justify-center text-center">
            <ShieldCheck className="w-7 h-7 text-emerald-400 mb-1.5" />
            <span className="text-xl font-extrabold text-white">{config.warrantyYears} {isAr ? 'سنوات' : 'Years'}</span>
            <span className="text-xs text-slate-300 font-medium">{isAr ? 'ضمان رسمي معتمد' : 'Full Warranty'}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center justify-center text-center">
            <Flame className="w-7 h-7 text-rose-400 mb-1.5" />
            <span className="text-xl font-extrabold text-white">{config.heatInsulationRate}</span>
            <span className="text-xs text-slate-300 font-medium">{isAr ? 'عزل حراري وتوفير' : 'Heat Insulation'}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center justify-center text-center">
            <Award className="w-7 h-7 text-sky-400 mb-1.5" />
            <span className="text-xl font-extrabold text-white">{isAr ? 'ألماني / تركي' : 'EU Quality'}</span>
            <span className="text-xs text-slate-300 font-medium">{isAr ? 'قطاعات معتمدة' : 'Certified Profiles'}</span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons Bar */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Direct Call Button */}
        {primaryPhone && (
          <a
            id="hero-call-button"
            href={`tel:${primaryPhone.number}`}
            className="flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="w-5 h-5" />
            <span>{isAr ? 'اتصال مباشر الآن' : 'Direct Call Now'}</span>
          </a>
        )}

        {/* WhatsApp Chat Button */}
        {primaryWhatsapp && (
          <a
            id="hero-whatsapp-button"
            href={primaryWhatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{isAr ? 'محادثة واتساب فورية' : 'Instant WhatsApp'}</span>
          </a>
        )}

        {/* Save vCard Contact */}
        <button
          id="hero-vcard-button"
          onClick={handleDownloadContact}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>{isAr ? 'حفظ جهة الاتصال (vCard)' : 'Save Contact to Phone'}</span>
        </button>

        {/* Quick Contact / Inspection Scroll */}
        <button
          id="hero-contact-button"
          onClick={onScrollToContact}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-amber-300 hover:text-amber-200 font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isAr ? 'طلب معاينة ومراسلة' : 'Request Inspection'}</span>
        </button>
      </div>

      {/* Bottom Share & Copy indicator */}
      <div className="relative z-10 mt-4 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          {isAr ? 'المكاوي هوم - خبرة وتميز في تشطيب وتصنيع قطاعات UPVC' : 'Al-Mekawy Home - Excellence in UPVC Doors & Windows'}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors p-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? (isAr ? 'تم نسخ الرابط!' : 'Link Copied!') : (isAr ? 'مشاركة البطاقة' : 'Share Hub')}</span>
          </button>
          <span>•</span>
          <button
            onClick={onOpenQr}
            className="text-slate-300 hover:text-amber-400 transition-colors p-1"
          >
            {isAr ? 'عرض باركود QR' : 'Show QR'}
          </button>
        </div>
      </div>
    </div>
  );
};
