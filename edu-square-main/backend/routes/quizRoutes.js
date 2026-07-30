const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, generateQuizWithAI, submitQuizScore } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/generate-ai', authMiddleware, generateQuizWithAI);
router.post('/:id/submit', authMiddleware, submitQuizScore);

module.exports = router;
