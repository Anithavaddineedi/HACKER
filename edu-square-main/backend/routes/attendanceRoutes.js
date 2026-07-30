const express = require('express');
const router = express.Router();
const { getAttendanceRecords, markAttendance, scanQRAttendance, getMonthlyReport } = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAttendanceRecords);
router.post('/mark', authMiddleware, markAttendance);
router.post('/scan-qr', authMiddleware, scanQRAttendance);
router.get('/report', getMonthlyReport);

module.exports = router;
