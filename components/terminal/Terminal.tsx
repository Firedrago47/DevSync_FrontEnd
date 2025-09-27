'use client';

import React, { useState } from 'react';

const Terminal: React.FC = () => {
  const [output, setOutput] = useState<string[]>([
    'DevSync Terminal (v1.0.0)',
    'Type "help" to see available commands.',
  ]);
  const [input, setInput] = useState('');

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const newOutput = [...output, `> ${trimmed}`];

    switch (trimmed.toLowerCase()) {
      case 'help':
        newOutput.push('Available commands: help, clear, echo [text]');
        break;
      case 'clear':
        setOutput([]);
        return;
      case '':
        break;
      default:
        if (trimmed.startsWith('echo ')) {
          newOutput.push(trimmed.slice(5));
        } else {
          newOutput.push(`Unknown command: ${trimmed}`);
        }
        break;
    }

    setOutput(newOutput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-mono text-sm text-gray-200">
      <div className="flex-1 overflow-y-auto space-y-1 px-2">
        {output.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <div className="border-t border-gray-700 mt-2 px-2 py-1 bg-[#2B2B3D]">
        <span className="text-green-400">user@devsync</span>
        <span className="text-gray-400">:~$</span>
        <input
          type="text"
          className="bg-transparent outline-none text-white ml-2 w-[80%]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
