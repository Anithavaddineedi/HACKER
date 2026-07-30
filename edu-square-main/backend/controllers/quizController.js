const { seedQuizzes } = require('../utils/seedData');
const { generateAIChatResponse } = require('../utils/aiGenerator');

let quizStore = [...seedQuizzes];

const getQuizzes = (req, res) => {
  res.json(quizStore);
};

const getQuizById = (req, res) => {
  const quiz = quizStore.find(q => q._id === req.params.id);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
};

const generateQuizWithAI = async (req, res) => {
  const { topic, courseTitle, type = 'mcq' } = req.body;
  try {
    const rawAiResponse = await generateAIChatResponse(
      `Create a 3-question ${type} assessment on topic: ${topic || 'Machine Learning'}. Return valid JSON with title, questions array (question, options, correctAnswer index, explanation).`,
      'quiz'
    );

    let parsed = JSON.parse(rawAiResponse);
    const newQuiz = {
      _id: `qz_${Date.now()}`,
      title: parsed.title || `AI Quiz: ${topic || 'Computer Science Concepts'}`,
      courseTitle: courseTitle || 'Advanced Machine Learning & Neural Networks',
      type: type,
      durationMinutes: 15,
      passingScore: 70,
      questions: parsed.questions || [],
      leaderboard: [
        { studentName: 'EduSphere Bot', score: 100, totalQuestions: 3, timeSpentSeconds: 120 }
      ]
    };

    quizStore.unshift(newQuiz);
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate quiz', error: error.message });
  }
};

const submitQuizScore = (req, res) => {
  const quiz = quizStore.find(q => q._id === req.params.id);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  const { score, totalQuestions, timeSpentSeconds } = req.body;
  const entry = {
    studentName: req.user.name || 'Alex Johnson',
    score: score || 100,
    totalQuestions: totalQuestions || quiz.questions.length,
    timeSpentSeconds: timeSpentSeconds || 140,
    completedAt: new Date().toISOString()
  };

  quiz.leaderboard.unshift(entry);
  // Sort leaderboard by highest score then lowest time
  quiz.leaderboard.sort((a, b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds);

  res.json({
    message: 'Quiz submitted! Leaderboard updated.',
    entry,
    leaderboard: quiz.leaderboard
  });
};

module.exports = {
  getQuizzes,
  getQuizById,
  generateQuizWithAI,
  submitQuizScore,
  quizStore
};
