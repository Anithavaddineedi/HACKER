import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-card border-t border-slate-800/80 mt-16 py-8 px-6 lg:px-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">EduSphere</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            AI-Powered Education and Learning Platform integrating LMS, AI Tutoring, Online Assessments, and Student Analytics.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-sm mb-3">Core Platform</h4>
          <ul className="space-y-2">
            <li><Link to="/courses" className="hover:text-blue-400 transition-colors">Courses & Lectures</Link></li>
            <li><Link to="/ai-tutor" className="hover:text-purple-400 transition-colors">AI Tutor Module</Link></li>
            <li><Link to="/quizzes" className="hover:text-blue-400 transition-colors">Online Assessments</Link></li>
            <li><Link to="/attendance" className="hover:text-purple-400 transition-colors">QR Attendance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-sm mb-3">User Dashboards</h4>
          <ul className="space-y-2">
            <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Student Dashboard</Link></li>
            <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Teacher Dashboard</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Admin Management</Link></li>
            <li><Link to="/analytics" className="hover:text-purple-400 transition-colors">Student Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-sm mb-3">Support & System</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About AI System</Link></li>
            <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
            <li><Link to="/settings" className="hover:text-blue-400 transition-colors">Platform Settings</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 EduSphere AI Education Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Next-Gen Learners
        </p>
      </div>
    </footer>
  );
};
