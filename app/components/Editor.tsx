'use client';

import { useEffect, useState } from "react";
import { socket } from "../../socket";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";

type Props = {
  roomId: string;
};

const languageExtensions: any = {
  python: python(),
  javascript: javascript(),
  cpp: cpp?.(),
};

export default function Editor({ roomId }: Props) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<"python" | "javascript" | "cpp">("python");

  useEffect(() => {
    socket.emit("join-room", { roomId });

    socket.on("init-code", (initCode) => setCode(initCode));
    socket.on("code-change", (newCode) => setCode(newCode));
    socket.on("code-output", (result) => setOutput(result));
    socket.on("language-change", (newLang) => {
      console.log("Language received from socket:", newLang);
      setLanguage(newLang);
    });

    return () => {
      socket.off("init-code");
      socket.off("code-change");
      socket.off("code-output");
      socket.off("language-change");
    };
  }, [roomId]);

  const handleChange = (value: string) => {
    setCode(value);
    socket.emit("code-change", { roomId, code: value });
  };

  const handleRun = () => {
    socket.emit("run-code", { code, language, roomId });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as "python" | "javascript" | "cpp";
    setLanguage(newLang);
    socket.emit("language-change", { roomId, language: newLang });
  };

  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Collaborative Code Editor</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="language" className="text-sm">Language:</label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </div>

      <CodeMirror
        value={code}
        height="400px"
        extensions={[languageExtensions[language]]}
        theme="dark"
        onChange={handleChange}
      />

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleRun}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium shadow-md"
        >
          ▶ Run Code
        </button>
        <span className="text-gray-400 text-sm">Room: {roomId}</span>
      </div>

      <div className="mt-6 border border-gray-700 rounded-md overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 text-sm font-semibold border-b border-gray-700">
          Output
        </div>
        <pre className="bg-black text-green-400 px-4 py-3 text-sm overflow-auto whitespace-pre-wrap h-48">
          {output || "Your output will appear here..."}
        </pre>
      </div>
    </div>
  );
}
