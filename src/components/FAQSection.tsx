import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = lang === 'bn' ? [
    {
      q: 'ফেসবুক ও ইউটিউব ভিডিও ডাউনলোড করার কোনো চার্জ আছে কি?',
      a: 'না, OmniStream সম্পূর্ণ বিনামূল্যে ব্যবহারের জন্য তৈরি। আপনি কোনো লিমিট ছাড়াই যত খুশি ভিডিও ডাউনলোড করতে পারবেন।'
    },
    {
      q: 'টিকটক ভিডিও ওয়াটারমার্ক ছাড়া কিভাবে ডাউনলোড করা যায়?',
      a: 'আমাদের সিস্টেম টিকটকের ওয়াটারমার্ক স্বয়ংক্রিয়ভাবে সরিয়ে নেয়। টিকটক ভিডিওর লিংক বক্সে দিয়ে ডাউনলোড করলে ক্লিন এইচডি ভিডিও পেয়ে যাবেন।'
    },
    {
      q: 'আমি কি শুধু অডিও বা MP3 ফরম্যাটে ডাউনলোড করতে পারব?',
      a: 'হ্যাঁ! যেকোনো ইউটিউব বা সামাজিক মাধ্যমের ভিডিও থেকে অডিও এক্সট্র্যাক্ট করে ৩২০kbps বা ১২৮kbps MP3 ফরম্যাটে ডাউনলোড করা সম্ভব।'
    },
    {
      q: 'মোবাইল বা অ্যান্ড্রয়েড ফোনে কিভাবে সেভ হবে?',
      a: 'আপনার ফোনের ক্রোম, সাফারি বা ব্রাউজার দিয়ে ভিডিও ডাউনলোড বাটনে ট্যাপ করলে তা সাথে সাথেই গ্যালারি বা Download ফোল্ডারে সেভ হয়ে যাবে।'
    }
  ] : [
    {
      q: 'Is OmniStream free to use for YouTube and Facebook videos?',
      a: 'Yes, OmniStream is 100% free with unlimited high-speed downloads. No signup or account creation is required.'
    },
    {
      q: 'How to download TikTok videos without watermark?',
      a: 'Simply copy the TikTok video link and paste it into OmniStream. Our server strips the watermark automatically.'
    },
    {
      q: 'Can I convert videos to high quality MP3 audio?',
      a: 'Yes, select the "Audio (MP3/AAC)" tab after analyzing your video link to download 320kbps or 128kbps crystal clear MP3 audio.'
    },
    {
      q: 'Does it work on Android phones and iPhones?',
      a: 'Yes! OmniStream works smoothly on Chrome, Safari, Firefox, Android, iOS, Windows and Mac devices.'
    }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          <span>{lang === 'bn' ? 'সাধারণ জিজ্ঞাসাবলী (FAQ)' : 'Frequently Asked Questions'}</span>
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl glass-panel border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-indigo-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
