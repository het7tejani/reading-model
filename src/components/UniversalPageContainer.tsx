import React from 'react';

interface UniversalPageContainerProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  footerText?: string;
  children: React.ReactNode;
  className?: string;
}

export const UniversalPageContainer: React.FC<UniversalPageContainerProps> = ({
  title,
  subtitle,
  footerText,
  children,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 ${className}`}
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* Top Center Title Header - NO text or eyebrow above title */}
      <div className="text-center space-y-2 pt-2 max-w-2xl mx-auto w-full">
        <h1
          className="text-[24px] font-bold text-[#1F1914] leading-tight text-center uppercase tracking-wide"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {title}
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        {subtitle && (
          <p
            className="text-[14px] italic text-[#4A3F35] leading-relaxed text-center"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Page's Center: Content vertically and horizontally centered with Times New Roman text */}
      <div
        className="my-auto w-full max-w-2xl mx-auto flex flex-col justify-center items-center text-center"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        {children}
      </div>

      {/* Bottom Center Footer / Anchor - NO page number */}
      <div className="w-full max-w-2xl mx-auto text-center border-t border-[#E8E1D5] pt-2">
        <p
          className="text-[12px] italic text-[#6B5E51]"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          {footerText || '✦ Grounded in Love, Guided by Wisdom, Anchored in Sovereignty ✦'}
        </p>
      </div>
    </div>
  );
};
