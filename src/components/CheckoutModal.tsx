"use client";

import React from "react";
import {
  ShieldCheck, Zap, Headphones, CheckCircle2, ChevronDown, Lock, X, Globe,
  CreditCard, Store, Smartphone, Building, Wallet, Calendar, Clock
} from "lucide-react";

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f5f6fa] backdrop-blur-sm">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-[1040px] flex gap-10">
        
        {/* Left Side - Order Details */}
        <div className="w-[320px] flex flex-col justify-between py-6">
          <div>
            {/* Brand Logo - Grapes */}
            <div className="flex items-center gap-3 mb-14">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stem */}
                <path d="M19 12C20 9 22 7 24 7C24.5 7 25 7.5 25 8C25 10 23 12 21 14" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                {/* Grapes */}
                <circle cx="16" cy="18" r="5" fill="#6225E6"/>
                <circle cx="26" cy="18" r="5" fill="#6225E6"/>
                <circle cx="21" cy="24" r="5" fill="#6225E6"/>
                <circle cx="12" cy="24" r="5" fill="#6225E6"/>
                <circle cx="17" cy="30" r="5" fill="#6225E6"/>
              </svg>
              <span className="font-bold text-[28px] tracking-tight text-[#6225E6]">
                GrapePay
              </span>
            </div>

            {/* Order Summary */}
            <div className="mb-8">
              <p className="text-[14px] font-medium text-[#64748b] mb-1">Order Summary</p>
              <h2 className="text-[36px] font-bold text-[#0f172a] tracking-tight mb-2">₹ 6,000</h2>
              <p className="text-[12px] font-medium text-[#64748b]">Order ID: #GPY-2024-58721</p>
            </div>

            {/* Separator */}
            <div className="w-[200px] h-[1px] bg-[#e2e8f0] mb-8"></div>

            {/* Merchant Box */}
            <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-[#eef0f6] w-fit pr-6">
              <div className="w-12 h-12 bg-[#f8fafc] rounded-xl border border-[#eef0f6] flex items-center justify-center shrink-0">
                 <Store className="w-6 h-6 text-[#6225E6]" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0f172a]">Acme Corp</p>
                <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Premium Plan</p>
                <p className="text-[11px] font-medium text-[#64748b]">Billed Annually</p>
              </div>
            </div>
          </div>

          {/* Badges & Footer */}
          <div className="mt-20">
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ede9fe] text-[#6225E6] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a]">Secure Payments</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Your data is always protected</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ede9fe] text-[#6225E6] flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a]">Instant Processing</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">Quick & seamless payments</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ede9fe] text-[#6225E6] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0f172a]">24/7 Support</p>
                  <p className="text-[11px] font-medium text-[#64748b] mt-0.5">We're here to help you</p>
                </div>
              </div>
            </div>
            <p className="text-[12px] font-medium text-[#94a3b8]">© 2024 GrapePay. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side - Payment Gateway Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-[#eef0f6] p-8 pb-6 flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[13px] font-medium text-[#64748b] mb-1">Pay to</p>
              <div className="flex items-center gap-1.5">
                <h3 className="text-[16px] font-bold text-[#0f172a]">Acme Corp</h3>
                <svg className="w-4 h-4 text-[#3b82f6]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.3 14.7L6.4 12.4l1.4-1.4 2.9 2.9 5.5-5.5 1.4 1.4-6.9 6.9z"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border border-[#e2e8f0] rounded-xl text-[13px] font-semibold text-[#475569] cursor-pointer hover:bg-[#f8fafc]">
               <Globe className="w-4 h-4 text-[#64748b]" />
               English 
               <ChevronDown className="w-4 h-4 text-[#94a3b8] ml-1" />
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#e2e8f0] mb-6"></div>

          <h2 className="text-[18px] font-bold text-[#0f172a] mb-1">Choose a payment method</h2>
          <p className="text-[13px] font-medium text-[#64748b] mb-6">All transactions are secure and encrypted</p>

          {/* Payment Methods */}
          <div className="space-y-3 mb-6">
            
            {/* Card - Selected */}
            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#6225E6] bg-[#fdfcff] cursor-pointer">
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <div className="w-5 h-5 rounded-full border-2 border-[#6225E6] flex items-center justify-center shrink-0">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#6225E6]"></div>
                </div>
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-white border border-[#eef0f6] text-[#6225E6] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0f172a]">Card</p>
                  <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Visa, Mastercard, RuPay & more</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 {/* Visa */}
                 <span className="text-[#1a1f71] text-[16px] font-extrabold italic font-serif">VISA</span>
                 {/* Mastercard */}
                 <div className="flex relative w-8 h-5 items-center">
                    <div className="absolute left-0 w-5 h-5 rounded-full bg-[#eb001b] opacity-90 mix-blend-multiply"></div>
                    <div className="absolute left-3 w-5 h-5 rounded-full bg-[#f79e1b] opacity-90 mix-blend-multiply"></div>
                 </div>
                 {/* RuPay */}
                 <span className="text-[#1a1f71] text-[12px] font-extrabold italic">RuPay</span>
                 {/* Diners */}
                 <div className="w-6 h-6 rounded-full border border-blue-900 flex items-center justify-center">
                    <span className="text-blue-900 font-bold text-[10px]">D</span>
                 </div>
                 <span className="text-[12px] font-bold text-[#64748b] ml-1">+2</span>
              </div>
            </div>

            {/* UPI / QR */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:border-[#cbd5e1] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-[#cbd5e1] shrink-0"></div>
                <div className="w-10 h-10 rounded-xl bg-[#f8fafc] text-[#6225E6] border border-[#e2e8f0] flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0f172a]">UPI / QR</p>
                  <p className="text-[12px] font-medium text-[#64748b] mt-0.5">Google Pay, PhonePe, Paytm & more</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 {/* GPay */}
                 <div className="flex gap-[2px] items-center">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#4285F4]"></div>
                    <div className="w-[8px] h-[8px] rounded-full bg-[#34A853]"></div>
                    <div className="w-[8px] h-[8px] rounded-full bg-[#FBBC05]"></div>
                    <div className="w-[8px] h-[8px] rounded-full bg-[#EA4335]"></div>
                 </div>
                 {/* PhonePe */}
                 <div className="w-6 h-6 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-[10px] pb-0.5">
                   पे
                 </div>
                 {/* Paytm */}
                 <span className="text-[#002970] font-bold text-[12px]">Paytm</span>
                 <span className="text-[12px] font-bold text-[#64748b] ml-1">+2</span>
              </div>
            </div>

            {/* Netbanking */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:border-[#cbd5e1] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-[#cbd5e1] shrink-0"></div>
                <div className="w-10 h-10 rounded-xl bg-[#f8fafc] text-[#6225E6] border border-[#e2e8f0] flex items-center justify-center shrink-0">
                   <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0f172a]">Netbanking</p>
                  <p className="text-[12px] font-medium text-[#64748b] mt-0.5">All Indian banks</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
            </div>

            {/* Wallet */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:border-[#cbd5e1] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-[#cbd5e1] shrink-0"></div>
                <div className="w-10 h-10 rounded-xl bg-[#f8fafc] text-[#6225E6] border border-[#e2e8f0] flex items-center justify-center shrink-0">
                   <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0f172a]">Wallet</p>
                  <p className="text-[12px] font-medium text-[#64748b] mt-0.5">GPay, PhonePe, Paytm & more</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
            </div>

            {/* EMI */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:border-[#cbd5e1] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-[#cbd5e1] shrink-0"></div>
                <div className="w-10 h-10 rounded-xl bg-[#f8fafc] text-[#6225E6] border border-[#e2e8f0] flex items-center justify-center shrink-0">
                   <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0f172a]">EMI</p>
                  <p className="text-[12px] font-medium text-[#64748b] mt-0.5">EMI via Debit/Credit cards, axio & more</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
            </div>

            {/* Pay Later */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-[#e2e8f0] bg-white cursor-pointer hover:border-[#cbd5e1] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-[#cbd5e1] shrink-0"></div>
                <div className="w-10 h-10 rounded-xl bg-[#f8fafc] text-[#6225E6] border border-[#e2e8f0] flex items-center justify-center shrink-0">
                   <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0f172a]">Pay Later</p>
                  <p className="text-[12px] font-medium text-[#64748b] mt-0.5">LazyPay, Simpl & more</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Secured by GrapePay */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
             <Lock className="w-3 h-3 text-[#94a3b8]" />
             <span className="text-[12px] font-medium text-[#64748b]">Secured by <span className="font-bold text-[#6225E6]">GrapePay</span></span>
          </div>

          {/* Action Button */}
          <div className="bg-[#581cda] text-white flex rounded-2xl cursor-pointer hover:bg-[#4312ab] transition-colors shadow-lg overflow-hidden shrink-0">
             <div className="w-1/2 flex flex-col justify-center border-r border-white/20 pl-6 py-4">
                <span className="text-[20px] font-bold tracking-tight leading-none mb-1">₹ 6,000</span>
                <span className="text-[11px] font-medium text-white/80 border-b border-dashed border-white/50 w-fit cursor-pointer leading-tight">View Details</span>
             </div>
             <div className="w-1/2 flex items-center justify-center gap-2 py-4">
                <Lock className="w-5 h-5 text-white/90" />
                <span className="text-[18px] font-bold">Pay Now</span>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
