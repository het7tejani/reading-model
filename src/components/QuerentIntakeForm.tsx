import React, { useMemo, useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Wand2,
  ArrowRight,
  BookOpen,
  User,
  Layers,
  Compass,
  Store,
} from 'lucide-react';
import { ReadingInputs, ReadingTier, TarotCard } from '../types';
import { calculateLifePath } from '../utils/numerology';
import { TarotCardPicker } from './TarotCardPicker';
import { ZODIAC_PROFILES, getZodiacFromDob } from '../utils/astrology';
import { parseClientParagraph, autoDrawSacredCards } from '../utils/clientDataParser';
import { getTarotCardImageUrl } from '../utils/tarotImageMapper';

interface QuerentIntakeFormProps {
  inputs: ReadingInputs;
  onUpdateInputs: (updated: Partial<ReadingInputs>) => void;
  onGenerateReading: () => void;
  onClearForm?: () => void;
  onOpenApiKeyModal?: () => void;
  isLoading: boolean;
}

const DEFAULT_TITLE =
  'Ancestral Psychic Reading | Spirit Guide Message, Tarot Insights (PDF)';
const DEFAULT_CLIENT_DETAILS =
  'Calida anderson birthday may 21, 1982. I want to know what my ancestors want me to know like mom Georgette anderson and others';

export const QuerentIntakeForm: React.FC<QuerentIntakeFormProps> = ({
  inputs,
  onUpdateInputs,
  onGenerateReading,
  onClearForm,
  onOpenApiKeyModal,
  isLoading,
}) => {
  // Shop / Studio Name
  const [shopNameText, setShopNameText] = useState<string>(() => {
    return inputs.shopName || '';
  });

  // Title / Listing Title
  const [titleText, setTitleText] = useState<string>(() => {
    return inputs.topic || DEFAULT_TITLE;
  });

  // Client Details text
  const [clientDetailsText, setClientDetailsText] = useState<string>(() => {
    if (inputs.clientDetails) return inputs.clientDetails;
    if (inputs.name || inputs.problem) {
      const parts: string[] = [];
      if (inputs.name) parts.push(`Name: ${inputs.name}`);
      if (inputs.dob) parts.push(`DOB: ${inputs.dob}`);
      if (inputs.age) parts.push(`Age: ${inputs.age}`);
      if (inputs.problem) parts.push(inputs.problem);
      return parts.join(', ');
    }
    return DEFAULT_CLIENT_DETAILS;
  });

  // Agenda text
  const [agendaText, setAgendaText] = useState<string>(() => {
    return inputs.agenda || inputs.question || '';
  });

  const [showAdvancedCardPicker, setShowAdvancedCardPicker] = useState(false);

  const activeTier: ReadingTier = inputs.tier || 'detailed';
  const hasDob = Boolean(inputs.dob && inputs.dob.trim().length > 3);

  const numerology = useMemo(() => {
    return hasDob ? calculateLifePath(inputs.dob) : null;
  }, [inputs.dob, hasDob]);

  // Synchronize Shop Name change
  const handleShopNameChange = (text: string) => {
    setShopNameText(text);
    onUpdateInputs({
      shopName: text,
    });
  };

  // Synchronize Title change
  const handleTitleChange = (text: string) => {
    setTitleText(text);
    onUpdateInputs({
      topic: text,
    });
  };

  // Synchronize Client Details change
  const handleClientDetailsChange = (text: string) => {
    setClientDetailsText(text);
    const parsed = parseClientParagraph(text);

    const updatePayload: Partial<ReadingInputs> = {
      clientDetails: text,
      problem: parsed.problem || text,
    };

    if (parsed.name) updatePayload.name = parsed.name;
    if (parsed.age) updatePayload.age = parsed.age;
    if (parsed.shopName && !shopNameText) {
      setShopNameText(parsed.shopName);
      updatePayload.shopName = parsed.shopName;
    }
    if (parsed.dob) {
      updatePayload.dob = parsed.dob;
      const detectedZodiac = getZodiacFromDob(parsed.dob);
      if (detectedZodiac) {
        updatePayload.zodiacSign = detectedZodiac.name;
      }
    }

    onUpdateInputs(updatePayload);
  };

  // Synchronize Agenda change
  const handleAgendaChange = (text: string) => {
    setAgendaText(text);
    onUpdateInputs({
      agenda: text,
      question: text,
    });
  };

  // Synchronize Tier selection
  const handleTierChange = (tier: ReadingTier) => {
    onUpdateInputs({ tier });
  };

  // Auto-draw cards
  const handleAutoDrawCards = () => {
    const drawn = autoDrawSacredCards(
      titleText || 'Ancestral Spiritual Reading',
      clientDetailsText || agendaText || ''
    );
    onUpdateInputs({ cards: drawn });
  };

  // Initialize form with defaults on first render
  useEffect(() => {
    const updateInit: Partial<ReadingInputs> = {};

    if (!inputs.topic) {
      updateInit.topic = DEFAULT_TITLE;
    }
    if (!inputs.clientDetails && !inputs.name) {
      updateInit.clientDetails = DEFAULT_CLIENT_DETAILS;
      const parsed = parseClientParagraph(DEFAULT_CLIENT_DETAILS);
      if (parsed.name) updateInit.name = parsed.name;
      if (parsed.dob) updateInit.dob = parsed.dob;
      if (parsed.problem) updateInit.problem = parsed.problem;
      if (parsed.age) updateInit.age = parsed.age;
    }
    if (!inputs.cards[0] && !inputs.cards[1] && !inputs.cards[2]) {
      updateInit.cards = autoDrawSacredCards(
        DEFAULT_TITLE,
        DEFAULT_CLIENT_DETAILS
      );
    }
    if (!inputs.tier) {
      updateInit.tier = 'detailed';
    }

    if (Object.keys(updateInit).length > 0) {
      onUpdateInputs(updateInit);
    }
  }, []);

  const hasThreeCards = Boolean(
    inputs.cards[0] && inputs.cards[1] && inputs.cards[2]
  );
  const hasClientDetails = Boolean(
    clientDetailsText && clientDetailsText.trim().length > 0
  );
  const isFormValid = hasClientDetails && hasThreeCards;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid && !isLoading) {
          onGenerateReading();
        }
      }}
      className="space-y-6"
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#FAF7F2] border border-[#E0D7CC] rounded-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#4A3F35] text-[#FAF7F2] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#D4A373]" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4A3F35]">
              {shopNameText ? `${shopNameText} Reading Engine` : 'Master Psychic & Spiritual Reading Engine'}
            </h2>
            <p className="text-[11px] text-[#8C7B6A]">
              Page-by-page structured spiritual reading (40–90 words per page)
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
              onClick={() => {
                setShopNameText('');
                setTitleText('');
                setClientDetailsText('');
                setAgendaText('');
                onClearForm();
              }}
              className="flex items-center gap-1 text-xs font-semibold text-[#8C7B6A] hover:text-[#4A3F35] transition-colors py-1.5 px-2.5 rounded-xs hover:bg-[#E0D7CC]/40 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* 1. Shop / Studio Name */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              01
            </span>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
                Shop Name / Studio Branding
              </label>
              <p className="text-[11px] text-[#8C7B6A]">
                Your shop or studio brand (embossed on PDF covers, headers, and certificates)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#8C7B6A]">
            <Store className="w-3.5 h-3.5 text-[#BC6C25]" />
            <span className="hidden sm:inline font-mono text-[10px] uppercase">
              {shopNameText ? 'Custom Brand' : 'Optional (Default: Sacred Intuitive Studio)'}
            </span>
          </div>
        </div>

        <input
          type="text"
          value={shopNameText}
          onChange={(e) => handleShopNameChange(e.target.value)}
          placeholder="e.g. Luna & Light Tarot, Sacred Intuitive Studio, Mystic Willow Oracle..."
          className="w-full p-3.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm font-serif text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-medium"
        />
      </div>

      {/* 2. Title */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E0D7CC]">
          <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
            02
          </span>
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
              Title / Listing Title *
            </label>
            <p className="text-[11px] text-[#8C7B6A]">
              The reading listing title or subject line
            </p>
          </div>
        </div>

        <input
          type="text"
          value={titleText}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. Ancestral Psychic Reading | Spirit Guide Message, Tarot Insights (PDF)"
          className="w-full p-3.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-sm font-serif text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-medium"
        />
      </div>

      {/* 3. Client Details */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              03
            </span>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
                Client Details *
              </label>
              <p className="text-[11px] text-[#8C7B6A]">
                Name, DOB, situation, deceased loved ones, and specific questions
              </p>
            </div>
          </div>

          {numerology && (
            <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded bg-[#F2EDE8] text-[#4A3F35] border border-[#E0D7CC]">
              Life Path {numerology.lifePathNumber}
            </span>
          )}
        </div>

        <textarea
          rows={3}
          value={clientDetailsText}
          onChange={(e) => handleClientDetailsChange(e.target.value)}
          placeholder="e.g. Calida anderson birthday may 21, 1982. I want to know what my ancestors want me to know like mom Georgette anderson and others"
          className="w-full p-3.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs font-sans text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-medium leading-relaxed"
        />
      </div>

      {/* 4. Reading Level / Type */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E0D7CC]">
          <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
            04
          </span>
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
              Type / Reading Level *
            </label>
            <p className="text-[11px] text-[#8C7B6A]">
              Choose the depth and page volume for your channeled transmission
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
                onClick={() => handleTierChange(tier.id)}
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

      {/* 5. Agenda */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E0D7CC]">
          <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
            05
          </span>
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
              Agenda (Optional)
            </label>
            <p className="text-[11px] text-[#8C7B6A]">
              Specific goal, focus area, theme, or detailed agenda (leave blank to auto-infer)
            </p>
          </div>
        </div>

        <textarea
          rows={2}
          value={agendaText}
          onChange={(e) => handleAgendaChange(e.target.value)}
          placeholder="e.g. Specific message from Mom Georgette, breaking generational patterns, emotional peace, and guidance on the future..."
          className="w-full p-3.5 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs text-xs font-sans text-[#1F1914] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-medium"
        />
      </div>

      {/* 6. Three Cards (Tree Card) */}
      <div className="p-6 bg-white border border-[#E0D7CC] rounded-sm shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0D7CC]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-[#4A3F35] flex items-center justify-center text-xs font-serif italic text-[#4A3F35] bg-[#F2EDE8]">
              06
            </span>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-[#4A3F35] block">
                Three Cards (Tarot Anchors)
              </label>
              <p className="text-[11px] text-[#8C7B6A]">
                The triad of cards channeling spiritual, ancestral, and psychological guidance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoDrawCards}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xs bg-[#4A3F35] hover:bg-[#382E26] text-white text-xs font-bold uppercase transition-colors cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Auto-Draw</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAdvancedCardPicker(!showAdvancedCardPicker)}
              className="text-xs font-semibold text-[#8C7B6A] hover:text-[#4A3F35] underline cursor-pointer ml-1"
            >
              {showAdvancedCardPicker ? 'Hide Deck' : 'Custom Pick'}
            </button>
          </div>
        </div>

        {showAdvancedCardPicker ? (
          <TarotCardPicker
            cards={inputs.cards}
            onUpdateCards={(newCards) => onUpdateInputs({ cards: newCards })}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {inputs.cards.map((card, idx) => {
              const cardName = card?.name || (idx === 0 ? 'The High Priestess' : idx === 1 ? 'Four of Pentacles' : 'The Star');
              const cardImg = getTarotCardImageUrl(cardName);
              return (
                <div
                  key={idx}
                  className="p-3 bg-[#FCFAF7] border border-[#E0D7CC] rounded-xs flex items-center gap-3"
                >
                  <div className="w-11 h-16 rounded overflow-hidden border border-[#D8CEBE] shrink-0 bg-[#F7F3EB] shadow-xs flex items-center justify-center">
                    <img
                      src={cardImg}
                      alt={cardName}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold text-[#8C7B6A] block mb-0.5">
                      Card {idx + 1} ·{' '}
                      {idx === 0
                        ? 'Current Energy'
                        : idx === 1
                        ? 'The Blockage'
                        : 'Path Forward'}
                    </span>
                    <p className="font-serif font-bold text-sm text-[#1F1914] truncate">
                      {cardName}
                    </p>
                    <p className="text-[10px] text-[#8C7B6A] mt-0.5 truncate">
                      {card?.keywords?.slice(0, 3).join(', ') || 'Clarity, Intuition, Alignment'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-4 px-6 rounded-sm font-serif font-bold text-sm sm:text-base uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer ${
            isFormValid && !isLoading
              ? 'bg-[#1F1914] hover:bg-[#382E26] text-white ring-2 ring-[#BC6C25]/40 hover:ring-[#BC6C25]'
              : 'bg-[#C4B6A4]/40 text-[#8C7B6A] cursor-not-allowed border border-[#E0D7CC]'
          }`}
        >
          {isLoading ? (
            <>
              <Wand2 className="w-5 h-5 animate-spin text-[#D4A373]" />
              <span>Channeling Reading & Formatting Pages...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-[#D4A373]" />
              <span>
                Generate Complete Reading ({activeTier.toUpperCase()})
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4A373]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
