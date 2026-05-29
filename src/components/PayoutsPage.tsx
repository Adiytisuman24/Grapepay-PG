"use client";

import React from "react";
import {
  CalendarDays, Settings, Info, ChevronDown,
  ArrowRight, Check, X
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip
} from "recharts";

export default function PayoutsPage() {
  const sparklineData = [
    { value: 10 }, { value: 25 }, { value: 15 }, { value: 40 },
    { value: 20 }, { value: 50 }, { value: 30 }, { value: 60 }
  ];

  const volumeData = [
    { name: "May 1", value: 12000 },
    { name: "May 8", value: 22000 },
    { name: "May 15", value: 35000 },
    { name: "May 22", value: 18000 },
    { name: "May 29", value: 28000 },
  ];

  const pieData = [
    { name: "Card", value: 68.2, color: "#6d28d9" },
    { name: "GrapePay", value: 18.7, color: "#a78bfa" },
    { name: "Bank Transfer", value: 8.9, color: "#ddd6fe" },
    { name: "Wallets", value: 4.2, color: "#f5f3ff" },
  ];

  const recentTransactions = [
    { title: "Payment from Jane Cooper", sub: "txn_1P8s7M2eZvKYlo2C3X9a8", amount: "$125.00", status: "Succeeded", icon: "💸", bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
    { title: "Subscription from Acme Inc.", sub: "sub_1P8s7M2eZvKYlo2C3X9b7", amount: "$2,499.00", status: "Succeeded", icon: "🔁", bg: "bg-[#ecfdf5]", color: "text-[#10b981]" },
    { title: "Payment from Robert Fox", sub: "txn_1P8s7M2eZvKYlo2C3X9c6", amount: "$89.00", status: "Succeeded", icon: "👤", bg: "bg-[#f8fafc]", color: "text-[#64748b]" },
    { title: "Payment from Leslie Alexander", sub: "txn_1P8s7M2eZvKYlo2C3X9d5", amount: "$59.00", status: "Failed", icon: "👤", bg: "bg-[#fff1f2]", color: "text-[#f43f5e]" },
    { title: "Subscription from Globex Corp.", sub: "sub_1P8s7M2eZvKYlo2C3X9e4", amount: "$1,199.00", status: "Succeeded", icon: "🔁", bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
  ];

  const reports = [
    { name: "Disputes", value: "23", trend: "↓ 15.2%", trendColor: "text-[#10b981]" },
    { name: "Chargeback rate", value: "0.45%", trend: "↓ 8.7%", trendColor: "text-[#10b981]" },
    { name: "Refunds", value: "$2,345.00", trend: "↓ 3.4%", trendColor: "text-[#10b981]" },
    { name: "Payouts", value: "$45,678.00", trend: "↑ 10.1%", trendColor: "text-[#10b981]" },
    { name: "Payout success rate", value: "99.8%", trend: "↑ 0.6%", trendColor: "text-[#10b981]" },
  ];

  const kpis = [
    { title: "Gross Volume", value: "$124,560.00", trend: "↗ 12.5%" },
    { title: "Net Volume", value: "$112,455.00", trend: "↗ 9.8%" },
    { title: "Successful Payments", value: "2,345", trend: "↗ 8.4%" },
    { title: "Revenue", value: "$98,765.00", trend: "↗ 11.3%" }
  ];

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-[#0f172a]">Overview</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[12px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
            <CalendarDays className="w-4 h-4 text-[#94a3b8]" />
            May 1 – May 31, 2024
            <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8] ml-1" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[12px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
            <Settings className="w-4 h-4 text-[#94a3b8]" />
            Customize
          </button>
        </div>
      </div>

      {/* KPIs Row */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[140px]">
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[12px] font-semibold text-[#64748b]">{kpi.title}</p>
                <Info className="w-3.5 h-3.5 text-[#cbd5e1]" />
              </div>
              <div className="flex items-end gap-3 mt-1.5">
                <p className="text-[22px] font-bold text-[#0f172a] leading-tight tracking-tight">{kpi.value}</p>
                <p className="text-[11px] font-bold text-[#10b981] mb-1">{kpi.trend}</p>
              </div>
              <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">vs Apr 1 - Apr 30</p>
            </div>
            
            <div className="h-[36px] mt-3 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6225E6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6225E6"
                    strokeWidth={2}
                    fill={`url(#grad-${idx})`}
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-12 gap-6 h-[340px]">
        {/* Volume over time */}
        <div className="col-span-8 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between shrink-0 mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Volume over time</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
              Daily <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6225E6" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(val) => `$${val/1000}K`} />
                <Tooltip cursor={{ stroke: "#6225E6", strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="value" stroke="#6225E6" strokeWidth={2.5} fill="url(#volGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="col-span-4 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-[#0f172a] shrink-0 mb-4">Payment methods</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="35%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend inside the chart box on the right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[140px] flex flex-col gap-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="font-semibold text-[#475569]">{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#0f172a]">{item.value}%</span>
                </div>
              ))}
              <div className="mt-2 text-right">
                 <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                   View all
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Recent Transactions */}
        <div className="col-span-7 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Recent transactions</h3>
            <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
              View all
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {recentTransactions.map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-[#f1f5f9] last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[14px] ${tx.bg} shrink-0`}>
                    {tx.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a]">{tx.title}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{tx.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {tx.status === "Succeeded" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">
                      Succeeded <Check className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fff1f2] text-[#f43f5e] text-[10px] font-bold">
                      Failed <X className="w-3 h-3" />
                    </span>
                  )}
                  <span className="text-[12px] font-bold text-[#0f172a] w-[60px] text-right">{tx.amount}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-[12px] font-bold text-[#6225E6] flex items-center gap-1 hover:text-[#5019cf] transition-colors w-fit">
            View all transactions <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reports Overview */}
        <div className="col-span-5 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Reports overview</h3>
            <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
              View reports
            </button>
          </div>
          <div className="flex flex-col gap-1 flex-1 justify-center">
            {reports.map((report, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-[#f1f5f9] last:border-0">
                <span className="text-[12px] font-semibold text-[#0f172a]">{report.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-semibold text-[#0f172a] text-right">{report.value}</span>
                  <span className={`text-[10px] font-bold ${report.trendColor} w-[50px] text-right`}>{report.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
