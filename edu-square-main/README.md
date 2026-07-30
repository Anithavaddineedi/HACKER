# EduSphere – AI-Powered Education and Learning Platform

EduSphere is an intelligent, full-stack educational web application designed for Students, Teachers, and Administrators. It unifies Learning Management (LMS), AI Tutoring, Online Assessments with timer MCQ & Coding tests, QR Code Attendance Tracking, Student Analytics, and AI Content Generation into a single modern platform.

---

## 🌟 Key Features

### 👨‍🎓 Student Role
- **Auth & Profile:** JWT Registration & Login, Role Switcher.
- **LMS Courses:** Video lectures playback, PDF notes downloading, course completion tracker, PDF completion certificate generator.
- **Assignments:** Code & notes submission with instant feedback.
- **Online Assessment:** Timer-based MCQ exams & live JavaScript coding sandbox with test cases.
- **Attendance:** QR code scanner simulation & monthly attendance log.
- **AI Tutor:** Interactive 24/7 AI tutor for concept explanations, textbook summaries, and personalized study plans.
- **Analytics:** Subject-wise performance radar charts and AI recommendations.

### 👩‍🏫 Teacher Role
- **Course Management:** Create, update, delete courses and add video lectures / notes.
- **AI Assessment Generator:** Generate MCQ quizzes on any syllabus topic using OpenAI.
- **Attendance & Grading:** Mark class attendance and review student assignments.

### 🛡️ Administrator Role
- **User Oversight:** Manage student and teacher accounts, approve pending access requests.
- **Platform Analytics:** View institutional enrollment metrics and download audit reports.

---

## 🛠️ Technology Stack

- **Frontend:** React.js (Vite), Tailwind CSS (Dark/Light mode, Glassmorphic UI), Recharts, Lucide Icons.
- **Backend:** Node.js, Express.js REST APIs.
- **Database:** MongoDB / Mongoose models (User, Course, Assignment, Quiz, Attendance, Analytics).
- **Authentication:** JWT (JSON Web Tokens).
- **Artificial Intelligence:** OpenAI API Integration with smart built-in fallback engine.

---

## 📁 Workspace Folder Structure

```
hackerrank_project/
├── backend/
│   ├── config/          # MongoDB Connection (db.js)
│   ├── controllers/     # Express Request Controllers
│   ├── middleware/      # Auth & Role verification middleware
│   ├── models/          # Mongoose Schemas (User, Course, Quiz, Attendance, etc.)
│   ├── routes/          # RESTful Endpoint Routes
│   ├── utils/           # AI Generator (OpenAI & Fallback) & Seed Data
│   ├── server.js        # Express Main Entry Server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbars, Sidebars, Dashboards, Quiz Runners, AI Tutor
│   │   ├── context/     # AuthContext & ThemeContext
│   │   ├── pages/       # All 16 Page Components (Landing, Home, Dashboard, etc.)
│   │   ├── services/    # Unified API service layer & fallback mock dataset
│   │   ├── App.jsx      # React Router Setup
│   │   └── index.css    # Tailwind CSS Design System
│   └── package.json
└── README.md
```

---

## 🚀 Running the Project

### 1. Start the Backend API Server
```bash
cd backend
npm install
npm start
```
*The backend server will run on `http://localhost:5000`.*

### 2. Start the Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
*The frontend application will run on `http://localhost:3000`.*
