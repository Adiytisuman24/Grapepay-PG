"use client";

import React from "react";
import {
  CalendarDays, Filter, Download, Eye, MoreVertical,
  ChevronLeft, ChevronRight, ChevronDown, Check, X,
  AlertTriangle, Clock, RefreshCw, CreditCard, Building2, Smartphone, ExternalLink
} from "lucide-react";

export default function PaymentsPage() {
  const payments = [
    { id: "pay_1P8s7M2eZvKYlo2C3X9a8", customer: "Jane Cooper", email: "jane.cooper@example.com", amount: "$125.00", currency: "USD", method: "Visa •••• 4242", methodIcon: "visa", status: "Succeeded", date: "May 31, 2024\n10:24 AM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9b7", customer: "Acme Inc.", email: "billing@acme.com", amount: "$2,499.00", currency: "USD", method: "Google Pay", methodIcon: "gpay", status: "Succeeded", date: "May 31, 2024\n09:15 AM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9c6", customer: "Robert Fox", email: "robert.fox@example.com", amount: "$89.00", currency: "USD", method: "Paytm UPI", methodIcon: "paytm", status: "Succeeded", date: "May 30, 2024\n06:42 PM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9d5", customer: "Leslie Alexander", email: "leslie.alex@example.com", amount: "$59.00", currency: "USD", method: "Mastercard •••• 5555", methodIcon: "mastercard", status: "Failed", date: "May 30, 2024\n04:33 PM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9e4", customer: "Globex Corp.", email: "accounts@globex.com", amount: "$1,199.00", currency: "USD", method: "PhonePe", methodIcon: "phonepe", status: "Succeeded", date: "May 30, 2024\n01:22 PM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9f3", customer: "Wade Warren", email: "wade.warren@example.com", amount: "$320.00", currency: "USD", method: "Netbanking", methodIcon: "bank", status: "Refunded", date: "May 29, 2024\n11:05 AM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9g2", customer: "Cody Fisher", email: "cody.fisher@example.com", amount: "$75.00", currency: "USD", method: "Rupay •••• 1234", methodIcon: "rupay", status: "Chargeback", date: "May 29, 2024\n09:47 AM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9h1", customer: "Darlene Robertson", email: "darlene.robertson@example.com", amount: "$499.00", currency: "USD", method: "UPI", methodIcon: "upi", status: "Succeeded", date: "May 28, 2024\n07:16 PM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9i0", customer: "Theresa Webb", email: "theresa.webb@example.com", amount: "$150.00", currency: "USD", method: "Amazon Pay", methodIcon: "amazon", status: "Pending", date: "May 28, 2024\n04:09 PM" },
    { id: "pay_1P8s7M2eZvKYlo2C3X9j9", customer: "Bessie Cooper", email: "bessie.cooper@example.com", amount: "$210.00", currency: "USD", method: "Google Pay", methodIcon: "gpay", status: "Succeeded", date: "May 27, 2024\n02:23 PM" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Succeeded":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">
            Succeeded <Check className="w-3 h-3" />
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fff1f2] text-[#f43f5e] text-[10px] font-bold">
            Failed <X className="w-3 h-3" />
          </span>
        );
      case "Refunded":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f4efff] text-[#6225E6] text-[10px] font-bold">
            Refunded <RefreshCw className="w-3 h-3" />
          </span>
        );
      case "Chargeback":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fff7ed] text-[#f97316] text-[10px] font-bold">
            Chargeback <AlertTriangle className="w-3 h-3" />
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eff6ff] text-[#3b82f6] text-[10px] font-bold">
            Pending <Clock className="w-3 h-3" />
          </span>
        );
      default:
        return null;
    }
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "visa":
        return <span className="text-[12px] font-bold text-[#1a1f71] italic mr-2">VISA</span>;
      case "mastercard":
        return (
          <div className="flex -space-x-1.5 mr-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ea001b] mix-blend-multiply"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] mix-blend-multiply"></div>
          </div>
        );
      case "gpay":
        return <span className="text-[12px] font-bold mr-2"><span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span></span>;
      case "paytm":
        return <span className="text-[12px] font-bold text-[#00b9f1] mr-2">Paytm</span>;
      case "phonepe":
        return <span className="w-4 h-4 rounded-full bg-[#5f259f] text-white flex items-center justify-center text-[8px] font-bold mr-2">पे</span>;
      case "bank":
        return <Building2 className="w-4 h-4 text-[#64748b] mr-2" />;
      case "rupay":
        return <span className="text-[12px] font-bold text-[#f26522] italic mr-2">Rupay</span>;
      case "upi":
        return <span className="text-[12px] font-bold text-[#0a271d] mr-2">UPI</span>;
      case "amazon":
        return <span className="text-[12px] font-bold text-[#000000] mr-2">pay</span>;
      default:
        return <CreditCard className="w-4 h-4 text-[#64748b] mr-2" />;
    }
  };

  return (
    <div className="flex-1 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#0f172a]">Payments</h2>
          <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Track and manage all payments in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#6225E6] hover:bg-[#f8fafc]">
            Go to API Explorer
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
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

      {/* KPIs Grid - One combined box */}
      <div className="bg-white border border-[#eef0f6] rounded-2xl shadow-sm p-5">
        <div className="grid grid-cols-6 divide-x divide-[#eef0f6]">
          <div className="pr-4">
            <p className="text-[11px] font-semibold text-[#64748b]">Total Volume</p>
            <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight mt-1.5">$124,560.00</p>
          </div>
          <div className="px-5">
            <p className="text-[11px] font-semibold text-[#64748b] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Successful
            </p>
            <div className="flex items-baseline justify-between mt-1.5">
              <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">2,345</p>
              <p className="text-[11px] font-bold text-[#10b981]">83.2%</p>
            </div>
          </div>
          <div className="px-5">
            <p className="text-[11px] font-semibold text-[#64748b] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f43f5e]"></span> Failed
            </p>
            <div className="flex items-baseline justify-between mt-1.5">
              <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">45</p>
              <p className="text-[11px] font-semibold text-[#64748b]">1.6%</p>
            </div>
          </div>
          <div className="px-5">
            <p className="text-[11px] font-semibold text-[#64748b] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6225E6]"></span> Refunded
            </p>
            <div className="flex items-baseline justify-between mt-1.5">
              <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">32</p>
              <p className="text-[11px] font-semibold text-[#64748b]">1.1%</p>
            </div>
          </div>
          <div className="px-5">
            <p className="text-[11px] font-semibold text-[#64748b] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f97316]"></span> Chargebacks
            </p>
            <div className="flex items-baseline justify-between mt-1.5">
              <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">12</p>
              <p className="text-[11px] font-semibold text-[#64748b]">0.4%</p>
            </div>
          </div>
          <div className="pl-5">
            <p className="text-[11px] font-semibold text-[#64748b] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span> Pending
            </p>
            <div className="flex items-baseline justify-between mt-1.5">
              <p className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">379</p>
              <p className="text-[11px] font-semibold text-[#64748b]">13.7%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#eef0f6]">
        <button className="pb-3 border-b-2 border-[#6225E6] text-[13px] font-bold text-[#0f172a] flex items-center gap-2">
          All
          <span className="px-1.5 py-0.5 bg-[#f4efff] text-[#6225E6] text-[10px] rounded-md">2,813</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Succeeded
          <span className="px-1.5 py-0.5 bg-[#ecfdf5] text-[#10b981] text-[10px] rounded-md">2,345</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Failed
          <span className="px-1.5 py-0.5 bg-[#fff1f2] text-[#f43f5e] text-[10px] rounded-md">45</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Refunded
          <span className="px-1.5 py-0.5 bg-[#f4efff] text-[#6225E6] text-[10px] rounded-md">32</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Pending
          <span className="px-1.5 py-0.5 bg-[#eff6ff] text-[#3b82f6] text-[10px] rounded-md">379</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors">
          Chargebacks
          <span className="px-1.5 py-0.5 bg-[#fff7ed] text-[#f97316] text-[10px] rounded-md">12</span>
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
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Payment ID</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Customer</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Amount</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Payment Method</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b]">Status</th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b] flex items-center gap-1">Date & Time <ChevronDown className="w-3 h-3" /></th>
                <th className="py-3 px-4 text-[11px] font-bold text-[#64748b] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0f6]">
              {payments.map((p, i) => (
                <tr key={i} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="py-3 px-4">
                    <div className="w-4 h-4 rounded-md border border-[#eef0f6] bg-white group-hover:border-[#cbd5e1] transition-colors cursor-pointer"></div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-semibold text-[#475569]">{p.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-[12px] font-semibold text-[#0f172a]">{p.customer}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{p.email}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-[12px] font-semibold text-[#0f172a]">{p.amount}</p>
                    <p className="text-[10px] font-medium text-[#94a3b8] mt-0.5">{p.currency}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getMethodIcon(p.methodIcon)}
                      <span className="text-[11px] font-semibold text-[#0f172a]">{p.method}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(p.status)}
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-[11px] font-semibold text-[#0f172a] whitespace-pre-line leading-tight">
                      {p.date}
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
          <p className="text-[12px] font-medium text-[#64748b]">Showing 1 to 10 of 2,813 payments</p>
          
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#94a3b8] hover:bg-[#f8fafc]"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#6225E6] bg-[#f4efff] text-[#6225E6] text-[11px] font-bold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">3</button>
            <span className="w-7 h-7 flex items-center justify-center text-[#94a3b8] text-[11px]">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#f8fafc] text-[11px] font-semibold">282</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#94a3b8] hover:bg-[#f8fafc]"><ChevronRight className="w-4 h-4" /></button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
