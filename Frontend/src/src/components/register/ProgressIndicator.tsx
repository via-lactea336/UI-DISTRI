import React from "react";

interface ProgressIndicatorProps {
  step: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ step }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            step >= 1
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          1
        </div>
        <div
          className={`flex-1 h-1 ${
            step >= 2 ? "bg-[var(--color-primary)]" : "bg-gray-300"
          }`}
        ></div>
      </div>
      <div className="flex items-center">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            step >= 2
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          2
        </div>
        <div
          className={`flex-1 h-1 ${
            step >= 3 ? "bg-[var(--color-primary)]" : "bg-gray-300"
          }`}
        ></div>
      </div>
      <div className="flex items-center">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            step >= 3
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          3
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
