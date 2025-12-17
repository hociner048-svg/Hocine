
import React from 'react';
import { Check, Zap, Rocket, Star, ExternalLink, ShieldCheck, Quote, Users } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User;
  onUpgrade: (price: string, interval: string) => void;
}

const Billing: React.FC<Props> = ({ user, onUpgrade }) => {
  const isPro = user.plan === 'pro';

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <header className="text-center space-y-6 max-w-2xl mx-auto">
        <h2 className="text-5xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          {isPro ? "You're a Powerhouse!" : "Upgrade to Pro Now — Unlock Unlimited AI Prompts!"}
        </h2>
        <p className="text-slate-400 text-lg">
          {isPro 
            ? "Your subscription is active and you have unlimited access to all features." 
            : "Stop settling for average. Get the results your content deserves with our Pro tools."}
        </p>
        
        {!isPro && (
          <div className="flex items-center justify-center gap-2 bg-green-500/10 text-green-400 py-2 px-6 rounded-full w-fit mx-auto border border-green-500/20 shadow-lg shadow-green-500/5">
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold">Join 2,000+ Pro users</span>
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
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Subscription</p>
              <p className="text-xl font-black text-white">PromptFlow Pro</p>
              <p className="text-sm text-slate-400">Status: {user.subscriptionStatus || 'Active'}</p>
            </div>
          </div>
          <button 
            onClick={() => alert("Redirecting to Stripe Customer Portal...")}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm text-white"
          >
            Manage via Stripe <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly Plan */}
        <div className={`bg-slate-900 border-2 border-white/10 p-8 rounded-[2.5rem] flex flex-col space-y-8 relative overflow-hidden transition-all hover:border-slate-700 group ${isPro ? 'opacity-50' : ''}`}>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Monthly Access</h3>
            <p className="text-slate-400">Best for short-term projects.</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-white">$5</span>
            <span className="text-slate-500 font-bold">/mo</span>
          </div>
          <ul className="space-y-4 flex-grow">
            {[
              'Unlimited Prompt Generations',
              'Unlock Custom Templates',
              'Advanced Vibe Tuning',
              'Cloud History Sync'
            ].map(feat => (
              <li key={feat} className="flex items-center gap-3 text-slate-300 font-medium">
                <Check className="w-5 h-5 text-green-500" /> {feat}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => onUpgrade("5.00", "month")}
            disabled={isPro}
            className={`w-full py-4 rounded-2xl font-black transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl ${
              isPro 
              ? 'bg-white/5 text-slate-600' 
              : 'bg-white text-slate-950 hover:bg-slate-200'
            }`}
          >
            {isPro ? 'Available' : 'Choose Monthly'}
          </button>
        </div>

        {/* Annual Plan */}
        <div className={`bg-slate-900 border-2 border-orange-500 p-8 rounded-[2.5rem] flex flex-col space-y-8 relative overflow-hidden shadow-2xl shadow-orange-500/10 transition-all hover:shadow-orange-500/20 ${isPro ? 'bg-orange-950/10' : ''}`}>
          <div className="absolute top-6 right-6">
            <div className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              Save 20%
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-orange-400">Annual Pro</h3>
            <p className="text-slate-400">The Ultimate Creator Choice.</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-white">$50</span>
            <span className="text-slate-500 font-bold">/yr</span>
          </div>
          <ul className="space-y-4 flex-grow">
            {[
              'Everything in Monthly',
              'Marketing Launch Roadmap',
              'Priority AI Response',
              'Private Beta Access'
            ].map(feat => (
              <li key={feat} className="flex items-center gap-3 text-white font-medium">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" /> {feat}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => onUpgrade("50.00", "year")}
            disabled={isPro}
            className={`w-full py-4 rounded-2xl font-black shadow-2xl shadow-orange-500/20 transform transition-all hover:scale-[1.02] active:scale-95 ${
              isPro 
              ? 'bg-orange-500/20 text-orange-400 cursor-default' 
              : 'bg-orange-500 text-white hover:bg-orange-400'
            }`}
          >
            {isPro ? 'Current Plan' : 'Pay Now — Get 20% Off'}
          </button>
        </div>
      </div>

      {/* Social Proof Section */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h4 className="text-center text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Loved by creators</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 border border-white/10 p-8 rounded-[2.5rem] space-y-6 relative group hover:border-white/20 transition-all">
            <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5 group-hover:text-white/10 transition-colors" />
            <p className="text-slate-300 text-lg italic leading-relaxed">"PromptFlow changed my TikTok game. I went from struggling with hooks to hitting 50k views consistently in just a week."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 shadow-lg" />
              <div>
                <p className="font-bold text-white">@SarahContent</p>
                <p className="text-sm text-slate-500">Lifestyle Creator</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 p-8 rounded-[2.5rem] space-y-6 relative group hover:border-white/20 transition-all">
            <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5 group-hover:text-white/10 transition-colors" />
            <p className="text-slate-300 text-lg italic leading-relaxed">"The annual plan is a steal. The custom templates alone saved me hours of outreach work for my business."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 shadow-lg" />
              <div>
                <p className="font-bold text-white">Marcus K.</p>
                <p className="text-sm text-slate-500">Tech Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!isPro && (
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-[3rem] border border-white/10 flex flex-col sm:flex-row items-center gap-8 shadow-2xl">
          <div className="bg-blue-500/10 p-5 rounded-[2rem] border border-blue-500/20">
            <Rocket className="w-10 h-10 text-blue-400" />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h4 className="text-2xl font-black text-white">Special Early Bird Offer</h4>
            <p className="text-slate-400 text-lg">Join the waitlist for our next-gen TikTok AI engine. Pro members get instant early access.</p>
          </div>
          <button className="whitespace-nowrap bg-white text-slate-950 font-black px-10 py-4 rounded-2xl hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-xl">
            Learn More
          </button>
        </div>
      )}
    </div>
  );
};

export default Billing;
