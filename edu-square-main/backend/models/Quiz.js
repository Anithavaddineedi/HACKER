const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: Number, required: true }, // Index of option
  explanation: { type: String, default: '' },
  starterCode: { type: String }, // For coding tests
  testCases: [{ input: String, output: String }] // For coding tests
});

const LeaderboardEntrySchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentName: { type: String },
  score: { type: Number },
  totalQuestions: { type: Number },
  timeSpentSeconds: { type: Number },
  completedAt: { type: Date, default: Date.now }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  courseTitle: { type: String },
  type: { type: String, enum: ['mcq', 'coding'], default: 'mcq' },
  durationMinutes: { type: Number, default: 15 },
  passingScore: { type: Number, default: 70 },
  questions: [QuestionSchema],
  leaderboard: [LeaderboardEntrySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);
