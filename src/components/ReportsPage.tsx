"use client";

import React from "react";
import {
  CalendarDays, Settings, Info, ChevronDown,
  ArrowRight, CreditCard, RefreshCw, AlertCircle, ArrowUpRight, Users, FileText, MoreVertical
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip
} from "recharts";

export default function ReportsPage() {
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

  const reportsByCategory = [
    { title: "Payments", desc: "Insights on successful payments", count: "12 reports", icon: <CreditCard className="w-4 h-4" />, bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
    { title: "Refunds", desc: "Refunds and return analytics", count: "8 reports", icon: <RefreshCw className="w-4 h-4" />, bg: "bg-[#fdf4ff]", color: "text-[#d946ef]" },
    { title: "Disputes", desc: "Dispute trends and outcomes", count: "6 reports", icon: <AlertCircle className="w-4 h-4" />, bg: "bg-[#fff1f2]", color: "text-[#f43f5e]" },
    { title: "Payouts", desc: "Payout performance and settlements", count: "7 reports", icon: <ArrowUpRight className="w-4 h-4" />, bg: "bg-[#eff6ff]", color: "text-[#3b82f6]" },
    { title: "Customers", desc: "Customer growth and activity", count: "9 reports", icon: <Users className="w-4 h-4" />, bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
  ];

  const topReports = [
    { title: "Revenue summary", desc: "Overview of revenue trends", value: "$98,765.00", trend: "↑ 11.3%", icon: <FileText className="w-4 h-4" /> },
    { title: "Payment success rate", desc: "Successful vs. failed payments", value: "92.8%", trend: "↑ 1.8%", icon: <FileText className="w-4 h-4" /> },
    { title: "Refund summary", desc: "Total refunds and trends", value: "$2,345.00", trend: "↑ 3.4%", icon: <FileText className="w-4 h-4" /> },
    { title: "Dispute overview", desc: "Dispute count and status", value: "23", trend: "↑ 15.2%", icon: <FileText className="w-4 h-4" /> },
    { title: "Payout summary", desc: "Total payouts and settlements", value: "$45,678.00", trend: "↑ 10.1%", icon: <FileText className="w-4 h-4" /> },
  ];

  const kpis = [
    { title: "Total Revenue", value: "$98,765.00", trend: "↗ 11.3%" },
    { title: "Successful Payments", value: "2,345", trend: "↗ 8.4%" },
    { title: "Refunds", value: "$2,345.00", trend: "↗ 3.4%" },
    { title: "Disputes", value: "23", trend: "↗ 15.2%" },
    { title: "Payouts", value: "$45,678.00", trend: "↗ 10.1%" }
  ];

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#0f172a]">Reports</h2>
          <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Gain insights into your business performance.</p>
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
                <p className="text-[10px] font-bold text-[#10b981]">{kpi.trend}</p>
              </div>
              <p className="text-[9px] font-medium text-[#94a3b8] mt-0.5">vs Apr 1 - Apr 30</p>
            </div>
            
            <div className="h-[30px] mt-2 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`gradReports-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6225E6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6225E6"
                    strokeWidth={1.5}
                    fill={`url(#gradReports-${idx})`}
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
        {/* Revenue over time */}
        <div className="col-span-8 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between shrink-0 mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Revenue over time</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
              Daily <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGradReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6225E6" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(val) => `$${val/1000}K`} />
                <Tooltip cursor={{ stroke: "#6225E6", strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="value" stroke="#6225E6" strokeWidth={2.5} fill="url(#volGradReports)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by payment method */}
        <div className="col-span-4 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-[#0f172a] shrink-0 mb-4">Revenue by payment method</h3>
          <div className="flex-1 flex items-center gap-4 mt-2">
            <div className="w-[140px] h-[140px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="flex-1 flex flex-col justify-center gap-2.5">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="font-semibold text-[#475569] truncate w-[85px]">{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#0f172a]">{item.value}%</span>
                </div>
              ))}
              <div className="mt-1 text-right">
                <button className="px-3 py-1 border border-[#eef0f6] rounded-lg text-[10px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Reports by category */}
        <div className="col-span-6 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-[#0f172a] mb-4">Reports by category</h3>
          
          <div className="flex flex-col gap-3">
            {reportsByCategory.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-[#f1f5f9] last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.bg} ${cat.color} shrink-0`}>
                    {cat.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a]">{cat.title}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{cat.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-semibold text-[#64748b]">{cat.count}</span>
                  <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-[12px] font-bold text-[#6225E6] flex items-center gap-1 hover:text-[#5019cf] transition-colors w-fit">
            View all reports <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Top reports */}
        <div className="col-span-6 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Top reports</h3>
            <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
              View all
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {topReports.map((report, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-[#f1f5f9] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#f4efff] text-[#6225E6] shrink-0">
                    {report.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a]">{report.title}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{report.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[12px] font-bold text-[#0f172a] w-[70px] text-right">{report.value}</span>
                  <span className="text-[10px] font-bold text-[#10b981] w-[45px] text-right">{report.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scheduled Reports Row */}
      <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-[#0f172a]">Scheduled reports</h3>
            <p className="text-[11px] font-medium text-[#64748b] mt-0.5 mb-5">Automated reports delivered to your inbox</p>
          </div>
          <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
            View all scheduled
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#f4efff] text-[#6225E6] shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-[#0f172a]">Monthly Business Summary</p>
              <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">Monthly • Next: Jun 1, 2024</p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-[#64748b]">john.doe@acme.com</span>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">Active</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#94a3b8] hover:bg-[#f8fafc]">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
