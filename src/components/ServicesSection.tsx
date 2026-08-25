import React, { useState } from 'react';
import { 
  LayoutGrid, 
  DoorClosed, 
  Palette, 
  ShieldCheck, 
  Compass, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { ServiceItem, AppLanguage, CompanyConfig } from '../types';
import { SERVICES_DATA } from '../data/defaultData';

interface ServicesSectionProps {
  config: CompanyConfig;
  lang: AppLanguage;
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  config,
  lang,
  onSelectServiceForContact
}) => {
  const isAr = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', labelAr: 'جميع الخدمات والأنظمة', labelEn: 'All Services & Systems' },
    { key: 'windows', labelAr: 'شبابيك UPVC', labelEn: 'UPVC Windows' },
    { key: 'doors', labelAr: 'أبواب UPVC', labelEn: 'UPVC Doors' },
    { key: 'custom', labelAr: 'حلول وديكورات', labelEn: 'Custom & Deco' },
    { key: 'screens', labelAr: 'سلك بليسيه', labelEn: 'Insect Screens' },
    { key: 'consultation', labelAr: 'المعاينة الهندسية', labelEn: 'Site Survey' },
    { key: 'maintenance', labelAr: 'الصيانة والضمان', labelEn: 'Maintenance & Warranty' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.categoryKey === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6 text-amber-400" />;
      case 'DoorClosed':
        return <DoorClosed className="w-6 h-6 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-400" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-400" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  const handleInquireService = (service: ServiceItem) => {
    const title = isAr ? service.titleAr : service.titleEn;
    if (onSelectServiceForContact) {
      onSelectServiceForContact(title);
    }
    // Scroll to contact form section
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppService = (service: ServiceItem) => {
    const title = isAr ? service.titleAr : service.titleEn;
    const primaryPhone = config.phones.find(p => p.isWhatsapp) || config.phones[0];
    const text = encodeURIComponent(
      isAr
        ? `مرحباً المكاوي هوم، أرغب في الاستفسار والحصول على عرض سعر لخدمة: ${title}`
        : `Hello Al-Mekawy Home, I would like to inquire about: ${title}`
    );
    window.open(`https://wa.me/${primaryPhone.number.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="services-showcase-section" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'أنظمة وحلول المكاوي هوم المتكاملة' : 'Our Professional UPVC Solutions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isAr ? 'خدمات وأنظمة الـ UPVC والحلول المعمارية' : 'UPVC Systems & Architectural Solutions'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            {isAr
              ? 'نقدم حلولاً هندسية متكاملة لقطاعات الـ UPVC المعزولة للصوت والحرارة بأعلى معايير الجودة العالمية، بتنفيذ دقيق يشمل المعاينة بالليزر والتركيب الاحترافي والضمان المعتمد 10 سنوات.'
              : 'End-to-end engineering UPVC solutions for maximum sound and heat insulation, backed by certified 10-year warranty, precision laser surveys, and expert installation.'}
          </p>
        </div>

        {/* Total service counter badge */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-lg flex items-center justify-center">
            {SERVICES_DATA.length}
          </div>
          <div>
            <div className="text-xs text-slate-400">{isAr ? 'قطاعات وخدمات' : 'Core Services'}</div>
            <div className="text-sm font-bold text-white">{isAr ? 'شاملة الضمان والمعاينة' : 'Full Support & Warranty'}</div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div
            key={service.id}
            id={service.id}
            className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800/90 hover:border-amber-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div className="space-y-4">
              {/* Header with Icon & Category Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-amber-500/40 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 justify-end">
                  {service.badgeAr && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-[11px]">
                      {isAr ? service.badgeAr : service.badgeEn}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-medium">
                    {isAr ? service.categoryAr : service.categoryEn}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {isAr ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed">
                  {isAr ? service.descriptionAr : service.descriptionEn}
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {isAr ? 'المميزات والمواصفات الفنية:' : 'Key Features & Specs:'}
                </div>
                <ul className="space-y-1.5">
                  {(isAr ? service.featuresAr : service.featuresEn).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For Note */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-400">
                <span className="text-amber-400 font-bold">{isAr ? 'الاستخدام المثالي: ' : 'Ideal For: '}</span>
                <span>{isAr ? service.idealForAr : service.idealForEn}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-4 border-t border-slate-800/60 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleInquireService(service)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all active:scale-95 shadow-sm"
              >
                <span>{isAr ? 'طلب الخدمة' : 'Request Service'}</span>
                {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => handleWhatsAppService(service)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-emerald-700/80 text-white font-bold text-xs border border-slate-700 transition-all active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
