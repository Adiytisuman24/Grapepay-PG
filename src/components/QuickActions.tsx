"use client";

import React from "react";
import { FilePlus2, UserPlus2, FileCode2, CreditCard } from "lucide-react";

const actions = [
  { title: "Create Payment Link", icon: CreditCard,  bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
  { title: "Send Invoice",        icon: FilePlus2,    bg: "bg-[#fff1f2]", color: "text-[#f43f5e]" },
  { title: "Add Customer",        icon: UserPlus2,    bg: "bg-[#ecfdf5]", color: "text-[#10b981]" },
  { title: "View API Docs",       icon: FileCode2,    bg: "bg-[#fff7ed]", color: "text-[#f97316]" },
];

export default function QuickActions() {
  return (
    <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <span className="text-[13px] font-bold text-[#0f172a] shrink-0 mb-4">Quick Actions</span>

      {/* 4 equal columns — single row like Figma */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {actions.map(({ title, icon: Icon, bg, color }) => (
          <button
            key={title}
            className="flex flex-col items-center justify-center gap-2 rounded-xl hover:bg-[#f8fafc] border border-transparent hover:border-[#eef0f6] transition-all duration-200 group active:scale-[0.97] cursor-pointer p-1"
          >
            <div className={`w-11 h-11 ${bg} ${color} rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-[#64748b] text-center leading-tight group-hover:text-[#6225E6] transition-colors">
              {title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
