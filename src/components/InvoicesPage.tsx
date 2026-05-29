"use client";

import React from "react";
import {
  CalendarDays, Settings, Info, ChevronDown,
  FileText
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip
} from "recharts";

export default function InvoicesPage() {
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
    { name: "Paid", value: 61.1, color: "#6d28d9" },
    { name: "Outstanding", value: 21.1, color: "#a78bfa" },
    { name: "Overdue", value: 5.2, color: "#ddd6fe" },
    { name: "Draft", value: 12.6, color: "#f5f3ff" },
  ];

  const recentInvoices = [
    { title: "INV-2024-1056", sub: "Acme Corporation", amount: "$2,499.00", status: "Paid", bg: "bg-[#f4efff]", color: "text-[#6225E6]", date: "May 31, 2024" },
    { title: "INV-2024-1055", sub: "Globex Corp.", amount: "$1,199.00", status: "Paid", bg: "bg-[#ecfdf5]", color: "text-[#10b981]", date: "May 31, 2024" },
    { title: "INV-2024-1054", sub: "Initech", amount: "$3,450.00", status: "Overdue", bg: "bg-[#fff1f2]", color: "text-[#f43f5e]", date: "May 30, 2024" },
    { title: "INV-2024-1053", sub: "Soylent Corp.", amount: "$899.00", status: "Paid", bg: "bg-[#ecfdf5]", color: "text-[#10b981]", date: "May 29, 2024" },
    { title: "INV-2024-1052", sub: "Umbrella Corp.", amount: "$5,678.00", status: "Draft", bg: "bg-[#eff6ff]", color: "text-[#3b82f6]", date: "May 29, 2024" },
  ];

  const reports = [
    { name: "Total invoices", value: "142", trend: "↑ 10.6%", trendColor: "text-[#10b981]" },
    { name: "Paid invoices", value: "95", trend: "↑ 14.3%", trendColor: "text-[#10b981]" },
    { name: "Outstanding invoices", value: "31", trend: "↓ 2.4%", trendColor: "text-[#f43f5e]" },
    { name: "Overdue invoices", value: "8", trend: "↓ 11.1%", trendColor: "text-[#f43f5e]" },
    { name: "Average invoice value", value: "$846.13", trend: "↑ 3.5%", trendColor: "text-[#10b981]" },
    { name: "Payment success rate", value: "92.8%", trend: "↑ 1.8%", trendColor: "text-[#10b981]" },
  ];

  const kpis = [
    { title: "Total Invoiced", value: "$120,450.00", trend: "↗ 12.6%", trendColor: "text-[#10b981]" },
    { title: "Paid", value: "$98,760.00", trend: "↗ 11.4%", trendColor: "text-[#10b981]" },
    { title: "Outstanding", value: "$21,690.00", trend: "↘ 4.3%", trendColor: "text-[#f43f5e]" },
    { title: "Overdue", value: "$4,890.00", trend: "↘ 6.7%", trendColor: "text-[#f43f5e]" },
    { title: "Draft", value: "$7,100.00", trend: "↗ 8.2%", trendColor: "text-[#10b981]" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">{status}</span>;
      case "Overdue":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#fff1f2] text-[#f43f5e] text-[10px] font-bold">{status}</span>;
      case "Draft":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#eff6ff] text-[#3b82f6] text-[10px] font-bold">{status}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-[#0f172a]">Invoices</h2>
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
                    <linearGradient id={`gradInvoices-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6225E6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6225E6"
                    strokeWidth={1.5}
                    fill={`url(#gradInvoices-${idx})`}
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
        {/* Invoice amount over time */}
        <div className="col-span-8 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between shrink-0 mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Invoice amount over time</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
              Daily <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGradInvoices" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6225E6" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(val) => `$${val/1000}K`} />
                <Tooltip cursor={{ stroke: "#6225E6", strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="value" stroke="#6225E6" strokeWidth={2.5} fill="url(#volGradInvoices)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Invoices by status */}
        <div className="col-span-4 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-[#0f172a] shrink-0 mb-4">Invoices by status</h3>
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
        {/* Recent Invoices */}
        <div className="col-span-7 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Recent invoices</h3>
            <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
              View all
            </button>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {recentInvoices.map((inv, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-[#f1f5f9] last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${inv.bg} ${inv.color} shrink-0`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a]">{inv.title}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{inv.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-[#0f172a] text-right w-[60px]">{inv.amount}</span>
                    <div className="w-[60px]">
                      {getStatusBadge(inv.status)}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748b] w-[75px] text-right">{inv.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices Overview */}
        <div className="col-span-5 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Invoices overview</h3>
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
