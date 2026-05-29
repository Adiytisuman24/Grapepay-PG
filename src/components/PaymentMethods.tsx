"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Card",        value: 72.5, color: "#6225E6" },
  { name: "UPI",         value: 15.8, color: "#d946ef" },
  { name: "Net Banking", value: 6.7,  color: "#f97316" },
  { name: "Wallet",      value: 5.0,  color: "#3b82f6" },
];

export default function PaymentMethods() {
  return (
    <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <span className="text-[13px] font-bold text-[#0f172a] shrink-0">Payment Methods</span>

      {/* Chart + Legend — centered vertically in remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 mt-4">
        {/* Donut */}
        <div className="relative w-[130px] h-[130px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={62}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] font-semibold text-[#94a3b8] uppercase tracking-wider">Total</span>
            <span className="text-[17px] font-bold text-[#0f172a] leading-tight">2,845</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-[#475569]">{item.name}</span>
              </div>
              <span className="font-bold text-[#0f172a]">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
