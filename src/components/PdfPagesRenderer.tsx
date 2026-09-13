import React, { useEffect } from 'react';
import { ReadingInputs, ReadingTier, TarotCard } from '../types';
import { calculateLifePath, reduceToSingleDigit, LIFE_PATH_ARCHETYPES } from '../utils/numerology';
import { parseReadingMarkdown, cleanHeadingText, cleanMarkdownText, parseTextAlignment } from '../utils/readingParser';
import { getTarotCardImageUrl } from '../utils/tarotImageMapper';
import { cleanTopicTitle } from '../data/readingTopics';
import { getCategorySpecByTopic } from '../data/categoryConfig';
import {
  TarotCoverEmblemSvg,
  TarotWelcomeEmblemSvg,
  TripleArchOverCardsSvg,
  UniversalPageDecorations,
} from './PdfPageBackgrounds';
import { UniversalPageContainer } from './UniversalPageContainer';

interface PdfPagesRendererProps {
  inputs: ReadingInputs;
  markdown: string;
  customTemplatePages?: string[] | null;
  onTotalPagesCalculated?: (count: number) => void;
  overrideTier?: ReadingTier;
  selectedSectionCodes?: string[];
}

interface PageBlock {
  key: string;
  headerTitle: string;
  render: (pageNumber: number, totalPages: number) => React.ReactNode;
}

export const PdfPagesRenderer: React.FC<PdfPagesRendererProps> = ({
  inputs,
  markdown,
  onTotalPagesCalculated,
  overrideTier,
}) => {
  const activeTier: ReadingTier = overrideTier || inputs.tier || 'detailed';
  const hasDob = Boolean(inputs.dob && inputs.dob.trim().length > 3);

  const safeTopic = cleanTopicTitle(inputs.topic || 'Future Direction & Soul Purpose');
  const categorySpec = getCategorySpecByTopic(inputs.topic || 1);

  const parsed = parseReadingMarkdown(markdown, safeTopic);
  const numerology = hasDob ? calculateLifePath(inputs.dob) : null;

  // Compute detailed calculation steps for Numerology Page (if DOB provided)
  const computeNumerologySteps = (dobStr: string) => {
    if (!dobStr) {
      return {
        monthName: 'Nov',
        monthSteps: '1 + 1 = 2',
        dayNum: '05',
        daySteps: '0 + 5 = 5',
        yearNum: '2005',
        yearSteps: '2 + 0 + 0 + 5 = 7',
        sumComponents: '2 + 5 + 7 = 14',
        finalReduction: '1 + 4 = 5 → 5 + 0 = 5',
        calculatedLifePath: 5,
      };
    }

    const cleaned = dobStr.trim();
    let month = 11;
    let day = 5;
    let year = 2005;

    if (cleaned.includes('/')) {
      const parts = cleaned.split('/');
      if (parts.length === 3) {
        month = parseInt(parts[0], 10) || 11;
        day = parseInt(parts[1], 10) || 5;
        year = parseInt(parts[2], 10) || 2005;
      }
    } else if (cleaned.includes('-')) {
      const parts = cleaned.split('-');
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          year = parseInt(parts[0], 10) || 2005;
          month = parseInt(parts[1], 10) || 11;
          day = parseInt(parts[2], 10) || 5;
        } else {
          month = parseInt(parts[0], 10) || 11;
          day = parseInt(parts[1], 10) || 5;
          year = parseInt(parts[2], 10) || 2005;
        }
      }
    } else {
      const parsedDate = new Date(cleaned);
      if (!isNaN(parsedDate.getTime())) {
        month = parsedDate.getMonth() + 1;
        day = parsedDate.getDate();
        year = parsedDate.getFullYear();
      }
    }

    const monthName = new Date(year, month - 1, day).toLocaleString('default', { month: 'short' }) || 'Nov';
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const monthDigits = monthStr.split('').map(Number);
    const monthSum = monthDigits.reduce((a, b) => a + b, 0);
    const monthReduced = monthSum > 9 ? reduceToSingleDigit(monthSum).reduced : monthSum;
    const monthSteps = monthDigits.length > 1 ? `${monthDigits.join(' + ')} = ${monthReduced}` : `${monthReduced}`;

    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const dayDigits = dayStr.split('').map(Number);
    const daySum = dayDigits.reduce((a, b) => a + b, 0);
    const dayReduced = daySum > 9 ? reduceToSingleDigit(daySum).reduced : daySum;
    const daySteps = dayDigits.length > 1 ? `${dayDigits.join(' + ')} = ${dayReduced}` : `${dayReduced}`;

    const yearStr = `${year}`;
    const yearDigits = yearStr.split('').map(Number);
    const yearSum = yearDigits.reduce((a, b) => a + b, 0);
    const yearReduced = yearSum > 9 ? reduceToSingleDigit(yearSum).reduced : yearSum;
    const yearSteps = `${yearDigits.join(' + ')} = ${yearReduced}`;

    const sumComponentsVal = monthReduced + dayReduced + yearReduced;
    const sumComponents = `${monthReduced} + ${dayReduced} + ${yearReduced} = ${sumComponentsVal}`;

    const totalRedObj = reduceToSingleDigit(sumComponentsVal);
    const finalReduction =
      sumComponentsVal > 9
        ? `${sumComponentsVal.toString().split('').join(' + ')} = ${totalRedObj.reduced} → ${totalRedObj.reduced} + 0 = ${totalRedObj.reduced}`
        : `${totalRedObj.reduced} + 0 = ${totalRedObj.reduced}`;

    return {
      monthName,
      monthSteps,
      dayNum: dayStr,
      daySteps,
      yearNum: yearStr,
      yearSteps,
      sumComponents,
      finalReduction,
      calculatedLifePath: totalRedObj.reduced,
    };
  };

  const steps = computeNumerologySteps(inputs.dob);
  const calculatedLpNumber = numerology?.lifePathNumber || (hasDob ? steps.calculatedLifePath : 7) || 7;
  const lpArchetypeObj = LIFE_PATH_ARCHETYPES[calculatedLpNumber] || LIFE_PATH_ARCHETYPES[7];

  const card1 = inputs.cards[0] || {
    id: 'card1',
    name: parsed.cards.card1.name || 'Two of Cups',
    keywords: parsed.cards.card1.keywords.length > 0 ? parsed.cards.card1.keywords : ['connection', 'reciprocity', 'harmony', 'vulnerability', 'healing'],
    element: 'Water',
    symbol: '✨',
    arcana: 'minor',
    archetype: 'Intuitive Oracle',
    affirmation: 'I align with divine flow and emotional reciprocity.',
    color: 'from-amber-400 to-yellow-600',
  };

  const card2 = inputs.cards[1] || {
    id: 'card2',
    name: parsed.cards.card2.name || 'Eight of Swords',
    keywords: parsed.cards.card2.keywords.length > 0 ? parsed.cards.card2.keywords : ['restriction', 'limitation', 'overthinking', 'self-doubt', 'isolation'],
    element: 'Air',
    symbol: '⚔️',
    arcana: 'minor',
    archetype: 'Mindful Guardian',
    affirmation: 'I release perceived limits and trust truth.',
    color: 'from-blue-400 to-indigo-600',
  };

  const card3 = inputs.cards[2] || {
    id: 'card3',
    name: parsed.cards.card3.name || 'The Star',
    keywords: parsed.cards.card3.keywords.length > 0 ? parsed.cards.card3.keywords : ['hope', 'healing', 'inspiration', 'renewal', 'illumination'],
    element: 'Air',
    symbol: '⭐',
    arcana: 'major',
    archetype: 'Cosmic Healer',
    affirmation: 'My future shines bright with peace and purpose.',
    color: 'from-purple-400 to-pink-600',
  };

  const card1Img = getTarotCardImageUrl(card1.name);
  const card2Img = getTarotCardImageUrl(card2.name);
  const card3Img = getTarotCardImageUrl(card3.name);

  const querentName = inputs.name || 'Seeker';
  const topicUpper = safeTopic.toUpperCase();
  const cleanProblem = inputs.problem ? inputs.problem.trim() : 'navigating this crossroads';

  const numCoreText =
    parsed.numerology.coreParagraph ||
    `As a Life Path ${calculatedLpNumber}, you channel the vibrational frequency of ${lpArchetypeObj.coreEnergyTitle}, guided by the planetary influence of ${lpArchetypeObj.governingPlanet}. ${lpArchetypeObj.description} At this stage of your journey, your spirit is being summoned to honor your innate gifts of adaptable resilience, intuitive discernment, and authentic self-expression.`;
  const numAppText =
    parsed.numerology.applicationParagraph ||
    `In relation to your core inquiry regarding "${cleanProblem}", your Life Path ${calculatedLpNumber} blueprint calls you to recognize that feeling confined or uncertain is a sacred catalyst for spiritual expansion. By standing sovereign in your truth as ${lpArchetypeObj.archetype}, you dismantle outdated limitations and invite expansive growth, freedom, and deep clarity into your reality.`;

  const card1P1 = parsed.cards.card1.paragraphs[0] || `${card1.name} reveals foundational awareness and present emotional currents in your field.`;
  const card1P2 = parsed.cards.card1.paragraphs[1] || 'In your current energy, this marks a sacred turning point to honor your peace without compromise.';

  const card2P1 = parsed.cards.card2.paragraphs[0] || `${card2.name} highlights subconscious defense patterns and perceived boundaries.`;
  const card2P2 = parsed.cards.card2.paragraphs[1] || 'Your message is to stop negotiating with ambiguity and dismantle self-imposed hesitation.';

  const card3P1 = parsed.cards.card3.paragraphs[0] || `${card3.name} radiates triumphant renewal, higher guidance, and expansive alignment.`;
  const card3P2 = parsed.cards.card3.paragraphs[1] || 'Step boldly forward, trusting that your sovereign path leads directly to lasting fulfillment.';

  const card1Core = card1P1;
  const card1Symbolism = `Symbolically rooted in the sacred currents of ${card1.element || 'Water'} and ${card1.arcana || 'Minor'} Arcana guidance, ${card1.name} channels the archetype of ${card1.archetype || 'the Intuitive Oracle'}. It mirrors the energetic law of reciprocity—revealing how your willingness to receive shape-shifts your external circumstances into authentic alignment.`;
  const card1Direct = card1P2;

  const card2Core = card2P1;
  const card2Symbolism = `Governed by the currents of ${card2.element || 'Air'} and ${card2.arcana || 'Minor'} Arcana tension, ${card2.name} highlights how old mental defensive strategies now act as self-imposed boundaries. It symbolizes the fear of conflict or vulnerability that keeps you caught in analysis loops.`;
  const card2Direct = card2P2;

  const card3Core = card3P1;
  const card3Symbolism = `Radiating the transformative celestial frequency of ${card3.element || 'Air'} and ${card3.arcana || 'Major'} Arcana illumination, ${card3.name} is an archetypal beacon of renewed hope, divine protection, and synchronicity. It signals that universal forces are aligning to meet your highest standards.`;
  const card3Direct = card3P2;

  // Synthesis paragraphs from AI
  const synPars = parsed.synthesisParagraphs.length > 0 ? parsed.synthesisParagraphs : [
    'The sacred synthesis of your numbers and cards indicates a profound turning point in your energetic trajectory. Your core vibrational coordinates reveal a soul designed for conscious evolution and authentic sovereignty, calling you to release old coping mechanisms and trust the wisdom of your lived experience.',
    'As you navigate the current crossroads, the intersection between your Life Path blueprint and the cards drawn highlights an invaluable opportunity to transmute past emotional hesitation into expansive clarity and grounded peace.',
    'By releasing the subconscious resistance and mental loops identified in your spread, you allow natural synchronicities and divine timing to realign your circumstances with reciprocal harmony and effortless truth.',
    'Stepping decisively into the elevated medicine of your path forward brings sustainable peace, authentic connection, and joyful abundance into every facet of your life journey.'
  ];

  // Parse Action Steps
  const parseActionStep = (raw: string | undefined, defaultPhase: string, defaultTitle: string, defaultBody: string) => {
    if (!raw) return { phase: defaultPhase, title: defaultTitle, body: defaultBody };
    let clean = raw.replace(/^\[?\d+\]?[\.\)]?\s*/, '').replace(/^[-*•]\s*/, '').trim();
    if (clean.includes(':')) {
      const parts = clean.split(':');
      const stepHeader = cleanHeadingText(parts[0], defaultTitle);
      const stepBody = cleanMarkdownText(parts.slice(1).join(':'), defaultBody);
      return { phase: defaultPhase, title: stepHeader, body: stepBody.length > 8 ? stepBody : defaultBody };
    }
    const cleanTitle = cleanHeadingText(clean, defaultTitle);
    const cleanBody = cleanMarkdownText(clean, defaultBody);
    return { phase: defaultPhase, title: defaultTitle, body: cleanBody.length > 15 ? cleanBody : defaultBody };
  };

  const step1Parsed = parseActionStep(
    parsed.actionSteps[0],
    'Phase I • Energetic Sanctuary',
    'Clarity & Boundary Audit',
    'Dedicate 15 minutes each morning to uncensored journaling. Identify every area where your energy is being depleted by people-pleasing or hesitation. Practice honoring your peace as non-negotiable.'
  );
  const step2Parsed = parseActionStep(
    parsed.actionSteps[1],
    'Phase II • Shadow Transmutation',
    'Dissolving the Mental Loop',
    'Whenever overthinking or hesitation arises, pause immediately and place both hands over your heart center. Take slow diaphragmatic breaths and release the perceived need for control.'
  );
  const step3Parsed = parseActionStep(
    parsed.actionSteps[2],
    'Phase III • Sovereignty Activation',
    'Executing Courageous Shift',
    'Take one tangible, heart-aligned action reflecting solution-focused confidence. Step decisively into your natural authority, trusting divine universal support.'
  );
  const step4Parsed = parseActionStep(
    parsed.actionSteps[3],
    'Phase IV • Sacred Manifestation',
    'Anchoring Sovereign Blueprint',
    'Create a dedicated evening grounding ritual honoring your growth. Seal this journey by writing a letter of gratitude to your future self, anchoring unwavering trust in your destiny.'
  );

  // Mantras list from AI
  const mantrasList = parsed.mantras.length > 0 ? parsed.mantras : [
    'I AM sovereign, grounded, and aligned with my highest truth.',
    'I AM releasing all anxiety and allowing divine flow to guide me.',
    'I AM worthy of effortless abundance, deep clarity, and peace.',
    'I AM stepping into my true power without fear or apology.',
    'I AM anchored in love, protected by the universe, and completely free.',
  ];

  // Inquiries list from AI
  const inquiriesList = parsed.soulInquiries.length > 0 ? parsed.soulInquiries : [
    'Where in my life am I still seeking external permission instead of trusting my divine inner knowing?',
    'What outdated fear of conflict or rejection am I ready to release permanently?',
    'What does my most peaceful, abundant, and joyful timeline look like in physical reality?',
  ];

  const effectiveShopName = (inputs.shopName || '').trim() || 'Sacred Intuitive Studio';

  // =========================================================================
  // REUSABLE PAGE TEMPLATE RENDERERS
  // =========================================================================

  // 1. Cover Page
  const renderCover = (pageNumber: number, totalPages: number) => (
    <div
      className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="space-y-2 pt-2">
        <h1
          className="text-[26pt] font-bold tracking-tight text-[#1F1914] uppercase leading-tight"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {effectiveShopName}
        </h1>
        <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
        <p className="text-[12pt] italic text-[#4A3F35]">
          Intuitive Tarot · Cosmic Alchemy · Soul Blueprint Channeling
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-[460px]">
        <TarotCoverEmblemSvg className="w-[430px] h-[310px] text-[#2C241E]" />
      </div>

      <div className="space-y-3 max-w-xl pb-2">
        <div className="border-t border-b border-[#D8CEBE] py-4 space-y-1.5">
          <h2
            className="text-[22pt] font-bold text-[#1F1914] leading-tight uppercase tracking-wider"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            SACRED TAROT & SPIRITUAL GUIDANCE
          </h2>
          <p className="text-[12pt] text-[#6B5E51] italic">
            DIVINE INTUITIVE TRANSMISSION · {activeTier.toUpperCase()} EDITION
          </p>
        </div>
      </div>

      <div className="text-center text-[9pt] text-[#6B5E51] tracking-wider uppercase space-y-0.5 border-t border-[#E8E1D5] pt-2 w-full max-w-md">
        <p>Channeled with Reverence by {effectiveShopName}</p>
        <p className="text-[8pt] text-[#8C7D6D]">
          © {new Date().getFullYear()} {effectiveShopName} · All Rights Reserved
        </p>
      </div>
    </div>
  );

  // 2. Tarot Spread Overview
  const renderTarotSpread = (title = 'The 3-Card Sacred Oracle Spread', paragraphs?: string[]) => {
    const rawParagraphs =
      paragraphs && paragraphs.length > 0
        ? paragraphs
        : [
            `This three-card spread operates as an organic energetic gateway: moving from present vibrational alignment (${card1.name}), illuminating the shadow resistance (${card2.name}), and unlocking your highest breakthrough potential (${card3.name}).`,
          ];

    // Filter out redundant lines that simply list "Card 1: ... Card 2: ... Card 3: ..."
    // since the 3 cards are already prominently displayed with their artwork, names, and positions
    const displayParagraphs = rawParagraphs.filter((p) => {
      const trimmed = p.trim();
      if (!trimmed) return false;
      const lower = trimmed.toLowerCase();
      if (
        lower.startsWith('card 1:') &&
        lower.includes('card 2:') &&
        lower.includes('card 3:')
      ) {
        return false;
      }
      return true;
    });

    return (
      <div
        className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        <div className="text-center space-y-1.5 pt-2">
          <h1
            className="text-[24px] font-bold text-[#1F1914] uppercase tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {title}
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[14px] italic text-[#4A3F35]">
            The foundational energetic triad anchoring your reading
          </p>
        </div>

        <div className="my-auto w-full max-w-xl flex flex-col items-center">
          <div className="w-full flex justify-center mb-1 text-[#2C241E]">
            <TripleArchOverCardsSvg className="w-[320px] h-[34px] text-[#A89884]/70" />
          </div>

          <div className="grid grid-cols-3 gap-5 w-full items-end justify-center py-2">
            {/* Card 1 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-[125px] aspect-[2/3] p-1.5 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-md">
                <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
                  <img
                    src={card1Img}
                    alt={card1.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B5E51] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Card I · Present
              </span>
              <p
                className="font-bold text-[14px] text-[#1F1914] leading-tight text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {card1.name}
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-[125px] aspect-[2/3] p-1.5 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-md">
                <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
                  <img
                    src={card2Img}
                    alt={card2.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B5E51] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Card II · Blockage
              </span>
              <p
                className="font-bold text-[14px] text-[#1F1914] leading-tight text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {card2.name}
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-[125px] aspect-[2/3] p-1.5 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-md">
                <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
                  <img
                    src={card3Img}
                    alt={card3.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B5E51] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Card III · Forward
              </span>
              <p
                className="font-bold text-[14px] text-[#1F1914] leading-tight text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {card3.name}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-xl text-center space-y-2.5 pb-2">
          {displayParagraphs.map((par, pIdx) => {
            const { text: cleanParText, align: parAlign } = parseTextAlignment(par);
            const alignClass =
              parAlign === 'left'
                ? 'text-left w-full'
                : parAlign === 'right'
                ? 'text-right w-full'
                : parAlign === 'justify'
                ? 'text-justify w-full'
                : 'text-center';
            return (
              <p
                key={pIdx}
                className={`text-[16px] text-[#1F1914] leading-[1.6] italic ${alignClass}`}
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                {cleanParText}
              </p>
            );
          })}
        </div>

        <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
          <p className="text-[12px] italic text-[#6B5E51]">
            ✦ The Cards Reflected Here Form the Foundation of Your Transmission ✦
          </p>
        </div>
      </div>
    );
  };

  // 3. Card Artwork & Embodiment Page (Individual Introduction Page)
  const renderCardArt = (
    targetCard: TarotCard,
    targetImg: string,
    romanNum: string,
    roleLabel: string,
    affirmationOverride?: string,
    paragraphs?: string[]
  ) => {
    const quoteText =
      affirmationOverride ||
      (paragraphs && paragraphs.length > 0 ? paragraphs[0] : undefined) ||
      targetCard.affirmation ||
      'I align with divine flow and emotional reciprocity.';

    return (
      <div
        className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        <div className="space-y-1.5 pt-2">
          <h1
            className="text-[24px] font-bold text-[#1F1914] leading-tight uppercase tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {targetCard.name}
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[14px] italic text-[#4A3F35]">
            Card {romanNum} · {roleLabel} · Element: {targetCard.element || 'Universal'} · Arcana: {targetCard.arcana || 'Major'}
          </p>
        </div>

        <div className="my-auto flex flex-col items-center justify-center w-full py-1">
          <div className="w-[230px] max-w-[230px] aspect-[2/3] p-2 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
              <img
                src={targetImg}
                alt={targetCard.name}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full max-w-xl pb-2">
          <span
            className="text-[12px] uppercase tracking-[0.24em] text-[#6B5E51] block font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Core Keywords & Frequencies
          </span>
          <p className="text-[18px] text-[#1F1914] tracking-wide">
            {targetCard.keywords.join('  ·  ')}
          </p>
        </div>

        <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
          <p className="text-[16px] italic text-[#1F1914]">
            &ldquo;{quoteText}&rdquo;
          </p>
        </div>
      </div>
    );
  };

  // 3b. Tarot Card Deep Interpretation Page (Text only, NO card image)
  const renderTarotInterpretationPage = (
    targetCard: TarotCard,
    roman: string,
    roleLabel: string,
    pageTitle: string,
    paragraphs?: string[],
    pageNumber?: number
  ) => {
    // Filter disclaimers
    const rawParagraphs =
      paragraphs && paragraphs.length > 0
        ? paragraphs
        : [
            `${targetCard.name} brings profound energetic illumination to your path, signaling conscious evolution and heightened spiritual discernment.`,
            `Embrace the sovereign frequency of this vibration to dissolve self-imposed doubt and step courageously into alignment.`,
          ];

    const displayParagraphs = rawParagraphs.filter((par) => {
      const lower = par.toLowerCase();
      if (
        lower.includes('sacred divination disclaimer') ||
        lower.includes('for entertainment purposes') ||
        lower.includes('medical, psychological, legal') ||
        lower.includes('not constitute or substitute')
      ) {
        return false;
      }
      return true;
    });

    return (
      <UniversalPageContainer
        title={pageTitle || `Card ${roman} · ${targetCard.name}`}
        subtitle={`${roleLabel} · Element: ${targetCard.element || 'Universal'} · Arcana: ${targetCard.arcana || 'Major'}`}
        footerText="✦ Deep Energetic Meaning & Channeled Guidance ✦"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto w-full">
          {displayParagraphs.map((par, pIdx) => {
            const { text: cleanParText, align: parAlign } = parseTextAlignment(par);
            const alignClass =
              parAlign === 'left'
                ? 'text-left w-full'
                : parAlign === 'right'
                ? 'text-right w-full'
                : parAlign === 'justify'
                ? 'text-justify w-full'
                : 'text-center';
            return (
              <React.Fragment key={pIdx}>
                {pIdx > 0 && (
                  <div className="text-[#A89884] text-center text-xs my-0.5 select-none">
                    ✦  ·  ✦  ·  ✦
                  </div>
                )}
                <p
                  className={`text-[20px] leading-[1.8] text-[#1F1914] ${alignClass}`}
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  {cleanParText}
                </p>
              </React.Fragment>
            );
          })}
        </div>
      </UniversalPageContainer>
    );
  };

  // 4. Numerology Template Page
  const renderNumerology = (paragraphs?: string[]) => {
    const p1 = (paragraphs && paragraphs[0]) || numCoreText;
    const p2 = (paragraphs && paragraphs[1]) || numAppText;
    const parsedP1 = parseTextAlignment(p1);
    const parsedP2 = parseTextAlignment(p2);
    const alignClassP1 =
      parsedP1.align === 'left'
        ? 'text-left w-full'
        : parsedP1.align === 'right'
        ? 'text-right w-full'
        : parsedP1.align === 'justify'
        ? 'text-justify w-full'
        : 'text-center';
    const alignClassP2 =
      parsedP2.align === 'left'
        ? 'text-left w-full'
        : parsedP2.align === 'right'
        ? 'text-right w-full'
        : parsedP2.align === 'justify'
        ? 'text-justify w-full'
        : 'text-center';

    return (
      <UniversalPageContainer
        title={`Life Path ${calculatedLpNumber} · ${lpArchetypeObj.coreEnergyTitle}`}
        subtitle={`Derived from Date of Birth: ${inputs.dob || 'Client DOB'} (${steps.finalReduction})`}
        footerText="✦ Numbers Are the Sacred Geometry of Cosmic Consciousness ✦"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto w-full">
          <div className="space-y-2 text-center w-full">
            <h2
              className="font-bold text-[20px] text-[#1F1914] text-center uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ✦ Core Vibrational Essence ✦
            </h2>
            <p
              className={`text-[20px] leading-[1.8] text-[#1F1914] ${alignClassP1}`}
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              {parsedP1.text}
            </p>
          </div>

          <div className="text-[#A89884] text-center text-xs my-0.5 select-none">✦  ·  ✦  ·  ✦</div>

          <div className="space-y-2 text-center w-full">
            <h2
              className="font-bold text-[20px] text-[#1F1914] text-center uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ✦ Application to Your Situation ✦
            </h2>
            <p
              className={`text-[20px] leading-[1.8] text-[#1F1914] ${alignClassP2}`}
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              {parsedP2.text}
            </p>
          </div>

          <div className="pt-2 text-center">
            <p className="text-[15px] italic text-[#6B5E51] text-center">
              Governing Planetary Archetype: <strong className="text-[#1F1914]">{lpArchetypeObj.governingPlanet}</strong> · The {lpArchetypeObj.archetype}
            </p>
          </div>
        </div>
      </UniversalPageContainer>
    );
  };

  // 5. Universal Page Design (Title: 24px top center in Montserrat, Body: 20px center aligned in Times New Roman)
  const renderUniversalPage = (
    title: string,
    paragraphs: string[],
    pageNum: number,
    isClosing?: boolean
  ) => {
    // Filter out duplicate disclaimer content from the text paragraphs so only the small footer disclaimer remains
    const rawParagraphs =
      paragraphs && paragraphs.length > 0 ? paragraphs : ['Content unfolding in divine timing.'];
    const filteredParagraphs = rawParagraphs.filter((par) => {
      const lower = par.toLowerCase().trim();
      return (
        !lower.includes('sacred divination disclaimer') &&
        !lower.includes('legal disclaimer') &&
        !lower.includes('this reading is provided for personal reflection') &&
        !lower.includes('tarot, astrology, and numerology readings are offered solely') &&
        !lower.includes('entertainment purposes') &&
        !lower.startsWith('disclaimer:') &&
        !lower.startsWith('✦ disclaimer') &&
        !lower.startsWith('✦ sacred divination disclaimer')
      );
    });

    const displayParagraphs =
      filteredParagraphs.length > 0 ? filteredParagraphs : rawParagraphs;

    return (
      <UniversalPageContainer
        title={title}
        footerText={
          isClosing
            ? `© ${new Date().getFullYear()} ${effectiveShopName} · All Rights Reserved`
            : '✦ Grounded in Love, Guided by Wisdom, Anchored in Sovereignty ✦'
        }
      >
        <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto w-full">
          {displayParagraphs.map((par, pIdx) => {
            const { text: cleanParText, align: parAlign } = parseTextAlignment(par);
            const alignClass =
              parAlign === 'left'
                ? 'text-left w-full'
                : parAlign === 'right'
                ? 'text-right w-full'
                : parAlign === 'justify'
                ? 'text-justify w-full'
                : 'text-center';
            const isMantra =
              cleanParText.startsWith('✦') ||
              cleanParText.startsWith('"') ||
              cleanParText.startsWith('“') ||
              cleanParText.startsWith('I AM');
            return (
              <React.Fragment key={pIdx}>
                {pIdx > 0 && (
                  <div className="text-[#A89884] text-center text-xs my-0.5 select-none">
                    ✦  ·  ✦  ·  ✦
                  </div>
                )}
                <p
                  className={`text-[20px] leading-[1.8] text-[#1F1914] ${alignClass} ${
                    isMantra ? 'italic font-medium' : ''
                  }`}
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  {cleanParText}
                </p>
              </React.Fragment>
            );
          })}

          {isClosing && (
            <div className="space-y-1 text-center border-t border-[#E8E1D5] pt-3 max-w-lg mx-auto mt-2">
              <p
                className="text-[11px] font-bold uppercase tracking-wider text-[#1F1914] text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ✦ Sacred Divination Disclaimer ✦
              </p>
              <p
                className="text-[11px] leading-relaxed text-[#6B5E51] text-center"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Tarot, astrology, and numerology readings are offered solely for personal insight,
                self-reflection, spiritual exploration, and entertainment purposes. Guidance
                provided is intended to inspire contemplation and does not constitute or
                substitute for licensed medical, psychological, legal, or financial counsel.
              </p>
            </div>
          )}
        </div>
      </UniversalPageContainer>
    );
  };

  // Helper to match card for visual card pages
  const getCardForPage = (
    item: { title: string; cardIndex?: number },
    c1: TarotCard,
    c2: TarotCard,
    c3: TarotCard
  ) => {
    const lower = item.title.toLowerCase();
    if (
      item.cardIndex === 1 ||
      lower.includes('card 2') ||
      lower.includes('card ii') ||
      lower.includes('second card') ||
      lower.includes('blockage') ||
      lower.includes(c2.name.toLowerCase())
    ) {
      return { card: c2, roman: 'II', role: 'The Blockage', img: card2Img };
    }
    if (
      item.cardIndex === 2 ||
      lower.includes('card 3') ||
      lower.includes('card iii') ||
      lower.includes('third card') ||
      lower.includes('path forward') ||
      lower.includes('forward') ||
      lower.includes(c3.name.toLowerCase())
    ) {
      return { card: c3, roman: 'III', role: 'Path Forward', img: card3Img };
    }
    return { card: c1, roman: 'I', role: 'Current Energy', img: card1Img };
  };

  // =========================================================================
  // DYNAMIC PAGE ASSEMBLY
  // =========================================================================
  const pages: PageBlock[] = [];

  // If page-by-page output is present from the AI, map dynamically (Unlimited pages)
  if (parsed.pageByPage && parsed.pageByPage.length > 0) {
    parsed.pageByPage.forEach((item, idx) => {
      const pageNumber = item.pageNumber || idx + 1;
      const cleanTitle = cleanHeadingText(item.title, `Page ${pageNumber}`);
      const lowerTitle = cleanTitle.toLowerCase();

      // 1. Cover Page (First Page)
      if (
        item.isCover ||
        (pageNumber === 1 && (lowerTitle.includes('cover') || lowerTitle.includes('reading')))
      ) {
        pages.push({
          key: `page-${pageNumber}-cover`,
          headerTitle: effectiveShopName.toUpperCase(),
          render: (pNum, totalPages) => renderCover(pNum, totalPages),
        });
        return;
      }

      // 2. Tarot Spread Overview / Card Energy Overview Page (SHOWS ALL 3 CARDS)
      const isSpreadOverview =
        item.isTarotSpread ||
        lowerTitle.includes('card energy overview') ||
        lowerTitle.includes('cards energy overview') ||
        lowerTitle.includes('energy overview') ||
        lowerTitle.includes('tarot spread') ||
        lowerTitle.includes('spread overview') ||
        lowerTitle.includes('3-card energy') ||
        lowerTitle.includes('3 card energy') ||
        lowerTitle.includes('3-card spread') ||
        lowerTitle.includes('3 card spread') ||
        lowerTitle.includes('oracle spread') ||
        lowerTitle.includes('cards drawn') ||
        lowerTitle.includes('cards overview');

      if (isSpreadOverview) {
        pages.push({
          key: `page-${pageNumber}-tarot-spread`,
          headerTitle: cleanTitle.toUpperCase() || 'CARD ENERGY OVERVIEW',
          render: () => renderTarotSpread(cleanTitle, item.paragraphs),
        });
        return;
      }

      // 3. Tarot Card Art / Visual / Individual Introduction Page (SHOWS CARD IMAGE)
      const isCardIntro =
        item.isTarotCardArt ||
        (!isSpreadOverview &&
          !lowerTitle.includes('interpretation') &&
          !lowerTitle.includes('deep') &&
          !lowerTitle.includes('channeled') &&
          (lowerTitle.includes('visual') ||
            lowerTitle.includes('intro') ||
            lowerTitle.includes('introduction') ||
            lowerTitle.includes('keyword') ||
            lowerTitle.includes('artwork') ||
            lowerTitle.includes('embodiment') ||
            lowerTitle.includes('card into')));

      if (isCardIntro) {
        const cardInfo = getCardForPage(item, card1, card2, card3);
        pages.push({
          key: `page-${pageNumber}-card-${cardInfo.roman}-art`,
          headerTitle: `CARD ${cardInfo.roman} · ${cardInfo.role.toUpperCase()}`,
          render: () =>
            renderCardArt(
              cardInfo.card,
              cardInfo.img,
              cardInfo.roman,
              cardInfo.role,
              item.paragraphs[0],
              item.paragraphs
            ),
        });
        return;
      }

      // 4. Tarot Card Deep Interpretation Page (Text only, NO card image)
      if (item.isTarotInterpretation || item.cardIndex !== undefined) {
        const cardInfo = getCardForPage(item, card1, card2, card3);
        pages.push({
          key: `page-${pageNumber}-card-${cardInfo.roman}-interpretation`,
          headerTitle: `CARD ${cardInfo.roman} · ${cardInfo.role.toUpperCase()}`,
          render: () =>
            renderTarotInterpretationPage(
              cardInfo.card,
              cardInfo.roman,
              cardInfo.role,
              cleanTitle,
              item.paragraphs,
              pageNumber
            ),
        });
        return;
      }

      // 5. Numerology Template Page
      if (item.isNumerology) {
        pages.push({
          key: `page-${pageNumber}-numerology`,
          headerTitle: 'COSMIC NUMEROLOGY PROFILE',
          render: () => renderNumerology(item.paragraphs),
        });
        return;
      }

      // 5. ALL OTHER PAGES -> Universal Page Design (24px Title Top Center, 18/20px Text Centered)
      pages.push({
        key: `page-${pageNumber}-universal`,
        headerTitle: cleanTitle.toUpperCase().slice(0, 32),
        render: () =>
          renderUniversalPage(
            cleanTitle,
            item.paragraphs.length > 0
              ? item.paragraphs
              : [item.content || 'Content unfolding in divine timing.'],
            pageNumber,
            item.isClosingDisclaimer
          ),
      });
    });
  }

  // Fallback if no pageByPage data available
  if (pages.length === 0) {
  // 1. Cover Page
  pages.push({
    key: 'cover',
    headerTitle: effectiveShopName.toUpperCase(),
    render: (pageNumber, totalPages) => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
        <div className="space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.32em] text-[#6B5E51] font-sans font-semibold">
            Sacred Divination & Intuitive Transmission
          </span>
          <h1 className="text-[26pt] font-serif font-bold tracking-tight text-[#1F1914] uppercase leading-tight">
            {effectiveShopName}
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] italic text-[#4A3F35]">
            Intuitive Tarot · Cosmic Alchemy · Soul Blueprint Channeling
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-[460px]">
          <TarotCoverEmblemSvg className="w-[430px] h-[310px] text-[#2C241E]" />
        </div>

        <div className="space-y-3 max-w-xl pb-2">
          <div className="border-t border-b border-[#D8CEBE] py-4 space-y-1.5">
            <h2
              className="text-[22pt] font-bold text-[#1F1914] leading-tight uppercase tracking-wider"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              SACRED TAROT & SPIRITUAL GUIDANCE
            </h2>
            <p className="text-[12pt] text-[#6B5E51] italic">
              DIVINE INTUITIVE TRANSMISSION · {activeTier.toUpperCase()} EDITION ({totalPages} Pages)
            </p>
          </div>
        </div>

        <div className="text-center text-[8pt] font-sans text-[#6B5E51] tracking-wider uppercase space-y-0.5 border-t border-[#E8E1D5] pt-2 w-full max-w-md">
          <p>Channeled with Reverence by {effectiveShopName}</p>
          <p className="text-[7.5pt] text-[#8C7D6D]">
            © {new Date().getFullYear()} {effectiveShopName} · All Rights Reserved
          </p>
        </div>
      </div>
    ),
  });

  // 2. Querent Sacred Focus & Blueprint (Universal Page Design)
  pages.push({
    key: 'intake-blueprint',
    headerTitle: 'QUERENT INTAKE & SACRED BLUEPRINT',
    render: () => (
      <UniversalPageContainer
        eyebrow="Sacred Intention & Querent Blueprint"
        title="Querent Sacred Focus & Coordinates"
        subtitle="Honoring your divine presence, inquiry, and soul crossroads"
        footerText="✦ Your Intentions Anchor the Divine Channeling Space ✦"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
          <p className="text-[20px] font-serif font-bold text-[#1F1914] text-center">
            Welcome, Beloved {querentName}
            {inputs.age ? ` (${inputs.age} Years)` : ''}
          </p>

          <div className="w-12 h-[1px] bg-[#C4B6A4] mx-auto my-1"></div>

          <div className="space-y-1.5 w-full text-center">
            <span className="text-[18px] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block text-center">
              ✦ Core Situation & Crossroads ✦
            </span>
            <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif italic text-center">
              &ldquo;{inputs.problem || 'Navigating a key vibrational turning point of decision, sovereign realignment, and soul growth.'}&rdquo;
            </p>
          </div>

          <div className="w-12 h-[1px] bg-[#C4B6A4] mx-auto my-1"></div>

          <div className="space-y-1.5 w-full text-center">
            <span className="text-[18px] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block text-center">
              ✦ Direct Soul Inquiry ✦
            </span>
            <p className="text-[19px] leading-[1.7] text-[#1F1914] font-serif italic font-medium text-center">
              &ldquo;{inputs.question || 'What is the highest alignment and next aligned action for my sacred path?'}&rdquo;
            </p>
          </div>

          <div className="pt-2 text-center">
            <p className="text-[18px] font-serif text-[#6B5E51] text-center">
              Transmission Modality: <strong className="text-[#1F1914]">{categorySpec.title}</strong> · {activeTier.toUpperCase()} Edition
            </p>
          </div>
        </div>
      </UniversalPageContainer>
    ),
  });

  // 3. Cosmic Numerology Profile (Universal Page Design - if DOB provided)
  if (hasDob) {
    pages.push({
      key: 'numerology',
      headerTitle: 'COSMIC NUMEROLOGY PROFILE',
      render: () => (
        <UniversalPageContainer
          eyebrow="Pythagorean Numerology Blueprint"
          title={`Life Path ${calculatedLpNumber} · ${lpArchetypeObj.coreEnergyTitle}`}
          subtitle={`Derived from Date of Birth: ${inputs.dob} (${steps.finalReduction})`}
          footerText="✦ Numbers Are the Sacred Geometry of Cosmic Consciousness ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
            <div className="space-y-1.5 text-center">
              <h2 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Core Vibrational Essence ✦
              </h2>
              <p className="text-[18px] leading-[1.75] text-[#1F1914] font-serif text-center">
                {numCoreText}
              </p>
            </div>

            <div className="w-12 h-[1px] bg-[#C4B6A4] mx-auto my-1"></div>

            <div className="space-y-1.5 text-center">
              <h2 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Application to Your Situation ✦
              </h2>
              <p className="text-[18px] leading-[1.75] text-[#1F1914] font-serif text-center">
                {numAppText}
              </p>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[18px] font-serif italic text-[#6B5E51] text-center">
                Governing Planetary Archetype: <strong className="text-[#1F1914]">{lpArchetypeObj.governingPlanet}</strong> · The {lpArchetypeObj.archetype}
              </p>
            </div>
          </div>
        </UniversalPageContainer>
      ),
    });
  }

  // 5. Tarot Spread Overview & Triad Methodology (Kept as is)
  pages.push({
    key: 'tarot-overview',
    headerTitle: 'TAROT SPREAD OVERVIEW',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
        <div className="space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            The 3-Card Sacred Oracle Spread
          </span>
          <h1 className="text-[24pt] font-serif font-bold text-[#1F1914]">
            System Overview & Cards Drawn
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] font-serif italic text-[#4A3F35]">
            The foundational energetic triad anchoring your reading
          </p>
        </div>

        <div className="relative w-full my-auto flex flex-col items-center">
          <TripleArchOverCardsSvg className="w-[580px] h-[260px] text-[#C4B6A4] absolute top-[-10px] pointer-events-none opacity-30" />

          <div className="grid grid-cols-3 gap-6 w-full max-w-xl z-10 mx-auto items-center justify-items-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-[120px] max-w-[120px] aspect-[2/3] p-1.5 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
                  <img
                    src={card1Img}
                    alt={card1.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <span className="text-[8pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold">
                Card I · Current
              </span>
              <p className="font-serif font-bold text-[11pt] text-[#1F1914] leading-tight text-center">
                {card1.name}
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-[120px] max-w-[120px] aspect-[2/3] p-1.5 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
                  <img
                    src={card2Img}
                    alt={card2.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <span className="text-[8pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold">
                Card II · Blockage
              </span>
              <p className="font-serif font-bold text-[11pt] text-[#1F1914] leading-tight text-center">
                {card2.name}
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-[120px] max-w-[120px] aspect-[2/3] p-1.5 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
                  <img
                    src={card3Img}
                    alt={card3.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <span className="text-[8pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold">
                Card III · Forward
              </span>
              <p className="font-serif font-bold text-[11pt] text-[#1F1914] leading-tight text-center">
                {card3.name}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-xl text-center space-y-2 pb-2">
          <span className="text-[8pt] font-sans uppercase tracking-[0.25em] text-[#6B5E51] font-semibold block">
            Triad Alchemy
          </span>
          <p className="text-[10pt] text-[#1F1914] leading-relaxed italic">
            This three-card spread operates as an organic energetic gateway: moving from present vibrational alignment ({card1.name}), illuminating the shadow resistance ({card2.name}), and unlocking your highest breakthrough potential ({card3.name}).
          </p>
        </div>

        <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
          <p className="text-[9pt] font-serif italic text-[#6B5E51]">
            ✦ The Cards Reflected Here Form the Foundation of Your Transmission ✦
          </p>
        </div>
      </div>
    ),
  });

  // 6. Card 1 Embodiment & Artwork (Kept as is)
  pages.push({
    key: 'card1-art',
    headerTitle: 'CARD I · CURRENT ENERGY',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
        <div className="space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            The Focal Point · Present Vibration
          </span>
          <h1 className="text-[24pt] font-serif font-bold text-[#1F1914] leading-tight">
            {card1.name}
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] font-serif italic text-[#4A3F35]">
            Element: {card1.element || 'Water'} · Arcana: {card1.arcana || 'Minor'}
          </p>
        </div>

        <div className="my-auto flex flex-col items-center justify-center w-full py-1">
          <div className="w-[240px] max-w-[240px] aspect-[2/3] p-2 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
              <img
                src={card1Img}
                alt={card1.name}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full max-w-xl pb-2">
          <span className="text-[8pt] font-sans uppercase tracking-[0.28em] text-[#6B5E51] block font-semibold">
            Core Keywords & Frequencies
          </span>
          <p className="text-[10pt] font-serif text-[#1F1914] tracking-wide">
            {card1.keywords.join('  ·  ')}
          </p>
        </div>

        <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
          <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
            &ldquo;{card1.affirmation || 'I align with divine flow and emotional reciprocity.'}&rdquo;
          </p>
        </div>
      </div>
    ),
  });

  // 7. Card 1 Channeled Interpretation (Kept as is)
  pages.push({
    key: 'card1-meaning',
    headerTitle: 'CARD I · CHANNELED MEANING',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
        <div className="text-center space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            Card I Channeled Interpretation
          </span>
          <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
            {card1.name}: Deep Analysis
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] font-serif italic text-[#4A3F35]">
            Unpacking the present energetic current shaping your reality
          </p>
        </div>

        <div className="space-y-[18px] my-auto max-w-2xl mx-auto">
          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              1. Core Meaning & Foundational Vibration
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card1Core}
            </p>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              2. Symbolism & Archetypal Undercurrents
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card1Symbolism}
            </p>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              3. Direct Channeled Message for Your Path
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card1Direct}
            </p>
          </div>
        </div>

        <div className="text-center border-t border-[#E8E1D5] pt-2">
          <p className="text-[9pt] font-serif italic text-[#6B5E51]">
            ✦ Card 1 establishes your foundational energetic baseline ✦
          </p>
        </div>
      </div>
    ),
  });

  // 8. Card 2 Embodiment & Artwork (Kept as is)
  pages.push({
    key: 'card2-art',
    headerTitle: 'CARD II · THE BLOCKAGE',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
        <div className="space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            The Focal Point · The Blockage
          </span>
          <h1 className="text-[24pt] font-serif font-bold text-[#1F1914] leading-tight">
            {card2.name}
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] font-serif italic text-[#4A3F35]">
            Element: {card2.element || 'Air'} · Arcana: {card2.arcana || 'Minor'}
          </p>
        </div>

        <div className="my-auto flex flex-col items-center justify-center w-full py-1">
          <div className="w-[240px] max-w-[240px] aspect-[2/3] p-2 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
              <img
                src={card2Img}
                alt={card2.name}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full max-w-xl pb-2">
          <span className="text-[8pt] font-sans uppercase tracking-[0.28em] text-[#6B5E51] block font-semibold">
            Core Keywords & Frequencies
          </span>
          <p className="text-[10pt] font-serif text-[#1F1914] tracking-wide">
            {card2.keywords.join('  ·  ')}
          </p>
        </div>

        <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
          <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
            &ldquo;{card2.affirmation || 'I release perceived limits and trust truth.'}&rdquo;
          </p>
        </div>
      </div>
    ),
  });

  // 9. Card 2 Channeled Interpretation (Kept as is)
  pages.push({
    key: 'card2-meaning',
    headerTitle: 'CARD II · CHANNELED MEANING',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
        <div className="text-center space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            Card II Channeled Interpretation
          </span>
          <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
            {card2.name}: Deep Analysis
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] font-serif italic text-[#4A3F35]">
            Illuminating subconscious resistance and energetic friction
          </p>
        </div>

        <div className="space-y-[18px] my-auto max-w-2xl mx-auto">
          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              1. The Nature of the Blockage
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card2Core}
            </p>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              2. Subconscious Roots & Defensive Patterns
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card2Symbolism}
            </p>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              3. Direct Channeled Message for Release
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card2Direct}
            </p>
          </div>
        </div>

        <div className="text-center border-t border-[#E8E1D5] pt-2">
          <p className="text-[9pt] font-serif italic text-[#6B5E51]">
            ✦ Card 2 unmasks subconscious resistance for conscious release ✦
          </p>
        </div>
      </div>
    ),
  });

  // 10. Card 3 Embodiment & Artwork (Kept as is)
  pages.push({
    key: 'card3-art',
    headerTitle: 'CARD III · PATH FORWARD',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
        <div className="space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            The Focal Point · Path Forward
          </span>
          <h1 className="text-[24pt] font-serif font-bold text-[#1F1914] leading-tight">
            {card3.name}
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] font-serif italic text-[#4A3F35]">
            Element: {card3.element || 'Air'} · Arcana: {card3.arcana || 'Major'}
          </p>
        </div>

        <div className="my-auto flex flex-col items-center justify-center w-full py-1">
          <div className="w-[240px] max-w-[240px] aspect-[2/3] p-2 bg-[#FAF7EE] rounded border border-[#A89884]/80 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-sm overflow-hidden border border-[#D8CEBE] bg-[#F7F3EB] flex items-center justify-center">
              <img
                src={card3Img}
                alt={card3.name}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full max-w-xl pb-2">
          <span className="text-[8pt] font-sans uppercase tracking-[0.28em] text-[#6B5E51] block font-semibold">
            Core Keywords & Frequencies
          </span>
          <p className="text-[10pt] font-serif text-[#1F1914] tracking-wide">
            {card3.keywords.join('  ·  ')}
          </p>
        </div>

        <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
          <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
            &ldquo;{card3.affirmation || 'My future shines bright with peace and purpose.'}&rdquo;
          </p>
        </div>
      </div>
    ),
  });

  // 11. Card 3 Channeled Interpretation (Kept as is)
  pages.push({
    key: 'card3-meaning',
    headerTitle: 'CARD III · CHANNELED MEANING',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
        <div className="text-center space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            Card III Channeled Interpretation
          </span>
          <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
            {card3.name}: Deep Analysis
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] font-serif italic text-[#4A3F35]">
            Connecting with radiant renewal, hope, and divine alignment
          </p>
        </div>

        <div className="space-y-[18px] my-auto max-w-2xl mx-auto">
          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              1. Core Meaning & Higher Soul Gateway
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card3Core}
            </p>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              2. Symbolism & Radiant Potential
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card3Symbolism}
            </p>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
              3. Direct Channeled Message for Manifestation
            </h2>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
              {card3Direct}
            </p>
          </div>
        </div>

        <div className="text-center border-t border-[#E8E1D5] pt-2">
          <p className="text-[9pt] font-serif italic text-[#6B5E51]">
            ✦ Card 3 points directly toward your highest triumphant outcome ✦
          </p>
        </div>
      </div>
    ),
  });

  // =========================================================================
  // UNIVERSAL CONTENT PAGES (UNLIMITED DYNAMIC PAGINATION)
  // All remaining details rendered in the universal page design:
  // Title: 24px font, Text: 18/20px font, Aligned center.
  // =========================================================================

  // 1. Sacred Synthesis (Dynamic 2-paragraph chunks)
  const synChunkSize = 2;
  const synPagesCount = Math.max(1, Math.ceil(synPars.length / synChunkSize));
  for (let pIdx = 0; pIdx < synPagesCount; pIdx++) {
    const chunkPars = synPars.slice(pIdx * synChunkSize, (pIdx + 1) * synChunkSize);
    const isSingle = synPagesCount === 1;
    const pageTitle = isSingle
      ? 'Sacred Synthesis & Soul Weaving'
      : `Sacred Synthesis · Part ${pIdx + 1}`;
    const pageSubtitle = pIdx === 0
      ? 'Harmonizing the 3 Cards and Life Path vibration into unified sovereignty'
      : 'Transmuting old resistance into effortless momentum and clear truth';

    pages.push({
      key: `synthesis-page-${pIdx + 1}`,
      headerTitle: isSingle ? 'SACRED SYNTHESIS' : `SYNTHESIS · PART ${pIdx + 1}`,
      render: () => (
        <UniversalPageContainer
          eyebrow={`Holistic Oracle Synthesis${!isSingle ? ` · Part ${pIdx + 1}` : ''}`}
          title={pageTitle}
          subtitle={pageSubtitle}
          footerText="✦ Your greatest power lies in aligning daily action with divine truth ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto">
            {chunkPars.map((par, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>}
                <p className="text-[18px] leading-[1.75] text-[#1F1914] font-serif text-center">
                  {par}
                </p>
              </React.Fragment>
            ))}
          </div>
        </UniversalPageContainer>
      ),
    });
  }

  // 2. Q&A Sacred Insights (Dynamic 2-item chunks)
  const qaItems = parsed.qaInsights && parsed.qaInsights.length > 0 ? parsed.qaInsights : [
    { question: 'What is the hidden lesson within my current situation?', answer: 'Your present crossroads is training your nervous system to trust your internal compass rather than external approval.' },
    { question: 'What elevated energy am I invited to embody?', answer: 'Embody grounded self-trust and calm sovereignty, knowing you no longer need to over-explain your boundaries.' },
    { question: 'What subconscious block is ready to be permanently released?', answer: 'Release the fear that making peaceful decisions for yourself will disappoint others or disrupt harmony.' },
    { question: 'How can I recognize when I am on the highest path?', answer: 'The true path does not demand frantic urgency; it is marked by steady somatic peace, clear intuition, and gentle synchronicities.' },
    { question: 'What is the ultimate breakthrough awaiting my embodiment?', answer: 'A reality rooted in joyful abundance, mutual respect, and total creative freedom.' },
  ];

  const qaChunkSize = 2;
  const qaPagesCount = Math.ceil(qaItems.length / qaChunkSize);
  for (let qIdx = 0; qIdx < qaPagesCount; qIdx++) {
    const chunkQA = qaItems.slice(qIdx * qaChunkSize, (qIdx + 1) * qaChunkSize);
    pages.push({
      key: `qa-insights-page-${qIdx + 1}`,
      headerTitle: `Q&A INSIGHTS · PART ${qIdx + 1}`,
      render: () => (
        <UniversalPageContainer
          eyebrow={`Channeled Oracle Inquiries · Part ${qIdx + 1}`}
          title={`Q&A Sacred Insights · Part ${qIdx + 1}`}
          subtitle="Direct intuitive answers addressing your subconscious lessons and highest path"
          footerText="✦ The answers you seek are already echoing within your heart ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto">
            {chunkQA.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>}
                <div className="space-y-2 text-center w-full">
                  <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                    ✦ {item.question} ✦
                  </h3>
                  <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
                    {item.answer}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </UniversalPageContainer>
      ),
    });
  }

  // 3. Action Steps & Aligned Reflection (Part I: Weeks 1 & 2, Part II: Weeks 3 & 4)
  pages.push({
    key: 'action-steps-p1',
    headerTitle: 'ACTION STEPS: WEEKS 1 & 2',
    render: () => (
      <UniversalPageContainer
        eyebrow="Strategic Integration · Part I"
        title="Action Steps: Weeks 1 & 2"
        subtitle="Establishing sovereign clarity, nervous system regulation, and self-trust"
        footerText="✦ Small aligned steps taken in self-trust create quantum breakthroughs ✦"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto">
          <div className="space-y-1.5 text-center w-full">
            <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
              ✦ Week 1: {step1Parsed.title} ✦
            </h3>
            <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
              {step1Parsed.body}
            </p>
          </div>

          <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>

          <div className="space-y-1.5 text-center w-full">
            <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
              ✦ Week 2: {step2Parsed.title} ✦
            </h3>
            <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
              {step2Parsed.body}
            </p>
          </div>
        </div>
      </UniversalPageContainer>
    ),
  });

  pages.push({
    key: 'action-steps-p2',
    headerTitle: 'ACTION STEPS: WEEKS 3 & 4',
    render: () => (
      <UniversalPageContainer
        eyebrow="Strategic Integration · Part II"
        title="Action Steps: Weeks 3 & 4"
        subtitle="Executing courageous shifts and anchoring long-term triumph"
        footerText="✦ You are fully capable of holding the blessing you have prayed for ✦"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto">
          <div className="space-y-1.5 text-center w-full">
            <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
              ✦ Week 3: {step3Parsed.title} ✦
            </h3>
            <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
              {step3Parsed.body}
            </p>
          </div>

          <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>

          <div className="space-y-1.5 text-center w-full">
            <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
              ✦ Week 4: {step4Parsed.title} ✦
            </h3>
            <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
              {step4Parsed.body}
            </p>
          </div>
        </div>
      </UniversalPageContainer>
    ),
  });

  // 4. Your Energetic Mantras (Universal Page Design)
  pages.push({
    key: 'mantras',
    headerTitle: 'YOUR ENERGETIC MANTRAS',
    render: () => (
      <UniversalPageContainer
        eyebrow="Daily Vibrational Tuning"
        title="Your Energetic Mantras"
        subtitle="Speak these sacred affirmations aloud daily to anchor your elevated frequency"
        footerText="✦ Repeat each mantra three times every morning with hand on heart ✦"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
          {mantrasList.map((mantra, i) => (
            <p
              key={i}
              className="text-[19px] font-serif italic font-medium text-[#1F1914] text-center leading-relaxed"
            >
              ✦ &ldquo;{mantra}&rdquo; ✦
            </p>
          ))}
        </div>
      </UniversalPageContainer>
    ),
  });

  // 5. Soul Inquiries & Journaling Prompts
  if (activeTier === 'standard') {
    pages.push({
      key: 'soul-inquiries-standard',
      headerTitle: 'SOUL INQUIRIES & REFLECTION',
      render: () => (
        <UniversalPageContainer
          eyebrow="Introspective Self-Inquiry"
          title="Soul Inquiries & Reflection"
          subtitle="Still your mind and allow your honest sovereign truth to surface"
          footerText="✦ Truth does not shout; it waits patiently in the stillness of your heart ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
            {inquiriesList.slice(0, 3).map((inquiry, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="text-[#A89884] text-center text-sm my-0.5">✦  ·  ✦  ·  ✦</div>}
                <div className="space-y-1 text-center w-full">
                  <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                    Inquiry {i + 1}
                  </h3>
                  <p className="text-[18px] font-serif italic text-[#1F1914] text-center leading-[1.7]">
                    &ldquo;{inquiry}&rdquo;
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </UniversalPageContainer>
      ),
    });
  } else {
    // 2 Dedicated Soul Inquiries Pages for Detailed / Premium
    pages.push({
      key: 'soul-inquiries-p1',
      headerTitle: 'SOUL INQUIRIES · PART I',
      render: () => (
        <UniversalPageContainer
          eyebrow="Introspective Self-Inquiry · Part I"
          title="Soul Inquiries: Core Clarity"
          subtitle="Illuminating the subconscious patterns ready for conscious release"
          footerText="✦ Healing begins the moment you give yourself permission to be honest ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto">
            <div className="space-y-2 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Sacred Inquiry 1 ✦
              </h3>
              <p className="text-[19px] font-serif italic font-medium text-[#1F1914] text-center leading-[1.7]">
                &ldquo;{inquiriesList[0]}&rdquo;
              </p>
              <p className="text-[18px] text-[#6B5E51] font-serif text-center leading-[1.7] pt-1">
                Reflective cue: Where in your past did you learn to compromise your inner knowing, and how does your sovereign future self invite you to act differently today?
              </p>
            </div>

            <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>

            <div className="space-y-2 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Sacred Inquiry 2 ✦
              </h3>
              <p className="text-[19px] font-serif italic font-medium text-[#1F1914] text-center leading-[1.7]">
                &ldquo;{inquiriesList[1] || inquiriesList[0]}&rdquo;
              </p>
              <p className="text-[18px] text-[#6B5E51] font-serif text-center leading-[1.7] pt-1">
                Reflective cue: What fears of conflict or judgment arise when you imagine speaking your unfiltered truth, and how can you hold yourself with compassionate safety?
              </p>
            </div>
          </div>
        </UniversalPageContainer>
      ),
    });

    pages.push({
      key: 'soul-inquiries-p2',
      headerTitle: 'SOUL INQUIRIES · PART II',
      render: () => (
        <UniversalPageContainer
          eyebrow="Introspective Self-Inquiry · Part II"
          title="Soul Inquiries: Radiant Embodiment"
          subtitle="Anchoring unshakeable trust and calling in your highest sovereign reality"
          footerText="✦ Write freely without self-censorship; let your soul speak ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto">
            <div className="space-y-2 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Sacred Inquiry 3 ✦
              </h3>
              <p className="text-[19px] font-serif italic font-medium text-[#1F1914] text-center leading-[1.7]">
                &ldquo;{inquiriesList[2] || inquiriesList[0]}&rdquo;
              </p>
              <p className="text-[18px] text-[#6B5E51] font-serif text-center leading-[1.7] pt-1">
                Reflective cue: Describe how your daily life feels when you wake up completely anchored in your own self-worth, surrounded by reciprocal clarity and authentic peace.
              </p>
            </div>

            <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>

            <div className="space-y-1.5 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Integration Mantra ✦
              </h3>
              <p className="text-[19px] font-serif italic text-[#4A3F35] text-center leading-[1.75]">
                &ldquo;I release the need to prove my worth. I trust my choices, honor my boundaries, and step gracefully into my sovereignty.&rdquo;
              </p>
            </div>
          </div>
        </UniversalPageContainer>
      ),
    });
  }

  // 6. Spiritual Prescription
  if (activeTier === 'standard') {
    pages.push({
      key: 'prescription-standard',
      headerTitle: 'YOUR SPIRITUAL PRESCRIPTION',
      render: () => (
        <UniversalPageContainer
          eyebrow="Holistic Allies & Earth Remedies"
          title="Your Spiritual Prescription"
          subtitle="Sacred frequencies tailored to your cards to ground, clear, and harmonize your field"
          footerText="✦ Nature's frequencies supporting your sovereign elevation ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
            <div className="space-y-1 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Crystal Allies: {parsed.spiritualPrescription.crystals.map((c) => c.name).join(' & ') || 'Rose Quartz & Clear Quartz'} ✦
              </h3>
              <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
                {parsed.spiritualPrescription.crystals[0]?.description ||
                  'Rose Quartz invites deep compassionate self-love, while Clear Quartz cleanses stagnant energy and sharpens intuitive perception.'}
              </p>
            </div>

            <div className="text-[#A89884] text-center text-sm my-0.5">✦  ·  ✦  ·  ✦</div>

            <div className="space-y-1 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Botanical Allies: {parsed.spiritualPrescription.botanicals.map((b) => b.name).join(' & ') || 'Lavender & Rose Petals'} ✦
              </h3>
              <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
                {parsed.spiritualPrescription.botanicals[0]?.description ||
                  'Incorporate lavender to settle an overactive mind and rose petals to safely soften your heart for receptive abundance.'}
              </p>
            </div>

            <div className="text-[#A89884] text-center text-sm my-0.5">✦  ·  ✦  ·  ✦</div>

            <div className="space-y-1 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Guided Somatic Practice: {parsed.spiritualPrescription.mindfulness[0]?.name || 'Heart-Space Golden Light Anchoring'} ✦
              </h3>
              <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
                {parsed.spiritualPrescription.mindfulness[0]?.description ||
                  'Whenever overstimulated, place hands over your heart, inhale golden light for 4 counts, and exhale releasing tension for 6 counts.'}
              </p>
            </div>
          </div>
        </UniversalPageContainer>
      ),
    });
  } else {
    // 2 Dedicated Prescription Pages for Detailed / Premium Tier
    pages.push({
      key: 'prescription-p1',
      headerTitle: 'SPIRITUAL PRESCRIPTION · PART I',
      render: () => (
        <UniversalPageContainer
          eyebrow="Holistic Remedies · Part I"
          title="Earth & Botanical Allies"
          subtitle="Sacred mineral and botanical tools to ground, harmonize, and support your transition"
          footerText="✦ Nature's Sacred Frequencies Supporting Your Elevation ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto">
            <div className="space-y-2 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Crystal Allies: {parsed.spiritualPrescription.crystals.map((c) => c.name).join(' & ') || 'Rose Quartz & Clear Quartz'} ✦
              </h3>
              <p className="text-[18px] leading-[1.75] text-[#1F1914] font-serif text-center">
                {parsed.spiritualPrescription.crystals[0]?.description ||
                  'Keep Rose Quartz nearby to invite in reciprocal, heart-centered love. Pair with Clear Quartz to cut through mental fog, cleanse stagnant frequencies, and illuminate your highest soul path.'}
              </p>
              <p className="text-[18px] italic text-[#6B5E51] font-serif text-center pt-1">
                Suggested Placement: Bedside table or Heart Chakra during evening meditation
              </p>
            </div>

            <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>

            <div className="space-y-2 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Botanical Allies: {parsed.spiritualPrescription.botanicals.map((b) => b.name).join(' & ') || 'Lavender & Rose Petals'} ✦
              </h3>
              <p className="text-[18px] leading-[1.75] text-[#1F1914] font-serif text-center">
                {parsed.spiritualPrescription.botanicals[0]?.description ||
                  'Incorporate lavender into your evening routine to soothe an analytical nervous system. Rose petals act as a gentle heart-opener, helping you soften boundaries safely and receive divine abundance.'}
              </p>
              <p className="text-[18px] italic text-[#6B5E51] font-serif text-center pt-1">
                Suggested Ritual: Evening herbal infusion or warm bath soak with sea salt
              </p>
            </div>
          </div>
        </UniversalPageContainer>
      ),
    });

    pages.push({
      key: 'prescription-p2',
      headerTitle: 'SPIRITUAL PRESCRIPTION · PART II',
      render: () => (
        <UniversalPageContainer
          eyebrow="Holistic Remedies · Part II"
          title="Guided Somatic Mindfulness"
          subtitle="Somatic breathwork and grounding ritual tailored for your energetic realignment"
          footerText="✦ Peace is not the absence of movement; it is stillness within your core ✦"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto">
            <div className="space-y-2 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ {parsed.spiritualPrescription.mindfulness[0]?.name || 'Heart-Space Breathwork & Golden Light Anchoring'} ✦
              </h3>
              <p className="text-[18px] leading-[1.75] text-[#1F1914] font-serif text-center">
                {parsed.spiritualPrescription.mindfulness[0]?.description ||
                  'Whenever you feel overstimulated or caught in mental loops, pause. Place both hands over your chest, take three slow deep diaphragmatic breaths, and visualize warm golden light restoring unshakeable peace through every cell of your being.'}
              </p>
            </div>

            <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>

            <div className="space-y-2 text-center w-full">
              <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                ✦ Daily Somatic Breath Pattern ✦
              </h3>
              <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
                <strong>Inhale (4 Counts):</strong> Breathe in quiet confidence, filling your lungs with renewal.<br />
                <strong>Hold (4 Counts):</strong> Rest in the calm stillness between breaths where truth lives.<br />
                <strong>Exhale (6 Counts):</strong> Release all performance anxiety, doubt, and physical tension.
              </p>
            </div>
          </div>
        </UniversalPageContainer>
      ),
    });
  }

  // 7. Monthly Forecasts (Universal Page for each generated month)
  if (parsed.monthlyForecasts && parsed.monthlyForecasts.length > 0) {
    parsed.monthlyForecasts.forEach((m) => {
      pages.push({
        key: `monthly-forecast-${m.monthNumber}`,
        headerTitle: `MONTH ${m.monthNumber}: ${m.title.toUpperCase()}`,
        render: () => (
          <UniversalPageContainer
            eyebrow={`12-Month Cosmic Oracle · Month ${m.monthNumber} of 12`}
            title={`Month ${m.monthNumber}: ${m.title}`}
            subtitle={`Astrological Sign: ${m.astrologicalSign} · Governing Element: ${m.element}`}
            footerText={`✦ Walking the sacred spiral of Month ${m.monthNumber} with confidence ✦`}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
              <div className="space-y-1 text-center w-full">
                <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                  ✦ Channeled Monthly Energy ✦
                </h3>
                <p className="text-[18px] leading-[1.75] text-[#1F1914] font-serif text-center">
                  {m.forecast}
                </p>
              </div>

              <div className="text-[#A89884] text-center text-sm my-0.5">✦  ·  ✦  ·  ✦</div>

              <div className="space-y-1 text-center w-full">
                <h3 className="font-serif font-bold text-[20px] text-[#1F1914] text-center">
                  ✦ Aligned Practical Action ✦
                </h3>
                <p className="text-[18px] leading-[1.7] text-[#1F1914] font-serif text-center">
                  {m.practicalAdvice}
                </p>
              </div>

              <div className="pt-2 text-center w-full">
                <span className="text-[18px] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block text-center mb-1">
                  ✦ Monthly Affirmation ✦
                </span>
                <p className="text-[19px] font-serif italic font-medium text-[#1F1914] text-center">
                  &ldquo;{m.affirmation}&rdquo;
                </p>
              </div>
            </div>
          </UniversalPageContainer>
        ),
      });
    });
  }

  // 8. Custom Markdown Sections (Unlimited dynamic pages if AI returned extra sections)
  if (parsed.customSections && parsed.customSections.length > 0) {
    parsed.customSections.forEach((sec, sIdx) => {
      const secChunkSize = 2;
      const totalSecPages = Math.ceil(sec.paragraphs.length / secChunkSize);
      for (let spIdx = 0; spIdx < totalSecPages; spIdx++) {
        const pSlice = sec.paragraphs.slice(spIdx * secChunkSize, (spIdx + 1) * secChunkSize);
        pages.push({
          key: `custom-sec-${sIdx + 1}-p${spIdx + 1}`,
          headerTitle: `${sec.title} · PART ${spIdx + 1}`,
          render: () => (
            <UniversalPageContainer
              eyebrow="Deep Channeled Exploration"
              title={totalSecPages > 1 ? `${sec.title} (${spIdx + 1}/${totalSecPages})` : sec.title}
              subtitle="Intuitive guidance and sacred alignment for your path"
              footerText="✦ Channeled with reverence for your sovereign journey ✦"
            >
              <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-xl mx-auto w-full">
                {pSlice.map((pText, pSubIdx) => {
                  const { text: cleanParText, align: parAlign } = parseTextAlignment(pText);
                  const alignClass =
                    parAlign === 'left'
                      ? 'text-left w-full'
                      : parAlign === 'right'
                      ? 'text-right w-full'
                      : parAlign === 'justify'
                      ? 'text-justify w-full'
                      : 'text-center';
                  return (
                    <React.Fragment key={pSubIdx}>
                      {pSubIdx > 0 && <div className="text-[#A89884] text-center text-sm my-1">✦  ·  ✦  ·  ✦</div>}
                      <p className={`text-[18px] leading-[1.75] text-[#1F1914] font-serif ${alignClass}`}>
                        {cleanParText}
                      </p>
                    </React.Fragment>
                  );
                })}
              </div>
            </UniversalPageContainer>
          ),
        });
      }
    });
  }

  // 9. Sacred Closing, Gratitude & Legal Disclaimer (Universal Page Design)
  pages.push({
    key: 'closing-blessing',
    headerTitle: 'SACRED CLOSING & BLESSING',
    render: () => (
      <UniversalPageContainer
        eyebrow="With Gratitude & Divine Light"
        title={`Thank You for Trusting ${effectiveShopName}`}
        subtitle="It has been an honor channeling these intuitive insights for your sacred journey"
        footerText={`© ${new Date().getFullYear()} ${effectiveShopName} · All Rights Reserved`}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto">
          <p className="text-[18px] leading-[1.75] text-[#1F1914] font-serif text-center">
            May this reading illuminate your inner truth, dissolve lingering uncertainty, and remind you of the immense sovereign power you possess. You are the sacred author of your destiny, and the universe is forever conspiring to bring you into resonance with your highest good.
          </p>

          <div className="pt-2 text-center">
            <p className="font-serif italic font-bold text-[20px] text-[#1F1914] text-center">
              With Infinite Love & Blessings,
            </p>
            <p className="text-[19px] font-serif text-[#6B5E51] text-center mt-0.5">
              {effectiveShopName}
            </p>
          </div>

          <div className="space-y-1 text-center border-t border-[#E8E1D5] pt-3 max-w-lg mx-auto">
            <p className="text-[14px] font-bold uppercase tracking-wider text-[#1F1914] text-center">
              ✦ Sacred Divination Disclaimer ✦
            </p>
            <p className="text-[14px] leading-relaxed text-[#6B5E51] font-serif text-center">
              Tarot and numerology readings are offered solely for personal insight, self-reflection, spiritual exploration, and entertainment purposes. The guidance provided is designed to inspire introspection, but does not constitute and should never substitute for licensed medical, psychological, legal, or financial advice.
            </p>
          </div>
        </div>
      </UniversalPageContainer>
    ),
  });
  }

  const dynamicTotalPages = pages.length;

  useEffect(() => {
    if (onTotalPagesCalculated) {
      onTotalPagesCalculated(dynamicTotalPages);
    }
  }, [dynamicTotalPages, onTotalPagesCalculated]);

  return (
    <div className="pdf-renderer flex flex-col items-center gap-10 select-none">
      {pages.map((pageDef, index) => {
        const pageNum = index + 1;
        return (
          <div
            key={pageDef.key || `pdf-page-${pageNum}`}
            id={`pdf-page-${pageNum}`}
            className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            <UniversalPageDecorations
              pageNumber={pageNum}
              totalPages={dynamicTotalPages}
              headerTitle={pageDef.headerTitle}
              brandName={effectiveShopName}
            />
            {pageDef.render(pageNum, dynamicTotalPages)}
          </div>
        );
      })}
    </div>
  );
};
