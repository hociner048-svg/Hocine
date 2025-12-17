
import React from 'react';
import { HistoryItem } from '../types';
import { Trash2, Copy, Calendar } from 'lucide-react';

interface Props {
  items: HistoryItem[];
  onClear: () => void;
}

const History: React.FC<Props> = ({ items, onClear }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
          <Calendar className="w-10 h-10 text-slate-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">No history yet</h3>
          <p className="text-slate-500">Your generated prompts will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">History</h2>
          <p className="text-slate-400">Review and re-copy your previous work.</p>
        </div>
        <button 
          onClick={onClear}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-semibold"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </header>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 hover:bg-slate-900 transition-all group">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-white/10 text-slate-300 px-2 py-0.5 rounded uppercase tracking-widest">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase tracking-widest">
                    {item.tone}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">{item.objective}</h3>
                <p className="text-slate-500 text-xs">{new Date(item.timestamp).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => copyToClipboard(item.generatedPrompt)}
                className="p-3 bg-white/5 hover:bg-purple-600 text-slate-400 hover:text-white rounded-2xl transition-all"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-slate-950/50 rounded-2xl p-4 text-slate-400 text-sm line-clamp-3 group-hover:line-clamp-none transition-all">
              {item.generatedPrompt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
