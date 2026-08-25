import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shuffle, RefreshCw, Layers, HelpCircle } from 'lucide-react';
import { TarotCard } from '../types';
import { TAROT_DECK } from '../data/tarotCards';
import { DeckBrowserModal } from './DeckBrowserModal';
import { getTarotCardImageUrl } from '../utils/tarotImageMapper';

interface TarotCardPickerProps {
  cards: [TarotCard | null, TarotCard | null, TarotCard | null];
  onUpdateCards: (cards: [TarotCard | null, TarotCard | null, TarotCard | null]) => void;
}

const SPREAD_SLOTS = [
  {
    index: 0,
    title: 'Current: Position 01',
    subtitle: 'Current Energy & Emotional State',
    accentColor: '#D4A373',
    textColor: 'text-[#D4A373]',
    borderColor: 'border-[#D4A373]'
  },
  {
    index: 1,
    title: 'Blockage: Position 02',
    subtitle: 'Internal or External Obstacles',
    accentColor: '#BC6C25',
    textColor: 'text-[#BC6C25]',
    borderColor: 'border-[#BC6C25]'
  },
  {
    index: 2,
    title: 'Path: Position 03',
    subtitle: 'Guidance & Path Forward',
    accentColor: '#606C38',
    textColor: 'text-[#606C38]',
    borderColor: 'border-[#606C38]'
  }
];

export const TarotCardPicker: React.FC<TarotCardPickerProps> = ({ cards, onUpdateCards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleOpenModal = (slotIndex: number) => {
    setActiveSlotIndex(slotIndex);
    setIsModalOpen(true);
  };

  const handleSelectCard = (selectedCard: TarotCard, slotIndex: number) => {
    const newCards: [TarotCard | null, TarotCard | null, TarotCard | null] = [...cards];
    newCards[slotIndex] = selectedCard;
    onUpdateCards(newCards);
  };

  const handleRandomDrawAll = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
      const selected: [TarotCard, TarotCard, TarotCard] = [shuffled[0], shuffled[1], shuffled[2]];
      onUpdateCards(selected);
      setIsShuffling(false);
    }, 450);
  };

  const handleRandomSingle = (slotIndex: number) => {
    const currentIds = cards.map((c) => c?.id).filter(Boolean);
    const available = TAROT_DECK.filter((c) => !currentIds.includes(c.id));
    const randomCard = available[Math.floor(Math.random() * available.length)] || TAROT_DECK[0];

    const newCards: [TarotCard | null, TarotCard | null, TarotCard | null] = [...cards];
    newCards[slotIndex] = randomCard;
    onUpdateCards(newCards);
  };

  return (
    <div className="space-y-4">
      {/* Header & Intuitive Draw Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F2EDE8] p-3.5 rounded-xs border border-[#E0D7CC]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#4A3F35]"></span>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#4A3F35]">
              Oracle Spread Selection
            </h3>
          </div>
          <p className="text-[11px] text-[#5C554E] mt-0.5">
            Select 3 cards from the 78-card deck, or draw intuitively via sacred shuffling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRandomDrawAll}
            disabled={isShuffling}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xs bg-[#4A3F35] hover:bg-[#2C2C2C] text-[#FCFAF7] font-semibold text-xs tracking-wider uppercase transition-all shadow-xs active:scale-95 disabled:opacity-50"
          >
            <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
            {isShuffling ? 'Shuffling Deck...' : 'Intuitive 3-Card Draw'}
          </button>
        </div>
      </div>

      {/* 3 Spread Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SPREAD_SLOTS.map((slot) => {
          const card = cards[slot.index];

          return (
            <motion.div
              key={slot.index}
              layout
              className={`relative rounded-xs border transition-all overflow-hidden flex flex-col justify-between ${
                card
                  ? 'bg-white border-[#EEEAE5] shadow-xs hover:border-[#E0D7CC]'
                  : 'bg-[#FCFAF7] border-dashed border-[#E0D7CC] hover:border-[#4A3F35]'
              }`}
            >
              {/* Position Header */}
              <div className="p-3 border-b border-[#EEEAE5] bg-[#F2EDE8]/40 flex items-center justify-between">
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${slot.textColor}`}>
                    {slot.title}
                  </div>
                  <p className="text-[10px] text-[#8C7B6A] line-clamp-1">{slot.subtitle}</p>
                </div>

                {card && (
                  <button
                    type="button"
                    title="Randomize this slot"
                    onClick={() => handleRandomSingle(slot.index)}
                    className="p-1 text-[#8C7B6A] hover:text-[#4A3F35] transition-colors rounded-xs hover:bg-[#F2EDE8]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {card ? (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2.5"
                    >
                      <div className="flex gap-3 items-start">
                        <div className="w-16 h-24 rounded-xs overflow-hidden bg-[#EFE8DC] border border-[#E0D7CC] shadow-2xs shrink-0">
                          <img
                            src={getTarotCardImageUrl(card.name)}
                            alt={card.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-base">{card.symbol}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-xs font-mono font-medium bg-[#F2EDE8] text-[#5C554E] border border-[#E0D7CC]">
                              {card.element}
                            </span>
                          </div>
                          <h4 className="text-base font-serif italic font-bold text-[#4A3F35] tracking-tight truncate">
                            {card.name}
                          </h4>
                          <p className="text-xs text-[#8C7B6A] italic font-medium truncate">
                            {card.archetype}
                          </p>
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {card.keywords.slice(0, 4).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-1.5 py-0.5 rounded-xs bg-[#F2EDE8] text-[#5C554E] border border-[#EEEAE5]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-[#5C554E] italic pt-1.5 border-t border-[#EEEAE5] line-clamp-2">
                        "{card.affirmation}"
                      </p>
                    </motion.div>
                  ) : (
                    <div className="py-7 text-center space-y-2">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#F2EDE8] border border-[#E0D7CC] flex items-center justify-center text-[#8C7B6A]">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-[#8C7B6A] italic">Position unassigned</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Footer Button */}
              <div className="p-2.5 border-t border-[#EEEAE5] bg-[#F2EDE8]/30">
                <button
                  type="button"
                  onClick={() => handleOpenModal(slot.index)}
                  className={`w-full py-1.5 px-3 rounded-xs text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    card
                      ? 'bg-white hover:bg-[#F2EDE8] text-[#4A3F35] border border-[#E0D7CC]'
                      : 'bg-[#4A3F35] hover:bg-[#2C2C2C] text-[#FCFAF7]'
                  }`}
                >
                  {card ? (
                    <>
                      <Layers className="w-3 h-3 text-[#8C7B6A]" />
                      Change Card
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-[#D4A373]" />
                      Browse 78-Card Deck
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deck Modal */}
      <DeckBrowserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectCard={handleSelectCard}
        targetSlotIndex={activeSlotIndex}
        currentCards={cards}
      />
    </div>
  );
};
