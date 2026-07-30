const { seedAttendance } = require('../utils/seedData');

let attendanceStore = [...seedAttendance];

const getAttendanceRecords = (req, res) => {
  res.json(attendanceStore);
};

const markAttendance = (req, res) => {
  const { studentName, courseTitle, date, status, method } = req.body;
  const record = {
    _id: `att_${Date.now()}`,
    studentName: studentName || req.user.name || 'Alex Johnson',
    courseTitle: courseTitle || 'CS401: Advanced ML',
    date: date || new Date().toISOString().split('T')[0],
    status: status || 'present',
    method: method || 'manual'
  };

  attendanceStore.unshift(record);
  res.status(201).json({ message: 'Attendance marked successfully', record });
};

const scanQRAttendance = (req, res) => {
  const { qrCodeToken, courseTitle } = req.body;
  const record = {
    _id: `att_${Date.now()}`,
    studentName: req.user.name || 'Alex Johnson',
    courseTitle: courseTitle || 'CS401: Advanced ML',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    method: 'qr',
    qrToken: qrCodeToken || 'EDUSPHERE-QR-883921'
  };

  attendanceStore.unshift(record);
  res.status(201).json({ message: 'QR Code Attendance Scanned & Recorded!', record });
};

const getMonthlyReport = (req, res) => {
  const total = attendanceStore.length || 1;
  const present = attendanceStore.filter(a => a.status === 'present').length;
  const late = attendanceStore.filter(a => a.status === 'late').length;
  const absent = attendanceStore.filter(a => a.status === 'absent').length;

  res.json({
    percentage: Math.round(((present + late * 0.5) / total) * 100),
    totalClasses: total,
    present,
    late,
    absent,
    breakdown: [
      { name: 'Present', value: present },
      { name: 'Late', value: late },
      { name: 'Absent', value: absent }
    ]
  });
};

module.exports = {
  getAttendanceRecords,
  markAttendance,
  scanQRAttendance,
  getMonthlyReport,
  attendanceStore
};
