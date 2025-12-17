
import React, { useState } from 'react';
import { User } from '../types';
import { 
  Share2, Copy, Check, Users, Gift, Star, ShieldCheck, 
  ArrowRight, BarChart3, Percent, Heart, Sparkles
} from 'lucide-react';

interface Props {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const AffiliateDashboard: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [copied, setCopied] = useState(false);

  const stats = user.referralStats || {
    inviteCount: 0,
    discountLevel: 0,
    unlockedMonths: 0,
    hasLifetimeBadge: false
  };

  const referralLink = `https://promptflow.ai/ref=${user.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const milestones = [
    { count: 1, label: 'Invite 1 Friend', reward: '20% Off Next Month', icon: <Percent className="w-5 h-5" />, reached: stats.inviteCount >= 1 },
    { count: 3, label: 'Invite 3 Friends', reward: '1 Month Pro FREE', icon: <Sparkles className="w-5 h-5" />, reached: stats.inviteCount >= 3 },
    { count: 5, label: 'Invite 5 Friends', reward: 'Lifetime Founder Badge', icon: <ShieldCheck className="w-5 h-5" />, reached: stats.inviteCount >= 5 },
    { count: 10, label: 'Invite 10 Friends', reward: 'Permanent 50% Discount', icon: <Star className="w-5 h-5" />, reached: stats.inviteCount >= 10 },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-widest text-xs">
            <Gift className="w-4 h-4" />
            Referral Rewards
          </div>
          <h2 className="text-5xl font-black text-white tracking-tight">Invite & Unlock</h2>
          <p className="text-slate-400 text-lg">
            Share PromptFlow with your network. No cash payouts, just <span className="text-white font-bold underline decoration-purple-500 underline-offset-4">massive discounts</span> and free Pro access.
          </p>
        </div>
        <div className="px-6 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center gap-2 text-sm font-bold shadow-lg text-purple-400">
          <Users className="w-4 h-4" />
          {stats.inviteCount} Friends Invited
        </div>
      </header>

      {/* Referral Link Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-10 rounded-[2.5rem] space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none -mr-10 -mt-10">
          <Share2 className="w-64 h-64 text-white" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            Your Magic Link
          </h3>
          <p className="text-slate-400 font-medium">When friends sign up using this link, you both unlock rewards.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 font-mono text-purple-300 text-lg truncate">
              {referralLink}
            </div>
            <button 
              onClick={copyToClipboard}
              className={`px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                copied ? 'bg-green-500 text-white' : 'bg-white text-slate-950 hover:bg-slate-100'
              }`}
            >
              {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      </div>

      {/* Reward Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m, i) => (
          <div 
            key={i} 
            className={`p-8 rounded-[2.5rem] border transition-all space-y-6 flex flex-col justify-between ${
              m.reached 
              ? 'bg-purple-500/10 border-purple-500/30 shadow-xl shadow-purple-500/5' 
              : 'bg-slate-900/50 border-white/5 opacity-60'
            }`}
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.reached ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                {m.icon}
              </div>
              <div>
                <h4 className={`text-sm font-black uppercase tracking-widest ${m.reached ? 'text-purple-400' : 'text-slate-500'}`}>{m.label}</h4>
                <p className="text-xl font-black text-white leading-tight">{m.reward}</p>
              </div>
            </div>
            
            <div className="pt-4 flex items-center gap-2">
              {m.reached ? (
                <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold uppercase tracking-widest">
                  <Check className="w-4 h-4" /> Unlocked
                </div>
              ) : (
                <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                  {stats.inviteCount} / {m.count} Done
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Summary */}
      <div className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-white/5 space-y-8">
        <h3 className="text-2xl font-black text-white flex items-center gap-3">
          <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
          Why Refer?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="font-bold text-white text-lg">For You</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                Stack discounts up to 100% (Lifetime Pro).
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                Unlock exclusive Founder Badges in the app.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-white text-lg">For Your Friends</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                Immediate 10% discount on their first month.
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                Entry to the private Pro Discord community.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
