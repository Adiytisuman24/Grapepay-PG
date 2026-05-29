"use client";

import React from "react";
import {
  CalendarDays, Settings, ChevronDown,
  ArrowRight, Users, Key, Code, Clock, AlertTriangle,
  Copy, Plus, AlertCircle, MoreVertical
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, BarChart, Bar
} from "recharts";

export default function DevelopersPage() {
  const sparklineData = [
    { value: 10 }, { value: 25 }, { value: 15 }, { value: 40 },
    { value: 20 }, { value: 50 }, { value: 30 }, { value: 60 }
  ];

  const volumeData = [
    { name: "May 1", value: 30 },
    { name: "May 8", value: 40 },
    { name: "May 15", value: 55 },
    { name: "May 22", value: 45 },
    { name: "May 29", value: 50 },
  ];

  const barData = [
    { name: "1", value: 10 }, { name: "2", value: 25 }, { name: "3", value: 15 }, { name: "4", value: 30 },
    { name: "5", value: 20 }, { name: "6", value: 35 }, { name: "7", value: 10 }, { name: "8", value: 15 },
    { name: "9", value: 25 }, { name: "10", value: 18 }, { name: "11", value: 30 }, { name: "12", value: 22 },
    { name: "13", value: 15 }, { name: "14", value: 35 }, { name: "15", value: 25 }, { name: "16", value: 40 },
    { name: "17", value: 30 }, { name: "18", value: 15 }, { name: "19", value: 20 }, { name: "20", value: 35 },
    { name: "21", value: 25 }, { name: "22", value: 15 }, { name: "23", value: 30 }, { name: "24", value: 20 },
    { name: "25", value: 35 }, { name: "26", value: 40 }, { name: "27", value: 25 }, { name: "28", value: 30 },
    { name: "29", value: 20 },
  ];

  const pieData = [
    { name: "POST /v1/payments", value: 48.5, count: "1.19M", color: "#6d28d9" },
    { name: "GET /v1/transactions", value: 22.7, count: "555K", color: "#8b5cf6" },
    { name: "POST /v1/customers", value: 13.1, count: "322K", color: "#a78bfa" },
    { name: "POST /v1/payouts", value: 8.4, count: "206K", color: "#c4b5fd" },
    { name: "Others", value: 7.3, count: "178K", color: "#ddd6fe" },
  ];

  const apiKeys = [
    { key: "sk_live_7a8f...9d3b", dev: "Acme Inc.", reqs: "456,789", success: "99.3%", status: "Active" },
    { key: "sk_live_1b2c...7e9f", dev: "Globex Corp.", reqs: "287,654", success: "98.9%", status: "Active" },
    { key: "sk_live_9c3d...2a7b", dev: "Initech", reqs: "198,432", success: "99.1%", status: "Active" },
    { key: "sk_live_5e6f...8c1d", dev: "Soylent Corp.", reqs: "142,876", success: "98.6%", status: "Active" },
    { key: "sk_test_3f4a...6b7c", dev: "Umbrella Corp.", reqs: "98,765", success: "97.8%", status: "Test" },
  ];

  const activities = [
    { title: "New developer Jane Cooper joined Acme Inc.", date: "May 31, 2024 • 10:15 AM", icon: <Plus className="w-4 h-4" />, bg: "bg-[#ecfdf5]", color: "text-[#10b981]" },
    { title: "API key sk_live_7a8f...9d3b was created", date: "May 31, 2024 • 09:42 AM", icon: <Key className="w-4 h-4" />, bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
    { title: "Webhook endpoint updated for Acme Inc.", date: "May 30, 2024 • 04:33 PM", icon: <Code className="w-4 h-4" />, bg: "bg-[#eff6ff]", color: "text-[#3b82f6]" },
    { title: "High error rate detected for API key sk_test_3f4a...6b7c", date: "May 30, 2024 • 02:11 PM", icon: <AlertTriangle className="w-4 h-4" />, bg: "bg-[#fff1f2]", color: "text-[#f43f5e]" },
  ];

  const kpis = [
    { title: "Total Developers", value: "128", trend: "↑ 12.5%", trendColor: "text-[#10b981]", icon: <Users className="w-4 h-4" /> },
    { title: "Active API Keys", value: "156", trend: "↑ 8.7%", trendColor: "text-[#10b981]", icon: <Key className="w-4 h-4" /> },
    { title: "API Requests", value: "2.45M", trend: "↑ 18.3%", trendColor: "text-[#10b981]", icon: <Code className="w-4 h-4" /> },
    { title: "Successful Requests", value: "99.2%", trend: "↑ 0.6%", trendColor: "text-[#10b981]", icon: <Clock className="w-4 h-4" /> },
    { title: "Error Rate", value: "0.8%", trend: "↓ 0.4%", trendColor: "text-[#f43f5e]", icon: <AlertTriangle className="w-4 h-4" /> }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Active") {
      return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">Active</span>;
    }
    return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#eff6ff] text-[#3b82f6] text-[10px] font-bold">{status}</span>;
  };

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#0f172a]">Developers</h2>
          <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Manage API keys, monitor usage, and view developer activity.</p>
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
          <div key={idx} className="bg-white border border-[#eef0f6] rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[140px]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#f4efff] text-[#6225E6] flex items-center justify-center shrink-0">
                  {kpi.icon}
                </div>
                <p className="text-[11px] font-semibold text-[#0f172a] truncate">{kpi.title}</p>
              </div>
              <p className="text-[20px] font-bold text-[#0f172a] leading-tight tracking-tight mt-1">{kpi.value}</p>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-[9px] font-medium text-[#94a3b8]">vs Apr 1 - Apr 30</p>
                <p className={`text-[10px] font-bold ${kpi.trendColor}`}>{kpi.trend}</p>
              </div>
            </div>
            
            <div className="h-[30px] mt-2 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`gradDevs-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6225E6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6225E6"
                    strokeWidth={1.5}
                    fill={`url(#gradDevs-${idx})`}
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
        {/* API requests over time */}
        <div className="col-span-8 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between shrink-0 mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">API requests over time</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
              Daily <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGradDevs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6225E6" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(val) => `${val}K`} />
                <Tooltip cursor={{ stroke: "#6225E6", strokeDasharray: "4 4" }} />
                <Area type="monotone" dataKey="value" stroke="#6225E6" strokeWidth={2.5} fill="url(#volGradDevs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Requests by endpoint */}
        <div className="col-span-4 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-[#0f172a] shrink-0 mb-4">Requests by endpoint (Top 5)</h3>
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
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="font-semibold text-[#475569] truncate w-[85px]">{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#0f172a]">{item.value}%</span>
                </div>
              ))}
              <div className="mt-1 text-right">
                 <button className="px-3 py-1 border border-[#eef0f6] rounded-lg text-[10px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                   View all
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Top API keys by usage */}
        <div className="col-span-7 bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-[#0f172a]">Top API keys by usage</h3>
            <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
              View all
            </button>
          </div>
          
          <div className="flex flex-col flex-1">
            <div className="grid grid-cols-5 mb-2">
              <span className="text-[10px] font-bold text-[#64748b] col-span-2">API Key</span>
              <span className="text-[10px] font-bold text-[#64748b]">Developer</span>
              <span className="text-[10px] font-bold text-[#64748b] text-right pr-4">Requests</span>
              <span className="text-[10px] font-bold text-[#64748b] text-right">Success rate</span>
            </div>
            
            <div className="flex flex-col gap-1">
              {apiKeys.map((k, idx) => (
                <div key={idx} className="flex items-center py-2.5 border-b border-[#f1f5f9] last:border-0 relative">
                  <div className="w-[40%] flex items-center gap-1.5">
                    <span className="text-[12px] font-bold text-[#475569]">{k.key}</span>
                    <Copy className="w-3.5 h-3.5 text-[#cbd5e1] cursor-pointer hover:text-[#64748b]" />
                  </div>
                  <div className="w-[20%]">
                    <span className="text-[11px] font-semibold text-[#0f172a]">{k.dev}</span>
                  </div>
                  <div className="w-[20%] text-right pr-4">
                    <span className="text-[11px] font-bold text-[#0f172a]">{k.reqs}</span>
                  </div>
                  <div className="w-[10%] text-right pr-4">
                    <span className="text-[11px] font-semibold text-[#475569]">{k.success}</span>
                  </div>
                  <div className="w-[10%] text-right pr-6">
                    {getStatusBadge(k.status)}
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
            View all API keys <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Side Stack */}
        <div className="col-span-5 flex flex-col gap-6">
          {/* Developer sign-ups over time */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col h-[200px]">
            <div className="flex items-center justify-between shrink-0 mb-2">
              <h3 className="text-[13px] font-bold text-[#0f172a]">Developer sign-ups over time</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
                Daily <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8]" />
              </button>
            </div>
            <div className="flex-1 min-h-0 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#94a3b8" }} dy={5} 
                    tickFormatter={(val) => val === "1" ? "May 1" : val === "8" ? "May 8" : val === "15" ? "May 15" : val === "22" ? "May 22" : val === "29" ? "May 29" : ""}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#94a3b8" }} ticks={[0, 10, 20, 30, 40]} />
                  <Bar dataKey="value" fill="#6225E6" radius={[2, 2, 0, 0]} barSize={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent developer activity */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-bold text-[#0f172a]">Recent developer activity</h3>
              <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                View all
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {activities.map((act, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${act.bg} ${act.color} shrink-0 mt-0.5`}>
                    {act.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0f172a] leading-snug">{act.title}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8] mt-1">{act.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
