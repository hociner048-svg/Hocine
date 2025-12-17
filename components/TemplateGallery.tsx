
import React, { useState } from 'react';
import { TEMPLATES } from '../constants';
import { Template, Category, User } from '../types';
import { Plus, X, Trash2, Lock } from 'lucide-react';

interface Props {
  user: User;
  onSelect: (template: Template) => void;
  customTemplates: Template[];
  onAddTemplate: (template: Template) => void;
  onDeleteTemplate?: (id: string) => void;
  onUpgrade: () => void;
}

const TemplateGallery: React.FC<Props> = ({ user, onSelect, customTemplates, onAddTemplate, onDeleteTemplate, onUpgrade }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTpl, setNewTpl] = useState<Partial<Template>>({
    name: '',
    category: 'TikTok',
    objective: '',
    icon: '✨'
  });

  const isPro = user.plan === 'pro';

  const handleOpenModal = () => {
    if (!isPro) {
      onUpgrade();
      return;
    }
    setIsModalOpen(true);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTpl.name || !newTpl.objective) return;
    onAddTemplate({
      ...newTpl as Template,
      id: crypto.randomUUID(),
      isCustom: true
    });
    setIsModalOpen(false);
    setNewTpl({ name: '', category: 'TikTok', objective: '', icon: '✨' });
  };

  const categories: Category[] = ['TikTok', 'Business', 'Gaming', 'Lifestyle', 'Study'];

  const renderCard = (template: Template) => (
    <div
      key={template.id}
      className="group relative bg-slate-900/50 border border-white/10 rounded-3xl p-6 text-left hover:border-purple-500/50 hover:bg-slate-900 transition-all transform hover:-translate-y-1"
    >
      <button
        onClick={() => onSelect(template)}
        className="w-full text-left"
      >
        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110 duration-300">
          {template.icon}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{template.category}</span>
            {template.isCustom && <span className="bg-blue-500/10 text-blue-400 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Custom</span>}
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{template.name}</h3>
          <p className="text-slate-500 text-sm leading-snug line-clamp-2">{template.objective}</p>
        </div>
      </button>
      
      {template.isCustom && onDeleteTemplate && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTemplate(template.id);
          }}
          className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete custom template"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          <h2 className="text-4xl font-black">Templates</h2>
          <p className="text-slate-400 text-lg max-w-xl">Speed up your workflow with pro-built frameworks or build your own library.</p>
        </div>
        <button 
          onClick={handleOpenModal}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all transform hover:scale-105 active:scale-95 ${
            isPro ? 'bg-white text-slate-950 hover:bg-slate-200' : 'bg-purple-600 text-white'
          }`}
        >
          {isPro ? <Plus className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          {isPro ? 'Create Template' : 'Unlock Custom Templates'}
        </button>
      </header>

      {customTemplates.length > 0 && isPro && (
        <section className="space-y-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            My Custom Templates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customTemplates.map(renderCard)}
          </div>
        </section>
      )}

      <section className="space-y-6">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          Official Library
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map(renderCard)}
        </div>
      </section>

      {/* Modal - only accessible if isPro */}
      {isModalOpen && isPro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-lg p-8 space-y-6 relative shadow-2xl overflow-hidden">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black">New Template</h2>
              <p className="text-slate-400">Save your favorite structures locally.</p>
            </div>

            <form onSubmit={handleAdd} className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Icon</label>
                  <input 
                    type="text" 
                    value={newTpl.icon} 
                    onChange={e => setNewTpl({...newTpl, icon: e.target.value})}
                    placeholder="✨" 
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-center text-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                  />
                </div>
                <div className="col-span-3 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Template Name</label>
                  <input 
                    type="text" 
                    required
                    value={newTpl.name}
                    onChange={e => setNewTpl({...newTpl, name: e.target.value})}
                    placeholder="e.g. Street Interviewer" 
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewTpl({...newTpl, category: cat})}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${newTpl.category === cat ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-500'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Standard Objective</label>
                <textarea 
                  required
                  value={newTpl.objective}
                  onChange={e => setNewTpl({...newTpl, objective: e.target.value})}
                  placeholder="e.g. Act like a street interviewer asking tough questions..." 
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                />
              </div>

              <button type="submit" className="w-full bg-white text-slate-950 font-black py-4 rounded-2xl shadow-xl transform active:scale-95 transition-all">
                Save Template
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;
