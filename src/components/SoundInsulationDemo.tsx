import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ShieldCheck, Check, X, Sparkles, Activity } from 'lucide-react';
import { AppLanguage } from '../types';
import { UPVC_VS_ALUMINUM_COMPARISON } from '../data/defaultData';

interface SoundInsulationDemoProps {
  lang: AppLanguage;
}

export const SoundInsulationDemo: React.FC<SoundInsulationDemoProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [isUpvcClosed, setIsUpvcClosed] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);

  // Toggle synthesized audio effect for demonstration
  const toggleSoundSimulation = () => {
    try {
      if (isPlayingAudio) {
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
        setIsPlayingAudio(false);
      } else {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const gainNode = ctx.createGain();
        
        // Brown noise / simulated street rumble
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5; // Gain
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = isUpvcClosed ? 250 : 2500; // Low muffled vs loud harsh

        gainNode.gain.value = isUpvcClosed ? 0.03 : 0.22;

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start();

        audioCtxRef.current = ctx;
        gainNodeRef.current = gainNode;
        setIsPlayingAudio(true);
      }
    } catch (e) {
      console.log('Audio not supported in this frame', e);
    }
  };

  // Adjust audio when window state toggles
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetGain = isUpvcClosed ? 0.03 : 0.22;
      gainNodeRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.1);
    }
  }, [isUpvcClosed]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <section id="insulation-comparison-section" className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <VolumeX className="w-5 h-5" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isAr ? 'تجربة ومقارنة عزل الصوت والحرارة' : 'Acoustic & Thermal Insulation Simulator'}
          </h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          {isAr 
            ? 'شاهد الفرق الحقيقي بين قطاعات الـ UPVC من المكاوي هوم وشبابيك الألوميتال التقليدية' 
            : 'Compare multi-chamber Al-Mekawy UPVC profiles with standard single-layer aluminum'}
        </p>
      </div>

      {/* Interactive Sound Simulator Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isUpvcClosed ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500 animate-ping'}`} />
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isUpvcClosed 
                  ? (isAr ? 'حالة الشباك: مغلق بإحكام (شباك المكاوي UPVC)' : 'Window State: Sealed (Al-Mekawy UPVC)') 
                  : (isAr ? 'حالة الشباك: مفتوح / شباك عادي (تسريب صوت وضوضاء)' : 'Window State: Leaking Noise / Standard Open')}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isUpvcClosed
                ? (isAr ? 'نظام الغرف الهوائية المتعددة والزجاج المزدوج يمتص الذبذبات الصوتية ويخفض الضوضاء بنسبة تصل إلى 95% (32 ديسيبل - هدوء تام كالمكتبات).' : 'Multi-chamber polymer construction blocks up to 95% of outdoor street traffic noise down to 32 dB.')
                : (isAr ? 'دخول كامل لأصوات السيارات والشارع والغبار والأتربة والحرارة الخارجية العالية (85 ديسيبل - إزعاج شديد).' : 'Exposed to intense outdoor city noise, horns and dust at 85 dB.')}
            </p>

            {/* Toggle Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="toggle-window-state-btn"
                onClick={() => setIsUpvcClosed(!isUpvcClosed)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md ${
                  isUpvcClosed
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {isUpvcClosed ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isUpvcClosed ? (isAr ? 'اضغط لفتح الشباك وسماع الفرق' : 'Open Window') : (isAr ? 'اضغط لإغلاق شباك المكاوي UPVC' : 'Close UPVC Window')}</span>
              </button>

              <button
                id="toggle-audio-sim-btn"
                onClick={toggleSoundSimulation}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Activity className="w-4 h-4 text-amber-400" />
                <span>{isPlayingAudio ? (isAr ? 'إيقاف الصوت التجريبي' : 'Stop Audio Sim') : (isAr ? 'تشغيل محاكاة صوت الشارع 🔊' : 'Play Street Noise Audio 🔊')}</span>
              </button>
            </div>
          </div>

          {/* Decibel Meter Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                {isAr ? 'مستوى الضوضاء داخل الغرفة' : 'Indoor Sound Level'}
              </span>
              <div className="flex items-baseline justify-center gap-1.5">
                <span className={`text-4xl sm:text-5xl font-black font-mono transition-colors duration-500 ${isUpvcClosed ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {isUpvcClosed ? '32' : '85'}
                </span>
                <span className="text-base text-slate-400 font-bold">dB</span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block mt-1 ${isUpvcClosed ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'}`}>
                {isUpvcClosed ? (isAr ? 'هدوء وسكينة تامة (نوم مريح)' : 'Whisper Quiet') : (isAr ? 'ضوضاء عالية مزعجة' : 'Loud Street Noise')}
              </span>
            </div>

            {/* Waveform graphic bars */}
            <div className="flex items-center justify-center gap-1.5 h-12 mt-5 w-full max-w-xs">
              {[20, 45, 80, 60, 90, 75, 40, 65, 85, 30, 70, 95, 55, 35].map((val, i) => {
                const heightPercent = isUpvcClosed ? Math.max(12, val * 0.18) : val;
                return (
                  <div
                    key={i}
                    style={{ height: `${heightPercent}%` }}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isUpvcClosed 
                        ? 'bg-emerald-500/60' 
                        : 'bg-rose-500 animate-pulse'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'جدول مقارنة: قطاعات UPVC المكاوي هوم مقابل الألوميتال العادي' : 'Direct Comparison: Al-Mekawy UPVC vs Standard Aluminum'}</span>
          </h3>
        </div>

        <div className="divide-y divide-slate-800/80">
          {UPVC_VS_ALUMINUM_COMPARISON.map((item, index) => (
            <div key={index} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center hover:bg-slate-800/30 transition-colors">
              <div className="md:col-span-4 font-bold text-sm text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{isAr ? item.featureAr : item.featureEn}</span>
              </div>

              <div className="md:col-span-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs sm:text-sm text-emerald-200 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-emerald-300 mb-0.5">{isAr ? 'المكاوي هوم UPVC:' : 'Al-Mekawy UPVC:'}</span>
                  <span>{isAr ? item.upvcAr : item.upvcEn}</span>
                </div>
              </div>

              <div className="md:col-span-4 p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-xs sm:text-sm text-rose-200 flex items-start gap-2">
                <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-rose-300 mb-0.5">{isAr ? 'الألوميتال العادي:' : 'Standard Aluminum:'}</span>
                  <span>{isAr ? item.aluminumAr : item.aluminumEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
