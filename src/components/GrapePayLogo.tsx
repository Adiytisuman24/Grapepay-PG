"use client";

import React from "react";

interface GrapePayLogoProps {
  height?: number;
  showText?: boolean;
}

export default function GrapePayLogo({ height = 36, showText = true }: GrapePayLogoProps) {
  return (
    <svg
      height={height}
      viewBox="0 0 220 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        {/* Top-left grape circle gradient */}
        <radialGradient id="grape1" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#9B3FD4" />
          <stop offset="100%" stopColor="#4A1A8A" />
        </radialGradient>
        {/* Top-right grape circle gradient */}
        <radialGradient id="grape2" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#CC4FE8" />
          <stop offset="100%" stopColor="#8B25C8" />
        </radialGradient>
        {/* Bottom grape circle gradient */}
        <radialGradient id="grape3" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#A83EDF" />
          <stop offset="100%" stopColor="#5C1BA0" />
        </radialGradient>
        {/* Text gradient */}
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B1A82" />
          <stop offset="50%" stopColor="#6225E6" />
          <stop offset="100%" stopColor="#9B3FE8" />
        </linearGradient>
      </defs>

      {/* ── Leaf ── */}
      <ellipse
        cx="20" cy="8"
        rx="5" ry="8"
        transform="rotate(-30 20 8)"
        fill="#8B25C8"
      />
      <ellipse
        cx="26" cy="7"
        rx="4" ry="7"
        transform="rotate(20 26 7)"
        fill="#6225E6"
      />

      {/* ── Top-left grape circle ── */}
      <circle cx="19" cy="22" r="12" fill="url(#grape1)" />

      {/* ── Top-right grape circle ── */}
      <circle cx="33" cy="22" r="12" fill="url(#grape2)" />

      {/* ── Bottom center grape circle ── */}
      <circle cx="26" cy="36" r="12" fill="url(#grape3)" />

      {/* ── Logo text ── */}
      {showText && (
        <text
          x="54"
          y="40"
          fontFamily="'Inter', 'Segoe UI', sans-serif"
          fontWeight="800"
          fontSize="28"
          fill="url(#textGrad)"
          letterSpacing="-0.5"
        >
          GrapePay
        </text>
      )}
    </svg>
  );
}
