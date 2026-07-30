const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, default: '15:00' },
  videoUrl: { type: String, default: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  pdfUrl: { type: String, default: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  isCompleted: { type: Boolean, default: false }
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, default: 'Artificial Intelligence' },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  instructorName: { type: String, default: 'Dr. Sarah Vance' },
  thumbnail: { type: String, default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' },
  rating: { type: Number, default: 4.8 },
  studentsCount: { type: Number, default: 124 },
  lectures: [LectureSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
