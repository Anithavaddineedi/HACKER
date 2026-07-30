import React from 'react';
import { Sparkles, Bot, ShieldCheck, Cpu, Code2, Globe, GraduationCap } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Platform Architecture & Mission
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          About <span className="gradient-text">EduSphere AI</span>
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          EduSphere is designed to transform academic experiences by synthesizing Learning Management, AI Tutoring, Online Assessments, Attendance Tracking, and Predictive Analytics into one seamless full-stack web application.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">OpenAI Intelligence</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Integrated with GPT model APIs for generating quizzes, summarizing textbook chapters, explaining complex code, and guiding student study plans.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 w-fit">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Full-Stack Tech Stack</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built using React.js frontend with Tailwind CSS, Node.js + Express.js backend REST APIs, JWT authentication, and MongoDB database schema architecture.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Role-Based Access</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tailored interfaces for Students (learning & AI tutoring), Teachers (course creation & AI quiz generation), and Admins (user approval & activity oversight).
          </p>
        </div>
      </div>

      {/* Leadership & System Specs */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white">System Specifications & Data Models</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-slate-400 font-semibold">User Schema</p>
            <p className="text-white font-bold mt-1">Student / Teacher / Admin</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-slate-400 font-semibold">Assessment</p>
            <p className="text-white font-bold mt-1">MCQ & Coding Test</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-slate-400 font-semibold">Attendance</p>
            <p className="text-white font-bold mt-1">QR Token Scan</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-slate-400 font-semibold">Security</p>
            <p className="text-white font-bold mt-1">JWT & Bcrypt Hashing</p>
          </div>
        </div>
      </div>
    </div>
  );
};
