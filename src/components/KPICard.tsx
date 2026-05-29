"use client";

import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendType: "up" | "down";
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  chartColor: string;
  chartData: { value: number }[];
}

export default function KPICard({
  title,
  value,
  trend,
  trendType,
  icon: Icon,
  iconBgColor,
  iconColor,
  chartColor,
  chartData,
}: KPICardProps) {
  const isUp = trendType === "up";
  // SVG IDs cannot contain spaces or special chars
  const gradientId = `kpi-grad-${title.replace(/[^a-zA-Z0-9]/g, "-")}`;

  return (
    <div className="bg-white border border-[#eef0f6] rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Top content */}
      <div className="px-5 pt-5 pb-3 flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[#94a3b8] tracking-wide">{title}</p>
          <p className="text-[22px] font-bold text-[#0f172a] mt-1 leading-tight tracking-tight">{value}</p>
          <p className={`text-[11px] font-semibold mt-1.5 flex items-center gap-1 ${isUp ? "text-[#10b981]" : "text-[#f43f5e]"}`}>
            <span>{isUp ? "↑" : "↓"}</span>
            {trend}
          </p>
        </div>
      </div>

      {/* Sparkline at bottom */}
      <div className="w-full h-[56px] mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
