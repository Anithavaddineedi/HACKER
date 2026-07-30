import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  BrainCircuit,
  CalendarCheck,
  BarChart3,
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';

export const HomePage = () => {
  const { user } = useAuth();

  const quickLinks = [
    { title: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard, desc: 'Overview of courses, grades, and upcoming tasks.', color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400' },
    { title: 'LMS Courses', path: '/courses', icon: BookOpen, desc: 'Watch video lectures and download study notes.', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400' },
    { title: 'AI Tutor Chat', path: '/ai-tutor', icon: Bot, desc: 'Ask questions & generate custom study plans.', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400' },
    { title: 'Assessments & Quizzes', path: '/quizzes', icon: BrainCircuit, desc: 'Attempt MCQ tests and live coding sandbox.', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400' },
    { title: 'Attendance Log', path: '/attendance', icon: CalendarCheck, desc: 'Scan QR code attendance and check monthly logs.', color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400' },
    { title: 'Analytics Center', path: '/analytics', icon: BarChart3, desc: 'Review performance charts and AI suggestions.', color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Home Header */}
      <div className="glass-card p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-purple-950/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to EduSphere AI
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Hello, <span className="gradient-text">{user?.name || 'Academic Learner'}</span>
            </h1>
            <p className="text-slate-300 mt-2 text-sm max-w-xl">
              You are currently logged into the <strong className="text-blue-400 capitalize">{user?.role || 'student'} Portal</strong>. Select any module below to begin.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-2xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Go to {user?.role === 'admin' ? 'Admin' : user?.role === 'teacher' ? 'Faculty' : 'Student'} Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Module Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`p-6 rounded-3xl glass-card border bg-gradient-to-br ${item.color} hover:scale-[1.02] transition-all group flex flex-col justify-between`}
            >
              <div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">Launch Module</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
