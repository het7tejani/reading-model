import React from 'react';

// Reusable SVG elements matching the user's PDF templates

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
  opacity = 0.10,
}) => (
  <svg
    viewBox="0 0 794 1123"
    className={className}
    fill="none"
    stroke="currentColor"
    style={{ opacity }}
  >
    {/* Minimal Sacred Chakra Mandala in Exact Center */}
    <g transform="translate(397, 561.5)">
      {/* Outer Concentric Resonant Rings */}
      <circle cx="0" cy="0" r="230" strokeWidth="0.5" strokeDasharray="4 4" />
      <circle cx="0" cy="0" r="210" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="190" strokeWidth="0.75" />
      <circle cx="0" cy="0" r="170" strokeWidth="0.5" strokeDasharray="2 3" />

      {/* 16-Petal Chakra Outer Ring */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const x = 190 * Math.cos(angle);
        const y = 190 * Math.sin(angle);
        return <circle key={`outer-dot-${i}`} cx={x} cy={y} r="2" fill="currentColor" />;
      })}

      {/* 12-Petal Lotus Layer */}
      {Array.from({ length: 12 }).map((_, i) => {
        const rot = i * 30;
        return (
          <path
            key={`petal-12-${i}`}
            d="M 0,-155 C 22,-120 28,-80 0,-50 C -28,-80 -22,-120 0,-155 Z"
            strokeWidth="0.7"
            transform={`rotate(${rot})`}
          />
        );
      })}

      {/* Intermediate Circle Ring */}
      <circle cx="0" cy="0" r="130" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="110" strokeWidth="0.6" strokeDasharray="3 3" />

      {/* 8-Petal Heart / Solar Lotus Chakra */}
      {Array.from({ length: 8 }).map((_, i) => {
        const rot = i * 45;
        return (
          <path
            key={`petal-8-${i}`}
            d="M 0,-105 C 18,-80 20,-50 0,-30 C -20,-50 -18,-80 0,-105 Z"
            strokeWidth="0.85"
            transform={`rotate(${rot})`}
          />
        );
      })}

      {/* Central Sacred Interlaced Hexagram / Triangles (Anahata / Heart Chakra Geometry) */}
      <polygon points="0,-75 64.95,37.5 -64.95,37.5" strokeWidth="0.8" />
      <polygon points="0,75 64.95,-37.5 -64.95,-37.5" strokeWidth="0.8" />

      {/* Inner Mandala Rings */}
      <circle cx="0" cy="0" r="55" strokeWidth="0.7" />
      <circle cx="0" cy="0" r="35" strokeWidth="0.85" />
      <circle cx="0" cy="0" r="18" strokeWidth="0.6" />

      {/* Central Radiant Bindu Core */}
      <circle cx="0" cy="0" r="4.5" fill="currentColor" />
      
      {/* 8-Ray Subtle Cross/Star Axis */}
      {Array.from({ length: 8 }).map((_, i) => {
        const rot = i * 45;
        return (
          <line
            key={`ray-${i}`}
            x1="0"
            y1="-220"
            x2="0"
            y2="-195"
            strokeWidth="0.7"
            transform={`rotate(${rot})`}
          />
        );
      })}
    </g>
  </svg>
);

export const SacredGeometryWatermark: React.FC<{ className?: string }> = ({ className = 'w-full h-full text-[#6B5E51]' }) => (
  <MinimalChakraWatermark className={className} opacity={0.10} />
);

export const UniversalPageDecorations: React.FC<{
  pageNumber?: number;
  totalPages?: number;
  headerTitle?: string;
  className?: string;
}> = ({ pageNumber, totalPages = 28, headerTitle = 'PERSONALIZED INTUITIVE GUIDANCE', className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}>
    {/* Minimal Centered Chakra Watermark (subtle 0.08 opacity) */}
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <MinimalChakraWatermark className="w-full h-full text-[#6B5E51]" opacity={0.08} />
    </div>

    {/* Single Clean Editorial Hairline Border (strictly no double-frames) */}
    <div className="absolute inset-[24px] border border-[#D8CEBE]/70 z-10" />

    {/* Minimal Corner Accents (clean fine crosses) */}
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

    {/* Clean Editorial Top Header bar */}
    <div className="absolute top-[34px] left-[40px] right-[40px] flex items-center justify-between text-[#7A6B5B] font-sans text-[8pt] tracking-[0.26em] uppercase border-b border-[#E8E1D5] pb-2 z-10">
      <span className="font-semibold">Daisy Medium Studio</span>
      <span className="text-[#8C7D6D]">{headerTitle}</span>
    </div>

    {/* Clean Editorial Bottom Footer */}
    <div className="absolute bottom-[36px] left-[40px] right-[40px] flex items-center justify-between text-[#7A6B5B] font-sans text-[8pt] tracking-[0.22em] uppercase border-t border-[#E8E1D5] pt-2 z-10">
      <span className="text-[#8C7D6D]">Daisy Medium Studio</span>
      <div className="flex items-center gap-2 text-[#8C7D6D]">
        <span className="text-[7pt]">✦</span>
        <span className="tracking-[0.24em] text-[8pt]">Sacred Intuitive Guidance</span>
        <span className="text-[7pt]">✦</span>
      </div>
      <span className="text-[#8C7D6D]">{pageNumber ? `Page ${pageNumber} of ${totalPages}` : 'Tarot & Numerology'}</span>
    </div>
  </div>
);

