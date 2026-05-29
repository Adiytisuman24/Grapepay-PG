"use client";

import React from "react";
import {
  Settings, ChevronDown, ArrowRight, Clock, AlertTriangle,
  Copy, Plus, MoreHorizontal, ExternalLink, Network, Send,
  Eye, CheckCircle2, Search
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer
} from "recharts";

export default function WebhooksPage() {
  const sparklineData = [
    { value: 10 }, { value: 25 }, { value: 15 }, { value: 40 },
    { value: 20 }, { value: 50 }, { value: 30 }, { value: 60 }
  ];

  const webhooks = [
    { name: "Payments Webhook", desc: "Primary payments integration", url: "https://api.acmecorp.com/webhooks/payments", events: "8 events", status: "Active", date: "May 31, 2024", time: "10:15 AM", success: "99.2%" },
    { name: "Payouts Webhook", desc: "Payouts & settlements", url: "https://api.acmecorp.com/webhooks/payouts", events: "4 events", status: "Active", date: "May 31, 2024", time: "09:42 AM", success: "98.8%" },
    { name: "Disputes Webhook", desc: "Dispute lifecycle events", url: "https://api.acmecorp.com/webhooks/disputes", events: "6 events", status: "Active", date: "May 31, 2024", time: "09:18 AM", success: "100%" },
    { name: "Subscriptions Webhook", desc: "Subscription related events", url: "https://api.acmecorp.com/webhooks/subscriptions", events: "5 events", status: "Active", date: "May 31, 2024", time: "08:55 AM", success: "99.5%" },
    { name: "Invoice Webhook", desc: "Invoice events", url: "https://api.acmecorp.com/webhooks/invoices", events: "5 events", status: "Active", date: "May 31, 2024", time: "08:20 AM", success: "97.9%" },
    { name: "Test Webhook", desc: "For testing & dev", url: "https://webhook.site/123abc", events: "3 events", status: "Inactive", date: "May 30, 2024", time: "04:12 PM", success: "-" },
  ];

  const deliveries = [
    { event: "payment.succeeded", date: "May 31, 2024, 10:15 AM", status: "200 OK", isError: false },
    { event: "payment.refunded", date: "May 31, 2024, 10:14 AM", status: "200 OK", isError: false },
    { event: "payment.failed", date: "May 31, 2024, 10:13 AM", status: "500", isError: true },
    { event: "chargeback.created", date: "May 31, 2024, 10:12 AM", status: "200 OK", isError: false },
    { event: "payout.processed", date: "May 31, 2024, 10:11 AM", status: "200 OK", isError: false },
  ];

  const kpis = [
    { title: "Total Webhooks", value: "12", trend: "↑ 9.1%", trendColor: "text-[#10b981]", icon: <Network className="w-4 h-4" /> },
    { title: "Successful Deliveries", value: "98.7%", trend: "↑ 1.6%", trendColor: "text-[#10b981]", icon: <Send className="w-4 h-4" /> },
    { title: "Failed Deliveries", value: "1.3%", trend: "↓ 0.4%", trendColor: "text-[#f43f5e]", icon: <AlertTriangle className="w-4 h-4" /> },
    { title: "Avg. Response time", value: "243 ms", trend: "↓ 12.4%", trendColor: "text-[#10b981]", icon: <Clock className="w-4 h-4" /> }
  ];

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#0f172a]">Webhooks</h2>
          <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Listen to events in real time and build powerful integrations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[12px] font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
            <Network className="w-4 h-4 text-[#475569]" />
            Webhook Documentation
            <ExternalLink className="w-3.5 h-3.5 text-[#94a3b8] ml-1" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#6225E6] rounded-xl text-[12px] font-semibold text-white hover:bg-[#5019cf] transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Webhook
          </button>
        </div>
      </div>

      {/* KPIs Row - 4 columns for Webhooks */}
      <div className="grid grid-cols-4 gap-4">
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
                    <linearGradient id={`gradWebhooks-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6225E6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#6225E6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6225E6"
                    strokeWidth={1.5}
                    fill={`url(#gradWebhooks-${idx})`}
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column - Your Webhooks List & How it works */}
        <div className="col-span-8 flex flex-col gap-6">
          
          {/* Your Webhooks Table */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-bold text-[#0f172a]">Your Webhooks</h3>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#eef0f6] rounded-lg w-[200px]">
                  <Search className="w-3.5 h-3.5 text-[#cbd5e1]" />
                  <input 
                    type="text" 
                    placeholder="Search webhooks..." 
                    className="w-full text-[11px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
                  Status
                  <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#eef0f6] rounded-lg text-[11px] font-semibold text-[#475569] hover:bg-[#f8fafc]">
                  Events
                  <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
                </button>
                <button className="w-7 h-7 flex items-center justify-center border border-[#eef0f6] rounded-lg text-[#475569] hover:bg-[#f8fafc]">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="grid grid-cols-12 mb-2 pb-2 border-b border-[#f1f5f9]">
                <span className="text-[10px] font-bold text-[#64748b] col-span-3">Name</span>
                <span className="text-[10px] font-bold text-[#64748b] col-span-3">URL</span>
                <span className="text-[10px] font-bold text-[#64748b] col-span-2">Events</span>
                <span className="text-[10px] font-bold text-[#64748b] col-span-1">Status</span>
                <span className="text-[10px] font-bold text-[#64748b] col-span-1">Last Delivery</span>
                <span className="text-[10px] font-bold text-[#64748b] col-span-1 whitespace-nowrap">Success Rate</span>
                <span className="text-[10px] font-bold text-[#64748b] col-span-1 text-right">Actions</span>
              </div>
              
              <div className="flex flex-col gap-1">
                {webhooks.map((w, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center py-2.5 border-b border-[#f1f5f9] last:border-0">
                    <div className="col-span-3 pr-2">
                      <p className="text-[11px] font-bold text-[#0f172a]">{w.name}</p>
                      <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5 truncate">{w.desc}</p>
                    </div>
                    <div className="col-span-3 pr-2">
                      <a href="#" className="text-[11px] font-medium text-[#6225E6] hover:underline truncate block w-full">{w.url}</a>
                    </div>
                    <div className="col-span-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#f8fafc] border border-[#eef0f6] text-[#475569] text-[10px] font-semibold">{w.events}</span>
                    </div>
                    <div className="col-span-1">
                      {w.status === "Active" ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                          <span className="text-[11px] font-semibold text-[#10b981]">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full border-2 border-[#cbd5e1] flex items-center justify-center shrink-0 relative">
                             <div className="absolute w-[12px] h-[1px] bg-[#cbd5e1] rotate-45"></div>
                          </div>
                          <span className="text-[11px] font-semibold text-[#64748b]">Inactive</span>
                        </div>
                      )}
                    </div>
                    <div className="col-span-1 pr-2">
                      <p className="text-[11px] font-medium text-[#0f172a]">{w.date}</p>
                      <p className="text-[10px] font-medium text-[#94a3b8]">{w.time}</p>
                    </div>
                    <div className="col-span-1">
                      <span className="text-[11px] font-semibold text-[#0f172a]">{w.success}</span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button className="w-6 h-6 flex items-center justify-center rounded-lg text-[#94a3b8] hover:bg-[#f8fafc]">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-[11px] font-medium text-[#64748b]">Showing 1 to 6 of 12 results</span>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 flex items-center justify-center rounded-md text-[#94a3b8] hover:bg-[#f8fafc]">
                  {"<"}
                </button>
                <button className="w-6 h-6 flex items-center justify-center rounded-md bg-[#f4efff] text-[#6225E6] text-[11px] font-bold">1</button>
                <button className="w-6 h-6 flex items-center justify-center rounded-md text-[#475569] hover:bg-[#f8fafc] text-[11px] font-bold">2</button>
                <button className="w-6 h-6 flex items-center justify-center rounded-md text-[#94a3b8] hover:bg-[#f8fafc]">
                  {">"}
                </button>
              </div>
            </div>
          </div>

          {/* How webhooks work */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-[13px] font-bold text-[#0f172a] mb-4">How webhooks work</h3>
              <div className="flex items-center gap-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f4efff] text-[#6225E6] flex items-center justify-center shrink-0">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a]">1. Choose events</p>
                    <p className="text-[10px] font-medium text-[#64748b] mt-0.5">Select the events you want to receive.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f4efff] text-[#6225E6] flex items-center justify-center shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a]">2. Receive requests</p>
                    <p className="text-[10px] font-medium text-[#64748b] mt-0.5">We'll send a POST request to your URL.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f4efff] text-[#6225E6] flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0f172a]">3. Handle & respond</p>
                    <p className="text-[10px] font-medium text-[#64748b] mt-0.5">Return a 2xx status code to acknowledge.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-[1px] h-[60px] bg-[#eef0f6] mx-6"></div>
            
            <div className="w-[180px] shrink-0">
              <p className="text-[11px] font-medium text-[#64748b] mb-1">Learn more in our</p>
              <a href="#" className="text-[12px] font-bold text-[#6225E6] hover:underline flex items-center gap-1">
                Webhook Documentation <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Webhook Details & Deliveries */}
        <div className="col-span-4 flex flex-col gap-6">
          
          {/* Webhook details */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm relative">
            <div className="absolute top-5 right-5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">Active</span>
            </div>
            
            <h3 className="text-[13px] font-bold text-[#0f172a] mb-5">Webhook details</h3>
            
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#f4efff] text-[#6225E6] flex items-center justify-center shrink-0">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0f172a]">Payments Webhook</p>
                <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Primary payments integration</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-bold text-[#0f172a] mb-1.5">Webhook URL</p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-[#64748b] truncate w-[250px]">https://api.acmecorp.com/webhooks/payments</span>
                  <Copy className="w-3.5 h-3.5 text-[#cbd5e1] cursor-pointer hover:text-[#64748b] shrink-0" />
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-[#0f172a] mb-2">Events</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-md bg-[#f4efff] text-[#6225E6] text-[10px] font-semibold">payment.succeeded</span>
                  <span className="px-2 py-1 rounded-md bg-[#f4efff] text-[#6225E6] text-[10px] font-semibold">payment.failed</span>
                  <span className="px-2 py-1 rounded-md bg-[#f4efff] text-[#6225E6] text-[10px] font-semibold">payment.refunded</span>
                  <span className="px-2 py-1 rounded-md bg-[#f4efff] text-[#6225E6] text-[10px] font-semibold">chargeback.created</span>
                  <span className="px-2 py-1 rounded-md bg-[#f4efff] text-[#6225E6] text-[10px] font-semibold">chargeback.updated</span>
                  <span className="px-2 py-1 rounded-md bg-[#f1f5f9] text-[#64748b] text-[10px] font-bold">+3 more</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-[#0f172a] mb-1.5">Secret</p>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-mono font-medium text-[#64748b]">whsec_••••••••••••••••••••••••••••</span>
                  <Eye className="w-3.5 h-3.5 text-[#cbd5e1] cursor-pointer hover:text-[#64748b] shrink-0 ml-1" />
                  <Copy className="w-3.5 h-3.5 text-[#cbd5e1] cursor-pointer hover:text-[#64748b] shrink-0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[11px] font-bold text-[#0f172a] mb-0.5">Created</p>
                  <p className="text-[10px] font-medium text-[#64748b]">Apr 10, 2024, 11:20 AM</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#0f172a] mb-0.5">Last updated</p>
                  <p className="text-[10px] font-medium text-[#64748b]">May 15, 2024, 02:45 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent deliveries */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-5 shadow-sm flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-bold text-[#0f172a]">Recent deliveries</h3>
              <button className="px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                View all
              </button>
            </div>
            
            <div className="flex flex-col gap-4 flex-1">
              {deliveries.map((d, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div className="flex gap-3">
                    {d.isError ? (
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-[#fff1f2] flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-3 h-3 text-[#f43f5e]" />
                      </div>
                    ) : (
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-[#ecfdf5] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                      </div>
                    )}
                    <div>
                      <p className="text-[12px] font-semibold text-[#0f172a]">{d.event}</p>
                      <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{d.date}</p>
                    </div>
                  </div>
                  <div>
                     <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${d.isError ? "bg-[#fff1f2] text-[#f43f5e]" : "bg-[#ecfdf5] text-[#10b981]"}`}>
                       {d.status}
                     </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-6 text-[12px] font-bold text-[#6225E6] flex items-center gap-1 hover:text-[#5019cf] transition-colors w-fit">
              View all deliveries <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
