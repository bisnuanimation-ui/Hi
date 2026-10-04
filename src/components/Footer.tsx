import React from 'react';
import { Download, Heart, Shield, Zap } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-10 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-white">OmniStream</span>
            <p className="text-[11px] text-slate-500">{t.appTagline}</p>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>{t.unlimitedSpeed}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>{t.safeSecure}</span>
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-slate-500">
          <p>{t.footerRights}</p>
        </div>

      </div>
    </footer>
  );
};
