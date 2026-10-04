import React from 'react';
import { X, HelpCircle, Bookmark, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{t.howToTitle}</h3>
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'bn' ? 'মাত্র ৩টি ধাপে যেকোন প্ল্যাটফর্ম থেকে ভিডিও বা অডিও সেভ করুন' : 'Save videos or audio from any platform in just 3 quick steps'}
            </p>
          </div>
        </div>

        {/* Step Cards */}
        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <h5 className="text-sm font-bold text-white">{t.step1}</h5>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'bn' ? 'ফেসবুকের "Share" > "Copy Link" অথবা ইউটিউব/টিকটকের লিংক কপি করে নিন।' : 'Click Share > Copy Link on Facebook reels, YouTube shorts or TikTok videos.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <h5 className="text-sm font-bold text-white">{t.step2}</h5>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'bn' ? 'আমাদের ওয়েবসাইটে লিংকটি পেস্ট করে "ভিডিও খুঁজুন" বাটনে ক্লিক করুন।' : 'Paste the copied URL into the box above and click "Analyze Link".'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <h5 className="text-sm font-bold text-white">{t.step3}</h5>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'bn' ? '১০৮০p Full HD, ৪K, বা MP3 অডিও অপশন সিলেক্ট করে ডাউনলোড বাটন চাপুন।' : 'Select 1080p, 4K or MP3 audio format to download instantly.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bookmarklet Tool Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold text-white">{t.bookmarkletTitle}</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.bookmarkletDesc}
          </p>
          <div className="pt-2 flex justify-center">
            <a
              href={`javascript:(function(){window.open('${window.location.origin}?url='+encodeURIComponent(window.location.href));})();`}
              onClick={(e) => e.preventDefault()}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg cursor-grab active:cursor-grabbing transition-transform transform active:scale-95 flex items-center gap-2"
              title={lang === 'bn' ? 'ড্র্যাগ করে আপনার ব্রাউজারের বুকমার্ক বারে এনে রাখুন' : 'Drag to your bookmarks bar'}
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{t.dragMe}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
