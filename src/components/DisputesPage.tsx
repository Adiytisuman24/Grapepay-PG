"use client";

import React from "react";
import {
  CalendarDays, Settings, Info, ChevronDown,
  ArrowRight, Percent, Trophy, DollarSign, FileText, Clock, MoreVertical
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip
} from "recharts";

export default function DisputesPage() {
  const sparklineData = [
    { value: 10 }, { value: 25 }, { value: 15 }, { value: 40 },
    { value: 20 }, { value: 50 }, { value: 30 }, { value: 60 }
  ];

  const volumeData = [
    { name: "May 1", value: 4 },
    { name: "May 4", value: 10 },
    { name: "May 8", value: 5 },
    { name: "May 12", value: 11 },
    { name: "May 15", value: 18 },
    { name: "May 19", value: 13 },
    { name: "May 22", value: 5 },
    { name: "May 26", value: 10 },
    { name: "May 29", value: 15 },
  ];

  const pieData = [
    { name: "Fraudulent", value: 34.8, count: 8, color: "#6d28d9" },
    { name: "Product/Service not received", value: 26.1, count: 6, color: "#8b5cf6" },
    { name: "Unauthorized charge", value: 17.4, count: 4, color: "#a78bfa" },
    { name: "Duplicate charge", value: 13.0, count: 3, color: "#c4b5fd" },
    { name: "Other", value: 8.7, count: 2, color: "#ddd6fe" },
  ];

  const recentDisputes = [
    { id: "DP-10234", customer: "Jane Cooper", initials: "JC", bg: "bg-[#f4efff]", color: "text-[#6225E6]", amount: "$125.00", reason: "Fraudulent", status: "Under review", date: "May 31, 2024" },
    { id: "DP-10233", customer: "Robert Fox", initials: "RF", bg: "bg-[#ecfdf5]", color: "text-[#10b981]", amount: "$89.00", reason: "Unauthorized charge", status: "Needs response", date: "May 30, 2024" },
    { id: "DP-10232", customer: "Leslie Alexander", initials: "LA", bg: "bg-[#fff1f2]", color: "text-[#f43f5e]", amount: "$59.00", reason: "Product not received", status: "Won", date: "May 29, 2024" },
    { id: "DP-10231", customer: "Cody Fisher", initials: "CF", bg: "bg-[#fff7ed]", color: "text-[#f97316]", amount: "$210.00", reason: "Duplicate charge", status: "Lost", date: "May 28, 2024" },
    { id: "DP-10230", customer: "Darlene Robertson", initials: "DR", bg: "bg-[#eff6ff]", color: "text-[#3b82f6]", amount: "$430.00", reason: "Fraudulent", status: "Under review", date: "May 27, 2024" },
  ];

  const reports = [
    { name: "Dispute rate", value: "0.45%", trend: "↓ 8.7%", trendColor: "text-[#10b981]", icon: <Percent className="w-4 h-4" /> },
    { name: "Win rate", value: "72.7%", trend: "↑ 9.4%", trendColor: "text-[#10b981]", icon: <Trophy className="w-4 h-4" /> },
    { name: "Average dispute amount", value: "$212.61", trend: "↓ 3.2%", trendColor: "text-[#10b981]", icon: <DollarSign className="w-4 h-4" /> },
    { name: "Evidence submitted on time", value: "91.3%", trend: "↑ 5.6%", trendColor: "text-[#10b981]", icon: <FileText className="w-4 h-4" /> },
    { name: "Response time (avg.)", value: "1.8 days", trend: "↓ 0.4 days", trendColor: "text-[#10b981]", icon: <Clock className="w-4 h-4" /> },
  ];

  const kpis = [
    { title: "Total Disputes", value: "23", trend: "↓ 15.2%", trendColor: "text-[#f43f5e]" },
    { title: "Dispute Amount", value: "$4,890.00", trend: "↓ 6.7%", trendColor: "text-[#f43f5e]" },
    { title: "Open Disputes", value: "12", trend: "↓ 20.0%", trendColor: "text-[#f43f5e]" },
    { title: "Won Disputes", value: "8", trend: "↑ 25.0%", trendColor: "text-[#10b981]" },
    { title: "Lost Disputes", value: "3", trend: "↓ 25.0%", trendColor: "text-[#10b981]" } // Using green for "down 25%" as in the screenshot for Lost Disputes! (Actually screenshot says down 25.0% in green arrow, which means fewer lost disputes, which is good).
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Under review":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#fff7ed] text-[#f97316] text-[10px] font-bold">{status}</span>;
      case "Needs response":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4efff] text-[#6225E6] text-[10px] font-bold">{status}</span>;
      case "Won":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">{status}</span>;
      case "Lost":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#fff1f2] text-[#f43f5e] text-[10px] font-bold">{status}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#0f172a]">Disputes</h2>
          <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Track, respond to, and manage customer disputes.</p>
        </div>
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
      <div className="grid grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white border border-[#eef0f6] rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[130px]">
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[12px] font-semibold text-[#64748b] truncate">{kpi.title}</p>
                <Info className="w-3.5 h-3.5 text-[#cbd5e1] shrink-0" />
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">{kpi.value}</p>
                <p className={`text-[10px] font-bold ${kpi.trendColor}`}>{kpi.trend}</p>
              </div>
              <p className="text-[9px] font-medium text-[#94a3b8] mt-0.5">vs Apr 1 - Apr 30</p>
            </div>
            
            <div className="h-[30px] mt-2 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`gradDisputes-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6225E6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6225E6"
                    strokeWidth={1.5}
                    fill={`url(#gradDisputes-${idx})`}
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
      <div className="grid grid-cols-12 gap-6 h-[320px]">
        {/* Disputes over time */}
        <div className="col-span-7 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between shrink-0 mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Disputes over time</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
              Daily <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGradDisputes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6225E6" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <Tooltip cursor={{ stroke: "#6225E6", strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="value" stroke="#6225E6" strokeWidth={2.5} fill="url(#volGradDisputes)" dot={{ fill: "#6225E6", strokeWidth: 2, r: 4, stroke: "#fff" }} activeDot={{ r: 6, fill: "#6225E6", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disputes by reason */}
        <div className="col-span-5 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-[#0f172a] shrink-0 mb-4">Disputes by reason</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="25%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend inside the chart box on the right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[220px] flex flex-col gap-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="font-semibold text-[#475569] truncate w-[130px]">{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#0f172a]">{item.count} ({item.value}%)</span>
                </div>
              ))}
              <div className="mt-2 text-right">
                 <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                   View all reasons
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Recent Disputes */}
        <div className="col-span-7 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Recent disputes</h3>
            <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
              View all
            </button>
          </div>
          
          <div className="flex flex-col flex-1">
            <div className="grid grid-cols-6 mb-2">
              <span className="text-[10px] font-bold text-[#64748b]">Dispute ID</span>
              <span className="text-[10px] font-bold text-[#64748b] col-span-2">Customer</span>
              <span className="text-[10px] font-bold text-[#64748b]">Amount</span>
              <span className="text-[10px] font-bold text-[#64748b] col-span-2">Reason</span>
            </div>
            
            <div className="flex flex-col gap-1">
              {recentDisputes.map((dispute, idx) => (
                <div key={idx} className="flex items-center py-2.5 border-b border-[#f1f5f9] last:border-0 relative">
                  <div className="w-[15%]">
                    <span className="text-[11px] font-bold text-[#6225E6] cursor-pointer hover:underline">{dispute.id}</span>
                  </div>
                  <div className="w-[30%] flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold ${dispute.bg} ${dispute.color} shrink-0`}>
                      {dispute.initials}
                    </div>
                    <span className="text-[11px] font-semibold text-[#0f172a]">{dispute.customer}</span>
                  </div>
                  <div className="w-[15%]">
                    <span className="text-[11px] font-bold text-[#0f172a]">{dispute.amount}</span>
                  </div>
                  <div className="w-[20%]">
                    <span className="text-[11px] font-semibold text-[#475569]">{dispute.reason}</span>
                  </div>
                  <div className="w-[12%] text-center">
                    {getStatusBadge(dispute.status)}
                  </div>
                  <div className="w-[8%] text-right pr-4">
                    <span className="text-[11px] font-medium text-[#64748b]">{dispute.date}</span>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <button className="w-6 h-6 flex items-center justify-center rounded-lg text-[#94a3b8] hover:bg-[#f8fafc]">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-4 text-[12px] font-bold text-[#6225E6] flex items-center gap-1 hover:text-[#5019cf] transition-colors w-fit">
            View all disputes <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Disputes Overview */}
        <div className="col-span-5 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Disputes overview</h3>
            <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
              View report
            </button>
          </div>
          <div className="flex flex-col gap-1 flex-1 justify-center">
            {reports.map((report, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-[#f1f5f9] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#f4efff] text-[#6225E6] shrink-0">
                    {report.icon}
                  </div>
                  <span className="text-[12px] font-semibold text-[#0f172a]">{report.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-semibold text-[#0f172a] text-right">{report.value}</span>
                  <span className={`text-[10px] font-bold ${report.trendColor} w-[55px] text-right`}>{report.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
