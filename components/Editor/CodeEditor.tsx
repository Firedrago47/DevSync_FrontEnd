'use client';

import React, { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Socket } from 'socket.io-client';
import { getLanguageFromExtension } from '@/utils/helpers';

type CodeEditorProps = {
  fileName: string;
  roomId: string;
  code: string;
  onChange: (code: string) => void;
  socket: Socket | null;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, roomId, code, onChange, socket }) => {
  const editorRef = useRef<any>(null);
  const language = getLanguageFromExtension(fileName);

  // Join room and listen to updates
  useEffect(() => {
    if (!socket) return;

    socket.emit('join-room', { roomId });

    socket.on('init-code', (initialCode: string) => {
      onChange(initialCode || '');
      editorRef.current?.setValue(initialCode || '');
    });

    socket.on('code-change', (newCode: string) => {
      if (editorRef.current && newCode !== editorRef.current.getValue()) {
        editorRef.current.setValue(newCode);
        onChange(newCode);
      }
    });

    return () => {
      socket.off('init-code');
      socket.off('code-change');
    };
  }, [socket, roomId, onChange]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleChange = (value: string | undefined) => {
    const newValue = value || '';
    onChange(newValue);
    if (socket) socket.emit('code-change', { roomId, code: newValue });
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={language}
        value={code}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        onChange={handleChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollbar: {
            verticalScrollbarSize: 4,
            horizontalScrollbarSize: 4,
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;
