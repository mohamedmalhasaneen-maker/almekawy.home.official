export interface PhoneContact {
  id: string;
  titleAr: string;
  titleEn: string;
  number: string;
  displayNumber: string;
  departmentAr: string;
  departmentEn: string;
  isPrimary?: boolean;
  isWhatsapp?: boolean;
  noteAr?: string;
  noteEn?: string;
  workingHoursAr?: string;
  workingHoursEn?: string;
}

export interface SocialAccount {
  id: string;
  platform: 'whatsapp' | 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'telegram' | 'linkedin' | 'email' | 'location' | 'website';
  titleAr: string;
  titleEn: string;
  username: string;
  url: string;
  badgeAr?: string;
  badgeEn?: string;
  color: string;
  descriptionAr: string;
  descriptionEn: string;
  followerCount?: string;
}

export interface QuickMessagePreset {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  messageAr: string;
  messageEn: string;
}

export interface ProductItem {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  insulationRate: string; // e.g. "95%"
  warranty: string; // e.g. "10 سنوات"
  imageType: 'sliding-window' | 'casement-window' | 'balcony-door' | 'hinged-door' | 'insect-screen' | 'georgia-glass';
}

export interface TestimonialItem {
  id: string;
  clientNameAr: string;
  clientNameEn: string;
  quoteAr: string;
  quoteEn: string;
  locationAr?: string;
  locationEn?: string;
  serviceTypeAr?: string;
  serviceTypeEn?: string;
  rating: number; // 1 to 5
  date: string;
  avatarSeed?: string;
  projectHighlights?: string;
  verified?: boolean;
}

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryKey: 'windows' | 'doors' | 'custom' | 'screens' | 'consultation' | 'maintenance';
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
  featuresAr: string[];
  featuresEn: string[];
  idealForAr: string;
  idealForEn: string;
  badgeAr?: string;
  badgeEn?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  location?: string;
  message: string;
  preferredContactMethod: 'whatsapp' | 'call' | 'email';
}

export interface CompanyConfig {
  companyNameAr: string;
  companyNameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  taglineAr: string;
  taglineEn: string;
  establishedYear: string;
  warrantyYears: string;
  soundInsulationRate: string;
  heatInsulationRate: string;
  mainAddressAr: string;
  mainAddressEn: string;
  googleMapsUrl: string;
  workingHoursAr: string;
  workingHoursEn: string;
  phones: PhoneContact[];
  socials: SocialAccount[];
  emergencyHotline: string;
  officialEmail: string;
}

export type AppLanguage = 'ar' | 'en';
