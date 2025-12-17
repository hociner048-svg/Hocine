
import React, { useState, useEffect } from 'react';
import { PromptRequest, Tone, DetailLevel, Category } from '../types';
import { TONES, DETAILS } from '../constants';
import { SendHorizontal } from 'lucide-react';

interface Props {
  onGenerate: (req: PromptRequest) => void;
  loading: boolean;
  initialData?: Partial<PromptRequest>;
}

const PromptForm: React.FC<Props> = ({ onGenerate, loading, initialData }) => {
  const [objective, setObjective] = useState('');
  const [subject, setSubject] = useState('');
  const [tone, setTone] = useState<Tone>('viral');
  const [detail, setDetail] = useState<DetailLevel>('medium');
  const [category, setCategory] = useState<Category>('TikTok');

  useEffect(() => {
    if (initialData) {
      if (initialData.objective) setObjective(initialData.objective);
      if (initialData.category) setCategory(initialData.category);
      if (initialData.subject) setSubject(initialData.subject);
      if (initialData.tone) setTone(initialData.tone);
      if (initialData.detail) setDetail(initialData.detail);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objective || !subject) return;
    onGenerate({ objective, subject, tone, detail, category });
  };

  const categories: Category[] = ['TikTok', 'Business', 'Gaming', 'Lifestyle', 'Study'];

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/50 p-6 sm:p-8 rounded-[2.5rem] border border-white/10 space-y-6 shadow-2xl backdrop-blur-sm animate-in zoom-in-95 duration-300">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  category === cat ? 'bg-white text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Your Goal</label>
          <input
            type="text"
            placeholder="e.g., Create a viral hook for a video"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-700"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Subject Details</label>
          <textarea
            placeholder="Tell me more... What's the main topic?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all h-32 resize-none placeholder:text-slate-700"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">The Vibe</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none"
            >
              {TONES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Length</label>
            <select
              value={detail}
              onChange={(e) => setDetail(e.target.value as DetailLevel)}
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none"
            >
              {DETAILS.map(d => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 text-xl shadow-2xl shadow-purple-600/30 transition-all transform hover:scale-[1.02] active:scale-95"
      >
        {loading ? 'Cooking...' : (
          <>
            Generate Prompt
            <SendHorizontal className="w-6 h-6" />
          </>
        )}
      </button>
    </form>
  );
};

export default PromptForm;
