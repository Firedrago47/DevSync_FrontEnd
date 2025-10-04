'use client';

import React from 'react';
import FileTree from '../file-explorer/FileTree';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#252526] text-white border-r border-[#333] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#333]">
        <h2 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Explorer
        </h2>
      </div>

      {/* FileTree */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <FileTree />
      </div>
    </div>
  );
};

export default Sidebar;
