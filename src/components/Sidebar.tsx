"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  CalendarDays,
  FileText,
  ArrowUpRight,
  AlertCircle,
  BarChart3,
  Code2,
  KeyRound,
  Network,
  Settings,
  ChevronDown,
  ChevronsUpDown,
  Sparkles,
} from "lucide-react";
import GrapePayLogo from "@/components/GrapePayLogo";

interface SidebarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({ currentTab = "Overview", onTabChange }: SidebarProps) {
  const menuItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Payments", icon: CreditCard },
    { name: "Customers", icon: Users },
    { name: "Subscriptions", icon: CalendarDays },
    { name: "Invoices", icon: FileText },
    { name: "Payouts", icon: ArrowUpRight },
    { name: "Disputes", icon: AlertCircle },
    { name: "Reports", icon: BarChart3 },
    { name: "Developers", icon: Code2 },
    { name: "API Keys", icon: KeyRound },
    { name: "Webhooks", icon: Network },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#eef0f6] flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Logo */}
      <div className="px-5 py-5 flex items-center">
        <GrapePayLogo height={34} showText={true} />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-1 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => onTabChange?.(item.name)}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-brand-light text-brand shadow-sm shadow-brand/5"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-brand" : "text-[#94a3b8]"}`} />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile Sections */}
      <div className="p-4 border-t border-[#eef0f6] space-y-3">
        {/* Business Selector */}
        <div className="flex items-center justify-between p-3 bg-white border border-[#eef0f6] rounded-xl hover:bg-[#f8fafc] cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-brand">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0f172a]">Business</p>
              <p className="text-[10px] text-[#64748b] font-medium">Premium Plan</p>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-[#94a3b8]" />
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2.5 hover:bg-[#f8fafc] rounded-xl cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-semibold text-sm shadow-sm">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#0f172a] truncate">John Doe</p>
              <p className="text-[10px] text-[#64748b] font-medium truncate">john@acme.com</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#94a3b8] shrink-0" />
        </div>
      </div>
    </aside>
  );
}
