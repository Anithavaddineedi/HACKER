import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { QRScannerModal } from '../components/attendance/QRScannerModal';
import { CalendarCheck, QrCode, CheckCircle, Clock, XCircle, Download, Users } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const AttendancePage = () => {
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [showQRScanner, setShowQRScanner] = useState(false);

  useEffect(() => {
    api.getAttendance().then(setAttendanceLogs);
  }, []);

  const handleMarkManual = () => {
    const course = prompt('Course Title:', 'CS401: Advanced ML');
    if (course) {
      api.markAttendance({ courseTitle: course, status: 'present' }).then(() => {
        api.getAttendance().then(setAttendanceLogs);
      });
    }
  };

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];
  const pieData = [
    { name: 'Present', value: attendanceLogs.filter(a => a.status === 'present').length || 4 },
    { name: 'Late', value: attendanceLogs.filter(a => a.status === 'late').length || 1 },
    { name: 'Absent', value: attendanceLogs.filter(a => a.status === 'absent').length || 1 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-8 rounded-3xl border border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Attendance <span className="gradient-text">Management System</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Daily attendance tracking, smart board QR code scanner, and monthly reports</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowQRScanner(true)}
            className="px-5 py-2.5 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" /> Scan Classroom QR
          </button>
          <button
            onClick={handleMarkManual}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-purple-400" /> Mark Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Attendance Table Log */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Daily Attendance Records</h3>
            <span className="text-xs text-emerald-400 font-semibold">92% Overall Attendance</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {attendanceLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 text-slate-300 font-mono">{log.date}</td>
                    <td className="py-3 px-4 font-semibold text-white">{log.studentName}</td>
                    <td className="py-3 px-4 text-slate-300">{log.courseTitle}</td>
                    <td className="py-3 px-4 uppercase text-[10px] font-bold text-blue-400">{log.method || 'QR'}</td>
                    <td className="py-3 px-4">
                      {log.status === 'present' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold"><CheckCircle className="w-3.5 h-3.5" /> Present</span>
                      ) : log.status === 'late' ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 font-semibold"><Clock className="w-3.5 h-3.5" /> Late</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 font-semibold"><XCircle className="w-3.5 h-3.5" /> Absent</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Monthly Pie Breakdown */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Monthly Attendance Ratio</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Present Rate</span>
              <span className="font-bold">84%</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> Late Arrivals</span>
              <span className="font-bold">8%</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500" /> Absences</span>
              <span className="font-bold">8%</span>
            </div>
          </div>
        </div>
      </div>

      {showQRScanner && (
        <QRScannerModal
          onClose={() => setShowQRScanner(false)}
          onSuccess={() => api.getAttendance().then(setAttendanceLogs)}
        />
      )}
    </div>
  );
};
