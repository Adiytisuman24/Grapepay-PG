"use client";

import React from "react";

export default function DocsBanner() {
  return (
    <div className="bg-[#e9e3ff] rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Grape Brand Icon */}
        <div className="w-11 h-11 bg-brand rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-brand/10">
          <svg
            className="w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2a1 1 0 0 1 .993.883L13 3v1.077c3.08.384 5.5 2.923 5.5 6.023 0 1.258-.38 2.427-1.033 3.4h1.033a1 1 0 0 1 .993.883L20 15v1a1 1 0 0 1-1 1h-1.077c-.384 3.08-2.923 5.5-6.023 5.5s-5.639-2.42-6.023-5.5H4.8a1 1 0 0 1-.993-.883L3.8 16v-1a1 1 0 0 1 1-1h1.033A6.47 6.47 0 0 1 4.8 10.1c0-3.1 2.42-5.639 5.5-6.023V3a1 1 0 0 1 1-1zm1 4.5v3h3a3.001 3.001 0 0 0-3-3zm-5 3a3.001 3.001 0 0 0 3 3v-3h-3zm2 5v3h3a3.001 3.001 0 0 0-3-3zm-5 3A3.001 3.001 0 0 0 8 19v-3H5zm8-1v3a3.001 3.001 0 0 0 3-3h-3z" />
          </svg>
        </div>

        {/* Text Details */}
        <div>
          <h4 className="text-[15px] font-extrabold text-[#2a135a] leading-tight">
            Start accepting payments with GrapePay
          </h4>
          <p className="text-xs font-semibold text-[#665a8a] mt-0.5">
            Global payments infrastructure for modern businesses.
          </p>
        </div>
      </div>

      {/* Button */}
      <button className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-brand/10 transition-all duration-200 active:scale-[0.98]">
        Explore Docs
        <span className="text-sm font-semibold">→</span>
      </button>
    </div>
  );
}
