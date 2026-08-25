import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Clock, 
  Building2, 
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { CompanyConfig, AppLanguage, ContactFormData } from '../types';

interface ContactFormSectionProps {
  config: CompanyConfig;
  lang: AppLanguage;
  prefilledService?: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  config,
  lang,
  prefilledService = ''
}) => {
  const isAr = lang === 'ar';

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: prefilledService || (isAr ? 'شبابيك UPVC عازلة للصوت والحرارة' : 'Insulated UPVC Windows'),
    location: '',
    message: '',
    preferredContactMethod: 'whatsapp'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, serviceInterest: prefilledService }));
    }
  }, [prefilledService]);

  const serviceOptions = isAr
    ? [
        'شبابيك UPVC عازلة للصوت والحرارة (جرار ومفصلي)',
        'أبواب بلكونات ومداخل UPVC مودرن',
        'أبواب حمامات ومطابخ مقاومة للمياه 100%',
        'سلك بليسيه مودرن مانع للحشرات',
        'ألوان خشمونيوم سنديان وماهوجني وديكورات جورجيا',
        'طلب معاينة هندسية مجانية ورفع مقاسات بالليزر',
        'عقود مشاريع وفلل وكمبوندات وتوريد',
        'خدمات صيانة وضمان واستفسارات عامة'
      ]
    : [
        'Insulated UPVC Windows (Sliding & Casement)',
        'Modern UPVC Balcony & Entrance Doors',
        '100% Waterproof Bathroom & Kitchen Doors',
        'Modern Pleated Insect Screens',
        'Woodgrain Profiles & Georgia Bar Deco',
        'Free Laser Site Survey & Engineering Inspection',
        'Corporate, Villas & Contracting Tenders',
        'Warranty, Maintenance & General Inquiries'
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refId = `ALM-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(refId);

    // Prepare email payload
    const emailSubject = encodeURIComponent(
      `[طلب مقايسة جديد - ${refId}] - ${formData.fullName} - ${formData.serviceInterest}`
    );

    const emailBody = encodeURIComponent(
      `طلب تواصل ومقايسة من الموقع الرسمي لشركة المكاوي هوم UPVC:
--------------------------------------------------
رقم الطلب المرجعي: ${refId}
الاسم بالكامل: ${formData.fullName}
رقم الهاتف / الواتساب: ${formData.phone}
البريد الإلكتروني: ${formData.email}
المنطقة / المحافظة: ${formData.location || 'غير محدد'}
نوع الخدمة المطلوبة: ${formData.serviceInterest}
طريقة التواصل المفضلة: ${formData.preferredContactMethod}

تفاصيل الرسالة والمقايسة:
${formData.message}
--------------------------------------------------
تاريخ الإرسال: ${new Date().toLocaleString('ar-EG')}
تم الإرسال عبر الموقع الإلكتروني لشركة Al-Mekawy Home UPVC`
    );

    // Trigger designated official company email address
    const targetEmail = config.officialEmail || 'info@almekawy-upvc.com';
    const mailtoUrl = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Attempt to launch user's default email client
      try {
        window.location.href = mailtoUrl;
      } catch (err) {
        console.warn('Mailto trigger deferred', err);
      }
    }, 600);
  };

  const handleSendViaWhatsApp = () => {
    const primaryPhone = config.phones.find(p => p.isWhatsapp) || config.phones[0];
    const text = encodeURIComponent(
      isAr
        ? `السلام عليكم المكاوي هوم UPVC، أرسلت نموذج المقايسة المرجعي رقم [${submissionId || 'NEW'}] وتفاصيل طلبي:\n` +
          `• الاسم: ${formData.fullName}\n` +
          `• الهاتف: ${formData.phone}\n` +
          `• الإيميل: ${formData.email}\n` +
          `• المنطقة: ${formData.location || 'مصر'}\n` +
          `• الخدمة: ${formData.serviceInterest}\n` +
          `• الرسالة: ${formData.message}`
        : `Hello Al-Mekawy Home UPVC, here is my inquiry details (Ref: ${submissionId || 'NEW'}):\n` +
          `• Name: ${formData.fullName}\n` +
          `• Phone: ${formData.phone}\n` +
          `• Email: ${formData.email}\n` +
          `• Location: ${formData.location}\n` +
          `• Service: ${formData.serviceInterest}\n` +
          `• Message: ${formData.message}`
    );
    window.open(`https://wa.me/${primaryPhone.number.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.officialEmail || 'info@almekawy-upvc.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceInterest: serviceOptions[0],
      location: '',
      message: '',
      preferredContactMethod: 'whatsapp'
    });
  };

  return (
    <section id="contact-form-section" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Mail className="w-3.5 h-3.5" />
            <span>{isAr ? 'نموذج المراسلة وطلب المقايسة الرسمي' : 'Official Contact & Inquiries Form'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isAr ? 'تواصل مباشرة مع الإدارة وفريق المقايسات' : 'Send an Official Message & Inquire Directly'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            {isAr
              ? `أرسل تفاصيل مشروعك أو استفسارك مباشرة إلى البريد الإلكتروني الرسمي لشركة المكاوي هوم (${config.officialEmail})، وسيتم الرد عليك خلال أقل من ساعتين.`
              : `Submit your project requirements or general inquiry directly to Al-Mekawy Home official mailbox (${config.officialEmail}). Our engineering team will respond promptly.`}
          </p>
        </div>

        {/* Official Email Badge with Copy Button */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400">{isAr ? 'البريد الرسمي المعتمد' : 'Designated Email'}</div>
            <div className="text-xs font-mono font-bold text-white">{config.officialEmail}</div>
          </div>
          <button
            onClick={handleCopyEmail}
            title={isAr ? 'نسخ الإيميل' : 'Copy Email'}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ml-1"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Grid: Form + Company Fast Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side (7 cols): Contact Form */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="py-10 space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isAr ? 'تم تجهيز وإرسال رسالتكم بنجاح!' : 'Your Message Has Been Processed!'}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? `تم توجيه طلبكم إلى البريد الرسمي لشركة المكاوي هوم (${config.officialEmail}). رقم المرجع الخاص بك: `
                    : `Your inquiry was routed to Al-Mekawy official email (${config.officialEmail}). Reference ID: `}
                  <span className="font-mono font-bold text-amber-400">{submissionId}</span>
                </p>
              </div>

              {/* Action buttons post-submission */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'متابعة فورية عبر الواتساب' : 'Instant WhatsApp Follow-up'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors"
                >
                  {isAr ? 'إرسال طلب آخر' : 'Submit Another Inquiry'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? 'الاسم بالكامل *' : 'Full Name *'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={isAr ? 'مثال: م. محمد عبد الله' : 'e.g. Mohamed Abdallah'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Email & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    dir="ltr"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? 'المدينة / المنطقة' : 'City / Area'}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder={isAr ? 'مثال: القاهرة الجديدة، التجمع، زايد' : 'e.g. New Cairo, Zayed'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Service Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'الخدمة أو المنتج المطلوب *' : 'Requested Service / Product *'}</span>
                </label>
                <select
                  value={formData.serviceInterest}
                  onChange={e => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors"
                >
                  {serviceOptions.map((opt, idx) => (
                    <option key={idx} value={opt} className="bg-slate-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Preferred Contact Method */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {isAr ? 'طريقة التواصل المفضلة لديك:' : 'Preferred Contact Channel:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'whatsapp', labelAr: 'واتساب', labelEn: 'WhatsApp' },
                    { id: 'call', labelAr: 'اتصال هاتفي', labelEn: 'Phone Call' },
                    { id: 'email', labelAr: 'إيميل رسمي', labelEn: 'Email' }
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          preferredContactMethod: method.id as 'whatsapp' | 'call' | 'email'
                        })
                      }
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        formData.preferredContactMethod === method.id
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {isAr ? method.labelAr : method.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Message Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'تفاصيل الطلب أو المقايسة أو الاستفسار *' : 'Message / Project Details *'}</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isAr
                      ? 'اكتب عدد الشبابيك التقريبي، أبعاد الفتحات، اللون المفضل (أبيض / خشمونيوم)، وأي متطلبات لعزل الصوت...'
                      : 'Please specify approximate window count, dimensions, preferred colors, and noise insulation requirements...'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{isAr ? 'جاري الإرسال وتوجيه البريد...' : 'Sending message...'}</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {isAr
                        ? `إرسال الطلب إلى بريد الشركة (${config.officialEmail})`
                        : `Send Inquiries to (${config.officialEmail})`}
                    </span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Side (5 cols): Fast Facts & Direct Support Channels */}
        <div className="lg:col-span-5 space-y-5">
          {/* Official Guarantee Box */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                10Y
              </div>
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {isAr ? 'ضمان رسمي 10 سنوات معتمد' : '10-Year Certified Warranty'}
                </h4>
                <p className="text-xs text-amber-300/80">
                  {isAr ? 'ضد عيوب الصناعة وتغير اللون وتآكل الكاوتش' : 'Against discoloration & manufacturing defects'}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'جميع استفسارات وطلبات المقايسات يتم استلامها ومتابعتها مباشرة بواسطة مهندسي المكتب الفني وإدارة العمليات في المكاوي هوم.'
                : 'All measurement requests and engineering inquiries are handled directly by Al-Mekawy technical office and operations management.'}
            </p>
          </div>

          {/* Quick Contacts List */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
            <h4 className="font-bold text-white text-sm">
              {isAr ? 'قنوات الاتصال المباشرة للمعاينة' : 'Direct Support Lines'}
            </h4>

            <div className="space-y-3">
              {config.phones.slice(0, 3).map(phone => (
                <a
                  key={phone.id}
                  href={`tel:${phone.number}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {isAr ? phone.titleAr : phone.titleEn}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {isAr ? phone.departmentAr : phone.departmentEn}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-amber-400" dir="ltr">
                    {phone.displayNumber}
                  </span>
                </a>
              ))}
            </div>

            {/* Working Hours Banner */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center gap-2.5 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? config.workingHoursAr : config.workingHoursEn}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
