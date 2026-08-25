import React, { useState } from 'react';
import { 
  MessageCircle, 
  Share2, 
  ExternalLink, 
  Copy, 
  Check, 
  Mail, 
  MapPin, 
  Globe, 
  Send,
  Video,
  Sparkles,
  Camera,
  PlaySquare
} from 'lucide-react';
import { SocialAccount, AppLanguage } from '../types';
import { copyToClipboard } from '../utils/helpers';

interface SocialHubProps {
  socials: SocialAccount[];
  lang: AppLanguage;
}

export const SocialHub: React.FC<SocialHubProps> = ({ socials, lang }) => {
  const isAr = lang === 'ar';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = async (id: string, url: string) => {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return <MessageCircle className="w-6 h-6 text-white" />;
      case 'facebook':
        return (
          <span className="font-black text-xl text-white font-sans">f</span>
        );
      case 'instagram':
        return <Camera className="w-6 h-6 text-white" />;
      case 'tiktok':
        return (
          <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.01 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      case 'youtube':
        return <PlaySquare className="w-6 h-6 text-white" />;
      case 'telegram':
        return <Send className="w-6 h-6 text-white" />;
      case 'email':
        return <Mail className="w-6 h-6 text-white" />;
      case 'location':
        return <MapPin className="w-6 h-6 text-white" />;
      default:
        return <Globe className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="social-media-hub" className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Share2 className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isAr ? 'حسابات ومنصات السوشيال ميديا' : 'Official Social Media Hub'}
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {isAr 
              ? 'تابع فيديوهات عزل الصوت الحية، صور المعارض، وتواصل مع المكاوي هوم UPVC' 
              : 'Follow our live installation videos, insulation tests & connect across all platforms'}
          </p>
        </div>
      </div>

      {/* Social Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {socials.map((social) => {
          const isCopied = copiedId === social.id;

          return (
            <div
              key={social.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/50"
            >
              {/* Card top */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${social.color}`}>
                    {getPlatformIcon(social.platform)}
                  </div>

                  {social.badgeAr && (
                    <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700/80">
                      {isAr ? social.badgeAr : social.badgeEn}
                    </span>
                  )}
                </div>

                {/* Title & Username */}
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {isAr ? social.titleAr : social.titleEn}
                </h3>
                
                <p className="text-xs font-mono text-slate-400 mt-0.5" dir="ltr">
                  {social.username}
                </p>

                <p className="text-xs text-slate-300/90 leading-relaxed mt-2.5 line-clamp-2">
                  {isAr ? social.descriptionAr : social.descriptionEn}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <a
                  id={`social-link-${social.id}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-all"
                >
                  <span>{isAr ? 'فتح الحساب' : 'Visit Profile'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  id={`social-copy-${social.id}`}
                  onClick={() => handleCopyLink(social.id, social.url)}
                  className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                    isCopied
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title={isAr ? 'نسخ الرابط' : 'Copy link'}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
