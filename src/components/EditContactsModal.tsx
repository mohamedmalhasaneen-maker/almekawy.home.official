import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Phone, Share2, MapPin, Mail, Sparkles, Check } from 'lucide-react';
import { CompanyConfig, PhoneContact, SocialAccount, AppLanguage } from '../types';
import { DEFAULT_COMPANY_DATA } from '../data/defaultData';

interface EditContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onSave: (newConfig: CompanyConfig) => void;
  lang: AppLanguage;
}

export const EditContactsModal: React.FC<EditContactsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  lang
}) => {
  const isAr = lang === 'ar';
  const [formData, setFormData] = useState<CompanyConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'phones' | 'socials'>('phones');
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handlePhoneChange = (index: number, field: keyof PhoneContact, value: any) => {
    const updated = [...formData.phones];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, phones: updated });
  };

  const handleSocialChange = (index: number, field: keyof SocialAccount, value: any) => {
    const updated = [...formData.socials];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, socials: updated });
  };

  const handleSave = () => {
    onSave(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm(isAr ? 'هل تريد استعادة البيانات الافتراضية للشركة؟' : 'Reset all data to defaults?')) {
      setFormData(DEFAULT_COMPANY_DATA);
      onSave(DEFAULT_COMPANY_DATA);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-white">
                {isAr ? 'تخصيص وتعديل أرقام وحسابات الشركة' : 'Customize Company Contacts & Socials'}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? 'عدل أرقام الهواتف وروابط السوشيال ميديا وستحفظ مباشرة' : 'Update phone numbers & social URLs (persisted locally)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/40 gap-4">
          <button
            onClick={() => setActiveTab('phones')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'phones'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'أرقام الهواتف والخطوط' : 'Phone Numbers'} ({formData.phones.length})
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'socials'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'حسابات السوشيال ميديا' : 'Social Media Links'} ({formData.socials.length})
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'general'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'بيانات المعرض والعنوان' : 'Showroom & Address'}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Phones Tab */}
          {activeTab === 'phones' && (
            <div className="space-y-4">
              {formData.phones.map((phone, idx) => (
                <div key={phone.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">
                      {isAr ? `خط رقم ${idx + 1}` : `Phone Line #${idx + 1}`} {phone.isPrimary && `(${isAr ? 'الرئيسي' : 'Primary'})`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        {isAr ? 'اسم الخط / القسم (عربي)' : 'Title (Arabic)'}
                      </label>
                      <input
                        type="text"
                        value={phone.titleAr}
                        onChange={(e) => handlePhoneChange(idx, 'titleAr', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        {isAr ? 'رقم الهاتف للاتصال والواتساب' : 'Phone Number'}
                      </label>
                      <input
                        type="text"
                        value={phone.number}
                        onChange={(e) => {
                          handlePhoneChange(idx, 'number', e.target.value);
                          handlePhoneChange(idx, 'displayNumber', e.target.value);
                        }}
                        dir="ltr"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Socials Tab */}
          {activeTab === 'socials' && (
            <div className="space-y-4">
              {formData.socials.map((soc, idx) => (
                <div key={soc.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase">
                      {soc.platform}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        {isAr ? 'اسم الحساب / المعرف' : 'Account Handle / Username'}
                      </label>
                      <input
                        type="text"
                        value={soc.username}
                        onChange={(e) => handleSocialChange(idx, 'username', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        {isAr ? 'رابط الصفحة / الرابط المباشر' : 'Profile URL'}
                      </label>
                      <input
                        type="text"
                        value={soc.url}
                        onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                        dir="ltr"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isAr ? 'اسم الشركة (عربي)' : 'Company Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.companyNameAr}
                  onChange={(e) => setFormData({ ...formData, companyNameAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isAr ? 'عنوان المعرض والمصنع' : 'Showroom & Factory Address'}
                </label>
                <input
                  type="text"
                  value={formData.mainAddressAr}
                  onChange={(e) => setFormData({ ...formData, mainAddressAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isAr ? 'رابط جوجل ماب (Google Maps URL)' : 'Google Maps URL'}
                </label>
                <input
                  type="text"
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isAr ? 'مواعيد العمل' : 'Working Hours'}
                </label>
                <input
                  type="text"
                  value={formData.workingHoursAr}
                  onChange={(e) => setFormData({ ...formData, workingHoursAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/40 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isAr ? 'استعادة الافتراضي' : 'Reset Defaults'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              id="save-edited-contacts-btn"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-black shadow-md transition-all"
            >
              {savedToast ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedToast ? (isAr ? 'تم الحفظ بنجاح!' : 'Saved Successfully!') : (isAr ? 'حفظ التعديلات' : 'Save Changes')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
