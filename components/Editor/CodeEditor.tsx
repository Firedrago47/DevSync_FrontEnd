'use client';

import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { getLanguageFromExtension } from '@/utils/helpers';

type CodeEditorProps = {
  fileName: string;
  code: string;
  onChange: (value: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, code, onChange }) => {
  const editorRef = useRef(null);
  const language = getLanguageFromExtension(fileName);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={code}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        onChange={(value) => onChange(value || '')}
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
