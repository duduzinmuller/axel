import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, CopyCheck } from "lucide-react";

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div style={{ position: "relative", margin: "1em 0" }}>
      <SyntaxHighlighter language={language || "javascript"} style={oneDark}>
        {code}
      </SyntaxHighlighter>
      <button
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "transparent",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "2px 8px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? <CopyCheck /> : <Copy />}
      </button>
    </div>
  );
};

export default CodeBlock;
