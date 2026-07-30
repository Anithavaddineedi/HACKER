import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import {
  PlusCircle,
  BrainCircuit,
  Users,
  CheckSquare,
  FileCheck2,
  Sparkles,
  Download,
  BookOpen,
  Send
} from 'lucide-react';

export const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  useEffect(() => {
    api.getCourses().then(setCourses);
  }, []);

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;
    setGenerating(true);
    const quiz = await api.generateQuizAI({ topic: aiTopic, type: 'mcq' });
    setGeneratedQuiz(quiz);
    setGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Teacher Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 glass-card border border-purple-500/20 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Teacher Portal & AI Studio
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Faculty Workspace – <span className="gradient-text">Dr. Sarah Vance</span>
            </h1>
            <p className="text-slate-300 mt-2 text-sm max-w-xl">
              Manage your CS & AI courses, auto-generate interactive quizzes using OpenAI, track student attendance, and evaluate assignment submissions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAiModal(true)}
              className="px-5 py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-semibold shadow-glow-purple flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <BrainCircuit className="w-4 h-4" />
              Generate AI Quiz
            </button>
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 hover:bg-slate-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-blue-400" />
              Create Course
            </Link>
          </div>
        </div>
      </div>

      {/* Teacher Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Courses</p>
            <h3 className="text-2xl font-bold text-white mt-1">3 Created</h3>
            <span className="text-[11px] text-blue-400 font-semibold mt-1 inline-block">1,240 Enrolled</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Quizzes Generated</p>
            <h3 className="text-2xl font-bold text-white mt-1">14 AI Tests</h3>
            <span className="text-[11px] text-purple-400 font-semibold mt-1 inline-block">Instant Auto-Grade</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <BrainCircuit className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Submissions to Grade</p>
            <h3 className="text-2xl font-bold text-white mt-1">4 Pending</h3>
            <span className="text-[11px] text-amber-400 font-semibold mt-1 inline-block">AI Assisted Feedback</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <FileCheck2 className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Avg Class Attendance</p>
            <h3 className="text-2xl font-bold text-white mt-1">94%</h3>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">QR Code Active</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Managed Courses Grid */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Course Operations</h3>
            <p className="text-xs text-slate-400">Manage syllabus, add video lectures, and post PDF notes</p>
          </div>
          <Link
            to="/attendance"
            className="text-xs text-purple-400 font-semibold flex items-center gap-1.5 hover:underline"
          >
            Mark Daily Attendance <Users className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c._id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-purple-500/40 transition-colors">
              <div>
                <img src={c.thumbnail} alt={c.title} className="w-full h-32 rounded-xl object-cover mb-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  {c.code}
                </span>
                <h4 className="text-sm font-bold text-white mt-2">{c.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{c.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">{c.lectures?.length || 4} Lectures</span>
                <Link to={`/courses?id=${c._id}`} className="text-blue-400 font-semibold hover:underline">
                  Manage Content &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Quiz Generator Drawer Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-xl p-6 rounded-3xl border border-purple-500/30 shadow-2xl relative animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">AI Assessment Generator</h3>
              </div>
              <button onClick={() => { setShowAiModal(false); setGeneratedQuiz(null); }} className="text-slate-400 hover:text-white text-sm font-bold">✕</button>
            </div>

            {!generatedQuiz ? (
              <form onSubmit={handleGenerateQuiz} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Enter Academic Topic or Syllabus Chapter</label>
                  <input
                    type="text"
                    placeholder="e.g., Convolutional Neural Networks, Express Async Handler, Dijkstra Graph Algorithm..."
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-300">
                  ⚡ EduSphere AI will generate 3 structured multiple-choice questions with answer keys & explanations instantly.
                </div>

                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-3 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-purple flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
                >
                  {generating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {generating ? 'Generating Quiz Questions...' : 'Generate AI Assessment'}
                </button>
              </form>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  ✅ AI Quiz Created Successfully!
                </div>
                <h4 className="text-sm font-bold text-white">{generatedQuiz.title}</h4>
                <div className="space-y-3">
                  {generatedQuiz.questions?.map((q, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <p className="font-semibold text-slate-200">{idx + 1}. {q.question}</p>
                      <ul className="mt-2 space-y-1 text-slate-400">
                        {q.options?.map((opt, i) => (
                          <li key={i} className={`p-1.5 rounded ${i === q.correctAnswer ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : ''}`}>
                            • {opt}
                          </li>
                        ))}
                      </ul>
                      {q.explanation && <p className="mt-2 text-[10px] text-slate-500 italic">💡 {q.explanation}</p>}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { setShowAiModal(false); setGeneratedQuiz(null); }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
                >
                  Publish to Student Quizzes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
