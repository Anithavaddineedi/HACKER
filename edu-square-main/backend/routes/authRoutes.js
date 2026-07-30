const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser, getAllUsers, toggleUserApproval } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:userId/approval', authMiddleware, toggleUserApproval);

module.exports = router;
