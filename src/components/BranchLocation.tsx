import React from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink, CheckCircle2, Shield } from 'lucide-react';
import { CompanyConfig, AppLanguage } from '../types';

interface BranchLocationProps {
  config: CompanyConfig;
  lang: AppLanguage;
}

export const BranchLocation: React.FC<BranchLocationProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';
  const primaryPhone = config.phones.find(p => p.isPrimary) || config.phones[0];

  const coverageAreas = [
    { nameAr: 'القاهرة والجيزة (معاينة فورية)', nameEn: 'Cairo & Giza' },
    { nameAr: 'التجمع الخامس والرحاب والشروق والعاصمة', nameEn: 'New Cairo & Capital' },
    { nameAr: 'الشيخ زايد وأكتوبر وحدائق الأهرام', nameEn: 'Zayed & October' },
    { nameAr: 'الإسكندرية والساحل الشمالي ومطروح', nameEn: 'Alexandria & North Coast' },
    { nameAr: 'محافظات الدلتا والقناة والصعيد', nameEn: 'Delta & Upper Egypt' },
  ];

  return (
    <section id="location-showroom-section" className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <MapPin className="w-5 h-5" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isAr ? 'المقر الرئيسي والمصنع وتغطية المعاينات' : 'Showroom, Factory & Inspection Coverage'}
          </h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          {isAr 
            ? 'تفضل بزيارة معرضنا لمعاينة عينات العزل والقطاعات، أو اطلب زيارة مهندس المعاينة لموقعك' 
            : 'Visit our showroom to inspect profile samples or book a site visit to your location'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl">
        {/* Left info (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isAr ? 'عنوان المعرض والمصنع' : 'Showroom & Factory Address'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {isAr ? config.mainAddressAr : config.mainAddressEn}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 flex-shrink-0 mt-1">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {isAr ? 'مواعيد العمل واستقبال الزوار' : 'Working Hours'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  {isAr ? config.workingHoursAr : config.workingHoursEn}
                </p>
              </div>
            </div>
          </div>

          {/* Coverage tags */}
          <div className="pt-2 border-t border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'تغطية توريد وتركيب ومعاينة بجميع أنحاء الجمهورية:' : 'Nationwide Service Coverage:'}</span>
            </h4>

            <div className="flex flex-wrap gap-2">
              {coverageAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? area.nameAr : area.nameEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              id="maps-direction-btn"
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4" />
              <span>{isAr ? 'فتح اللوكيشن على خرائط جوجل' : 'Open in Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {primaryPhone && (
              <a
                id="location-call-btn"
                href={`tel:${primaryPhone.number}`}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs sm:text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'تأكيد موعد الزيارة' : 'Confirm Visit'}</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Map Visual Placeholder with Direct Link (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="h-56 sm:h-64 rounded-xl bg-slate-900 border border-slate-800 relative flex items-center justify-center p-4 overflow-hidden">
            {/* Map styling background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Mock map roads graphic */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-700/60 stroke-2 fill-none" viewBox="0 0 300 200">
              <path d="M 0 50 Q 150 70 300 30" />
              <path d="M 50 0 Q 80 100 120 200" />
              <path d="M 0 150 Q 150 140 300 170" />
              <path d="M 220 0 Q 200 100 240 200" />
            </svg>

            {/* Central Pin */}
            <div className="relative z-10 flex flex-col items-center animate-bounce">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 border-2 border-white">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="mt-2 px-3 py-1 rounded-lg bg-slate-950 border border-amber-500/60 text-white text-xs font-black shadow-lg">
                {isAr ? config.companyNameAr : config.companyNameEn}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>{isAr ? 'موقف سيارات متاح ومجهز' : 'Free Parking Available'}</span>
            <span className="text-amber-400 font-bold">{isAr ? 'أهلاً بكم دائماً' : 'Welcome anytime'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
