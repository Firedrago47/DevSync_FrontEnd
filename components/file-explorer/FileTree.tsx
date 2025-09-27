'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Folder,
  FileText,
  Plus,
  Trash2,
  Pencil,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

import { FileNodeType } from '@/types/file';
import {
  getFilesFromStorage,
  saveFilesToStorage,
  getFileContent,
} from '@/utils/fileStorage';
import { getLanguageFromExtension } from '@/utils/languageUtils';
import { useTabStore } from '@/state/tabState';

const FileTree: React.FC = () => {
  const [tree, setTree] = useState<FileNodeType[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const { addTab } = useTabStore();

  useEffect(() => {
    const stored = getFilesFromStorage();
    setTree(stored);
  }, []);

  const updateTree = (updated: FileNodeType[]) => {
    setTree(updated);
    saveFilesToStorage(updated);
  };

  const toggleExpand = (id: string) => {
    const newSet = new Set(expanded);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setExpanded(newSet);
  };

  const createNode = (type: 'file' | 'folder', parentId?: string) => {
  const name = prompt(`Enter ${type} name`);
  if (!name) return;

  const newNode: FileNodeType = {
    id: uuidv4(),
    name,
    type,
    parentId,
  };

  const updatedTree = [...tree, newNode];
  updateTree(updatedTree);

  // Open the file immediately after creation
  if (type === 'file') {
    addTab({
      id: newNode.id,
      name: newNode.name,
      path: newNode.id,
      content: '', // New file, so empty content
      language: getLanguageFromExtension(newNode.name),
    });
  }
};

  const renameNode = (id: string) => {
    const name = prompt('Enter new name');
    if (!name) return;

    updateTree(tree.map(n => (n.id === id ? { ...n, name } : n)));
  };

  const deleteNode = (id: string) => {
    if (!confirm('Delete this item and its children?')) return;

    const removeRecursive = (id: string): string[] => {
      const children = tree.filter(n => n.parentId === id);
      return [id, ...children.flatMap(child => removeRecursive(child.id))];
    };

    const toDelete = removeRecursive(id);
    updateTree(tree.filter(n => !toDelete.includes(n.id)));
  };

  const openFile = (node: FileNodeType) => {
    if (node.type !== 'file') return;

    addTab({
      id: node.id,
      name: node.name,
      path: node.id,
      content: getFileContent(node.id),
      language: getLanguageFromExtension(node.name),
    });
  };

  const renderNodes = (parentId?: string) => {
    const children = tree.filter(n => n.parentId === parentId);

    return (
      <ul className="ml-2">
        {children.map(node => {
          const isFolder = node.type === 'folder';
          const isOpen = expanded.has(node.id);

          return (
            <li key={node.id} className="group">
              <div className="flex items-center justify-between p-1 hover:bg-zinc-700 rounded">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() =>
                    isFolder ? toggleExpand(node.id) : openFile(node)
                  }
                >
                  {isFolder ? (
                    isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                  ) : (
                    <FileText size={14} />
                  )}
                  {isFolder && <Folder size={14} />}
                  <span className="text-sm truncate max-w-[140px]">{node.name}</span>
                </div>
                <div className="hidden group-hover:flex gap-1">
                  <Pencil
                    size={13}
                    className="cursor-pointer text-blue-400"
                    onClick={() => renameNode(node.id)}
                  />
                  <Trash2
                    size={13}
                    className="cursor-pointer text-red-400"
                    onClick={() => deleteNode(node.id)}
                  />
                  {isFolder && (
                    <>
                      <Plus
                        size={13}
                        className="cursor-pointer text-green-400"
                        onClick={() => createNode('file', node.id)}
                      />
                      <Folder
                        size={13}
                        className="cursor-pointer text-yellow-400"
                        onClick={() => createNode('folder', node.id)}
                      />
                    </>
                  )}
                </div>
              </div>
              {isFolder && isOpen && renderNodes(node.id)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="p-2 overflow-y-auto h-full text-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">Project</h2>
        <div className="flex gap-2">
          <Plus
            size={16}
            className="cursor-pointer text-green-400"
            onClick={() => createNode('file')}
          />
          <Folder
            size={16}
            className="cursor-pointer text-yellow-400"
            onClick={() => createNode('folder')}
          />
        </div>
      </div>
      {renderNodes()}
    </div>
  );
};

export default FileTree;
