import React from 'react';
import { ShieldCheck, Check, Sparkles, VolumeX, ArrowRight, MessageCircle } from 'lucide-react';
import { ProductItem, AppLanguage, CompanyConfig } from '../types';
import { UPVC_PRODUCTS_DATA } from '../data/defaultData';
import { createWhatsAppUrl } from '../utils/helpers';

interface ProductsShowcaseProps {
  config: CompanyConfig;
  lang: AppLanguage;
  onSelectForQuote?: (product: ProductItem) => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({ config, lang, onSelectForQuote }) => {
  const isAr = lang === 'ar';
  const primaryPhone = config.phones.find(p => p.isPrimary) || config.phones[0];

  const getProductGraphic = (type: string) => {
    switch (type) {
      case 'sliding-window':
        return (
          <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-4 flex items-center justify-center relative overflow-hidden group-hover:border-amber-500/50 transition-colors">
            {/* Sliding window graphic */}
            <div className="w-44 h-32 border-4 border-amber-400/80 rounded-lg bg-sky-950/40 grid grid-cols-2 gap-1 p-1 shadow-inner relative">
              <div className="border-2 border-slate-300/80 rounded bg-sky-400/10 flex items-center justify-center relative">
                <div className="w-1.5 h-6 bg-slate-200 rounded-full absolute right-1" />
                <div className="text-[10px] text-amber-300 font-bold opacity-75">UPVC FRAME</div>
              </div>
              <div className="border-2 border-slate-300/80 rounded bg-sky-400/20 flex items-center justify-center relative">
                <div className="w-1.5 h-6 bg-slate-200 rounded-full absolute left-1" />
                <div className="text-[10px] text-amber-300 font-bold opacity-75">SLIDING</div>
              </div>
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black">
              جرار SLIDING
            </div>
          </div>
        );
      case 'casement-window':
        return (
          <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-4 flex items-center justify-center relative overflow-hidden group-hover:border-amber-500/50 transition-colors">
            <div className="w-36 h-32 border-4 border-amber-400/80 rounded-lg bg-sky-950/40 p-1.5 shadow-inner flex items-center justify-center relative">
              <div className="w-full h-full border-2 border-slate-200 rounded bg-sky-400/15 flex items-center justify-center relative">
                <div className="w-2 h-7 bg-amber-400 rounded-sm absolute left-1" />
                <div className="text-[10px] text-amber-300 font-bold opacity-75">TILT & TURN</div>
              </div>
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black">
              مفصلي وقلاب
            </div>
          </div>
        );
      case 'balcony-door':
        return (
          <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-4 flex items-center justify-center relative overflow-hidden group-hover:border-amber-500/50 transition-colors">
            <div className="w-28 h-36 border-4 border-amber-400/80 rounded-lg bg-sky-950/40 p-1 shadow-inner flex flex-col gap-1">
              <div className="flex-1 border-2 border-slate-200 rounded bg-sky-400/20 flex items-center justify-center">
                <div className="text-[9px] text-slate-300 font-bold">GLASS</div>
              </div>
              <div className="h-10 border-2 border-slate-300 rounded bg-slate-800/80 flex items-center justify-center">
                <div className="w-2 h-4 bg-amber-400 rounded-sm absolute right-7" />
                <div className="text-[9px] text-amber-300 font-bold">PANEL</div>
              </div>
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-black">
              أبواب عازلة
            </div>
          </div>
        );
      case 'insect-screen':
      default:
        return (
          <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-4 flex items-center justify-center relative overflow-hidden group-hover:border-amber-500/50 transition-colors">
            <div className="w-40 h-32 border-4 border-amber-400/80 rounded-lg bg-slate-950 p-2 shadow-inner flex items-center justify-center relative">
              {/* Pleated zig-zag pattern */}
              <div className="w-full h-full flex justify-around items-center border border-slate-700 rounded bg-slate-900/60 p-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-0.5 h-full bg-slate-500/50 rounded-full" />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-2 py-1 bg-slate-900/90 rounded border border-amber-400/40 text-[10px] text-amber-300 font-bold">
                  سلك بليسيه حريري
                </span>
              </div>
            </div>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-purple-500 text-white text-[10px] font-black">
              سلك بليسيه
            </div>
          </div>
        );
    }
  };

  return (
    <section id="products-catalog-section" className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isAr ? 'كتالوج منتجات وأنظمة المكاوي هوم UPVC' : 'Al-Mekawy UPVC Product Catalog'}
          </h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          {isAr 
            ? 'تصاميم شبابيك وأبواب عازلة بأعلى معايير الجودة ومختلف الألوان الديكورية' 
            : 'Explore our premium insulated window and door solutions built for maximum durability'}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {UPVC_PRODUCTS_DATA.map((product) => {
          const whatsappMsg = isAr
            ? `السلام عليكم، أرغب في الاستفسار عن ${product.titleAr} من المكاوي هوم UPVC ومعرفة تفاصيل الأسعار والمقايسة.`
            : `Hello, I want to inquire about ${product.titleEn} from Al-Mekawy Home UPVC.`;
          const whatsappUrl = createWhatsAppUrl(primaryPhone?.number || '01012345678', whatsappMsg);

          return (
            <div
              key={product.id}
              className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950"
            >
              <div>
                {/* Visual illustration */}
                {getProductGraphic(product.imageType)}

                {/* Title & Category */}
                <div className="mt-4">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    {isAr ? product.categoryAr : product.categoryEn}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {isAr ? product.titleAr : product.titleEn}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300/90 leading-relaxed mt-2 line-clamp-3">
                  {isAr ? product.descriptionAr : product.descriptionEn}
                </p>

                {/* Feature Bullet points */}
                <ul className="mt-3.5 space-y-1.5 text-xs text-slate-300">
                  {(isAr ? product.featuresAr : product.featuresEn).slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Details & Direct WhatsApp CTA */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-amber-400">
                    <VolumeX className="w-3.5 h-3.5" />
                    {product.insulationRate}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {product.warranty}
                  </span>
                </div>

                <a
                  id={`product-inquire-${product.id}`}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white font-bold text-xs transition-all mt-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                  <span>{isAr ? 'طلب مقايسة لهذا المنتج' : 'Inquire for this item'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
