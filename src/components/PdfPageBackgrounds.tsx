import React from 'react';
import { PdfThemeId } from '../types';
import { getPdfTheme } from '../data/pdfThemes';

// Reusable SVG elements matching luxury mystical Tarot & Divination design

export const TarotCoverEmblemSvg: React.FC<{ className?: string }> = ({
  className = 'w-full h-full text-[#2C241E]',
}) => (
  <svg
    viewBox="0 0 520 420"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      {/* Subtle radial glow */}
      <radialGradient id="tarotGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F5EFEB" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FAF7EE" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background glow field */}
    <ellipse cx="260" cy="210" rx="220" ry="170" fill="url(#tarotGlow)" stroke="none" />

    {/* Outer Grand Arched Portal Frame */}
    <path
      d="M 60,390 L 60,190 C 60,80 150,30 260,30 C 370,30 460,80 460,190 L 460,390"
      strokeWidth="1.6"
      opacity="0.85"
    />
    <path
      d="M 72,390 L 72,195 C 72,95 155,44 260,44 C 365,44 448,95 448,195 L 448,390"
      strokeWidth="0.8"
      strokeDasharray="2 3"
      opacity="0.6"
    />
    <path
      d="M 80,390 L 80,200 C 80,105 160,54 260,54 C 360,54 440,105 440,200 L 440,390"
      strokeWidth="1.1"
      opacity="0.75"
    />

    {/* Base Pedestal Line with Diamond Accents */}
    <line x1="40" y1="390" x2="480" y2="390" strokeWidth="1.5" opacity="0.85" />
    <line x1="50" y1="396" x2="470" y2="396" strokeWidth="0.75" opacity="0.5" />
    <polygon points="260,384 266,390 260,396 254,390" fill="currentColor" opacity="0.8" />
    <polygon points="60,386 64,390 60,394 56,390" fill="currentColor" opacity="0.7" />
    <polygon points="460,386 464,390 460,394 456,390" fill="currentColor" opacity="0.7" />

    {/* Moon Phases along the Top Arch */}
    {/* Center Full Moon at Apex */}
    <g transform="translate(260, 24)" opacity="0.95">
      <circle cx="0" cy="0" r="10" strokeWidth="1.2" fill="#FAF7EE" />
      <circle cx="0" cy="0" r="6" strokeWidth="0.7" strokeDasharray="1.5 1.5" />
      <circle cx="0" cy="0" r="2" fill="currentColor" />
    </g>
    {/* Waxing Gibbous */}
    <g transform="translate(200, 36)" opacity="0.85">
      <circle cx="0" cy="0" r="7" strokeWidth="1" />
      <path d="M 0,-7 A 4 7 0 0 1 0,7 A 7 7 0 0 1 0,-7" fill="currentColor" opacity="0.35" />
    </g>
    {/* First Quarter */}
    <g transform="translate(145, 62)" opacity="0.8">
      <circle cx="0" cy="0" r="6.5" strokeWidth="1" />
      <path d="M 0,-6.5 A 6.5 6.5 0 0 1 0,6.5 Z" fill="currentColor" opacity="0.4" />
    </g>
    {/* Waxing Crescent */}
    <g transform="translate(100, 108)" opacity="0.8">
      <circle cx="0" cy="0" r="6" strokeWidth="0.9" />
      <path d="M 0,-6 A 6 6 0 0 1 0,6 A 3.5 6 0 0 0 0,-6" fill="currentColor" />
    </g>
    {/* Waning Gibbous */}
    <g transform="translate(320, 36)" opacity="0.85">
      <circle cx="0" cy="0" r="7" strokeWidth="1" />
      <path d="M 0,-7 A 4 7 0 0 0 0,7 A 7 7 0 0 0 0,-7" fill="currentColor" opacity="0.35" />
    </g>
    {/* Last Quarter */}
    <g transform="translate(375, 62)" opacity="0.8">
      <circle cx="0" cy="0" r="6.5" strokeWidth="1" />
      <path d="M 0,-6.5 A 6.5 6.5 0 0 0 0,6.5 Z" fill="currentColor" opacity="0.4" />
    </g>
    {/* Waning Crescent */}
    <g transform="translate(420, 108)" opacity="0.8">
      <circle cx="0" cy="0" r="6" strokeWidth="0.9" />
      <path d="M 0,-6 A 6 6 0 0 0 0,6 A 3.5 6 0 0 1 0,-6" fill="currentColor" />
    </g>

    {/* Radiant Celestial Sunburst Rays behind Cards */}
    <g transform="translate(260, 205)" opacity="0.45">
      {Array.from({ length: 28 }).map((_, i) => {
        const angle = (i * 360) / 28;
        const rad = (angle * Math.PI) / 180;
        const isLong = i % 2 === 0;
        const r1 = 65;
        const r2 = isLong ? 155 : 125;
        return (
          <line
            key={`sunray-${i}`}
            x1={r1 * Math.cos(rad)}
            y1={r1 * Math.sin(rad)}
            x2={r2 * Math.cos(rad)}
            y2={r2 * Math.sin(rad)}
            strokeWidth={isLong ? '0.9' : '0.5'}
          />
        );
      })}
      {/* Concentric subtle celestial circles */}
      <circle cx="0" cy="0" r="145" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.5" />
      <circle cx="0" cy="0" r="120" strokeWidth="0.5" opacity="0.4" />
      <circle cx="0" cy="0" r="95" strokeWidth="0.7" strokeDasharray="3 3" opacity="0.6" />
    </g>

    {/* ========================================================= */}
    {/* THREE SACRED TAROT CARDS SPREAD                           */}
    {/* ========================================================= */}

    {/* LEFT CARD (Card of the Past / Intuition - Tilted -13 deg) */}
    <g transform="translate(180, 240) rotate(-13)">
      {/* Card Body & Border */}
      <rect
        x="-42"
        y="-75"
        width="84"
        height="150"
        rx="5"
        fill="#FAF7EE"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="-37"
        y="-70"
        width="74"
        height="140"
        rx="3"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 2"
        opacity="0.7"
      />
      <rect
        x="-33"
        y="-66"
        width="66"
        height="132"
        rx="2"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* Card Header & Footer Corner Symbols */}
      <text x="-27" y="-52" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor" opacity="0.85">I</text>
      <text x="22" y="-52" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor" opacity="0.85">✦</text>
      <text x="-27" y="58" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor" opacity="0.85">✦</text>
      <text x="20" y="58" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor" opacity="0.85">I</text>

      {/* Inner Card Art: Celestial Crescent & Chalice of Water */}
      <circle cx="0" cy="-15" r="16" strokeWidth="0.8" opacity="0.6" />
      <path
        d="M 6,-25 C -4,-22 -8,-10 0,-3 C 8,4 8,8 2,12 C 10,8 14,-6 6,-25 Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Stars on Card */}
      <polygon points="0,-15 2,-10 7,-10 3,-7 5,-2 0,-5 -5,-2 -3,-7 -7,-10 -2,-10" fill="currentColor" opacity="0.8" />
      {/* Chalice */}
      <path d="M -10,18 Q 0,30 10,18 L 12,8 L -12,8 Z" strokeWidth="0.9" fill="#FAF7EE" />
      <line x1="0" y1="26" x2="0" y2="34" strokeWidth="1" />
      <line x1="-8" y1="34" x2="8" y2="34" strokeWidth="1" />
      {/* Drops of Grace */}
      <circle cx="0" cy="4" r="1.2" fill="currentColor" />
      <circle cx="-5" cy="0" r="1" fill="currentColor" />
      <circle cx="5" cy="0" r="1" fill="currentColor" />
    </g>

    {/* RIGHT CARD (Card of the Future / Manifestation - Tilted +13 deg) */}
    <g transform="translate(340, 240) rotate(13)">
      {/* Card Body & Border */}
      <rect
        x="-42"
        y="-75"
        width="84"
        height="150"
        rx="5"
        fill="#FAF7EE"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="-37"
        y="-70"
        width="74"
        height="140"
        rx="3"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 2"
        opacity="0.7"
      />
      <rect
        x="-33"
        y="-66"
        width="66"
        height="132"
        rx="2"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* Card Header & Footer Corner Symbols */}
      <text x="-27" y="-52" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor" opacity="0.85">III</text>
      <text x="20" y="-52" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor" opacity="0.85">✦</text>
      <text x="-27" y="58" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor" opacity="0.85">✦</text>
      <text x="18" y="58" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor" opacity="0.85">III</text>

      {/* Inner Card Art: Radiant Star & Pentacle of Earth */}
      <circle cx="0" cy="-12" r="18" strokeWidth="0.8" strokeDasharray="1.5 2" opacity="0.7" />
      {/* 8-point Radiant Star */}
      <g transform="translate(0, -12)">
        <polygon points="0,-14 3,-4 13,-4 5,2 8,12 0,6 -8,12 -5,2 -13,-4 -3,-4" strokeWidth="0.8" fill="#FAF7EE" />
        <circle cx="0" cy="0" r="2.5" fill="currentColor" />
      </g>
      {/* Sacred Pentacle */}
      <circle cx="0" cy="22" r="11" strokeWidth="0.9" fill="#FAF7EE" />
      <polygon points="0,13 6.5,31 -10.5,20 10.5,20 -6.5,31" strokeWidth="0.7" fill="none" />
      <circle cx="0" cy="22" r="2" fill="currentColor" />
    </g>

    {/* CENTER CARD (The High Oracle / The All-Seeing Presence - Center Stage) */}
    <g transform="translate(260, 225)">
      {/* Card Shadow/Glow */}
      <rect
        x="-50"
        y="-88"
        width="100"
        height="176"
        rx="6"
        fill="#FAF7EE"
        stroke="currentColor"
        strokeWidth="1.8"
        className="drop-shadow-md"
      />
      {/* Double hairline inner borders */}
      <rect
        x="-44"
        y="-82"
        width="88"
        height="164"
        rx="4"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeDasharray="2.5 2.5"
        opacity="0.8"
      />
      <rect
        x="-40"
        y="-78"
        width="80"
        height="156"
        rx="3"
        stroke="currentColor"
        strokeWidth="0.9"
      />

      {/* Card Roman Numeral & Title */}
      <text
        x="0"
        y="-63"
        textAnchor="middle"
        fontSize="8"
        fontFamily="Cinzel, serif"
        fontWeight="bold"
        letterSpacing="0.15em"
        fill="currentColor"
      >
        THE ORACLE
      </text>
      <line x1="-28" y1="-58" x2="28" y2="-58" strokeWidth="0.6" opacity="0.7" />

      {/* Central Mystical All-Seeing Eye of Divine Intuition */}
      <g transform="translate(0, -16)">
        {/* Radiant Eye Halo Rays */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={`eye-ray-${i}`}
              x1={16 * Math.cos(rad)}
              y1={16 * Math.sin(rad)}
              x2={24 * Math.cos(rad)}
              y2={24 * Math.sin(rad)}
              strokeWidth="0.6"
              opacity="0.7"
            />
          );
        })}
        {/* Sacred Triangle of Providence */}
        <polygon points="0,-25 24,14 -24,14" strokeWidth="1" fill="#FAF7EE" />
        <polygon points="0,-20 19,11 -19,11" strokeWidth="0.5" strokeDasharray="1.5 1.5" opacity="0.6" />

        {/* The Eye Shape */}
        <path d="M -14,1 Q 0,-11 14,1 Q 0,13 -14,1 Z" strokeWidth="1.1" fill="#FAF7EE" />
        {/* Iris & Pupil */}
        <circle cx="0" cy="1" r="5.5" strokeWidth="0.9" />
        <circle cx="0" cy="1" r="2.5" fill="currentColor" />
        <circle cx="-1" cy="0" r="0.8" fill="#FAF7EE" />
        {/* Upper/Lower Eyelash Accents */}
        <path d="M -16,-2 Q 0,-14 16,-2" strokeWidth="0.6" opacity="0.7" />
      </g>

      {/* Sword of Truth & Sacred Key motif crossing below eye */}
      <g transform="translate(0, 32)">
        {/* Sword of Truth */}
        <line x1="0" y1="-14" x2="0" y2="28" strokeWidth="1.2" />
        <line x1="-9" y1="-4" x2="9" y2="-4" strokeWidth="1" />
        <circle cx="0" cy="28" r="2.5" strokeWidth="0.8" fill="#FAF7EE" />
        <polygon points="0,-18 3,-13 -3,-13" fill="currentColor" />

        {/* Sacred Key Crossing or Halo */}
        <path
          d="M -18,12 C -24,6 -18,-2 -10,0 C -5,2 -8,8 -12,12 Z"
          strokeWidth="0.7"
          opacity="0.6"
          fill="none"
        />
        <path
          d="M 18,12 C 24,6 18,-2 10,0 C 5,2 8,8 12,12 Z"
          strokeWidth="0.7"
          opacity="0.6"
          fill="none"
        />
      </g>

      {/* Bottom Subtitle / Number */}
      <line x1="-28" y1="64" x2="28" y2="64" strokeWidth="0.6" opacity="0.7" />
      <text
        x="0"
        y="72"
        textAnchor="middle"
        fontSize="7"
        fontFamily="Cinzel, serif"
        letterSpacing="0.2em"
        fill="currentColor"
        opacity="0.85"
      >
        MAJOR ARCANA
      </text>
    </g>

    {/* ========================================================= */}
    {/* SACRED TAROT SUIT MEDALLIONS (WAND, CUP, SWORD, PENTACLE) */}
    {/* ========================================================= */}
    {/* WAND (Fire / Will) - Top Left */}
    <g transform="translate(100, 200)" opacity="0.85">
      <circle cx="0" cy="0" r="14" strokeWidth="0.9" fill="#FAF7EE" />
      <circle cx="0" cy="0" r="12" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
      <line x1="-5" y1="6" x2="5" y2="-6" strokeWidth="1.2" />
      <path d="M 4,-8 C 7,-6 7,-3 5,-1 C 3,1 0,1 2,-3 Z" fill="currentColor" />
      <text x="0" y="21" textAnchor="middle" fontSize="6" fontFamily="sans-serif" letterSpacing="0.1em" fill="currentColor">FIRE</text>
    </g>

    {/* CUP (Water / Emotion) - Bottom Left */}
    <g transform="translate(100, 310)" opacity="0.85">
      <circle cx="0" cy="0" r="14" strokeWidth="0.9" fill="#FAF7EE" />
      <circle cx="0" cy="0" r="12" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
      <path d="M -5,-3 Q 0,4 5,-3 L 6,-7 L -6,-7 Z" strokeWidth="0.8" fill="none" />
      <line x1="0" y1="2" x2="0" y2="6" strokeWidth="0.8" />
      <line x1="-4" y1="6" x2="4" y2="6" strokeWidth="0.8" />
      <text x="0" y="21" textAnchor="middle" fontSize="6" fontFamily="sans-serif" letterSpacing="0.1em" fill="currentColor">WATER</text>
    </g>

    {/* SWORD (Air / Intellect) - Top Right */}
    <g transform="translate(420, 200)" opacity="0.85">
      <circle cx="0" cy="0" r="14" strokeWidth="0.9" fill="#FAF7EE" />
      <circle cx="0" cy="0" r="12" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
      <line x1="0" y1="-7" x2="0" y2="6" strokeWidth="1" />
      <line x1="-4" y1="-2" x2="4" y2="-2" strokeWidth="0.9" />
      <circle cx="0" cy="6" r="1.2" fill="currentColor" />
      <polygon points="0,-9 1.8,-6 -1.8,-6" fill="currentColor" />
      <text x="0" y="21" textAnchor="middle" fontSize="6" fontFamily="sans-serif" letterSpacing="0.1em" fill="currentColor">AIR</text>
    </g>

    {/* PENTACLE (Earth / Matter) - Bottom Right */}
    <g transform="translate(420, 310)" opacity="0.85">
      <circle cx="0" cy="0" r="14" strokeWidth="0.9" fill="#FAF7EE" />
      <circle cx="0" cy="0" r="12" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
      <polygon points="0,-6 4,6 -6,-1 6,-1 -4,6" strokeWidth="0.7" fill="none" />
      <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      <text x="0" y="21" textAnchor="middle" fontSize="6" fontFamily="sans-serif" letterSpacing="0.1em" fill="currentColor">EARTH</text>
    </g>

    {/* Mystical Palms of Destiny framing the base */}
    <g transform="translate(260, 355)" opacity="0.75">
      {/* Left Palm / Crescent motif */}
      <path
        d="M -60,20 C -45,5 -30,12 -15,18 C -22,12 -35,2 -50,12 Z"
        strokeWidth="0.9"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Right Palm / Crescent motif */}
      <path
        d="M 60,20 C 45,5 30,12 15,18 C 22,12 35,2 50,12 Z"
        strokeWidth="0.9"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Central 8-point compass star */}
      <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="currentColor" />
      <line x1="-30" y1="0" x2="-10" y2="0" strokeWidth="0.7" />
      <line x1="10" y1="0" x2="30" y2="0" strokeWidth="0.7" />
      <circle cx="-32" cy="0" r="1.2" fill="currentColor" />
      <circle cx="32" cy="0" r="1.2" fill="currentColor" />
    </g>

    {/* Corner Astrological Constellation Stars */}
    <g transform="translate(80, 55)" opacity="0.75">
      <path d="M 0,-8 L 0,8 M -8,0 L 8,0" strokeWidth="0.7" />
      <circle cx="0" cy="0" r="1.5" fill="currentColor" />
    </g>
    <g transform="translate(440, 55)" opacity="0.75">
      <path d="M 0,-8 L 0,8 M -8,0 L 8,0" strokeWidth="0.7" />
      <circle cx="0" cy="0" r="1.5" fill="currentColor" />
    </g>
    <g transform="translate(40, 260)" opacity="0.6">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      <path d="M 0,-4 L 0,4 M -4,0 L 4,0" strokeWidth="0.5" />
    </g>
    <g transform="translate(480, 260)" opacity="0.6">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      <path d="M 0,-4 L 0,4 M -4,0 L 4,0" strokeWidth="0.5" />
    </g>
  </svg>
);

export const TarotWelcomeEmblemSvg: React.FC<{ className?: string }> = ({
  className = 'w-full h-full text-[#4A3F35]',
}) => (
  <svg
    viewBox="0 0 240 60"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left decorative line with star and diamond */}
    <line x1="10" y1="30" x2="80" y2="30" strokeWidth="0.8" opacity="0.6" />
    <circle cx="10" cy="30" r="1.5" fill="currentColor" opacity="0.7" />
    <polygon points="45,26 49,30 45,34 41,30" fill="currentColor" opacity="0.6" />

    {/* Right decorative line with star and diamond */}
    <line x1="160" y1="30" x2="230" y2="30" strokeWidth="0.8" opacity="0.6" />
    <circle cx="230" cy="30" r="1.5" fill="currentColor" opacity="0.7" />
    <polygon points="195,26 199,30 195,34 191,30" fill="currentColor" opacity="0.6" />

    {/* Left Crescent Moon */}
    <g transform="translate(90, 30)" opacity="0.85">
      <path d="M 6,-10 C -2,-7 -2,7 6,10 C 1,7 1,-7 6,-10 Z" fill="currentColor" />
    </g>

    {/* Right Crescent Moon */}
    <g transform="translate(150, 30)" opacity="0.85">
      <path d="M -6,-10 C 2,-7 2,7 -6,10 C -1,7 -1,-7 -6,-10 Z" fill="currentColor" />
    </g>

    {/* Central Intuitive Third Eye & Sunburst */}
    <g transform="translate(120, 30)">
      {/* Radiant fine sunburst rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={`w-ray-${i}`}
            x1={13 * Math.cos(rad)}
            y1={13 * Math.sin(rad)}
            x2={18 * Math.cos(rad)}
            y2={18 * Math.sin(rad)}
            strokeWidth="0.6"
            opacity="0.65"
          />
        );
      })}
      {/* Eye Shape */}
      <path d="M -11,0 Q 0,-8 11,0 Q 0,8 -11,0 Z" strokeWidth="1.1" fill="#FAF7EE" />
      <circle cx="0" cy="0" r="4" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="2" fill="currentColor" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#FAF7EE" />
    </g>
  </svg>
);

export const AstrologicalWheelSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full text-[#4A3F35]' }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none" stroke="currentColor">
    {/* Outer star and constellation ring */}
    <circle cx="250" cy="250" r="235" strokeWidth="0.8" strokeDasharray="1 3" opacity="0.4" />
    <circle cx="250" cy="250" r="225" strokeWidth="1.2" opacity="0.6" />
    <circle cx="250" cy="250" r="200" strokeWidth="0.8" opacity="0.5" />
    <circle cx="250" cy="250" r="170" strokeWidth="1" opacity="0.7" />
    <circle cx="250" cy="250" r="120" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
    <circle cx="250" cy="250" r="60" strokeWidth="1" opacity="0.7" />
    <circle cx="250" cy="250" r="10" strokeWidth="1.5" opacity="0.8" />

    {/* Radiating 12 Zodiac lines */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 250 + 60 * Math.cos(angle);
      const y1 = 250 + 60 * Math.sin(angle);
      const x2 = 250 + 225 * Math.cos(angle);
      const y2 = 250 + 225 * Math.sin(angle);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.75" opacity="0.6" />;
    })}

    {/* 24 subdivision spokes in outer rim */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const x1 = 250 + 200 * Math.cos(angle);
      const y1 = 250 + 200 * Math.sin(angle);
      const x2 = 250 + 225 * Math.cos(angle);
      const y2 = 250 + 225 * Math.sin(angle);
      return <line key={`sub-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" opacity="0.4" />;
    })}

    {/* Center sunburst rays */}
    {Array.from({ length: 36 }).map((_, i) => {
      const angle = (i * 10 * Math.PI) / 180;
      const x1 = 250 + 10 * Math.cos(angle);
      const y1 = 250 + 10 * Math.sin(angle);
      const x2 = 250 + 60 * Math.cos(angle);
      const y2 = 250 + 60 * Math.sin(angle);
      return <line key={`sun-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.4" opacity="0.5" />;
    })}

    {/* Astrological constellation stars and dots */}
    {[
      { x: 120, y: 130 }, { x: 380, y: 140 }, { x: 410, y: 340 }, { x: 90, y: 350 },
      { x: 250, y: 40 }, { x: 250, y: 460 }, { x: 40, y: 250 }, { x: 460, y: 250 }
    ].map((pt, idx) => (
      <g key={`star-${idx}`} opacity="0.7">
        <circle cx={pt.x} cy={pt.y} r="2" fill="currentColor" />
        <path d={`M ${pt.x - 5},${pt.y} L ${pt.x + 5},${pt.y} M ${pt.x},${pt.y - 5} L ${pt.x},${pt.y + 5}`} strokeWidth="0.5" />
      </g>
    ))}
  </svg>
);

export const BotanicalFlowerSvg: React.FC<{ className?: string }> = ({ className = 'w-16 h-16 text-[#6B5E51]' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="50" cy="50" r="8" fill="#FAF7F2" strokeWidth="1.2" />
    <circle cx="50" cy="50" r="4" strokeWidth="0.8" opacity="0.6" />
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = i * 22.5;
      return (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path d="M 50,42 C 46,26 47,14 50,12 C 53,14 54,26 50,42 Z" fill="#FAF7F2" />
        </g>
      );
    })}
  </svg>
);
export const DaisyFlowerSvg = BotanicalFlowerSvg;

export const BotanicalStemSvg: React.FC<{ className?: string }> = ({ className = 'w-24 h-44 text-[#6B5E51]' }) => (
  <svg viewBox="0 0 100 160" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
    <g transform="translate(0, -10)">
      <circle cx="50" cy="50" r="8" fill="#FAF7F2" />
      <circle cx="50" cy="50" r="4" strokeWidth="0.8" opacity="0.6" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = i * 22.5;
        return (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
            <path d="M 50,42 C 46,26 47,14 50,12 C 53,14 54,26 50,42 Z" fill="#FAF7F2" />
          </g>
        );
      })}
    </g>
    <path d="M 50,78 Q 49,110 50,155" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M 49,105 Q 32,100 36,88 C 42,92 46,98 49,105 Z" fill="#FAF7F2" />
    <path d="M 50,118 Q 68,112 64,100 C 58,104 54,110 50,118 Z" fill="#FAF7F2" />
    <path d="M 20,40 L 20,48 M 16,44 L 24,44" strokeWidth="0.8" opacity="0.6" />
    <path d="M 80,70 L 80,78 M 76,74 L 84,74" strokeWidth="0.8" opacity="0.6" />
  </svg>
);
export const DaisyStemSvg = BotanicalStemSvg;

export const TripleArchOverCardsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full text-[#6B5E51]' }) => (
  <svg viewBox="0 0 700 900" className={className} fill="none" stroke="currentColor">
    {/* Top crescent moon */}
    <g transform="translate(480, 50)" opacity="0.75">
      <path d="M 30,0 C 12,12 12,38 30,50 C 8,42 8,8 30,0 Z" strokeWidth="1.4" />
    </g>

    {/* Top left diamond */}
    <g transform="translate(40, 40)" opacity="0.75">
      <polygon points="30,0 60,30 30,60 0,30" strokeWidth="1.2" />
      <line x1="30" y1="0" x2="30" y2="60" strokeWidth="0.8" />
      <line x1="0" y1="30" x2="60" y2="30" strokeWidth="0.8" />
    </g>

    {/* Top right arch */}
    <g transform="translate(580, 180)" opacity="0.75">
      <path d="M 10,80 L 10,40 C 10,15 50,15 50,40 L 50,80" strokeWidth="1.4" />
      <path d="M 20,80 L 20,42 C 20,25 40,25 40,42 L 40,80" strokeWidth="1" />
    </g>

    {/* Big Arch framing the middle */}
    <g transform="translate(180, 220)" opacity="0.85">
      {/* Tall central arch */}
      <path d="M 100,160 L 100,50 C 100,10 240,10 240,50 L 240,160" strokeWidth="1.4" />
      <path d="M 115,160 L 115,55 C 115,22 225,22 225,55 L 225,160" strokeWidth="1" />
      
      {/* Broad spanning arch over 3 cards */}
      <path d="M 0,220 C 50,120 290,120 340,220" strokeWidth="1.6" />
      <path d="M 10,225 C 55,135 285,135 330,225" strokeWidth="1" />
    </g>

    {/* Right Eye */}
    <g transform="translate(530, 290)" opacity="0.8">
      <path d="M 0,20 Q 25,0 50,20 Q 25,40 0,20 Z" strokeWidth="1.4" />
      <circle cx="25" cy="20" r="7" strokeWidth="1.2" />
      <circle cx="25" cy="20" r="3" fill="currentColor" />
      {/* Eye rays */}
      <line x1="25" y1="2" x2="25" y2="-6" strokeWidth="1" />
      <line x1="12" y1="6" x2="6" y2="0" strokeWidth="1" />
      <line x1="38" y1="6" x2="44" y2="0" strokeWidth="1" />
    </g>

    {/* Left Arch & Eye */}
    <g transform="translate(45, 290)" opacity="0.8">
      <path d="M 10,90 L 10,40 C 10,12 50,12 50,40 L 50,90" strokeWidth="1.4" />
      <path d="M 20,90 L 20,44 C 20,24 40,24 40,44 L 40,90" strokeWidth="1" />
    </g>

    <g transform="translate(80, 630)" opacity="0.8">
      <path d="M 0,20 Q 25,0 50,20 Q 25,40 0,20 Z" strokeWidth="1.4" />
      <circle cx="25" cy="20" r="6" strokeWidth="1.2" />
      <circle cx="25" cy="20" r="2.5" fill="currentColor" />
    </g>

    {/* Bottom left arch & diamond */}
    <g transform="translate(50, 770)" opacity="0.8">
      <path d="M 10,90 L 10,40 C 10,10 60,10 60,40 L 60,90" strokeWidth="1.4" />
      <path d="M 20,90 L 20,45 C 20,22 50,22 50,45 L 50,90" strokeWidth="1" />
      <path d="M 30,90 L 30,50 C 30,34 40,34 40,50 L 40,90" strokeWidth="0.8" />
    </g>

    <g transform="translate(80, 700)" opacity="0.75">
      <polygon points="25,0 50,25 25,50 0,25" strokeWidth="1.2" />
      <line x1="25" y1="0" x2="25" y2="50" strokeWidth="0.8" />
    </g>

    {/* Bottom right arch & line slats */}
    <g transform="translate(560, 750)" opacity="0.8">
      <path d="M 10,90 L 10,40 C 10,10 60,10 60,40 L 60,90" strokeWidth="1.4" />
      <path d="M 20,90 L 20,45 C 20,22 50,22 50,45 L 50,90" strokeWidth="1" />
      <path d="M 30,90 L 30,50 C 30,34 40,34 40,50 L 40,90" strokeWidth="0.8" />
    </g>

    <g transform="translate(410, 810)" opacity="0.7">
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 8} x2="60" y2={i * 8} strokeWidth="1.5" />
      ))}
    </g>
  </svg>
);

export const ColumnSideMotifsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full text-[#6B5E51]' }) => (
  <svg viewBox="0 0 250 850" className={className} fill="none" stroke="currentColor">
    {/* Top Arch */}
    <g transform="translate(45, 30)" opacity="0.85">
      <path d="M 10,90 L 10,40 C 10,10 60,10 60,40 L 60,90" strokeWidth="1.4" />
      <path d="M 20,90 L 20,45 C 20,22 50,22 50,45 L 50,90" strokeWidth="1" />
      <path d="M 30,90 L 30,50 C 30,34 40,34 40,50 L 40,90" strokeWidth="0.8" />
    </g>

    {/* Top Crescent Moon */}
    <g transform="translate(90, 150)" opacity="0.85">
      <path d="M 30,0 C 12,12 12,38 30,50 C 8,42 8,8 30,0 Z" strokeWidth="1.4" />
    </g>

    {/* Celestial Eye */}
    <g transform="translate(75, 230)" opacity="0.85">
      <path d="M 0,20 Q 25,0 50,20 Q 25,40 0,20 Z" strokeWidth="1.4" />
      <circle cx="25" cy="20" r="7" strokeWidth="1.2" />
      <circle cx="25" cy="20" r="3" fill="currentColor" />
      {/* Eye rays */}
      <line x1="25" y1="2" x2="25" y2="-5" strokeWidth="1" />
      <line x1="12" y1="6" x2="6" y2="0" strokeWidth="1" />
      <line x1="38" y1="6" x2="44" y2="0" strokeWidth="1" />
    </g>

    {/* Star Sparkle */}
    <g transform="translate(110, 680)" opacity="0.8">
      <path d="M 10,0 L 10,20 M 0,10 L 20,10" strokeWidth="1.2" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </g>

    {/* Bottom Diamond */}
    <g transform="translate(75, 700)" opacity="0.85">
      <polygon points="35,0 70,30 35,60 0,30" strokeWidth="1.4" />
      <line x1="35" y1="0" x2="35" y2="60" strokeWidth="0.8" />
      <line x1="0" y1="30" x2="70" y2="30" strokeWidth="0.8" />
    </g>

    {/* Bottom Arch */}
    <g transform="translate(45, 780)" opacity="0.85">
      <path d="M 10,90 L 10,40 C 10,10 60,10 60,40 L 60,90" strokeWidth="1.4" />
      <path d="M 20,90 L 20,45 C 20,22 50,22 50,45 L 50,90" strokeWidth="1" />
      <path d="M 30,90 L 30,50 C 30,34 40,34 40,50 L 40,90" strokeWidth="0.8" />
    </g>
  </svg>
);

// 1. Classic Astrology Wheel Watermark (The Hermetic Manuscript)
export const AstrologyWheelWatermark: React.FC<{ className?: string; opacity?: number }> = ({
  className = 'w-full h-full text-[#6B5E51]',
  opacity = 0.08,
}) => (
  <svg
    viewBox="0 0 794 1123"
    className={className}
    fill="none"
    stroke="currentColor"
    style={{ opacity }}
  >
    <g transform="translate(397, 561.5)">
      {/* Outer Concentric Resonant Rings */}
      <circle cx="0" cy="0" r="240" strokeWidth="0.5" strokeDasharray="4 4" />
      <circle cx="0" cy="0" r="220" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="195" strokeWidth="0.75" />
      <circle cx="0" cy="0" r="170" strokeWidth="0.5" strokeDasharray="2 3" />

      {/* 12 Astrological Zodiac Sector Spokes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 70 * Math.cos(angle);
        const y1 = 70 * Math.sin(angle);
        const x2 = 220 * Math.cos(angle);
        const y2 = 220 * Math.sin(angle);
        return <line key={`wheel-line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" />;
      })}

      {/* 24 Outer Dots / Stars */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x = 195 * Math.cos(angle);
        const y = 195 * Math.sin(angle);
        return <circle key={`outer-dot-${i}`} cx={x} cy={y} r="1.5" fill="currentColor" />;
      })}

      {/* Intermediate Circle Ring */}
      <circle cx="0" cy="0" r="130" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="110" strokeWidth="0.6" strokeDasharray="3 3" />

      {/* Central Sacred Interlaced Hexagram / Star of Intuition */}
      <polygon points="0,-85 73.6,42.5 -73.6,42.5" strokeWidth="0.75" />
      <polygon points="0,85 73.6,-42.5 -73.6,-42.5" strokeWidth="0.75" />

      {/* Inner Mandala Rings */}
      <circle cx="0" cy="0" r="55" strokeWidth="0.7" />
      <circle cx="0" cy="0" r="35" strokeWidth="0.85" />
      <circle cx="0" cy="0" r="18" strokeWidth="0.6" />

      {/* Central Radiant Sun Core */}
      <circle cx="0" cy="0" r="4.5" fill="currentColor" />

      {/* 8-Ray Star Compass Axis */}
      {Array.from({ length: 8 }).map((_, i) => {
        const rot = i * 45;
        return (
          <line
            key={`ray-${i}`}
            x1="0"
            y1="-230"
            x2="0"
            y2="-205"
            strokeWidth="0.7"
            transform={`rotate(${rot})`}
          />
        );
      })}
    </g>
  </svg>
);

// 2. Midnight Celestial Constellation & Lunar Phases Watermark (The Starlight Oracle)
export const MidnightCelestialWatermark: React.FC<{ className?: string; opacity?: number }> = ({
  className = 'w-full h-full text-[#D4AF37]',
  opacity = 0.12,
}) => (
  <svg
    viewBox="0 0 794 1123"
    className={className}
    fill="none"
    stroke="currentColor"
    style={{ opacity }}
  >
    <g transform="translate(397, 561.5)">
      {/* Outer Cosmic Coordinate Ring */}
      <circle cx="0" cy="0" r="260" strokeWidth="0.4" strokeDasharray="1 5" />
      <circle cx="0" cy="0" r="235" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="200" strokeWidth="0.8" strokeDasharray="6 3" />

      {/* Lunar Phases Orbits */}
      <circle cx="0" cy="0" r="160" strokeWidth="0.5" />
      
      {/* 8 Lunar Phase glyphs around the perimeter */}
      {/* Full Moon at Top */}
      <circle cx="0" cy="-160" r="8" fill="currentColor" fillOpacity="0.6" strokeWidth="0.6" />
      {/* New Moon at Bottom */}
      <circle cx="0" cy="160" r="8" strokeWidth="0.8" />
      {/* First Quarter Moon East */}
      <path d="M 160,-168 A 8,8 0 0,1 160,-152 Z" fill="currentColor" fillOpacity="0.6" />
      {/* Third Quarter Moon West */}
      <path d="M -160,-168 A 8,8 0 0,0 -160,-152 Z" fill="currentColor" fillOpacity="0.6" />

      {/* Radiant Starburst Rays */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const r1 = i % 2 === 0 ? 80 : 100;
        const r2 = i % 2 === 0 ? 230 : 210;
        const x1 = r1 * Math.cos(angle);
        const y1 = r1 * Math.sin(angle);
        const x2 = r2 * Math.cos(angle);
        const y2 = r2 * Math.sin(angle);
        return <line key={`starlight-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={i % 4 === 0 ? '0.75' : '0.4'} />;
      })}

      {/* Central 8-Point Diamond Star */}
      <polygon points="0,-70 16,-20 66,-20 26,10 40,55 0,25 -40,55 -26,10 -66,-20 -16,-20" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="10" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="3" fill="currentColor" />

      {/* Constellation Star Clusters */}
      <circle cx="120" cy="-110" r="2" fill="currentColor" />
      <circle cx="145" cy="-90" r="1.5" fill="currentColor" />
      <line x1="120" y1="-110" x2="145" y2="-90" strokeWidth="0.3" strokeDasharray="2 2" />

      <circle cx="-130" cy="-100" r="2" fill="currentColor" />
      <circle cx="-150" cy="-130" r="1.5" fill="currentColor" />
      <line x1="-130" y1="-100" x2="-150" y2="-130" strokeWidth="0.3" strokeDasharray="2 2" />

      <circle cx="110" cy="130" r="2" fill="currentColor" />
      <circle cx="135" cy="115" r="1.5" fill="currentColor" />
      <line x1="110" y1="130" x2="135" y2="115" strokeWidth="0.3" strokeDasharray="2 2" />

      <circle cx="-120" cy="120" r="2" fill="currentColor" />
      <circle cx="-100" cy="140" r="1.5" fill="currentColor" />
      <line x1="-120" y1="120" x2="-100" y2="140" strokeWidth="0.3" strokeDasharray="2 2" />
    </g>
  </svg>
);

// 3. Botanical Seed of Life & Laurel Watermark (The Herbal Alchemist)
export const BotanicalMandalaWatermark: React.FC<{ className?: string; opacity?: number }> = ({
  className = 'w-full h-full text-[#606C38]',
  opacity = 0.08,
}) => (
  <svg
    viewBox="0 0 794 1123"
    className={className}
    fill="none"
    stroke="currentColor"
    style={{ opacity }}
  >
    <g transform="translate(397, 561.5)">
      {/* Outer Wreath Perimeter */}
      <circle cx="0" cy="0" r="245" strokeWidth="0.5" strokeDasharray="3 3" />
      <circle cx="0" cy="0" r="225" strokeWidth="0.75" />

      {/* 16 Botanical Leaf Sprigs radiating outward */}
      {Array.from({ length: 16 }).map((_, i) => {
        const rot = i * 22.5;
        return (
          <g key={`leaf-${i}`} transform={`rotate(${rot}) translate(0, -225)`}>
            <path d="M 0,0 C 8,-12 12,-20 0,-30 C -12,-20 -8,-12 0,0" strokeWidth="0.6" fill="currentColor" fillOpacity="0.05" />
            <line x1="0" y1="0" x2="0" y2="-28" strokeWidth="0.4" />
          </g>
        );
      })}

      {/* Inner Concentric Harmonizer Rings */}
      <circle cx="0" cy="0" r="150" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="120" strokeWidth="0.5" strokeDasharray="4 2" />

      {/* Sacred Geometry Seed of Life (7 Intersecting Circles) */}
      <circle cx="0" cy="0" r="60" strokeWidth="0.75" />
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const cx = 60 * Math.cos(angle);
        const cy = 60 * Math.sin(angle);
        return <circle key={`seed-${i}`} cx={cx} cy={cy} r="60" strokeWidth="0.65" />;
      })}

      {/* Central Flora Rosette */}
      <circle cx="0" cy="0" r="24" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="6" fill="currentColor" fillOpacity="0.7" />
    </g>
  </svg>
);

// 4. Clairvoyant Third Eye & Portal Watermark (The Clairvoyant Sanctuary)
export const ThirdEyePortalWatermark: React.FC<{ className?: string; opacity?: number }> = ({
  className = 'w-full h-full text-[#7B2CBF]',
  opacity = 0.08,
}) => (
  <svg
    viewBox="0 0 794 1123"
    className={className}
    fill="none"
    stroke="currentColor"
    style={{ opacity }}
  >
    <g transform="translate(397, 561.5)">
      {/* Outer Sacred Arched Halo */}
      <circle cx="0" cy="0" r="250" strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx="0" cy="0" r="230" strokeWidth="0.75" />
      <circle cx="0" cy="0" r="185" strokeWidth="0.5" />

      {/* 24 Radiating Psychic Emanation Rays */}
      {Array.from({ length: 24 }).map((_, i) => {
        const rot = i * 15;
        return (
          <line
            key={`eye-ray-${i}`}
            x1="0"
            y1="-185"
            x2="0"
            y2={i % 2 === 0 ? '-225' : '-210'}
            strokeWidth={i % 3 === 0 ? '0.7' : '0.4'}
            transform={`rotate(${rot})`}
          />
        );
      })}

      {/* Sacred Eye of Providence / Diamond Portal */}
      <polygon points="0,-140 120,0 0,140 -120,0" strokeWidth="0.8" />
      <polygon points="0,-120 100,0 0,120 -100,0" strokeWidth="0.5" strokeDasharray="3 3" />

      {/* Almond-Shaped Third Eye */}
      <path d="M -85,0 Q 0,-60 85,0 Q 0,60 -85,0 Z" strokeWidth="1" />
      <path d="M -70,0 Q 0,-45 70,0 Q 0,45 -70,0 Z" strokeWidth="0.6" />

      {/* Radiant Iris and Pupil */}
      <circle cx="0" cy="0" r="28" strokeWidth="0.85" />
      <circle cx="0" cy="0" r="12" fill="currentColor" fillOpacity="0.7" strokeWidth="0.5" />
      <circle cx="-3" cy="-3" r="3" fill="#FFFFFF" fillOpacity="0.9" />

      {/* Eyelash & Aura Whispers */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = -50 + i * 14;
        return <line key={`lash-${i}`} x1={x} y1="-32" x2={x * 1.1} y2="-46" strokeWidth="0.5" />;
      })}

      {/* Crescent Moon Crown above Eye */}
      <path d="M -25,-75 Q 0,-60 25,-75 Q 0,-90 -25,-75 Z" fill="currentColor" fillOpacity="0.4" />
    </g>
  </svg>
);

// 5. Minimalist Bauhaus Compass & Grid Watermark (Haute Divination)
export const MinimalCompassWatermark: React.FC<{ className?: string; opacity?: number }> = ({
  className = 'w-full h-full text-[#222222]',
  opacity = 0.05,
}) => (
  <svg
    viewBox="0 0 794 1123"
    className={className}
    fill="none"
    stroke="currentColor"
    style={{ opacity }}
  >
    <g transform="translate(397, 561.5)">
      {/* Precision Hairline Coordinate Rings */}
      <circle cx="0" cy="0" r="250" strokeWidth="0.5" />
      <circle cx="0" cy="0" r="242" strokeWidth="0.3" strokeDasharray="1 3" />
      <circle cx="0" cy="0" r="200" strokeWidth="0.5" />
      <circle cx="0" cy="0" r="120" strokeWidth="0.4" strokeDasharray="3 3" />
      <circle cx="0" cy="0" r="50" strokeWidth="0.6" />

      {/* Clean Cardinal Grid Axes */}
      <line x1="-260" y1="0" x2="260" y2="0" strokeWidth="0.5" />
      <line x1="0" y1="-260" x2="0" y2="260" strokeWidth="0.5" />

      {/* 45-degree Diagonal Alignment Markers */}
      <line x1="-180" y1="-180" x2="180" y2="180" strokeWidth="0.3" strokeDasharray="4 4" />
      <line x1="180" y1="-180" x2="-180" y2="180" strokeWidth="0.3" strokeDasharray="4 4" />

      {/* 36 Subtle Perimeter Degree Ticks */}
      {Array.from({ length: 36 }).map((_, i) => {
        const rot = i * 10;
        const tickLength = i % 9 === 0 ? 12 : i % 3 === 0 ? 8 : 4;
        return (
          <line
            key={`tick-${i}`}
            x1="0"
            y1="-250"
            x2="0"
            y2={-250 + tickLength}
            strokeWidth={i % 9 === 0 ? '0.75' : '0.4'}
            transform={`rotate(${rot})`}
          />
        );
      })}

      {/* Minimalist 4-Point Geometric Center Star */}
      <polygon points="0,-35 4,-8 35,0 4,8 0,35 -4,8 -35,0 -4,-8" strokeWidth="0.75" />
      <circle cx="0" cy="0" r="2" fill="currentColor" />
    </g>
  </svg>
);

// 6. Sacred Geometry Metatron's Cube & Merkaba Watermark
export const SacredGeometryMerkabaWatermark: React.FC<{
  className?: string;
  opacity?: number;
}> = ({ className = 'w-full h-full text-current', opacity = 0.11 }) => {
  // Centers for 6 inner circles (radius 75) and 6 outer circles (radius 150)
  const innerNodes = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 60 * Math.PI) / 180;
    return { x: 75 * Math.cos(angle), y: 75 * Math.sin(angle) };
  });
  const outerNodes = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 60 * Math.PI) / 180;
    return { x: 150 * Math.cos(angle), y: 150 * Math.sin(angle) };
  });
  const allNodes = [{ x: 0, y: 0 }, ...innerNodes, ...outerNodes];

  return (
    <svg
      viewBox="0 0 794 1123"
      className={className}
      fill="none"
      stroke="currentColor"
      style={{ opacity }}
    >
      <g transform="translate(397, 561.5)">
        {/* Outer Boundary Concentric Rings */}
        <circle cx="0" cy="0" r="255" strokeWidth="0.5" strokeDasharray="3 4" />
        <circle cx="0" cy="0" r="235" strokeWidth="0.75" />
        <circle cx="0" cy="0" r="200" strokeWidth="0.4" strokeDasharray="1 3" />

        {/* Outer 24 Perimeter Starlight Dots */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          return <circle key={`mk-dot-${i}`} cx={235 * Math.cos(a)} cy={235 * Math.sin(a)} r="1.4" fill="currentColor" />;
        })}

        {/* Metatron Interconnecting Sacred Rays */}
        {innerNodes.map((node, i) => (
          <line key={`center-line-${i}`} x1="0" y1="0" x2={node.x} y2={node.y} strokeWidth="0.5" />
        ))}
        {outerNodes.map((node, i) => (
          <line key={`outer-ray-${i}`} x1="0" y1="0" x2={node.x} y2={node.y} strokeWidth="0.5" strokeDasharray="4 3" />
        ))}

        {/* 6 Inner-to-Outer Hexagonal Boundaries */}
        {innerNodes.map((node, i) => {
          const next = innerNodes[(i + 1) % 6];
          return <line key={`hex-in-${i}`} x1={node.x} y1={node.y} x2={next.x} y2={next.y} strokeWidth="0.6" />;
        })}
        {outerNodes.map((node, i) => {
          const next = outerNodes[(i + 1) % 6];
          return <line key={`hex-out-${i}`} x1={node.x} y1={node.y} x2={next.x} y2={next.y} strokeWidth="0.7" />;
        })}

        {/* Cross-Connecting Triangles (Merkaba 3D perspective lines) */}
        <polygon
          points={`${outerNodes[0].x},${outerNodes[0].y} ${outerNodes[2].x},${outerNodes[2].y} ${outerNodes[4].x},${outerNodes[4].y}`}
          strokeWidth="0.75"
        />
        <polygon
          points={`${outerNodes[1].x},${outerNodes[1].y} ${outerNodes[3].x},${outerNodes[3].y} ${outerNodes[5].x},${outerNodes[5].y}`}
          strokeWidth="0.75"
        />

        {/* The 13 Fruit of Life Spheres (r = 36) */}
        {allNodes.map((node, idx) => (
          <circle key={`fruit-${idx}`} cx={node.x} cy={node.y} r="36" strokeWidth="0.5" />
        ))}

        {/* Center Point of Creation */}
        <circle cx="0" cy="0" r="14" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="3.5" fill="currentColor" />
      </g>
    </svg>
  );
};

// 7. Sacred Triad & Tarot Trine Watermark (Past / Present / Future Sacred Portals)
export const SacredTriadTrineWatermark: React.FC<{
  className?: string;
  opacity?: number;
}> = ({ className = 'w-full h-full text-current', opacity = 0.11 }) => {
  const triadNodes = [
    { x: 0, y: -110, rot: 0 },
    { x: 95.26, y: 55, rot: 120 },
    { x: -95.26, y: 55, rot: 240 },
  ];

  return (
    <svg
      viewBox="0 0 794 1123"
      className={className}
      fill="none"
      stroke="currentColor"
      style={{ opacity }}
    >
      <g transform="translate(397, 561.5)">
        {/* Outer Celestial Ring */}
        <circle cx="0" cy="0" r="250" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="0" cy="0" r="230" strokeWidth="0.75" />
        <circle cx="0" cy="0" r="190" strokeWidth="0.4" />

        {/* 36 Subtle Calibrated Axis Degree Ticks */}
        {Array.from({ length: 36 }).map((_, i) => {
          const rot = i * 10;
          return (
            <line
              key={`trine-tick-${i}`}
              x1="0"
              y1="-230"
              x2="0"
              y2={i % 3 === 0 ? '-220' : '-225'}
              strokeWidth={i % 3 === 0 ? '0.75' : '0.4'}
              transform={`rotate(${rot})`}
            />
          );
        })}

        {/* Three Intersecting Sacred Triquetra Vesica Circles */}
        {triadNodes.map((node, i) => (
          <circle key={`triquetra-c-${i}`} cx={node.x} cy={node.y} r="120" strokeWidth="0.65" />
        ))}

        {/* Central Triangle connecting apex centers */}
        <polygon
          points={`${triadNodes[0].x},${triadNodes[0].y} ${triadNodes[1].x},${triadNodes[1].y} ${triadNodes[2].x},${triadNodes[2].y}`}
          strokeWidth="0.8"
        />

        {/* 3 Arched Tarot Arcana Portals at each apex */}
        {triadNodes.map((node, i) => (
          <g key={`portal-${i}`} transform={`translate(${node.x}, ${node.y}) rotate(${node.rot})`}>
            {/* Rounded Arched Gateway */}
            <path
              d="M -24,28 L -24,-10 C -24,-28 24,-28 24,-10 L 24,28 Z"
              strokeWidth="0.75"
            />
            {/* Inner Portal Inscription */}
            <path
              d="M -18,24 L -18,-8 C -18,-22 18,-22 18,-8 L 18,24"
              strokeWidth="0.4"
              strokeDasharray="2 2"
            />
            {/* Radiant Star in Portal */}
            <circle cx="0" cy="-6" r="3" fill="currentColor" />
            <line x1="0" y1="-16" x2="0" y2="4" strokeWidth="0.5" />
            <line x1="-10" y1="-6" x2="10" y2="-6" strokeWidth="0.5" />
          </g>
        ))}

        {/* Center Golden Core Harmonizer */}
        <circle cx="0" cy="0" r="48" strokeWidth="0.75" />
        <circle cx="0" cy="0" r="28" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="0" cy="0" r="5" fill="currentColor" />

        {/* 3 Radiating Rays toward Infinity */}
        <line x1="0" y1="-135" x2="0" y2="-215" strokeWidth="0.8" />
        <line x1="116.9" y1="67.5" x2="186.2" y2="107.5" strokeWidth="0.8" />
        <line x1="-116.9" y1="67.5" x2="-186.2" y2="107.5" strokeWidth="0.8" />
      </g>
    </svg>
  );
};

// 8. Alchemical Conjunction of Sol & Luna Watermark
export const AlchemicalSunMoonWatermark: React.FC<{
  className?: string;
  opacity?: number;
}> = ({ className = 'w-full h-full text-current', opacity = 0.11 }) => (
  <svg
    viewBox="0 0 794 1123"
    className={className}
    fill="none"
    stroke="currentColor"
    style={{ opacity }}
  >
    <g transform="translate(397, 561.5)">
      {/* Outer Horizon & Celestial Equator Rings */}
      <circle cx="0" cy="0" r="255" strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx="0" cy="0" r="235" strokeWidth="0.7" />
      <circle cx="0" cy="0" r="205" strokeWidth="0.4" strokeDasharray="6 3" />
      <circle cx="0" cy="0" r="165" strokeWidth="0.5" />

      {/* Cardinal Alignment Crosslines */}
      <line x1="-245" y1="0" x2="245" y2="0" strokeWidth="0.4" strokeDasharray="3 3" />
      <line x1="0" y1="-245" x2="0" y2="245" strokeWidth="0.4" strokeDasharray="3 3" />

      {/* 16 Alternating Solar Fire & Light Rays */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const r1 = 80;
        const r2 = i % 2 === 0 ? 195 : 175;
        const x1 = r1 * Math.cos(angle);
        const y1 = r1 * Math.sin(angle);
        const x2 = r2 * Math.cos(angle);
        const y2 = r2 * Math.sin(angle);
        return (
          <line
            key={`sun-ray-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth={i % 4 === 0 ? '0.85' : '0.45'}
          />
        );
      })}

      {/* Outer Planetary Orbital Markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <circle
            key={`orbit-dot-${i}`}
            cx={205 * Math.cos(a)}
            cy={205 * Math.sin(a)}
            r={i % 3 === 0 ? '2' : '1.2'}
            fill="currentColor"
          />
        );
      })}

      {/* Solar Core Disk */}
      <circle cx="0" cy="0" r="68" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="62" strokeWidth="0.4" strokeDasharray="2 2" />

      {/* Majestic Embracing Crescent Moon (Luna) */}
      <path
        d="M 0,-56 A 56,56 0 0,1 0,56 A 40,40 0 0,0 0,-56 Z"
        strokeWidth="0.9"
        fill="currentColor"
        fillOpacity="0.08"
      />

      {/* Radiant Solar Face / Core Eye */}
      <circle cx="16" cy="0" r="14" strokeWidth="0.75" />
      <circle cx="16" cy="0" r="4" fill="currentColor" />

      {/* Celestial Crown Stars above */}
      <polygon points="0,-120 4,-108 16,-108 7,-100 10,-88 0,-95 -10,-88 -7,-100 -16,-108 -4,-108" strokeWidth="0.6" />
      <polygon points="0,120 4,108 16,108 7,100 10,88 0,95 -10,88 -7,100 -16,108 -4,108" strokeWidth="0.6" />
    </g>
  </svg>
);

// Unified Theme Watermark Selector with Dynamic Per-Page Variety
export const ThemeWatermark: React.FC<{
  themeId?: PdfThemeId;
  pageNumber?: number;
  className?: string;
  opacity?: number;
}> = ({ themeId = 'parchment', pageNumber = 1, className, opacity }) => {
  const theme = getPdfTheme(themeId);
  const effectiveOpacity = opacity !== undefined ? opacity : theme.colors.watermarkOpacity;

  // Curated sequences of sacred esoteric watermarks per theme archetype that dynamically vary per page
  const themeSequences: Record<PdfThemeId, React.FC<{ className?: string; opacity?: number }>[]> = {
    parchment: [
      AstrologyWheelWatermark,
      SacredTriadTrineWatermark,
      AlchemicalSunMoonWatermark,
      ThirdEyePortalWatermark,
      SacredGeometryMerkabaWatermark,
      BotanicalMandalaWatermark,
    ],
    midnight: [
      MidnightCelestialWatermark,
      SacredTriadTrineWatermark,
      AlchemicalSunMoonWatermark,
      SacredGeometryMerkabaWatermark,
      ThirdEyePortalWatermark,
      AstrologyWheelWatermark,
    ],
    botanical: [
      BotanicalMandalaWatermark,
      SacredTriadTrineWatermark,
      SacredGeometryMerkabaWatermark,
      AlchemicalSunMoonWatermark,
      AstrologyWheelWatermark,
      ThirdEyePortalWatermark,
    ],
    amethyst: [
      ThirdEyePortalWatermark,
      SacredGeometryMerkabaWatermark,
      AlchemicalSunMoonWatermark,
      SacredTriadTrineWatermark,
      MidnightCelestialWatermark,
      AstrologyWheelWatermark,
    ],
    minimalist: [
      MinimalCompassWatermark,
      SacredGeometryMerkabaWatermark,
      SacredTriadTrineWatermark,
      AlchemicalSunMoonWatermark,
      MinimalCompassWatermark,
      AstrologyWheelWatermark,
    ],
  };

  const sequence = themeSequences[themeId] || themeSequences.parchment;
  const safePage = Math.max(1, pageNumber || 1);
  const WatermarkComponent = sequence[(safePage - 1) % sequence.length];

  return <WatermarkComponent className={className} opacity={effectiveOpacity} />;
};

// =========================================================================
// ADVANCED AUTHENTIC PSYCHIC BACKGROUND DESIGN ASSETS
// =========================================================================

// 1. Classical Baroque / Renaissance Grimoire Corner Filigree (Parchment Theme)
export const BaroqueCornerFiligree: React.FC<{
  className?: string;
  color?: string;
  rotation?: number;
}> = ({ className = 'w-[54px] h-[54px]', color = '#B06822', rotation = 0 }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    style={{ transform: `rotate(${rotation}deg)` }}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Outer Corner Framing Bracket */}
    <path d="M 3,57 L 3,3 L 57,3" strokeWidth="1.2" opacity="0.85" />
    <path d="M 7,57 L 7,7 L 57,7" strokeWidth="0.5" opacity="0.6" strokeDasharray="1.5 1.5" />
    <path d="M 10,50 L 10,10 L 50,10" strokeWidth="0.75" opacity="0.7" />

    {/* Corner Diamond Gem Node */}
    <polygon points="3,3 7,0 11,3 7,6" fill={color} opacity="0.85" stroke="none" />
    <circle cx="3" cy="3" r="1.5" fill="#FAF7EE" stroke="none" />

    {/* Acanthus Leaf & Baroque Scrollwork */}
    <path
      d="M 10,10 C 14,20 22,25 32,25 C 24,28 18,36 18,48"
      strokeWidth="0.9"
      opacity="0.8"
    />
    <path
      d="M 10,10 C 20,14 25,22 25,32 C 28,24 36,18 48,18"
      strokeWidth="0.9"
      opacity="0.8"
    />

    {/* Inner Leaf Tendril Curls */}
    <path
      d="M 18,18 C 22,14 28,16 29,20 C 30,24 26,27 22,25"
      strokeWidth="0.75"
      opacity="0.75"
    />
    <path
      d="M 18,18 C 14,22 16,28 20,29 C 24,30 27,26 25,22"
      strokeWidth="0.75"
      opacity="0.75"
    />

    {/* Radiant 4-point Starburst at apex */}
    <g transform="translate(19, 19)" opacity="0.9">
      <polygon points="0,-6 1.5,-1.5 6,0 1.5,1.5 0,6 -1.5,1.5 -6,0 -1.5,-1.5" fill={color} stroke="none" />
      <circle cx="0" cy="0" r="1" fill="#FAF7EE" stroke="none" />
    </g>

    {/* Micro Fleurons */}
    <circle cx="48" cy="18" r="1.8" fill={color} opacity="0.75" stroke="none" />
    <circle cx="18" cy="48" r="1.8" fill={color} opacity="0.75" stroke="none" />
    <circle cx="38" cy="10" r="1.2" fill={color} opacity="0.6" stroke="none" />
    <circle cx="10" cy="38" r="1.2" fill={color} opacity="0.6" stroke="none" />
  </svg>
);

// 2. Celestial Starlight Sunburst Corner (Midnight Theme)
export const CelestialStarlightCorner: React.FC<{
  className?: string;
  color?: string;
  rotation?: number;
}> = ({ className = 'w-[54px] h-[54px]', color = '#E5B070', rotation = 0 }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    style={{ transform: `rotate(${rotation}deg)` }}
    fill="none"
    stroke={color}
    strokeLinecap="round"
  >
    {/* Corner Lines with Astronomic Ticks */}
    <path d="M 4,56 L 4,4 L 56,4" strokeWidth="1.2" opacity="0.9" />
    <path d="M 8,50 L 8,8 L 50,8" strokeWidth="0.6" opacity="0.5" strokeDasharray="3 2" />
    
    {/* Corner Crescent Moon */}
    <g transform="translate(16, 16)" opacity="0.9">
      <path
        d="M -4,-8 A 9 9 0 0 0 8,4 A 7 7 0 0 1 -4,-8 Z"
        fill={color}
        stroke="none"
        opacity="0.85"
      />
      {/* Radiant 8-Point Diamond Star */}
      <polygon
        points="4,-4 5.5,-1.5 8,-1 5.5,0.5 5,3 3,1 0.5,1.5 2,-1"
        fill="#FFF4D0"
        stroke="none"
      />
    </g>

    {/* Radiating Star Rays from Corner */}
    <line x1="4" y1="4" x2="26" y2="26" strokeWidth="0.8" opacity="0.75" />
    <line x1="4" y1="4" x2="34" y2="14" strokeWidth="0.5" opacity="0.5" />
    <line x1="4" y1="4" x2="14" y2="34" strokeWidth="0.5" opacity="0.5" />

    {/* Shimmering Stardust Sparks */}
    <circle cx="34" cy="14" r="1.5" fill={color} stroke="none" />
    <circle cx="14" cy="34" r="1.5" fill={color} stroke="none" />
    <circle cx="46" cy="8" r="2" fill="#FFF4D0" stroke="none" />
    <circle cx="8" cy="46" r="2" fill="#FFF4D0" stroke="none" />
  </svg>
);

// 3. Botanical Laurel & Olive Sprig Corner (Botanical Theme)
export const BotanicalLaurelCorner: React.FC<{
  className?: string;
  color?: string;
  rotation?: number;
}> = ({ className = 'w-[54px] h-[54px]', color = '#556331', rotation = 0 }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    style={{ transform: `rotate(${rotation}deg)` }}
    fill="none"
    stroke={color}
    strokeLinecap="round"
  >
    {/* Soft border lines */}
    <path d="M 4,56 L 4,4 L 56,4" strokeWidth="1.1" opacity="0.85" />
    <path d="M 8,52 L 8,8 L 52,8" strokeWidth="0.5" opacity="0.4" />

    {/* Vine curving into the page */}
    <path
      d="M 4,4 C 14,8 24,18 28,32 C 30,38 30,46 26,52"
      strokeWidth="0.9"
      opacity="0.8"
    />
    <path
      d="M 4,4 C 8,14 18,24 32,28 C 38,30 46,30 52,26"
      strokeWidth="0.9"
      opacity="0.8"
    />

    {/* Laurel Leaves along the branch */}
    <g fill={color} opacity="0.75" stroke="none">
      {/* Leaf 1 */}
      <path d="M 12,10 C 14,6 20,7 20,11 C 18,14 13,13 12,10 Z" />
      {/* Leaf 2 */}
      <path d="M 10,12 C 6,14 7,20 11,20 C 14,18 13,13 10,12 Z" />
      {/* Leaf 3 */}
      <path d="M 22,18 C 26,14 31,16 30,21 C 27,24 23,21 22,18 Z" />
      {/* Leaf 4 */}
      <path d="M 18,22 C 14,26 16,31 21,30 C 24,27 21,23 18,22 Z" />
      {/* Leaf 5 */}
      <path d="M 32,24 C 37,22 41,25 39,30 C 35,32 32,28 32,24 Z" />
      {/* Leaf 6 */}
      <path d="M 24,32 C 22,37 25,41 30,39 C 32,35 28,32 24,32 Z" />
    </g>

    {/* Botanical Berries */}
    <circle cx="21" cy="21" r="2" fill={color} opacity="0.9" stroke="none" />
    <circle cx="4" cy="4" r="2" fill={color} opacity="0.9" stroke="none" />
  </svg>
);

// 4. Gothic Cathedral Arch & Trefoil Corner (Amethyst Theme)
export const CathedralArchCorner: React.FC<{
  className?: string;
  color?: string;
  rotation?: number;
}> = ({ className = 'w-[54px] h-[54px]', color = '#7B2CBF', rotation = 0 }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    style={{ transform: `rotate(${rotation}deg)` }}
    fill="none"
    stroke={color}
    strokeLinecap="round"
  >
    {/* Pointed gothic frame */}
    <path d="M 4,56 L 4,14 C 4,8 8,4 14,4 L 56,4" strokeWidth="1.2" opacity="0.85" />
    <path d="M 8,50 L 8,16 C 8,11 11,8 16,8 L 50,8" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2" />

    {/* Trefoil Gothic Arch Peak */}
    <path
      d="M 8,24 C 14,24 18,18 18,8"
      strokeWidth="0.8"
      opacity="0.75"
    />
    <path
      d="M 24,8 C 24,14 18,18 8,18"
      strokeWidth="0.8"
      opacity="0.75"
    />

    {/* Sacred Third-Eye Almond & Center Gem */}
    <g transform="translate(18, 18)" opacity="0.9">
      <path
        d="M -7,0 C -3,-5 3,-5 7,0 C 3,5 -3,5 -7,0 Z"
        strokeWidth="0.8"
      />
      <circle cx="0" cy="0" r="2.2" fill={color} stroke="none" />
      <circle cx="0" cy="0" r="0.8" fill="#FAF4FC" stroke="none" />
    </g>

    {/* Corner Ray Flares */}
    <line x1="4" y1="4" x2="12" y2="12" strokeWidth="0.7" opacity="0.6" />
    <circle cx="4" cy="4" r="1.8" fill={color} stroke="none" />
  </svg>
);

// 5. Minimalist Precision Crosshair & Astrometric Coordinates (Haute Divination Theme)
export const MinimalistArchitecturalCorner: React.FC<{
  className?: string;
  color?: string;
  rotation?: number;
}> = ({ className = 'w-[54px] h-[54px]', color = '#8A6B47', rotation = 0 }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    style={{ transform: `rotate(${rotation}deg)` }}
    fill="none"
    stroke={color}
  >
    {/* Precision Hairline Outer and Inner Box */}
    <path d="M 4,56 L 4,4 L 56,4" strokeWidth="0.75" opacity="0.9" />
    <path d="M 10,48 L 10,10 L 48,10" strokeWidth="0.35" opacity="0.6" />

    {/* Swiss Precision Crosshair */}
    <line x1="1" y1="4" x2="7" y2="4" strokeWidth="1" />
    <line x1="4" y1="1" x2="4" y2="7" strokeWidth="1" />

    {/* Micro-Degree Ticks */}
    <line x1="4" y1="18" x2="8" y2="18" strokeWidth="0.5" opacity="0.7" />
    <line x1="4" y1="28" x2="6" y2="28" strokeWidth="0.5" opacity="0.5" />
    <line x1="4" y1="38" x2="8" y2="38" strokeWidth="0.5" opacity="0.7" />
    <line x1="18" y1="4" x2="18" y2="8" strokeWidth="0.5" opacity="0.7" />
    <line x1="28" y1="4" x2="28" y2="6" strokeWidth="0.5" opacity="0.5" />
    <line x1="38" y1="4" x2="38" y2="8" strokeWidth="0.5" opacity="0.7" />

    {/* Golden Ratio Angle Arc */}
    <path d="M 10,24 A 14 14 0 0 0 24,10" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.7" />
    <circle cx="10" cy="10" r="1.2" fill={color} stroke="none" />
  </svg>
);

// 6. Consecrated Authentic Psychic Reading Seal Stamp
export const AuthenticPsychicSealStamp: React.FC<{
  className?: string;
  color?: string;
  sealText?: string;
  isDark?: boolean;
  bgColor?: string;
}> = ({
  className = 'w-[68px] h-[68px]',
  color = '#B06822',
  sealText = 'CONSECRATED PSYCHIC READING',
  isDark = false,
  bgColor,
}) => {
  const effectiveBg = bgColor || (isDark ? '#0B0F19' : '#FAF7EE');

  return (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke={color}
  >
    {/* Base Wax/Parchment Backing Plate to avoid background interference */}
    <circle cx="50" cy="50" r="48" fill={effectiveBg} stroke="none" opacity="0.94" />

    {/* Outer Beaded Rosary Ring */}
    <circle cx="50" cy="50" r="47" strokeWidth="0.7" strokeDasharray="1.5 2.5" opacity="0.7" />
    {/* Outer Solid Ring */}
    <circle cx="50" cy="50" r="43" strokeWidth="1.2" opacity="0.85" />
    {/* Inner Concentric Ring */}
    <circle cx="50" cy="50" r="32" strokeWidth="0.8" opacity="0.75" />
    <circle cx="50" cy="50" r="29" strokeWidth="0.4" strokeDasharray="2 1.5" opacity="0.6" />

    {/* Micro Planetary Glyphs along the ring (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn) */}
    <g
      fontSize="5.5"
      fontFamily="'Cinzel', serif"
      fill={color}
      stroke="none"
      textAnchor="middle"
      dominantBaseline="middle"
      opacity="0.85"
    >
      <text x="50" y="13">☉</text>
      <text x="75" y="24">☽</text>
      <text x="85" y="50">☿</text>
      <text x="75" y="76">♀</text>
      <text x="50" y="87">♂</text>
      <text x="25" y="76">♃</text>
      <text x="15" y="50">♄</text>
      <text x="25" y="24">🜚</text>
    </g>

    {/* Center Talisman: Radiant All-Seeing Eye & Starburst */}
    <g transform="translate(50, 50)" opacity="0.9">
      {/* 8-Point Diamond Star */}
      <polygon
        points="0,-16 3.5,-4.5 16,0 3.5,4.5 0,16 -3.5,4.5 -16,0 -3.5,-4.5"
        fill={color}
        fillOpacity={isDark ? '0.35' : '0.18'}
        strokeWidth="0.8"
      />
      {/* Sacred Eye */}
      <path
        d="M -11,0 C -5,-7 5,-7 11,0 C 5,7 -5,7 -11,0 Z"
        strokeWidth="0.9"
        fill={effectiveBg}
      />
      {/* Pupil & Iris */}
      <circle cx="0" cy="0" r="3.8" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="1.8" fill={color} stroke="none" />
      <circle cx="0.8" cy="-0.8" r="0.6" fill="#FFFFFF" stroke="none" />
    </g>
  </svg>
  );
};

// 7. Zodiac Decan Ribbon (Zodiac Glyphs Track)
export const ZodiacDecanRibbon: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = '', color = '#8C7052' }) => (
  <div
    className={`flex items-center justify-between text-[7pt] tracking-[0.4em] select-none opacity-60 font-serif ${className}`}
    style={{ color }}
  >
    <span>♈</span>
    <span>•</span>
    <span>♉</span>
    <span>•</span>
    <span>♊</span>
    <span>•</span>
    <span>♋</span>
    <span>•</span>
    <span>♌</span>
    <span>•</span>
    <span>♍</span>
    <span>•</span>
    <span>♎</span>
    <span>•</span>
    <span>♏</span>
    <span>•</span>
    <span>♐</span>
    <span>•</span>
    <span>♑</span>
    <span>•</span>
    <span>♒</span>
    <span>•</span>
    <span>♓</span>
  </div>
);

// Universal Page Decorations with authentic psychic aesthetic framing
export const UniversalPageDecorations: React.FC<{
  pageNumber?: number;
  totalPages?: number;
  headerTitle?: string;
  className?: string;
  hideHeader?: boolean;
  brandName?: string;
  themeId?: PdfThemeId;
}> = ({
  pageNumber,
  totalPages = 28,
  headerTitle = 'PERSONALIZED INTUITIVE GUIDANCE',
  className = '',
  hideHeader,
  brandName = 'Sacred Intuitive Studio',
  themeId = 'parchment',
}) => {
  const isCover = pageNumber === 1 || hideHeader;
  const isLastPage = totalPages > 1 && pageNumber === totalPages;
  const showSeal = isCover || isLastPage;
  const effectiveBrandName = (brandName || '').trim() || 'Sacred Intuitive Studio';
  const theme = getPdfTheme(themeId);
  const isDark = Boolean(theme.swatch.isDark);

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}>
      {/* 1. Atmospheric Ambient Vignette & Texture Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            themeId === 'midnight'
              ? 'radial-gradient(ellipse at 50% 35%, rgba(26, 38, 66, 0.45) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5, 7, 13, 0.75) 100%)'
              : themeId === 'amethyst'
              ? 'radial-gradient(ellipse at 50% 30%, rgba(181, 101, 240, 0.09) 0%, transparent 65%), radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(75, 20, 110, 0.12) 100%)'
              : themeId === 'botanical'
              ? 'radial-gradient(ellipse at 50% 40%, rgba(120, 140, 90, 0.07) 0%, transparent 65%), radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(60, 75, 45, 0.12) 100%)'
              : themeId === 'minimalist'
              ? 'radial-gradient(ellipse at 50% 50%, transparent 65%, rgba(160, 150, 140, 0.08) 100%)'
              : 'radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(184, 153, 116, 0.14) 86%, rgba(138, 105, 70, 0.22) 100%)',
        }}
      />

      {/* 2. Dynamic Thematic Centered Esoteric Watermark (Varies per page) */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{ color: theme.colors.watermarkColor }}
      >
        <ThemeWatermark
          themeId={themeId}
          pageNumber={pageNumber}
          className="w-full h-full"
        />
      </div>

      {/* 3. Authentic Filigree Corner Brackets */}
      {/* Top Left */}
      <div className="absolute top-[20px] left-[20px] z-10">
        {themeId === 'midnight' && <CelestialStarlightCorner color={theme.colors.cornerFiligreeColor} rotation={0} />}
        {themeId === 'botanical' && <BotanicalLaurelCorner color={theme.colors.cornerFiligreeColor} rotation={0} />}
        {themeId === 'amethyst' && <CathedralArchCorner color={theme.colors.cornerFiligreeColor} rotation={0} />}
        {themeId === 'minimalist' && <MinimalistArchitecturalCorner color={theme.colors.cornerFiligreeColor} rotation={0} />}
        {themeId === 'parchment' && <BaroqueCornerFiligree color={theme.colors.cornerFiligreeColor} rotation={0} />}
      </div>

      {/* Top Right */}
      <div className="absolute top-[20px] right-[20px] z-10">
        {themeId === 'midnight' && <CelestialStarlightCorner color={theme.colors.cornerFiligreeColor} rotation={90} />}
        {themeId === 'botanical' && <BotanicalLaurelCorner color={theme.colors.cornerFiligreeColor} rotation={90} />}
        {themeId === 'amethyst' && <CathedralArchCorner color={theme.colors.cornerFiligreeColor} rotation={90} />}
        {themeId === 'minimalist' && <MinimalistArchitecturalCorner color={theme.colors.cornerFiligreeColor} rotation={90} />}
        {themeId === 'parchment' && <BaroqueCornerFiligree color={theme.colors.cornerFiligreeColor} rotation={90} />}
      </div>

      {/* Bottom Right - rendered on non-seal pages */}
      {!showSeal && (
        <div className="absolute bottom-[20px] right-[20px] z-10">
          {themeId === 'midnight' && <CelestialStarlightCorner color={theme.colors.cornerFiligreeColor} rotation={180} />}
          {themeId === 'botanical' && <BotanicalLaurelCorner color={theme.colors.cornerFiligreeColor} rotation={180} />}
          {themeId === 'amethyst' && <CathedralArchCorner color={theme.colors.cornerFiligreeColor} rotation={180} />}
          {themeId === 'minimalist' && <MinimalistArchitecturalCorner color={theme.colors.cornerFiligreeColor} rotation={180} />}
          {themeId === 'parchment' && <BaroqueCornerFiligree color={theme.colors.cornerFiligreeColor} rotation={180} />}
        </div>
      )}

      {/* Bottom Left */}
      <div className="absolute bottom-[20px] left-[20px] z-10">
        {themeId === 'midnight' && <CelestialStarlightCorner color={theme.colors.cornerFiligreeColor} rotation={270} />}
        {themeId === 'botanical' && <BotanicalLaurelCorner color={theme.colors.cornerFiligreeColor} rotation={270} />}
        {themeId === 'amethyst' && <CathedralArchCorner color={theme.colors.cornerFiligreeColor} rotation={270} />}
        {themeId === 'minimalist' && <MinimalistArchitecturalCorner color={theme.colors.cornerFiligreeColor} rotation={270} />}
        {themeId === 'parchment' && <BaroqueCornerFiligree color={theme.colors.cornerFiligreeColor} rotation={270} />}
      </div>

      {/* 4. Multi-Layered Authentic Framing Borders */}
      {/* Outer Main Border */}
      <div
        className="absolute inset-[24px] border z-10 pointer-events-none"
        style={{ borderColor: theme.colors.borderStrong, borderWidth: '1.2px' }}
      />
      {/* Inner Hairline Framing Border */}
      <div
        className="absolute inset-[28px] border z-10 pointer-events-none"
        style={{
          borderColor: theme.colors.borderSubtle,
          borderWidth: '0.6px',
          borderStyle: themeId === 'midnight' ? 'dashed' : 'solid',
          opacity: 0.65,
        }}
      />

      {/* 5. Consecrated Psychic Reading Seal Stamp - prominently on Cover and Last Page */}
      {showSeal && (
        <div
          className="absolute bottom-[28px] right-[32px] z-20 opacity-85"
          title="Consecrated Esoteric Reading Seal"
        >
          <AuthenticPsychicSealStamp
            color={theme.colors.sealColor}
            sealText={theme.decorations.sealText}
            isDark={isDark}
            bgColor={theme.colors.pageBg}
          />
        </div>
      )}

      {/* 7. Clean Thematic Top Header Bar - Suppressed on Page 1 */}
      {!isCover && (
        <div
          className="absolute top-[34px] left-[46px] right-[46px] flex items-center justify-between text-[8.5pt] tracking-[0.28em] uppercase pb-2 z-10 border-b"
          style={{
            borderColor: theme.colors.headerBorder,
            color: theme.colors.headerText,
          }}
        >
          <div className="flex items-center gap-2 max-w-[300px] truncate">
            <span className="text-[7pt] text-[var(--pdf-accent)]">✦</span>
            <span
              className="font-bold tracking-[0.24em] truncate"
              style={{ fontFamily: theme.typography.headingFont }}
            >
              {effectiveBrandName}
            </span>
          </div>
          <span
            className="shrink min-w-0 max-w-[380px] truncate text-right font-medium tracking-[0.22em] opacity-90"
            style={{ fontFamily: theme.typography.headingFont }}
          >
            {headerTitle}
          </span>
        </div>
      )}

      {/* 8. Clean Thematic Bottom Footer */}
      {!isCover && (
        <div
          className={`absolute bottom-[36px] left-[46px] ${isLastPage ? 'right-[112px]' : 'right-[46px]'} flex items-center justify-between text-[8pt] tracking-[0.24em] uppercase pt-2 z-10 border-t`}
          style={{
            borderColor: theme.colors.headerBorder,
            color: theme.colors.headerText,
          }}
        >
          <span
            className="opacity-90 font-medium"
            style={{ fontFamily: theme.typography.headingFont }}
          >
            {effectiveBrandName}
          </span>
          <div className="flex items-center gap-2 opacity-80 font-serif">
            <span className="text-[8pt] text-[var(--pdf-accent)]">{theme.decorations.dividerSymbol}</span>
            <span className="tracking-[0.2em] text-[7pt]">
              FOLIO {pageNumber} OF {totalPages}
            </span>
          </div>
          <span className="tracking-widest text-[7pt] opacity-80">
            {theme.decorations.headerIcon} · {theme.name.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};


