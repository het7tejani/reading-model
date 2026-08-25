import React from 'react';
import { ReadingInputs } from '../types';
import { calculateLifePath, reduceToSingleDigit, LIFE_PATH_ARCHETYPES } from '../utils/numerology';
import { parseReadingMarkdown } from '../utils/readingParser';
import { getTarotCardImageUrl } from '../utils/tarotImageMapper';
import { cleanTopicTitle } from '../data/readingTopics';
import { getCategorySpecByTopic } from '../data/categoryConfig';
import {
  getTopicMasterBlueprint,
  buildDeepDiveItems,
  buildTwelveMonthItems,
} from '../utils/categoryPageHelper';
import {
  AstrologicalWheelSvg,
  TarotCoverEmblemSvg,
  TarotWelcomeEmblemSvg,
  DaisyFlowerSvg,
  DaisyStemSvg,
  TripleArchOverCardsSvg,
  ColumnSideMotifsSvg,
  UniversalPageDecorations,
  MinimalChakraWatermark,
} from './PdfPageBackgrounds';

interface PdfPagesRendererProps {
  inputs: ReadingInputs;
  markdown: string;
  customTemplatePages?: string[] | null;
}

export const PdfPagesRenderer: React.FC<PdfPagesRendererProps> = ({ inputs, markdown, customTemplatePages }) => {
  const safeTopic = cleanTopicTitle(inputs.topic || 'Future Relationship');
  const categorySpec = getCategorySpecByTopic(inputs.topic || 1);
  const blueprint = getTopicMasterBlueprint(inputs.topic || categorySpec.id);
  const totalPages = blueprint.totalPages;

  const parsed = parseReadingMarkdown(markdown, safeTopic);
  const numerology = calculateLifePath(inputs.dob);

  // Compute detailed calculation steps for Page 3
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
    const finalReduction = sumComponentsVal > 9 
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
  const calculatedLpNumber = numerology?.lifePathNumber || steps.calculatedLifePath || 5;
  const lpArchetypeObj = LIFE_PATH_ARCHETYPES[calculatedLpNumber] || LIFE_PATH_ARCHETYPES[5];

  const card1 = inputs.cards[0] || {
    id: 'card1',
    name: parsed.cards.card1.name || 'Two of Cups',
    keywords: parsed.cards.card1.keywords.length > 0 ? parsed.cards.card1.keywords : ['relationship', 'love', 'romance', 'meeting', 'engagement', 'marriage', 'healing'],
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
    keywords: parsed.cards.card2.keywords.length > 0 ? parsed.cards.card2.keywords : ['restriction', 'limitation', 'stuck', 'bound', 'isolation'],
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
    keywords: parsed.cards.card3.keywords.length > 0 ? parsed.cards.card3.keywords : ['hope', 'healing', 'inspiration', 'guidance', 'renewal'],
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
  const cleanQuestion = inputs.question ? inputs.question.trim() : 'what is the best path forward';

  const numCoreText = parsed.numerology.coreParagraph || `As a Life Path ${calculatedLpNumber}, you channel the vibrational frequency of ${lpArchetypeObj.coreEnergyTitle}, guided by the planetary influence of ${lpArchetypeObj.governingPlanet}. ${lpArchetypeObj.description} At age ${inputs.age || 'this stage of your journey'}, your spirit is being summoned to honor your innate gifts of adaptability, intuitive insight, and authentic self-expression.`;
  const numAppText = parsed.numerology.applicationParagraph || `In relation to "${cleanProblem}" within ${safeTopic}, your Life Path ${calculatedLpNumber} blueprint calls you to recognize that feeling confined, stagnant, or restricted is a sacred signal that your energetic frequency is expanding. By standing sovereign in your truth as ${lpArchetypeObj.archetype}, you dismantle past limitations and invite expansive growth, freedom, and deep clarity into your reality.`;

  const card1P1 = parsed.cards.card1.paragraphs[0] || 'The Two of Cups embodies reciprocal flow and authentic emotional connection.';
  const card1P2 = parsed.cards.card1.paragraphs[1] || 'In your current energy, this reflects a pivotal moment for harmony and mutual understanding.';

  const card2P1 = parsed.cards.card2.paragraphs[0] || 'The Eight of Swords represents mental boundaries and self-imposed limitations.';
  const card2P2 = parsed.cards.card2.paragraphs[1] || 'The blockage you face stems from fear and overthinking rather than external obstacles.';

  const card3P1 = parsed.cards.card3.paragraphs[0] || 'The Star shines as a beacon of renewed hope, peace, and spiritual renewal.';
  const card3P2 = parsed.cards.card3.paragraphs[1] || 'Your path forward invites surrender to optimistic guidance and trusting your divine path.';

  // Module B 3-part structured breakdown for Card 1, Card 2, Card 3
  const card1Core = card1P1;
  const card1Symbolism = `Symbolically rooted in the sacred realm of ${card1.element || 'Water'} and ${card1.arcana || 'Minor'} Arcana currents, ${card1.name} channels the archetype of ${card1.archetype || 'the Intuitive Oracle'}. It mirrors the energetic law of reciprocity—revealing how your inner willingness to receive shape-shifts your external circumstances into authentic alignment.`;
  const card1Direct = card1P2 || 'In your current energy, this marks a sacred turning point to honor your emotional peace and sovereign boundaries without hesitation.';

  const card2Core = card2P1;
  const card2Symbolism = `Governed by the intellectual currents of ${card2.element || 'Air'} and ${card2.arcana || 'Minor'} Arcana tension, ${card2.name} highlights how old mental defensive strategies now act as self-imposed boundaries. It symbolizes the fear of conflict or vulnerability that prevents you from stepping into full visibility.`;
  const card2Direct = card2P2 || 'Your direct message is to stop negotiating with ambiguity. Release the exhausting habit of overthinking and trust that clarity is already within your grasp.';

  const card3Core = card3P1;
  const card3Symbolism = `Radiating the transformative celestial frequency of ${card3.element || 'Air/Fire'} and ${card3.arcana || 'Major'} Arcana illumination, ${card3.name} is an archetypal beacon of renewed hope, divine protection, and synchronicity. It signals that universal forces are aligning to meet your highest standards.`;
  const card3Direct = card3P2 || 'Step boldly forward into this expansive new chapter. Anchor your decisions in joyful optimism, trusting that your sovereign path leads directly to lasting fulfillment.';

  // Synthesis splitting
  const synPars = parsed.synthesisParagraphs.length > 0 ? parsed.synthesisParagraphs : [
    `Your Oracle reading weaves a transformative spiritual bridge between your Life Path ${calculatedLpNumber} vibrational frequency and the dynamic evolutionary passage from ${card1.name}, through ${card2.name}, into the triumphant blessing of ${card3.name}. At this pivotal moment in your journey, you stand at a sacred crossroads where old coping mechanisms are ready to be lovingly dissolved. Your soul is asking you to stop compromising your well-being for temporary comfort, inviting you instead to anchor your life in authentic sovereignty and conscious peace.`,
    `Your core issue—navigating what you are currently moving through—has served as a potent initiation for your boundaries and self-worth. While this circumstance has caused genuine emotional weight and restless reflection, it has simultaneously illuminated what is sacred and non-negotiable for your spirit. The foundational awareness embodied by ${card1.name} proves that you are no longer blind to what requires realignment; your intuition has already sounded the call for renewal and clarity.`,
    `The blockage highlighted by ${card2.name} is not an insurmountable barrier, but an invitation to dismantle mental constructs rooted in fear of judgment or rejection. By recognizing that past disappointments do not hold authority over your future, you reclaim command of your vibrational frequency. When you refuse to negotiate with ambiguity, the path forward clears instantly.`,
    `Moving decisively into the medicine of ${card3.name}, you enter a season of elevated synchronicity and profound emotional freedom. The universe is aligning tangible blessings that honor your loyalty, perseverance, and elevated standards. Trust the unfolding of this passage, for your highest destiny is meeting you at the exact altitude of your self-respect.`,
  ];

  const synthesisPart1 = [synPars[0], synPars[1] || synPars[0]].filter(Boolean);
  const synthesisPart2 = [synPars[2] || synPars[0], synPars[3] || synPars[1] || synPars[0]].filter(Boolean);

  // Module C generation based on topic blueprint
  const is12MonthTopic = blueprint.moduleCMode === 'one_page_per_month';
  const twelveMonthItems = is12MonthTopic
    ? buildTwelveMonthItems(card1.name, card2.name, card3.name, calculatedLpNumber)
    : [];
  const deepDiveItems = !is12MonthTopic
    ? buildDeepDiveItems(categorySpec, inputs, parsed.qaInsights, card1.name, card2.name, card3.name, calculatedLpNumber)
    : [];

  // Parse Action Steps cleanly
  const parseActionStep = (raw: string | undefined, defaultPhase: string, defaultTitle: string) => {
    if (!raw) {
      return {
        phase: defaultPhase,
        title: defaultTitle,
        body: 'Take conscious aligned action to protect your peace and trust divine timing.',
      };
    }
    const clean = raw.replace(/^[-*•\d.]+\s*/, '').trim();
    if (clean.includes(':')) {
      const parts = clean.split(':');
      const stepHeader = parts[0].trim();
      const stepBody = parts.slice(1).join(':').trim();
      return {
        phase: stepHeader,
        title: stepHeader,
        body: stepBody || 'Take conscious aligned action to protect your peace.',
      };
    }
    return {
      phase: defaultPhase,
      title: defaultTitle,
      body: clean,
    };
  };

  const step1Parsed = parseActionStep(parsed.actionSteps[0], 'Phase I • Energetic Sanctuary', 'Energetic Audit & Conscious Boundaries');
  const step2Parsed = parseActionStep(parsed.actionSteps[1], 'Phase II • Shadow Transmutation', 'Dismantling Limiting Assumptions');
  const step3Parsed = parseActionStep(parsed.actionSteps[2], 'Phase III • Sovereignty Activation', `Activating Life Path ${calculatedLpNumber} Authority`);
  const step4Parsed = parseActionStep(parsed.actionSteps[3], 'Phase IV • Sacred Manifestation', `Embodying ${card3.name} Radiant Vision`);

  // Mantras
  const mantrasList = parsed.mantras.length > 0 ? parsed.mantras : [
    'I AM sovereign, grounded, and aligned with my highest truth.',
    'I AM releasing all anxiety and allowing divine flow to guide me.',
    'I AM worthy of effortless abundance, deep clarity, and peace.',
    'I AM stepping into my true power without fear or apology.',
    'I AM anchored in love, protected by the universe, and completely free.',
  ];

  // Inquiries
  const inquiriesList = parsed.soulInquiries.length > 0 ? parsed.soulInquiries : [
    'Where in my life am I still seeking external permission instead of trusting my divine inner knowing?',
    'What outdated fear of conflict or rejection am I ready to release permanently?',
    'What does my most peaceful, abundant, and joyful timeline look like in physical reality?',
  ];

  return (
    <div className="pdf-renderer flex flex-col items-center gap-10 select-none">
      {/* ========================================================= */}
      {/* MODULE A: FRONT MATTER (PAGES 1–4)                        */}
      {/* ========================================================= */}

      {/* PAGE 1: INTRODUCTION OF SHOP / BRAND WELCOME & COVER */}
      <div
        id="pdf-page-1"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={1} totalPages={totalPages} headerTitle="DAISY MEDIUM STUDIO" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
          {/* Shop Header */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.32em] text-[#6B5E51] font-sans font-semibold">
              Sacred Divination & Numerology
            </span>
            <h1 className="text-[26pt] font-serif font-bold tracking-tight text-[#1F1914] uppercase leading-tight">
              Daisy Medium Studio
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] italic text-[#4A3F35]">
              Intuitive Tarot · Cosmic Numerology · Soul Blueprint Channeling
            </p>
          </div>

          {/* Central Tarot Artwork */}
          <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-[460px]">
            <TarotCoverEmblemSvg className="w-[430px] h-[310px] text-[#2C241E]" />
          </div>

          {/* Title and Client Details */}
          <div className="space-y-3 max-w-xl pb-2">
            <div className="space-y-1">
              <span className="text-[8.5pt] uppercase tracking-[0.28em] text-[#6B5E51] font-sans font-semibold">
                Sacred Oracle Transmission For
              </span>
              <h2 className="text-[22pt] font-serif font-bold text-[#1F1914] leading-tight">
                {querentName}
              </h2>
            </div>

            <div className="border-t border-b border-[#D8CEBE] py-3.5 space-y-1">
              <span className="text-[8pt] uppercase tracking-[0.24em] text-[#6B5E51] font-sans block font-semibold">
                Inquiry Focus & Theme
              </span>
              <p className="text-[14pt] font-serif font-bold text-[#1F1914]">
                {categorySpec.headline || topicUpper}
              </p>
              <p className="text-[9.5pt] text-[#6B5E51] italic">
                {categorySpec.title} · Complete {totalPages}-Page Blueprint
              </p>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="text-center text-[8pt] font-sans text-[#6B5E51] tracking-wider uppercase space-y-0.5 border-t border-[#E8E1D5] pt-2 w-full max-w-md">
            <p>Channeled with Reverence by Daisy Hayes</p>
            <p className="text-[7.5pt] text-[#8C7D6D]">
              © {new Date().getFullYear()} Daisy Medium Studio · All Rights Reserved
            </p>
          </div>
        </div>
      </div>

      {/* PAGE 2: CLIENT WELCOME & ENERGY ALIGNMENT */}
      <div
        id="pdf-page-2"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={2} totalPages={totalPages} headerTitle="WELCOME & ENERGY ALIGNMENT" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
          <div className="space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Sacred Alignment & Intention
            </span>
            <h1 className="text-[24pt] font-serif font-bold text-[#1F1914]">
              Welcome, Beloved {querentName}
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#6B5E51]">
              Entering a quiet space of intuitive resonance and soul clarity
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-center my-3">
            <TarotWelcomeEmblemSvg className="w-[200px] h-[48px] text-[#4A3F35]" />
          </div>

          <div className="max-w-xl text-justify space-y-4 my-auto">
            <p className="text-[10.5pt] leading-[1.65] text-[#1F1914]">
              You have been guided to this sacred reading by divine synchronicity. The universe does not operate on coincidence; every card drawn, planetary transit, and numerological vibration in this document was channeled with focused intention to illuminate your true soul path.
            </p>
            <p className="text-[10.5pt] leading-[1.65] text-[#1F1914]">
              This reading is designed not as a rigid prediction, but as a sovereign mirror of your energetic field. It honors your free will while offering deep clarity on what subconscious blocks are ready to be dissolved and what triumphant blessings are preparing to enter your reality.
            </p>
            <div className="border-t border-b border-[#D8CEBE] py-3 text-center my-2">
              <p className="text-[10.5pt] italic text-[#4A3F35] font-serif">
                &ldquo;Before you explore the pages ahead, take three slow diaphragmatic breaths. Place your hands over your heart and allow your nervous system to settle into receptive peace.&rdquo;
              </p>
            </div>
          </div>

          <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Grounded in Love, Guided by Wisdom, Anchored in Sovereignty ✦
            </p>
          </div>
        </div>
      </div>

      {/* PAGE 3: NUMEROLOGY & PERSONAL VIBRATION OVERVIEW */}
      <div
        id="pdf-page-3"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={3} totalPages={totalPages} headerTitle="COSMIC NUMEROLOGY PROFILE" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Cosmic Numerology Profile
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Life Path {calculatedLpNumber} · {lpArchetypeObj.coreEnergyTitle}
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Vibrational calculation derived from your Date of Birth ({inputs.dob || '11/05/2005'})
            </p>
          </div>

          {/* Minimalist Mathematical Breakdown (Clean Editorial Style) */}
          <div className="border-t border-b border-[#D8CEBE] py-3.5 my-auto max-w-2xl mx-auto w-full space-y-2.5">
            <div className="flex items-center justify-between text-[8.5pt] font-sans text-[#6B5E51] uppercase tracking-wider pb-1 border-b border-[#E8E1D5]">
              <span className="font-semibold">Mathematical Step Breakdown</span>
              <span>DOB: {inputs.dob || '11/05/2005'}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-[10pt] font-sans py-1">
              <div>
                <span className="text-[8pt] font-bold text-[#6B5E51] block uppercase tracking-widest mb-0.5">Month</span>
                <span className="font-medium text-[#1F1914]">{steps.monthSteps}</span>
              </div>
              <div>
                <span className="text-[8pt] font-bold text-[#6B5E51] block uppercase tracking-widest mb-0.5">Day</span>
                <span className="font-medium text-[#1F1914]">{steps.daySteps}</span>
              </div>
              <div>
                <span className="text-[8pt] font-bold text-[#6B5E51] block uppercase tracking-widest mb-0.5">Year</span>
                <span className="font-medium text-[#1F1914]">{steps.yearSteps}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-[9.5pt] font-sans text-[#1F1914]">
              <span><strong>Sum:</strong> {steps.sumComponents}</span>
              <span><strong>Final Reduction:</strong> {steps.finalReduction} → <strong className="text-[#6B5E51]">Life Path {calculatedLpNumber}</strong></span>
            </div>
          </div>

          {/* Interpretive Text */}
          <div className="space-y-4 my-auto max-w-2xl mx-auto">
            <div className="space-y-1">
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                ✦ Core Vibrational Essence
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                {numCoreText}
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                ✦ Application to Your Journey
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                {numAppText}
              </p>
            </div>
          </div>

          <div className="border-t border-[#E8E1D5] pt-2 flex items-center justify-between text-[8pt] font-sans text-[#6B5E51] uppercase tracking-wider">
            <span>Governing Planet: {lpArchetypeObj.governingPlanet}</span>
            <span>Archetype: {lpArchetypeObj.archetype}</span>
          </div>
        </div>
      </div>

      {/* PAGE 4: TAROT / ORACLE SYSTEM OVERVIEW & METHODOLOGY */}
      <div
        id="pdf-page-4"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={4} totalPages={totalPages} headerTitle="TAROT SPREAD OVERVIEW" />

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

          {/* Cards Showcase */}
          <div className="relative w-full my-auto flex flex-col items-center">
            <TripleArchOverCardsSvg className="w-[580px] h-[260px] text-[#C4B6A4] absolute top-[-10px] pointer-events-none opacity-30" />

            <div className="grid grid-cols-3 gap-6 w-full max-w-2xl z-10">
              {/* Card 1 Mini */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-[120px] h-[190px] rounded overflow-hidden border border-[#A89884] shadow-md bg-white">
                  <img src={card1Img} alt={card1.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[8pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold">
                  Card I · Current
                </span>
                <p className="font-serif font-bold text-[11.5pt] text-[#1F1914]">{card1.name}</p>
              </div>

              {/* Card 2 Mini */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-[120px] h-[190px] rounded overflow-hidden border border-[#A89884] shadow-md bg-white">
                  <img src={card2Img} alt={card2.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[8pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold">
                  Card II · Blockage
                </span>
                <p className="font-serif font-bold text-[11.5pt] text-[#1F1914]">{card2.name}</p>
              </div>

              {/* Card 3 Mini */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-[120px] h-[190px] rounded overflow-hidden border border-[#A89884] shadow-md bg-white">
                  <img src={card3Img} alt={card3.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[8pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51] font-semibold">
                  Card III · Forward
                </span>
                <p className="font-serif font-bold text-[11.5pt] text-[#1F1914]">{card3.name}</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl text-justify space-y-2.5 my-auto">
            <p className="text-[10.5pt] leading-[1.65] text-[#1F1914]">
              The triad above forms the foundational energetic spine of your reading. Card 1 illuminates the present vibrational climate you embody; Card 2 unmasks subconscious resistance or external interference; Card 3 reveals your highest evolutionary pathway forward.
            </p>
          </div>

          <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
            <p className="text-[8.5pt] font-sans uppercase tracking-[0.2em] text-[#6B5E51]">
              Detailed individual card breakdowns and cross-synthesis follow in Module B.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODULE B: COMMON TAROT CORE (PAGES 5–12)                  */}
      {/* ========================================================= */}

      {/* PAGE 5: CARD 1 EMBODIMENT & ARTWORK */}
      <div
        id="pdf-page-5"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={5} totalPages={totalPages} headerTitle="CARD I · CURRENT ENERGY" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
          <div className="space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              The Focal Point · Current Energy
            </span>
            <h1 className="text-[24pt] font-serif font-bold text-[#1F1914] leading-tight">
              {card1.name}
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Element: {card1.element || 'Water'} · Arcana: {card1.arcana || 'Minor'}
            </p>
          </div>

          {/* Large Card Artwork */}
          <div className="my-auto flex flex-col items-center">
            <div className="w-[240px] h-[380px] rounded overflow-hidden border border-[#A89884] shadow-lg bg-white">
              <img src={card1Img} alt={card1.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Keywords Clean Editorial List */}
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
              &ldquo;{card1.affirmation || 'I align with divine flow and authentic emotional connection.'}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* PAGE 6: CARD 1 DETAILED MEANING & INTERPRETATION */}
      <div
        id="pdf-page-6"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={6} totalPages={totalPages} headerTitle="CARD I · CHANNELED MEANING" />

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
      </div>

      {/* PAGE 7: CARD 2 EMBODIMENT & ARTWORK */}
      <div
        id="pdf-page-7"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={7} totalPages={totalPages} headerTitle="CARD II · THE BLOCKAGE" />

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

          {/* Large Card Artwork */}
          <div className="my-auto flex flex-col items-center">
            <div className="w-[240px] h-[380px] rounded overflow-hidden border border-[#A89884] shadow-lg bg-white">
              <img src={card2Img} alt={card2.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Keywords Clean Editorial List */}
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
              &ldquo;{card2.affirmation || 'I release perceived limits and trust divine truth.'}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* PAGE 8: CARD 2 DETAILED MEANING & INTERPRETATION */}
      <div
        id="pdf-page-8"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={8} totalPages={totalPages} headerTitle="CARD II · CHANNELED MEANING" />

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
              Illuminating subconscious resistance and fear-based patterns
            </p>
          </div>

          <div className="space-y-[18px] my-auto max-w-2xl mx-auto">
            <div className="space-y-1.5">
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                1. Core Meaning & Shadow Blockage
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                {card2Core}
              </p>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                2. Symbolism & Subconscious Resistance
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
      </div>

      {/* PAGE 9: CARD 3 EMBODIMENT & ARTWORK */}
      <div
        id="pdf-page-9"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={9} totalPages={totalPages} headerTitle="CARD III · PATH FORWARD" />

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

          {/* Large Card Artwork */}
          <div className="my-auto flex flex-col items-center">
            <div className="w-[240px] h-[380px] rounded overflow-hidden border border-[#A89884] shadow-lg bg-white">
              <img src={card3Img} alt={card3.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Keywords Clean Editorial List */}
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
      </div>

      {/* PAGE 10: CARD 3 DETAILED MEANING & INTERPRETATION */}
      <div
        id="pdf-page-10"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={10} totalPages={totalPages} headerTitle="CARD III · CHANNELED MEANING" />

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
      </div>

      {/* PAGE 11: SYNTHESIS & CROSS-ANALYSIS (PART I) */}
      <div
        id="pdf-page-11"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={11} totalPages={totalPages} headerTitle="SYNTHESIS · PART I" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Holistic Oracle Weaving · Part I
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Synthesis & Cross-Analysis
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Connecting Life Path {calculatedLpNumber}, the 3 Cards, and your Sovereign Journey
            </p>
          </div>

          <div className="space-y-[20px] my-auto max-w-2xl mx-auto">
            {synthesisPart1.map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  {idx === 0 ? '✦ 1. Core Synthesis & Life Path Weaving' : '✦ 2. Transforming the Central Resistance'}
                </h2>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                  {p}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Synthesis continues on the next page ✦
            </p>
          </div>
        </div>
      </div>

      {/* PAGE 12: SYNTHESIS & DEEP CORE MESSAGE (PART II) */}
      <div
        id="pdf-page-12"
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={12} totalPages={totalPages} headerTitle="SYNTHESIS · PART II" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Holistic Oracle Weaving · Part II
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Deep Core Message & Breakthrough
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Anchoring spiritual authority and triumphant alignment into physical form
            </p>
          </div>

          <div className="space-y-[20px] my-auto max-w-2xl mx-auto">
            {synthesisPart2.map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  {idx === 0 ? '✦ 1. Dissolving Outdated Narratives' : '✦ 2. Stepping into Triumphant Grace'}
                </h2>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                  {p}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
              &ldquo;Your greatest power lies in aligning your daily actions with your divine worth.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODULE C: INTERACTIVE Q&A / SPECIALIZED BREAKDOWNS        */}
      {/* ========================================================= */}

      {/* 12-MONTH FORECAST (TOPIC 6: 12 DEDICATED PAGES, P13–P24) */}
      {is12MonthTopic &&
        twelveMonthItems.map((monthItem, mIdx) => {
          const pageNum = 13 + mIdx;
          return (
            <div
              key={`month-${pageNum}`}
              id={`pdf-page-${pageNum}`}
              className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
            >
              <UniversalPageDecorations
                pageNumber={pageNum}
                totalPages={totalPages}
                headerTitle={`12-MONTH FORECAST • ${monthItem.monthName.toUpperCase()}`}
              />

              <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
                <div className="text-center space-y-1.5 pt-2">
                  <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
                    Astrological Alignment: {monthItem.astrologicalSign} · Element: {monthItem.element}
                  </span>
                  <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
                    {monthItem.monthName}: {monthItem.title}
                  </h1>
                  <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
                </div>

                <div className="space-y-[20px] my-auto max-w-2xl mx-auto">
                  <div className="space-y-1.5">
                    <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                      ✦ Channeled Monthly Energy & Focus
                    </h2>
                    <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                      {monthItem.forecast}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#E8E1D5]">
                    <h2 className="font-sans font-bold text-[8.5pt] uppercase tracking-wider text-[#6B5E51]">
                      Practical Aligned Action
                    </h2>
                    <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] font-serif text-justify">
                      {monthItem.practicalAdvice}
                    </p>
                  </div>
                </div>

                <div className="text-center border-t border-[#E8E1D5] pt-2">
                  <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
                    &ldquo;{monthItem.affirmation}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          );
        })}

      {/* TOPICS WITH 2-PAGE DEEP DIVES (MODULE C) */}
      {!is12MonthTopic &&
        deepDiveItems.map((item, qIdx) => {
          const page1Num = 13 + qIdx * 2;
          const page2Num = page1Num + 1;

          return (
            <React.Fragment key={`deep-dive-${item.questionNumber}`}>
              {/* PAGE 1: CHANNELED ORACLE TRANSMISSION */}
              <div
                id={`pdf-page-${page1Num}`}
                className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
              >
                <UniversalPageDecorations
                  pageNumber={page1Num}
                  totalPages={totalPages}
                  headerTitle={`${blueprint.title.toUpperCase()} · INQUIRY ${item.questionNumber} (PART I)`}
                />

                <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center z-10 text-center font-serif">
                  <div className="space-y-1.5 max-w-xl pt-2">
                    <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
                      {item.subTitle}
                    </span>
                    <h1 className="text-[20pt] font-serif font-bold leading-snug text-[#1F1914]">
                      {item.question}
                    </h1>
                    <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
                  </div>

                  <div className="w-full my-auto space-y-2 max-w-2xl mx-auto">
                    <span className="text-[8pt] uppercase tracking-[0.28em] font-sans font-bold text-[#6B5E51] block text-left">
                      ✦ Primary Oracle Transmission:
                    </span>
                    <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                      {item.oracleTransmission}
                    </p>
                  </div>

                  <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
                    <p className="text-[9.5pt] italic text-[#4A3F35] font-serif">
                      {item.somaticKey}
                    </p>
                  </div>
                </div>
              </div>

              {/* PAGE 2: SUBCONSCIOUS ARCHITECTURE & REALIGNMENT */}
              <div
                id={`pdf-page-${page2Num}`}
                className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
              >
                <UniversalPageDecorations
                  pageNumber={page2Num}
                  totalPages={totalPages}
                  headerTitle={`${blueprint.title.toUpperCase()} · INQUIRY ${item.questionNumber} (PART II)`}
                />

                <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
                  <div className="text-center space-y-1.5 pt-2">
                    <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
                      Deep Subconscious Architecture & Alignment
                    </span>
                    <h1 className="text-[20pt] font-serif font-bold text-[#1F1914]">
                      Inquiry {item.questionNumber}: Realization & Action
                    </h1>
                    <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
                  </div>

                  <div className="space-y-[20px] my-auto max-w-2xl mx-auto">
                    <div className="space-y-1.5">
                      <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                        ✦ Subconscious Energetic Undercurrents
                      </h2>
                      <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                        {item.subconsciousArchitecture}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#E8E1D5]">
                      <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                        ✦ Sovereign Alignment & Aligned Action
                      </h2>
                      <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                        {item.sovereignRealignment}
                      </p>
                    </div>
                  </div>

                  <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
                    <span className="text-[8pt] font-sans uppercase tracking-[0.25em] text-[#6B5E51] block font-semibold mb-0.5">
                      {item.tag}
                    </span>
                    <p className="text-[9.5pt] italic text-[#1F1914]">
                      &ldquo;{item.anchor}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}

      {/* ========================================================= */}
      {/* MODULE D: ACTION ROADMAPS & BLUEPRINTS                    */}
      {/* ========================================================= */}

      {/* ROADMAP PART I */}
      <div
        id={`pdf-page-${blueprint.moduleDRange[0]}`}
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations
          pageNumber={blueprint.moduleDRange[0]}
          totalPages={totalPages}
          headerTitle="30-DAY INTEGRATION · WEEKS 1 & 2"
        />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Practical Realization · Part I (Days 1–14)
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              {blueprint.roadmapTitle}
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              A structured passage of conscious realignment, shadow dissolution, and empowered manifestation
            </p>
          </div>

          <div className="space-y-[20px] my-auto">
            {/* Week 1 */}
            <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                Week 1: Days 1–7 · Current Energy Alignment
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                Attuning to {card1.name} & Establishing Sanctuary
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                Spend your first seven days conducting a compassionate energetic audit. Notice where authentic reciprocity flows effortlessly and where you feel drained by obligation or ambiguity. Anchor yourself by establishing non-negotiable boundaries around your sleep, mental space, and emotional output.
              </p>
              <p className="text-[9.5pt] text-[#4A3F35] italic pt-0.5">
                <strong className="font-sans font-semibold not-italic text-[#6B5E51]">✦ Somatic Practice: </strong>
                Begin each morning with 5 minutes of mindful breathwork, placing hands over your heart and declaring: <em>&ldquo;I choose my own peace first.&rdquo;</em>
              </p>
            </div>

            {/* Week 2 */}
            <div className="space-y-1.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                Week 2: Days 8–14 · Blockage Dissolution & Shadow Work
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                Transcending {card2.name} & Interrupting Mental Loops
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                During the second week, bring gentle awareness to reflexive doubt, over-analysis, or fears of conflict. Recognize that hesitation is simply an outdated defense mechanism trying to keep you safe. Whenever catastrophic narratives surface, challenge them with objective truth and nervous system soothing.
              </p>
              <p className="text-[9.5pt] text-[#4A3F35] italic pt-0.5">
                <strong className="font-sans font-semibold not-italic text-[#6B5E51]">✦ Somatic Practice: </strong>
                Engage in 6 slow vagus nerve reset breaths (inhale 4s, exhale 6s) whenever anxiety strikes, releasing the perceived need for control.
              </p>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Daily conscious alignment establishes lasting inner peace ✦
            </p>
          </div>
        </div>
      </div>

      {/* ROADMAP PART II / TIMELINE (IF MODULE D HAS 4 OR 6 PAGES) */}
      <div
        id={`pdf-page-${blueprint.moduleDRange[0] + 1}`}
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations
          pageNumber={blueprint.moduleDRange[0] + 1}
          totalPages={totalPages}
          headerTitle="30-DAY INTEGRATION · WEEKS 3 & 4"
        />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Practical Realization · Part II (Days 15–30)
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              {blueprint.roadmapTitle}
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Anchoring higher consciousness and sovereignty into your daily choices and physical reality
            </p>
          </div>

          <div className="space-y-[20px] my-auto">
            {/* Week 3 */}
            <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                Week 3: Days 15–21 · Numerological Sovereignty Activation
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                Activating Life Path {calculatedLpNumber} Core Authority
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                Step into conscious alignment with your innate soul gifts as {lpArchetypeObj.archetype || 'a Sovereign Seeker'}. Make decisions rooted in self-respect, creative confidence, and intuitive discernment rather than seeking permission or external validation. Your authority comes from alignment, not struggle.
              </p>
              <p className="text-[9.5pt] text-[#4A3F35] italic pt-0.5">
                <strong className="font-sans font-semibold not-italic text-[#6B5E51]">✦ Somatic Practice: </strong>
                Stand tall, visualize golden roots descending from your feet into the earth, and affirm: <em>&ldquo;I am safe, sovereign, and divinely guided.&rdquo;</em>
              </p>
            </div>

            {/* Week 4 */}
            <div className="space-y-1.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                Week 4: Days 22–30 · Radiant Manifestation & Path Forward
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                Embodying {card3.name} & Anchoring Long-Term Harmony
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                Seal your 30-day transformation by stepping decisively into the elevated medicine of {card3.name}. Approach your life and relationships with open-hearted optimism, celebrate the profound mental shifts you have achieved, and welcome reciprocal goodwill and effortless synchronicity.
              </p>
              <p className="text-[9.5pt] text-[#4A3F35] italic pt-0.5">
                <strong className="font-sans font-semibold not-italic text-[#6B5E51]">✦ Somatic Practice: </strong>
                Write down three tangible blessings each evening, thanking the universe for bringing divine clarity, joy, and peace into your reality.
              </p>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
              &ldquo;Small, daily alignments build the bridge to your highest potential.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ACTION STEPS PART I (STEPS 1 & 2) */}
      {blueprint.moduleDRange[1] >= blueprint.moduleDRange[0] + 2 && (
        <div
          id={`pdf-page-${blueprint.moduleDRange[0] + 2}`}
          className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
        >
          <UniversalPageDecorations
            pageNumber={blueprint.moduleDRange[0] + 2}
            totalPages={totalPages}
            headerTitle="ACTION STEPS · PART I"
          />

          <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
            <div className="text-center space-y-1.5 pt-2">
              <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
                Practical Application · Steps 1 & 2
              </span>
              <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
                {blueprint.actionTitle}
              </h1>
              <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            </div>

            <div className="space-y-[20px] my-auto">
              <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3.5">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                  {step1Parsed.phase}
                </span>
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  {step1Parsed.title}
                </h2>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  {step1Parsed.body}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                  {step2Parsed.phase}
                </span>
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  {step2Parsed.title}
                </h2>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  {step2Parsed.body}
                </p>
              </div>
            </div>

            <div className="text-center border-t border-[#E8E1D5] pt-2">
              <p className="text-[9pt] font-serif italic text-[#6B5E51]">
                ✦ Moving with Intention and Sovereign Discernment ✦
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ACTION STEPS PART II (STEPS 3 & 4) */}
      {blueprint.moduleDRange[1] >= blueprint.moduleDRange[0] + 3 && (
        <div
          id={`pdf-page-${blueprint.moduleDRange[0] + 3}`}
          className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
        >
          <UniversalPageDecorations
            pageNumber={blueprint.moduleDRange[0] + 3}
            totalPages={totalPages}
            headerTitle="ACTION STEPS · PART II"
          />

          <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
            <div className="text-center space-y-1.5 pt-2">
              <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
                Practical Application · Steps 3 & 4
              </span>
              <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
                {blueprint.actionTitle}
              </h1>
              <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            </div>

            <div className="space-y-[20px] my-auto">
              <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3.5">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                  {step3Parsed.phase}
                </span>
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  {step3Parsed.title}
                </h2>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  {step3Parsed.body}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                  {step4Parsed.phase}
                </span>
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  {step4Parsed.title}
                </h2>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  {step4Parsed.body}
                </p>
              </div>
            </div>

            <div className="text-center border-t border-[#E8E1D5] pt-2">
              <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
                &ldquo;Small, aligned daily steps create monumental spiritual transformations.&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODULE E: INTEGRATION, HEALING & CLOSING                  */}
      {/* ========================================================= */}

      {/* ELEMENTAL & ARCHETYPAL BLUEPRINT (IF AT LEAST 8 CLOSING PAGES) */}
      {blueprint.moduleERange[1] - blueprint.moduleERange[0] + 1 >= 8 && (
        <div
          id={`pdf-page-${blueprint.moduleERange[0]}`}
          className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
        >
          <UniversalPageDecorations
            pageNumber={blueprint.moduleERange[0]}
            totalPages={totalPages}
            headerTitle="ELEMENTAL & ARCHETYPAL BLUEPRINT"
          />

          <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
            <div className="text-center space-y-1.5 pt-2">
              <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
                Cosmic Harmony & Sacred Dynamics
              </span>
              <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
                Elemental & Archetypal Blueprint
              </h1>
              <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
              <p className="text-[10pt] font-serif italic text-[#4A3F35]">
                Understanding the interplay of Elements and Archetypes shaping your energetic landscape
              </p>
            </div>

            <div className="space-y-[18px] my-auto">
              {/* Card 1 Blueprint */}
              <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3">
                <div className="flex items-center justify-between pb-1">
                  <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                    1. {card1.name} — Element: {card1.element || 'Water'}
                  </h2>
                  <span className="text-[8pt] font-sans font-semibold uppercase tracking-wider text-[#6B5E51]">
                    Archetype: {card1.archetype || 'Intuitive Oracle'}
                  </span>
                </div>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  {card1.name} introduces the fluid, intuitive currents of {card1.element || 'Water'}. It asks you to tune into your visceral gut feelings and emotional signals rather than second-guessing your initial instinct.
                </p>
              </div>

              {/* Card 2 Blueprint */}
              <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3">
                <div className="flex items-center justify-between pb-1">
                  <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                    2. {card2.name} — Element: {card2.element || 'Air'}
                  </h2>
                  <span className="text-[8pt] font-sans font-semibold uppercase tracking-wider text-[#6B5E51]">
                    Archetype: {card2.archetype || 'Mindful Guardian'}
                  </span>
                </div>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  {card2.name} represents the mental, communicative realm of {card2.element || 'Air'}. It cautions against becoming trapped in excessive rumination or cognitive loops, reminding you to ground your thoughts in objective truth.
                </p>
              </div>

              {/* Card 3 Blueprint */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between pb-1">
                  <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                    3. {card3.name} — Element: {card3.element || 'Fire'}
                  </h2>
                  <span className="text-[8pt] font-sans font-semibold uppercase tracking-wider text-[#6B5E51]">
                    Archetype: {card3.archetype || 'Cosmic Healer'}
                  </span>
                </div>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  {card3.name} ignites the transformative inspiration of {card3.element || 'Fire'}. It fuels your sovereign forward movement, ensuring that clarity translates into empowered daily choices and triumphant destiny.
                </p>
              </div>
            </div>

            <div className="text-center border-t border-[#E8E1D5] pt-2">
              <p className="text-[8.5pt] font-sans text-[#6B5E51] uppercase tracking-wider">
                ✦ Elemental balance unlocks effortless flow and clarity across your path ✦
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PAGE N-5: ENERGETIC MANTRAS & AFFIRMATIONS */}
      <div
        id={`pdf-page-${totalPages - 5}`}
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={totalPages - 5} totalPages={totalPages} headerTitle="DAILY AFFIRMATIONS & MANTRAS" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Daily Affirmation & Focus
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Your Energetic Mantras
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif text-[#4A3F35]">
              Speak these aloud daily to anchor the higher vibration of your reading
            </p>
          </div>

          <div className="space-y-3.5 max-w-xl mx-auto w-full my-auto">
            {mantrasList.map((m, idx) => (
              <div
                key={idx}
                className="py-2.5 border-y border-[#E8E1D5] text-center flex items-center justify-center gap-3 px-3"
              >
                <span className="text-[#A89884] text-xs font-serif">✦</span>
                <p className="font-serif italic font-medium text-[12.5pt] text-[#1F1914] leading-snug">
                  &ldquo;{m.replace(/^["']|["']$/g, '')}&rdquo;
                </p>
                <span className="text-[#A89884] text-xs font-serif">✦</span>
              </div>
            ))}
          </div>

          <div className="text-center max-w-xl mx-auto w-full border-t border-[#E8E1D5] pt-2">
            <p className="text-[8.5pt] font-sans text-[#6B5E51] uppercase tracking-wider">
              Repeat each mantra 3 times every morning while placing your hand on your heart.
            </p>
          </div>
        </div>
      </div>

      {/* PAGE N-4: SOUL INQUIRIES & JOURNALING PROMPTS */}
      <div
        id={`pdf-page-${totalPages - 4}`}
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={totalPages - 4} totalPages={totalPages} headerTitle="SOUL INQUIRIES · PART I" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Introspective Journaling · Part I
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Soul Inquiries
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif text-[#4A3F35]">
              Take a quiet moment of stillness to reflect. Write your most honest truth below.
            </p>
          </div>

          <div className="space-y-6 my-auto">
            {inquiriesList.slice(0, 2).map((inq, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="font-serif font-bold text-[13pt] text-[#6B5E51]">{idx + 1}.</span>
                  <p className="font-serif font-bold text-[12.5pt] text-[#1F1914] leading-snug">{inq}</p>
                </div>
                <div className="space-y-4 pt-1">
                  <div className="border-b border-[#E8E1D5]"></div>
                  <div className="border-b border-[#E8E1D5]"></div>
                  <div className="border-b border-[#E8E1D5]"></div>
                  <div className="border-b border-[#E8E1D5]"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Honoring the Sacred Truth of Your Inner Voice ✦
            </p>
          </div>
        </div>
      </div>

      {/* PAGE N-3: SOUL REALIZATION & NOTES SECTION */}
      <div
        id={`pdf-page-${totalPages - 3}`}
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={totalPages - 3} totalPages={totalPages} headerTitle="SOUL INQUIRIES · PART II" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Introspective Journaling · Part II
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Soul Realization & Notes
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif text-[#4A3F35]">
              Deepening your inner inquiry and capturing breakthrough insights
            </p>
          </div>

          <div className="space-y-6 my-auto">
            {/* Inquiry 3 */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-serif font-bold text-[13pt] text-[#6B5E51]">3.</span>
                <p className="font-serif font-bold text-[12.5pt] text-[#1F1914] leading-snug">
                  {inquiriesList[2] || 'What is the highest vision I now hold for my sacred journey?'}
                </p>
              </div>
              <div className="space-y-4 pt-1">
                <div className="border-b border-[#E8E1D5]"></div>
                <div className="border-b border-[#E8E1D5]"></div>
                <div className="border-b border-[#E8E1D5]"></div>
              </div>
            </div>

            {/* Sacred Breakthrough Space */}
            <div className="space-y-2 pt-1">
              <span className="text-[8.5pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block">
                My Core Soul Breakthrough & Epiphany:
              </span>
              <div className="space-y-4 pt-1">
                <div className="border-b border-[#E8E1D5]"></div>
                <div className="border-b border-[#E8E1D5]"></div>
                <div className="border-b border-[#E8E1D5]"></div>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[8.5pt] font-sans text-[#6B5E51] uppercase tracking-wider">
              There are no wrong answers; allow your subconscious intuition to write freely.
            </p>
          </div>
        </div>
      </div>

      {/* PAGE N-2: SACRED EARTH, BOTANICAL & CRYSTAL ALLIES */}
      <div
        id={`pdf-page-${totalPages - 2}`}
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={totalPages - 2} totalPages={totalPages} headerTitle="SPIRITUAL PRESCRIPTION · PART I" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Holistic Remedies · Part I
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Sacred Earth & Botanical Allies
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif text-[#4A3F35]">
              Sacred mineral and botanical tools to ground, harmonize, and support your energetic transition
            </p>
          </div>

          <div className="space-y-5 my-auto">
            {/* Crystals */}
            <div className="space-y-1.5 border-b border-[#E8E1D5] pb-4">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                • Earth Element · Crystal Allies
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                {parsed.spiritualPrescription.crystals.map(c => c.name).join(' & ') || 'Rose Quartz & Clear Quartz'}
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                {parsed.spiritualPrescription.crystals[0]?.description ||
                  `Keep Rose Quartz nearby to invite in reciprocal, heart-centered love. Pair with Clear Quartz to cut through mental fog, cleanse stagnant frequencies, and illuminate your highest soul path.`}
              </p>
              <div className="mt-1.5 pt-1 text-[8pt] font-sans text-[#6B5E51] flex items-center justify-between">
                <span>Placement: Bedside or Heart Chakra</span>
                <span>Vibration: Cleansing & Unconditional Love</span>
              </div>
            </div>

            {/* Botanicals */}
            <div className="space-y-1.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                • Flora Element · Botanical Allies
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                {parsed.spiritualPrescription.botanicals.map(b => b.name).join(' & ') || 'Lavender & Rose Petals'}
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                {parsed.spiritualPrescription.botanicals[0]?.description ||
                  `Incorporate lavender into your evening routine to soothe an analytical nervous system. Rose petals act as a gentle heart-opener, helping you soften boundaries safely and receive divine abundance.`}
              </p>
              <div className="mt-1.5 pt-1 text-[8pt] font-sans text-[#6B5E51] flex items-center justify-between">
                <span>Usage: Herbal Infusion or Bath Soak</span>
                <span>Essence: Peace, Softening & Receptivity</span>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Nature's Sacred Frequencies Supporting Your Elevation ✦
            </p>
          </div>
        </div>
      </div>

      {/* PAGE N-1: SACRED MINDFULNESS & GROUNDING PRACTICE */}
      <div
        id={`pdf-page-${totalPages - 1}`}
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={totalPages - 1} totalPages={totalPages} headerTitle="SPIRITUAL PRESCRIPTION · PART II" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Holistic Remedies · Part II
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Sacred Mindfulness Practice
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif text-[#4A3F35]">
              Somatic breathwork and grounding ritual tailored for your energetic realignment
            </p>
          </div>

          <div className="space-y-[18px] my-auto">
            <div>
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block mb-1">
                • Spirit Element · Guided Somatic Practice
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914] mb-1.5">
                {parsed.spiritualPrescription.mindfulness[0]?.name || 'Heart-Space Breathwork & Golden Light Anchoring'}
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                {parsed.spiritualPrescription.mindfulness[0]?.description ||
                  `Whenever you feel overstimulated or caught in mental loops, pause. Place both hands over your chest, take three slow deep diaphragmatic breaths, and visualize warm golden light restoring unshakeable peace through every cell of your being.`}
              </p>
            </div>

            <div className="border-t border-[#E8E1D5] pt-3 space-y-2">
              <h3 className="font-serif font-bold text-[12pt] text-[#1F1914]">
                Step-by-Step Grounding Ritual:
              </h3>
              <div className="space-y-1.5 text-[10pt] leading-[1.5] text-[#1F1914]">
                <p><strong>1. Posture:</strong> Sit upright with feet flat on the ground and spine relaxed.</p>
                <p><strong>2. Inhale (4 counts):</strong> Breathe in quiet confidence, filling your lungs with renewal.</p>
                <p><strong>3. Hold (4 counts):</strong> Rest in the stillness between breaths where clarity resides.</p>
                <p><strong>4. Exhale (6 counts):</strong> Release all performance anxiety, doubt, and tension.</p>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
              &ldquo;Peace is not the absence of movement; it is the presence of stillness within your core.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* PAGE N: OUTRO, THANK YOU & NEXT STEPS / DISCLAIMER */}
      <div
        id={`pdf-page-${totalPages}`}
        className="pdf-page w-[794px] h-[1123px] relative bg-[#FAF7EE] text-[#1F1914] overflow-hidden shadow-2xl select-none"
        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
      >
        <UniversalPageDecorations pageNumber={totalPages} totalPages={totalPages} headerTitle="SACRED CLOSING & BLESSING" />

        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center text-center font-serif z-10">
          <div className="space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              With Gratitude & Light
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Thank You for Trusting Daisy Medium Studio
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif text-[#4A3F35]">
              It has been an honor channeling these intuitive insights for your sacred journey
            </p>
          </div>

          <div className="max-w-xl text-justify space-y-3.5 my-auto">
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914]">
              May this reading illuminate your inner truth, dissolve lingering uncertainty, and remind you of the immense power you possess. You are the author of your destiny, and the universe is forever conspiring to bring you into resonance with your highest good.
            </p>
            <div className="pt-2 text-center">
              <p className="font-serif italic font-bold text-[13pt] text-[#1F1914]">
                With Infinite Love & Blessings,
              </p>
              <p className="text-[10.5pt] font-serif text-[#6B5E51]">
                Daisy Hayes & DaisyMediumStudio
              </p>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="max-w-xl mx-auto space-y-1 text-[8pt] leading-[1.5] text-[#6B5E51] border-t border-[#E8E1D5] pt-2">
            <p className="font-bold uppercase tracking-wider text-[#1F1914]">Disclaimer:</p>
            <p>
              Tarot and numerology readings are offered solely for personal insight, self-reflection, spiritual exploration, and entertainment purposes. The guidance and interpretations provided are designed to inspire introspection, but do not constitute and should never substitute for licensed medical, psychological, legal, or financial advice.
            </p>
            <p className="text-[7.5pt] text-[#8C7D6D] font-sans">
              © {new Date().getFullYear()} Daisy Medium Studio · All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
