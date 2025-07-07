"use client";
import React, { useEffect, useRef } from "react";
import "./RangeSlider.css";

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  leftLabel?: string;
  rightLabel?: string;
  centerLabel?: string;
  className?: string;
}

export default function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  leftLabel,
  rightLabel,
  centerLabel,
  className = "",
}: RangeSliderProps) {
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const percentage = ((value - min) / (max - min)) * 100;
      sliderRef.current.style.setProperty("--value", `${percentage}%`);
    }
  }, [value, min, max]);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex w-full items-center">
        {leftLabel && (
          <span className="w-20 text-left text-[10px] text-neutral-400">
            {leftLabel}
          </span>
        )}
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="range-slider mx-2 flex-1"
        />
        {rightLabel && (
          <span className="w-20 text-right text-[10px] text-neutral-400">
            {rightLabel}
          </span>
        )}
      </div>
      {centerLabel && (
        <div className="flex w-full justify-center">
          <span className="text-[12px] text-neutral-400">{centerLabel}</span>
        </div>
      )}
    </div>
  );
}
