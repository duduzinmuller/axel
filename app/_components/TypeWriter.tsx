"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startTyping?: boolean;
}

export default function TypeWriter({
  text,
  speed = 50,
  className = "",
  onComplete,
  startTyping = true,
}: TypeWriterProps) {
  const [delta, setDelta] = useState(speed);
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIndex(0);
    setDisplayText("");
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (!startTyping) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);

        setIndex((prev) => prev + 1);

        setDelta(speed + Math.random() * 40 - 20);
      }, delta);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [index, text, delta, speed, isComplete, startTyping, onComplete]);

  return (
    <div className={className}>
      {displayText}
      {!isComplete && startTyping && <span className="animate-pulse">|</span>}
    </div>
  );
}
