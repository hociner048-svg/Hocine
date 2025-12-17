
import React from 'react';
// Fixed: Removed non-existent icon 'TikTok' and unused 'Instagram' from lucide-react imports
import { MessageSquare, Flame, CheckCircle2 } from 'lucide-react';

const LaunchPlan: React.FC = () => {
  const steps = [
    {
      title: 'Phase 1: Build the Hype',
      platform: 'TikTok',
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      tasks: [
        'Post "Wait list" teaser video using a viral sound.',
        'Share behind-the-scenes building your first prompt.',
        'Pin a comment explaining what PromptFlow does.'
      ]
    },
    {
      title: 'Phase 2: The Soft Launch',
      platform: 'Discord / Instagram',
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      tasks: [
        'Give 10 "VIP" codes to your top Discord members.',
        'Post a "Poll" on IG Stories: What niche should we add next?',
        'Create a "Prompt of the Day" series on Threads.'
      ]
    },
    {
      title: 'Phase 3: Scale to Viral',
      platform: 'All Channels',
      icon: <Rocket className="w-6 h-6 text-purple-500" />,
      tasks: [
        'Run a contest: Best prompt generated wins $100.',
        'Reach out to 3 micro-influencers for a collab.',
        'Post on Product Hunt (Tuesday @ Midnight PST).'
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4 max-w-2xl">
        <h2 className="text-4xl font-black">Creator Launch Strategy</h2>
        <p className="text-slate-400 text-lg">You have the prompts. Now get the attention. Follow this roadmap to scale your project.</p>
      </header>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <div key={idx} className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 -mr-8 -mt-8 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
               {step.icon}
            </div>
            
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 bg-white/5 border border-white/10 w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black">
                {idx + 1}
              </div>
              
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-2xl font-black text-white">{step.title}</h3>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{step.platform}</span>
                </div>
                
                <ul className="space-y-4">
                  {step.tasks.map((task, tidx) => (
                    <li key={tidx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-300 font-medium">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-1 rounded-[2.5rem]">
        <div className="bg-slate-950 rounded-[2.4rem] p-8 text-center space-y-4">
          <h4 className="text-2xl font-black">Ready to go live?</h4>
          <p className="text-slate-400 max-w-md mx-auto">Our Pro members get a custom media kit and access to our Private Discord for direct feedback.</p>
          <button className="bg-white text-slate-950 font-black px-10 py-4 rounded-2xl hover:scale-105 transition-all active:scale-95">
            Download Media Kit
          </button>
        </div>
      </div>
    </div>
  );
};

const Rocket = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default LaunchPlan;
