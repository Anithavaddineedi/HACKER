const express = require('express');
const router = express.Router();
const { handleAIChat, explainConcept, generateSummary, generateStudyPlan, generateNotes } = require('../controllers/aiController');

router.post('/chat', handleAIChat);
router.post('/explain', explainConcept);
router.post('/summary', generateSummary);
router.post('/study-plan', generateStudyPlan);
router.post('/notes', generateNotes);

module.exports = router;
