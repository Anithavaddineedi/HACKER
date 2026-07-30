const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendancePercentage: { type: Number, default: 92 },
  subjectPerformance: [
    {
      subject: String,
      score: Number,
      attendance: Number
    }
  ],
  weeklyProgress: [
    {
      week: String,
      studyHours: Number,
      quizScore: Number
    }
  ],
  aiSuggestions: [{ type: String }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
