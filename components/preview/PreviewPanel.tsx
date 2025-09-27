// /components/preview/PreviewPanel.tsx
'use client';

import React from 'react';

export default function PreviewPanel() {
  return (
    <div className="w-[40%] min-w-[200px] bg-[#EBD3F8] text-black p-4 border-l border-[#5E548E] overflow-auto">
      <h1 className="text-lg font-bold mb-2">Live Preview</h1>
      <p>Preview content will be shown here.</p>
    </div>
  );
}
