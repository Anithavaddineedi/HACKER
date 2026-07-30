const express = require('express');
const router = express.Router();
const { getStudentAnalytics, getAdminAnalytics } = require('../controllers/analyticsController');

router.get('/student', getStudentAnalytics);
router.get('/admin', getAdminAnalytics);

module.exports = router;
