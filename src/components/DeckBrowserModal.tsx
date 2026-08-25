import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Filter, Check } from 'lucide-react';
import { TAROT_DECK } from '../data/tarotCards';
import { TarotCard } from '../types';
import { getTarotCardImageUrl } from '../utils/tarotImageMapper';

interface DeckBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (card: TarotCard, slotIndex: number) => void;
  targetSlotIndex: number;
  currentCards: [TarotCard | null, TarotCard | null, TarotCard | null];
}

const SUITS = [
  { id: 'all', label: 'All 78 Cards' },
  { id: 'major', label: 'Major Arcana (22)' },
  { id: 'wands', label: 'Wands (Fire)' },
  { id: 'cups', label: 'Cups (Water)' },
  { id: 'swords', label: 'Swords (Air)' },
  { id: 'pentacles', label: 'Pentacles (Earth)' }
];

export const DeckBrowserModal: React.FC<DeckBrowserModalProps> = ({
  isOpen,
  onClose,
  onSelectCard,
  targetSlotIndex,
  currentCards
}) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const slotLabels = ['Position 01: Current Energy', 'Position 02: The Blockage', 'Position 03: Path Forward'];

  const filteredCards = useMemo(() => {
    return TAROT_DECK.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase())) ||
        card.archetype.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'major') return card.arcana === 'major';
      if (activeFilter === 'wands') return card.suit === 'wands';
      if (activeFilter === 'cups') return card.suit === 'cups';
      if (activeFilter === 'swords') return card.suit === 'swords';
      if (activeFilter === 'pentacles') return card.suit === 'pentacles';

      return true;
    });
  }, [search, activeFilter]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C2C]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-4xl max-h-[88vh] bg-[#FCFAF7] border border-[#E0D7CC] rounded-sm shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0D7CC] bg-[#F2EDE8]">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#8C7B6A] font-bold">
                Card Selection
              </div>
              <h3 className="text-lg font-serif italic font-bold text-[#4A3F35]">
                {slotLabels[targetSlotIndex]}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8C7B6A] hover:text-[#4A3F35] rounded-xs hover:bg-[#E0D7CC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 border-b border-[#E0D7CC] bg-[#FCFAF7] space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B6A]" />
              <input
                type="text"
                placeholder="Search card name, archetype, or keywords (e.g., 'Clarity', 'Star', 'Heartbreak')..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#E0D7CC] rounded-xs text-sm text-[#2C2C2C] placeholder:text-[#8C7B6A]/50 focus:outline-none focus:border-[#4A3F35] focus:ring-1 focus:ring-[#4A3F35]/20 font-sans"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-[#8C7B6A] mr-1 flex-shrink-0" />
              {SUITS.map((suit) => (
                <button
                  key={suit.id}
                  onClick={() => setActiveFilter(suit.id)}
                  className={`px-3 py-1.5 rounded-xs whitespace-nowrap text-[11px] font-bold uppercase tracking-wider transition-all border ${
                    activeFilter === suit.id
                      ? 'bg-[#4A3F35] text-[#FCFAF7] border-[#4A3F35] shadow-xs'
                      : 'bg-white text-[#5C554E] border-[#E0D7CC] hover:border-[#4A3F35]'
                  }`}
                >
                  {suit.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {filteredCards.length === 0 ? (
              <div className="col-span-full py-16 text-center text-[#8C7B6A]">
                <p className="text-base font-serif italic text-[#4A3F35]">No tarot cards matched your search.</p>
                <p className="text-xs text-[#8C7B6A] mt-1">Try searching for different keywords or clear the filter.</p>
              </div>
            ) : (
              filteredCards.map((card) => {
                const isSelectedInSlot = currentCards[targetSlotIndex]?.id === card.id;
                const isSelectedInOtherSlot = currentCards.some(
                  (c, idx) => idx !== targetSlotIndex && c?.id === card.id
                );

                return (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectCard(card, targetSlotIndex);
                      onClose();
                    }}
                    className={`relative p-3 rounded-xs border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelectedInSlot
                        ? 'bg-[#F2EDE8] border-2 border-[#4A3F35] shadow-xs'
                        : isSelectedInOtherSlot
                        ? 'bg-[#F2EDE8]/40 border-[#E0D7CC] opacity-60'
                        : 'bg-white border-[#EEEAE5] hover:border-[#4A3F35] hover:shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Card Image Thumbnail */}
                      <div className="w-full h-32 rounded-xs overflow-hidden mb-2 bg-[#EFE8DC] border border-[#E0D7CC] shadow-2xs">
                        <img
                          src={getTarotCardImageUrl(card.name)}
                          alt={card.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-base">{card.symbol}</span>
                        <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-xs bg-[#F2EDE8] text-[#5C554E] border border-[#E0D7CC]">
                          {card.element}
                        </span>
                      </div>

                      <h4 className="font-serif italic font-bold text-sm text-[#4A3F35] leading-tight">
                        {card.name}
                      </h4>
                      <p className="text-[10.5px] text-[#8C7B6A] italic mt-0.5 line-clamp-1 font-sans">
                        {card.archetype}
                      </p>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-[#EEEAE5]">
                      <div className="flex flex-wrap gap-1">
                        {card.keywords.slice(0, 2).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[9.5px] px-1.5 py-0.5 rounded-xs bg-[#F2EDE8] text-[#5C554E] border border-[#EEEAE5] line-clamp-1"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      {isSelectedInSlot && (
                        <div className="mt-1.5 flex items-center justify-center gap-1 text-[10.5px] font-bold text-[#4A3F35] uppercase tracking-wide">
                          <Check className="w-3 h-3" /> Selected
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-[#E0D7CC] bg-[#F2EDE8] flex items-center justify-between text-xs text-[#8C7B6A]">
            <span className="font-mono text-[11px]">Catalog: {filteredCards.length} / 78 cards</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xs bg-white hover:bg-[#E0D7CC] border border-[#E0D7CC] text-[#4A3F35] font-semibold transition-colors shadow-xs"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
