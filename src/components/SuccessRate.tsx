"use client";

import React from "react";

export default function SuccessRate() {
  const pct = 98.6;
  const r = 38;
  const sw = 9;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-between">
      <span className="text-[13px] font-bold text-[#0f172a] shrink-0">Success Rate</span>

      {/* Gauge + Stats side-by-side */}
      <div className="flex items-center gap-4 mt-4 flex-1">
        {/* SVG Ring */}
        <div className="relative w-[90px] h-[90px] shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth={sw} />
            <circle
              cx="50" cy="50" r={r} fill="none"
              stroke="#6225E6" strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[14px] font-bold text-[#0f172a]">98.6%</span>
            <span className="text-[8px] font-semibold text-[#94a3b8] uppercase tracking-wide mt-0.5">Success</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6225E6] shrink-0" />
              <span className="font-semibold text-[#64748b]">Total Attempts</span>
            </div>
            <span className="font-bold text-[#0f172a]">2,928</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
              <span className="font-semibold text-[#64748b]">Successful</span>
            </div>
            <span className="font-bold text-[#0f172a]">2,887</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f43f5e] shrink-0" />
              <span className="font-semibold text-[#64748b]">Failed</span>
            </div>
            <span className="font-bold text-[#f43f5e]">41</span>
          </div>
        </div>
      </div>
    </div>
  );
}
