'use client';

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
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

  const [code, setCode] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize Socket
  useEffect(() => {
    const newSocket = io('http://localhost:6969');
    setSocket(newSocket);

    newSocket.on('code-output', (output: string) => {
      setLogs((prev) => [...prev, output]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle Run Button
  const handleRunCode = () => {
    if (!socket) return;
    setLogs([]); // reset logs before running
    socket.emit('run-code', { roomId, code });
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e2e] text-white">
      {/* Header */}
      <Header
        roomId={roomId}
        title="DevSync"
        onToggleSidebar={() => setShowSidebar((prev) => !prev)}
        onToggleBottomPanel={() => setShowBottomPanel((prev) => !prev)}
        onRunCode={handleRunCode}
      />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar onSelect={() => {}} active="explorer" />
        {showSidebar && <Sidebar />}

        <div className="flex flex-col flex-1 overflow-hidden">
          <EditorTabs />

          <div className="flex-1 overflow-hidden relative">
            {/* Editor */}
            <div
              className="absolute inset-0"
              style={{
                height: `calc(100% - ${showBottomPanel ? bottomHeight : 0}px)`,
              }}
            >
              <CodeEditor
                fileName="main.py"
                roomId={roomId}
                code={code}
                onChange={setCode}
                socket={socket}
              />
            </div>

            {/* Bottom Panel */}
            {showBottomPanel && (
              <div
                className="absolute bottom-0 left-0 right-0 border-t border-gray-700"
                style={{ height: bottomHeight }}
              >
                <BottomPanel
                  isVisible={true}
                  logs={logs}
                  onResize={(h) => setBottomHeight(h)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
