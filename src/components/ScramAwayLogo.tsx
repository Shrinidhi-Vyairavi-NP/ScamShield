import React from 'react';

interface LogoProps {
  className?: string;
  showLivePulse?: boolean;
  isDark?: boolean;
}

export const ScramAwayLogo: React.FC<LogoProps> = ({ 
  className = "w-10 h-10", 
  showLivePulse = true,
  isDark = true 
}) => {
  return (
    <div className="relative flex-shrink-0">
      <svg 
        viewBox="0 0 200 220" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Main Shield Outer Silhouette */}
        <path
          d="M100 10 C148 10, 180 22, 186 70 C186 130, 140 178, 100 202 C60 178, 14 130, 14 70 C20 22, 52 10, 100 10 Z"
          fill={isDark ? "#1e293b" : "#0f172a"}
          stroke={isDark ? "#38bdf8" : "#2563eb"}
          strokeWidth="4"
        />

        {/* Top 'S' swoop path */}
        <path
          d="M 52 70 C 52 50, 75 36, 110 36 C 145 36, 158 50, 156 68 C 154 88, 120 96, 92 104 C 62 112, 42 126, 44 150 C 46 174, 72 184, 112 184 C 145 184, 162 172, 168 158"
          stroke="#ffffff"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Dynamic inner gradient overlay for modern depth */}
        <path
          d="M100 16 C144 16, 174 27, 180 70 C180 124, 136 170, 100 192 C64 170, 20 124, 20 70 C26 27, 56 16, 100 16 Z"
          fill="url(#shield-glow)"
          opacity="0.15"
        />

        <defs>
          <linearGradient id="shield-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Live status ping badge */}
      {showLivePulse && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900"></span>
        </span>
      )}
    </div>
  );
};
