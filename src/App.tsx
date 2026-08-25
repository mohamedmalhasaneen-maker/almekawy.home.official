import React, { useState, useEffect } from 'react';
import { CompanyConfig, AppLanguage } from './types';
import { DEFAULT_COMPANY_DATA } from './data/defaultData';
import { Header } from './components/Header';
import { ContactChannels } from './components/ContactChannels';
import { QuotationOfferSection } from './components/QuotationOfferSection';
import { SocialHub } from './components/SocialHub';
import { QrModal } from './components/QrModal';
import { EditContactsModal } from './components/EditContactsModal';
import { FloatingActionBar } from './components/FloatingActionBar';

const STORAGE_KEY = 'almekawy_home_upvc_config_v1';

export default function App() {
  const [lang, setLang] = useState<AppLanguage>('ar');
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Initialize company config from LocalStorage or default data
  const [config, setConfig] = useState<CompanyConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // If old sample numbers or old socials or previous company name exist in storage, synchronize with the new authoritative data
        if (
          parsed.phones?.[0]?.number === '01012345678' || 
          !parsed.socials?.some((s: any) => s.url.includes('Ahx9gnHY6')) ||
          parsed.socials?.some((s: any) => s.id === 'soc-whatsapp') ||
          parsed.companyNameEn !== 'Al-mekawy Home Upvc Official'
        ) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPANY_DATA));
          return DEFAULT_COMPANY_DATA;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved config', e);
    }
    return DEFAULT_COMPANY_DATA;
  });

  // Keep document dir in sync with language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSaveConfig = (newConfig: CompanyConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save config to local storage', e);
    }
  };

  const handleToggleLang = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Header */}
      <Header
        config={config}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
        {/* 1. Direct Phone & Contact Lines */}
        <ContactChannels
          phones={config.phones}
          lang={lang}
        />

        {/* 2. Instant Price Quotation App */}
        <QuotationOfferSection
          lang={lang}
        />

        {/* 3. Social Media Accounts Hub */}
        <SocialHub
          socials={config.socials}
          lang={lang}
        />
      </main>

      {/* Mobile Floating Action Bar */}
      <FloatingActionBar
        config={config}
        lang={lang}
        onOpenQr={() => setIsQrOpen(true)}
      />

      {/* QR Code & Share Modal */}
      <QrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        config={config}
        lang={lang}
      />

      {/* Contact Numbers & Accounts Editor Modal */}
      <EditContactsModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        lang={lang}
      />
    </div>
  );
}
