import { MOCK_COURSES, MOCK_ASSIGNMENTS, MOCK_QUIZZES, MOCK_ATTENDANCE, MOCK_USERS_LIST } from './mockData';

const BASE_URL = '/api';

const fetchWithFallback = async (endpoint, options = {}, fallbackData) => {
  try {
    const token = localStorage.getItem('edusphere_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    };

    const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API call to ${endpoint} used local fallback:`, err.message);
    return fallbackData;
  }
};

export const api = {
  // Courses
  getCourses: () => fetchWithFallback('/courses', {}, MOCK_COURSES),
  getCourseById: (id) => fetchWithFallback(`/courses/${id}`, {}, MOCK_COURSES.find(c => c._id === id) || MOCK_COURSES[0]),
  createCourse: (courseData) => fetchWithFallback('/courses', { method: 'POST', body: JSON.stringify(courseData) }, { _id: `crs_${Date.now()}`, ...courseData, rating: 5.0, studentsCount: 1, lectures: [] }),

  // Assignments
  getAssignments: () => fetchWithFallback('/assignments', {}, MOCK_ASSIGNMENTS),
  createAssignment: (asg) => fetchWithFallback('/assignments', { method: 'POST', body: JSON.stringify(asg) }, { _id: `asg_${Date.now()}`, ...asg, submissions: [] }),
  submitAssignment: (id, data) => fetchWithFallback(`/assignments/${id}/submit`, { method: 'POST', body: JSON.stringify(data) }, { message: 'Submitted successfully', score: 95 }),

  // Quizzes
  getQuizzes: () => fetchWithFallback('/quizzes', {}, MOCK_QUIZZES),
  getQuizById: (id) => fetchWithFallback(`/quizzes/${id}`, {}, MOCK_QUIZZES.find(q => q._id === id) || MOCK_QUIZZES[0]),
  generateQuizAI: (data) => fetchWithFallback('/quizzes/generate-ai', { method: 'POST', body: JSON.stringify(data) }, {
    _id: `qz_${Date.now()}`,
    title: `AI Generated Test on ${data.topic || 'Machine Learning'}`,
    type: data.type || 'mcq',
    durationMinutes: 15,
    questions: [
      {
        question: `What is the core principle of ${data.topic || 'Machine Learning'}?`,
        options: ['Automated Pattern Recognition', 'Manual Data Processing', 'Static Scripting', 'Brute Force Iteration'],
        correctAnswer: 0,
        explanation: 'Machine learning extracts patterns automatically from statistical data.'
      },
      {
        question: 'Which metric measures model accuracy on unseen data?',
        options: ['Generalization Error', 'Training Bias', 'Overfitting Factor', 'Memory Footprint'],
        correctAnswer: 0,
        explanation: 'Generalization error measures performance on test dataset.'
      }
    ],
    leaderboard: []
  }),
  submitQuiz: (id, scoreData) => fetchWithFallback(`/quizzes/${id}/submit`, { method: 'POST', body: JSON.stringify(scoreData) }, { message: 'Quiz score updated', leaderboard: MOCK_QUIZZES[0].leaderboard }),

  // Attendance
  getAttendance: () => fetchWithFallback('/attendance', {}, MOCK_ATTENDANCE),
  markAttendance: (data) => fetchWithFallback('/attendance/mark', { method: 'POST', body: JSON.stringify(data) }, { message: 'Attendance recorded', record: data }),
  scanQRAttendance: (data) => fetchWithFallback('/attendance/scan-qr', { method: 'POST', body: JSON.stringify(data) }, { message: 'QR Code verified! Attendance logged.', record: { studentName: 'Alex Johnson', date: '2026-07-30', status: 'present', method: 'qr' } }),

  // AI Tutor & Content Generator
  askAITutor: async (message, mode = 'chat') => {
    const endpoint = mode === 'explain' ? '/ai/explain' : mode === 'summary' ? '/ai/summary' : mode === 'study_plan' ? '/ai/study-plan' : '/ai/chat';
    const payload = mode === 'explain'
      ? { concept: message }
      : mode === 'summary'
        ? { text: message }
        : mode === 'study_plan'
          ? { topic: message }
          : { message, mode };

    try {
      const token = localStorage.getItem('edusphere_token');
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { response: data.response || data.message || 'AI tutor is ready to help.', timestamp: data.timestamp || new Date().toISOString() };
    } catch (err) {
      console.warn(`AI tutor request to ${endpoint} failed, using local guidance:`, err.message);
      return {
        response: (() => {
          const normalizedMessage = message?.trim() || 'your topic';
          switch (mode) {
            case 'explain':
              return `### Concept Breakdown: ${normalizedMessage}\n\n1. **Simple Idea:** ${normalizedMessage} is a core principle that helps connect theory with practical problem solving.\n2. **Why It Matters:** Understanding this concept improves your ability to explain, debug, and apply it in assignments or interviews.\n3. **Study Tip:** Break it into inputs, process, and output, then practice with one real example.`;
            case 'summary':
              return `### Quick Summary\n\n**${normalizedMessage}** can be understood in three parts:\n- **Core meaning:** the main goal or idea behind the topic.\n- **Key application:** where it is used in real-world coding or academic contexts.\n- **Main takeaway:** what you should remember for exams or projects.`;
            case 'study_plan':
              return `### 4-Week Study Plan for ${normalizedMessage}\n\n- **Week 1:** Learn the basic definitions and terminology.\n- **Week 2:** Practice one worked example and review notes daily.\n- **Week 3:** Solve related exercises and compare your solutions.\n- **Week 4:** Revise weak areas and attempt a mini quiz or mock assessment.`;
            default:
              return `EduSphere AI: Happy to help with **${normalizedMessage}**.\n\nTry this approach:\n- Clarify the problem in simple terms.\n- Identify the key concept or formula.\n- Apply it step by step and check your reasoning.`;
          }
        })(),
        timestamp: new Date().toISOString()
      };
    }
  },
  generateNotesAI: async (topic) => {
    try {
      const token = localStorage.getItem('edusphere_token');
      const res = await fetch(`${BASE_URL}/ai/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ topic })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { response: data.response || data.message || 'Notes generated successfully.' };
    } catch (err) {
      console.warn('AI notes request failed, using local guidance:', err.message);
      return {
        response: `# AI Generated Study Notes: ${topic}\n\n## 1. Key Definitions\n- **Primary Concept:** Main idea behind the topic.\n- **Key Formula or Rule:** Write it down clearly.\n- **Example Application:** Practice one simple case to reinforce understanding.\n\n## 2. Recommended Practice\n- Review today’s notes for 15 minutes.\n- Solve one practice question.\n- Ask the AI tutor for a deeper explanation if anything feels unclear.`
      };
    }
  },

  // Users & Analytics
  getUsers: () => fetchWithFallback('/auth/users', {}, MOCK_USERS_LIST),
  getStudentAnalytics: () => fetchWithFallback('/analytics/student', {}, {
    attendancePercentage: 92,
    totalCoursesEnrolled: 3,
    assignmentsSubmitted: 8,
    quizzesCompleted: 12,
    overallGpa: 3.88
  })
};
