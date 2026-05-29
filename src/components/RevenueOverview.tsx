"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function RevenueOverview() {
  return (
    <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[13px] font-bold text-[#0f172a]">Revenue Overview</span>
          <p className="text-[11px] font-medium text-[#94a3b8] mt-0.5">Compare your business performance</p>
        </div>
        <button className="flex items-center gap-1 px-2.5 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors shrink-0">
          Monthly <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
        </button>
      </div>

      {/* 3-column metrics */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        {/* This Month */}
        <div>
          <p className="text-[10px] font-bold text-[#6225E6] uppercase tracking-wide">This Month</p>
          <p className="text-[18px] font-bold text-[#0f172a] mt-1 tracking-tight">$128,560.34</p>
          <span className="inline-flex items-center gap-0.5 mt-1.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold rounded-md">
            ↑ 18.2%
          </span>
        </div>

        {/* Last Month */}
        <div>
          <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wide">Last Month</p>
          <p className="text-[18px] font-bold text-[#64748b] mt-1 tracking-tight">$108,768.21</p>
        </div>

        {/* Difference */}
        <div>
          <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wide">Difference</p>
          <div className="flex items-baseline gap-2 mt-1 flex-wrap">
            <p className="text-[18px] font-bold text-[#0f172a] tracking-tight">$19,792.13</p>
            <span className="text-[10px] font-bold text-[#10b981]">↑ 18.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
