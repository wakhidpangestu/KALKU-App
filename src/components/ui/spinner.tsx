import React from "react";

export default function SpinnerIOS({ className = "", size = 40 }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin-ios"
        style={{ filter: "drop-shadow(0 0 8px #3b82f6)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 6}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="5"
          strokeDasharray={Math.PI * (size - 12)}
          strokeDashoffset={Math.PI * (size - 12) * 0.7}
          style={{
            filter: "drop-shadow(0 0 8px #3b82f6)",
            strokeLinecap: "round",
          }}
        />
      </svg>
      <style>{`
        @keyframes spin-ios {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.12); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-spin-ios {
          animation: spin-ios 1.2s cubic-bezier(.68,-0.55,.27,1.55) infinite;
        }
      `}</style>
    </div>
  );
}
