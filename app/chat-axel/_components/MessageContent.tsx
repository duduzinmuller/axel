import React from "react";
import CodeBlock from "./CodeBlock";

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
      <CodeBlock code={match[2]} language={match[1]} key={key++} />,
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
