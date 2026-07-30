import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  BrainCircuit,
  CalendarCheck,
  Bot,
  BarChart3,
  Settings,
  HelpCircle,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Info
} from 'lucide-react';

export const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses (LMS)', path: '/courses', icon: BookOpen },
    { name: 'Assignments', path: '/assignments', icon: FileCheck2 },
    { name: 'Assessments', path: '/quizzes', icon: BrainCircuit },
    { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { name: 'AI Tutor', path: '/ai-tutor', icon: Bot, badge: 'AI' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'About Platform', path: '/about', icon: Info },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Support', path: '/contact', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[65px] left-0 z-50 h-[calc(100vh)] lg:h-[calc(100vh-65px)] w-64 glass-card border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Active Role Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                {user?.role === 'admin' ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : user?.role === 'teacher' ? (
                  <Sparkles className="w-5 h-5 text-purple-400" />
                ) : (
                  <GraduationCap className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Active Workspace</p>
                <p className="text-xs font-bold text-slate-200 capitalize">{user?.role || 'student'} Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'gradient-bg-primary text-white shadow-glow-blue'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Credit Widget */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
          <p className="text-[11px] font-semibold text-slate-300">EduSphere AI v1.0</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Powered by OpenAI & React</p>
        </div>
      </aside>
    </>
  );
};
