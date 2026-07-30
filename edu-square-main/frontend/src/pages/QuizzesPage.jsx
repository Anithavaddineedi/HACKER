import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { QuizRunner } from '../components/quiz/QuizRunner';
import { CodingSandbox } from '../components/quiz/CodingSandbox';
import { BrainCircuit, Code, Trophy, Timer, PlayCircle, Sparkles } from 'lucide-react';

export const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeCodingTest, setActiveCodingTest] = useState(null);

  useEffect(() => {
    api.getQuizzes().then(setQuizzes);
  }, []);

  if (activeQuiz) {
    return <QuizRunner quiz={activeQuiz} onFinish={() => setActiveQuiz(null)} />;
  }

  if (activeCodingTest) {
    return <CodingSandbox question={activeCodingTest} onBack={() => setActiveCodingTest(null)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Online Assessment <span className="gradient-text">& Leaderboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Timer-based MCQ examinations, interactive coding tests, and real-time score ranking</p>
        </div>

        <button
          onClick={async () => {
            const topic = prompt('Enter topic for AI Quiz generation:');
            if (topic) {
              const newQ = await api.generateQuizAI({ topic });
              setQuizzes([newQ, ...quizzes]);
            }
          }}
          className="px-5 py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-purple flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> AI Generate Test
        </button>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((qz) => (
          <div key={qz._id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  qz.type === 'coding' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {qz.type === 'coding' ? 'Coding Test' : 'MCQ Exam'}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><Timer className="w-3.5 h-3.5 text-amber-400" /> {qz.durationMinutes} Mins</span>
              </div>

              <h3 className="text-base font-bold text-white mt-3">{qz.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{qz.courseTitle}</p>
            </div>

            {/* Leaderboard snippet */}
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                <span className="flex items-center gap-1 text-amber-400"><Trophy className="w-3.5 h-3.5" /> Leaderboard Top Ranker</span>
                <span>Score</span>
              </div>
              {qz.leaderboard && qz.leaderboard[0] ? (
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>1. 🥇 {qz.leaderboard[0].studentName}</span>
                  <span className="font-bold text-emerald-400">{qz.leaderboard[0].score}%</span>
                </div>
              ) : (
                <p className="text-[10px] text-slate-500">No attempts yet. Be the first!</p>
              )}
            </div>

            <button
              onClick={() => {
                if (qz.type === 'coding') {
                  setActiveCodingTest(qz.questions?.[0]);
                } else {
                  setActiveQuiz(qz);
                }
              }}
              className="w-full py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <PlayCircle className="w-4 h-4" /> Start {qz.type === 'coding' ? 'Coding Test' : 'MCQ Examination'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
