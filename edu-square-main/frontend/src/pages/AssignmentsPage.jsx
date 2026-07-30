import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileCheck2, Calendar, PlusCircle, Send, CheckCircle, Clock, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AssignmentsPage = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(null);
  const [submissionText, setSubmissionText] = useState('');

  useEffect(() => {
    api.getAssignments().then(setAssignments);
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!showSubmitModal) return;
    await api.submitAssignment(showSubmitModal._id, { content: submissionText });
    alert('Assignment submitted successfully! AI evaluated code structure.');
    setShowSubmitModal(null);
    setSubmissionText('');
    api.getAssignments().then(setAssignments);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Academic <span className="gradient-text">Assignments</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Submit programming tasks, written reports, and review AI feedback</p>
        </div>

        {user?.role === 'teacher' && (
          <button
            onClick={() => {
              const title = prompt('Assignment Title:');
              if (title) {
                api.createAssignment({ title, courseTitle: 'CS401: Advanced ML', description: 'Complete practical assignment.' })
                  .then(asg => setAssignments([asg, ...assignments]));
              }
            }}
            className="px-5 py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Create Assignment
          </button>
        )}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((asg) => {
          const isSubmitted = asg.submissions && asg.submissions.length > 0;
          return (
            <div key={asg._id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {asg.courseTitle}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{asg.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{asg.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> Due: {asg.dueDate}</span>
                    <span className="text-slate-300 font-bold mt-0.5 block">{asg.maxPoints} Points</span>
                  </div>

                  {!isSubmitted ? (
                    <button
                      onClick={() => setShowSubmitModal(asg)}
                      className="px-4 py-2 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Task
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Submitted ({asg.submissions[0]?.score || 95}/100)
                    </span>
                  )}
                </div>
              </div>

              {isSubmitted && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p><strong className="text-white">Student Submission:</strong> {asg.submissions[0].content}</p>
                  <p className="text-emerald-400"><strong className="text-slate-200">Instructor/AI Feedback:</strong> {asg.submissions[0].feedback}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg p-6 rounded-3xl border border-blue-500/30 shadow-2xl relative animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Submit Assignment: {showSubmitModal.title}</h3>
              <button onClick={() => setShowSubmitModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmission} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Submission Notes / Code URL</label>
                <textarea
                  rows="5"
                  placeholder="Paste your source code or project analysis notes here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl gradient-bg-primary text-white font-bold text-xs shadow-glow-blue"
              >
                Submit for AI Evaluation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
