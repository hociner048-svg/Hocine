
import React, { useState, useEffect } from 'react';
import { HistoryItem, PromptRequest, Template, User } from './types';
import { TEMPLATES } from './constants';
import { generatePromptAction } from './geminiService';
import PromptForm from './components/PromptForm';
import PromptResult from './components/PromptResult';
import TemplateGallery from './components/TemplateGallery';
import History from './components/History';
import Auth from './components/Auth';
import Billing from './components/Billing';
import LaunchPlan from './components/LaunchPlan';
import AffiliateDashboard from './components/AffiliateDashboard';
import StripeCheckout from './components/StripeCheckout';
import { Sparkles, History as HistoryIcon, LayoutGrid, Zap, CreditCard, Rocket, LogOut, BarChart3 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'create' | 'templates' | 'history' | 'billing' | 'launch' | 'affiliate' | 'checkout'>('create');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);
  const [currentRequest, setCurrentRequest] = useState<PromptRequest | null>(null);
  const [templatePreload, setTemplatePreload] = useState<Partial<PromptRequest> | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<{ amount: string; interval: string } | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('promptflow_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedTemplates = localStorage.getItem('promptflow_custom_templates');
    if (savedTemplates) setCustomTemplates(JSON.parse(savedTemplates));

    const savedUser = localStorage.getItem('promptflow_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('promptflow_user', JSON.stringify(updatedUser));
  };

  const handleGenerate = async (request: PromptRequest) => {
    if (!user) return;
    
    if (user.plan === 'free' && user.promptsCount >= 5) {
      setView('billing');
      return;
    }

    setLoading(true);
    setResult(null);
    setCurrentRequest(request);
    try {
      const generated = await generatePromptAction(request);
      setResult(generated);
      
      const newItem: HistoryItem = {
        ...request,
        id: crypto.randomUUID(),
        generatedPrompt: generated,
        timestamp: Date.now()
      };
      
      const newHistory = [newItem, ...history].slice(0, 50);
      setHistory(newHistory);
      localStorage.setItem('promptflow_history', JSON.stringify(newHistory));

      const updatedUser = { ...user, promptsCount: user.promptsCount + 1 };
      handleUpdateUser(updatedUser);
    } catch (err) {
      alert("Something went wrong. Make sure you have an API key configured.");
    } finally {
      setLoading(false);
    }
  };

  const useTemplate = (template: Template) => {
    setTemplatePreload({
      objective: template.objective,
      category: template.category
    });
    setResult(null);
    setView('create');
  };

  const addCustomTemplate = (template: Template) => {
    const newTemplates = [template, ...customTemplates];
    setCustomTemplates(newTemplates);
    localStorage.setItem('promptflow_custom_templates', JSON.stringify(newTemplates));
  };

  const deleteCustomTemplate = (id: string) => {
    const newTemplates = customTemplates.filter(t => t.id !== id);
    setCustomTemplates(newTemplates);
    localStorage.setItem('promptflow_custom_templates', JSON.stringify(newTemplates));
  };

  const handleUpgradeInitiate = (price: string, interval: string) => {
    setSelectedPrice({ amount: price, interval });
    setView('checkout');
  };

  const handlePaymentSuccess = () => {
    if (user) {
      const updated: User = { 
        ...user, 
        plan: 'pro',
        subscriptionId: `sub_${Math.random().toString(36).substr(2, 9)}`,
        subscriptionStatus: 'active',
        ownerStats: {
          ...user.ownerStats,
          totalSales: user.ownerStats.totalSales + 1,
          activeSubscribers: user.ownerStats.activeSubscribers + 1,
          netRevenue: user.ownerStats.netRevenue + 5.00,
          pendingPayout: user.ownerStats.pendingPayout + 4.70
        }
      };
      handleUpdateUser(updated);
      setView('create');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('promptflow_user');
  };

  if (!user) {
    return <Auth onLogin={(u) => {
      setUser(u);
      localStorage.setItem('promptflow_user', JSON.stringify(u));
    }} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Navigation */}
      {view !== 'checkout' && (
        <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('create')}>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg shadow-purple-500/20">
                <Zap className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                PromptFlow
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-4">
              <button onClick={() => setView('create')} className={`nav-btn ${view === 'create' ? 'active' : ''}`}><Sparkles className="w-4 h-4" /><span className="hidden lg:inline">Create</span></button>
              <button onClick={() => setView('templates')} className={`nav-btn ${view === 'templates' ? 'active' : ''}`}><LayoutGrid className="w-4 h-4" /><span className="hidden lg:inline">Templates</span></button>
              <button onClick={() => setView('history')} className={`nav-btn ${view === 'history' ? 'active' : ''}`}><HistoryIcon className="w-4 h-4" /><span className="hidden lg:inline">History</span></button>
              <button onClick={() => setView('affiliate')} className={`nav-btn ${view === 'affiliate' ? 'active' : ''}`}><BarChart3 className="w-4 h-4" /><span className="hidden lg:inline">Earnings</span></button>
              <button onClick={() => setView('launch')} className={`nav-btn ${view === 'launch' ? 'active' : ''}`}><Rocket className="w-4 h-4" /><span className="hidden lg:inline">Launch</span></button>
              <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />
              <button onClick={() => setView('billing')} className={`nav-btn ${view === 'billing' ? 'active' : ''}`}>
                <CreditCard className="w-4 h-4" />
                {user.plan === 'pro' && <span className="bg-purple-500 text-[10px] px-1.5 py-0.5 rounded ml-1 uppercase font-bold">Pro</span>}
              </button>
              <button onClick={handleLogout} className="nav-btn text-red-400 hover:bg-red-500/10"><LogOut className="w-4 h-4" /></button>
            </div>
          </div>
        </nav>
      )}

      <main className={`flex-grow ${view === 'checkout' ? '' : 'max-w-6xl mx-auto w-full px-6 py-12'}`}>
        {view === 'create' && (
          <div className="space-y-12 max-w-2xl mx-auto">
            <header className="text-center space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight">
                Boost your <span className="text-purple-400">AI prompts</span>
              </h1>
              <p className="text-slate-400 text-lg">
                Hey {user.name.split(' ')[0]}! {user.plan === 'free' ? `${5 - user.promptsCount} prompts left today.` : 'Unlimited Pro mode active.'}
              </p>
            </header>

            <div className="space-y-8">
              {!result && (
                <PromptForm 
                  onGenerate={handleGenerate} 
                  loading={loading} 
                  initialData={templatePreload || undefined} 
                />
              )}

              {loading && !result && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-purple-400 font-medium animate-pulse">Cooking your perfect prompt...</p>
                </div>
              )}

              {result && (
                <PromptResult 
                  prompt={result} 
                  onReset={() => {
                    setResult(null);
                    setCurrentRequest(null);
                    setTemplatePreload(null);
                  }}
                  onRegenerate={() => currentRequest && handleGenerate(currentRequest)}
                />
              )}
            </div>
          </div>
        )}

        {view === 'templates' && (
          <TemplateGallery 
            user={user}
            onSelect={useTemplate} 
            customTemplates={customTemplates}
            onAddTemplate={addCustomTemplate}
            onDeleteTemplate={deleteCustomTemplate}
            onUpgrade={() => setView('billing')}
          />
        )}

        {view === 'history' && <History items={history} onClear={() => { setHistory([]); localStorage.removeItem('promptflow_history'); }} />}
        
        {view === 'billing' && (
          <Billing 
            user={user} 
            onUpgrade={handleUpgradeInitiate} 
          />
        )}

        {view === 'checkout' && selectedPrice && (
          <StripeCheckout 
            price={selectedPrice.amount} 
            interval={selectedPrice.interval}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setView('billing')}
          />
        )}

        {view === 'launch' && <LaunchPlan />}
        {view === 'affiliate' && <AffiliateDashboard user={user} onUpdateUser={handleUpdateUser} />}
      </main>

      {view !== 'checkout' && (
        <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm">
          <p>© 2024 PromptFlow. Built for the next generation of creators.</p>
        </footer>
      )}

      <style>{`
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          transition: all 0.2s;
          color: #94a3b8;
          font-weight: 600;
        }
        .nav-btn:hover {
          color: white;
          background-color: rgba(255, 255, 255, 0.05);
        }
        .nav-btn.active {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default App;
