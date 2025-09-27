'use client';
import React, { useState } from 'react';
import {
  Folder,
  Terminal,
  LayoutPanelTop,
  Eye,
} from 'lucide-react';

type Props = {
  onSelect: (panel: 'explorer' | 'terminal' | 'preview') => void;
  active: 'explorer' | 'terminal' | 'preview';
};

const ActivityBar: React.FC<Props> = ({ onSelect, active }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const icons = [
    { id: 'explorer', icon: <Folder size={20} />, label: 'Explorer' },
    { id: 'terminal', icon: <Terminal size={20} />, label: 'Terminal' },
    { id: 'preview', icon: <Eye size={20} />, label: 'Preview' },
  ];

  return (
    <div className="h-full w-12 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-3 space-y-4">
      {icons.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id as 'explorer' | 'terminal' | 'preview')}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-200
            ${
              active === id
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
        >
          {icon}
          {hovered === id && (
            <span className="absolute left-14 text-xs bg-zinc-800 text-white px-2 py-1 rounded shadow-lg z-50">
              {label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ActivityBar;
