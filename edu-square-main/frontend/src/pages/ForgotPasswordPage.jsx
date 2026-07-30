import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-6 animate-in fade-in duration-300">
      <div className="glass-card p-8 rounded-3xl border border-blue-500/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-bg-primary flex items-center justify-center mx-auto shadow-glow-blue">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Reset Your Password</h2>
          <p className="text-xs text-slate-400">Enter your email and we’ll help you reset your account access.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  placeholder="you@university.edu"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl gradient-bg-primary text-white font-bold text-xs shadow-glow-blue flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Send Reset Link <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
            <p className="font-semibold">Password reset email sent.</p>
            <p className="text-xs text-emerald-200/80">
              We’ve sent a password reset message to <span className="font-semibold">{email || 'your email address'}</span>.
              Please open the email and click the reset link to create a new password.
            </p>
            <div className="rounded-xl border border-emerald-500/30 bg-slate-900/60 p-3 text-[11px] text-emerald-200/90">
              <p className="font-semibold uppercase tracking-wide">Email preview</p>
              <p className="mt-1">Subject: Reset your EduSphere password</p>
              <p className="mt-1">Body: Use the secure link below to set a new password.</p>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-slate-400">
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
