
import React from 'react';
import { Check, Zap, Rocket, Star, ExternalLink, ShieldCheck, Quote, Users, Sparkles, Lock } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User;
  onUpgrade: (price: string, interval: string) => void;
}

const Billing: React.FC<Props> = ({ user, onUpgrade }) => {
  const isPro = user.plan === 'pro';

  const proFeatures = [
    'Unlimited Prompt Generations',
    'Custom Saved Templates',
    'Advanced High-Fidelity Tuning',
    'Priority AI Response Times',
    'Cloud History Syncing',
    'Founder Role on Discord',
    'No more prompt limits'
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <header className="text-center space-y-6 max-w-2xl mx-auto">
        <h2 className="text-5xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          {isPro ? "You're a Powerhouse!" : "Upgrade to Pro — Unlock the AI Secret Sauce"}
        </h2>
        <p className="text-slate-400 text-lg">
          {isPro 
            ? "Your subscription is active. You have full unlimited access." 
            : "Average prompts get average results. Pro prompts build empires."}
        </p>
        
        {!isPro && (
          <div className="flex items-center justify-center gap-2 bg-green-500/10 text-green-400 py-2 px-6 rounded-full w-fit mx-auto border border-green-500/20 shadow-lg shadow-green-500/5">
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold">Join 5,000+ creators on Pro</span>
          </div>
        )}
      </header>

      {isPro && (
        <div className="max-w-4xl mx-auto bg-slate-900 border border-purple-500/30 p-8 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-purple-500/10">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/20 p-4 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Plan Active</p>
              <p className="text-xl font-black text-white">PromptFlow Pro</p>
              <p className="text-sm text-slate-400">Subscription ID: {user.subscriptionId || 'Founders Club'}</p>
            </div>
          </div>
          <button 
            onClick={() => alert("Redirecting to Customer Portal...")}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm text-white"
          >
            Manage Billing <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Value Panel Layout */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Pricing Plans */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {/* Monthly Plan */}
          <div className={`bg-slate-900 border-2 border-white/10 p-8 rounded-[2.5rem] flex flex-col space-y-8 relative overflow-hidden transition-all hover:border-slate-700 group ${isPro ? 'opacity-50' : ''}`}>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Monthly</h3>
              <p className="text-slate-400">Cancel anytime.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">$5</span>
              <span className="text-slate-500 font-bold">/mo</span>
            </div>
            <button 
              onClick={() => onUpgrade("5.00", "month")}
              disabled={isPro}
              className={`w-full py-5 rounded-2xl font-black transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl ${
                isPro 
                ? 'bg-white/5 text-slate-600' 
                : 'bg-white text-slate-950 hover:bg-slate-200'
              }`}
            >
              {isPro ? 'Purchased' : 'Choose Monthly'}
            </button>
            <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest">Instant Activation</p>
          </div>

          {/* Annual Plan */}
          <div className={`bg-slate-900 border-2 border-purple-500 p-8 rounded-[2.5rem] flex flex-col space-y-8 relative overflow-hidden shadow-2xl shadow-purple-500/10 transition-all hover:shadow-purple-500/20 ${isPro ? 'bg-purple-950/10' : ''}`}>
            <div className="absolute top-6 right-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Save 20%
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-purple-400">Annual Pro</h3>
              <p className="text-slate-400">Most Popular Choice.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">$50</span>
              <span className="text-slate-500 font-bold">/yr</span>
            </div>
            <button 
              onClick={() => onUpgrade("50.00", "year")}
              disabled={isPro}
              className={`w-full py-5 rounded-2xl font-black shadow-2xl shadow-purple-500/20 transform transition-all hover:scale-[1.02] active:scale-95 ${
                isPro 
                ? 'bg-purple-500/20 text-purple-400 cursor-default' 
                : 'bg-purple-600 text-white hover:bg-purple-500'
              }`}
            >
              {isPro ? 'Current Plan' : 'Pay Now — Best Value'}
            </button>
            <p className="text-[10px] text-purple-400/80 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Includes Launch Roadmap
            </p>
          </div>
        </div>

        {/* Right Side: What you unlock (Value Panel) */}
        <div className="w-full lg:w-[350px] lg:sticky lg:top-32 bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
          <div className="space-y-2">
             <h3 className="text-xl font-black text-white flex items-center gap-2">
               <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
               What you unlock
             </h3>
             <p className="text-slate-500 text-sm font-medium">Power features for power users.</p>
          </div>

          <ul className="space-y-4">
            {proFeatures.map((feat, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 font-bold text-sm">
                <div className="mt-1 bg-green-500/20 rounded-full p-0.5">
                   <Check className="w-3 h-3 text-green-400" />
                </div>
                {feat}
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-white/5">
             <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-2xl border border-white/5">
               <div className="bg-purple-500/20 p-2 rounded-xl">
                 <Rocket className="w-5 h-5 text-purple-400" />
               </div>
               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Unlock everything in 10 seconds</p>
             </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h4 className="text-center text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Loved by the community</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 border border-white/10 p-8 rounded-[2.5rem] space-y-6 relative group hover:border-white/20 transition-all">
            <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5 group-hover:text-white/10 transition-colors" />
            <p className="text-slate-300 text-lg italic leading-relaxed">"The annual plan is a no-brainer. The launch roadmap alone saved me thousands in marketing mistakes."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 shadow-lg" />
              <div>
                <p className="font-bold text-white">Alex Riv</p>
                <p className="text-sm text-slate-500">SaaS Founder</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 p-8 rounded-[2.5rem] space-y-6 relative group hover:border-white/20 transition-all">
            <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5 group-hover:text-white/10 transition-colors" />
            <p className="text-slate-300 text-lg italic leading-relaxed">"PromptFlow Pro is my unfair advantage. Every hook I generate now goes viral."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 shadow-lg" />
              <div>
                <p className="font-bold text-white">@CreatorMo</p>
                <p className="text-sm text-slate-500">TikTok Growth Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Billing;
