"use client";

import React from "react";
import {
  Users, UserPlus, RefreshCw, CreditCard, TrendingUp,
  CalendarDays, Filter, Download, Eye, MoreVertical, Copy,
  ChevronLeft, ChevronRight, ChevronDown
} from "lucide-react";

export default function CustomersPage() {
  const kpis = [
    {
      title: "Total Customers", value: "2,431", trend: "12.5% vs Apr 1 - Apr 30", trendUp: true,
      icon: Users, bg: "bg-[#f4efff]", color: "text-[#6225E6]", trendColor: "text-[#10b981]"
    },
    {
      title: "New Customers", value: "312", trend: "8.4% vs Apr 1 - Apr 30", trendUp: true,
      icon: UserPlus, bg: "bg-[#eff6ff]", color: "text-[#3b82f6]", trendColor: "text-[#10b981]"
    },
    {
      title: "Repeat Customers", value: "1,892", trend: "15.7% vs Apr 1 - Apr 30", trendUp: true,
      icon: RefreshCw, bg: "bg-[#eff6ff]", color: "text-[#3b82f6]", trendColor: "text-[#10b981]"
    },
    {
      title: "Total Revenue", value: "$98,765.00", trend: "11.3% vs Apr 1 - Apr 30", trendUp: true,
      icon: CreditCard, bg: "bg-[#fdf4ff]", color: "text-[#d946ef]", trendColor: "text-[#10b981]"
    },
    {
      title: "Avg. Revenue / Customer", value: "$40.62", trend: "6.2% vs Apr 1 - Apr 30", trendUp: true,
      icon: TrendingUp, bg: "bg-[#fdf4ff]", color: "text-[#d946ef]", trendColor: "text-[#10b981]"
    }
  ];

  const customers = [
    { id: "cus_1P8s7M2eZvKYlo2C3X9a8", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "+1 (555) 123-4567", payments: 12, spent: "$1,250.00", status: "Active", joined: "May 31, 2024\n10:24 AM", initials: "JC", bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
    { id: "cus_1P8s7M2eZvKYlo2C3X9b7", name: "Acme Inc.", email: "billing@acme.com", phone: "+1 (555) 987-6543", payments: 28, spent: "$24,990.00", status: "Active", joined: "May 31, 2024\n09:15 AM", initials: "AI", bg: "bg-[#e2e8f0]", color: "text-[#64748b]" },
    { id: "cus_1P8s7M2eZvKYlo2C3X9c6", name: "Robert Fox", email: "robert.fox@example.com", phone: "+1 (555) 234-5678", payments: 6, spent: "$890.00", status: "Active", joined: "May 30, 2024\n06:42 PM", initials: "RF", bg: "bg-[#eff6ff]", color: "text-[#3b82f6]" },
    { id: "cus_1P8s7M2eZvKYlo2C3X9d5", name: "Leslie Alexander", email: "leslie.alex@example.com", phone: "+1 (555) 345-6789", payments: 4, spent: "$590.00", status: "Active", joined: "May 30, 2024\n04:33 PM", initials: "LA", bg: "bg-[#fff7ed]", color: "text-[#f97316]" },
    { id: "cus_1P8s7M2eZvKYlo2C3X9e4", name: "Globex Corp.", email: "accounts@globex.com", phone: "+1 (555) 456-7890", payments: 15, spent: "$11,990.00", status: "Active", joined: "May 30, 2024\n01:22 PM", initials: "GC", bg: "bg-[#ecfdf5]", color: "text-[#10b981]" },
    { id: "cus_1P8s7M2eZvKYlo2C3X9f3", name: "Wade Warren", email: "wade.warren@example.com", phone: "+1 (555) 567-8901", payments: 3, spent: "$320.00", status: "Inactive", joined: "May 29, 2024\n11:05 AM", initials: "WW", bg: "bg-[#fff1f2]", color: "text-[#f43f5e]" },
    { id: "cus_1P8s7M2eZvKYlo2C3X9g2", name: "Cody Fisher", email: "cody.fisher@example.com", phone: "+1 (555) 678-9012", payments: 5, spent: "$750.00", status: "Active", joined: "May 29, 2024\n09:47 AM", initials: "CF", bg: "bg-[#eff6ff]", color: "text-[#3b82f6]" },
  ];

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#0f172a]">Customers</h2>
          <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Manage and view all your customers in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[12px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
            <CalendarDays className="w-4 h-4 text-[#94a3b8]" />
            May 1 – May 31, 2024
            <ChevronDown className="w-3.5 h-3.5 text-[#94a3b8] ml-1" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[12px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
            <Filter className="w-4 h-4 text-[#94a3b8]" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[12px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
            <Download className="w-4 h-4 text-[#94a3b8]" />
            Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white border border-[#eef0f6] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#64748b]">{kpi.title}</p>
                  <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight mt-0.5">{kpi.value}</p>
                </div>
              </div>
              <p className={`text-[9px] font-bold mt-3 flex items-center gap-1 ${kpi.trendColor}`}>
                <span>{kpi.trendUp ? "↑" : "↓"}</span>
                {kpi.trend}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#eef0f6]">
        <button className="pb-3 border-b-2 border-[#6225E6] text-[13px] font-bold text-[#0f172a] flex items-center gap-2">
          All
          <span className="px-1.5 py-0.5 bg-[#f4efff] text-[#6225E6] text-[10px] rounded-md">2,431</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Active
          <span className="px-1.5 py-0.5 bg-[#ecfdf5] text-[#10b981] text-[10px] rounded-md">2,118</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Inactive
          <span className="px-1.5 py-0.5 bg-[#fff7ed] text-[#f97316] text-[10px] rounded-md">313</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#eef0f6] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#eef0f6] bg-[#f8fafc]">
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Customer</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Customer ID</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Email</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Phone</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Total Payments</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Total Spent</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Status</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b] flex items-center gap-1">Joined On <ChevronDown className="w-3 h-3" /></th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0f6]">
              {customers.map((c, i) => (
                <tr key={i} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${c.bg} ${c.color} shrink-0`}>
                        {c.initials}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0f172a]">{c.name}</p>
                        <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{c.payments} payments</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#475569] truncate w-[160px]">{c.id}</span>
                      <Copy className="w-3.5 h-3.5 text-[#94a3b8] cursor-pointer hover:text-[#0f172a]" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[11px] font-medium text-[#64748b]">{c.email}</td>
                  <td className="py-3 px-4 text-[11px] font-medium text-[#64748b]">{c.phone}</td>
                  <td className="py-3 px-4 text-[12px] font-semibold text-[#0f172a]">{c.payments}</td>
                  <td className="py-3 px-4 text-[12px] font-semibold text-[#0f172a]">{c.spent}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      c.status === "Active" ? "bg-[#ecfdf5] text-[#10b981]" : "bg-[#f1f5f9] text-[#64748b]"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-[11px] font-semibold text-[#0f172a] whitespace-pre-line leading-tight">
                      {c.joined}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#eef0f6] text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#eef0f6] text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-5 py-4 border-t border-[#eef0f6] flex items-center justify-between">
          <p className="text-[12px] font-medium text-[#64748b]">Showing 1 to 10 of 2,431 customers</p>
          
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#94a3b8] hover:bg-[#f8fafc]"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#6225E6] bg-[#f4efff] text-[#6225E6] text-[11px] font-bold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">3</button>
            <span className="w-7 h-7 flex items-center justify-center text-[#94a3b8] text-[11px]">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">244</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#94a3b8] hover:bg-[#f8fafc]"><ChevronRight className="w-4 h-4" /></button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
              10 / page <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
