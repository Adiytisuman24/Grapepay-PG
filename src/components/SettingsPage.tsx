"use client";

import React, { useState } from "react";
import {
  Settings, Building2, Users, CreditCard, Shield, Key, Network, Bell,
  FileCheck, ShieldCheck, FileClock, ChevronDown, Download, Trash2, Database,
  Plus, MoreHorizontal
} from "lucide-react";

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState("General");

  const menuItems = [
    { id: "General", icon: Settings },
    { id: "Business Profile", icon: Building2 },
    { id: "Team Members", icon: Users },
    { id: "Billing & Plans", icon: CreditCard },
    { id: "Security", icon: Shield },
    { id: "API Keys", icon: Key },
    { id: "Webhooks", icon: Network },
    { id: "Notifications", icon: Bell },
    { id: "Compliance", icon: FileCheck },
    { id: "Data & Privacy", icon: ShieldCheck },
    { id: "Audit Logs", icon: FileClock },
  ];

  return (
    <div className="flex-1 px-6 pb-6 h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="mb-6 shrink-0">
        <h2 className="text-[22px] font-bold text-[#0f172a]">Settings</h2>
        <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Manage your account, team, and preferences.</p>
      </div>

      <div className="flex gap-8 flex-1 min-h-0">
        {/* Left Navigation */}
        <div className="w-[220px] shrink-0 space-y-1 overflow-y-auto pr-2 pb-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#f4efff] text-[#6225E6]"
                    : "text-[#475569] hover:bg-[#f8fafc]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#6225E6]" : "text-[#94a3b8]"}`} />
                {item.id}
              </button>
            );
          })}
        </div>

        {/* Right Content */}
        <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
          
          {/* General Settings */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[15px] font-bold text-[#0f172a]">General Settings</h3>
              <button className="px-4 py-2 bg-[#6225E6] rounded-xl text-[12px] font-bold text-white hover:bg-[#5019cf] transition-colors shadow-sm">
                Save changes
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1.5">Business Name</label>
                <input 
                  type="text" 
                  defaultValue="Acme Corp" 
                  className="w-full px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[13px] font-semibold text-[#0f172a] focus:outline-none focus:border-[#6225E6] focus:ring-1 focus:ring-[#6225E6]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1.5">Country</label>
                <div className="relative">
                  <select className="w-full px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[13px] font-semibold text-[#0f172a] appearance-none focus:outline-none focus:border-[#6225E6] focus:ring-1 focus:ring-[#6225E6]">
                    <option>India</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94a3b8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1.5">Business Email</label>
                <input 
                  type="email" 
                  defaultValue="hello@acmecorp.com" 
                  className="w-full px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[13px] font-semibold text-[#0f172a] focus:outline-none focus:border-[#6225E6] focus:ring-1 focus:ring-[#6225E6]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1.5">Timezone</label>
                <div className="relative">
                  <select className="w-full px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[13px] font-semibold text-[#0f172a] appearance-none focus:outline-none focus:border-[#6225E6] focus:ring-1 focus:ring-[#6225E6]">
                    <option>(GMT+05:30) Asia/Kolkata</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94a3b8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1.5">Phone Number</label>
                <div className="flex">
                  <div className="px-3 py-2 bg-[#f8fafc] border border-[#eef0f6] border-r-0 rounded-l-xl text-[14px] flex items-center justify-center shrink-0">
                    🇮🇳
                  </div>
                  <input 
                    type="text" 
                    defaultValue="+91 98765 43210" 
                    className="w-full px-3 py-2 bg-white border border-[#eef0f6] rounded-r-xl text-[13px] font-semibold text-[#0f172a] focus:outline-none focus:border-[#6225E6] focus:ring-1 focus:ring-[#6225E6]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1.5">Currency</label>
                <div className="relative">
                  <select className="w-full px-3 py-2 bg-white border border-[#eef0f6] rounded-xl text-[13px] font-semibold text-[#0f172a] appearance-none focus:outline-none focus:border-[#6225E6] focus:ring-1 focus:ring-[#6225E6]">
                    <option>INR (₹) - Indian Rupee</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94a3b8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#0f172a]">Security</h3>
            <p className="text-[12px] font-medium text-[#64748b] mt-0.5 mb-6">Manage your password and security preferences.</p>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-[11px] font-bold text-[#0f172a] mb-1">Password</p>
                <p className="text-[16px] font-bold text-[#94a3b8] mb-3">••••••••••••••••</p>
                <button className="px-3 py-1.5 bg-white border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                  Change password
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[11px] font-bold text-[#0f172a]">Two-factor authentication</p>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#ecfdf5] text-[#10b981]">Enabled</span>
                </div>
                <p className="text-[11px] font-medium text-[#64748b] mb-3 leading-snug">Add an extra layer of security to your account.</p>
                <button className="px-3 py-1.5 bg-white border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                  Manage 2FA
                </button>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#0f172a] mb-1">Session management</p>
                <p className="text-[11px] font-medium text-[#64748b] mb-3 leading-snug">View and manage your active sessions.</p>
                <button className="px-3 py-1.5 bg-white border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc]">
                  Manage sessions
                </button>
              </div>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="bg-white border border-[#eef0f6] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#0f172a]">Email Notifications</h3>
            <p className="text-[12px] font-medium text-[#64748b] mt-0.5 mb-6">Choose what updates you want to receive via email.</p>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-bold text-[#0f172a]">Payment alerts</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Receive emails for successful and failed payments.</p>
                </div>
                {/* Toggle ON */}
                <div className="w-8 h-4 bg-[#6225E6] rounded-full relative cursor-pointer ml-4 shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-bold text-[#0f172a]">Payout alerts</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Receive emails for payouts and settlements.</p>
                </div>
                <div className="w-8 h-4 bg-[#6225E6] rounded-full relative cursor-pointer ml-4 shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-bold text-[#0f172a]">Dispute updates</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Receive emails for dispute activities and updates.</p>
                </div>
                <div className="w-8 h-4 bg-[#6225E6] rounded-full relative cursor-pointer ml-4 shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-bold text-[#0f172a]">Invoice reminders</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Receive emails for invoice due reminders.</p>
                </div>
                <div className="w-8 h-4 bg-[#6225E6] rounded-full relative cursor-pointer ml-4 shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-bold text-[#0f172a]">Product updates</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Receive emails about product and feature updates.</p>
                </div>
                {/* Toggle OFF */}
                <div className="w-8 h-4 bg-[#eef0f6] rounded-full relative cursor-pointer ml-4 shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-bold text-[#0f172a]">Marketing emails</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Receive emails about offers and announcements.</p>
                </div>
                <div className="w-8 h-4 bg-[#eef0f6] rounded-full relative cursor-pointer ml-4 shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Split Row */}
          <div className="grid grid-cols-2 gap-6 pb-4">
            {/* Webhook Settings */}
            <div className="bg-white border border-[#eef0f6] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[15px] font-bold text-[#0f172a]">Webhook Settings</h3>
              <p className="text-[12px] font-medium text-[#64748b] mt-0.5 mb-6">Manage and configure your webhook endpoints.</p>
              
              <div className="mb-4">
                <div className="flex text-[10px] font-bold text-[#64748b] mb-2">
                  <div className="flex-1">Webhook URL</div>
                  <div className="w-16">Status</div>
                  <div className="w-8"></div>
                </div>
                <div className="flex items-center py-2.5 border-b border-[#f1f5f9]">
                  <div className="flex-1 text-[11px] font-bold text-[#6225E6]">https://acmecorp.com/webhooks/grapepay</div>
                  <div className="w-16">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#ecfdf5] text-[#10b981] text-[10px] font-bold">Active</span>
                  </div>
                  <div className="w-8 text-right text-[#94a3b8] cursor-pointer hover:text-[#64748b]">
                    <MoreHorizontal className="w-4 h-4 ml-auto" />
                  </div>
                </div>
              </div>
              
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#6225E6] hover:bg-[#f8fafc]">
                <Plus className="w-3.5 h-3.5" />
                Add Webhook
              </button>
            </div>

            {/* Data & Privacy */}
            <div className="bg-white border border-[#eef0f6] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[15px] font-bold text-[#0f172a]">Data & Privacy</h3>
              <p className="text-[12px] font-medium text-[#64748b] mt-0.5 mb-6">Manage your data preferences and download your data.</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded bg-[#f8fafc] border border-[#eef0f6] flex items-center justify-center shrink-0">
                      <Download className="w-3.5 h-3.5 text-[#64748b]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#0f172a]">Download Data</p>
                      <p className="text-[11px] font-medium text-[#64748b]">Download a copy of your business data.</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc] shrink-0">
                    Request data
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded bg-[#f8fafc] border border-[#eef0f6] flex items-center justify-center shrink-0">
                      <Trash2 className="w-3.5 h-3.5 text-[#64748b]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#0f172a]">Delete Account</p>
                      <p className="text-[11px] font-medium text-[#64748b]">Permanently delete your account and data.</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-[#fee2e2] rounded-lg text-[11px] font-bold text-[#ef4444] hover:bg-[#fef2f2] shrink-0">
                    Delete account
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded bg-[#f8fafc] border border-[#eef0f6] flex items-center justify-center shrink-0">
                      <Database className="w-3.5 h-3.5 text-[#64748b]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#0f172a]">Data Retention</p>
                      <p className="text-[11px] font-medium text-[#64748b]">Manage how long we retain your data.</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-[#eef0f6] rounded-lg text-[11px] font-bold text-[#475569] hover:bg-[#f8fafc] shrink-0">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
