import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle, Trophy, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';

export const QuizRunner = ({ quiz, onFinish }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState((quiz.durationMinutes || 15) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleOptionSelect = (optIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIdx]: optIdx });
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    const resultData = {
      score: finalScore,
      correctAnswers: correctCount,
      totalQuestions: quiz.questions.length,
      timeSpentSeconds: (quiz.durationMinutes * 60) - timeLeft
    };

    setIsSubmitted(true);
    setScoreResult(resultData);
    await api.submitQuiz(quiz._id, resultData);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = quiz.questions[currentQuestionIdx] || quiz.questions[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Quiz Top Status Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">{quiz.title}</h2>
          <p className="text-xs text-slate-400">Question {currentQuestionIdx + 1} of {quiz.questions.length}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 font-mono text-xs font-bold ${
            timeLeft < 180 ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse' : 'bg-slate-900 border-slate-800 text-blue-400'
          }`}>
            <Timer className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      {!isSubmitted ? (
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-semibold text-white leading-relaxed">
            {currentQuestionIdx + 1}. {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options?.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionSelect(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-glow-blue font-semibold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentQuestionIdx === 0}
              onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 text-xs font-semibold hover:text-white disabled:opacity-30"
            >
              Previous
            </button>

            {currentQuestionIdx < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center gap-2 hover:opacity-90"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-2"
              >
                Submit Exam <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Instant Score Evaluation Modal */
        <div className="glass-card p-8 rounded-3xl border border-blue-500/30 text-center space-y-6 animate-in zoom-in-95">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
          <h2 className="text-2xl font-bold text-white">Assessment Evaluated!</h2>

          <div className="inline-block p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-4xl font-extrabold gradient-text">{scoreResult.score}%</span>
            <p className="text-xs text-slate-400 mt-1">
              Score: {scoreResult.correctAnswers} / {scoreResult.totalQuestions} Correct
            </p>
          </div>

          <div className="text-xs text-slate-300 max-w-md mx-auto">
            {scoreResult.score >= 70 ? (
              <p className="text-emerald-400 font-semibold">🎉 Congratulations! You passed the assessment and scored on the EduSphere Leaderboard.</p>
            ) : (
              <p className="text-amber-400 font-semibold">Keep practicing! Ask EduSphere AI Tutor for concept clarification.</p>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => { setIsSubmitted(false); setSelectedAnswers({}); setTimeLeft(quiz.durationMinutes * 60); }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Retake Test
            </button>
            <button
              onClick={onFinish}
              className="px-5 py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue"
            >
              Return to Assessments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
