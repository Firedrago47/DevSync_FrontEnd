'use client';
import React, { ReactNode } from 'react';
import EditorTabs from '../Editor/EditorTabs';

const EditorArea = ({
  className = '',
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => (
  <div className={`h-full ${className} bg-gray-900`}>
    {children ?? <EditorTabs />}
  </div>
);

export default EditorArea;
