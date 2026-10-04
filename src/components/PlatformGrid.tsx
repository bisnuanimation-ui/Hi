import React from 'react';
import { Facebook, Youtube, Instagram, Twitter, Film, Music, Globe, ShieldCheck, Zap, HardDrive, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface PlatformGridProps {
  lang: Language;
}

export const PlatformGrid: React.FC<PlatformGridProps> = ({ lang }) => {
  const t = translations[lang];

  const platforms = [
    {
      name: 'Facebook',
      desc: lang === 'bn' ? 'রিলস, ওয়াচ ও প্রাইভেট ভিডিও' : 'Reels, Watch, Stories & Clips',
      icon: <Facebook className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
      badge: '1080p HD'
    },
    {
      name: 'YouTube',
      desc: lang === 'bn' ? 'শর্টস, ৪K ভিডিও ও MP3' : 'Shorts, 4K Videos & MP3',
      icon: <Youtube className="w-6 h-6 text-red-500" />,
      color: 'from-red-500/20 to-orange-500/10 border-red-500/30',
      badge: '4K 60FPS'
    },
    {
      name: 'TikTok',
      desc: lang === 'bn' ? 'ওয়াটারমার্ক ছাড়া সব টিকটক' : 'Watermark-Free Downloads',
      icon: <Film className="w-6 h-6 text-teal-400" />,
      color: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30',
      badge: 'NO WATERMARK'
    },
    {
      name: 'Instagram',
      desc: lang === 'bn' ? 'রিলস, স্টোরি ও IGTV' : 'Reels, IGTV & Audio Tracks',
      icon: <Instagram className="w-6 h-6 text-pink-500" />,
      color: 'from-pink-500/20 to-rose-500/10 border-pink-500/30',
      badge: 'FULL HD'
    },
    {
      name: 'Twitter / X',
      desc: lang === 'bn' ? 'ভাইরাল ভিডিও ও GIF' : 'Viral Clips & GIFs',
      icon: <Twitter className="w-6 h-6 text-sky-400" />,
      color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30',
      badge: 'FAST'
    },
    {
      name: 'SoundCloud',
      desc: lang === 'bn' ? '৩২০kbps MP3 মিউজিক' : '320kbps High Quality Audio',
      icon: <Music className="w-6 h-6 text-orange-500" />,
      color: 'from-orange-500/20 to-amber-500/10 border-orange-500/30',
      badge: '320kbps MP3'
    },
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-indigo-400" />,
      title: t.unlimitedSpeed,
      desc: lang === 'bn' ? 'সার্ভার থেকে সরাসরি সর্বোচ্চ ব্যান্ডউইথ ডাউনলোড।' : 'Direct maximum bandwidth server side streaming.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: t.safeSecure,
      desc: lang === 'bn' ? 'কোনো রেজিস্ট্রেশন বা পার্সোনাল ডাটা ছাড়াই ফ্রী ব্যবহার।' : '100% private, no signup, no login required.'
    },
    {
      icon: <HardDrive className="w-5 h-5 text-purple-400" />,
      title: t.hd4kSupport,
      desc: lang === 'bn' ? '৪K Ultra HD, ১০৮০p, ৭২০p ও MP3 সিলেক্টর।' : 'Supports 4K Ultra HD, 1080p, 720p, 480p and MP3.'
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto my-12 px-4">
      
      {/* Section Title */}
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {t.supportedPlatforms}
        </h3>
        <p className="text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          {lang === 'bn'
            ? 'বিশ্বের ৫০০+ জনপ্রিয় ভিডিও ও সামাজিক প্ল্যাটফর্ম থেকে অনায়াসে ভিডিও ডাউনলোড করুন।'
            : 'Download videos seamlessly from 500+ social and video platforms worldwide.'}
        </p>
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((p, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-br ${p.color} border border-slate-800/80 hover:border-slate-700 transition-all group glass-panel-hover`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 shadow-md">
                {p.icon}
              </div>
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-slate-950/80 text-slate-300 border border-slate-800">
                {p.badge}
              </span>
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              {p.name}
            </h4>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* High-Level Feature Highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
              {f.icon}
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">{f.title}</h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
