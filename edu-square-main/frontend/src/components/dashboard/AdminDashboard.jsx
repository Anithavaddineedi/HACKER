import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  ShieldCheck,
  UserCheck,
  UserX,
  Building2,
  BookOpen,
  Activity,
  Download,
  Search,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, []);

  const handleToggleApproval = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, isApproved: !u.isApproved } : u));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const departmentData = [
    { name: 'Computer Sci', students: 520 },
    { name: 'AI & Data Sci', students: 380 },
    { name: 'Software Eng', students: 220 },
    { name: 'Electronics', students: 120 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 glass-card border border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-purple-950/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Platform Administrator Command Center
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              System Operations – <span className="gradient-text">Prof. Marcus Wright</span>
            </h1>
            <p className="text-slate-300 mt-2 text-sm max-w-xl">
              Monitor institution activity, approve pending student/teacher registrations, inspect security logs, and generate institutional analytics.
            </p>
          </div>
          <button
            onClick={() => alert('Downloading Platform Institutional Audit Report (PDF)...')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold shadow-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export System Report
          </button>
        </div>
      </div>

      {/* Admin KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Students</p>
            <h3 className="text-2xl font-bold text-white mt-1">1,240</h3>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">+18% this semester</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Faculty Members</p>
            <h3 className="text-2xl font-bold text-white mt-1">48 Professors</h3>
            <span className="text-[11px] text-purple-400 font-semibold mt-1 inline-block">36 Active Courses</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Pending User Approvals</p>
            <h3 className="text-2xl font-bold text-white mt-1">2 Requests</h3>
            <span className="text-[11px] text-amber-400 font-semibold mt-1 inline-block">Requires Verification</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">System Uptime</p>
            <h3 className="text-2xl font-bold text-white mt-1">99.98%</h3>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">MongoDB & Express Live</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* User Approval & Management Table */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">User Management & Approvals</h3>
            <p className="text-xs text-slate-400">Grant or revoke access permissions for students and faculty</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    <div>
                      <p className="text-white">{u.name}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{u.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : u.role === 'teacher' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{u.department}</td>
                  <td className="py-3 px-4 text-slate-400">{u.joined || '2026-01-15'}</td>
                  <td className="py-3 px-4">
                    {u.isApproved ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" /> Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-400 font-semibold text-[11px]">
                        <XCircle className="w-3.5 h-3.5" /> Pending Approval
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleToggleApproval(u.id)}
                      className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-colors ${
                        u.isApproved
                          ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                      }`}
                    >
                      {u.isApproved ? 'Revoke Access' : 'Approve User'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Breakdown Chart */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-1">Department Enrollment Breakdown</h3>
        <p className="text-xs text-slate-400 mb-6">Distribution of enrolled students across academic departments</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="students" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
