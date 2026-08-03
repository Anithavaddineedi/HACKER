import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isValidEmail, useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, Shield, GraduationCap, UserCheck, Eye, EyeOff } from 'lucide-react';

export const LoginPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address such as name@gmail.com.');
      return;
    }

    try {
      const result = login(email.trim().toLowerCase(), password);
      if (result) {
        setError('');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleQuickDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };
  return (
    <div className="max-w-md mx-auto py-12 space-y-6 animate-in fade-in duration-300">
      <div className="glass-card p-8 rounded-3xl border border-blue-500/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-bg-primary flex items-center justify-center mx-auto shadow-glow-blue">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Sign In to EduSphere</h2>
          <p className="text-xs text-slate-400">Access your courses, AI tutor, and academic analytics</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <Link to="/forgot-password" className="text-blue-400 hover:underline">
              Forgot password?
            </Link>
            <span className="text-slate-500">Show password</span>
          </div>

          {error && (
            <p className="text-xs text-rose-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl gradient-bg-primary text-white font-bold text-xs shadow-glow-blue flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Sign In with JWT <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Role Logins */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider text-center">Instant Demo Logins:</p>
          <p className="text-[10px] text-slate-500 text-center">student@edusphere.com / student123 • teacher@edusphere.com / teacher123 • admin@edusphere.com / admin123</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemo('student@edusphere.com', 'student123', 'student', 'Alex Student', 'Computer Science & Engineering')}
              className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 flex flex-col items-center gap-1 font-medium transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="text-[11px]">Student</span>
            </button>
            <button
              onClick={() => handleQuickDemo('teacher@edusphere.com', 'teacher123', 'teacher', 'Dr. Sarah Vance', 'Computer Science & Engineering')}
              className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 flex flex-col items-center gap-1 font-medium transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span className="text-[11px]">Teacher</span>
            </button>
            <button
              onClick={() => handleQuickDemo('admin@edusphere.com', 'admin123', 'admin', 'Prof. Marcus Wright', 'Administration')}
              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 flex flex-col items-center gap-1 font-medium transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="text-[11px]">Admin</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};
