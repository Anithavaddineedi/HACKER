import React, { useState } from 'react';
import { api } from '../../services/api';
import { Bot, Send, Sparkles, BookOpen, Lightbulb, FileText, Calendar, Copy, Check } from 'lucide-react';

export const AITutorChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello Alex! I am **EduSphere AI**, your personalized learning tutor. I can answer your academic questions, explain complex concepts, generate study plans, or summarize notes. How can I assist your learning today?',
      timestamp: 'Just now'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [activeMode, setActiveMode] = useState('chat'); // 'chat', 'explain', 'summary', 'study_plan', 'notes'
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const quickPrompts = [
    { label: 'Explain Backpropagation', prompt: 'Explain how Backpropagation algorithm works with a simple analogy.', mode: 'explain' },
    { label: 'Generate 4-Week ML Plan', prompt: 'Create a 4-week study plan for Advanced Machine Learning.', mode: 'study_plan' },
    { label: 'Summarize React Hooks', prompt: 'Summarize key benefits and usage of React custom hooks.', mode: 'summary' },
    { label: 'Generate CS Study Notes', prompt: 'Generate comprehensive study notes on Graph Algorithms.', mode: 'notes' }
  ];

  const handleSendMessage = async (promptOverride, modeOverride) => {
    const promptToSend = promptOverride || inputPrompt;
    const mode = modeOverride || activeMode;

    if (!promptToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      let aiRes;
      if (mode === 'notes') {
        aiRes = await api.generateNotesAI(promptToSend);
      } else {
        aiRes = await api.askAITutor(promptToSend, mode);
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiRes.response || 'I am ready to assist with your question!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col glass-card rounded-3xl border border-purple-500/30 overflow-hidden animate-in fade-in">
      {/* Header Bar */}
      <div className="p-4 md:p-6 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              EduSphere AI Tutor <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">GPT-4 Enabled</span>
            </h2>
            <p className="text-xs text-slate-400">Personalized 24/7 Academic Guidance & Content Generator</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'chat', label: 'Q&A Chat', icon: Bot },
            { id: 'explain', label: 'Explainer', icon: Lightbulb },
            { id: 'summary', label: 'Summarizer', icon: FileText },
            { id: 'study_plan', label: 'Study Plan', icon: Calendar },
          ].map(m => {
            const Icon = m.icon;
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  isActive ? 'bg-purple-600 text-white shadow-glow-purple font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider shrink-0">Suggestions:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.prompt, qp.mode)}
            className="shrink-0 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs leading-relaxed relative group ${
                isUser
                  ? 'gradient-bg-primary text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>
                <div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-white/10 text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => copyToClipboard(msg.id, msg.text)}
                      className="hover:opacity-100 flex items-center gap-1 transition-opacity"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              EduSphere AI is generating structured answer...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3">
        <input
          type="text"
          placeholder={`Ask AI Tutor to ${activeMode === 'explain' ? 'explain a difficult concept...' : activeMode === 'summary' ? 'summarize textbook notes...' : activeMode === 'study_plan' ? 'build a personalized study plan...' : 'answer questions...'}`}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
        />
        <button
          type="submit"
          disabled={isLoading || !inputPrompt.trim()}
          className="px-5 py-3 rounded-2xl gradient-bg-primary text-white text-xs font-bold shadow-glow-purple flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
