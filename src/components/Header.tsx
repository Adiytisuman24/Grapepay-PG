"use client";

import React from "react";
import { Search, Bell, HelpCircle, ChevronDown } from "lucide-react";

interface HeaderProps {
  activeTab?: string;
}

export default function Header({ activeTab = "Overview" }: HeaderProps) {
  if (activeTab === "Customers" || activeTab === "Subscriptions" || activeTab === "Payments" || activeTab === "Payouts" || activeTab === "Invoices" || activeTab === "Reports" || activeTab === "Disputes" || activeTab === "Developers" || activeTab === "API Keys" || activeTab === "Settings" || activeTab === "Webhooks") {
    const isSubscriptions = activeTab === "Subscriptions";
    const isPayments = activeTab === "Payments";
    const isPayouts = activeTab === "Payouts";
    const isInvoices = activeTab === "Invoices";
    const isReports = activeTab === "Reports";
    const isDisputes = activeTab === "Disputes";
    const isDevelopers = activeTab === "Developers";
    const isApiKeys = activeTab === "API Keys";
    const isSettings = activeTab === "Settings";
    const isWebhooks = activeTab === "Webhooks";
    
    let placeholder = "Search customers, email, phone, customer ID...";
    if (isSubscriptions) placeholder = "Search subscriptions, customers, plan...";
    if (isPayments) placeholder = "Search payments, customers, order ID...";
    if (isPayouts || isInvoices || isReports || isDisputes || isDevelopers || isApiKeys || isSettings || isWebhooks) placeholder = "Search...";
    
    const createText = isSubscriptions ? "Create subscription" : "Create";

    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#eef0f6]">
        {/* Left: Search */}
        <div className="relative w-full max-w-[480px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder={placeholder}
            className="w-full pl-9 pr-14 py-2 bg-[#f8fafc] border border-transparent rounded-xl text-[12px] font-medium placeholder-[#94a3b8] text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#6225E6]/30 focus:ring-2 focus:ring-[#6225E6]/10 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#94a3b8] bg-white border border-[#eef0f6] rounded shadow-sm">⌘</kbd>
            <kbd className="inline-flex items-center px-1 py-0.5 text-[10px] font-semibold text-[#94a3b8] bg-white border border-[#eef0f6] rounded shadow-sm">K</kbd>
          </div>
        </div>

        {/* Right: Actions + Profile */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#6225E6] text-[#6225E6] rounded-lg text-[12px] font-bold hover:bg-[#f4efff] transition-colors shadow-sm">
            {createText} <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <button className="relative w-9 h-9 flex items-center justify-center bg-white border border-[#eef0f6] rounded-full text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute 0 top-0 right-0 w-[14px] h-[14px] bg-[#6225E6] text-white text-[8px] font-bold rounded-full flex items-center justify-center border-[1.5px] border-white">
              3
            </span>
          </button>

          <div className="flex items-center gap-2.5 pl-2 border-l border-[#eef0f6] cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#f4efff] text-[#6225E6] font-bold text-[12px] flex items-center justify-center">
              JD
            </div>
            <div className="hidden sm:block">
              <p className="text-[12px] font-bold text-[#0f172a] leading-tight">John Doe</p>
              <p className="text-[10px] font-medium text-[#64748b]">Admin</p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-5 bg-[#f7f8fc]">
      {/* Left: Greeting */}
      <div>
        <h1 className="text-[20px] font-bold text-[#0f172a] leading-tight flex items-center gap-2">
          Welcome back, John <span>👋</span>
        </h1>
        <p className="text-[12px] font-medium text-[#64748b] mt-0.5">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Right: Search + Icons */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-[220px] pl-9 pr-14 py-2 bg-white border border-[#eef0f6] rounded-xl text-[12px] font-medium placeholder-[#94a3b8] text-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#6225E6]/20 transition-all shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#94a3b8] bg-[#f8fafc] border border-[#eef0f6] rounded">⌘</kbd>
            <kbd className="inline-flex items-center px-1 py-0.5 text-[10px] font-semibold text-[#94a3b8] bg-[#f8fafc] border border-[#eef0f6] rounded">K</kbd>
          </div>
        </div>

        {/* Notification Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center bg-white border border-[#eef0f6] rounded-xl text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm cursor-pointer">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#6225E6] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#f7f8fc]">
            3
          </span>
        </button>

        {/* Help */}
        <button className="w-9 h-9 flex items-center justify-center bg-white border border-[#eef0f6] rounded-xl text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm cursor-pointer">
          <HelpCircle className="w-4.5 h-4.5" />
        </button>

        {/* Avatar */}
        <div className="relative cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-[#6225E6] text-white font-bold text-[12px] flex items-center justify-center shadow-md">
            JD
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] border-2 border-[#f7f8fc] rounded-full" />
        </div>
      </div>
    </header>
  );
}
