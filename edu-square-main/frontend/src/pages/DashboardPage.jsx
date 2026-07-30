import React from 'react';
import { useAuth } from '../context/AuthContext';
import { StudentDashboard } from '../components/dashboard/StudentDashboard';
import { TeacherDashboard } from '../components/dashboard/TeacherDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';

export const DashboardPage = () => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  if (user?.role === 'teacher') {
    return <TeacherDashboard />;
  }

  return <StudentDashboard />;
};
