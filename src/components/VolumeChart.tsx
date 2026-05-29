"use client";

import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { day: "May 4",  value: 8000  },
  { day: "May 5",  value: 14000 },
  { day: "May 6",  value: 11000 },
  { day: "May 7",  value: 19000 },
  { day: "May 8",  value: 31245 },
  { day: "May 9",  value: 23000 },
  { day: "May 10", value: 37000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#eef0f6] px-3 py-2 rounded-xl shadow-lg text-center">
        <p className="text-[10px] font-semibold text-[#94a3b8]">May 8, 2024</p>
        <div className="flex items-center gap-1.5 mt-1 justify-center">
          <span className="w-2 h-2 rounded-full bg-[#6225E6] shrink-0" />
          <p className="text-[12px] font-bold text-[#0f172a]">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function VolumeChart() {
  return (
    <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Header row */}
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[13px] font-bold text-[#0f172a]">Payment Volume</span>
        <button className="flex items-center gap-1 px-2.5 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors">
          Last 7 days <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
        </button>
      </div>

      {/* Value + Badge */}
      <div className="flex items-center gap-2 mt-3 shrink-0">
        <span className="text-[26px] font-bold text-[#0f172a] tracking-tight">$128,560.34</span>
        <span className="px-2 py-0.5 bg-[#ecfdf5] text-[#10b981] text-[11px] font-bold rounded-lg">
          ↑ 18.2%
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1 mt-4 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6225E6" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#6225E6", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6225E6"
              strokeWidth={2.5}
              fill="url(#volGrad)"
              activeDot={{ r: 5, fill: "#6225E6", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
