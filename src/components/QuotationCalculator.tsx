import React, { useState } from 'react';
import { Calculator, Send, CheckCircle2, Sparkles, Shield, VolumeX, Eye, ArrowRight } from 'lucide-react';
import { CompanyConfig, AppLanguage } from '../types';
import { createWhatsAppUrl } from '../utils/helpers';

interface QuotationCalculatorProps {
  config: CompanyConfig;
  lang: AppLanguage;
}

export const QuotationCalculator: React.FC<QuotationCalculatorProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';
  const primaryPhone = config.phones.find(p => p.isPrimary) || config.phones[0];

  const [itemType, setItemType] = useState<'sliding' | 'casement' | 'door' | 'tilt'>('sliding');
  const [width, setWidth] = useState<number>(120);
  const [height, setHeight] = useState<number>(120);
  const [quantity, setQuantity] = useState<number>(1);
  const [profileColor, setProfileColor] = useState<string>('white');
  const [glassType, setGlassType] = useState<string>('double');
  const [hasScreen, setHasScreen] = useState<boolean>(true);
  const [clientLocation, setClientLocation] = useState<string>('');

  const colors = [
    { id: 'white', labelAr: 'أبيض ناصع (ألماني)', labelEn: 'Pure White (German)', hex: '#ffffff', border: '#e2e8f0' },
    { id: 'oak', labelAr: 'خشمونيوم بيج (سنديان)', labelEn: 'Golden Oak Woodgrain', hex: '#b48a58', border: '#926938' },
    { id: 'mahogany', labelAr: 'خشمونيوم بني (ماهوجني)', labelEn: 'Dark Mahogany Woodgrain', hex: '#522c1b', border: '#381c10' },
    { id: 'anthracite', labelAr: 'رمادي مودرن (أنثراسيت)', labelEn: 'Anthracite Dark Gray', hex: '#334155', border: '#1e293b' }
  ];

  const glassOptions = [
    { id: 'double', labelAr: 'زجاج دبل عازل للصوت 20مم (الأكثر طلباً)', labelEn: '20mm Double Glazed Acoustic (Best Seller)', badge: 'عزل 95%' },
    { id: 'reflective', labelAr: 'زجاج دبل عاكس فاميه (حماية الخصوصية)', labelEn: 'Reflective Privacy Double Glazing', badge: 'خصوصية' },
    { id: 'securit', labelAr: 'زجاج سيكوريت مصفح عالي الأمان', labelEn: 'Toughened Safety Securit Glass', badge: 'أمان فائق' },
    { id: 'georgia', labelAr: 'زجاج دبل مع جورجيا ديكورية داخلية', labelEn: 'Double Glazed with Internal Georgia Bars', badge: 'ديكور فاخر' }
  ];

  const getItemTypeName = () => {
    switch (itemType) {
      case 'sliding': return isAr ? 'شباك UPVC جرار عازل' : 'Sliding UPVC Window';
      case 'casement': return isAr ? 'شباك UPVC مفصلي إحكام تام' : 'Casement UPVC Window';
      case 'door': return isAr ? 'باب بلكونة / مدخل UPVC' : 'Balcony/Entrance UPVC Door';
      case 'tilt': return isAr ? 'شباك UPVC قلاب ومفصلي' : 'Tilt & Turn UPVC Window';
    }
  };

  const getColorName = () => {
    const c = colors.find(col => col.id === profileColor);
    return isAr ? c?.labelAr : c?.labelEn;
  };

  const getGlassName = () => {
    const g = glassOptions.find(gl => gl.id === glassType);
    return isAr ? g?.labelAr : g?.labelEn;
  };

  // Build inquiry text
  const generateInquiryMessage = () => {
    const lines = [
      isAr ? '📋 طلب مقايسة وعرض سعر من حاسبة المكاوي هوم UPVC:' : '📋 Measurement & Quotation Request:',
      `• ${isAr ? 'نوع المنتج' : 'Item'}: ${getItemTypeName()}`,
      `• ${isAr ? 'الأبعاد' : 'Dimensions'}: ${width} سم عرض × ${height} سم ارتفاع`,
      `• ${isAr ? 'العدد' : 'Quantity'}: ${quantity} ${isAr ? 'قطع' : 'units'}`,
      `• ${isAr ? 'لون القطاع' : 'Profile Color'}: ${getColorName()}`,
      `• ${isAr ? 'نوع الزجاج' : 'Glass Type'}: ${getGlassName()}`,
      `• ${isAr ? 'سلك بليسيه مانع للحشرات' : 'Pleated Screen'}: ${hasScreen ? (isAr ? 'نعم مطلوب' : 'Yes') : (isAr ? 'غير مطلوب' : 'No')}`,
    ];

    if (clientLocation.trim()) {
      lines.push(`• ${isAr ? 'الموقع / المحافظة' : 'Location'}: ${clientLocation.trim()}`);
    }

    lines.push(isAr ? '\nيرجى موافاتي بالتكلفة التقديرية وموعد إرسال الفني للمعاينة ورفع المقاسات.' : '\nPlease provide estimated price and arrange site measurement.');
    return lines.join('\n');
  };

  const message = generateInquiryMessage();
  const whatsappUrl = createWhatsAppUrl(primaryPhone?.number || '01012345678', message);

  // Area calculation
  const areaSqm = ((width * height) / 10000) * quantity;

  return (
    <section id="quote-calculator-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Calculator className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isAr ? 'حاسبة المقايسات وطلب عروض الأسعار' : 'Instant Measurement & Quotation Request'}
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {isAr 
              ? 'حدد المقاسات واللون ونوع الزجاج واحصل على معاينة وطلب عرض سعر مباشر' 
              : 'Choose dimensions, color & glass type to generate your instant quote request'}
          </p>
        </div>
      </div>

      {/* Main interactive builder card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl">
        {/* Left Form Controls (8 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Item Type Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {isAr ? '1. اختر نوع الشباك أو الباب' : '1. Select Product Type'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'sliding', labelAr: 'شباك جرار', labelEn: 'Sliding' },
                { id: 'casement', labelAr: 'شباك مفصلي', labelEn: 'Casement' },
                { id: 'door', labelAr: 'باب بلكونة', labelEn: 'Door' },
                { id: 'tilt', labelAr: 'قلاب ودوران', labelEn: 'Tilt & Turn' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setItemType(item.id as any)}
                  className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                    itemType === item.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dimensions & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                {isAr ? 'العرض (سم)' : 'Width (cm)'}
              </label>
              <input
                type="number"
                min="40"
                max="400"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-bold focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                {isAr ? 'الارتفاع (سم)' : 'Height (cm)'}
              </label>
              <input
                type="number"
                min="40"
                max="300"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-bold focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                {isAr ? 'الكمية / العدد' : 'Quantity'}
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-bold focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 3. Color Finishes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {isAr ? '2. لون قطاع الـ UPVC' : '2. Profile Color & Grain'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {colors.map(col => (
                <button
                  key={col.id}
                  onClick={() => setProfileColor(col.id)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                    profileColor === col.id
                      ? 'border-amber-400 bg-amber-500/10 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border shadow-sm"
                    style={{ backgroundColor: col.hex, borderColor: col.border }}
                  />
                  <span className="text-[11px] font-bold leading-tight">
                    {isAr ? col.labelAr : col.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Glass Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {isAr ? '3. نوع الزجاج المطلوب' : '3. Glass Specification'}
            </label>
            <div className="space-y-2">
              {glassOptions.map(gl => (
                <button
                  key={gl.id}
                  onClick={() => setGlassType(gl.id)}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-right transition-all ${
                    glassType === gl.id
                      ? 'border-amber-400 bg-amber-500/10 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full border ${glassType === gl.id ? 'bg-amber-400 border-amber-400' : 'border-slate-600'}`} />
                    <span className="text-xs sm:text-sm font-semibold">{isAr ? gl.labelAr : gl.labelEn}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                    {gl.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Extras Checkbox */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <input
                id="pleated-screen-check"
                type="checkbox"
                checked={hasScreen}
                onChange={(e) => setHasScreen(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700"
              />
              <label htmlFor="pleated-screen-check" className="text-xs sm:text-sm font-bold text-white cursor-pointer">
                {isAr ? 'إضافة سلك بليسيه مودرن مانع للحشرات' : 'Add Modern Pleated Insect Screen'}
              </label>
            </div>
            <span className="text-xs text-amber-400 font-semibold">{isAr ? 'مقاوم للقطع' : 'Tear Proof'}</span>
          </div>

          {/* Client Location */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">
              {isAr ? 'المنطقة أو المحافظة للمعاينة' : 'Location / Governorate for Site Measurement'}
            </label>
            <input
              type="text"
              value={clientLocation}
              onChange={(e) => setClientLocation(e.target.value)}
              placeholder={isAr ? 'مثال: الشيخ زايد، التجمع، الإسكندرية، المنصورة' : 'e.g. Cairo, Alexandria'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Summary & WhatsApp Dispatcher (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-slate-950 border border-slate-800 p-5 sm:p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                {isAr ? 'ملخص المقايسة والمواصفات' : 'Specification Summary'}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {areaSqm.toFixed(2)} م² تقريباً
              </span>
            </div>

            {/* Visual Spec Card */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'النوع:' : 'Type:'}</span>
                <span className="font-bold text-white">{getItemTypeName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'الأبعاد:' : 'Size:'}</span>
                <span className="font-bold text-white" dir="ltr">{width} cm × {height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'العدد:' : 'Qty:'}</span>
                <span className="font-bold text-white">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'اللون:' : 'Color:'}</span>
                <span className="font-bold text-amber-300">{getColorName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'الزجاج:' : 'Glass:'}</span>
                <span className="font-bold text-white text-right max-w-[180px]">{getGlassName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isAr ? 'سلك بليسيه:' : 'Screen:'}</span>
                <span className="font-bold text-emerald-400">{hasScreen ? (isAr ? 'نعم' : 'Yes') : (isAr ? 'لا' : 'No')}</span>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center gap-1.5">
                <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? 'عزل صوتي 95%' : '95% Soundproof'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? 'ضمان 10 سنوات' : '10-Yr Warranty'}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5 pt-2">
            <a
              id="calc-send-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'طلب المقايسة عبر الواتساب' : 'Send Quote via WhatsApp'}</span>
            </a>

            <a
              id="calc-call-sales"
              href={`tel:${primaryPhone?.number}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
            >
              <span>{isAr ? 'أو الاتصال المباشر بالمبيعات' : 'Or Call Sales Directly'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
