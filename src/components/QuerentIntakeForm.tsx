import React from 'react';
import {
  Sparkles,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Store,
  HelpCircle,
  FileText,
  Palette,
  Check,
} from 'lucide-react';
import { ReadingInputs, ReadingTier, TarotCard, PdfThemeId } from '../types';
import { PDF_THEME_LIST, getPdfTheme } from '../data/pdfThemes';
import { getZodiacFromDob } from '../utils/astrology';
import { parseClientParagraph } from '../utils/clientDataParser';
import { TarotCardPicker } from './TarotCardPicker';

interface QuerentIntakeFormProps {
  inputs: ReadingInputs;
  onUpdateInputs: (updated: Partial<ReadingInputs>) => void;
  onGenerateReading: () => void;
  onClearForm?: () => void;
  onOpenApiKeyModal?: () => void;
  isLoading: boolean;
}

export const QuerentIntakeForm: React.FC<QuerentIntakeFormProps> = ({
  inputs,
  onUpdateInputs,
  onGenerateReading,
  onClearForm,
  onOpenApiKeyModal,
  isLoading,
}) => {
  const activeTier: ReadingTier = inputs.tier || 'detailed';

  // Spread cards array for TarotCardPicker
  const spreadCards: [TarotCard | null, TarotCard | null, TarotCard | null] = [
    inputs.cards?.[0] || null,
    inputs.cards?.[1] || null,
    inputs.cards?.[2] || null,
  ];

  const handleSpreadCardsUpdate = (
    newCards: [TarotCard | null, TarotCard | null, TarotCard | null]
  ) => {
    const filtered = newCards.filter((c): c is TarotCard => c !== null);
    onUpdateInputs({ cards: filtered });
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const parsedData = parseClientParagraph(val);

    const updates: Partial<ReadingInputs> = {
      clientDetails: val,
      problem: parsedData.problem || val,
    };

    if (parsedData.name) updates.name = parsedData.name;
    if (parsedData.age) updates.age = parsedData.age;
    if (parsedData.dob) {
      updates.dob = parsedData.dob;
      const detectedZodiac = getZodiacFromDob(parsedData.dob);
      if (detectedZodiac) updates.zodiacSign = detectedZodiac.name;
    }
    if (parsedData.question) {
      updates.question = parsedData.question;
      updates.agenda = parsedData.question;
    }
    if (parsedData.shopName) updates.shopName = parsedData.shopName;
    if (parsedData.topic) updates.topic = parsedData.topic;
    if (parsedData.cards && parsedData.cards.length >= 3) {
      updates.cards = parsedData.cards;
    }

    onUpdateInputs(updates);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isLoading) {
          onGenerateReading();
        }
      }}
      className="space-y-6"
    >
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#FAF7F2] border border-[#E0D7CC] rounded-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#4A3F35] text-[#FAF7F2] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#D4A373]" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4A3F35]">
              {inputs.shopName ? `${inputs.shopName} Oracle Engine` : 'Sacred Intuitive Reading Engine'}
            </h2>
            <p className="text-[11px] text-[#8C7B6A]">
              Intuitive Tarot & Numerology reading generation with calibrated page structures
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenApiKeyModal && (
            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white border border-[#E0D7CC] hover:border-[#4A3F35] text-xs font-semibold text-[#4A3F35] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#BC6C25]" />
              <span>AI Settings</span>
            </button>
          )}

          {onClearForm && (
            <button
              type="button"
              onClick={onClearForm}
              className="flex items-center gap-1 text-xs font-semibold text-[#8C7B6A] hover:text-[#4A3F35] transition-colors py-1.5 px-2.5 rounded-xs hover:bg-[#E0D7CC]/40 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* 1. Listing Title */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              01
            </span>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
                1. Listing Title (Optional or Preset)
              </label>
              <p className="text-[11px] text-[#8C7B6A]">
                The overarching theme, listing headline, or spiritual offering
              </p>
            </div>
          </div>
          <BookOpen className="w-4 h-4 text-[#BC6C25]" />
        </div>

        <input
          type="text"
          value={inputs.topic || ''}
          onChange={(e) => onUpdateInputs({ topic: e.target.value })}
          placeholder="e.g. Ancestral Psychic Reading | Spirit Guide Message, Tarot Insights (PDF)"
          className="w-full p-3.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm font-serif text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-medium"
        />
      </div>

      {/* 2. Client Details (Master Input Field) */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              02
            </span>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
                2. Client Details (Name, Birthday, Question in one paragraph, or paste from Etsy/customer message) *
              </label>
              <p className="text-[11px] text-[#8C7B6A]">
                Input or paste raw customer order note. The intelligent parser auto-detects name, birthday, age, problem, and question.
              </p>
            </div>
          </div>
          <FileText className="w-4 h-4 text-[#BC6C25]" />
        </div>

        <textarea
          rows={4}
          value={inputs.clientDetails || ''}
          onChange={handleDetailsChange}
          placeholder="e.g. Sarah Jenkins, birthday August 14, 1992. I want to know what my spirit guides have to share regarding my life path and transitions."
          className="w-full p-3.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs sm:text-sm font-sans text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-medium leading-relaxed"
        />
      </div>

      {/* 3. Reading Depth / Tier */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E0D7CC]">
          <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
            03
          </span>
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
              3. Reading Depth / Tier *
            </label>
            <p className="text-[11px] text-[#8C7B6A]">
              Choose the depth and page volume for your generated PDF reading
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'standard' as ReadingTier,
              name: 'Standard',
              pages: '14–15 PDF Pages',
              desc: 'Core questions, astrology, numerology, 3-card spread, and guidance.',
            },
            {
              id: 'detailed' as ReadingTier,
              name: 'Detailed',
              pages: '22–25 PDF Pages',
              desc: 'Dual astrology, soul urge, card visuals, subconscious blocks, and reality check.',
            },
            {
              id: 'premium' as ReadingTier,
              name: 'Premium',
              pages: '30–32 PDF Pages',
              desc: 'Full 32-page master work: talisman, locket, 7-day plan, morning/evening rituals.',
            },
          ].map((tier) => {
            const isSelected = activeTier === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onUpdateInputs({ tier: tier.id })}
                className={`p-4 rounded-xs border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#F2EDE8] border-[#4A3F35] ring-1 ring-[#4A3F35] shadow-xs'
                    : 'bg-[#FCFAF7] border-[#E0D7CC] hover:border-[#8C7B6A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm uppercase text-[#1F1914]">
                    {tier.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#4A3F35] text-white'
                        : 'bg-[#E0D7CC]/60 text-[#6B5E51]'
                    }`}
                  >
                    {tier.pages}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B5E51] leading-relaxed">
                  {tier.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Agenda / Sacred Focus (Optional) */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              04
            </span>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
                4. Agenda / Sacred Focus (Optional)
              </label>
              <p className="text-[11px] text-[#8C7B6A]">
                Key agenda topics, specific questions to address, or session focus
              </p>
            </div>
          </div>
          <HelpCircle className="w-4 h-4 text-[#BC6C25]" />
        </div>

        <textarea
          rows={2}
          value={inputs.agenda || ''}
          onChange={(e) => onUpdateInputs({ agenda: e.target.value })}
          placeholder="e.g. Core objectives, current challenges, key insights, and actionable next steps..."
          className="w-full p-3 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs font-sans text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-medium leading-relaxed"
        />
      </div>

      {/* 5. Shop / Studio Name (Optional) */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              05
            </span>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
                5. Shop / Studio Name (Optional)
              </label>
              <p className="text-[11px] text-[#8C7B6A]">
                Your brand name printed on PDF covers, headers, and certificates
              </p>
            </div>
          </div>
          <Store className="w-4 h-4 text-[#BC6C25]" />
        </div>

        <input
          type="text"
          value={inputs.shopName || ''}
          onChange={(e) => onUpdateInputs({ shopName: e.target.value })}
          placeholder="e.g. Luna & Light Tarot, Sacred Path Sanctuary, Solaris Vision Studio..."
          className="w-full p-3 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm font-serif text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-medium"
        />
      </div>

      {/* 6. Tarot Cards (TarotCardPicker) */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E0D7CC]">
          <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
            06
          </span>
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
              6. Oracle Tarot Spread Selection
            </label>
            <p className="text-[11px] text-[#8C7B6A]">
              Select 3 cards from the 78-card deck, or use Intuitive 3-Card Draw. If left unassigned, AI channels cards dynamically.
            </p>
          </div>
        </div>

        <TarotCardPicker
          cards={spreadCards}
          onUpdateCards={handleSpreadCardsUpdate}
        />
      </div>

      {/* 7. PDF Structure & Psychic Reading Theme Selection */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              07
            </span>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
                7. PDF Structure & Psychic Theme Selection
              </label>
              <p className="text-[11px] text-[#8C7B6A]">
                Select the artisanal visual structure and psychic aesthetic for your downloadable PDF:
              </p>
            </div>
          </div>
          <Palette className="w-4 h-4 text-[#BC6C25]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PDF_THEME_LIST.map((theme) => {
            const isSelected = (inputs.pdfTheme || 'parchment') === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onUpdateInputs({ pdfTheme: theme.id })}
                className={`p-3.5 rounded-sm border text-left transition-all relative flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-[#BC6C25] bg-[#FCFAF7] shadow-sm ring-1 ring-[#BC6C25]'
                    : 'border-[#E0D7CC] bg-[#FAF8F5] hover:border-[#BC6C25]/50 hover:bg-white'
                }`}
              >
                {/* Top Row: Title & Badge */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-serif font-bold text-xs text-[#1F1914] leading-snug group-hover:text-[#BC6C25] transition-colors">
                      {theme.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#BC6C25] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-sans uppercase tracking-wider text-[#BC6C25] font-semibold mb-1.5">
                    {theme.subtitle}
                  </p>
                  <p className="text-[11px] text-[#6B5E51] font-sans leading-relaxed line-clamp-2 mb-3">
                    {theme.description}
                  </p>
                </div>

                {/* Bottom Row: Palette Swatch Preview */}
                <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-[10px] text-[#8C7B6A]">
                  <span className="italic font-serif">{theme.decorations.dividerSymbol} {theme.category.split(' ')[0]}</span>
                  <div className="flex items-center gap-1.5" title="Theme Palette">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: theme.swatch.bg }}
                    />
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: theme.swatch.primary }}
                    />
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: theme.swatch.accent }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Generate Reading Action Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-sm font-serif font-bold text-sm sm:text-base uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer ${
            !isLoading
              ? 'bg-[#1F1914] hover:bg-[#382E26] text-white ring-2 ring-[#BC6C25]/40 hover:ring-[#BC6C25]'
              : 'bg-[#C4B6A4]/40 text-[#8C7B6A] cursor-not-allowed border border-[#E0D7CC]'
          }`}
        >
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin text-[#D4A373]" />
              <span>Channeling Reading & Formatting Pages...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-[#D4A373]" />
              <span>
                Generate {activeTier.toUpperCase()} Reading ({activeTier === 'standard' ? '15 Pages' : activeTier === 'detailed' ? '25 Pages' : '32 Pages'})
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4A373]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
