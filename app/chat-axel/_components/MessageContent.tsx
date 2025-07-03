import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function linkify(text: string) {
  return text.replace(
    /(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#4f8cff; text-decoration:underline;">$1</a>',
  );
}
const MessageContent = ({ content }: { content: string }) => {
  const codeBlockRegex = /```([a-z]*)\n([\s\S]*?)```/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const before = content.slice(lastIndex, match.index);
      elements.push(
        <span
          key={key++}
          dangerouslySetInnerHTML={{ __html: linkify(before) }}
        />,
      );
    }
    elements.push(
      <div style={{ position: "relative", margin: "1em 0" }} key={key++}>
        <SyntaxHighlighter language={match[1] || "javascript"} style={oneDark}>
          {match[2]}
        </SyntaxHighlighter>
        <button
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "2px 8px",
            cursor: "pointer",
          }}
          onClick={() => {
            if (match && match[2]) {
              navigator.clipboard.writeText(match[2]);
            }
          }}
        >
          Copiar /```([a-z]*)\n([\s\S]*?)```/g;{" "}
        </button>
      </div>,
    );
    lastIndex = codeBlockRegex.lastIndex;
  }
  if (lastIndex < content.length) {
    const rest = content.slice(lastIndex);
    elements.push(
      <span key={key++} dangerouslySetInnerHTML={{ __html: linkify(rest) }} />,
    );
  }
  return <>{elements}</>;
};

export default MessageContent;
