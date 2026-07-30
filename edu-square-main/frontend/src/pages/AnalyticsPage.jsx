import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { BarChart3, Sparkles, TrendingUp, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const AnalyticsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getStudentAnalytics().then(setData);
  }, []);

  const subjectData = [
    { subject: 'Advanced ML', score: 92, fullMark: 100 },
    { subject: 'Full-Stack Web', score: 88, fullMark: 100 },
    { subject: 'Algorithms', score: 95, fullMark: 100 },
    { subject: 'System Design', score: 84, fullMark: 100 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Student Performance <span className="gradient-text">& AI Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Comprehensive subject-wise radar metrics, attendance trends, and AI-based personalized recommendations</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
          <Sparkles className="w-4 h-4" /> AI Diagnostics Active
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Overall Academic Score</p>
          <h3 className="text-2xl font-bold text-white mt-1">91.4%</h3>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">+3.2% vs previous term</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Attendance Metric</p>
          <h3 className="text-2xl font-bold text-white mt-1">92.0%</h3>
          <span className="text-[11px] text-blue-400 font-semibold mt-1 inline-block">24 Classes Logged</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Quizzes Completed</p>
          <h3 className="text-2xl font-bold text-white mt-1">12 Tests</h3>
          <span className="text-[11px] text-purple-400 font-semibold mt-1 inline-block">Avg Score: 94.5%</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">GPA Equivalent</p>
          <h3 className="text-2xl font-bold text-white mt-1">3.88 / 4.0</h3>
          <span className="text-[11px] text-amber-400 font-semibold mt-1 inline-block">Top 5% Cohort</span>
        </div>
      </div>

      {/* Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Performance Bar Chart */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Subject-Wise Performance Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <XAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Radar Mastery Chart */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Competency Mastery Radar</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" />
                <Radar name="Alex Johnson" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Recommendations Box */}
      <div className="glass-card p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-slate-900 to-blue-950/30 space-y-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-bold text-white">AI Personal Learning Suggestions</h3>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <li className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-blue-400 block">Focus Recommendation</span>
            <span>Spend 30 mins extra reviewing React state custom hooks to boost Full-Stack Web score to 95%.</span>
          </li>
          <li className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400 block">Strength Highlight</span>
            <span>Graph Algorithms mastery is outstanding at 95%. You are ready to mentor peer study circles!</span>
          </li>
          <li className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="font-bold text-purple-400 block">Suggested Practice</span>
            <span>Attempt the AI Generated Quiz on System Design microservices caching strategies.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
