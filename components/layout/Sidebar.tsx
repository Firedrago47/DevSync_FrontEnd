'use client';

import React from 'react';
import FileTree from '../file-explorer/FileTree';
import { FileNodeType } from '@/types/file';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#2A2A40] text-white border-r border-gray-700 flex flex-col overflow-y-auto">
      <div className="px-4 py-3 border-b border-gray-600">
        <h2 className="text-sm font-bold tracking-wide text-gray-300 uppercase">
          Explorer
        </h2>
      </div>
      <div className="flex-1 px-2 py-2">
        <FileTree />
      </div>
    </div>
  );
};

export default Sidebar;
 