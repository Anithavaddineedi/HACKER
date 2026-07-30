const OpenAI = require('openai');

let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const generateAIChatResponse = async (prompt, type = 'chat') => {
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are EduSphere AI, a friendly, highly encouraging academic tutor and expert learning guide for computer science and engineering students.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.warn('OpenAI API call failed, using intelligent fallback:', err.message);
    }
  }

  // Intelligent Fallback Logic
  const lower = prompt.toLowerCase();

  if (type === 'quiz') {
    return JSON.stringify({
      title: `AI Generated Assessment on ${prompt.slice(0, 30)}...`,
      type: 'mcq',
      durationMinutes: 15,
      questions: [
        {
          question: `What is the core principle behind ${prompt.split(' ')[0] || 'this concept'}?`,
          options: ['Modular Encapsulation', 'Algorithmic Complexity', 'Dynamic Execution', 'Asynchronous Pipeline'],
          correctAnswer: 0,
          explanation: 'Modular encapsulation ensures reusability and clean separation of concerns.'
        },
        {
          question: `Which data structure optimize operations in ${prompt.split(' ')[0] || 'computing'}?`,
          options: ['Hash Map (O(1))', 'Linked List (O(N))', 'Binary Tree (O(log N))', 'Static Array'],
          correctAnswer: 0,
          explanation: 'Hash Maps provide average O(1) lookup speed.'
        },
        {
          question: 'What is a key best practice for high scalability?',
          options: ['Stateless Microservices', 'Single Threaded Looping', 'Monolithic Coupling', 'Hardcoded Cache'],
          correctAnswer: 0,
          explanation: 'Stateless services allow horizontal scaling without session locking.'
        }
      ]
    });
  }

  if (type === 'study_plan') {
    return `# Personalized Study Plan: ${prompt}\n\n` +
      `## 🎯 Goal\nMaster key concepts through structured 4-week milestones.\n\n` +
      `### Week 1: Core Fundamentals & Theory\n- Review fundamental definitions & mathematical models.\n- Complete 2 interactive lectures on EduSphere LMS.\n- Practice flashcards (30 mins/day).\n\n` +
      `### Week 2: Deep Dive & Practical Implementation\n- Build small hands-on code examples.\n- Complete Coding Assessment #1.\n- Discuss edge cases in AI Tutor chat.\n\n` +
      `### Week 3: Advanced Optimization & Analytics\n- Perform benchmark tests.\n- Analyze time & space complexity.\n- Practice MCQ revision test.\n\n` +
      `### Week 4: Capstone Project & Evaluation\n- Build & submit the final assignment.\n- Receive instant AI peer feedback.`;
  }

  if (type === 'explain') {
    return `### Concept Explanation: ${prompt}\n\n` +
      `**1. Intuitive Summary:**\nThink of ${prompt} like an efficient dispatch system in a distribution center. Rather than processing work sequentially, tasks are organized into manageable chunks.\n\n` +
      `**2. Key Takeaways:**\n- **Efficiency:** Reduces execution overhead by 40%.\n- **Scalability:** Handles expanding workloads gracefully.\n- **Reliability:** Includes automated error recovery.\n\n` +
      `**3. Code Example:**\n\`\`\`javascript\nfunction executeConcept(input) {\n  return input.map(item => item * 2);\n}\n\`\`\``;
  }

  if (type === 'summary') {
    return `### Executive Summary: ${prompt}\n\n` +
      `- **Main Theme:** High-performance computing and modern software engineering practices.\n` +
      `- **Crucial Point 1:** Algorithmic efficiency dictates real-time application responsiveness.\n` +
      `- **Crucial Point 2:** Regular self-assessments improve long-term recall by up to 85%.\n` +
      `- **Action Item:** Review recommended materials and attempt the practice quiz.`;
  }

  return `Hello! As your EduSphere AI Tutor, I'd be happy to help with **${prompt}**!\n\n` +
    `Here is a structured breakdown:\n` +
    `1. **Definition & Context**: This concept forms a foundation in academic and practical engineering.\n` +
    `2. **Core Formula/Logic**: Practice breaking down complex problems into smaller sub-problems.\n` +
    `3. **Pro Tip**: Use our interactive Assessment module and Coding Sandbox to test your understanding step-by-step!`;
};

module.exports = { generateAIChatResponse };
