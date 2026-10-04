import React, { useState } from 'react';
import { Download, Film, Music, Image as ImageIcon, FileText, Play, Clock, Eye, ThumbsUp, Sparkles, CheckCircle2, Scissors, Share2 } from 'lucide-react';
import { VideoInfo, MediaFormat, Language } from '../types';
import { translations } from '../translations';

interface FormatSelectorProps {
  video: VideoInfo;
  lang: Language;
  onOpenAI: () => void;
  onDownloadStarted: (format: MediaFormat) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  video,
  lang,
  onOpenAI,
  onDownloadStarted,
}) => {
  const t = translations[lang];
  const [activeType, setActiveType] = useState<'video' | 'audio' | 'image' | 'subtitle'>('video');
  const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [showPreviewPlayer, setShowPreviewPlayer] = useState<boolean>(false);

  // Optional Trimmer State
  const [trimStart, setTrimStart] = useState<string>('00:00');
  const [trimEnd, setTrimEnd] = useState<string>(video.duration || '03:45');
  const [isTrimActive, setIsTrimActive] = useState<boolean>(false);

  const filteredFormats = video.formats.filter((f) => f.type === activeType);

  const handleDownload = (format: MediaFormat) => {
    setDownloadingFormatId(format.id);
    setDownloadProgress(15);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingFormatId(null);
            setDownloadProgress(0);
          }, 1200);

          // Trigger actual file download from backend server stream
          const downloadUrl = format.directUrl || `/api/stream-file?quality=${format.quality}&ext=${format.extension.toLowerCase()}&title=${encodeURIComponent(video.title)}`;
          
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `${video.title.replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '_')}_${format.quality}.${format.extension.toLowerCase()}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          onDownloadStarted(format);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Background ambient glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Video Overview Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Thumbnail & Play Modal Button */}
          <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video shadow-lg">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Play Overlay Button */}
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
              <button
                onClick={() => setShowPreviewPlayer(true)}
                className="p-4 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/40 transform group-hover:scale-110 transition-all flex items-center gap-2 font-semibold text-xs"
              >
                <Play className="w-6 h-6 fill-white" />
              </button>
            </div>

            {/* Platform & Duration Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold bg-slate-900/90 text-indigo-400 border border-slate-700/80 rounded-lg shadow-md uppercase">
                {video.platformName}
              </span>
            </div>

            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-slate-950/90 text-white rounded-lg border border-slate-800 shadow-md">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{video.duration}</span>
            </div>
          </div>

          {/* Metadata & Title */}
          <div className="lg:col-span-7 space-y-4">
            
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug line-clamp-2">
                {video.title}
              </h2>
              <p className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-2">
                <span>{video.author}</span>
                {video.publishedDate && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500">{video.publishedDate}</span>
                  </>
                )}
              </p>
            </div>

            {/* Video Stats */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              {video.views && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>{video.views}</span>
                </div>
              )}
              {video.likes && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <ThumbsUp className="w-4 h-4 text-pink-400" />
                  <span>{video.likes}</span>
                </div>
              )}
            </div>

            {/* AI Summary Action Button */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenAI}
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>{t.aiBtn}</span>
              </button>

              <button
                onClick={() => setIsTrimActive(!isTrimActive)}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${
                  isTrimActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Scissors className="w-4 h-4 text-amber-400" />
                <span>{t.videoTrimTitle}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Video Trimmer Section if enabled */}
        {isTrimActive && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 animate-in fade-in">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Scissors className="w-4 h-4" />
                <span>{t.videoTrimTitle}</span>
              </h4>
              <span className="text-[11px] text-slate-400">{t.trimNote}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white">
              <div className="flex items-center gap-2">
                <label className="text-slate-400">{t.startTime}:</label>
                <input
                  type="text"
                  value={trimStart}
                  onChange={(e) => setTrimStart(e.target.value)}
                  className="w-20 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-center font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-slate-400">{t.endTime}:</label>
                <input
                  type="text"
                  value={trimEnd}
                  onChange={(e) => setTrimEnd(e.target.value)}
                  className="w-20 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-center font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Format Quality Tabs */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveType('video')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeType === 'video'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>{t.tabVideo}</span>
            </button>

            <button
              onClick={() => setActiveType('audio')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeType === 'audio'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>{t.tabAudio}</span>
            </button>

            <button
              onClick={() => setActiveType('image')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeType === 'image'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t.tabImage}</span>
            </button>

            <button
              onClick={() => setActiveType('subtitle')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeType === 'subtitle'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.tabSubtitles}</span>
            </button>
          </div>

          {/* Format Options List Grid */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredFormats.map((format) => {
              const isDownloadingThis = downloadingFormatId === format.id;

              return (
                <div
                  key={format.id}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/50 transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {format.quality}
                      </span>
                      {format.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {format.badge}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {format.extension}
                      </span>
                      <span>{format.resolution}</span>
                      {format.fps && <span>• {format.fps}</span>}
                      <span>• {format.fileSize}</span>
                    </div>
                  </div>

                  {/* Download Action Button */}
                  <button
                    onClick={() => handleDownload(format)}
                    disabled={isDownloadingThis}
                    className="relative px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all transform active:scale-95 disabled:opacity-80 shrink-0 overflow-hidden"
                  >
                    {isDownloadingThis ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{downloadProgress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Download className="w-4 h-4" />
                        <span>{t.downloadNow}</span>
                      </div>
                    )}

                    {/* Download Progress Bar Fill */}
                    {isDownloadingThis && (
                      <div
                        className="absolute bottom-0 left-0 top-0 bg-emerald-500/40 transition-all duration-200 pointer-events-none"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    )}
                  </button>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Video Preview Modal */}
      {showPreviewPlayer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowPreviewPlayer(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-4 line-clamp-1">{video.title}</h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center relative">
              <img
                src={video.thumbnail}
                alt="preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                <div className="text-center p-6 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-md">
                  <Play className="w-12 h-12 text-indigo-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-sm font-bold text-white">{lang === 'bn' ? 'ভিডিও প্রিভিউ রেডি' : 'Video Preview Ready'}</p>
                  <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'আপনার ডিভাইস সরাসরি ডাউনলোডের জন্য নিচে ফরম্যাট বাটন চাপুন।' : 'Click any download button below to start immediate fast stream file download.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
