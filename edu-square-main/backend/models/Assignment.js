const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentName: { type: String },
  submittedAt: { type: Date, default: Date.now },
  content: { type: String },
  fileUrl: { type: String },
  score: { type: Number, default: 0 },
  feedback: { type: String, default: '' },
  status: { type: String, enum: ['submitted', 'graded', 'pending'], default: 'submitted' }
});

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  courseTitle: { type: String },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  maxPoints: { type: Number, default: 100 },
  submissions: [SubmissionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
