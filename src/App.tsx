import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DownloadBox } from './components/DownloadBox';
import { FormatSelector } from './components/FormatSelector';
import { AISummaryModal } from './components/AISummaryModal';
import { PlatformGrid } from './components/PlatformGrid';
import { BatchDownloader } from './components/BatchDownloader';
import { HistoryDrawer } from './components/HistoryDrawer';
import { GuideModal } from './components/GuideModal';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

import { VideoInfo, MediaFormat, HistoryItem, Language } from './types';
import { translations } from './translations';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [url, setUrl] = useState<string>('');
  const [video, setVideo] = useState<VideoInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals & Drawers
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Download Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // History State in LocalStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('omnistream_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('omnistream_history', JSON.stringify(history));
    } catch (e) {
      // Ignore quota error
    }
  }, [history]);

  // Handle URL query parameters if opened via Bookmarklet (?url=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryUrl = params.get('url');
    if (queryUrl) {
      setUrl(queryUrl);
      handleAnalyzeLink(queryUrl);
    }
  }, []);

  const handleAnalyzeLink = async (customUrl?: string) => {
    const targetUrl = customUrl || url;
    if (!targetUrl || !targetUrl.trim()) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/inspect-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim() }),
      });

      const data = await res.json();

      if (data.success && data.data) {
        const videoData: VideoInfo = data.data;
        setVideo(videoData);

        // Add to history
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          video: videoData,
        };
        setHistory((prev) => [newItem, ...prev.filter((item) => item.video.url !== videoData.url)].slice(0, 25));

        // Scroll smoothly to format selector
        setTimeout(() => {
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }, 100);
      } else {
        setErrorMessage(data.error || 'লিংক বিশ্লেষণ করতে ব্যর্থ হয়েছে। একটি বৈধ ভিডিও লিংক দিন।');
      }
    } catch (err: any) {
      setErrorMessage('সার্ভার কানেকশনে সমস্যা হয়েছে। পরে চেষ্টা করুন।');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadStarted = (format: MediaFormat) => {
    const msg = lang === 'bn'
      ? `${format.quality} (${format.extension}) ডাউনলোড শুরু হয়েছে!`
      : `Downloading ${format.quality} (${format.extension})...`;
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('omnistream_history');
  };

  const handleSelectFromHistory = (item: HistoryItem) => {
    setVideo(item.video);
    setUrl(item.video.url);
    setActiveTab('single');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-emerald-600/40 flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 w-full">
        
        {activeTab === 'single' ? (
          <>
            {/* Download Input Box */}
            <DownloadBox
              url={url}
              setUrl={setUrl}
              onAnalyze={handleAnalyzeLink}
              isAnalyzing={isAnalyzing}
              lang={lang}
            />

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="max-w-xl mx-auto my-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs sm:text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Formats & Video Details Card */}
            {video && (
              <FormatSelector
                video={video}
                lang={lang}
                onOpenAI={() => setIsAiModalOpen(true)}
                onDownloadStarted={handleDownloadStarted}
              />
            )}

            {/* Platform Feature Grid */}
            <PlatformGrid lang={lang} />

            {/* FAQ Section */}
            <FAQSection lang={lang} />
          </>
        ) : (
          <BatchDownloader
            lang={lang}
            onDownloadStarted={(v, f) => handleDownloadStarted(f)}
          />
        )}

      </main>

      {/* AI Summary Modal */}
      {video && (
        <AISummaryModal
          video={video}
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          lang={lang}
        />
      )}

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        lang={lang}
        onSelectFromHistory={handleSelectFromHistory}
      />

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <Footer lang={lang} />

    </div>
  );
}
