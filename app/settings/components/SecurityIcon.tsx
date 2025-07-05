"use client";
import React from "react";

export default function SecurityIcon() {
  return (
    <span className="inline-block">
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          stroke="#fff"
          strokeWidth="1.5"
          d="M12 3.5c-2.5 0-4.5 2-4.5 4.5v.5H7a4 4 0 0 0-4 4v2.5A4 4 0 0 0 7 19h10a4 4 0 0 0 4-4v-2.5a4 4 0 0 0-4-4h-.5v-.5c0-2.5-2-4.5-4.5-4.5Z"
        />
        <path stroke="#fff" strokeWidth="1.5" d="M12 7.5v3" />
        <circle cx="12" cy="15" r="1" fill="#fff" />
      </svg>
    </span>
  );
}
