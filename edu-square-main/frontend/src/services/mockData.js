export const MOCK_COURSES = [
  {
    _id: 'crs_1',
    title: 'Advanced Machine Learning & Neural Networks',
    code: 'CS401',
    description: 'Master deep learning architectures, convolutional neural networks, transformers, and practical model deployments with PyTorch.',
    category: 'AI & Data Science',
    instructorName: 'Dr. Sarah Vance',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    studentsCount: 142,
    progress: 75,
    lectures: [
      { id: 'lec_1', title: 'Introduction to Neural Architecture & Backpropagation', duration: '24:10', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: true },
      { id: 'lec_2', title: 'Convolutional Neural Networks for Computer Vision', duration: '32:15', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: true },
      { id: 'lec_3', title: 'Transformer Models & Self-Attention Mechanisms', duration: '45:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: true },
      { id: 'lec_4', title: 'Model Optimization & FP16 Quantization', duration: '28:30', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: false }
    ]
  },
  {
    _id: 'crs_2',
    title: 'Full-Stack Web Architecture with React & Node',
    code: 'CS302',
    description: 'Build enterprise-grade full-stack web applications using modern microservices, REST APIs, Express middleware, and MongoDB.',
    category: 'Software Engineering',
    instructorName: 'Prof. Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    studentsCount: 198,
    progress: 60,
    lectures: [
      { id: 'lec_201', title: 'Modern React 18 Patterns & Custom Hooks', duration: '18:45', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: true },
      { id: 'lec_202', title: 'Express Middleware & JWT Authentication', duration: '29:50', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: true },
      { id: 'lec_203', title: 'Database Modeling with MongoDB & Mongoose', duration: '35:20', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: false }
    ]
  },
  {
    _id: 'crs_3',
    title: 'Algorithms, Data Structures & System Design',
    code: 'CS201',
    description: 'Comprehensive preparation in graph theory, dynamic programming, tree traversals, and scalable distributed system design.',
    category: 'Computer Science',
    instructorName: 'Dr. Sarah Vance',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    rating: 4.95,
    studentsCount: 250,
    progress: 90,
    lectures: [
      { id: 'lec_301', title: 'Dynamic Programming & Subproblem Optimization', duration: '40:10', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: true },
      { id: 'lec_302', title: 'Graph Traversals: BFS, DFS & Dijkstra Algorithm', duration: '38:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: true }
    ]
  }
];

export const MOCK_ASSIGNMENTS = [
  {
    _id: 'asg_1',
    title: 'Neural Network Hyperparameter Tuning & Loss Analysis',
    courseTitle: 'Advanced Machine Learning & Neural Networks',
    description: 'Implement a multi-layer perceptron from scratch and compare performance across SGD vs Adam optimizers.',
    dueDate: '2026-08-10',
    maxPoints: 100,
    submissions: [
      {
        studentName: 'Alex Johnson',
        submittedAt: '2026-07-28T14:30:00Z',
        content: 'Completed neural network code with 94.2% test accuracy using Adam optimizer (learning rate = 0.001).',
        score: 95,
        feedback: 'Excellent work on the learning rate decay curves and visual loss plots!',
        status: 'graded'
      }
    ]
  },
  {
    _id: 'asg_2',
    title: 'RESTful API & JWT Authentication Middleware',
    courseTitle: 'Full-Stack Web Architecture with React & Node',
    description: 'Create an Express backend service with secure JWT authentication, role-based authorization middleware, and password hashing.',
    dueDate: '2026-08-15',
    maxPoints: 100,
    submissions: []
  }
];

export const MOCK_QUIZZES = [
  {
    _id: 'qz_1',
    title: 'Deep Learning Core Concepts Assessment',
    courseTitle: 'Advanced Machine Learning & Neural Networks',
    type: 'mcq',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        question: 'Which activation function is most effective at preventing vanishing gradients in deep feed-forward networks?',
        options: ['Sigmoid', 'ReLU (Rectified Linear Unit)', 'Tanh', 'Step Function'],
        correctAnswer: 1,
        explanation: 'ReLU returns 0 for negative values and linear slope 1 for positive, mitigating vanishing gradient issues.'
      },
      {
        question: 'What is the primary function of a Dropout layer in neural network training?',
        options: ['Speed up matrix multiplication', 'Prevent overfitting by randomly zeroing activations', 'Increase training loss', 'Normalize input batch dimensions'],
        correctAnswer: 1,
        explanation: 'Dropout forces the network to learn redundant features and prevents co-adaptation.'
      },
      {
        question: 'What mechanism allows Transformer architectures to process sequences in parallel?',
        options: ['Recurrent Feedback Loops', 'Self-Attention Mechanism', 'Convolutional Kernels', 'Max Pooling'],
        correctAnswer: 1,
        explanation: 'Self-attention calculates token interactions simultaneously across the entire sequence.'
      }
    ],
    leaderboard: [
      { studentName: 'Alex Johnson', score: 100, totalQuestions: 3, timeSpentSeconds: 145 },
      { studentName: 'Emma Watson', score: 100, totalQuestions: 3, timeSpentSeconds: 180 },
      { studentName: 'David Miller', score: 66, totalQuestions: 3, timeSpentSeconds: 210 }
    ]
  },
  {
    _id: 'qz_2',
    title: 'Coding Sandbox Test: Binary Search Tree Traversal',
    courseTitle: 'Algorithms, Data Structures & System Design',
    type: 'coding',
    durationMinutes: 20,
    passingScore: 80,
    questions: [
      {
        question: 'Write a JavaScript function `inorderTraversal(root)` that returns array of node values visited in-order.',
        starterCode: 'function inorderTraversal(root) {\n  const result = [];\n  // Write your logic here\n  if (!root) return result;\n  function traverse(node) {\n    if (!node) return;\n    traverse(node.left);\n    result.push(node.val);\n    traverse(node.right);\n  }\n  traverse(root);\n  return result;\n}',
        testCases: [
          { input: '[1, null, 2, 3]', output: '[1, 3, 2]' },
          { input: '[]', output: '[]' }
        ],
        correctAnswer: 0,
        explanation: 'In-order traversal visits Left subtree -> Root node -> Right subtree.'
      }
    ],
    leaderboard: [
      { studentName: 'Alex Johnson', score: 100, totalQuestions: 1, timeSpentSeconds: 320 }
    ]
  }
];

export const MOCK_ATTENDANCE = [
  { id: 1, studentName: 'Alex Johnson', courseTitle: 'CS401: Advanced ML', date: '2026-07-28', status: 'present', method: 'qr' },
  { id: 2, studentName: 'Alex Johnson', courseTitle: 'CS302: Full-Stack Web', date: '2026-07-27', status: 'present', method: 'manual' },
  { id: 3, studentName: 'Alex Johnson', courseTitle: 'CS201: Algorithms', date: '2026-07-26', status: 'present', method: 'qr' },
  { id: 4, studentName: 'Alex Johnson', courseTitle: 'CS401: Advanced ML', date: '2026-07-25', status: 'late', method: 'manual' },
  { id: 5, studentName: 'Alex Johnson', courseTitle: 'CS302: Full-Stack Web', date: '2026-07-24', status: 'present', method: 'qr' },
  { id: 6, studentName: 'Alex Johnson', courseTitle: 'CS201: Algorithms', date: '2026-07-23', status: 'absent', method: 'manual' }
];

export const MOCK_USERS_LIST = [
  { id: 'usr_1', name: 'Alex Johnson', email: 'student@edusphere.com', role: 'student', department: 'Computer Science', isApproved: true, joined: '2026-01-15' },
  { id: 'usr_2', name: 'Dr. Sarah Vance', email: 'teacher@edusphere.com', role: 'teacher', department: 'AI & Data Science', isApproved: true, joined: '2025-11-20' },
  { id: 'usr_3', name: 'Prof. Marcus Wright', email: 'admin@edusphere.com', role: 'admin', department: 'Academic Ops', isApproved: true, joined: '2025-09-10' },
  { id: 'usr_4', name: 'Sophia Martinez', email: 'sophia.m@university.edu', role: 'student', department: 'Software Eng', isApproved: false, joined: '2026-07-29' },
  { id: 'usr_5', name: 'James Wilson', email: 'j.wilson@university.edu', role: 'teacher', department: 'Computer Science', isApproved: false, joined: '2026-07-30' }
];
