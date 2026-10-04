import React, { useState } from 'react';
import { Layers, Download, CheckCircle, AlertCircle, Sparkles, Trash2 } from 'lucide-react';
import { VideoInfo, Language, MediaFormat } from '../types';
import { translations } from '../translations';

interface BatchDownloaderProps {
  lang: Language;
  onDownloadStarted: (video: VideoInfo, format: MediaFormat) => void;
}

export const BatchDownloader: React.FC<BatchDownloaderProps> = ({
  lang,
  onDownloadStarted,
}) => {
  const t = translations[lang];
  const [batchText, setBatchText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [results, setResults] = useState<VideoInfo[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleProcessBatch = async () => {
    const urls = batchText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (urls.length === 0) {
      setErrorMsg(lang === 'bn' ? 'কমপক্ষে একটি লিংক লিখুন।' : 'Please enter at least one URL.');
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/batch-inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setResults(data.data);
      } else {
        setErrorMsg(data.error || 'ব্যাচ বিশ্লেষণ ব্যর্থ হয়েছে।');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error processing batch links');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = (video: VideoInfo, format: MediaFormat) => {
    const downloadUrl = format.directUrl || `/api/stream-file?quality=${format.quality}&ext=${format.extension.toLowerCase()}&title=${encodeURIComponent(video.title)}`;
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${video.title.replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '_')}_${format.quality}.${format.extension.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    onDownloadStarted(video, format);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4 animate-in fade-in">
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{t.batchMode}</h3>
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'bn'
                ? 'একসাথে একাধিক ফেসবুক, ইউটিউব বা টিকটক লিংক পেস্ট করে দ্রুত ডাউনলোড করুন।'
                : 'Paste multiple video URLs at once (one URL per line) to process in bulk.'}
            </p>
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <textarea
            value={batchText}
            onChange={(e) => setBatchText(e.target.value)}
            placeholder={t.batchPlaceholder}
            rows={5}
            className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-slate-500 text-sm font-mono focus:outline-none transition-all"
          />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              {lang === 'bn' ? 'সর্বোচ্চ ১০ টি লিংক প্রতি ব্যাচে' : 'Maximum 10 links per batch'}
            </span>
            {batchText && (
              <button
                onClick={() => {
                  setBatchText('');
                  setResults([]);
                }}
                className="text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearBtn}</span>
              </button>
            )}
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleProcessBatch}
          disabled={!batchText.trim() || isProcessing}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-indigo-600/30 transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{t.analyzing}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{t.processBatch}</span>
            </>
          )}
        </button>

        {/* Results List */}
        {results.length > 0 && (
          <div className="mt-8 space-y-4 pt-6 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'bn' ? `বিশ্লেষিত লিংকসমূহ (${results.length})` : `Processed Links (${results.length})`}
              </span>
            </h4>

            <div className="space-y-3">
              {results.map((item, idx) => {
                const bestVideo = item.formats.find((f) => f.id === 'v_1080p') || item.formats[0];
                const bestAudio = item.formats.find((f) => f.id === 'a_320k') || item.formats[5];

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                      />
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {item.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.platformName} • {item.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleDownloadSingle(item, bestVideo)}
                        className="px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md flex items-center gap-1 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>1080p MP4</span>
                      </button>
                      <button
                        onClick={() => handleDownloadSingle(item, bestAudio)}
                        className="px-3 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md flex items-center gap-1 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>MP3</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
