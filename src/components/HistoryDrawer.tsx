import React, { useState } from 'react';
import { History, X, Trash2, Download, ExternalLink, Search } from 'lucide-react';
import { HistoryItem, Language, MediaFormat } from '../types';
import { translations } from '../translations';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  lang: Language;
  onSelectFromHistory: (item: HistoryItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  lang,
  onSelectFromHistory,
}) => {
  const t = translations[lang];
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) =>
    item.video.title.toLowerCase().includes(search.toLowerCase()) ||
    item.video.platformName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in">
      <div className="w-full max-w-md h-full bg-slate-950 border-l border-slate-800 p-6 flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">{t.historyTitle}</h3>
            <span className="px-2 py-0.5 text-xs font-bold bg-slate-900 border border-slate-800 rounded-full text-slate-300">
              {history.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions */}
        {history.length > 0 && (
          <div className="my-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'bn' ? 'হিস্টোরিতে খুঁজুন...' : 'Search history...'}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClearHistory}
                className="text-xs font-semibold text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearHistory}</span>
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 my-2">
          {filteredHistory.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <History className="w-10 h-10 text-slate-700 mx-auto" />
              <p className="text-xs text-slate-400">{t.noHistory}</p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectFromHistory(item);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group flex items-center gap-3"
              >
                <img
                  src={item.video.thumbnail}
                  alt={item.video.title}
                  className="w-16 h-12 rounded-xl object-cover border border-slate-800 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
                    {item.video.title}
                  </h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {item.video.platformName} • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button
                  className="p-2 text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-600 rounded-xl border border-indigo-500/20 transition-all shrink-0"
                  title={t.downloadNow}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
