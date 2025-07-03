import React from "react";
import CodeBlock from "./CodeBlock";

function formatLists(text: string) {
  text = text.replace(/(?<!^)(\d+\.\s)/gm, "<br/>$1");
  text = text.replace(/\n/g, "<br/>");
  return text;
}

function linkify(text: string) {
  text = formatLists(text);
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
    const partialCodeBlock = rest.match(/^```([a-z]*)\n([\s\S]*)/);
    if (partialCodeBlock) {
      elements.push(
        <CodeBlock
          code={partialCodeBlock[2]}
          language={partialCodeBlock[1]}
          key={key++}
        />,
      );
    } else {
      elements.push(
        <span
          key={key++}
          dangerouslySetInnerHTML={{ __html: linkify(rest) }}
        />,
      );
    }
  }
  return <>{elements}</>;
};

export default MessageContent;
