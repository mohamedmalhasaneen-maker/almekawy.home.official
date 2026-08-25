import React, { useState } from 'react';
import { Phone, MessageCircle, Copy, Check, Clock, UserCheck, ShieldCheck, Sparkles, Building, Wrench } from 'lucide-react';
import { PhoneContact, AppLanguage } from '../types';
import { copyToClipboard, createWhatsAppUrl } from '../utils/helpers';

interface ContactChannelsProps {
  phones: PhoneContact[];
  lang: AppLanguage;
}

export const ContactChannels: React.FC<ContactChannelsProps> = ({ phones, lang }) => {
  const isAr = lang === 'ar';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, number: string) => {
    const success = await copyToClipboard(number);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const getDepartmentIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 1:
        return <Building className="w-5 h-5 text-emerald-400" />;
      default:
        return <Phone className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="contact-numbers-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Phone className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isAr ? 'أرقام الاتصال المباشرة' : 'Direct Contact Phone Numbers'}
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1.5">
            {isAr 
              ? 'تواصل معنا هاتفياً أو عبر واتساب مباشرة للاستفسارات والمعاينات وحساب المقايسات' 
              : 'Contact us directly via call or WhatsApp for inquiries and site visits'}
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {phones.map((phone, idx) => {
          const isCopied = copiedId === phone.id;
          const whatsappMsg = isAr
            ? `السلام عليكم، أتواصل معكم بخصوص: ${phone.departmentAr} بشركة المكاوي هوم UPVC.`
            : `Hello, I am contacting you regarding: ${phone.departmentEn} at Al-Mekawy Home UPVC.`;
          const whatsappUrl = createWhatsAppUrl(phone.number, whatsappMsg);

          return (
            <div
              key={phone.id}
              className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                phone.isPrimary 
                  ? 'bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/25 border-2 border-amber-500/60 shadow-xl shadow-amber-500/5' 
                  : 'bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-lg'
              }`}
            >
              {/* Primary badge if any */}
              {phone.isPrimary && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] sm:text-xs px-3.5 py-1 rounded-bl-xl uppercase tracking-wide flex items-center gap-1 shadow">
                  <Sparkles className="w-3 h-3" />
                  <span>{isAr ? 'الخط الرئيسي' : 'Primary Line'}</span>
                </div>
              )}

              {/* Department Header */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 flex-shrink-0">
                  {getDepartmentIcon(idx)}
                </div>
                <div className="space-y-0.5 flex-1 pr-14">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {isAr ? phone.titleAr : phone.titleEn}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    {isAr ? phone.departmentAr : phone.departmentEn}
                  </p>
                </div>
              </div>

              {/* Phone Number Display Box */}
              <div className="my-4 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xl sm:text-2xl font-black text-white tracking-wider font-mono" dir="ltr">
                    {phone.displayNumber}
                  </span>
                </div>

                <button
                  id={`copy-phone-${phone.id}`}
                  onClick={() => handleCopy(phone.id, phone.number)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title={isAr ? 'نسخ الرقم' : 'Copy Number'}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
                </button>
              </div>

              {/* Note / Working info */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-5 gap-2">
                <span className="truncate">{isAr ? phone.noteAr : phone.noteEn}</span>
                {phone.workingHoursAr && (
                  <span className="flex items-center gap-1 text-slate-500 whitespace-nowrap">
                    <Clock className="w-3 h-3 text-amber-400/70" />
                    {isAr ? phone.workingHoursAr : phone.workingHoursEn}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
                {/* Call Button */}
                <a
                  id={`call-btn-${phone.id}`}
                  href={`tel:${phone.number}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isAr ? 'اتصال بالرقم' : 'Call Number'}</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  id={`whatsapp-btn-${phone.id}`}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'مراسلة واتساب' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
