import React from 'react';

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

export const DaisyFlowerSvg: React.FC<{ className?: string }> = ({ className = 'w-16 h-16 text-[#6B5E51]' }) => (
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

export const DaisyStemSvg: React.FC<{ className?: string }> = ({ className = 'w-24 h-44 text-[#6B5E51]' }) => (
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

export const MinimalChakraWatermark: React.FC<{ className?: string; opacity?: number }> = ({
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
    {/* Celestial Astrology & Sacred Geometry Mandala in Exact Center */}
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

export const SacredGeometryWatermark: React.FC<{ className?: string }> = ({ className = 'w-full h-full text-[#6B5E51]' }) => (
  <MinimalChakraWatermark className={className} opacity={0.08} />
);

export const UniversalPageDecorations: React.FC<{
  pageNumber?: number;
  totalPages?: number;
  headerTitle?: string;
  className?: string;
  hideHeader?: boolean;
  brandName?: string;
}> = ({
  pageNumber,
  totalPages = 28,
  headerTitle = 'PERSONALIZED INTUITIVE GUIDANCE',
  className = '',
  hideHeader,
  brandName = 'Sacred Intuitive Studio',
}) => {
  const isCover = pageNumber === 1 || hideHeader;
  const effectiveBrandName = (brandName || '').trim() || 'Sacred Intuitive Studio';

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}>
      {/* Subtle Centered Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <MinimalChakraWatermark className="w-full h-full text-[#6B5E51]" opacity={0.06} />
      </div>

      {/* Single Clean Editorial Hairline Border */}
      <div className="absolute inset-[24px] border border-[#D8CEBE]/70 z-10" />

      {/* Minimal Corner Accents */}
      <div className="absolute top-[21px] left-[21px] text-[#A89884] opacity-60 z-10 text-[8pt] font-sans">
        +
      </div>
      <div className="absolute top-[21px] right-[21px] text-[#A89884] opacity-60 z-10 text-[8pt] font-sans">
        +
      </div>
      <div className="absolute bottom-[21px] left-[21px] text-[#A89884] opacity-60 z-10 text-[8pt] font-sans">
        +
      </div>
      <div className="absolute bottom-[21px] right-[21px] text-[#A89884] opacity-60 z-10 text-[8pt] font-sans">
        +
      </div>

      {/* Clean Editorial Top Header bar - Suppressed on Page 1 to prevent stutter-repeating brand headers */}
      {!isCover && (
        <div className="absolute top-[34px] left-[40px] right-[40px] flex items-center justify-between text-[#7A6B5B] font-sans text-[8pt] tracking-[0.26em] uppercase border-b border-[#E8E1D5] pb-2 z-10">
          <span className="font-semibold">{effectiveBrandName}</span>
          <span className="text-[#8C7D6D]">{headerTitle}</span>
        </div>
      )}

      {/* Clean Editorial Bottom Footer - Suppressed on Page 1 */}
      {!isCover && (
        <div className="absolute bottom-[36px] left-[40px] right-[40px] flex items-center justify-between text-[#7A6B5B] font-sans text-[8pt] tracking-[0.22em] uppercase border-t border-[#E8E1D5] pt-2 z-10">
          <span className="text-[#8C7D6D]">{effectiveBrandName}</span>
          <div className="flex items-center gap-2 text-[#8C7D6D]">
            <span className="text-[7pt]">✦</span>
            <span className="tracking-[0.24em] text-[8pt]">Sacred Intuitive Guidance</span>
            <span className="text-[7pt]">✦</span>
          </div>
          <span className="text-[#8C7D6D]">{pageNumber ? `Page ${pageNumber} of ${totalPages}` : 'Tarot & Numerology'}</span>
        </div>
      )}
    </div>
  );
};

