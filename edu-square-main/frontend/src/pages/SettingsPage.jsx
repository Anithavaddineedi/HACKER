import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Settings, User, Key, Moon, Sun, Bell, Save, Shield } from 'lucide-react';

export const SettingsPage = () => {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useState(localStorage.getItem('edusphere_openai_key') || '');
  const [name, setName] = useState(user?.name || 'Alex Johnson');
  const [email, setEmail] = useState(user?.email || 'student@edusphere.com');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('edusphere_openai_key', apiKey);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Platform Settings & Profile</h1>
            <p className="text-xs text-slate-400">Manage account credentials, OpenAI API key, and theme preferences</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" /> User Profile Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* OpenAI Integration Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-purple-400" /> OpenAI API Configuration
            </h3>
            <p className="text-xs text-slate-400">
              Optionally provide your OpenAI API key to use live GPT models. If left blank, EduSphere will automatically use its built-in intelligent fallback engine.
            </p>
            <input
              type="password"
              placeholder="sk-proj-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          {/* Theme Preferences */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Moon className="w-4 h-4 text-amber-400" /> Interface Customization
            </h3>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <p className="text-xs font-semibold text-white">Dark Mode Aesthetics</p>
                <p className="text-[11px] text-slate-400">Toggle dark glassmorphism color palette</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                {darkMode ? 'Dark Mode Enabled' : 'Light Mode Enabled'}
              </button>
            </div>
          </div>

          {savedNotice && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              ✅ Settings and OpenAI configuration saved!
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl gradient-bg-primary text-white font-bold text-xs shadow-glow-blue flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};
