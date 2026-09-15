import React from 'react';

export const PageHeadingDivider: React.FC<{ className?: string; symbol?: string }> = ({
  className = 'my-2.5',
  symbol,
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-2.5 w-full max-w-[180px] mx-auto select-none ${className}`}
      aria-hidden="true"
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--pdf-border-strong,#C4B6A4)] to-[var(--pdf-border-subtle,#8C7B6A)]" />
      <span className="text-[var(--pdf-accent,#8C7B6A)] text-[9px] leading-none select-none tracking-normal">
        {symbol || '✦'}
      </span>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[var(--pdf-border-strong,#C4B6A4)] to-[var(--pdf-border-subtle,#8C7B6A)]" />
    </div>
  );
};

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
      style={{ fontFamily: "var(--pdf-font-body, 'EB Garamond', Georgia, serif)" }}
    >
      {/* Top Center Title Header - NO text or eyebrow above title */}
      <div className="text-center space-y-2 pt-2 max-w-2xl mx-auto w-full">
        <h1
          className="text-[24px] font-bold text-[#1F1914] leading-tight text-center uppercase tracking-wide"
          style={{ fontFamily: "var(--pdf-font-heading, 'Cinzel', serif)" }}
        >
          {title}
        </h1>
        <PageHeadingDivider className="my-2.5" />
        {subtitle && (
          <p
            className="text-[14px] italic text-[#4A3F35] leading-relaxed text-center"
            style={{ fontFamily: "var(--pdf-font-accent, 'Cormorant Garamond', serif)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Page's Center: Content vertically and horizontally centered with theme body font */}
      <div
        className="my-auto w-full max-w-2xl mx-auto flex flex-col justify-center items-center text-center"
        style={{ fontFamily: "var(--pdf-font-body, 'EB Garamond', Georgia, serif)" }}
      >
        {children}
      </div>

      {/* Bottom Center Footer / Anchor - only rendered when custom footerText provided, without dividing line */}
      {footerText && !footerText.toLowerCase().includes('grounded in') ? (
        <div className="w-full max-w-2xl mx-auto text-center pt-2">
          <p
            className="text-[12px] italic text-[#6B5E51]"
            style={{ fontFamily: "var(--pdf-font-accent, 'Cormorant Garamond', serif)" }}
          >
            {footerText}
          </p>
        </div>
      ) : (
        <div className="w-full h-3" />
      )}
    </div>
  );
};
