import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, VolumeX, Palette, ShieldCheck, Calculator, User, MapPin } from 'lucide-react';
import { CompanyConfig, QuickMessagePreset, AppLanguage } from '../types';
import { QUICK_MESSAGE_PRESETS } from '../data/defaultData';
import { createWhatsAppUrl } from '../utils/helpers';

interface QuickWhatsAppBuilderProps {
  config: CompanyConfig;
  lang: AppLanguage;
}

export const QuickWhatsAppBuilder: React.FC<QuickWhatsAppBuilderProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';
  const primaryPhone = config.phones.find(p => p.isPrimary) || config.phones[0];
  
  const [selectedPreset, setSelectedPreset] = useState<string>(QUICK_MESSAGE_PRESETS[0].id);
  const [clientName, setClientName] = useState<string>('');
  const [clientArea, setClientArea] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');

  const currentPreset = QUICK_MESSAGE_PRESETS.find(p => p.id === selectedPreset) || QUICK_MESSAGE_PRESETS[0];

  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-4 h-4" />;
      case 'VolumeX':
        return <VolumeX className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Compile final dynamic message
  const buildFinalMessage = () => {
    const baseText = isAr ? currentPreset.messageAr : currentPreset.messageEn;
    let extra = '';

    if (clientName.trim()) {
      extra += `\n👤 ${isAr ? 'اسم العميل' : 'Client Name'}: ${clientName.trim()}`;
    }
    if (clientArea.trim()) {
      extra += `\n📍 ${isAr ? 'المنطقة / المحافظة' : 'Location'}: ${clientArea.trim()}`;
    }
    if (customNotes.trim()) {
      extra += `\n📝 ${isAr ? 'ملاحظات إضافية' : 'Notes'}: ${customNotes.trim()}`;
    }

    return `${baseText}${extra}`;
  };

  const finalMsg = buildFinalMessage();
  const whatsappUrl = createWhatsAppUrl(primaryPhone?.number || '01012345678', finalMsg);

  return (
    <section id="whatsapp-builder-section" className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/20 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Preset selection & form */}
        <div className="w-full lg:w-7/12 space-y-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'محادثة فورية مجهزة' : 'Instant Pre-filled WhatsApp'}</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              {isAr ? 'اختر نوع استفسارك وتواصل فوراً' : 'Select your inquiry & chat instantly'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {isAr 
                ? 'اختر القالب المناسب واضغط إرسال لفتح محادثة مباشرة مع مسؤولي المبيعات والمعاينات' 
                : 'Choose a preset topic to compose and launch your WhatsApp message in 1 click'}
            </p>
          </div>

          {/* Presets buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {QUICK_MESSAGE_PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-bold text-right transition-all border ${
                    isSelected
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
                    {getPresetIcon(preset.icon)}
                  </span>
                  <span>{isAr ? preset.titleAr : preset.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* Optional Name & Area inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? 'الاسم الكريم (اختياري)' : 'Your Name (Optional)'}</span>
              </label>
              <input
                id="wa-client-name"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={isAr ? 'مثال: م. أحمد' : 'e.g. Eng. Ahmed'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? 'المحافظة / العنوان (اختياري)' : 'City / Location (Optional)'}</span>
              </label>
              <input
                id="wa-client-area"
                type="text"
                value={clientArea}
                onChange={(e) => setClientArea(e.target.value)}
                placeholder={isAr ? 'مثال: التجمع الخامس، زايد، المعادي' : 'e.g. New Cairo, Zayed'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {isAr ? 'ملاحظة إضافية أو مقاسات (اختياري)' : 'Additional Notes / Dimensions (Optional)'}
            </label>
            <input
              id="wa-custom-notes"
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder={isAr ? 'مثال: مطلوب شباك عازل للصوت 120×140سم' : 'e.g. Need soundproof window 120x140cm'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Right Side: Live preview and Send Button */}
        <div className="w-full lg:w-5/12 bg-slate-950/90 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {isAr ? 'معاينة نص الرسالة' : 'Live WhatsApp Preview'}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {primaryPhone?.displayNumber}
              </span>
            </div>

            {/* Chat bubble */}
            <div className="mt-3 p-4 rounded-xl rounded-tr-none bg-emerald-950/40 border border-emerald-800/40 text-emerald-100 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
              {finalMsg}
            </div>
          </div>

          {/* Send Button */}
          <a
            id="wa-send-final-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            <span>{isAr ? 'إرسال الرسالة عبر الواتساب الآن' : 'Send via WhatsApp Now'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
