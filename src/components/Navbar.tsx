import React from 'react';
import { Download, Sparkles, History, Layers, Globe, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  historyCount: number;
  onOpenHistory: () => void;
  onOpenGuide: () => void;
  activeTab: 'single' | 'batch';
  setActiveTab: (tab: 'single' | 'batch') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  historyCount,
  onOpenHistory,
  onOpenGuide,
  activeTab,
  setActiveTab,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('single')}>
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/30 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Download className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                Omni<span className="animated-gradient-text">Stream</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v2.6 PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              {lang === 'bn' ? 'সর্বজনীন ভিডিও ও অডিও ডাউনলোডার' : 'Universal Video Downloader'}
            </p>
          </div>
        </div>

        {/* Mode & Tool Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mode Switcher */}
          <div className="hidden md:flex p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'single'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              {t.singleMode}
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'batch'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {t.batchMode}
            </button>
          </div>

          {/* Guide Modal Trigger */}
          <button
            onClick={onOpenGuide}
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5"
            title={t.howToTitle}
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'গাইড' : 'Guide'}</span>
          </button>

          {/* Download History Drawer Trigger */}
          <button
            onClick={onOpenHistory}
            className="relative p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5"
            title={t.historyTitle}
          >
            <History className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'হিস্টোরি' : 'History'}</span>
            {historyCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-indigo-600 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* Language Switcher Button */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="px-3 py-2 text-xs font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>{lang === 'bn' ? 'ENGLISH' : 'বাংলা'}</span>
          </button>

        </div>

      </div>
    </header>
  );
};
