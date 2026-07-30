const getStudentAnalytics = (req, res) => {
  res.json({
    attendancePercentage: 92,
    totalCoursesEnrolled: 4,
    assignmentsSubmitted: 8,
    quizzesCompleted: 12,
    overallGpa: 3.85,
    subjectPerformance: [
      { subject: 'Advanced ML', score: 92, attendance: 95 },
      { subject: 'Full-Stack Web', score: 88, attendance: 90 },
      { subject: 'Algorithms', score: 95, attendance: 96 },
      { subject: 'Cloud Computing', score: 84, attendance: 88 }
    ],
    weeklyProgress: [
      { week: 'Week 1', studyHours: 12, quizScore: 82 },
      { week: 'Week 2', studyHours: 16, quizScore: 88 },
      { week: 'Week 3', studyHours: 14, quizScore: 91 },
      { week: 'Week 4', studyHours: 20, quizScore: 95 }
    ],
    aiSuggestions: [
      'Focus 30 mins extra on React State Management and Custom Hooks.',
      'Attendance is outstanding at 95% in Advanced ML!',
      'Attempt Practice Coding Quiz 3 to boost your graph traversal efficiency.'
    ]
  });
};

const getAdminAnalytics = (req, res) => {
  res.json({
    totalStudents: 1240,
    totalTeachers: 48,
    totalCourses: 36,
    activeQuizzes: 92,
    averagePlatformScore: 87.4,
    monthlyEnrollmentTrend: [
      { month: 'Jan', students: 820 },
      { month: 'Feb', students: 950 },
      { month: 'Mar', students: 1080 },
      { month: 'Apr', students: 1240 }
    ],
    departmentBreakdown: [
      { name: 'Computer Science', count: 520 },
      { name: 'AI & Data Science', count: 380 },
      { name: 'Software Eng', count: 220 },
      { name: 'Electronics', count: 120 }
    ]
  });
};

module.exports = {
  getStudentAnalytics,
  getAdminAnalytics
};
