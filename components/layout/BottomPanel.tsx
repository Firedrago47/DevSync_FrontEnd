'use client';

import React, { useRef, useEffect } from 'react';
import Terminal from '../terminal/Terminal';

type BottomPanelProps = {
  isVisible: boolean;
  onResize?: (height: number) => void;
};

const BottomPanel: React.FC<BottomPanelProps> = ({ isVisible, onResize }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !panelRef.current) return;
      const newHeight = window.innerHeight - e.clientY;
      onResize?.(Math.min(Math.max(newHeight, 120), 400)); // clamp between 120-400px
    };

    const stopResize = () => {
      isResizing.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [onResize]);

  if (!isVisible) return null;

  return (
    <div ref={panelRef} className="bg-[#1E1E2E] text-white h-full flex flex-col">
      {/* Resize Handle */}
      <div
        className="h-0.5 cursor-row-resize bg-gray-700 hover:bg-gray-500"
        onMouseDown={() => (isResizing.current = true)}
      />

      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#2B2B3D]">
        <h3 className="text-sm font-medium text-gray-300 tracking-wide">Terminal</h3>
        <span className="text-xs text-gray-500">Output • Logs • Debug</span>
      </div>

      {/* Terminal Content */}
      <div className="px-3 py-2 overflow-auto text-sm font-mono flex-1">
        <Terminal />
      </div>
    </div>
  );
};

export default BottomPanel;
