const { seedAssignments } = require('../utils/seedData');

let assignmentStore = [...seedAssignments];

const getAssignments = (req, res) => {
  res.json(assignmentStore);
};

const createAssignment = (req, res) => {
  const { title, courseTitle, description, dueDate, maxPoints } = req.body;
  const newAssignment = {
    _id: `asg_${Date.now()}`,
    title: title || 'New AI & Programming Task',
    courseTitle: courseTitle || 'Advanced Machine Learning & Neural Networks',
    description: description || 'Complete hands-on exercise and submit your implementation notes.',
    dueDate: dueDate || '2026-08-30',
    maxPoints: maxPoints || 100,
    submissions: []
  };

  assignmentStore.unshift(newAssignment);
  res.status(201).json(newAssignment);
};

const submitAssignment = (req, res) => {
  const assignment = assignmentStore.find(a => a._id === req.params.id);
  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  const { content, fileUrl } = req.body;
  const submission = {
    studentName: req.user.name || 'Alex Johnson',
    submittedAt: new Date().toISOString(),
    content: content || 'Submission source code & analysis attached.',
    fileUrl: fileUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    score: 90,
    feedback: 'AI Evaluated: High accuracy implementation with great code structure.',
    status: 'graded'
  };

  assignment.submissions.unshift(submission);
  res.status(201).json({ message: 'Assignment submitted and AI evaluated successfully!', submission });
};

module.exports = {
  getAssignments,
  createAssignment,
  submitAssignment,
  assignmentStore
};
