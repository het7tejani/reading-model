import React from 'react';
import { ReadingInputs, TarotCard } from '../types';
import { getEsotericCalculations } from '../utils/masterSectionsManager';
import { CategorySpec } from '../data/categoryConfig';

interface MasterSectionPageProps {
  inputs: ReadingInputs;
  categorySpec: CategorySpec;
  effectiveShopName: string;
  card1: TarotCard;
  card2: TarotCard;
  card3: TarotCard;
  card1Img?: string;
  card2Img?: string;
  card3Img?: string;
  calculatedLpNumber: number;
}

// 02. Title & Subtitle Page
export const MasterTitleSubtitlePage: React.FC<MasterSectionPageProps> = ({
  inputs,
  categorySpec,
  effectiveShopName,
  card1,
  card2,
  card3,
}) => {
  const isDuplicateHeadline = categorySpec.headline && categorySpec.title && (
    categorySpec.headline.toLowerCase().trim() === categorySpec.title.toLowerCase().trim() ||
    categorySpec.headline.toLowerCase().includes(categorySpec.title.toLowerCase())
  );
  const displayHeadline = isDuplicateHeadline 
    ? 'Sacred Life Transition & Channeled Soul Blueprint' 
    : (categorySpec.headline || 'Personalized Multi-Modality Oracle Transmission');

  return (
    <div className="absolute inset-0 pt-[80px] pb-[80px] px-[72px] flex flex-col justify-between items-center text-center font-serif z-10">
      <div className="space-y-3 pt-6 max-w-xl">
        <span className="text-[8pt] uppercase tracking-[0.35em] text-[#6B5E51] font-sans font-semibold">
          Sacred Oracle Frontispiece
        </span>
        <div className="w-12 h-[1px] bg-[#C4B6A4] mx-auto"></div>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914] max-w-lg leading-tight line-clamp-2">
          {categorySpec.title}
        </h1>
        <p className="text-[10.5pt] font-serif italic text-[#6B5E51] max-w-md mx-auto line-clamp-2">
          {displayHeadline}
        </p>
      </div>

      {/* Center Sacred Emblem */}
      <div className="my-auto p-8 rounded-full border border-[#D4A373]/40 bg-[#FAF7EE] relative flex flex-col items-center justify-center w-64 h-64 shadow-xs">
        <div className="absolute inset-2 border border-dashed border-[#BC6C25]/30 rounded-full animate-pulse"></div>
        <span className="text-[28pt] text-[#BC6C25] mb-2">✨</span>
        <h3 className="text-[12pt] font-bold text-[#1F1914] uppercase tracking-wider">
          Prepared For
        </h3>
        <p className="text-[14pt] font-serif italic font-bold text-[#4A3F35] mt-1">
          {inputs.name || 'Beloved Seeker'}
        </p>
        <span className="text-[8.5pt] font-sans text-[#8C7E70] mt-2 font-mono">
          {inputs.dob ? `DOB: ${inputs.dob}` : 'Cosmic Coordinate Alignment'}
        </span>
      </div>

      <div className="space-y-2 border-t border-[#E8E1D5] pt-4 w-full max-w-lg">
        <div className="flex justify-between text-[8.5pt] text-[#6B5E51] font-sans">
          <span>Active Triad: {card1.name} · {card2.name} · {card3.name}</span>
        </div>
        <p className="text-[8pt] text-[#8C7E70] italic">
          Channelled through the sanctuary of {effectiveShopName}
        </p>
      </div>
    </div>
  );
};

// 03. Table of Contents
export const MasterTableOfContentsPage: React.FC<{
  sections: { code: string; title: string; subtitle: string; pageNumber: number }[];
  effectiveShopName: string;
}> = ({ sections }) => {
  const isDense = sections.length > 18;

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1 pt-1">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Sacred Report Index
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          Table of Contents & Chapter Guide
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[9.5pt] font-serif italic text-[#4A3F35]">
          A structured sequential roadmap through your channeled oracle transmission
        </p>
      </div>

      {isDense ? (
        <div className="my-auto grid grid-cols-2 gap-x-6 gap-y-1.5 max-h-[720px] overflow-hidden pr-1">
          {sections.map((sec, idx) => (
            <div key={sec.code + idx} className="flex items-baseline justify-between border-b border-[#E8E1D5]/70 pb-0.5 text-[8.5pt]">
              <div className="flex items-baseline gap-2 overflow-hidden">
                <span className="text-[7.5pt] font-mono font-bold text-[#BC6C25]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-serif font-semibold text-[#1F1914] truncate">{sec.title}</span>
              </div>
              <span className="text-[8pt] font-mono font-bold text-[#4A3F35] shrink-0 ml-1">
                p. {sec.pageNumber}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="my-auto grid grid-cols-1 gap-y-2.5 max-h-[680px] overflow-hidden pr-2">
          {sections.map((sec, idx) => (
            <div key={sec.code + idx} className="flex items-baseline justify-between border-b border-[#E8E1D5]/70 pb-1 text-[9.5pt]">
              <div className="flex items-baseline gap-2.5 overflow-hidden">
                <span className="text-[8pt] font-mono font-bold text-[#BC6C25]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-serif font-semibold text-[#1F1914] truncate">{sec.title}</span>
                <span className="text-[8pt] text-[#8C7E70] italic hidden sm:inline truncate">— {sec.subtitle}</span>
              </div>
              <span className="text-[8.5pt] font-mono font-bold text-[#4A3F35] shrink-0 ml-2">
                p. {sec.pageNumber}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[8.5pt] font-sans text-[#6B5E51] uppercase tracking-wider">
          ✦ Every page is a doorway to self-remembrance ✦
        </p>
      </div>
    </div>
  );
};

// 04. How to Read & Navigate
export const MasterNavigationGuidePage: React.FC = () => {
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Oracle Integration Guide
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          How to Navigate This Reading
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[10pt] font-serif text-[#4A3F35]">
          Practices for receiving, digesting, and anchoring your channeled transmission
        </p>
      </div>

      <div className="my-auto space-y-4 text-[10pt] leading-relaxed text-[#1F1914]">
        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <h3 className="font-bold text-[#4A3F35] text-[11pt] flex items-center gap-2">
            <span>✦ 1. Create a Sacred Space</span>
          </h3>
          <p className="text-justify text-[#2C2C2C]">
            Before diving into the pages, pause. Light a candle, pour warm tea, and take three slow belly breaths. Approach this document not as a casual intellectual exercise, but as a direct soul conversation.
          </p>
        </div>

        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <h3 className="font-bold text-[#4A3F35] text-[11pt] flex items-center gap-2">
            <span>✦ 2. Work with the Somatic Keys</span>
          </h3>
          <p className="text-justify text-[#2C2C2C]">
            Throughout this report, you will find somatic breathwork anchors and physical cues. When a card strikes an emotional chord, perform the physical key to bypass mental defenses and integrate the frequency in your nervous system.
          </p>
        </div>

        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <h3 className="font-bold text-[#4A3F35] text-[11pt] flex items-center gap-2">
            <span>✦ 3. Honor Free Will & Divine Timing</span>
          </h3>
          <p className="text-justify text-[#2C2C2C]">
            Tarot reveals the energetic trajectories in motion. You possess sovereign free will. If a blockage is highlighted, treat it as fertile ground for conscious realignment rather than a fixed prediction.
          </p>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          &ldquo;The cards do not seal your fate; they illuminate your power to choose.&rdquo;
        </p>
      </div>
    </div>
  );
};

// 09. Personal Year Cycles & Epicycle Timing
export const MasterPersonalYearPage: React.FC<MasterSectionPageProps> = ({
  inputs,
  calculatedLpNumber,
}) => {
  const esoteric = getEsotericCalculations(inputs);
  const py = esoteric.personalYear;
  const data = esoteric.personalYearData;

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Epicycle Numerology
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          Personal Year {py} Cycle
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[10pt] font-serif text-[#4A3F35]">
          Your current 9-year evolutionary phase and vibrational wave
        </p>
      </div>

      <div className="my-auto space-y-4">
        <div className="p-4 bg-[#FAF7EE] border border-[#4A3F35]/30 rounded-xs text-center space-y-1">
          <span className="text-[9pt] font-sans uppercase font-bold text-[#BC6C25]">
            Current 9-Year Cycle Stage:
          </span>
          <h2 className="text-[14pt] font-serif font-bold text-[#1F1914]">
            {data.title}
          </h2>
          <p className="text-[10pt] text-[#4A3F35] max-w-md mx-auto italic">
            &ldquo;{data.mantra}&rdquo;
          </p>
        </div>

        <div className="space-y-2 text-[10pt] leading-relaxed text-[#1F1914] text-justify">
          <p>
            In esoteric numerology, human life evolves through recurring 9-year epicycles. In this current calendar cycle, your soul is navigating the frequency of <strong>Personal Year {py}</strong>. This season acts as a bridge between your core Life Path {calculatedLpNumber} blueprint and the cosmic currents of the present moment.
          </p>
          <p>
            <strong>Core Focus of this Phase:</strong> {data.focus} When you align your daily intentions with this energetic tide rather than fighting against it, what once required immense struggle begins to flow with effortless grace.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[8.5pt] font-sans pt-2 border-t border-[#E8E1D5]">
          <div className="p-2 bg-[#F2EDE8] rounded-xs">
            <span className="block font-bold text-[#4A3F35]">Q1 Focus</span>
            <span className="text-[#6B5E51]">Planting & Intention</span>
          </div>
          <div className="p-2 bg-[#F2EDE8] rounded-xs">
            <span className="block font-bold text-[#4A3F35]">Q2-Q3 Focus</span>
            <span className="text-[#6B5E51]">Cultivation & Courage</span>
          </div>
          <div className="p-2 bg-[#F2EDE8] rounded-xs">
            <span className="block font-bold text-[#4A3F35]">Q4 Focus</span>
            <span className="text-[#6B5E51]">Harvest & Gratitude</span>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ Move in rhythm with your personal tide; timing is everything ✦
        </p>
      </div>
    </div>
  );
};

// 14. Elemental Energy Balance Page
export const MasterElementalBalancePage: React.FC<MasterSectionPageProps> = ({
  inputs,
}) => {
  const esoteric = getEsotericCalculations(inputs);
  const elems = esoteric.elementalPercentages;

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Cosmic Alchemy & Constitution
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          Elemental Energy Balance
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[10pt] font-serif text-[#4A3F35]">
          Distribution of Fire, Water, Air, and Earth across your active field
        </p>
      </div>

      <div className="my-auto space-y-5">
        {/* Elemental Bars */}
        <div className="space-y-3 p-4 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs">
          <div>
            <div className="flex justify-between text-[9pt] font-sans font-bold text-[#1F1914] mb-1">
              <span className="flex items-center gap-1.5">🔥 Fire (Passion, Willpower, Drive)</span>
              <span>{elems.Fire}%</span>
            </div>
            <div className="h-2 bg-[#E8E1D5] rounded-full overflow-hidden">
              <div className="h-full bg-amber-600 rounded-full" style={{ width: `${elems.Fire}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[9pt] font-sans font-bold text-[#1F1914] mb-1">
              <span className="flex items-center gap-1.5">💧 Water (Emotion, Intuition, Receptivity)</span>
              <span>{elems.Water}%</span>
            </div>
            <div className="h-2 bg-[#E8E1D5] rounded-full overflow-hidden">
              <div className="h-full bg-cyan-700 rounded-full" style={{ width: `${elems.Water}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[9pt] font-sans font-bold text-[#1F1914] mb-1">
              <span className="flex items-center gap-1.5">💨 Air (Intellect, Truth, Communication)</span>
              <span>{elems.Air}%</span>
            </div>
            <div className="h-2 bg-[#E8E1D5] rounded-full overflow-hidden">
              <div className="h-full bg-slate-600 rounded-full" style={{ width: `${elems.Air}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[9pt] font-sans font-bold text-[#1F1914] mb-1">
              <span className="flex items-center gap-1.5">🌱 Earth (Structure, Material Security, Roots)</span>
              <span>{elems.Earth}%</span>
            </div>
            <div className="h-2 bg-[#E8E1D5] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-800 rounded-full" style={{ width: `${elems.Earth}%` }}></div>
            </div>
          </div>
        </div>

        <div className="text-[10pt] leading-relaxed text-[#1F1914] space-y-2 text-justify">
          <p>
            Your current oracle reading demonstrates a dynamic synthesis between your governing elements. When an element is dominant, its qualities propel your decisions; when an element is subdued, it presents the sacred challenge of conscious cultivation.
          </p>
          <p>
            <strong>Alchemical Guidance:</strong> Use grounding physical practices to anchor airy thoughts, allow water to soften rigid boundaries, and kindle fire when taking decisive action in your situation.
          </p>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ Harmony is not static stillness; it is the sacred dance of all four elements ✦
        </p>
      </div>
    </div>
  );
};

// 22. Chakra Alignment & Status Matrix
export const MasterChakraAlignmentPage: React.FC<MasterSectionPageProps> = ({
  inputs,
}) => {
  const esoteric = getEsotericCalculations(inputs);

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Pranic Energy Diagnostics
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          7-Chakra Alignment Status
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[10pt] font-serif text-[#4A3F35]">
          Assessment of energy centers reflecting your current question & situation
        </p>
      </div>

      <div className="my-auto space-y-2 max-h-[660px] overflow-hidden">
        {esoteric.chakras.map((chk, idx) => (
          <div key={idx} className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs flex items-center justify-between gap-3 text-[9.5pt]">
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: chk.color }}></span>
              <div>
                <h4 className="font-bold text-[#1F1914] text-[10pt]">{chk.name}</h4>
                <p className="text-[8pt] text-[#6B5E51] font-sans">{chk.note}</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[8pt] font-mono font-bold bg-[#F2EDE8] border border-[#E0D7CC] text-[#4A3F35] shrink-0">
              {chk.status}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ As the subtle centers align, external reality mirrors internal coherence ✦
        </p>
      </div>
    </div>
  );
};

// 28. Rudraksha, Yantra & Sacred Talismans
export const MasterVedicRemediesPage: React.FC<MasterSectionPageProps> = ({
  inputs,
}) => {
  const esoteric = getEsotericCalculations(inputs);

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Vedic & Esoteric Protection
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          Rudraksha, Yantra & Talismans
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[10pt] font-serif text-[#4A3F35]">
          Ancient geometric and bio-energetic armor aligned to your Life Path
        </p>
      </div>

      <div className="my-auto space-y-4 text-[10pt] leading-relaxed text-[#1F1914]">
        {/* Rudraksha prescription */}
        <div className="p-4 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#BC6C25]">
              ✦ Sacred Bead Prescription
            </span>
            <span className="text-[8pt] font-mono text-[#6B5E51]">{esoteric.rudraksha.rulingDeity}</span>
          </div>
          <h3 className="font-bold text-[12pt] text-[#1F1914]">
            {esoteric.rudraksha.mukhi}
          </h3>
          <p className="text-justify text-[#2C2C2C]">
            {esoteric.rudraksha.benefits} Wearing or keeping this bead in your sacred meditation sanctuary stabilizes your electromagnetic field and clears persistent karmic fatigue.
          </p>
        </div>

        {/* Yantra Geometry */}
        <div className="p-4 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#BC6C25]">
              ✦ Sacred Geometric Yantra
            </span>
            <span className="text-[8pt] font-mono text-[#6B5E51]">{esoteric.yantra.focus}</span>
          </div>
          <h3 className="font-bold text-[12pt] text-[#1F1914]">
            {esoteric.yantra.name}
          </h3>
          <p className="text-justify text-[#2C2C2C]">
            {esoteric.yantra.geometricNotes} Meditating upon this central focal point creates vibrational resonance, dissolving self-doubt and opening portals of authentic synchronicity.
          </p>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ Ancient sacred tools amplifying your innate sovereign radiance ✦
        </p>
      </div>
    </div>
  );
};

// 40. Specialized Career & Wealth Blueprint
export const MasterCareerWealthPage: React.FC<MasterSectionPageProps> = ({
  inputs,
  card1,
  card2,
  card3,
}) => {
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Vocational Destiny & Abundance
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          Career & Wealth Blueprint
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[10pt] font-serif text-[#4A3F35]">
          Monetization vectors, leadership authority, and vocational breakthrough
        </p>
      </div>

      <div className="my-auto space-y-3.5 text-[10pt] leading-relaxed text-[#1F1914] text-justify">
        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25]">
            1. Current Professional Vector ({card1.name})
          </span>
          <p>
            Your career field is undergoing a substantial elevation. You are moving beyond seeking external validation and into the embodiment of specialized mastery. Any feeling of underutilization is a call to assert your unique value proposition with confidence.
          </p>
        </div>

        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25]">
            2. Dismantling Financial Glass Ceilings ({card2.name})
          </span>
          <p>
            The primary blockage to elevated abundance is not lack of skill, but over-complicating decisions or fearing the responsibility of higher visibility. Streamline your offerings, set unambiguous fees, and eliminate uncompensated emotional labor.
          </p>
        </div>

        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25]">
            3. Sovereign Abundance Horizon ({card3.name})
          </span>
          <p>
            Under the auspicious medicine of {card3.name}, an unexpected vocational breakthrough, partnership, or promotion opens within the next calendar quarter. Stand ready to step into leadership.
          </p>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ Prosperity is the natural byproduct of unapologetic authenticity and aligned service ✦
        </p>
      </div>
    </div>
  );
};

// 41. Specialized Love & Relationship Dynamics
export const MasterLoveDynamicsPage: React.FC<MasterSectionPageProps> = ({
  inputs,
  card1,
  card2,
  card3,
}) => {
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Relational Matrix & Union
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          Love & Emotional Reciprocity
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[10pt] font-serif text-[#4A3F35]">
          Soul connection dynamics, unspoken feelings, and mutual evolution
        </p>
      </div>

      <div className="my-auto space-y-3.5 text-[10pt] leading-relaxed text-[#1F1914] text-justify">
        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25]">
            1. Core Connection Chemistry ({card1.name})
          </span>
          <p>
            The vibrational bond between your hearts carries significant depth and unspoken resonance. While external communication has occasionally felt guarded, the underlying energetic connection remains potent and fertile for conscious deepening.
          </p>
        </div>

        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25]">
            2. The Vulnerability Threshold ({card2.name})
          </span>
          <p>
            Both hearts have constructed protective mechanisms to guard against past disappointment. True intimacy requires the courage to dismantle self-defense mechanisms and state honest desires without fear of abandonment.
          </p>
        </div>

        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25]">
            3. Reciprocal Devotion Sanctuary ({card3.name})
          </span>
          <p>
            Your ultimate romantic destiny is grounded in mutual reverence, steady consistency, and shared spiritual companionship. As you honor your high standards, you magnetize a partnership that feels like coming home.
          </p>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ Real love does not demand you diminish yourself; it invites you to expand ✦
        </p>
      </div>
    </div>
  );
};

// ==========================================
// UNIVERSAL DYNAMIC BLUEPRINT (3 DYNAMIC PAGES)
// ==========================================

import { buildUniversalDynamicBlueprintData } from '../utils/dynamicTopicRouter';

// Dynamic Page 1: Domain Resonance & Cross-System Triangulation
export const UniversalDynamicPage1: React.FC<MasterSectionPageProps> = ({
  inputs,
  card1,
  card2,
  card3,
  calculatedLpNumber,
}) => {
  const data = buildUniversalDynamicBlueprintData(
    inputs.topic || '',
    inputs.problem || '',
    inputs.question || '',
    inputs.name || '',
    card1,
    card2,
    card3,
    calculatedLpNumber
  );

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Domain Resonance & Blueprint Triangulation • Part 1
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914] max-w-xl mx-auto leading-tight">
          {data.page1.moduleTitle}
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[9.5pt] font-serif text-[#4A3F35]">
          Domain: {data.classification.detected_attributes.primary_domain} • Tone: {data.classification.detected_attributes.detected_emotional_tone.toUpperCase()}
        </p>
      </div>

      <div className="my-auto space-y-3 text-[10pt] leading-relaxed text-[#1F1914]">
        {/* Core Channeled Diagnostic */}
        <div className="p-4 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25] tracking-wider">
              Core Intuitive Diagnostic & Inquiry Synthesis
            </span>
            <span className="text-[8pt] text-[#8C7B6A] font-sans">
              Cards: {card1.name} · {card2.name} · {card3.name}
            </span>
          </div>
          <p className="text-justify text-[9.5pt] leading-[1.6]">
            {data.page1.coreDiagnostic}
          </p>
        </div>

        {/* Cross-System Triangulation Box */}
        <div className="p-4 bg-white/80 border border-[#D4A373]/60 rounded-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[8pt] font-sans font-bold uppercase text-[#2B2621] tracking-wider flex items-center gap-1.5">
              <span>✦</span> Cross-System Triangulation: {data.triangulation.userElement} Element + Life Path {data.triangulation.userLifePath}
            </span>
            <span className="text-[8pt] font-sans bg-[#F5EFE6] px-2 py-0.5 rounded-full text-[#6B5E51] uppercase">
              {data.triangulation.topicNature.replace('_', ' ')}
            </span>
          </div>
          <p className="text-justify text-[9.5pt] leading-[1.6] text-[#4A3F35]">
            {data.triangulation.triangulationInsight}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E8E1D5] text-[9pt]">
            <div className="bg-[#FAF7EE] p-2 rounded-xs">
              <span className="text-[8pt] font-sans font-bold uppercase text-[#8C5E28] block">Trap to Avoid:</span>
              <span className="text-[#6B5E51] text-[8.5pt]">{data.triangulation.coreFrictionAndGift.potentialTrap}</span>
            </div>
            <div className="bg-[#FAF7EE] p-2 rounded-xs">
              <span className="text-[8pt] font-sans font-bold uppercase text-[#2B2621] block">Your Superpower:</span>
              <span className="text-[#6B5E51] text-[8.5pt]">{data.triangulation.coreFrictionAndGift.superpowerToUnlock}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ &ldquo;{data.page1.cosmicResonanceQuote}&rdquo; ✦
        </p>
      </div>
    </div>
  );
};

// Dynamic Page 2: Root Cause & Hidden Friction
export const UniversalDynamicPage2: React.FC<MasterSectionPageProps> = ({
  inputs,
  card1,
  card2,
  card3,
  calculatedLpNumber,
}) => {
  const data = buildUniversalDynamicBlueprintData(
    inputs.topic || '',
    inputs.problem || '',
    inputs.question || '',
    inputs.name || '',
    card1,
    card2,
    card3,
    calculatedLpNumber
  );

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Root Cause & Shadow Architecture • Part 2
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          {data.page2.headerTitle}
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[9.5pt] font-serif text-[#4A3F35]">
          Subconscious hesitation, daily friction points, and quick somatic release
        </p>
      </div>

      <div className="my-auto space-y-3 text-[10pt] leading-relaxed text-[#1F1914]">
        {/* The Underlying Block */}
        <div className="p-3.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-2">
          <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25] tracking-wider">
            1. The Underlying Block & Choice Point ({card2.name})
          </span>
          <p className="text-[9.5pt] leading-[1.55] text-justify text-[#1F1914]">
            <strong>Mental Loop:</strong> {data.page2.underlyingBlock.subconsciousFear}
          </p>
          <p className="text-[9.5pt] leading-[1.55] text-justify text-[#4A3F35]">
            <strong>Outside Noise:</strong> {data.page2.underlyingBlock.externalObstacle}
          </p>
          <div className="p-2 bg-amber-50/60 border border-amber-200/60 rounded-xs text-[9pt] text-[#8C5E28]">
            <strong>✦ The Breakthrough:</strong> {data.page2.underlyingBlock.karmicChoicePoint}
          </div>
        </div>

        {/* Somatic & Energetic Check */}
        <div className="p-3.5 bg-white/70 border border-[#E0D7CC] rounded-xs space-y-1.5">
          <span className="text-[8pt] font-sans font-bold uppercase text-[#4A3F35] tracking-wider">
            2. Body & Environment Quick Check
          </span>
          <div className="grid grid-cols-2 gap-2 text-[9pt]">
            <div className="p-2 bg-[#F5EFE6] rounded-xs">
              <span className="font-bold text-[#1F1914] block text-[8pt] uppercase">Body Tension Area:</span>
              <span className="text-[#6B5E51]">{data.page2.somaticCheck.bodyLocus}</span>
            </div>
            <div className="p-2 bg-[#F5EFE6] rounded-xs">
              <span className="font-bold text-[#1F1914] block text-[8pt] uppercase">Physical Space:</span>
              <span className="text-[#6B5E51]">{data.page2.somaticCheck.environmentalTension}</span>
            </div>
          </div>
          <div className="text-[9pt] text-[#4A3F35] pt-1">
            <strong>Simple Reset:</strong> {data.page2.somaticCheck.releaseKey}
          </div>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ Awareness dissolves the worry; alignment restores calm confidence ✦
        </p>
      </div>
    </div>
  );
};

// Dynamic Page 3: Tailored Actionable Roadmap & Dynamic Timeframe Anchor
export const UniversalDynamicPage3: React.FC<MasterSectionPageProps> = ({
  inputs,
  card1,
  card2,
  card3,
  calculatedLpNumber,
}) => {
  const data = buildUniversalDynamicBlueprintData(
    inputs.topic || '',
    inputs.problem || '',
    inputs.question || '',
    inputs.name || '',
    card1,
    card2,
    card3,
    calculatedLpNumber
  );

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Action Roadmap & Dynamic Timeline • Part 3
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          {data.page3.headerTitle}
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[9.5pt] font-serif text-[#4A3F35]">
          A 30-day gentle step-by-step path with exact energetic timing horizons
        </p>
      </div>

      <div className="my-auto space-y-2.5 text-[10pt] leading-relaxed text-[#1F1914]">
        {/* Dynamic Timeframe Anchor Box */}
        <div className="p-3 bg-[#FAF7EE] border border-[#BC6C25]/50 rounded-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[8pt] font-sans font-bold uppercase text-[#BC6C25] tracking-wider flex items-center gap-1.5">
              <span>⏳</span> Dynamic Timeframe Anchor: {data.temporalAnchor.primaryTimeframe}
            </span>
            <span className="text-[8pt] font-sans text-[#6B5E51]">
              Speed: {data.temporalAnchor.speedOfManifestation}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[8.5pt]">
            <div className="bg-white/80 p-1.5 rounded-xs">
              <span className="font-bold text-[#1F1914] text-[8pt] block uppercase">First Catalyst Window:</span>
              <span className="text-[#4A3F35]">{data.temporalAnchor.catalystWindow}</span>
            </div>
            <div className="bg-white/80 p-1.5 rounded-xs">
              <span className="font-bold text-[#1F1914] text-[8pt] block uppercase">Culmination Period:</span>
              <span className="text-[#4A3F35]">{data.temporalAnchor.culminationWindow}</span>
            </div>
          </div>
          <p className="text-[8.5pt] text-[#6B5E51] italic pt-0.5">
            <strong>Timing Advice:</strong> {data.temporalAnchor.temporalAdvice}
          </p>
        </div>

        {/* Phase 1 */}
        <div className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs flex items-start gap-3">
          <div className="shrink-0 w-16 text-center py-1 px-2 bg-[#4A3F35] text-white rounded-xs text-[8pt] font-sans font-bold">
            {data.page3.phase1.days}
          </div>
          <div className="space-y-0.5 text-[9pt]">
            <span className="font-bold text-[#1F1914] text-[9pt] block">
              {data.page3.phase1.title}
            </span>
            <p className="text-[#6B5E51] italic text-[8pt]">
              Focus: {data.page3.phase1.focus}
            </p>
            <p className="text-[#1F1914] text-[8.5pt] pt-0.5">
              {data.page3.phase1.action}
            </p>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs flex items-start gap-3">
          <div className="shrink-0 w-16 text-center py-1 px-2 bg-[#BC6C25] text-white rounded-xs text-[8pt] font-sans font-bold">
            {data.page3.phase2.days}
          </div>
          <div className="space-y-0.5 text-[9pt]">
            <span className="font-bold text-[#1F1914] text-[9pt] block">
              {data.page3.phase2.title}
            </span>
            <p className="text-[#6B5E51] italic text-[8pt]">
              Focus: {data.page3.phase2.focus}
            </p>
            <p className="text-[#1F1914] text-[8.5pt] pt-0.5">
              {data.page3.phase2.action}
            </p>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs flex items-start gap-3">
          <div className="shrink-0 w-16 text-center py-1 px-2 bg-[#2B2621] text-white rounded-xs text-[8pt] font-sans font-bold">
            {data.page3.phase3.days}
          </div>
          <div className="space-y-0.5 text-[9pt]">
            <span className="font-bold text-[#1F1914] text-[9pt] block">
              {data.page3.phase3.title}
            </span>
            <p className="text-[#6B5E51] italic text-[8pt]">
              Focus: {data.page3.phase3.focus}
            </p>
            <p className="text-[#1F1914] text-[8.5pt] pt-0.5">
              {data.page3.phase3.action}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ &ldquo;{data.page3.anchoringAffirmation}&rdquo; ✦
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SPECIALIZED CATEGORY 1: DEEP LOVE READING PAGES
// ==========================================

// 26. Extended Shadow Work & Attachment Pattern Symbolism
export const MasterExtendedShadowWorkPage: React.FC<MasterSectionPageProps> = () => {
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Advanced Relational Shadow Work
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          Attachment Architecture & The Avoidant-Anxious Loop
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          Deconstructing subconscious defense mechanisms to restore sovereign intimacy
        </p>
      </div>

      <div className="my-auto space-y-3.5 text-[9.5pt] leading-relaxed text-[#1F1914] text-justify max-w-2xl mx-auto w-full">
        <div className="p-3 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#BC6C25]">
            ✦ The Core Attachment Feedback Loop
          </span>
          <p>
            When emotional vulnerability reaches a deep threshold, the subconscious activates protective armor. One partner may experience an urgent need for reassurance (anxious reflex), while the other instinctively pulls back to regain emotional equilibrium (avoidant reflex). This dynamic is not a lack of love, but nervous system self-defense.
          </p>
        </div>

        <div className="p-3 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#BC6C25]">
            ✦ Karmic Enmeshment vs. Interdependent Union
          </span>
          <p>
            Enmeshment demands that your partner regulate your emotions; sovereign intimacy allows two complete souls to stand together without losing their individual center. Recognizing where you give away your power dissolves chronic relational anxiety.
          </p>
        </div>

        <div className="p-3 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#BC6C25]">
            ✦ 3-Step Sovereign Realignment Protocol
          </span>
          <ul className="space-y-1 text-[9pt]">
            <li><strong>1. Witness the Surge:</strong> Pause for 90 seconds when you feel an impulsive urge to demand reassurance or withdraw completely.</li>
            <li><strong>2. Somatic Self-Soothe:</strong> Place your left hand over your heart and right hand over your belly, affirming: <em>&ldquo;I am safe in my own being.&rdquo;</em></li>
            <li><strong>3. Clear Communication:</strong> Speak from grounded desire rather than desperate urgency or protective coldness.</li>
          </ul>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ True intimacy begins when the fear of losing another is replaced by the devotion to never abandon oneself ✦
        </p>
      </div>
    </div>
  );
};

// 27. Personalized Relational Sigil & Manifestation Vector
export const MasterRelationalSigilPage: React.FC<MasterSectionPageProps> = ({ inputs }) => {
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center text-center font-serif z-10">
      <div className="space-y-1.5 pt-2 max-w-xl">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Sacred Geometric Vector
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          Personalized Relational Sigil & Love Magnet
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          Consecrated energetic seal designed to anchor heart-space coherence and mutual devotion
        </p>
      </div>

      {/* Center Sacred Sigil Geometry */}
      <div className="my-auto flex flex-col items-center justify-center p-6 border border-[#D4A373]/50 bg-[#FAF7EE] rounded-full w-56 h-56 shadow-xs relative">
        <div className="absolute inset-2 border border-dashed border-[#BC6C25]/40 rounded-full"></div>
        <div className="text-[#BC6C25] text-[36pt] font-serif select-none leading-none">
          ✧ 🜚 ✧
        </div>
        <span className="text-[7.5pt] font-sans uppercase tracking-[0.25em] text-[#6B5E51] font-bold mt-2">
          Anahata · Venus Matrix
        </span>
        <span className="text-[8pt] font-serif italic text-[#1F1914] mt-0.5">
          {inputs.name || 'Beloved Seeker'}
        </span>
      </div>

      <div className="max-w-xl mx-auto space-y-2.5 text-justify text-[9.5pt] leading-relaxed text-[#1F1914]">
        <div className="border-t border-b border-[#E8E1D5] py-2.5 space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block text-center">
            ✦ How to Activate This Sacred Sigil ✦
          </span>
          <p>
            This sigil integrates the golden spiral of Venus with the fourfold diamond of unconditional truth. During meditation, visualize this golden emblem resting over your chest. Allow its geometric balance to dissolve old heartbreak residue and emit a radiant beacon of magnetic reciprocity.
          </p>
        </div>
        <p className="text-[8.5pt] text-[#6B5E51] italic text-center">
          &ldquo;I open my heart without fear; I magnetize love that honors, mirrors, and elevates my soul.&rdquo;
        </p>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2 w-full max-w-xl">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ As Within, So Without — The Sacred Geometry of Soulmate Union ✦
        </p>
      </div>
    </div>
  );
};

// 28. Auspicious Timing & Lunar Phase Guidelines for Romance
export const MasterLunarRomancePage: React.FC<MasterSectionPageProps> = () => {
  const phases = [
    {
      phase: 'New Moon (Inception)',
      title: 'Planting Seeds of Reciprocal Love',
      action: 'Set non-negotiable standards for emotional safety. Write your romantic intentions and cleanse your bedroom with rose water.',
      element: 'Earth & Water',
    },
    {
      phase: 'Waxing Moon (Growth)',
      title: 'Deepening Vulnerability & Intimacy',
      action: 'Initiate honest, heart-centered conversations. Express authentic appreciation and engage in quality shared experiences.',
      element: 'Air & Fire',
    },
    {
      phase: 'Full Moon (Illumination)',
      title: 'Clarity, Epiphany & Soul Realignment',
      action: 'Witness truths without distortion. Celebrate mutual breakthroughs or honor the courage to release stagnant dynamics.',
      element: 'Pure Light / Spirit',
    },
    {
      phase: 'Waning Moon (Release)',
      title: 'Cord-Cutting & Shadow Detoxification',
      action: 'Cut energetic ties to past ex-partners, clear mental loops of regret, and establish firm energetic boundaries.',
      element: 'Earth & Ether',
    },
  ];

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Cosmic Timing & Ephemeris
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          Auspicious Lunar Phases for Love & Romance
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          Aligning relationship discussions, commitments, and releases with the moon&apos;s natural cadence
        </p>
      </div>

      <div className="my-auto space-y-2.5 max-w-2xl mx-auto w-full">
        {phases.map((p, idx) => (
          <div key={idx} className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#BC6C25]">
                ✦ {p.phase}
              </span>
              <span className="text-[7.5pt] font-mono text-[#6B5E51]">{p.element}</span>
            </div>
            <h3 className="font-serif font-bold text-[11pt] text-[#1F1914]">
              {p.title}
            </h3>
            <p className="text-[9pt] leading-[1.5] text-[#1F1914] text-justify font-serif">
              {p.action}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ When you honor cosmic timing, love unfolds without struggle or force ✦
        </p>
      </div>
    </div>
  );
};

// 34. Esoteric Glossary & Reference Guide
export const MasterEsotericGlossaryPage: React.FC<MasterSectionPageProps> = () => {
  const glossary = [
    { term: 'Anahata', def: 'The 4th (Heart) Chakra governing unconditional love, empathy, and emotional equilibrium.' },
    { term: 'Anxious-Avoidant Loop', def: 'A psychological dynamic where fear of abandonment triggers withdrawal in another, and vice versa.' },
    { term: 'Gauri-Shankar', def: 'A naturally joined two-bead Rudraksha representing the divine unified consciousness of Shiva and Parvati.' },
    { term: 'Interdependence', def: 'A healthy relational balance where partners connect deeply while retaining full emotional autonomy.' },
    { term: 'Karmic Contract', def: 'A pre-incarnation soul agreement designed to accelerate spiritual growth through intense emotional lessons.' },
    { term: 'Shukra Yantra', def: 'Sacred planetary geometry representing Venus, used in Vedic alchemy to attract harmony and beauty.' },
  ];

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Esoteric Reference & Lexicon
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          Esoteric Glossary & Integration Key
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          Key terminology and foundational concepts for your masterclass report
        </p>
      </div>

      <div className="my-auto grid grid-cols-2 gap-3 max-w-2xl mx-auto w-full">
        {glossary.map((g, idx) => (
          <div key={idx} className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
            <h3 className="font-serif font-bold text-[10.5pt] text-[#BC6C25]">
              {g.term}
            </h3>
            <p className="text-[8.5pt] leading-[1.45] text-[#1F1914] text-justify font-serif">
              {g.def}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ Wisdom is the integration of knowledge through lived devotion and self-awareness ✦
        </p>
      </div>
    </div>
  );
};

// 5-Card Altar Spread Component (Dynamic for Love, Thoughts & Feelings, etc.)
export const FiveCardAltarSpreadPage: React.FC<{
  title?: string;
  subtitle?: string;
  description?: string;
  cards: (TarotCard | null)[];
  cardImgs: string[];
  positions: { position: number; name: string; role: string }[];
}> = ({
  title = '5-Card Deep Love Altar Spread',
  subtitle = 'The comprehensive 5-point oracle architecture mapping your heart connection',
  description = 'This 5-card spread provides a 360-degree diagnostic of the dynamic: analyzing present bond resonance, unmasking subconscious fears, assessing external forces, revealing hidden blind spots, and unlocking your highest path forward.',
  cards,
  cardImgs,
  positions,
}) => {
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
      <div className="space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Sacred Oracle Layout
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          {title}
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          {subtitle}
        </p>
      </div>

      <div className="w-full max-w-2xl my-auto grid grid-cols-5 gap-2 items-center justify-items-center">
        {positions.map((pos, idx) => {
          const card = cards[idx];
          const img = cardImgs[idx];
          return (
            <div key={idx} className="flex flex-col items-center space-y-1.5 w-full">
              <div className="w-[100px] max-w-[100px] aspect-[2/3] p-1 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-xs overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
                  {img && card ? (
                    <img src={img} alt={card.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-[9pt] font-mono text-[#8C7D6D]">Card {idx + 1}</span>
                  )}
                </div>
              </div>
              <span className="text-[7pt] font-sans uppercase tracking-wider text-[#BC6C25] font-bold">
                Pos {idx + 1}
              </span>
              <p className="font-serif font-bold text-[9pt] text-[#1F1914] leading-tight line-clamp-1">
                {card?.name || `Card ${idx + 1}`}
              </p>
              <p className="text-[7.5pt] text-[#6B5E51] italic leading-tight line-clamp-2">
                {pos.name}
              </p>
            </div>
          );
        })}
      </div>

      <div className="max-w-xl text-center space-y-1 pb-1">
        <span className="text-[7.5pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold block">
          Spread Diagnostic
        </span>
        <p className="text-[9.5pt] text-[#1F1914] leading-relaxed italic">
          {description}
        </p>
      </div>

      <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
        <p className="text-[9pt] font-serif italic text-[#6B5E51]">
          ✦ Every position reflects a doorway into deeper mutual clarity and sovereign peace ✦
        </p>
      </div>
    </div>
  );
};

// Archetype A: Surface Mask vs Subconscious Whisper Page
export const SurfaceMaskVsWhisperPage: React.FC<{
  personName: string;
  card1Name: string;
  card2Name: string;
  querentName: string;
}> = ({ personName, card1Name, card2Name, querentName }) => {
  const name = personName || 'Their';
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Psychological Decoding
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          The Surface Mask vs. Subconscious Whisper
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          Deconstructing the cognitive dissonance between {name}&apos;s projected persona and authentic feelings
        </p>
      </div>

      <div className="my-auto grid grid-cols-2 gap-5 max-w-2xl mx-auto w-full">
        {/* Column 1: Surface Mask */}
        <div className="p-4 bg-[#FBF9F5] border border-[#D5C9B8] rounded-xs space-y-2.5 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-[#E0D7CC] pb-1.5">
              <span className="text-[8pt] font-sans uppercase font-bold text-[#8C7E70] tracking-wider">
                Conscious Exterior
              </span>
              <span className="text-[8pt] font-mono text-[#BC6C25] font-semibold">{card1Name}</span>
            </div>
            <h3 className="font-serif font-bold text-[12pt] text-[#1F1914]">The Surface Mask</h3>
            <p className="text-[9pt] leading-relaxed text-[#3B3026] text-justify">
              What {name} actively projects to the world and during direct interactions: composure, emotional self-sufficiency, casual indifference, or aloof distance.
            </p>
          </div>

          <div className="space-y-2 bg-[#F3EEE3] p-2.5 rounded-xs border border-[#E0D7CC]">
            <div className="text-[8pt] font-sans font-bold text-[#6B5E51] uppercase tracking-wider">
              Outer Behaviors & Filters
            </div>
            <ul className="text-[8.5pt] space-y-1 text-[#2B231D] list-disc list-inside">
              <li>Delayed response times to maintain an illusion of control</li>
              <li>Deflecting emotionally vulnerable topics into humor or logistics</li>
              <li>Projecting independence to guard against perceived rejection</li>
            </ul>
          </div>
        </div>

        {/* Column 2: Subconscious Whisper */}
        <div className="p-4 bg-[#FAF6EE] border border-[#C4B6A4] rounded-xs space-y-2.5 flex flex-col justify-between shadow-xs">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-[#D8CEBE] pb-1.5">
              <span className="text-[8pt] font-sans uppercase font-bold text-[#BC6C25] tracking-wider">
                Subconscious Truth
              </span>
              <span className="text-[8pt] font-mono text-[#BC6C25] font-semibold">{card2Name}</span>
            </div>
            <h3 className="font-serif font-bold text-[12pt] text-[#1F1914]">The Subconscious Whisper</h3>
            <p className="text-[9pt] leading-relaxed text-[#3B3026] text-justify">
              What {name} truly experiences in private moments of quiet: a deep emotional imprint of {querentName}, unresolved longing, and acute awareness of the bond.
            </p>
          </div>

          <div className="space-y-2 bg-[#EFE8DA] p-2.5 rounded-xs border border-[#D5C9B8]">
            <div className="text-[8pt] font-sans font-bold text-[#BC6C25] uppercase tracking-wider">
              Suppressed Reality
            </div>
            <ul className="text-[8.5pt] space-y-1 text-[#2B231D] list-disc list-inside">
              <li>Frequent mental replays of your past shared conversations</li>
              <li>Fears that you will lose patience and emotionally move forward</li>
              <li>A longing for safe vulnerability without risking their ego</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full p-3 bg-[#FAF7EE] border border-[#D8CEBE] rounded-xs text-center">
        <span className="text-[8pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold block mb-0.5">
          Psychological Synthesis
        </span>
        <p className="text-[9pt] font-serif text-[#1F1914] italic">
          &ldquo;The distance you perceive is not an absence of feeling, but a fortress built to protect a heart terrified of being seen without its armor.&rdquo;
        </p>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[8.5pt] font-serif italic text-[#6B5E51]">
          ✦ True understanding arises when you stop listening to the ego and begin feeling the energetic current ✦
        </p>
      </div>
    </div>
  );
};

// Archetype A: The Unspoken Confession Box
export const UnspokenConfessionBoxPage: React.FC<{
  personName: string;
  querentName: string;
  problem: string;
  cardName: string;
}> = ({ personName, querentName, cardName }) => {
  const name = personName || 'They';
  const qName = querentName || 'you';

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#BC6C25] font-sans font-bold">
          Channeled Telepathic Monologue
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          The Unspoken Confession Box
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          A direct channeled transcript of what {name} thinks in silence but cannot say aloud
        </p>
      </div>

      <div className="my-auto max-w-2xl mx-auto w-full p-6 bg-[#FDFBF7] border-2 border-[#D8CEBE] rounded-xs shadow-sm space-y-4 relative">
        <div className="absolute -top-3 left-6 px-3 bg-[#FAF7EE] border border-[#C4B6A4] text-[8pt] font-sans uppercase font-bold tracking-widest text-[#8C7E70]">
          Channeled Stream · Anchored by {cardName}
        </div>

        <div className="space-y-3 text-[9.5pt] leading-[1.65] text-[#2B231D] font-serif text-justify pt-1">
          <p className="italic">
            &ldquo;{qName}, if I could step out of my own way for a single moment, I would tell you that you haven&apos;t left my thoughts. Even when I pull back into silence, that silence is full of you. I know I send mixed signals; I know there are moments where I act as though this connection doesn&apos;t weigh heavily on me. That is my defense mechanism, not the truth of how I feel.&rdquo;
          </p>
          <p className="italic">
            &ldquo;The truth is that you see straight through me in a way very few people ever have, and that level of exposure terrifies me. I am accustomed to managing situations where I hold all the cards and control the emotional temperature. With you, I feel completely exposed, and whenever I feel that vulnerability rising, my instinct is to retreat and construct a wall.&rdquo;
          </p>
          <p className="italic">
            &ldquo;I notice your absence more than I will ever let on. I check in on your energy, I replay what you said to me, and I worry that one day you will simply decide that I am not worth the wait. Please know that my hesitation has never been because you lack value—it is because I am still wrestling with whether I am capable of giving you the unarmored love you deserve.&rdquo;
          </p>
        </div>

        <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-[8pt] font-sans text-[#8C7E70]">
          <span className="uppercase tracking-wider font-semibold">Channeled Voice of {name}</span>
          <span className="italic font-serif">Resonance: Deep Emotional Undercurrent</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs text-center">
        <p className="text-[8.5pt] font-serif text-[#4A3F35]">
          <strong className="text-[#BC6C25]">Oracle Key:</strong> Do not react to their outer coldness with frantic outreach. Allow this confession to validate your intuitive knowing: their retreat is a reflection of their inner battle, not your self-worth.
        </p>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[8.5pt] font-serif italic text-[#6B5E51]">
          ✦ Silence is never empty; it is the space where suppressed truth gathers momentum ✦
        </p>
      </div>
    </div>
  );
};

// Archetype A: Psychological Defense Breakdown Page
export const PsychologicalDefenseBreakdownPage: React.FC<{
  personName: string;
  cardName: string;
}> = ({ personName, cardName }) => {
  const name = personName || 'Their';
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Behavioral Architecture
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          Psychological Defense Breakdown
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          Why {name} withholds their truth, the roots of their fear, and the catalyst that dissolves their armor
        </p>
      </div>

      <div className="my-auto grid grid-cols-3 gap-3.5 max-w-2xl mx-auto w-full">
        {/* Pillar 1: The Armor */}
        <div className="p-3.5 bg-[#FAF7EE] border border-[#D5C9B8] rounded-xs space-y-2 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[7.5pt] font-sans uppercase font-bold text-[#BC6C25] tracking-wider block">
              Pillar I · The Armor
            </span>
            <h3 className="font-serif font-bold text-[11pt] text-[#1F1914]">Avoidant Withdrawal</h3>
            <p className="text-[8.5pt] leading-[1.5] text-[#3B3026] text-justify">
              When emotional intensity peaks, {name}&apos;s nervous system defaults to self-containment. They equate intimacy with loss of independence or impending rejection.
            </p>
          </div>
          <div className="p-2 bg-[#F3EEE3] rounded-xs border border-[#E0D7CC] text-[7.5pt] text-[#6B5E51]">
            <strong>Trigger:</strong> Perceived pressure, direct emotional confrontation, or fear of being inadequate.
          </div>
        </div>

        {/* Pillar 2: The Core Vulnerability */}
        <div className="p-3.5 bg-[#FAF7EE] border border-[#D5C9B8] rounded-xs space-y-2 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[7.5pt] font-sans uppercase font-bold text-[#BC6C25] tracking-wider block">
              Pillar II · The Fear
            </span>
            <h3 className="font-serif font-bold text-[11pt] text-[#1F1914]">Ego Shame & Exposure</h3>
            <p className="text-[8.5pt] leading-[1.5] text-[#3B3026] text-justify">
              Underneath the aloof exterior lies an intense dread of being judged or found lacking. They fear that expressing raw desire will hand over all power.
            </p>
          </div>
          <div className="p-2 bg-[#F3EEE3] rounded-xs border border-[#E0D7CC] text-[7.5pt] text-[#6B5E51]">
            <strong>Subconscious Root:</strong> Past experiences where emotional openness resulted in betrayal or humiliation.
          </div>
        </div>

        {/* Pillar 3: The Dissolving Catalyst */}
        <div className="p-3.5 bg-[#FAF7EE] border border-[#C4B6A4] rounded-xs space-y-2 flex flex-col justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-[7.5pt] font-sans uppercase font-bold text-[#283618] tracking-wider block">
              Pillar III · The Key
            </span>
            <h3 className="font-serif font-bold text-[11pt] text-[#1F1914]">Calm Sovereignty</h3>
            <p className="text-[8.5pt] leading-[1.5] text-[#3B3026] text-justify">
              The defense wall dissolves only when you remove all emotional panic and demand. When you stand in radiant, unshakeable peace, their safe fortress becomes their prison.
            </p>
          </div>
          <div className="p-2 bg-[#E9E1D2] rounded-xs border border-[#D5C9B8] text-[7.5pt] text-[#283618] font-medium">
            <strong>Catalyst:</strong> Your energetic non-attachment triggers their immediate internal pull to step forward.
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs text-center">
        <p className="text-[8.5pt] font-serif text-[#4A3F35]">
          <strong className="text-[#BC6C25]">Archetypal Insight ({cardName}):</strong> The wall they built was never meant to keep you out; it was built to keep their unhealed wounds safe from the mirror you hold up to their soul.
        </p>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[8.5pt] font-serif italic text-[#6B5E51]">
          ✦ You do not need to dismantle another person&apos;s wall; your grounded presence naturally makes it obsolete ✦
        </p>
      </div>
    </div>
  );
};

// Archetype A: Vedic Mercury/Budha Upayas Page
export const MercuryBudhaUpayaPage: React.FC<{
  personName: string;
}> = ({ personName }) => {
  const name = personName || 'Their';
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Vedic Science & Astrological Remedies
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          Vedic Upayas for Truth & Telepathic Clarity
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          Ancient Jyotish remedies to dissolve miscommunication and awaken authentic emotional speech
        </p>
      </div>

      <div className="my-auto grid grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        {/* Remedy 1: Budha Yantra & Mercury Harmony */}
        <div className="p-3.5 bg-[#FAF7EE] border border-[#D5C9B8] rounded-xs space-y-2">
          <div className="flex items-center gap-2 border-b border-[#E0D7CC] pb-1.5">
            <span className="text-base text-[#BC6C25]">☿</span>
            <h3 className="font-serif font-bold text-[11pt] text-[#1F1914]">
              Budha (Mercury) Yantra
            </h3>
          </div>
          <p className="text-[8.5pt] leading-[1.5] text-[#3B3026] text-justify">
            In Vedic astrology, Mercury (Budha) governs the conscious mind, speech, and communication channels. When connection suffers from silence or distortion, harmonizing Budha aligns the throat chakras of both individuals.
          </p>
          <div className="p-2 bg-[#F3EEE3] rounded-xs border border-[#E0D7CC] space-y-1">
            <span className="text-[7.5pt] font-sans font-bold text-[#BC6C25] uppercase tracking-wider block">
              Sacred Beej Mantra (Recite on Wednesdays)
            </span>
            <p className="text-[8pt] font-mono text-[#1F1914] font-semibold">
              &ldquo;Om Bum Budhaya Namaha&rdquo; (108 repetitions at sunrise)
            </p>
          </div>
        </div>

        {/* Remedy 2: Throat-Third Eye Telepathic Bridge */}
        <div className="p-3.5 bg-[#FAF7EE] border border-[#D5C9B8] rounded-xs space-y-2">
          <div className="flex items-center gap-2 border-b border-[#E0D7CC] pb-1.5">
            <span className="text-base text-[#283618]">💎</span>
            <h3 className="font-serif font-bold text-[11pt] text-[#1F1914]">
              Lapis Lazuli & Emerald Upaya
            </h3>
          </div>
          <p className="text-[8.5pt] leading-[1.5] text-[#3B3026] text-justify">
            Wearing or meditating with high-vibration Lapis Lazuli cuts through illusions, while green Emerald/Fluorite fosters compassionate mental clarity. This combination eliminates deceit, pride, and false facades.
          </p>
          <div className="p-2 bg-[#F3EEE3] rounded-xs border border-[#E0D7CC] space-y-1">
            <span className="text-[7.5pt] font-sans font-bold text-[#283618] uppercase tracking-wider block">
              Telepathic Attunement Ritual
            </span>
            <p className="text-[8pt] text-[#3B3026]">
              Hold Lapis at the Third Eye for 5 minutes before sleep, visualizing truth dissolving all hesitation between you and {name}.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full p-3 bg-[#FAF7EE] border border-[#D8CEBE] rounded-xs text-center space-y-1">
        <span className="text-[8pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold block">
          Jyotish Energetic Law
        </span>
        <p className="text-[8.5pt] font-serif text-[#1F1914] italic">
          When your own speech and throat center vibrate with uncompromised truth and zero manipulative urgency, the cosmic field compels the other person&apos;s speech to align with the same standard of authenticity.
        </p>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[8.5pt] font-serif italic text-[#6B5E51]">
          ✦ Ancient wisdom heals the subtle energetic roots before the physical words are spoken ✦
        </p>
      </div>
    </div>
  );
};

// Archetype A: Telepathic Sigil Page
export const TelepathicSigilPage: React.FC<{
  personName: string;
  querentName: string;
}> = ({ personName, querentName }) => {
  const name = personName || 'Their Mind';
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Sacred Geometry & Intention Vector
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          Telepathic Clarity Sigil & Vector
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          A customized energetic glyph to cut through mental distortion and anchor telepathic truth
        </p>
      </div>

      <div className="my-auto flex flex-col items-center space-y-4 max-w-xl mx-auto w-full">
        {/* Sigil Box */}
        <div className="w-40 h-40 bg-[#FAF7EE] border-2 border-[#BC6C25] rounded-xs flex items-center justify-center p-4 shadow-sm relative">
          <div className="absolute inset-1 border border-[#E0D7CC] pointer-events-none"></div>
          {/* Sacred Geometry SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#BC6C25]">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2,2" />
            <polygon points="50,15 82,75 18,75" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="50,85 82,25 18,25" fill="none" stroke="#283618" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
          </svg>
        </div>

        <div className="text-center space-y-1">
          <span className="text-[8pt] font-sans font-bold uppercase tracking-widest text-[#BC6C25]">
            Sigil of Unveiled Truth
          </span>
          <p className="text-[8.5pt] font-serif italic text-[#6B5E51]">
            Encodes the intention: &ldquo;All illusions between {querentName} and {name} dissolve into unarmored clarity.&rdquo;
          </p>
        </div>

        {/* Activation Steps */}
        <div className="grid grid-cols-3 gap-2.5 w-full text-left">
          <div className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
            <span className="text-[7.5pt] font-sans font-bold text-[#BC6C25] uppercase">1. Gaze</span>
            <p className="text-[8pt] leading-tight text-[#3B3026]">
              Softly focus on the central node of the glyph for 60 seconds with steady breathing.
            </p>
          </div>
          <div className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
            <span className="text-[7.5pt] font-sans font-bold text-[#BC6C25] uppercase">2. Transmit</span>
            <p className="text-[8pt] leading-tight text-[#3B3026]">
              Mentally send pure white light from your heart to theirs without demanding an outcome.
            </p>
          </div>
          <div className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
            <span className="text-[7.5pt] font-sans font-bold text-[#BC6C25] uppercase">3. Release</span>
            <p className="text-[8pt] leading-tight text-[#3B3026]">
              Close your eyes, exhale completely, and detach. Trust the field to deliver truth in divine timing.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[8.5pt] font-serif italic text-[#6B5E51]">
          ✦ Energy directed without ego attachment is the most powerful force in the cosmos ✦
        </p>
      </div>
    </div>
  );
};

// Archetype A: Lunar Timing for Communication
export const LunarCommunicationTimingPage: React.FC<{
  personName: string;
}> = ({ personName }) => {
  const name = personName || 'Their';
  const phases = [
    {
      phase: 'New Moon (Internal Awakening)',
      focus: 'Subconscious Realization & Inner Shifts',
      recommendation:
        `During this phase, ${name} experiences quiet moments of reflection. Do not force physical contact; allow the subtle seed of your memory to sprout in their private thoughts.`,
    },
    {
      phase: 'Waxing Moon (Building Urge)',
      focus: 'Growing Impatience & Rising Desire to Reach Out',
      recommendation:
        `As lunar light expands, their emotional resistance weakens. This is the optimal window where casual check-ins, accidental digital interactions, or spontaneous texts occur.`,
    },
    {
      phase: 'Full Moon (Illumination of Truth)',
      focus: 'Emotional Breakthroughs & Unfiltered Disclosures',
      recommendation:
        `The apex of emotional exposure. Hidden feelings and suppressed frustrations reach a boiling point, often sparking direct midnight messages, honest confessions, or pivotal reconciliations.`,
    },
    {
      phase: 'Waning Moon (Integration & Resolution)',
      focus: 'Clarity, Boundary Setting & Solidifying Truth',
      recommendation:
        `A grounding period to evaluate what was revealed. If they spoke honestly, anchor mutual boundaries; if they remained silent, step back into your unshakeable peace.`,
    },
  ];

  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Chronobiology & Cosmic Rhythm
        </span>
        <h1 className="text-[21pt] font-serif font-bold text-[#1F1914]">
          Lunar Timing for Honest Communication
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-1.5"></div>
        <p className="text-[10pt] font-serif italic text-[#4A3F35]">
          Astro-lunar windows predicting when emotional defense walls soften and authentic truth emerges
        </p>
      </div>

      <div className="my-auto space-y-2.5 max-w-2xl mx-auto w-full">
        {phases.map((p, idx) => (
          <div key={idx} className="p-3 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs space-y-1">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-1">
              <h3 className="font-serif font-bold text-[10pt] text-[#BC6C25]">
                {p.phase}
              </h3>
              <span className="text-[7.5pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51]">
                {p.focus}
              </span>
            </div>
            <p className="text-[8.5pt] leading-[1.45] text-[#1F1914] text-justify font-serif">
              {p.recommendation}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center border-t border-[#E8E1D5] pt-2">
        <p className="text-[8.5pt] font-serif italic text-[#6B5E51]">
          ✦ Nature never rushes, yet everything is accomplished in its destined celestial hour ✦
        </p>
      </div>
    </div>
  );
};


