import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-300">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Help & Academic <span className="gradient-text">Support</span>
        </h1>
        <p className="text-xs text-slate-400">Have questions about EduSphere LMS, AI Tutor, or course enrollment? Reach out to our team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 text-center">
          <Mail className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Email Support</h3>
          <p className="text-xs text-slate-400">support@edusphere-ai.edu</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 text-center">
          <Phone className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Academic Helpline</h3>
          <p className="text-xs text-slate-400">+1 (800) 555-EDUSPHERE</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 text-center">
          <MapPin className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Campus Headquarters</h3>
          <p className="text-xs text-slate-400">Silicon Valley Tech Campus, CA</p>
        </div>
      </div>

      {/* Support Ticket Form */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white">Submit Support Ticket</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Message Detail</label>
            <textarea
              rows="4"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          {submitted && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Thank you! Your support ticket has been submitted.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl gradient-bg-primary text-white font-bold text-xs shadow-glow-blue flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Submit Support Request
          </button>
        </form>
      </div>
    </div>
  );
};
