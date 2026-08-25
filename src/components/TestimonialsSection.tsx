import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  MapPin, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle, 
  SlidersHorizontal, 
  Grid, 
  Layers,
  Sparkles,
  MessageSquareQuote,
  X,
  Send
} from 'lucide-react';
import { TestimonialItem, AppLanguage, CompanyConfig } from '../types';
import { DEFAULT_TESTIMONIALS } from '../data/defaultData';

const TESTIMONIALS_STORAGE_KEY = 'almekawy_testimonials_v1';

interface TestimonialsSectionProps {
  config: CompanyConfig;
  lang: AppLanguage;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  config,
  lang
}) => {
  const isAr = lang === 'ar';
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load testimonials', e);
    }
    return DEFAULT_TESTIMONIALS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    quote: '',
    location: '',
    serviceType: '',
    rating: 5,
    projectHighlights: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Auto slide in carousel mode
  useEffect(() => {
    if (viewMode !== 'carousel' || !isAutoPlay || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [viewMode, isAutoPlay, testimonials.length]);

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.quote.trim()) return;

    const createdItem: TestimonialItem = {
      id: `test-custom-${Date.now()}`,
      clientNameAr: newReview.name,
      clientNameEn: newReview.name,
      quoteAr: newReview.quote,
      quoteEn: newReview.quote,
      locationAr: newReview.location || (isAr ? 'القاهرة' : 'Cairo'),
      locationEn: newReview.location || 'Cairo',
      serviceTypeAr: newReview.serviceType || (isAr ? 'شبابيك وأبواب UPVC' : 'UPVC Windows & Doors'),
      serviceTypeEn: newReview.serviceType || 'UPVC Windows & Doors',
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      projectHighlights: newReview.projectHighlights || (isAr ? 'تجربة عميل معتمدة' : 'Verified Client Experience'),
      verified: true
    };

    const updated = [createdItem, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save updated testimonials', e);
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsAddModalOpen(false);
      setNewReview({
        name: '',
        quote: '',
        location: '',
        serviceType: '',
        rating: 5,
        projectHighlights: ''
      });
      setCurrentIndex(0);
    }, 1500);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 text-amber-400">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
          />
        ))}
      </div>
    );
  };

  const activeTestimonial = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials-section" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{isAr ? 'آراء وتجارب عملاء المكاوي هوم' : 'Customer Testimonials & Real Reviews'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isAr ? 'ماذا يقول عملاؤنا عن عزل الصوت وجودة التركيب؟' : 'What Our Clients Say About Our Insulation Quality'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            {isAr
              ? 'تجارب حقيقية لعملاء الفلل والشقق والمشاريع بعد تركيب قطاعات الـ UPVC والزجاج العازل من المكاوي هوم.'
              : 'Real feedback from homeowners, architects, and villa owners who experienced our soundproofing and thermal insulation.'}
          </p>
        </div>

        {/* View Mode Controls & Add Review Button */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('carousel')}
              title={isAr ? 'عرض متتابع' : 'Carousel View'}
              className={`p-2 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'carousel'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title={isAr ? 'عرض شبكي' : 'Grid View'}
              className={`p-2 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-300 hover:text-amber-200 text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'أضف رأيك وتجربتك' : 'Write a Review'}</span>
          </button>
        </div>
      </div>

      {/* View Mode: Carousel */}
      {viewMode === 'carousel' && activeTestimonial && (
        <div className="relative">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/90 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Background Glow & Quote Icon */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <Quote className="absolute -bottom-6 -left-6 w-36 h-36 text-slate-800/20 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Rating & Service Type & Verified Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {renderStars(activeTestimonial.rating)}
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {activeTestimonial.rating}.0 / 5.0
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {activeTestimonial.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'عميل موثق' : 'Verified Client'}</span>
                    </span>
                  )}
                  {activeTestimonial.projectHighlights && (
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/50">
                      {activeTestimonial.projectHighlights}
                    </span>
                  )}
                </div>
              </div>

              {/* Testimonial Quote */}
              <p className="text-base sm:text-xl lg:text-2xl font-medium text-slate-100 leading-relaxed italic">
                "{isAr ? activeTestimonial.quoteAr : activeTestimonial.quoteEn}"
              </p>

              {/* Client Info & Location / Service Details */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-base flex items-center justify-center shadow-inner">
                    {(isAr ? activeTestimonial.clientNameAr : activeTestimonial.clientNameEn).charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {isAr ? activeTestimonial.clientNameAr : activeTestimonial.clientNameEn}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-0.5">
                      {(activeTestimonial.locationAr || activeTestimonial.locationEn) && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{isAr ? activeTestimonial.locationAr : activeTestimonial.locationEn}</span>
                        </span>
                      )}
                      {(activeTestimonial.serviceTypeAr || activeTestimonial.serviceTypeEn) && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="text-amber-400/90 font-medium">
                            {isAr ? activeTestimonial.serviceTypeAr : activeTestimonial.serviceTypeEn}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Carousel Navigation Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Testimonial"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                  >
                    {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                  </button>

                  <div className="px-3 py-1 text-xs font-mono font-bold text-slate-400 bg-slate-950/80 rounded-lg border border-slate-800">
                    {currentIndex + 1} / {testimonials.length}
                  </div>

                  <button
                    onClick={handleNext}
                    aria-label="Next Testimonial"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors"
                  >
                    {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-amber-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* View Mode: Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800/90 p-6 space-y-4 shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  {renderStars(item.rating)}
                  {item.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{isAr ? 'موثق' : 'Verified'}</span>
                    </span>
                  )}
                </div>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic">
                  "{isAr ? item.quoteAr : item.quoteEn}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1">
                <div className="font-bold text-white text-sm">
                  {isAr ? item.clientNameAr : item.clientNameEn}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  {(item.locationAr || item.locationEn) && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{isAr ? item.locationAr : item.locationEn}</span>
                    </span>
                  )}
                  {(item.serviceTypeAr || item.serviceTypeEn) && (
                    <>
                      <span>•</span>
                      <span className="text-amber-300/90">
                        {isAr ? item.serviceTypeAr : item.serviceTypeEn}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  {isAr ? 'مشاركة تجربتك مع المكاوي هوم' : 'Share Your Review'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  {isAr ? 'شكراً لتقييمك الراقي!' : 'Thank you for your review!'}
                </h4>
                <p className="text-sm text-slate-400">
                  {isAr ? 'تمت إضافة رأيك بنجاح ويسعدنا دائماً خدمتكم.' : 'Your review has been added successfully.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReviewSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {isAr ? 'الاسم بالكامل / اللقب *' : 'Full Name / Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder={isAr ? 'مثال: م. أحمد الشناوي' : 'e.g. Eng. Ahmed'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Rating selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {isAr ? 'التقييم العام *' : 'Overall Rating *'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-amber-400 font-bold ml-2">
                      {newReview.rating} / 5
                    </span>
                  </div>
                </div>

                {/* Location & Service Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {isAr ? 'المنطقة / المحافظة (اختياري)' : 'Location (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={newReview.location}
                      onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                      placeholder={isAr ? 'مثال: التجمع الخامس، زايد' : 'e.g. New Cairo'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {isAr ? 'نوع الخدمة المنفذة (اختياري)' : 'Service Received (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={newReview.serviceType}
                      onChange={e => setNewReview({ ...newReview, serviceType: e.target.value })}
                      placeholder={isAr ? 'مثال: شبابيك عازلة، سلك بليسيه' : 'e.g. UPVC Windows'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {isAr ? 'رأيك وتجربتك في العزل والتعامل *' : 'Your Review & Experience *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.quote}
                    onChange={e => setNewReview({ ...newReview, quote: e.target.value })}
                    placeholder={
                      isAr
                        ? 'اكتب تجربتك مع قطاعات UPVC وعزل الصوت والحرارة والتزام الفريق بالمواعيد...'
                        : 'Share your experience regarding soundproofing, quality, and punctuality...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نشر التقييم' : 'Submit Review'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
