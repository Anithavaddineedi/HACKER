const { generateAIChatResponse } = require('../utils/aiGenerator');

const handleAIChat = async (req, res) => {
  const { message, mode = 'chat' } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Prompt message is required' });
  }

  try {
    const response = await generateAIChatResponse(message, mode);
    res.json({ response, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ message: 'AI Tutor service error', error: error.message });
  }
};

const explainConcept = async (req, res) => {
  const { concept } = req.body;
  const response = await generateAIChatResponse(concept || 'Neural Networks', 'explain');
  res.json({ response });
};

const generateSummary = async (req, res) => {
  const { text } = req.body;
  const response = await generateAIChatResponse(text || 'Deep Learning Fundamentals', 'summary');
  res.json({ response });
};

const generateStudyPlan = async (req, res) => {
  const { topic } = req.body;
  const response = await generateAIChatResponse(topic || 'Full Stack Web Architecture', 'study_plan');
  res.json({ response });
};

const generateNotes = async (req, res) => {
  const { topic } = req.body;
  const notes = `# Comprehensive Study Notes: ${topic || 'Computer Science Concepts'}\n\n` +
    `## 1. Executive Summary\n` +
    `These structured notes summarize key theoretical concepts, computational complexities, and implementation strategies for ${topic}.\n\n` +
    `## 2. Core Definitions\n` +
    `- **Primary Axiom:** System reliability correlates directly with modular component isolation.\n` +
    `- **Asymptotic Complexity:** Optimized execution time is bound by O(N log N).\n` +
    `- **Data Integrity:** Guaranteed through ACID transactions or event-driven state sync.\n\n` +
    `## 3. Best Practices & Key Insights\n` +
    `1. Always partition high-frequency workloads.\n` +
    `2. Write comprehensive unit tests for business logic.\n` +
    `3. Leverage EduSphere AI Tutor for real-time concept verification.`;

  res.json({ response: notes });
};

module.exports = {
  handleAIChat,
  explainConcept,
  generateSummary,
  generateStudyPlan,
  generateNotes
};
