'use client';

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../../components/Editor'), { ssr: false });

export default function RoomPage() {
  const { roomId } = useParams();

  if (!roomId || typeof roomId !== 'string') {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white text-lg">
        Loading room...
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#1e1e1e] text-white font-mono">
      <div className="w-60 bg-[#252526] border-r border-gray-700 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-2">Room ID</h2>
          <div className="bg-gray-800 p-2 rounded text-xs break-words text-blue-400">
            {roomId}
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-auto">Live Collaboration</div>
      </div>

      <div className="flex-1 p-4">
        <Editor roomId={roomId} />
      </div>
    </div>
  );
}
