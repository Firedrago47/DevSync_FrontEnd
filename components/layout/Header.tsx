'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Menu, ClipboardCopy, ChevronDown } from 'lucide-react';
import { toast } from 'sonner'; // assumes you're using "sonner" or you can swap with any toast lib

type HeaderProps = {
  roomId: string;
  title?: string;
  onToggleSidebar: () => void;
  onToggleBottomPanel: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  onToggleSidebar,
  onToggleBottomPanel,
}) => {
  const params = useParams();
  const roomId = params?.roomId as string;

  const displayTitle = title ?? 'Untitled Project';

  const handleCopyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard!');
    }
  };

  return (
    <header className="h-12 px-4 flex items-center justify-between bg-zinc-900 border-b border-zinc-700">
      {/* Left: Title & Sidebar */}
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onToggleSidebar} className="hover:text-zinc-300 transition">
          <Menu size={20} />
        </button>
        <h1 className="text-sm font-semibold truncate text-white">
          {displayTitle}
        </h1>
        {roomId && (
          <span className="ml-2 px-2 py-0.5 bg-zinc-700 text-xs rounded text-zinc-300">
            Room: {roomId.slice(0, 8)}...
          </span>
        )}
      </div>

      {/* Right: Copy + Toggle Bottom Panel */}
      <div className="flex items-center gap-3">
        {roomId && (
          <button
            onClick={handleCopyRoomId}
            className="text-xs px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-200 transition"
          >
            <ClipboardCopy size={14} className="inline mr-1" />
            Copy ID
          </button>
        )}
        <button onClick={onToggleBottomPanel} className="hover:text-zinc-300 transition">
          <ChevronDown size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
