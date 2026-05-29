"use client";

import React from "react";
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: string;
  status: "Succeeded" | "Refunded";
  iconType: "payment" | "subscription" | "refund";
}

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Payment from Acme Inc.",
    date: "May 10, 2024 • 12:45 PM",
    amount: "$1,250.00",
    status: "Succeeded",
    iconType: "payment",
  },
  {
    id: "2",
    name: "Subscription - Pro Plan",
    date: "May 10, 2024 • 11:32 AM",
    amount: "$49.00",
    status: "Succeeded",
    iconType: "subscription",
  },
  {
    id: "3",
    name: "Payment from Jane Cooper",
    date: "May 10, 2024 • 10:15 AM",
    amount: "$320.00",
    status: "Succeeded",
    iconType: "payment",
  },
  {
    id: "4",
    name: "Refund to Robert Fox",
    date: "May 9, 2024 • 09:45 PM",
    amount: "-$75.00",
    status: "Refunded",
    iconType: "refund",
  },
  {
    id: "5",
    name: "Payment from DevStudio",
    date: "May 9, 2024 • 08:20 PM",
    amount: "$560.00",
    status: "Succeeded",
    iconType: "payment",
  },
];

export default function RecentTransactions() {
  const getIcon = (type: string, status: string) => {
    if (status === "Refunded") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#fff1f2] text-[#f43f5e] flex items-center justify-center shrink-0">
          <ArrowDownLeft className="w-4 h-4" />
        </div>
      );
    }
    if (type === "subscription") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#f4efff] text-[#6225E6] flex items-center justify-center shrink-0">
          <RefreshCw className="w-3.5 h-3.5" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-[#f4efff] text-[#6225E6] flex items-center justify-center shrink-0">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div className="bg-white border border-[#eef0f6] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
        <h3 className="text-[13px] font-bold text-[#0f172a]">Recent Transactions</h3>
        <button className="text-[11px] font-semibold text-[#6225E6] hover:text-[#5019cf] cursor-pointer px-2 py-0.5 bg-[#f4efff] rounded-md transition-colors">
          View all
        </button>
      </div>

      {/* Transaction list */}
      <div className="flex-1 overflow-hidden px-3 space-y-0.5">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between gap-2 px-2 py-2 hover:bg-[#f8fafc] rounded-xl cursor-pointer transition-all duration-150 group"
          >
            {/* Left: icon + name/date */}
            <div className="flex items-center gap-2.5 min-w-0">
              {getIcon(tx.iconType, tx.status)}
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#0f172a] leading-tight truncate group-hover:text-[#6225E6] transition-colors">
                  {tx.name}
                </p>
                <p className="text-[9px] font-medium text-[#94a3b8] mt-0.5 truncate">
                  {tx.date}
                </p>
              </div>
            </div>

            {/* Right: badge + amount */}
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md shrink-0 ${
                  tx.status === "Succeeded"
                    ? "bg-[#ecfdf5] text-[#10b981]"
                    : "bg-[#fff1f2] text-[#f43f5e]"
                }`}
              >
                {tx.status}
              </span>
              <span
                className={`text-[11px] font-bold shrink-0 ${
                  tx.status === "Refunded" ? "text-[#f43f5e]" : "text-[#0f172a]"
                }`}
              >
                {tx.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#f1f5f9] shrink-0">
        <button className="text-[11px] font-semibold text-[#6225E6] hover:text-[#5019cf] inline-flex items-center gap-1 cursor-pointer transition-colors group w-full justify-center">
          <span>View all transactions</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </div>
  );
}
