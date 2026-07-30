import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  BookOpen,
  QrCode,
  Award,
  BarChart3,
  BrainCircuit,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="space-y-24 py-6 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative text-center py-16 px-4 overflow-hidden rounded-3xl glass-card border border-blue-500/20 bg-gradient-to-b from-blue-950/30 via-slate-950 to-purple-950/30">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Next-Generation AI Academic Ecosystem
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Elevate Learning with <span className="gradient-text">EduSphere AI</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            The all-in-one AI platform combining Learning Management (LMS), AI Tutoring, Online Assessments, QR Attendance, and Real-Time Analytics into a unified educational solution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-2xl gradient-bg-primary text-white font-bold text-sm shadow-glow-blue flex items-center gap-2 hover:opacity-90 transition-all scale-105"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/courses"
              className="px-8 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-sm transition-colors"
            >
              Explore Course Catalog
            </Link>
          </div>

          <div className="pt-10 flex items-center justify-center gap-8 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Student, Teacher & Admin Roles</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Powered by OpenAI</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-400" /> Automated Quiz Grading</span>
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Unified Modules for <span className="gradient-text">Modern Academics</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Designed specifically to automate repetitive academic tasks and empower learners with personalized AI guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Learning Management (LMS)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stream video lectures, access downloadable PDF study notes, track progress per lecture, and receive verified certificates upon completion.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Tutor & Content Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              24/7 AI tutor for explaining difficult concepts, generating 4-week study plans, summarizing textbook chapters, and drafting custom quizzes.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">QR Code Attendance Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Daily automated attendance with smart board QR code scanning, monthly performance percentage calculation, and teacher export logs.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment & Analytics Preview */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 w-fit">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Online Assessment & Coding Sandbox</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Timer-based MCQ examinations, automated score generation, interactive coding test sandboxes, and real-time student leaderboards.
          </p>
          <Link
            to="/quizzes"
            className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:underline"
          >
            Try Interactive Quizzes &rarr;
          </Link>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 w-fit">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Student Analytics & AI Suggestions</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Subject-wise radar performance charts, attendance percentage trends, weekly study metrics, and AI-driven personalized improvement tips.
          </p>
          <Link
            to="/analytics"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline"
          >
            Inspect Performance Charts &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};
