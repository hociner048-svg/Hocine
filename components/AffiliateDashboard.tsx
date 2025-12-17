
import React, { useState } from 'react';
import { User } from '../types';
import { 
  Share2, Copy, Check, Users, TrendingUp, Wallet, CreditCard, Save, AlertCircle,
  ArrowUpRight, Clock, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight, BarChart3,
  Percent, FlaskConical
} from 'lucide-react';

interface Props {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const AffiliateDashboard: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [copied, setCopied] = useState(false);
  const [payoutEmail, setPayoutEmail] = useState(user.payoutEmail || '');
  const [payoutMethod, setPayoutMethod] = useState<'card' | 'bank' | 'paypal'>(user.payoutMethod || 'card');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Owner Stats (The Boss)
  const stats = user.ownerStats || {
    totalSales: 0,
    activeSubscribers: 0,
    netRevenue: 0,
    pendingPayout: 0
  };

  const minPayout = 20;
  const canWithdraw = stats.pendingPayout >= minPayout;

  const handleSavePayout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // SIMULATION : Real Stripe API call would happen here
    setTimeout(() => {
      onUpdateUser({
        ...user,
        payoutEmail,
        payoutMethod
      });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleWithdraw = () => {
    if (!canWithdraw) return;
    setIsWithdrawing(true);
    // Transfer simulation
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawSuccess(true);
      setTimeout(() => setWithdrawSuccess(false), 5000);
    }, 2500);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl w-fit mx-auto sm:mx-0">
        <FlaskConical className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-black text-amber-500 uppercase tracking-widest">Simulation Mode / Demo</span>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-widest text-xs">
            <ShieldCheck className="w-4 h-4" />
            SaaS Owner
          </div>
          <h2 className="text-5xl font-black text-white tracking-tight">Earning Boss</h2>
          <p className="text-slate-400 text-lg">
            No 10% commission limits here. Keep <span className="text-white font-bold underline decoration-green-500 underline-offset-4">94% of every sale</span> directly in your pocket.
          </p>
        </div>
        <div className={`px-6 py-2 rounded-full border flex items-center gap-2 text-sm font-bold shadow-lg ${user.payoutEmail ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
          {user.payoutEmail ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {user.payoutEmail ? 'Payouts Active (Demo)' : 'Setup Required'}
        </div>
      </header>

      {/* Breakdown Math Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
          <h3 className="text-xl font-black flex items-center gap-3">
            <Percent className="w-5 h-5 text-purple-400" />
            Profit Breakdown
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-400 font-medium">Customer Payment</span>
              <span className="text-white font-black text-xl">+ $5.00</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-400 font-medium">Stripe Fees (Processing)</span>
              <span className="text-red-400 font-bold">- $0.30</span>
            </div>
            <div className="flex justify-between items-center py-4 bg-white/5 rounded-2xl px-4">
              <span className="text-white font-bold text-lg">Your Net Profit</span>
              <span className="text-green-400 font-black text-2xl">$4.70</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            Note: This is roughly 9x more than a standard 10% affiliate commission ($0.50).
          </p>
        </section>

        <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-[2.5rem] shadow-2xl shadow-green-500/20 space-y-8 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          
          <div className="space-y-2 relative">
            <p className="text-green-100 font-bold text-xs uppercase tracking-widest">Available for Withdrawal (Demo)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-white tracking-tighter">${stats.pendingPayout.toFixed(2)}</span>
              <span className="text-green-200 text-sm font-bold uppercase">USD</span>
            </div>
          </div>

          <button 
            disabled={!canWithdraw || isWithdrawing}
            onClick={handleWithdraw}
            className={`w-full py-6 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-2xl ${
              canWithdraw 
              ? 'bg-white text-slate-900 hover:scale-[1.02]' 
              : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            {isWithdrawing ? <Clock className="w-5 h-5 animate-spin" /> : <ArrowUpRight className="w-6 h-6" />}
            {isWithdrawing ? 'Processing...' : withdrawSuccess ? 'Funds Sent!' : 'Withdraw to My Card'}
          </button>
        </div>
      </div>

      {/* Config Card & Payout */}
      <div className="bg-slate-900 border border-white/10 p-10 rounded-[2.5rem] space-y-8">
        <h3 className="text-2xl font-black text-white flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-green-500" />
          Where should we send your funds?
        </h3>

        <form onSubmit={handleSavePayout} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Payout Method</label>
              <div className="flex gap-2 p-1.5 bg-slate-950 rounded-2xl border border-white/5">
                {(['card', 'paypal', 'bank'] as const).map((method) => (
                  <button 
                    key={method}
                    type="button"
                    onClick={() => setPayoutMethod(method)}
                    className={`flex-1 py-4 rounded-xl text-xs font-black transition-all ${payoutMethod === method ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-400'}`}
                  >
                    {method === 'card' ? 'Debit Card' : method === 'bank' ? 'Bank Account' : 'PayPal'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Stripe Email</label>
              <input 
                type="email" 
                required
                placeholder="boss@yourproject.ai"
                value={payoutEmail}
                onChange={(e) => setPayoutEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-white text-lg"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Banking Details (Simulation)</label>
            <input 
              type="text" 
              required
              placeholder={payoutMethod === 'card' ? 'Card Number (**** **** **** ****)' : 'Routing/IBAN Number'}
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-white font-mono text-xl"
            />
          </div>

          <button 
            type="submit"
            disabled={isSaving}
            className="w-full py-6 rounded-3xl font-black bg-white text-slate-900 hover:bg-slate-100 transition-all transform active:scale-95 shadow-xl text-xl"
          >
            {isSaving ? 'Connecting Account...' : saveSuccess ? 'Account Linked (Demo)!' : 'Link My Boss Card'}
          </button>
        </form>
      </div>

      {/* Global Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Sales', value: stats.totalSales, icon: <TrendingUp className="w-5 h-5" />, color: 'text-blue-400' },
          { label: 'Active Subs', value: stats.activeSubscribers, icon: <Users className="w-5 h-5" />, color: 'text-purple-400' },
          { label: 'Gross Revenue', value: `$${stats.netRevenue.toFixed(2)}`, icon: <BarChart3 className="w-5 h-5" />, color: 'text-green-400' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 space-y-4">
            <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${item.color}`}>
              {item.icon}
              {item.label}
            </div>
            <p className="text-4xl font-black text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateDashboard;
