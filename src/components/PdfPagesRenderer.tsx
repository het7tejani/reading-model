import React, { useEffect } from 'react';
import { ReadingInputs, ReadingTier, TarotCard } from '../types';
import { calculateLifePath, reduceToSingleDigit, LIFE_PATH_ARCHETYPES } from '../utils/numerology';
import { parseReadingMarkdown, cleanHeadingText, cleanMarkdownText } from '../utils/readingParser';
import { getTarotCardImageUrl } from '../utils/tarotImageMapper';
import { cleanTopicTitle } from '../data/readingTopics';
import { getCategorySpecByTopic } from '../data/categoryConfig';
import {
  getTopicMasterBlueprint,
  buildDeepDiveItems,
  buildTwelveMonthItems,
} from '../utils/categoryPageHelper';
import { getZodiacProfile, getZodiacFromDob } from '../utils/astrology';
import {
  TarotCoverEmblemSvg,
  TarotWelcomeEmblemSvg,
  TripleArchOverCardsSvg,
  UniversalPageDecorations,
} from './PdfPageBackgrounds';
import {
  MasterTitleSubtitlePage,
  MasterTableOfContentsPage,
  MasterNavigationGuidePage,
  MasterPersonalYearPage,
  MasterElementalBalancePage,
  MasterChakraAlignmentPage,
  MasterVedicRemediesPage,
  MasterCareerWealthPage,
  MasterLoveDynamicsPage,
  UniversalDynamicPage1,
  UniversalDynamicPage2,
  UniversalDynamicPage3,
} from './MasterSectionPages';

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
  customTemplatePages,
  onTotalPagesCalculated,
  overrideTier,
}) => {
  const activeTier: ReadingTier = overrideTier || inputs.tier || 'detailed';
  const hasDob = Boolean(inputs.dob && inputs.dob.trim().length > 3);

  const safeTopic = cleanTopicTitle(inputs.topic || 'Future Relationship');
  const categorySpec = getCategorySpecByTopic(inputs.topic || 1);
  const blueprint = getTopicMasterBlueprint(inputs.topic || categorySpec.id, activeTier, hasDob);

  const parsed = parseReadingMarkdown(markdown, safeTopic);
  const numerology = hasDob ? calculateLifePath(inputs.dob) : null;
  const zodiacProfile = getZodiacProfile(inputs.zodiacSign || inputs.dob);

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
    keywords: parsed.cards.card1.keywords.length > 0 ? parsed.cards.card1.keywords : ['relationship', 'love', 'romance', 'meeting', 'healing'],
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
    keywords: parsed.cards.card2.keywords.length > 0 ? parsed.cards.card2.keywords : ['restriction', 'limitation', 'stuck', 'isolation'],
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
    keywords: parsed.cards.card3.keywords.length > 0 ? parsed.cards.card3.keywords : ['hope', 'healing', 'inspiration', 'renewal'],
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
    `As a Life Path ${calculatedLpNumber}, you channel the vibrational frequency of ${lpArchetypeObj.coreEnergyTitle}, guided by the planetary influence of ${lpArchetypeObj.governingPlanet}. ${lpArchetypeObj.description} At age ${inputs.age || 'this stage of your journey'}, your spirit is being summoned to honor your innate gifts of adaptability, intuitive insight, and authentic self-expression.`;
  const numAppText =
    parsed.numerology.applicationParagraph ||
    `In relation to "${cleanProblem}" within ${safeTopic}, your Life Path ${calculatedLpNumber} blueprint calls you to recognize that feeling confined, stagnant, or restricted is a sacred signal that your energetic frequency is expanding. By standing sovereign in your truth as ${lpArchetypeObj.archetype}, you dismantle past limitations and invite expansive growth, freedom, and deep clarity into your reality.`;

  const card1P1 = parsed.cards.card1.paragraphs[0] || 'The Two of Cups embodies reciprocal flow and authentic emotional connection.';
  const card1P2 = parsed.cards.card1.paragraphs[1] || 'In your current energy, this reflects a pivotal moment for harmony and mutual understanding.';

  const card2P1 = parsed.cards.card2.paragraphs[0] || 'The Eight of Swords represents mental boundaries and self-imposed limitations.';
  const card2P2 = parsed.cards.card2.paragraphs[1] || 'The blockage you face stems from fear and overthinking rather than external obstacles.';

  const card3P1 = parsed.cards.card3.paragraphs[0] || 'The Star shines as a beacon of renewed hope, peace, and spiritual renewal.';
  const card3P2 = parsed.cards.card3.paragraphs[1] || 'Your path forward invites surrender to optimistic guidance and trusting your divine path.';

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
  const synPars =
    parsed.synthesisParagraphs.length > 0
      ? parsed.synthesisParagraphs
      : [
          `Your Oracle reading weaves a transformative spiritual bridge between your inner vibrational frequency and the dynamic evolutionary passage from ${card1.name}, through ${card2.name}, into the triumphant blessing of ${card3.name}. At this pivotal moment in your journey, you stand at a sacred crossroads where old coping mechanisms are ready to be lovingly dissolved. Your soul is asking you to stop compromising your well-being for temporary comfort, inviting you instead to anchor your life in authentic sovereignty and conscious peace.`,
          `Your core issue—"${cleanProblem}" within ${safeTopic}—has served as a potent initiation for your boundaries and self-worth. While this circumstance has caused genuine emotional weight and restless reflection, it has simultaneously illuminated what is sacred and non-negotiable for your spirit. The foundational awareness embodied by ${card1.name} proves that you are no longer blind to what requires realignment; your intuition has already sounded the call for renewal and clarity.`,
          `The blockage highlighted by ${card2.name} is not an insurmountable barrier, but an invitation to dismantle mental constructs rooted in fear of judgment or rejection. By recognizing that past disappointments do not hold authority over your future, you reclaim command of your vibrational frequency. When you refuse to negotiate with ambiguity, the path forward clears instantly.`,
          `Moving decisively into the medicine of ${card3.name}, you enter a season of elevated synchronicity and profound emotional freedom. The universe is aligning tangible blessings that honor your loyalty, perseverance, and elevated standards. Trust the unfolding of this passage, for your highest destiny is meeting you at the exact altitude of your self-respect.`,
        ];

  const synthesisPart1 = [synPars[0], synPars[1] || synPars[0]].filter(Boolean);
  const synthesisPart2 = [synPars[2] || synPars[0], synPars[3] || synPars[1] || synPars[0]].filter(Boolean);

  // Module C items based on tier
  const is12MonthTopic = blueprint.moduleCMode === 'one_page_per_month';
  const twelveMonthItems = is12MonthTopic
    ? buildTwelveMonthItems(card1.name, card2.name, card3.name, calculatedLpNumber)
    : [];
  const deepDiveItems = !is12MonthTopic
    ? buildDeepDiveItems(categorySpec, inputs, parsed.qaInsights, card1.name, card2.name, card3.name, calculatedLpNumber, activeTier, hasDob)
    : [];

  // Parse Action Steps
  const parseActionStep = (
    raw: string | undefined,
    defaultPhase: string,
    defaultTitle: string,
    defaultBody: string
  ) => {
    if (!raw) {
      return {
        phase: defaultPhase,
        title: defaultTitle,
        body: defaultBody,
      };
    }
    let clean = raw
      .replace(/^\[?\d+\]?[\.\)]?\s*/, '')
      .replace(/^[-*•]\s*/, '')
      .trim();

    if (clean.includes(':')) {
      const parts = clean.split(':');
      const rawHeader = parts[0];
      const rawBody = parts.slice(1).join(':');

      const stepHeader = cleanHeadingText(rawHeader, defaultTitle);
      const stepBody = cleanMarkdownText(rawBody, defaultBody);

      return {
        phase: defaultPhase,
        title: stepHeader,
        body: stepBody.length > 8 ? stepBody : defaultBody,
      };
    }

    const cleanTitle = cleanHeadingText(clean, defaultTitle);
    const cleanBody = cleanMarkdownText(clean, defaultBody);

    return {
      phase: defaultPhase,
      title: defaultTitle,
      body: cleanBody.length > 15 ? cleanBody : defaultBody,
    };
  };

  const step1Parsed = parseActionStep(
    parsed.actionSteps[0],
    'Phase I • Energetic Sanctuary',
    'Energetic Audit & Conscious Boundaries',
    'Dedicate 15 minutes each morning to uncensored reflection. Identify every area where your energy is being depleted by people-pleasing or hesitation. Practice honoring your peace as non-negotiable.'
  );
  const step2Parsed = parseActionStep(
    parsed.actionSteps[1],
    'Phase II • Shadow Transmutation',
    'Dismantling Limiting Assumptions',
    'Whenever overthinking or hesitation arises, pause immediately and place both hands over your heart center. Take slow diaphragmatic breaths and release the perceived need for control.'
  );
  const step3Parsed = parseActionStep(
    parsed.actionSteps[2],
    'Phase III • Sovereignty Activation',
    `Activating Sovereign Authority`,
    `Take one tangible, heart-aligned action reflecting solution-focused confidence. Step decisively into your natural authority, trusting divine universal support.`
  );
  const step4Parsed = parseActionStep(
    parsed.actionSteps[3],
    'Phase IV • Sacred Manifestation',
    `Embodying ${card3.name} Radiant Vision`,
    `Create a dedicated evening grounding ritual honoring your growth. Seal this journey by writing a letter of gratitude to your future self, anchoring unwavering trust in your destiny.`
  );

  // Mantras
  const mantrasList =
    parsed.mantras.length > 0
      ? parsed.mantras
      : [
          'I AM sovereign, grounded, and aligned with my highest truth.',
          'I AM releasing all anxiety and allowing divine flow to guide me.',
          'I AM worthy of effortless abundance, deep clarity, and peace.',
          'I AM stepping into my true power without fear or apology.',
          'I AM anchored in love, protected by the universe, and completely free.',
        ];

  // Inquiries
  const inquiriesList =
    parsed.soulInquiries.length > 0
      ? parsed.soulInquiries
      : [
          'Where in my life am I still seeking external permission instead of trusting my divine inner knowing?',
          'What outdated fear of conflict or rejection am I ready to release permanently?',
          'What does my most peaceful, abundant, and joyful timeline look like in physical reality?',
        ];

  const effectiveShopName = (inputs.shopName || '').trim() || 'Sacred Intuitive Studio';

  // =========================================================================
  // DYNAMIC PAGE ASSEMBLY
  // =========================================================================
  const pages: PageBlock[] = [];

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
              {categorySpec.title} · {activeTier.toUpperCase()} EDITION ({totalPages} Pages)
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

  // Master Section: Title & Subtitle Page (Premium Tier)
  if (activeTier === 'premium') {
    pages.push({
      key: 'title-subtitle-frontispiece',
      headerTitle: 'SACRED FRONTISPIECE & INVOCATION',
      render: () => (
        <MasterTitleSubtitlePage
          inputs={inputs}
          categorySpec={categorySpec}
          effectiveShopName={effectiveShopName}
          card1={card1}
          card2={card2}
          card3={card3}
          calculatedLpNumber={calculatedLpNumber}
        />
      ),
    });
  }

  // Master Section: How to Navigate & Integrate (Premium Tier)
  if (activeTier === 'premium') {
    pages.push({
      key: 'navigation-guide',
      headerTitle: 'ORACLE INTEGRATION GUIDE',
      render: () => <MasterNavigationGuidePage />,
    });
  }

  // 2. Client Welcome & Energy Alignment
  pages.push({
    key: 'welcome',
    headerTitle: 'WELCOME & ENERGY ALIGNMENT',
    render: () => (
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
            You have been guided to this sacred reading by divine synchronicity. The universe does not operate on coincidence; every card drawn, archetype illuminated, and vibrational frequency in this document was channeled with focused intention to support your highest alignment.
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
    ),
  });

  // 3. Cosmic Numerology Profile (RENDERED ONLY IF DOB IS PROVIDED)
  if (hasDob) {
    pages.push({
      key: 'numerology',
      headerTitle: 'COSMIC NUMEROLOGY PROFILE',
      render: () => (
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
              Vibrational calculation derived from your Date of Birth ({inputs.dob})
            </p>
          </div>

          <div className="border-t border-b border-[#D8CEBE] py-3.5 my-auto max-w-2xl mx-auto w-full space-y-2.5">
            <div className="flex items-center justify-between text-[8.5pt] font-sans text-[#6B5E51] uppercase tracking-wider pb-1 border-b border-[#E8E1D5]">
              <span className="font-semibold">Mathematical Step Breakdown</span>
              <span>DOB: {inputs.dob}</span>
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
      ),
    });

    // Master Section: Personal Year Epicycle (Premium Tier)
    if (activeTier === 'premium') {
      pages.push({
        key: 'personal-year-cycles',
        headerTitle: 'PERSONAL YEAR & EPICYCLE TIMING',
        render: () => (
          <MasterPersonalYearPage
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
    }
  }

  // 4. Querent Intake & Sacred Soul Blueprint Page
  pages.push({
    key: 'intake-blueprint',
    headerTitle: 'QUERENT INTAKE & SACRED BLUEPRINT',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
        <div className="text-center space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            Inquiry Blueprint & Query Resonance
          </span>
          <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
            Sacred Focus & Channeling Parameters
          </h1>
          <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
          <p className="text-[10pt] font-serif italic text-[#4A3F35]">
            Querent coordinate and divine inquiry anchoring this sacred transmission
          </p>
        </div>

        <div className="space-y-4 my-auto max-w-2xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-4 border-b border-[#E8E1D5] pb-3">
            <div>
              <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block mb-0.5">
                Querent Name
              </span>
              <p className="font-serif font-bold text-[12pt] text-[#1F1914]">{querentName}</p>
            </div>
            <div>
              <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block mb-0.5">
                Age & Cosmic Identity
              </span>
              <p className="font-serif font-bold text-[12pt] text-[#1F1914]">
                {inputs.age ? `${inputs.age} Years` : 'Sacred Seeker'} {hasDob ? `· Life Path ${calculatedLpNumber}` : ''}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3">
            <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block">
              Core Crossroads / Situation
            </span>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] font-serif text-justify">
              {inputs.problem || 'Navigating a key vibrational turning point of decision, sovereign realignment, and soul growth.'}
            </p>
          </div>

          <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3">
            <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block">
              Direct Soul Inquiry
            </span>
            <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] font-serif italic text-justify">
              &ldquo;{inputs.question || 'What is the highest alignment and next aligned action for my sacred path?'}&rdquo;
            </p>
          </div>

          <div className="p-3 bg-[#FAF7EE] rounded border border-[#E0D7CC] space-y-1">
            <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block">
              Reading Category & Modality
            </span>
            <p className="font-serif text-[11pt] font-bold text-[#1F1914]">
              {categorySpec.title} — {activeTier.toUpperCase()} TRANSMISSION
            </p>
            <p className="text-[9pt] font-sans text-[#6B5E51]">
              Customized multi-page oracle sequence optimized for high-vibrational clarity, shadow release, and practical realization.
            </p>
          </div>
        </div>

        <div className="text-center border-t border-[#E8E1D5] pt-2">
          <p className="text-[9pt] font-serif italic text-[#6B5E51]">
            ✦ Your Intentions Anchor the Divine Channeling Space ✦
          </p>
        </div>
      </div>
    ),
  });

  // 5. Cosmic Astrological Alignment Page (INCLUDED IN DETAILED & PREMIUM TIERS, OR IF ZODIAC/DOB PROVIDED)
  if (activeTier !== 'standard' || inputs.zodiacSign || hasDob) {
    pages.push({
      key: 'astrology-alignment',
      headerTitle: 'COSMIC ASTROLOGICAL ALIGNMENT',
      render: () => (
        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Cosmic Astrological Alignment & Celestial Synergy
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              {zodiacProfile.symbol} {zodiacProfile.name} · {zodiacProfile.archetype}
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Element: {zodiacProfile.element} · Modality: {zodiacProfile.modality} · Ruling Planet: {zodiacProfile.rulingPlanet}
            </p>
          </div>

          <div className="space-y-4 my-auto max-w-2xl mx-auto w-full">
            <div className="grid grid-cols-2 gap-4 border-b border-[#E8E1D5] pb-3 text-center">
              <div className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block mb-0.5">
                  Cosmic Archetype & Dates
                </span>
                <p className="font-serif font-bold text-[11pt] text-[#1F1914]">
                  {zodiacProfile.dates}
                </p>
              </div>
              <div className="p-2.5 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block mb-0.5">
                  Ruling Frequency
                </span>
                <p className="font-serif font-bold text-[11pt] text-[#1F1914]">
                  {zodiacProfile.rulingPlanet} ({zodiacProfile.element} Energy)
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif font-bold text-[12.5pt] text-[#1F1914]">
                ✦ Core Celestial Essence & Soul Gifts
              </h2>
              <p className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                As an archetype of {zodiacProfile.name} ({zodiacProfile.element} element), your energetic field operates with intrinsic qualities of {zodiacProfile.essence.toLowerCase()} When applied to {safeTopic}, your celestial frequency gives you the instinctual capability to cut through illusion and claim sovereign stability.
              </p>
            </div>

            <div className="space-y-1 border-t border-[#E8E1D5] pt-2.5">
              <h2 className="font-serif font-bold text-[12.5pt] text-[#1F1914]">
                ✦ Karmic Shadow & Realignment
              </h2>
              <p className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                The primary shadow challenge for {zodiacProfile.name} during this passage is {zodiacProfile.shadow.toLowerCase()} By actively witnessing this instinct without judgment, you transform defensive friction into conscious leadership and emotional peace.
              </p>
            </div>

            <div className="space-y-1 border-t border-[#E8E1D5] pt-2.5">
              <h2 className="font-serif font-bold text-[12.5pt] text-[#1F1914]">
                ✦ Current Celestial Transit Focus
              </h2>
              <p className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                {zodiacProfile.transitFocus} Combined with the triad of {card1.name}, {card2.name}, and {card3.name}, this transit accelerates your evolutionary timeline.
              </p>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ As Above, So Below — The Stars Illuminate Your Innate Mastery ✦
            </p>
          </div>
        </div>
      ),
    });

    // Master Section: Elemental Balance Page (Premium Tier)
    if (activeTier === 'premium') {
      pages.push({
        key: 'elemental-energy-balance',
        headerTitle: 'ELEMENTAL ENERGY BALANCE & CONSTITUTION',
        render: () => (
          <MasterElementalBalancePage
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
    }
  }

  // 6. Tarot Spread Overview & Triad Methodology
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

  // 7. Card 1 Embodiment & Artwork
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

  // 8. Card 1 Channeled Interpretation
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

  // 9. Card 2 Embodiment & Artwork
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

  // 10. Card 2 Channeled Interpretation
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

  // 11. Card 3 Embodiment & Artwork
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

  // 12. Card 3 Channeled Interpretation
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

  // 13. Sacred Synthesis (1 Page in Standard, 2 Pages in Detailed / Premium)
  if (activeTier === 'standard') {
    pages.push({
      key: 'synthesis-standard',
      headerTitle: 'SACRED SYNTHESIS & WEAVING',
      render: () => (
        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Holistic Oracle Synthesis
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Synthesis & Breakthrough Pathway
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Harmonizing the 3 Cards into a unified message of sovereignty and peace
            </p>
          </div>

          <div className="space-y-[18px] my-auto max-w-2xl mx-auto">
            <div className="space-y-1.5">
              <h2 className="font-serif font-bold text-[12.5pt] text-[#1F1914]">
                ✦ 1. Core Synthesis & Life Mirror
              </h2>
              <p className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                {synPars[0] || 'Your Oracle reading weaves an evolutionary passage from present awareness into triumphant alignment.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-serif font-bold text-[12.5pt] text-[#1F1914]">
                ✦ 2. Transmuting the Central Blockage
              </h2>
              <p className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                {synPars[2] || synPars[1] || 'The resistance highlighted by Card 2 is an invitation to dissolve fear and trust your discernment.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-serif font-bold text-[12.5pt] text-[#1F1914]">
                ✦ 3. Stepping into Triumphant Grace
              </h2>
              <p className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                {synPars[3] || 'Trust the unfolding of this passage, for your highest destiny meets you at the exact altitude of your self-respect.'}
              </p>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9.5pt] font-serif italic text-[#1F1914]">
              &ldquo;Your greatest power lies in aligning your daily actions with your divine worth.&rdquo;
            </p>
          </div>
        </div>
      ),
    });
  } else {
    // Synthesis Part I (Detailed / Premium)
    pages.push({
      key: 'synthesis-p1',
      headerTitle: 'SYNTHESIS · PART I',
      render: () => (
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
              Connecting the 3 Cards with your sovereign journey
            </p>
          </div>

          <div className="space-y-[20px] my-auto max-w-2xl mx-auto">
            {synthesisPart1.map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  {idx === 0 ? '✦ 1. Core Synthesis & Life Weaving' : '✦ 2. Transforming the Central Resistance'}
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
      ),
    });

    // Synthesis Part II (Detailed / Premium)
    pages.push({
      key: 'synthesis-p2',
      headerTitle: 'SYNTHESIS · PART II',
      render: () => (
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
      ),
    });
  }

  // =========================================================================
  // MODULE C: INTERACTIVE Q&A / SPECIALIZED BREAKDOWNS
  // =========================================================================
  if (is12MonthTopic && activeTier === 'premium') {
    twelveMonthItems.forEach((monthItem, mIdx) => {
      if (!monthItem.forecast || monthItem.forecast.trim().length < 15) return;

      pages.push({
        key: `month-${mIdx + 1}`,
        headerTitle: `12-MONTH FORECAST • ${monthItem.monthName.toUpperCase()}`,
        render: () => (
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
        ),
      });
    });
  } else if (activeTier === 'standard') {
    // Condensed High-Impact Q&A Page for Standard Tier
    pages.push({
      key: 'standard-qa-condensed',
      headerTitle: 'CHANNELED INQUIRIES & ORACLE INSIGHTS',
      render: () => (
        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Channeled Oracle Answers
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Key Insights & Sovereign Direction
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Direct intuitive responses to your core inquiry points
            </p>
          </div>

          <div className="space-y-4 my-auto max-w-2xl mx-auto w-full">
            {deepDiveItems.slice(0, 3).map((item, qIdx) => (
              <div key={qIdx} className="space-y-1 border-b border-[#E8E1D5] pb-3 last:border-b-0">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#4A3F35] text-white text-[9px] font-sans font-bold flex items-center justify-center">
                    {qIdx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-[11.5pt] text-[#1F1914]">
                    {item.question}
                  </h3>
                </div>
                <p className="text-[9.5pt] leading-[1.55] text-[#1F1914] text-justify font-serif pl-7">
                  {item.oracleTransmission.split('\n\n')[0] || item.oracleTransmission}
                </p>
                <p className="text-[8.5pt] font-serif italic text-[#6B5E51] pl-7">
                  ✦ {item.somaticKey}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Clarity is the antidote to hesitation; trust your inner knowing ✦
            </p>
          </div>
        </div>
      ),
    });
  } else {
    // Detailed (3 questions × 2 pages) or Premium (5-8 questions × 2 pages)
    const questionsToRender = deepDiveItems.slice(0, blueprint.questionCount);

    questionsToRender.forEach((item) => {
      // Part 1: Channeled Oracle Transmission
      pages.push({
        key: `deep-dive-${item.questionNumber}-part1`,
        headerTitle: `${blueprint.title.toUpperCase()} · INQUIRY ${item.questionNumber} (PART I)`,
        render: () => (
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
              <div className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif space-y-2">
                {item.oracleTransmission.split('\n\n').map((pStr, pIdx) => (
                  <p key={pIdx}>{pStr}</p>
                ))}
              </div>
            </div>

            <div className="w-full border-t border-[#E8E1D5] pt-2 text-center">
              <p className="text-[9.5pt] italic text-[#4A3F35] font-serif">
                {item.somaticKey}
              </p>
            </div>
          </div>
        ),
      });

      // Part 2: Subconscious Architecture & Realignment
      pages.push({
        key: `deep-dive-${item.questionNumber}-part2`,
        headerTitle: `${blueprint.title.toUpperCase()} · INQUIRY ${item.questionNumber} (PART II)`,
        render: () => (
          <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
            <div className="text-center space-y-1.5 pt-2">
              <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
                Subconscious Architecture & Aligned Action
              </span>
              <h1 className="text-[20pt] font-serif font-bold text-[#1F1914]">
                Inquiry {item.questionNumber}: Realization & Action
              </h1>
              <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            </div>

            <div className="space-y-[18px] my-auto max-w-2xl mx-auto">
              <div className="space-y-1.5">
                <h2 className="font-serif font-bold text-[12.5pt] text-[#1F1914]">
                  ✦ Subconscious Energetic Undercurrents & Defense Mechanism
                </h2>
                <p className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
                  {item.subconsciousArchitecture}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#E8E1D5]">
                <h2 className="font-serif font-bold text-[12.5pt] text-[#1F1914]">
                  ✦ Sovereign Alignment & Concrete Aligned Action
                </h2>
                <p className="text-[10pt] leading-[1.6] text-[#1F1914] text-justify font-serif">
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
        ),
      });
    });
  }

  // =========================================================================
  // MODULE D: ROADMAPS & ACTION PROTOCOL
  // =========================================================================
  if (activeTier === 'standard') {
    // 1 Page Strategic Action Plan & Guidance
    pages.push({
      key: 'standard-action-plan',
      headerTitle: 'STRATEGIC ACTION PLAN & GUIDANCE',
      render: () => (
        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Practical Realization & Manifestation
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              {blueprint.actionTitle || 'Strategic Action Blueprint'}
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Structured steps to anchor clarity into your daily reality
            </p>
          </div>

          <div className="space-y-3.5 my-auto max-w-2xl mx-auto w-full">
            {[step1Parsed, step2Parsed, step3Parsed, step4Parsed].map((st, sIdx) => (
              <div key={sIdx} className="space-y-1 border-b border-[#E8E1D5] pb-2.5 last:border-b-0">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block">
                  {st.phase} · {st.title}
                </span>
                <p className="text-[9.5pt] leading-[1.5] text-[#1F1914] text-justify font-serif">
                  {st.body}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Daily consistency turns divine insight into unshakeable peace ✦
            </p>
          </div>
        </div>
      ),
    });
  } else {
    // Detailed / Premium Roadmap & 4-Phase Protocol
    pages.push({
      key: 'roadmap-p1',
      headerTitle: '30-DAY INTEGRATION · WEEKS 1 & 2',
      render: () => (
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

            <div className="space-y-1.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                Week 2: Days 8–14 · Shadow Transmutation
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                Dissolving the Tension of {card2.name}
              </h2>
              <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                Identify the primary limiting belief or self-imposed restriction that keeps you caught in mental loops. Write down your deepest doubts on paper, consciously recognize them as outdated defense mechanisms, and release their authority over your future decisions.
              </p>
              <p className="text-[9.5pt] text-[#4A3F35] italic pt-0.5">
                <strong className="font-sans font-semibold not-italic text-[#6B5E51]">✦ Somatic Practice: </strong>
                Perform a gentle body scan before bed. Exhale lingering tension and visualize fresh golden light restoring your energy field.
              </p>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Weeks 3 & 4 Roadmap Continues on the Next Page ✦
            </p>
          </div>
        </div>
      ),
    });

    if (activeTier === 'premium') {
      pages.push({
        key: 'roadmap-p2',
        headerTitle: '30-DAY INTEGRATION · WEEKS 3 & 4',
        render: () => (
          <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
            <div className="text-center space-y-1.5 pt-2">
              <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
                Practical Realization · Part II (Days 15–30)
              </span>
              <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
                Breakthrough & Elevation Roadmap
              </h1>
              <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
              <p className="text-[10pt] font-serif italic text-[#4A3F35]">
                Anchoring sustained momentum, sovereign action, and triumphant long-term outcomes
              </p>
            </div>

            <div className="space-y-[20px] my-auto">
              <div className="space-y-1.5 border-b border-[#E8E1D5] pb-3.5">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                  Week 3: Days 15–21 · Sovereign Action
                </span>
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  Taking Solution-Focused Steps
                </h2>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  Step decisively into purposeful action. Refuse to negotiate with ambiguity. Make one brave, authentic decision that reflects your elevated self-worth, whether establishing a clear boundary or launching a creative initiative.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                  Week 4: Days 22–30 · Manifestation & Celebration
                </span>
                <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                  Embodying the Radiant Medicine of {card3.name}
                </h2>
                <p className="text-[10.5pt] leading-[1.6] text-[#1F1914] text-justify">
                  Anchor your newly reclaimed sovereignty. Celebrate how far you have journeyed, express heartfelt gratitude for the lessons learned, and welcome the abundant opportunities rushing to meet your elevated frequency.
                </p>
              </div>
            </div>

            <div className="text-center border-t border-[#E8E1D5] pt-2">
              <p className="text-[9pt] font-serif italic text-[#6B5E51]">
                ✦ You are the sovereign master of your unfolding reality ✦
              </p>
            </div>
          </div>
        ),
      });
    }

    // 4-Phase Action Protocol Page
    pages.push({
      key: 'action-steps',
      headerTitle: '4-PHASE ACTION PROTOCOL',
      render: () => (
        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Action Steps & Aligned Implementation
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              {blueprint.actionTitle}
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Structured action protocol to ground spiritual insights into tangible physical results
            </p>
          </div>

          <div className="space-y-3 my-auto">
            {[step1Parsed, step2Parsed, step3Parsed, step4Parsed].map((step, idx) => (
              <div key={idx} className="space-y-0.5 border-b border-[#E8E1D5] pb-2 last:border-b-0">
                <div className="flex items-center justify-between">
                  <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51]">
                    {step.phase}
                  </span>
                  <span className="text-[8pt] font-mono text-[#A89884]">Step 0{idx + 1}</span>
                </div>
                <h2 className="font-serif font-bold text-[12pt] text-[#1F1914]">
                  {step.title}
                </h2>
                <p className="text-[9.5pt] leading-[1.5] text-[#1F1914] text-justify font-serif">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[8.5pt] font-sans text-[#6B5E51] uppercase tracking-wider">
              ✦ Execute with devotion; each small step anchors major quantum shifts ✦
            </p>
          </div>
        </div>
      ),
    });
  }

  // =========================================================================
  // MODULE E: MANTRAS, JOURNALING, PRESCRIPTION & CLOSING
  // =========================================================================
  if (activeTier === 'standard') {
    // Combined Mantras & Journaling Prompts Page for Standard Tier
    pages.push({
      key: 'standard-mantras-inquiries',
      headerTitle: 'DAILY MANTRAS & SOUL REFLECTIONS',
      render: () => (
        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Daily Anchor & Introspective Inquiries
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Mantras & Soul Reflections
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Daily sacred affirmations and questions to expand conscious awareness
            </p>
          </div>

          <div className="space-y-4 my-auto max-w-2xl mx-auto w-full">
            <div className="space-y-2 border-b border-[#E8E1D5] pb-3">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block text-center">
                ✦ Daily Energetic Mantras ✦
              </span>
              {mantrasList.slice(0, 3).map((m, mIdx) => (
                <div key={mIdx} className="text-center italic font-serif text-[11pt] text-[#1F1914] py-1 bg-[#FAF7EE] border border-[#E0D7CC] rounded-xs">
                  &ldquo;{m.replace(/^["']|["']$/g, '')}&rdquo;
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block text-center">
                ✦ Soul Journaling Inquiries ✦
              </span>
              {inquiriesList.slice(0, 2).map((inq, iIdx) => (
                <div key={iIdx} className="space-y-1.5">
                  <p className="font-serif font-bold text-[10.5pt] text-[#1F1914]">{iIdx + 1}. {inq}</p>
                  <div className="space-y-2 pt-0.5">
                    <div className="border-b border-[#E8E1D5]"></div>
                    <div className="border-b border-[#E8E1D5]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Grounded in Love, Guided by Wisdom, Anchored in Sovereignty ✦
            </p>
          </div>
        </div>
      ),
    });

    // Single Comprehensive Spiritual Prescription Page for Standard Tier
    pages.push({
      key: 'standard-prescription',
      headerTitle: 'SPIRITUAL PRESCRIPTION & REMEDIES',
      render: () => (
        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Holistic Remedies & Grounding
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Your Spiritual Prescription
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif italic text-[#4A3F35]">
              Crystals, botanicals, and guided mindfulness practice for your energetic alignment
            </p>
          </div>

          <div className="space-y-3.5 my-auto max-w-2xl mx-auto w-full">
            <div className="space-y-1 border-b border-[#E8E1D5] pb-2.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block">
                • Earth Element · Crystal Allies
              </span>
              <h3 className="font-serif font-bold text-[12pt] text-[#1F1914]">
                {parsed.spiritualPrescription.crystals.map((c) => c.name).join(' & ') || 'Rose Quartz & Clear Quartz'}
              </h3>
              <p className="text-[9.5pt] leading-[1.5] text-[#1F1914] text-justify font-serif">
                {parsed.spiritualPrescription.crystals[0]?.description || 'Keep nearby to cleanse stagnant frequencies, open the heart safely, and anchor crystal-clear discernment.'}
              </p>
            </div>

            <div className="space-y-1 border-b border-[#E8E1D5] pb-2.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block">
                • Flora Element · Botanical Allies
              </span>
              <h3 className="font-serif font-bold text-[12pt] text-[#1F1914]">
                {parsed.spiritualPrescription.botanicals.map((b) => b.name).join(' & ') || 'Lavender & Chamomile'}
              </h3>
              <p className="text-[9.5pt] leading-[1.5] text-[#1F1914] text-justify font-serif">
                {parsed.spiritualPrescription.botanicals[0]?.description || 'Incorporate herbal teas or essential oil mists into your evening routine to soothe an analytical nervous system.'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51] block">
                • Spirit Element · Guided Somatic Breathwork
              </span>
              <h3 className="font-serif font-bold text-[12pt] text-[#1F1914]">
                {parsed.spiritualPrescription.mindfulness[0]?.name || 'Heart-Space Golden Light Anchoring'}
              </h3>
              <p className="text-[9.5pt] leading-[1.5] text-[#1F1914] text-justify font-serif">
                Whenever overstimulated, place hands on your chest and take three 4-count deep diaphragmatic breaths, visualizing unshakeable peace restoring every cell of your being.
              </p>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[9pt] font-serif italic text-[#6B5E51]">
              ✦ Nature's Sacred Frequencies Supporting Your Elevation ✦
            </p>
          </div>
        </div>
      ),
    });
  } else {
    // Detailed / Premium Module E (Dedicated Mantras, Inquiries P1 & P2, Prescription P1 & P2)
    // Daily Affirmations & Mantras
    pages.push({
      key: 'mantras',
      headerTitle: 'DAILY AFFIRMATIONS & MANTRAS',
      render: () => (
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
      ),
    });

    // Soul Inquiries Part I
    pages.push({
      key: 'soul-inquiries-p1',
      headerTitle: 'SOUL INQUIRIES · PART I',
      render: () => (
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
              <div key={idx} className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <span className="font-serif font-bold text-[12pt] text-[#6B5E51]">{idx + 1}.</span>
                  <p className="font-serif font-bold text-[11.5pt] text-[#1F1914] leading-snug">{inq}</p>
                </div>
                <p className="text-[9pt] font-serif italic text-[#6B5E51] pl-5 leading-relaxed">
                  {idx === 0
                    ? '✦ Guiding Reflection Cue: Close your eyes, place a hand over your heart center, and notice what subtle emotion or somatic tension arises.'
                    : '✦ Guiding Reflection Cue: Observe where fear of conflict, judgment, or self-doubt has caused you to compromise your peace.'}
                </p>
                <div className="space-y-3.5 pt-1 pl-5">
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
      ),
    });

    // Soul Inquiries Part II
    pages.push({
      key: 'soul-inquiries-p2',
      headerTitle: 'SOUL INQUIRIES · PART II',
      render: () => (
        <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between z-10 font-serif">
          <div className="text-center space-y-1.5 pt-2">
            <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
              Introspective Journaling · Part II
            </span>
            <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
              Soul Realization & Guided Reflection
            </h1>
            <div className="w-16 h-[1px] bg-[#C4B6A4] mx-auto my-2"></div>
            <p className="text-[10pt] font-serif text-[#4A3F35]">
              Structured integration framework to anchor your core breakthrough into daily life
            </p>
          </div>

          <div className="space-y-4 my-auto">
            <div className="space-y-2 pb-2 border-b border-[#E8E1D5]">
              <div className="flex items-start gap-2">
                <span className="font-serif font-bold text-[12pt] text-[#6B5E51]">3.</span>
                <p className="font-serif font-bold text-[11.5pt] text-[#1F1914] leading-snug">
                  {inquiriesList[2] || 'What does my most peaceful, abundant, and joyful timeline look like in physical reality?'}
                </p>
              </div>
              <div className="space-y-3 pt-0.5 pl-5">
                <div className="border-b border-[#E8E1D5]"></div>
                <div className="border-b border-[#E8E1D5]"></div>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[8.5pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51]">
                    ✦ 1. Core Breakthrough & Sovereign Epiphany
                  </span>
                  <span className="text-[7.5pt] font-serif italic text-[#8C7E70]">What truth has clicked into place?</span>
                </div>
                <div className="space-y-3 pt-1">
                  <div className="border-b border-[#E8E1D5]"></div>
                  <div className="border-b border-[#E8E1D5]"></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[8.5pt] font-sans font-bold uppercase tracking-wider text-[#6B5E51]">
                    ✦ 2. Aligned Action & Next Sacred Steps
                  </span>
                  <span className="text-[7.5pt] font-serif italic text-[#8C7E70]">What step will you take in the next 48h?</span>
                </div>
                <div className="space-y-3 pt-1">
                  <div className="border-b border-[#E8E1D5]"></div>
                  <div className="border-b border-[#E8E1D5]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-[#E8E1D5] pt-2">
            <p className="text-[8.5pt] font-sans text-[#6B5E51] uppercase tracking-wider">
              ✦ Trust your hand and heart; allow your soul to write its new chapter ✦
            </p>
          </div>
        </div>
      ),
    });

    // Spiritual Prescription Part I (Crystals & Botanicals)
    pages.push({
      key: 'spiritual-prescription-p1',
      headerTitle: 'SPIRITUAL PRESCRIPTION · PART I',
      render: () => (
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
            <div className="space-y-1.5 border-b border-[#E8E1D5] pb-4">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                • Earth Element · Crystal Allies
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                {parsed.spiritualPrescription.crystals.map((c) => c.name).join(' & ') || 'Rose Quartz & Clear Quartz'}
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

            <div className="space-y-1.5">
              <span className="text-[8pt] font-sans font-bold uppercase tracking-[0.25em] text-[#6B5E51] block">
                • Flora Element · Botanical Allies
              </span>
              <h2 className="font-serif font-bold text-[13pt] text-[#1F1914]">
                {parsed.spiritualPrescription.botanicals.map((b) => b.name).join(' & ') || 'Lavender & Rose Petals'}
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
      ),
    });

    // Spiritual Prescription Part II (Guided Somatic Practice)
    pages.push({
      key: 'spiritual-prescription-p2',
      headerTitle: 'SPIRITUAL PRESCRIPTION · PART II',
      render: () => (
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
      ),
    });
  }

  // Master Section: Chakra Energetic Matrix (Premium Tier)
  if (activeTier === 'premium') {
    pages.push({
      key: 'chakra-matrix-alignment',
      headerTitle: 'CHAKRA ENERGETIC MATRIX & HARMONIZATION',
      render: () => (
        <MasterChakraAlignmentPage
          inputs={inputs}
          categorySpec={categorySpec}
          effectiveShopName={effectiveShopName}
          card1={card1}
          card2={card2}
          card3={card3}
          calculatedLpNumber={calculatedLpNumber}
        />
      ),
    });
  }

  // Master Section: Vedic & Esoteric Planetary Remedies (Premium Tier)
  if (activeTier === 'premium') {
    pages.push({
      key: 'vedic-esoteric-remedies',
      headerTitle: 'VEDIC UPAYAS & SACRED REMEDIES',
      render: () => (
        <MasterVedicRemediesPage
          inputs={inputs}
          categorySpec={categorySpec}
          effectiveShopName={effectiveShopName}
          card1={card1}
          card2={card2}
          card3={card3}
          calculatedLpNumber={calculatedLpNumber}
        />
      ),
    });
  }

  // Master Specialized Category Focus Pages & Plug-and-Play Universal Dynamic Blueprint
  const topicLower = (inputs.topic || '').toLowerCase();
  const problemLower = (inputs.problem || '').toLowerCase();
  const questionLower = (inputs.question || '').toLowerCase();
  const combinedText = `${topicLower} ${problemLower} ${questionLower}`;

  const isCareerFinance =
    categorySpec.categoryType === 'career_job' ||
    categorySpec.categoryType === 'money_flow' ||
    combinedText.includes('career') ||
    combinedText.includes('money') ||
    combinedText.includes('wealth') ||
    combinedText.includes('business') ||
    combinedText.includes('job') ||
    combinedText.includes('finance');

  const isLoveRelationships =
    categorySpec.categoryType === 'love_blocks' ||
    categorySpec.categoryType === 'relationship_partner' ||
    categorySpec.categoryType === 'cord_cutting' ||
    combinedText.includes('love') ||
    combinedText.includes('relationship') ||
    combinedText.includes('feelings') ||
    combinedText.includes('ex ') ||
    combinedText.includes('soulmate') ||
    combinedText.includes('twin');

  if (activeTier === 'premium') {
    if (isCareerFinance) {
      pages.push({
        key: 'career-wealth-master-blueprint',
        headerTitle: 'CAREER & WEALTH SOUL BLUEPRINT',
        render: () => (
          <MasterCareerWealthPage
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
    } else if (isLoveRelationships) {
      pages.push({
        key: 'love-dynamics-master-blueprint',
        headerTitle: 'LOVE & SACRED RELATIONAL DYNAMICS',
        render: () => (
          <MasterLoveDynamicsPage
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
    } else {
      // Plug-and-Play Universal Dynamic Blueprint (3 Pages for Custom / Unknown Topics in Premium)
      pages.push({
        key: 'universal-dynamic-page-1',
        headerTitle: 'DOMAIN RESONANCE & ELEMENTAL ALCHEMY',
        render: () => (
          <UniversalDynamicPage1
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
      pages.push({
        key: 'universal-dynamic-page-2',
        headerTitle: 'UNSEEN OBSTACLES & KARMIC CHOICE POINTS',
        render: () => (
          <UniversalDynamicPage2
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
      pages.push({
        key: 'universal-dynamic-page-3',
        headerTitle: '30-DAY DECISION & INTEGRATION PROTOCOL',
        render: () => (
          <UniversalDynamicPage3
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
    }
  } else if (activeTier === 'detailed') {
    // For Detailed tier on custom/unknown topics, inject the 3-Page Universal Dynamic Blueprint
    if (!isCareerFinance && !isLoveRelationships) {
      pages.push({
        key: 'universal-dynamic-page-1',
        headerTitle: 'DOMAIN RESONANCE & ELEMENTAL ALCHEMY',
        render: () => (
          <UniversalDynamicPage1
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
      pages.push({
        key: 'universal-dynamic-page-2',
        headerTitle: 'UNSEEN OBSTACLES & KARMIC CHOICE POINTS',
        render: () => (
          <UniversalDynamicPage2
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
      pages.push({
        key: 'universal-dynamic-page-3',
        headerTitle: '30-DAY DECISION & INTEGRATION PROTOCOL',
        render: () => (
          <UniversalDynamicPage3
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
    }
  } else if (activeTier === 'standard') {
    // For Standard tier on custom/unknown topics, inject 1-Page Dynamic Synthesis Card
    if (!isCareerFinance && !isLoveRelationships) {
      pages.push({
        key: 'universal-dynamic-page-1',
        headerTitle: 'DOMAIN RESONANCE MATRIX',
        render: () => (
          <UniversalDynamicPage1
            inputs={inputs}
            categorySpec={categorySpec}
            effectiveShopName={effectiveShopName}
            card1={card1}
            card2={card2}
            card3={card3}
            calculatedLpNumber={calculatedLpNumber}
          />
        ),
      });
    }
  }

  // Final Page: Outro, Thank You & Legal Disclaimer
  pages.push({
    key: 'closing-blessing',
    headerTitle: 'SACRED CLOSING & BLESSING',
    render: () => (
      <div className="absolute inset-0 pt-[72px] pb-[72px] px-[72px] flex flex-col justify-between items-center text-center font-serif z-10">
        <div className="space-y-1.5 pt-2">
          <span className="text-[8pt] uppercase tracking-[0.3em] text-[#6B5E51] font-sans font-semibold">
            With Gratitude & Light
          </span>
          <h1 className="text-[22pt] font-serif font-bold text-[#1F1914]">
            Thank You for Trusting {effectiveShopName}
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
              {effectiveShopName}
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-1 text-[8pt] leading-[1.5] text-[#6B5E51] border-t border-[#E8E1D5] pt-2">
          <p className="font-bold uppercase tracking-wider text-[#1F1914]">Disclaimer:</p>
          <p>
            Tarot and numerology readings are offered solely for personal insight, self-reflection, spiritual exploration, and entertainment purposes. The guidance and interpretations provided are designed to inspire introspection, but do not constitute and should never substitute for licensed medical, psychological, legal, or financial advice.
          </p>
          <p className="text-[7.5pt] text-[#8C7D6D] font-sans">
            © {new Date().getFullYear()} {effectiveShopName} · All Rights Reserved
          </p>
        </div>
      </div>
    ),
  });

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
            style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
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
