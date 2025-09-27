'use client';

import React, { useState } from 'react';
import ActivityBar from './ActivityBar';
import Sidebar from './Sidebar';
import BottomPanel from './BottomPanel';
import Header from './Header';
import EditorTabs from '../Editor/EditorTabs';
import CodeEditor from '../Editor/CodeEditor';
type LayoutProps = {
  roomId: string;
};

const Layout: React.FC<LayoutProps> = ({ roomId }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBottomPanel, setShowBottomPanel] = useState(true);
  const [bottomHeight, setBottomHeight] = useState(200);

  return (
    <div className="flex flex-col h-screen bg-[#1e1e2e] text-white">
      <Header
        roomId={roomId}
        title="DevSync"
        onToggleSidebar={() => setShowSidebar((prev) => !prev)}
        onToggleBottomPanel={() => setShowBottomPanel((prev) => !prev)}
      />

      <div className="flex flex-1 overflow-hidden">
        <ActivityBar onSelect={() => {}} active="explorer" />
        {showSidebar && <Sidebar />}

        {/* Editor and Bottom Panel */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <EditorTabs/>
          <div className="flex-1 overflow-hidden relative">
            <div
              className="absolute inset-0"
              style={{ height: `calc(100% - ${showBottomPanel ? bottomHeight : 0}px)` }}
            >
              <CodeEditor fileName={''} code={''} onChange={() => {}} />
            </div>
            {showBottomPanel && (
              <div
                className="absolute bottom-0 left-0 right-0 border-t border-gray-700"
                style={{ height: bottomHeight }}
              >
                <BottomPanel isVisible={true} onResize={(newHeight) => setBottomHeight(newHeight)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
