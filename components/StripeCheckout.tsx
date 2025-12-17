
import React, { useState } from 'react';
import { ArrowLeft, Lock, ShieldCheck, CreditCard, Loader2, CheckCircle2, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface Props {
  price: string;
  interval: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const StripeCheckout: React.FC<Props> = ({ price, interval, onSuccess, onCancel }) => {
  const [processing, setProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulation of Stripe API call
    setTimeout(() => {
      setProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8 animate-in zoom-in-95 duration-500 relative overflow-hidden">
        {/* Confetti & Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center space-y-12 relative z-10 max-w-xl">
          <div className="flex justify-center">
            <div className="bg-white/10 p-1 rounded-[3rem] border border-white/20 animate-bounce shadow-2xl shadow-purple-500/20">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-10 rounded-[2.5rem]">
                <CheckCircle2 className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-black uppercase tracking-[0.3em]">
              Payment Confirmed
            </div>
            <h2 className="text-6xl font-black tracking-tighter leading-none">
              Welcome to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Pro Elite 🚀</span>
            </h2>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 text-left max-w-sm mx-auto">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-slate-400 text-sm font-bold">Your Current Plan:</span>
                <span className="bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">UNLIMITED PRO</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium">
                  <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Unlimited prompts unlocked
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Custom templates active
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={onSuccess}
            className="group relative w-full bg-white text-slate-950 font-black px-12 py-6 rounded-3xl hover:bg-slate-100 transition-all shadow-2xl flex items-center justify-center gap-4 text-2xl transform hover:scale-[1.02] active:scale-95"
          >
            Back to Generator
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            A receipt has been sent to your email address
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col md:flex-row animate-in fade-in duration-500">
      {/* Product Summary */}
      <div className="w-full md:w-1/2 bg-slate-50 p-8 md:p-20 flex flex-col justify-between border-r border-slate-100">
        <div className="space-y-12">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase text-xs tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </button>

          <div className="space-y-4">
            <span className="text-purple-600 font-black text-sm uppercase tracking-widest">PromptFlow Pro Subscription</span>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">${price} <span className="text-xl text-slate-400 font-medium">/ {interval}</span></h1>
          </div>

          <div className="flex items-center gap-6 py-8 border-y border-slate-200">
             <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                <CreditCard className="w-10 h-10" />
             </div>
             <div>
                <p className="text-xl font-black">PromptFlow Pro</p>
                <p className="text-slate-500">Unlimited generations & Custom Templates.</p>
             </div>
          </div>

          <div className="space-y-6 pt-4">
             <div className="flex justify-between text-lg font-bold">
                <span className="text-slate-500">Subtotal</span>
                <span>${price}</span>
             </div>
             <div className="flex justify-between text-3xl font-black pt-6 border-t border-slate-200 text-slate-900">
                <span>Total</span>
                <span>${price}</span>
             </div>
          </div>
        </div>

        <div className="mt-16 text-slate-400 text-sm font-medium flex items-center gap-3">
           <p>Secured by <span className="font-black text-slate-600">Stripe</span></p>
        </div>
      </div>

      {/* Payment Form */}
      <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center items-center bg-white">
        <form onSubmit={handlePay} className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Pay by card</h2>
            <p className="text-slate-500 font-medium">Enter your payment details below</p>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="you@email.com"
                required
                className="w-full border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all shadow-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Card Information</label>
              <div className="border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm focus-within:ring-4 focus-within:ring-purple-500/10 focus-within:border-purple-500 transition-all">
                <input 
                  type="text" 
                  placeholder="4242 4242 4242 4242"
                  required
                  className="w-full px-5 py-4 outline-none border-b-2 border-slate-50 font-mono"
                />
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="MM / YY"
                    required
                    className="w-1/2 px-5 py-4 outline-none border-r-2 border-slate-50 font-mono"
                  />
                  <input 
                    type="text" 
                    placeholder="CVC"
                    required
                    className="w-1/2 px-5 py-4 outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Cardholder Name</label>
              <input 
                type="text" 
                placeholder="FULL NAME"
                required
                className="w-full border-2 border-slate-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all shadow-sm font-medium"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={processing}
            className="group relative w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed text-xl transform hover:scale-[1.02] active:scale-95"
          >
            {processing ? <Loader2 className="w-8 h-8 animate-spin" /> : `Pay $${price}`}
          </button>

          <div className="pt-8 flex flex-col items-center gap-4 border-t border-slate-100">
             <div className="flex gap-8">
               <ShieldCheck className="w-8 h-8 text-slate-200" />
               <Lock className="w-8 h-8 text-slate-200" />
             </div>
             <p className="text-[10px] text-slate-400 text-center uppercase font-black tracking-[0.2em] max-w-xs leading-relaxed">
               100% Secure Transaction. We do not store your banking data.
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StripeCheckout;
