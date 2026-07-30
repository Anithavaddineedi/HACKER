import React, { useState } from 'react';
import { Play, Code, CheckCircle, Sparkles, Terminal, ArrowLeft } from 'lucide-react';

export const CodingSandbox = ({ question, onBack }) => {
  const [code, setCode] = useState(
    question?.starterCode ||
      'function inorderTraversal(root) {\n  const result = [];\n  // Write your logic here\n  if (!root) return result;\n  function traverse(node) {\n    if (!node) return;\n    traverse(node.left);\n    result.push(node.val);\n    traverse(node.right);\n  }\n  traverse(root);\n  return result;\n}'
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput({
        status: 'Passed',
        testCasesPassed: '2 / 2 Passed',
        runtime: '42 ms',
        memory: '41.8 MB',
        logs: [
          'Running Test Case 1: Input [1, null, 2, 3] -> Output [1, 3, 2] (PASSED)',
          'Running Test Case 2: Input [] -> Output [] (PASSED)',
          'AI Tutor Feedback: Clean recursive implementation with O(N) time complexity.'
        ]
      });
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Quizzes
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Coding Sandbox
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Problem Description */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Code className="w-4 h-4" /> Data Structures & Algorithms
          </div>
          <h2 className="text-lg font-bold text-white">Coding Test: Binary Tree Traversal</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Write an efficient function <code className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded font-mono">inorderTraversal(root)</code> that accepts the root of a binary tree and returns an array containing its node values visited in-order.
          </p>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Example Test Cases</h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
              <p><strong className="text-blue-400">Input:</strong> root = [1, null, 2, 3]</p>
              <p><strong className="text-emerald-400">Output:</strong> [1, 3, 2]</p>
            </div>
          </div>
        </div>

        {/* Right Col: Live Editor & Execution Terminal */}
        <div className="space-y-4">
          <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
            {/* Editor Toolbar */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">solution.js</span>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-xl gradient-bg-primary text-white text-xs font-bold shadow-glow-blue flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isRunning ? 'Executing Test Cases...' : 'Run Code'}
              </button>
            </div>

            {/* Code Input Area */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 bg-slate-950 font-mono text-xs text-emerald-400 focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Execution Terminal */}
          {output && (
            <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-slate-950/80 font-mono text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Execution Result: {output.status}
                </span>
                <span className="text-[10px] text-slate-400">{output.runtime}</span>
              </div>
              {output.logs.map((log, i) => (
                <p key={i} className="text-slate-300 text-[11px]">• {log}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
