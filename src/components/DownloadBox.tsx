import React, { useState } from 'react';
import { Search, Clipboard, X, Sparkles, Youtube, Facebook, Instagram, Twitter, Film, Music, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface DownloadBoxProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: (customUrl?: string) => void;
  isAnalyzing: boolean;
  lang: Language;
}

export const DownloadBox: React.FC<DownloadBoxProps> = ({
  url,
  setUrl,
  onAnalyze,
  isAnalyzing,
  lang,
}) => {
  const t = translations[lang];
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Quick samples to try instantly
  const sampleLinks = [
    {
      name: t.fbSample,
      icon: <Facebook className="w-3.5 h-3.5 text-blue-400" />,
      url: 'https://www.facebook.com/watch/?v=10158327318356234',
      badge: 'Facebook'
    },
    {
      name: t.ytSample,
      icon: <Youtube className="w-3.5 h-3.5 text-red-500" />,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      badge: 'YouTube'
    },
    {
      name: t.igSample,
      icon: <Instagram className="w-3.5 h-3.5 text-pink-400" />,
      url: 'https://www.instagram.com/reel/C321sample99/',
      badge: 'Instagram'
    },
    {
      name: t.ttSample,
      icon: <Film className="w-3.5 h-3.5 text-teal-400" />,
      url: 'https://www.tiktok.com/@creator/video/72345678910',
      badge: 'TikTok'
    },
    {
      name: t.twSample,
      icon: <Twitter className="w-3.5 h-3.5 text-sky-400" />,
      url: 'https://x.com/sports/status/1789101112',
      badge: 'Twitter/X'
    }
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      }
    } catch (err) {
      // Clipboard read fallback if permissions blocked
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze();
    }
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    onAnalyze(sampleUrl);
  };

  // Detect platform live for visual icon pill
  const getPlatformTag = () => {
    const lower = url.toLowerCase();
    if (lower.includes('youtube') || lower.includes('youtu.be')) {
      return { name: 'YouTube', color: 'bg-red-500/10 text-red-400 border-red-500/30' };
    }
    if (lower.includes('facebook') || lower.includes('fb.')) {
      return { name: 'Facebook', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
    }
    if (lower.includes('instagram')) {
      return { name: 'Instagram', color: 'bg-pink-500/10 text-pink-400 border-pink-500/30' };
    }
    if (lower.includes('tiktok')) {
      return { name: 'TikTok', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    }
    if (lower.includes('twitter') || lower.includes('x.com')) {
      return { name: 'Twitter/X', color: 'bg-sky-500/10 text-sky-400 border-sky-500/30' };
    }
    return null;
  };

  const platformTag = getPlatformTag();

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      
      {/* Title & Headline */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
          <span>{lang === 'bn' ? '১০০% ফ্রি ও হাই-স্পিড ভিডিও ডাউনলোডার' : '100% Free & Fast Video Downloader Engine'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {t.appName}
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Input Box Card */}
      <div className="relative group p-2 rounded-2xl glass-panel border border-slate-800 focus-within:border-indigo-500/80 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all glow-indigo">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2">
          
          <div className="relative flex-1 w-full flex items-center">
            
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-5 h-5 text-indigo-400" />
            </div>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t.pastePlaceholder}
              className="w-full py-3.5 pr-20 bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none font-sans"
            />

            {/* Live Detected Platform Badge */}
            {platformTag && (
              <span className={`hidden sm:inline-flex items-center px-2.5 py-1 mr-2 text-xs font-bold rounded-lg border ${platformTag.color}`}>
                {platformTag.name}
              </span>
            )}

            {/* Clear Button */}
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="p-1.5 mr-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={t.clearBtn}
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Paste Button */}
            <button
              type="button"
              onClick={handlePaste}
              className="p-2 mr-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 shrink-0"
              title={t.pasteBtn}
            >
              <Clipboard className="w-3.5 h-3.5 text-indigo-300" />
              <span className="hidden sm:inline">{t.pasteBtn}</span>
            </button>

          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            disabled={!url.trim() || isAnalyzing}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base rounded-xl shadow-lg shadow-indigo-600/30 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.analyzing}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t.analyzeBtn}</span>
              </>
            )}
          </button>

        </form>
      </div>

      {copiedNotification && (
        <div className="mt-2 text-center text-xs text-emerald-400 flex items-center justify-center gap-1 font-medium animate-bounce">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'ক্লিপবোর্ড থেকে লিংক পেস্ট করা হয়েছে!' : 'Link pasted from clipboard!'}</span>
        </div>
      )}

      {/* Quick Sample Links */}
      <div className="mt-6 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          {t.sampleLinksTitle}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {sampleLinks.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSampleClick(sample.url)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-900/90 hover:bg-slate-800 border border-slate-800/80 hover:border-indigo-500/40 text-slate-300 hover:text-white rounded-xl transition-all flex items-center gap-1.5 shadow-sm group"
            >
              {sample.icon}
              <span>{sample.name}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
