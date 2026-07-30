import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  BookOpen,
  CalendarCheck,
  Award,
  Bot,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  FileText
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const displayName = user?.name || 'Student';

  useEffect(() => {
    api.getCourses().then(setCourses);
    api.getStudentAnalytics().then(setAnalytics);
  }, []);

  const progressData = [
    { week: 'Week 1', hours: 10, score: 78 },
    { week: 'Week 2', hours: 14, score: 84 },
    { week: 'Week 3', hours: 18, score: 90 },
    { week: 'Week 4', hours: 22, score: 95 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 glass-card border border-blue-500/20 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Driven Academic Hub
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="gradient-text">{displayName}</span> 👋
          </h1>
          <p className="text-slate-300 mt-2 text-sm leading-relaxed">
            Your study streak is <strong className="text-blue-400">12 Days Strong!</strong> You have 2 assignments pending and your overall attendance is <strong className="text-emerald-400">92%</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              to="/ai-tutor"
              className="px-5 py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-semibold shadow-glow-blue flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Bot className="w-4 h-4" />
              Ask AI Tutor Anything
            </Link>
            <Link
              to="/quizzes"
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              Take Practice Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Enrolled Courses</p>
            <h3 className="text-2xl font-bold text-white mt-1">3 Modules</h3>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">100% Active</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Attendance Score</p>
            <h3 className="text-2xl font-bold text-white mt-1">92%</h3>
            <span className="text-[11px] text-blue-400 font-semibold mt-1 inline-block">QR Tracked</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Average Quiz Score</p>
            <h3 className="text-2xl font-bold text-white mt-1">94.5%</h3>
            <span className="text-[11px] text-purple-400 font-semibold mt-1 inline-block">+4.5% this month</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Current GPA</p>
            <h3 className="text-2xl font-bold text-white mt-1">3.88 / 4.0</h3>
            <span className="text-[11px] text-amber-400 font-semibold mt-1 inline-block">Dean's Honor Roll</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Enrolled Courses & Study Trend */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Courses Progress */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Active LMS Courses</h3>
                <p className="text-xs text-slate-400">Track your lesson completion & video progress</p>
              </div>
              <Link to="/courses" className="text-xs text-blue-400 font-semibold flex items-center gap-1 hover:underline">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {course.code}
                        </span>
                        <h4 className="text-sm font-semibold text-white mt-1">{course.title}</h4>
                        <p className="text-xs text-slate-400">{course.instructorName}</p>
                      </div>
                    </div>
                    <div className="sm:text-right min-w-[120px]">
                      <span className="text-xs font-bold text-slate-200">{course.progress || 75}% Completed</span>
                      <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                          style={{ width: `${course.progress || 75}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Learning Trend Chart */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-1">Weekly Learning Velocity</h3>
            <p className="text-xs text-slate-400 mb-6">Study hours logged vs assessment performance</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right 1 Col: AI Suggestions & Upcoming Deadlines */}
        <div className="space-y-8">
          {/* AI Insights Card */}
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-slate-900/60 relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-white">AI Tutor Insights</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>You scored 95% in neural networks. Try the advanced Transformers coding test!</span>
              </li>
              <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Attendance is optimal at 95% in Advanced ML. Keep it up!</span>
              </li>
            </ul>
          </div>

          {/* Upcoming Assignments Widget */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Hyperparameter Tuning Notes</h4>
                    <p className="text-[10px] text-slate-400">CS401 • Due Aug 10</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">Pending</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">REST API Middleware Spec</h4>
                    <p className="text-[10px] text-slate-400">CS302 • Due Aug 15</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Submitted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
