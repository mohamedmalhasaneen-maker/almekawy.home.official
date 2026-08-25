import React from 'react';
import { Phone, MessageCircle, Mail, QrCode } from 'lucide-react';
import { CompanyConfig, AppLanguage } from '../types';

interface FloatingActionBarProps {
  config: CompanyConfig;
  lang: AppLanguage;
  onOpenQr: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  config,
  lang,
  onOpenQr
}) => {
  const isAr = lang === 'ar';
  const primaryPhone = config.phones.find(p => p.isPrimary) || config.phones[0];
  const whatsappPhone = config.phones.find(p => p.isWhatsapp) || config.phones[1] || config.phones[0];
  const whatsappUrl = `https://wa.me/20${whatsappPhone ? whatsappPhone.number.replace(/^0+/, '') : '1141761261'}?text=${encodeURIComponent(
    isAr ? 'السلام عليكم، أرغب في الاستفسار عن شبابيك وأبواب UPVC المكاوي هوم' : 'Hello, I would like to inquire about Al-Mekawy Home UPVC'
  )}`;

  return (
    <div className="fixed bottom-4 inset-x-4 max-w-sm mx-auto z-40 sm:hidden">
      <div className="p-2 rounded-2xl bg-slate-950/95 backdrop-blur-lg border border-slate-700/80 shadow-2xl grid grid-cols-3 gap-2">
        {/* Call */}
        {primaryPhone && (
          <a
            id="floating-call-btn"
            href={`tel:${primaryPhone.number}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs transition-transform active:scale-95 shadow-sm"
          >
            <Phone className="w-4 h-4 mb-0.5" />
            <span>{isAr ? 'اتصال' : 'Call'}</span>
          </a>
        )}

        {/* WhatsApp */}
        <a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white font-bold text-xs transition-transform active:scale-95 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
        </a>

        {/* QR Code */}
        <button
          id="floating-qr-btn"
          onClick={onOpenQr}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-transform active:scale-95"
        >
          <QrCode className="w-4 h-4 mb-0.5 text-amber-400" />
          <span>{isAr ? 'مشاركة QR' : 'QR Share'}</span>
        </button>
      </div>
    </div>
  );
};
