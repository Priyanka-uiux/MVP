// src/components/CircularPercentageBar.js
import React from "react";

const CircularPercentageBar = ({ value, pathColor = "#33cae5", textColor = "#fff" }) => {
  const strokeDashoffset = 440 - (440 * value) / 100;

  return (
    <div className="relative w-[120px] h-[120px]">
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="60"
          cy="60"
          r="70"
          stroke="#444"
          strokeWidth="10"
          fill="none"
          className="opacity-25"
        />
        <circle
          cx="60"
          cy="60"
          r="70"
          stroke={pathColor}
          strokeWidth="10"
          fill="none"
          strokeDasharray="440"
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-xl font-bold"
        style={{ color: textColor }}
      >
        {value}%
      </div>
    </div>
  );
};

export default CircularPercentageBar;
