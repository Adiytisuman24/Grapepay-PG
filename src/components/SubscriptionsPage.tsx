"use client";

import React from "react";
import {
  FileText, CheckCircle2, XCircle, TrendingUp,
  CalendarDays, Filter, Download, Eye, MoreVertical,
  ChevronLeft, ChevronRight, ChevronDown, Check, X,
  AlertCircle, Clock, PauseCircle
} from "lucide-react";

export default function SubscriptionsPage() {
  const kpis = [
    {
      title: "Total Subscriptions", value: "2,856", trend: "12.5% vs Apr 1 - Apr 30", trendUp: true,
      icon: FileText, bg: "bg-[#f4efff]", color: "text-[#6225E6]", trendColor: "text-[#10b981]"
    },
    {
      title: "Active Subscriptions", value: "2,345", trend: "10.8% vs Apr 1 - Apr 30", trendUp: true,
      icon: CheckCircle2, bg: "bg-[#ecfdf5]", color: "text-[#10b981]", trendColor: "text-[#10b981]"
    },
    {
      title: "Canceled", value: "312", trend: "8.6% vs Apr 1 - Apr 30", trendUp: true,
      icon: XCircle, bg: "bg-[#fff1f2]", color: "text-[#f43f5e]", trendColor: "text-[#10b981]"
    },
    {
      title: "MRR", value: "$98,765.00", trend: "11.3% vs Apr 1 - Apr 30", trendUp: true,
      icon: TrendingUp, bg: "bg-[#f4efff]", color: "text-[#6225E6]", trendColor: "text-[#10b981]"
    }
  ];

  const subscriptions = [
    { customer: "Jane Cooper", email: "jane.cooper@example.com", plan: "Pro Plan", price: "$49.00 / month", status: "Active", cycle: "Monthly", nextBilling: "Jun 01, 2024", nextSub: "", mrr: "$49.00", created: "May 01, 2024\n10:24 AM", initials: "JC", bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
    { customer: "Acme Inc.", email: "billing@acme.com", plan: "Business Plan", price: "$199.00 / month", status: "Active", cycle: "Monthly", nextBilling: "Jun 01, 2024", nextSub: "", mrr: "$199.00", created: "Apr 15, 2024\n09:15 AM", initials: "AI", bg: "bg-[#e2e8f0]", color: "text-[#64748b]" },
    { customer: "Robert Fox", email: "robert.fox@example.com", plan: "Starter Plan", price: "$19.00 / month", status: "Active", cycle: "Monthly", nextBilling: "May 30, 2024", nextSub: "", mrr: "$19.00", created: "May 05, 2024\n06:42 PM", initials: "RF", bg: "bg-[#eff6ff]", color: "text-[#3b82f6]" },
    { customer: "Leslie Alexander", email: "leslie.alex@example.com", plan: "Pro Plan", price: "$49.00 / month", status: "Past Due", cycle: "Monthly", nextBilling: "May 28, 2024", nextSub: "2 days overdue", mrr: "$49.00", created: "Apr 28, 2024\n04:33 PM", initials: "LA", bg: "bg-[#fff7ed]", color: "text-[#f97316]" },
    { customer: "Globex Corp.", email: "accounts@globex.com", plan: "Enterprise Plan", price: "$499.00 / month", status: "Active", cycle: "Monthly", nextBilling: "Jun 10, 2024", nextSub: "", mrr: "$499.00", created: "Apr 10, 2024\n01:22 PM", initials: "GC", bg: "bg-[#ecfdf5]", color: "text-[#10b981]" },
    { customer: "Wade Warren", email: "wade.warren@example.com", plan: "Pro Plan", price: "$49.00 / month", status: "Canceled", cycle: "Monthly", nextBilling: "—", nextSub: "", mrr: "$0.00", created: "Apr 12, 2024\n11:05 AM", initials: "WW", bg: "bg-[#fff1f2]", color: "text-[#f43f5e]" },
    { customer: "Cody Fisher", email: "cody.fisher@example.com", plan: "Starter Plan", price: "$19.00 / month", status: "Trialing", cycle: "Monthly", nextBilling: "Jun 01, 2024", nextSub: "Trial ends in 5 days", mrr: "$0.00", created: "May 27, 2024\n09:47 AM", initials: "CF", bg: "bg-[#eff6ff]", color: "text-[#3b82f6]" },
    { customer: "Darlene Robertson", email: "darlene.robertson@example.com", plan: "Business Plan", price: "$199.00 / month", status: "Paused", cycle: "Monthly", nextBilling: "Jun 01, 2024", nextSub: "", mrr: "$0.00", created: "Apr 20, 2024\n07:16 PM", initials: "DR", bg: "bg-[#fff7ed]", color: "text-[#f97316]" },
    { customer: "Theresa Webb", email: "theresa.webb@example.com", plan: "Pro Plan", price: "$49.00 / month", status: "Active", cycle: "Annual", nextBilling: "Jan 01, 2025", nextSub: "", mrr: "$49.00", created: "Jan 01, 2024\n04:09 PM", initials: "TW", bg: "bg-[#f4efff]", color: "text-[#6225E6]" },
    { customer: "Bessie Cooper", email: "bessie.cooper@example.com", plan: "Starter Plan", price: "$19.00 / month", status: "Active", cycle: "Monthly", nextBilling: "May 31, 2024", nextSub: "", mrr: "$19.00", created: "May 08, 2024\n02:23 PM", initials: "BC", bg: "bg-[#ecfdf5]", color: "text-[#10b981]" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">
            Active <Check className="w-3 h-3" />
          </span>
        );
      case "Past Due":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fff7ed] text-[#f97316] text-[10px] font-bold">
            Past Due <AlertCircle className="w-3 h-3" />
          </span>
        );
      case "Canceled":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fff1f2] text-[#f43f5e] text-[10px] font-bold">
            Canceled <X className="w-3 h-3" />
          </span>
        );
      case "Trialing":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eff6ff] text-[#3b82f6] text-[10px] font-bold">
            Trialing <Clock className="w-3 h-3" />
          </span>
        );
      case "Paused":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#64748b] text-[10px] font-bold">
            Paused <PauseCircle className="w-3 h-3" />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#0f172a]">Subscriptions</h2>
          <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Manage and monitor all customer subscriptions.</p>
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
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white border border-[#eef0f6] rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-[#64748b]">{kpi.title}</p>
                <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight mt-1">{kpi.value}</p>
                <p className={`text-[9px] font-bold mt-1.5 flex items-center gap-1 ${kpi.trendColor}`}>
                  <span>{kpi.trendUp ? "↑" : "↓"}</span>
                  {kpi.trend}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#eef0f6]">
        <button className="pb-3 border-b-2 border-[#6225E6] text-[13px] font-bold text-[#6225E6] flex items-center gap-2">
          All
          <span className="px-1.5 py-0.5 bg-[#f4efff] text-[#6225E6] text-[10px] rounded-md">2,856</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#0f172a] hover:text-[#6225E6] flex items-center gap-2 transition-colors">
          Active
          <span className="px-1.5 py-0.5 bg-[#ecfdf5] text-[#10b981] text-[10px] rounded-md">2,345</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Canceled
          <span className="px-1.5 py-0.5 bg-[#fff1f2] text-[#f43f5e] text-[10px] rounded-md">312</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Past Due
          <span className="px-1.5 py-0.5 bg-[#fff7ed] text-[#f97316] text-[10px] rounded-md">145</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Trialing
          <span className="px-1.5 py-0.5 bg-[#eff6ff] text-[#3b82f6] text-[10px] rounded-md">54</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Paused
          <span className="px-1.5 py-0.5 bg-[#f1f5f9] text-[#64748b] text-[10px] rounded-md">23</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#eef0f6] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#eef0f6] bg-white">
                <th className="py-3 px-4 w-[40px]">
                  <div className="w-4 h-4 rounded-md border border-[#eef0f6] bg-[#f8fafc]"></div>
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Customer</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Plan</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Status</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Billing Cycle</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Next Billing</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">MRR</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Created At</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0f6]">
              {subscriptions.map((s, i) => (
                <tr key={i} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="py-3 px-4">
                    <div className="w-4 h-4 rounded-md border border-[#eef0f6] bg-white group-hover:border-[#cbd5e1] transition-colors cursor-pointer"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${s.bg} ${s.color} shrink-0`}>
                        {s.initials}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0f172a]">{s.customer}</p>
                        <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-[12px] font-semibold text-[#0f172a]">{s.plan}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{s.price}</p>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(s.status)}
                  </td>
                  <td className="py-3 px-4 text-[11px] font-semibold text-[#0f172a]">{s.cycle}</td>
                  <td className="py-3 px-4">
                    <p className="text-[12px] font-semibold text-[#0f172a]">{s.nextBilling}</p>
                    {s.nextSub && (
                      <p className={`text-[10px] font-medium mt-0.5 ${
                        s.status === "Past Due" ? "text-[#f43f5e]" : "text-[#3b82f6]"
                      }`}>{s.nextSub}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[12px] font-semibold text-[#0f172a]">{s.mrr}</td>
                  <td className="py-3 px-4">
                    <p className="text-[11px] font-semibold text-[#0f172a] whitespace-pre-line leading-tight">
                      {s.created}
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
          <p className="text-[12px] font-medium text-[#64748b]">Showing 1 to 10 of 2,856 subscriptions</p>
          
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#94a3b8] hover:bg-[#f8fafc]"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#6225E6] bg-[#f4efff] text-[#6225E6] text-[11px] font-bold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">3</button>
            <span className="w-7 h-7 flex items-center justify-center text-[#94a3b8] text-[11px]">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">286</button>
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
