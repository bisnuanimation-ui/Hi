import React, { useEffect, useState } from 'react';
import { Sparkles, Copy, Check, X, FileText, Tag, Lightbulb, Volume2 } from 'lucide-react';
import { VideoInfo, AIAnalysis, Language } from '../types';
import { translations } from '../translations';

interface AISummaryModalProps {
  video: VideoInfo;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({
  video,
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tagsCopied, setTagsCopied] = useState<boolean>(false);
  const [transcriptCopied, setTranscriptCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && video) {
      fetchAIAnalysis();
    }
  }, [isOpen, video]);

  const fetchAIAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: video.title,
          platform: video.platformName,
          author: video.author,
          duration: video.duration,
        }),
      });
      const result = await res.json();
      if (result.success && result.data) {
        setAnalysis(result.data);
      }
    } catch (err) {
      console.error('Failed to analyze video with Gemini AI', err);
    } finally {
      setLoading(false);
    }
  };

  const copyTagsToClipboard = () => {
    if (analysis && analysis.viral_tags) {
      navigator.clipboard.writeText(analysis.viral_tags.join(' '));
      setTagsCopied(true);
      setTimeout(() => setTagsCopied(false), 2000);
    }
  };

  const copyTranscriptToClipboard = () => {
    if (analysis) {
      const text = lang === 'bn' ? analysis.transcript_preview_bn : analysis.transcript_preview_en;
      navigator.clipboard.writeText(text);
      setTranscriptCopied(true);
      setTimeout(() => setTranscriptCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/30">
            <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{t.aiTitle}</h3>
            <p className="text-xs text-purple-300 font-medium">
              Powered by Google Gemini AI
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-300 animate-pulse">
              {lang === 'bn' ? 'Gemini AI ভিডিও ফাইল বিশ্লেষণ করছে...' : 'Gemini AI analyzing video insights & highlights...'}
            </p>
          </div>
        ) : analysis ? (
          <div className="space-y-6 text-sm">
            
            {/* Overview Summary */}
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <h4 className="text-xs font-extrabold uppercase text-purple-400 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>{t.aiSummaryTitle}</span>
              </h4>
              <p className="text-slate-200 leading-relaxed font-sans">
                {lang === 'bn' ? analysis.summary_bn : analysis.summary_en}
              </p>
            </div>

            {/* Key Takeaways */}
            <div>
              <h4 className="text-xs font-extrabold uppercase text-indigo-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{t.aiTakeawaysTitle}</span>
              </h4>
              <ul className="space-y-2">
                {(lang === 'bn' ? analysis.takeaways_bn : analysis.takeaways_en).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Viral SEO Tags */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-extrabold uppercase text-pink-400 flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span>{t.aiTagsTitle}</span>
                </h4>
                <button
                  onClick={copyTagsToClipboard}
                  className="px-3 py-1 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg flex items-center gap-1 transition-colors"
                >
                  {tagsCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{tagsCopied ? t.copied : t.copyTags}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.viral_tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-900 text-pink-300 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Transcript Snippet */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-extrabold uppercase text-emerald-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{t.aiTranscriptTitle}</span>
                </h4>
                <button
                  onClick={copyTranscriptToClipboard}
                  className="px-3 py-1 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg flex items-center gap-1 transition-colors"
                >
                  {transcriptCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{transcriptCopied ? t.copied : (lang === 'bn' ? 'কপি করুন' : 'Copy Text')}</span>
                </button>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 italic">
                "{lang === 'bn' ? analysis.transcript_preview_bn : analysis.transcript_preview_en}"
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};
