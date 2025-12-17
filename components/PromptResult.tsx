
import React, { useState } from 'react';
import { Copy, Check, RotateCcw, ArrowLeft } from 'lucide-react';

interface Props {
  prompt: string;
  onReset: () => void;
  onRegenerate: () => void;
}

const PromptResult: React.FC<Props> = ({ prompt, onReset, onRegenerate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to editor
        </button>
        <div className="flex gap-2">
           <button 
            onClick={onRegenerate}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
            title="Regenerate"
          >
            <RotateCcw className="w-5 h-5 text-slate-300" />
          </button>
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              copied ? 'bg-green-600 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Prompt
              </>
            )}
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden min-h-[300px]">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Zap className="w-32 h-32 text-white" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">Your Refined Prompt</h3>
            <div className="text-lg sm:text-xl text-slate-200 leading-relaxed whitespace-pre-wrap font-medium">
              {prompt}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-4">
        <div className="p-2 bg-blue-500/20 rounded-xl mt-1">
          <Zap className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="font-bold text-blue-200">Pro Tip</h4>
          <p className="text-blue-300/80 text-sm">Paste this into ChatGPT, Claude or Gemini for high-quality, professional results every time.</p>
        </div>
      </div>
    </div>
  );
};

// Help helper icon inside result
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export default PromptResult;
