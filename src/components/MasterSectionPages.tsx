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
  return (
    <div className="absolute inset-0 pt-[80px] pb-[80px] px-[72px] flex flex-col justify-between items-center text-center font-serif z-10">
      <div className="space-y-3 pt-6">
        <span className="text-[8pt] uppercase tracking-[0.35em] text-[#6B5E51] font-sans font-semibold">
          Sacred Oracle Frontispiece
        </span>
        <div className="w-12 h-[1px] bg-[#C4B6A4] mx-auto"></div>
        <h1 className="text-[26pt] font-serif font-bold text-[#1F1914] max-w-lg leading-tight">
          {categorySpec.title}
        </h1>
        <p className="text-[11.5pt] font-serif italic text-[#6B5E51] max-w-md mx-auto">
          {categorySpec.headline}
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
  return (
    <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between font-serif z-10">
      <div className="text-center space-y-1.5 pt-2">
        <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
          Sacred Report Index
        </span>
        <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
          Table of Contents
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[10pt] font-serif text-[#4A3F35]">
          A sequential roadmap through your channeled oracle transmission
        </p>
      </div>

      <div className="my-auto grid grid-cols-1 gap-y-2.5 max-h-[680px] overflow-hidden pr-2">
        {sections.slice(0, 18).map((sec, idx) => (
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

