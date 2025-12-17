
import React, { useState } from 'react';
import { Zap, Mail, Github } from 'lucide-react';
import { User } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

const Auth: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: crypto.randomUUID(),
      email: email || 'user@example.com',
      name: name || 'Future Creator',
      plan: 'free',
      promptsCount: 0,
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      ownerStats: {
        totalSales: 0,
        activeSubscribers: 0,
        netRevenue: 0,
        pendingPayout: 0
      }
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-3xl shadow-2xl shadow-purple-500/20 mb-4 animate-bounce">
            <Zap className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white">PromptFlow</h1>
          <p className="text-slate-400">Transform your ideas into perfect AI prompts.</p>
        </div>

        <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
          <div className="flex gap-4 p-1.5 bg-slate-950 rounded-2xl border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-700"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email" 
                required
                placeholder="you@creators.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-700"
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-700"
                />
              </div>
            )}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-purple-600/20 transition-all transform active:scale-95"
            >
              {isLogin ? 'Enter' : 'Start for Free'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-slate-900 px-3 text-slate-500">Quick Login</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
              <Github className="w-4 h-4" /> Github
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm">
              <Mail className="w-4 h-4" /> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
