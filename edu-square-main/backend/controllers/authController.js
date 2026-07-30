const jwt = require('jsonwebtoken');


// Simple in-memory user collection fallback for demo & MongoDB database compatibility
let userStore = [];

const registerUser = (req, res) => {
  const { name, email, password, role, department } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  const existing = userStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: 'User already exists with this email address' });
  }

  const newUser = {
    _id: `usr_${Date.now()}`,
    name,
    email,
    password: password, // In production hashed with bcryptjs
    role: role || 'student',
    department: department || 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    isApproved: role === 'admin' ? true : true
  };

  userStore.push(newUser);

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name },
    process.env.JWT_SECRET || 'edusphere_super_secret_jwt_key',
    { expiresIn: '7d' }
  );

  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      avatar: newUser.avatar,
      isApproved: newUser.isApproved
    }
  });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const user = userStore.find(
        u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
        return res.status(401).json({
            message: "Please register first."
        });
    }

    if (user.password !== password) {
        return res.status(401).json({
            message: "Incorrect password."
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name
        },
        process.env.JWT_SECRET || "edusphere_super_secret_jwt_key",
        { expiresIn: "7d" }
    );

    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            avatar: user.avatar,
            isApproved: user.isApproved
        }
    });
};
const getCurrentUser = (req, res) => {
  const user = userStore.find(u => u._id === req.user.id) || userStore[0];
  res.json(user);
};

const getAllUsers = (req, res) => {
  res.json(userStore);
};

const toggleUserApproval = (req, res) => {
  const { userId } = req.params;
  const user = userStore.find(u => u._id === userId);
  if (user) {
    user.isApproved = !user.isApproved;
    return res.json({ message: 'User status updated successfully', user });
  }
  res.status(404).json({ message: 'User not found' });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  toggleUserApproval,
  userStore
};
