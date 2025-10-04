'use client';

import React from 'react';

const Output: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] text-gray-300 font-mono text-[13px] h-full px-5 py-4 overflow-y-auto leading-relaxed">
      <div className="text-gray-400 mb-2">[Running] main.py</div>
      <div>Hello, world!</div>
      <div>Code executed successfully.</div>
      <div className="text-gray-500 mt-3">[Done] exited with code=0 in 1.2s</div>
    </div>
  );
};

export default Output;
