'use client';

import React, { useState, useRef, useEffect } from 'react';
import Terminal from '../terminal/Terminal';
import Output from '../terminal/output';

type BottomPanelProps = {
  isVisible: boolean;
  onResize?: (height: number) => void;
};

const BottomPanel: React.FC<BottomPanelProps> = ({ isVisible, onResize }) => {
  const [activeTab, setActiveTab] = useState<'output' | 'terminal'>('output');
  const panelRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !panelRef.current) return;
      const newHeight = window.innerHeight - e.clientY;
      onResize?.(Math.min(Math.max(newHeight, 140), 500));
    };

    const stopResize = () => (isResizing.current = false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [onResize]);

  if (!isVisible) return null;

  return (
    <div
      ref={panelRef}
      className="bg-[#1E1E1E] text-white flex flex-col border-t border-[#2D2D2D] shadow-[0_-1px_4px_rgba(0,0,0,0.4)]"
      style={{ height: '300px', minHeight: '140px', maxHeight: '500px' }} // fixed panel size
    >
      {/* Resize Handle */}
      <div
        className="h-1 cursor-row-resize bg-[#2D2D2D] hover:bg-[#3E3E3E] transition-colors"
        onMouseDown={() => (isResizing.current = true)}
      />

      {/* Tabs */}
      <div className="flex items-center border-b border-[#2D2D2D] bg-[#252526] text-sm select-none">
        {['output', 'terminal'].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab as 'output' | 'terminal')}
            className={`px-5 py-2.5 cursor-pointer capitalize font-medium transition-all ${
              activeTab === tab
                ? 'bg-[#1E1E1E] text-[#FFFFFF] border-t-2 border-gray-400'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#2C2C2C]'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'output' ? <Output /> : <Terminal />}
      </div>
    </div>
  );
};

export default BottomPanel;
