const { seedCourses } = require('../utils/seedData');

let courseStore = [...seedCourses];

const getCourses = (req, res) => {
  res.json(courseStore);
};

const getCourseById = (req, res) => {
  const course = courseStore.find(c => c._id === req.params.id);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.json(course);
};

const createCourse = (req, res) => {
  const { title, code, description, category, instructorName, thumbnail } = req.body;
  const newCourse = {
    _id: `crs_${Date.now()}`,
    title: title || 'New AI & Computer Science Module',
    code: code || `CS${Math.floor(100 + Math.random() * 800)}`,
    description: description || 'Comprehensive study module created on EduSphere platform.',
    category: category || 'Computer Science',
    instructorName: instructorName || req.user.name || 'Dr. Sarah Vance',
    thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    studentsCount: 1,
    lectures: [
      { id: `lec_${Date.now()}_1`, title: 'Lecture 1: Module Introduction & Principles', duration: '20:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: false },
      { id: `lec_${Date.now()}_2`, title: 'Lecture 2: Theoretical Foundations & Architecture', duration: '35:10', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', pdfUrl: '#', isCompleted: false }
    ]
  };

  courseStore.unshift(newCourse);
  res.status(201).json(newCourse);
};

const updateCourse = (req, res) => {
  const courseIndex = courseStore.findIndex(c => c._id === req.params.id);
  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }
  courseStore[courseIndex] = { ...courseStore[courseIndex], ...req.body };
  res.json(courseStore[courseIndex]);
};

const deleteCourse = (req, res) => {
  courseStore = courseStore.filter(c => c._id !== req.params.id);
  res.json({ message: 'Course deleted successfully' });
};

const addLectureToCourse = (req, res) => {
  const course = courseStore.find(c => c._id === req.params.id);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  const { title, duration, videoUrl, pdfUrl } = req.body;
  const newLecture = {
    id: `lec_${Date.now()}`,
    title: title || 'New Video Lecture',
    duration: duration || '15:00',
    videoUrl: videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4',
    pdfUrl: pdfUrl || '#',
    isCompleted: false
  };
  course.lectures.push(newLecture);
  res.status(201).json(course);
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addLectureToCourse,
  courseStore
};
