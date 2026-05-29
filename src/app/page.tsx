"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import KPICard from "@/components/KPICard";
import VolumeChart from "@/components/VolumeChart";
import PaymentMethods from "@/components/PaymentMethods";
import RecentTransactions from "@/components/RecentTransactions";
import RevenueOverview from "@/components/RevenueOverview";
import SuccessRate from "@/components/SuccessRate";
import QuickActions from "@/components/QuickActions";
import DocsBanner from "@/components/DocsBanner";
import CustomersPage from "@/components/CustomersPage";
import SubscriptionsPage from "@/components/SubscriptionsPage";
import PaymentsPage from "@/components/PaymentsPage";
import PayoutsPage from "@/components/PayoutsPage";
import InvoicesPage from "@/components/InvoicesPage";
import ReportsPage from "@/components/ReportsPage";
import DisputesPage from "@/components/DisputesPage";
import DevelopersPage from "@/components/DevelopersPage";
import APIKeysPage from "@/components/APIKeysPage";
import SettingsPage from "@/components/SettingsPage";
import WebhooksPage from "@/components/WebhooksPage";
import { DollarSign, CreditCard, Users, ArrowDownLeft } from "lucide-react";

const volumeSparkData = [
  { value: 12000 }, { value: 19000 }, { value: 14000 }, { value: 25000 },
  { value: 22000 }, { value: 30000 }, { value: 24000 }, { value: 35000 },
];
const successSparkData = [
  { value: 1000 }, { value: 1500 }, { value: 1200 }, { value: 2200 },
  { value: 1800 }, { value: 2500 }, { value: 2000 }, { value: 2800 },
];
const customerSparkData = [
  { value: 500 }, { value: 800 }, { value: 650 }, { value: 950 },
  { value: 800 }, { value: 1100 }, { value: 1000 }, { value: 1200 },
];
const refundSparkData = [
  { value: 300 }, { value: 200 }, { value: 400 }, { value: 150 },
  { value: 350 }, { value: 250 }, { value: 500 }, { value: 300 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex bg-[#f7f8fc] min-h-screen">
      <Sidebar currentTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden bg-white">
        <Header activeTab={activeTab} />

        {activeTab === "Customers" ? (
          <CustomersPage />
        ) : activeTab === "Subscriptions" ? (
          <SubscriptionsPage />
        ) : activeTab === "Payments" ? (
          <PaymentsPage />
        ) : activeTab === "Payouts" ? (
          <PayoutsPage />
        ) : activeTab === "Invoices" ? (
          <InvoicesPage />
        ) : activeTab === "Reports" ? (
          <ReportsPage />
        ) : activeTab === "Disputes" ? (
          <DisputesPage />
        ) : activeTab === "Developers" ? (
          <DevelopersPage />
        ) : activeTab === "API Keys" ? (
          <APIKeysPage />
        ) : activeTab === "Settings" ? (
          <SettingsPage />
        ) : activeTab === "Webhooks" ? (
          <WebhooksPage />
        ) : (
          <main className="flex-1 px-6 pb-6 space-y-4 bg-[#f7f8fc]">

          {/* ════ ROW 1 — KPI Cards ════ */}
          <div className="grid grid-cols-4 gap-4">

            {/* Total Volume — light purple bg + purple icon (same style as Customers/Refunds) */}
            <KPICard
              title="Total Volume"
              value="$128,560.34"
              trend="18.2% vs last 7 days"
              trendType="up"
              icon={DollarSign}
              iconBgColor="#f0e9ff"
              iconColor="#6d28d9"
              chartColor="#6d28d9"
              chartData={volumeSparkData}
            />

            {/* Successful Payments — light navy bg + navy icon */}
            <KPICard
              title="Successful Payments"
              value="2,845"
              trend="12.7% vs last 7 days"
              trendType="up"
              icon={CreditCard}
              iconBgColor="#e8edf5"
              iconColor="#1e3a5f"
              chartColor="#1e3a5f"
              chartData={successSparkData}
            />

            {/* Customers — light orange bg + orange icon */}
            <KPICard
              title="Customers"
              value="1,392"
              trend="9.3% vs last 7 days"
              trendType="up"
              icon={Users}
              iconBgColor="#fff7ed"
              iconColor="#f97316"
              chartColor="#f97316"
              chartData={customerSparkData}
            />

            {/* Refunds — light blue bg + blue icon */}
            <KPICard
              title="Refunds"
              value="$2,345.67"
              trend="4.1% vs last 7 days"
              trendType="down"
              icon={ArrowDownLeft}
              iconBgColor="#eff6ff"
              iconColor="#3b82f6"
              chartColor="#3b82f6"
              chartData={refundSparkData}
            />

          </div>

          {/* ════ ROW 2 ════ */}
          <div className="grid grid-cols-12 gap-4 h-[370px]">
            <div className="col-span-6 h-full"><VolumeChart /></div>
            <div className="col-span-3 h-full"><PaymentMethods /></div>
            <div className="col-span-3 h-full"><RecentTransactions /></div>
          </div>

          {/* ════ ROW 3 ════ */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6"><RevenueOverview /></div>
            <div className="col-span-3"><SuccessRate /></div>
            <div className="col-span-3"><QuickActions /></div>
          </div>

          {/* ════ ROW 4 — Docs Banner ════ */}
          <DocsBanner />

        </main>
        )}
      </div>
    </div>
  );
}
