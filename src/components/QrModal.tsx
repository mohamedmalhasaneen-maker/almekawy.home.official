import React, { useState, useRef } from 'react';
import { X, QrCode, Copy, Check, Download, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { CompanyConfig, AppLanguage } from '../types';
import { copyToClipboard } from '../utils/helpers';
import logoImage from '../assets/images/almekawy_home_logo_1787688217328.jpg';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  lang: AppLanguage;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, config, lang }) => {
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const qrCanvasRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const OFFICIAL_SITE_URL = 'https://almekawy-home-official.vercel.app/';
  const currentUrl = OFFICIAL_SITE_URL;

  const handleCopy = async () => {
    const ok = await copyToClipboard(currentUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.companyNameEn} | ${config.companyNameAr}`,
          text: isAr 
            ? `تواصل مع شركة ${config.companyNameAr} - شبابيك وأبواب UPVC معتمدة`
            : `Contact ${config.companyNameEn} - UPVC Windows & Doors`,
          url: currentUrl
        });
      } catch (e) {
        console.log('Share canceled');
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadQrImage = async () => {
    setIsDownloading(true);
    try {
      // Find the rendered QR code canvas from the DOM
      const sourceQrCanvas = qrCanvasRef.current?.querySelector('canvas');
      if (!sourceQrCanvas) {
        throw new Error('QR Canvas not found');
      }

      // Create an offscreen high-resolution Canvas (800 x 1060 px)
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = 800;
      exportCanvas.height = 1060;
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) throw new Error('Could not create 2D context');

      // 1. Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, 1060);
      bgGradient.addColorStop(0, '#090d16');
      bgGradient.addColorStop(0.5, '#0f172a');
      bgGradient.addColorStop(1, '#050811');
      ctx.fillStyle = bgGradient;

      // Rounded rectangle for card
      const r = 32;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(800 - r, 0);
      ctx.quadraticCurveTo(800, 0, 800, r);
      ctx.lineTo(800, 1060 - r);
      ctx.quadraticCurveTo(800, 1060, 800 - r, 1060);
      ctx.lineTo(r, 1060);
      ctx.quadraticCurveTo(0, 1060, 0, 1060 - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.fill();

      // Card outer gold border
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // Helper function to load image
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Image failed to load'));
          img.src = src;
        });
      };

      // 2. Draw Top Logo & Branding
      try {
        const logoImg = await loadImage(logoImage);
        // Logo container
        const logoX = 220;
        const logoY = 60;
        const logoSize = 100;
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        ctx.restore();

        // Border around logo
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fbbf24';
        ctx.stroke();

        // Brand Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Al-mekawy Home', 345, 105);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('UPVC OFFICIAL', 345, 140);
      } catch {
        // Fallback text if image load fails
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 38px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Al-mekawy Home UPVC', 400, 110);
      }

      // 3. White Container Box for QR
      const qrBoxX = 70;
      const qrBoxY = 190;
      const qrBoxW = 660;
      const qrBoxH = 680;
      const qrBoxR = 24;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(qrBoxX + qrBoxR, qrBoxY);
      ctx.lineTo(qrBoxX + qrBoxW - qrBoxR, qrBoxY);
      ctx.quadraticCurveTo(qrBoxX + qrBoxW, qrBoxY, qrBoxX + qrBoxW, qrBoxY + qrBoxR);
      ctx.lineTo(qrBoxX + qrBoxW, qrBoxY + qrBoxH - qrBoxR);
      ctx.quadraticCurveTo(qrBoxX + qrBoxW, qrBoxY + qrBoxH, qrBoxX + qrBoxW - qrBoxR, qrBoxY + qrBoxH);
      ctx.lineTo(qrBoxX + qrBoxR, qrBoxY + qrBoxH);
      ctx.quadraticCurveTo(qrBoxX, qrBoxY + qrBoxH, qrBoxX, qrBoxY + qrBoxH - qrBoxR);
      ctx.lineTo(qrBoxX, qrBoxY + qrBoxR);
      ctx.quadraticCurveTo(qrBoxX, qrBoxY, qrBoxX + qrBoxR, qrBoxY);
      ctx.closePath();
      ctx.fill();

      // Gold border on QR box
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fde68a';
      ctx.stroke();

      // 4. Draw the QR code inside the box
      const qrDrawSize = 520;
      const qrDrawX = 400 - qrDrawSize / 2;
      const qrDrawY = 240;
      ctx.drawImage(sourceQrCanvas, qrDrawX, qrDrawY, qrDrawSize, qrDrawSize);

      // QR Box bottom caption
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(qrBoxX + 40, 800);
      ctx.lineTo(qrBoxX + qrBoxW - 40, 800);
      ctx.stroke();

      ctx.fillStyle = '#334155';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('امسح بكاميرا الهاتف • SCAN ME', 400, 840);

      // 5. Card Footer
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(config.companyNameAr, 400, 930);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('almekawy-home-official.vercel.app', 400, 975);

      // 6. Trigger Download
      const dataUrl = exportCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'Al-Mekawy-Home-QR-Official.png';
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Error generating QR image', err);
      // Simple fallback
      const sourceQrCanvas = qrCanvasRef.current?.querySelector('canvas');
      if (sourceQrCanvas) {
        const link = document.createElement('a');
        link.download = 'Al-Mekawy-Home-QR.png';
        link.href = sourceQrCanvas.toDataURL('image/png');
        link.click();
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 sm:top-5 sm:left-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
          title={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header indicator */}
        <div className="text-center space-y-1 pt-1 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <QrCode className="w-3.5 h-3.5" />
            <span>{isAr ? 'بطاقة رمز QR الرسمية' : 'Official QR Code Card'}</span>
          </div>
          <p className="text-xs text-slate-400">
            {isAr ? 'امسح الرمز أو حمّل بطاقة الـ QR كصورة عالية الجودة' : 'Scan code or download card as high-resolution image'}
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BRANDED CARD PREVIEW                                          */}
        {/* ------------------------------------------------------------- */}
        <div 
          className="mx-auto w-full max-w-[320px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-5 border-2 border-amber-500/40 shadow-2xl relative flex flex-col items-center text-center overflow-hidden"
        >
          {/* Card Top Branding */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-400/50 shadow-md flex-shrink-0 bg-slate-950">
              <img
                src={logoImage}
                alt="Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-sm font-black text-white leading-tight">
                  Al-mekawy Home
                </span>
                <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />
              </div>
              <div className="text-[11px] font-bold text-amber-400 font-serif tracking-wide">
                UPVC OFFICIAL
              </div>
            </div>
          </div>

          {/* Crisp White QR Box */}
          <div className="w-full bg-white rounded-xl p-4 shadow-lg border border-amber-400/30 flex flex-col items-center justify-center">
            <div ref={qrCanvasRef} className="flex items-center justify-center">
              <QRCodeCanvas
                value={currentUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#0a0f1d"
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: logoImage,
                  x: undefined,
                  y: undefined,
                  height: 42,
                  width: 42,
                  excavate: true,
                }}
              />
            </div>
            
            <div className="mt-2.5 pt-2 border-t border-slate-200 w-full flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>امسح بكاميرا الهاتف</span>
              </span>
              <span className="text-slate-500 font-mono text-[9px]">SCAN ME</span>
            </div>
          </div>

          {/* Card Footer URL & Verification */}
          <div className="mt-3 w-full">
            <div className="text-[11px] font-medium text-slate-300">
              {config.companyNameAr}
            </div>
            <div className="text-[10px] font-mono text-amber-400/90 truncate mt-0.5" dir="ltr">
              almekawy-home-official.vercel.app
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODAL CONTROLS (NOT INCLUDED IN DOWNLOADED IMAGE)              */}
        {/* ------------------------------------------------------------- */}

        {/* URL Box & Copy */}
        <div className="mt-4 flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent text-xs text-slate-300 font-mono px-2 outline-none truncate"
            dir="ltr"
          />
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            id="download-qr-image-btn"
            onClick={handleDownloadQrImage}
            disabled={isDownloading}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-md ${
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/10'
            }`}
            title={isAr ? 'تنزيل صورة الـ QR' : 'Download QR Image'}
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="truncate">{isAr ? 'تم التنزيل' : 'Downloaded'}</span>
              </>
            ) : isDownloading ? (
              <span className="truncate">{isAr ? 'جارِ التحميل...' : 'Saving...'}</span>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span className="truncate">{isAr ? 'تنزيل الـ QR' : 'Save Image'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate">{isAr ? 'مشاركة الرابط' : 'Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

