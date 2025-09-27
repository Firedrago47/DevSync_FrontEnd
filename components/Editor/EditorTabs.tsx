'use client';

import { X } from 'lucide-react';
import { useTabStore } from '@/state/tabState';

const EditorTabs = () => {
  const { tabs, activeTabId, setActiveTab, closeTab } = useTabStore();

  return (
    <div className="flex h-11 items-center bg-zinc-800 border-b border-zinc-700 px-2 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          name={tab.name}
          isActive={tab.id === activeTabId}
          onActivate={() => setActiveTab(tab.id)}
          onClose={() => closeTab(tab.id)}
        />
      ))}
    </div>
  );
};

type TabProps = {
  id: string;
  name: string;
  isActive: boolean;
  onActivate: () => void;
  onClose: () => void;
};

const Tab = ({ name, isActive, onActivate, onClose }: TabProps) => (
  <div
    onClick={onActivate}
    title={name}
    className={`flex items-center px-3 py-1 rounded-t-md mr-2 cursor-pointer ${
      isActive
        ? 'bg-zinc-900 text-white border-t border-x border-zinc-600'
        : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
    }`}
  >
    <span className="truncate max-w-[120px]">{name}</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="ml-2 text-xs hover:text-red-400"
      aria-label={`Close ${name}`}
    >
      <X size={14} />
    </button>
  </div>
);

export default EditorTabs;
