const express = require('express');
const router = express.Router();
const { getAssignments, createAssignment, submitAssignment } = require('../controllers/assignmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAssignments);
router.post('/', authMiddleware, createAssignment);
router.post('/:id/submit', authMiddleware, submitAssignment);

module.exports = router;
