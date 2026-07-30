import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, GraduationCap, UserCheck } from 'lucide-react';

export const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();

  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    { id: 'teacher', label: 'Teacher', icon: UserCheck, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    { id: 'admin', label: 'Admin', icon: Shield, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-900/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-800">
      <span className="text-[10px] uppercase font-bold text-slate-400 px-2 tracking-wider hidden sm:inline">Role:</span>
      {roles.map((r) => {
        const Icon = r.icon;
        const isActive = user?.role === r.id;
        return (
          <button
            key={r.id}
            onClick={() => switchRole(r.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? `${r.color} shadow-sm border font-semibold`
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{r.label}</span>
          </button>
        );
      })}
    </div>
  );
};
