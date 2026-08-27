import { CategorySpec, getCategorySpecByTopic } from '../data/categoryConfig';
import { ReadingInputs, ReadingTier } from '../types';

export interface TopicBlueprintSpec {
  topicId: number | string;
  title: string;
  totalPages: number;
  tier?: ReadingTier;
  hasDob?: boolean;
  moduleCMode: 'two_pages_per_question' | 'one_page_per_month' | 'condensed_single_page' | 'three_pages_per_question';
  questionCount: number;
  moduleCRange: [number, number];
  moduleDRange: [number, number];
  moduleERange: [number, number];
  roadmapTitle: string;
  actionTitle: string;
}

export interface DeepDiveQuestionItem {
  questionNumber: number;
  question: string;
  subTitle: string;
  // Page 1: Channeled Oracle Transmission
  oracleTransmission: string;
  somaticKey: string;
  // Page 2: Subconscious Architecture & Realignment
  subconsciousArchitecture: string;
  sovereignRealignment: string;
  tag: string;
  anchor: string;
}

export interface MonthForecastItem {
  monthNumber: number;
  monthName: string;
  title: string;
  astrologicalSign: string;
  element: string;
  forecast: string;
  practicalAdvice: string;
  affirmation: string;
}

export const TOPIC_MASTER_BLUEPRINTS: Record<number, TopicBlueprintSpec> = {
  1: {
    topicId: 1,
    title: 'Deep Love Reading',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Love & Soulmate Connection Roadmap',
    actionTitle: 'Heart-Opening & Alignment Steps',
  },
  2: {
    topicId: 2,
    title: 'Exact Thoughts & Feelings',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Emotional Timeline & Reciprocity Roadmap',
    actionTitle: 'Mental Peace & Sovereign Discernment Steps',
  },
  3: {
    topicId: 3,
    title: 'Situationship & Next Moves',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Next Chapter Roadmap & Boundaries',
    actionTitle: 'Boundary Enforcement & Clarity Steps',
  },
  4: {
    topicId: 4,
    title: 'Will They Come Back?',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Reconnection & Energetic Alignment Roadmap',
    actionTitle: 'Sovereign Self-Worth & Reclaim Steps',
  },
  5: {
    topicId: 5,
    title: 'Exact Time Frame',
    totalPages: 30,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 30],
    roadmapTitle: 'Time-Aligned Milestones & Progression',
    actionTitle: 'Timing Acceleration & Grounding Steps',
  },
  6: {
    topicId: 6,
    title: 'Next 12 Months Forecast',
    totalPages: 40,
    moduleCMode: 'one_page_per_month',
    questionCount: 12,
    moduleCRange: [13, 24],
    moduleDRange: [25, 30],
    moduleERange: [31, 40],
    roadmapTitle: 'Quarterly Energetic Roadmap & Milestones',
    actionTitle: 'Annual Realization & Manifestation Steps',
  },
  7: {
    topicId: 7,
    title: '8 Future Predictions',
    totalPages: 36,
    moduleCMode: 'two_pages_per_question',
    questionCount: 8,
    moduleCRange: [13, 28],
    moduleDRange: [29, 30],
    moduleERange: [31, 36],
    roadmapTitle: 'Future Trajectory Synthesis & Timeline',
    actionTitle: 'Predictive Integration & Alignment Steps',
  },
  8: {
    topicId: 8,
    title: 'Career & Job Reading',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Career Milestone & Leadership Roadmap',
    actionTitle: 'Professional Authority & Elevation Steps',
  },
  9: {
    topicId: 9,
    title: 'Life Compass & Path',
    totalPages: 36,
    moduleCMode: 'two_pages_per_question',
    questionCount: 6,
    moduleCRange: [13, 24],
    moduleDRange: [25, 28],
    moduleERange: [29, 36],
    roadmapTitle: 'Life Growth & Destiny Horizon Roadmap',
    actionTitle: 'Soul Alignment & Compass Actions',
  },
  10: {
    topicId: 10,
    title: 'Blind Reading (Name Only)',
    totalPages: 30,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 30],
    roadmapTitle: 'Energy Integration & Reconnection Roadmap',
    actionTitle: 'Psychic Realization & Centering Steps',
  },
  11: {
    topicId: 11,
    title: 'Brutal / No Sugar Coating',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Reality Check & Sovereignty Action Plan',
    actionTitle: 'Radical Truth & Boundary Execution Steps',
  },
  12: {
    topicId: 12,
    title: '3 Hidden Truths',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Unmasking & Breakthrough Roadmap',
    actionTitle: 'Clarity Realization & Discernment Steps',
  },
  13: {
    topicId: 13,
    title: 'Meet Your Spirit Guides',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Channeling & Spirit Guide Ritual Roadmap',
    actionTitle: 'Daily Intuitive Communion Steps',
  },
  14: {
    topicId: 14,
    title: 'Past Life Reading',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Karmic Clearing & Soul Lineage Roadmap',
    actionTitle: 'Past Life Integration & Healing Steps',
  },
  15: {
    topicId: 15,
    title: 'Energy Drain / Aura Scan',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Aura Cleansing & Shielding Roadmap',
    actionTitle: 'Energetic Protection & Boundary Steps',
  },
  16: {
    topicId: 16,
    title: 'Pet Psychic Reading',
    totalPages: 30,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 30],
    roadmapTitle: 'Pet Bonding & Nervous System Harmony Roadmap',
    actionTitle: 'Animal Sanctuary & Blessing Steps',
  },
  17: {
    topicId: 17,
    title: 'Lost Item Psychic Reading',
    totalPages: 28,
    moduleCMode: 'two_pages_per_question',
    questionCount: 3,
    moduleCRange: [13, 18],
    moduleDRange: [19, 22],
    moduleERange: [23, 28],
    roadmapTitle: 'Search Guidance & Recovery Roadmap',
    actionTitle: 'Targeted Retrieval & Calming Steps',
  },
  18: {
    topicId: 18,
    title: '5 Custom Questions Reading',
    totalPages: 36,
    moduleCMode: 'three_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 28],
    moduleDRange: [29, 32],
    moduleERange: [33, 36],
    roadmapTitle: 'Custom Oracle Realization Roadmap',
    actionTitle: 'Deep Resolution & Action Steps',
  },
  19: {
    topicId: 19,
    title: "What's Blocking Your Blessings / Evil Eye Reading",
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Aura Unblocking & Shielding Roadmap',
    actionTitle: 'Blessing Magnetization & Clearing Steps',
  },
  20: {
    topicId: 20,
    title: "What's Blocking Your Money Flow",
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Financial Flow & Abundance Mindset Roadmap',
    actionTitle: 'Wealth Activation & Prosperity Steps',
  },
  21: {
    topicId: 21,
    title: "What's Blocking Your Love Life",
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Heart Sanctuary & Love Unblocking Roadmap',
    actionTitle: 'Romantic Alignment & Receptivity Steps',
  },
  22: {
    topicId: 22,
    title: 'What Is Their Karma For Hurting You?',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Divine Justice & Release Roadmap',
    actionTitle: 'Energetic Severance & Sovereign Peace Steps',
  },
  23: {
    topicId: 23,
    title: 'Soul Lesson & Karmic Contract',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Cycle-Breaking & Karmic Graduation Roadmap',
    actionTitle: 'Soul Contract Elevation Steps',
  },
  24: {
    topicId: 24,
    title: "What They Feel But Won't Say",
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Unspoken Truth & Emotional Translation Roadmap',
    actionTitle: 'Emotional Grounding & Truth Steps',
  },
  25: {
    topicId: 25,
    title: 'How They See You (True Impression)',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Radiance & Magnetic Impression Roadmap',
    actionTitle: 'Unshakeable Self-Respect Steps',
  },
  26: {
    topicId: 26,
    title: 'What Is Hidden From You?',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Blindspot Awareness & Illumination Roadmap',
    actionTitle: 'Clarity Integration & Intuition Steps',
  },
  27: {
    topicId: 27,
    title: 'Energy Cord Cutting Ritual & Reading',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Etheric Cord Severance & Renewal Roadmap',
    actionTitle: 'Aura Sealing & Vitality Reclamation Steps',
  },
  28: {
    topicId: 28,
    title: 'Energy Reset & Soul Detox',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Chakra Purification & Soul Detox Protocol',
    actionTitle: 'Holistic Vitality Restoration Steps',
  },
  29: {
    topicId: 29,
    title: 'Third Eye Psychic Reading',
    totalPages: 36,
    moduleCMode: 'two_pages_per_question',
    questionCount: 6,
    moduleCRange: [13, 24],
    moduleDRange: [25, 28],
    moduleERange: [29, 36],
    roadmapTitle: 'Visionary Horizon & Psychic Activation Roadmap',
    actionTitle: 'Third Eye Daily Attunement Steps',
  },
  30: {
    topicId: 30,
    title: 'Dream Message Revealed',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Astral Integration & Subconscious Roadmap',
    actionTitle: 'Lucid Awareness & Dream Journal Steps',
  },
  31: {
    topicId: 31,
    title: 'What Is Your Pet Not Telling You?',
    totalPages: 30,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 30],
    roadmapTitle: 'Animal Soul Connection & Healing Roadmap',
    actionTitle: 'Pet Blessing & Silent Harmony Steps',
  },
  32: {
    topicId: 32,
    title: '10 Question Deep Dive Reading',
    totalPages: 40,
    moduleCMode: 'two_pages_per_question',
    questionCount: 10,
    moduleCRange: [13, 32],
    moduleDRange: [33, 36],
    moduleERange: [37, 40],
    roadmapTitle: 'Masterclass Realization & Integration Roadmap',
    actionTitle: 'Exhaustive Sovereignty & Manifestation Steps',
  },
};

export const getTopicMasterBlueprint = (
  topic: string | number,
  tier: ReadingTier = 'detailed',
  hasDob: boolean = true
): TopicBlueprintSpec => {
  const spec = getCategorySpecByTopic(topic);
  const topicStr = String(topic || '').toLowerCase();
  const specTitle = (spec.title || '').toLowerCase();

  const isTwelveMonths =
    spec.categoryType === 'twelve_months' ||
    spec.id === 6 ||
    topicStr.includes('12 month') ||
    topicStr.includes('year forecast') ||
    topicStr.includes('12-month') ||
    topicStr.includes('annual forecast') ||
    topicStr.includes('twelve month') ||
    specTitle.includes('12 month') ||
    specTitle.includes('year forecast');

  const isEightPredictions =
    spec.categoryType === 'eight_predictions' ||
    spec.id === 7 ||
    topicStr.includes('8 future') ||
    topicStr.includes('8 prediction') ||
    topicStr.includes('eight prediction') ||
    topicStr.includes('future prediction') ||
    specTitle.includes('8 future') ||
    specTitle.includes('8 prediction');

  const isTenQuestions =
    spec.id === 32 ||
    (spec.suggestedQuestions && spec.suggestedQuestions.length >= 8) ||
    topicStr.includes('10 question') ||
    topicStr.includes('10 burning') ||
    topicStr.includes('ten question') ||
    specTitle.includes('10 question');

  // 12-Month Annual Forecast: ALWAYS at least 12 individual month pages
  if (isTwelveMonths) {
    const totalPages =
      tier === 'standard'
        ? (hasDob ? 28 : 27)
        : tier === 'detailed'
        ? (hasDob ? 34 : 33)
        : (hasDob ? 40 : 39);

    const startModuleC = hasDob ? 15 : 14;
    const endModuleC = startModuleC + 11; // 12 pages for 12 months

    return {
      topicId: spec.id,
      title: spec.title,
      totalPages,
      tier,
      hasDob,
      moduleCMode: 'one_page_per_month',
      questionCount: 12,
      moduleCRange: [startModuleC, endModuleC],
      moduleDRange: [endModuleC + 1, endModuleC + 4],
      moduleERange: [endModuleC + 5, totalPages],
      roadmapTitle: 'Quarterly Energetic Roadmap & Milestones',
      actionTitle: 'Annual Realization & Manifestation Steps',
    };
  }

  // 8 Future Predictions: ALWAYS at least 8 individual prediction pages
  if (isEightPredictions) {
    const totalPages =
      tier === 'standard'
        ? (hasDob ? 24 : 23)
        : tier === 'detailed'
        ? (hasDob ? 30 : 29)
        : (hasDob ? 36 : 35);

    const startModuleC = hasDob ? 15 : 14;
    const endModuleC = startModuleC + 7; // 8 pages for 8 predictions

    return {
      topicId: spec.id,
      title: spec.title,
      totalPages,
      tier,
      hasDob,
      moduleCMode: 'one_page_per_month',
      questionCount: 8,
      moduleCRange: [startModuleC, endModuleC],
      moduleDRange: [endModuleC + 1, endModuleC + 4],
      moduleERange: [endModuleC + 5, totalPages],
      roadmapTitle: 'Future Trajectory Synthesis & Timeline',
      actionTitle: 'Predictive Integration & Alignment Steps',
    };
  }

  // 10 Burning Questions: ALWAYS 10 individual question inquiries
  if (isTenQuestions) {
    const totalPages =
      tier === 'standard'
        ? (hasDob ? 26 : 25)
        : tier === 'detailed'
        ? (hasDob ? 34 : 33)
        : (hasDob ? 40 : 39);

    const startModuleC = hasDob ? 15 : 14;
    const endModuleC = startModuleC + 9;

    return {
      topicId: spec.id,
      title: spec.title,
      totalPages,
      tier,
      hasDob,
      moduleCMode: tier === 'standard' ? 'one_page_per_month' : 'two_pages_per_question',
      questionCount: 10,
      moduleCRange: [startModuleC, endModuleC],
      moduleDRange: [endModuleC + 1, endModuleC + 4],
      moduleERange: [endModuleC + 5, totalPages],
      roadmapTitle: 'Masterclass Realization & Integration Roadmap',
      actionTitle: 'Exhaustive Sovereignty & Manifestation Steps',
    };
  }

  // Standard Tier: 17 to 20 pages
  if (tier === 'standard') {
    const qCount = spec.suggestedQuestions && spec.suggestedQuestions.length >= 5 ? 5 : 4;
    const totalPages = hasDob ? 18 : 17;
    return {
      topicId: spec.id,
      title: spec.title,
      totalPages,
      tier: 'standard',
      hasDob,
      moduleCMode: 'two_pages_per_question',
      questionCount: qCount,
      moduleCRange: [hasDob ? 13 : 12, hasDob ? 13 + qCount - 1 : 12 + qCount - 1],
      moduleDRange: [hasDob ? 14 + qCount - 1 : 13 + qCount - 1, hasDob ? 15 + qCount - 1 : 14 + qCount - 1],
      moduleERange: [hasDob ? 16 + qCount - 1 : 15 + qCount - 1, totalPages],
      roadmapTitle: `${spec.title} 30-Day Guidance`,
      actionTitle: `${spec.title} Action Plan`,
    };
  }

  // Detailed Tier: 26 to 28 pages
  if (tier === 'detailed') {
    const totalPages = hasDob ? 27 : 26;
    return {
      topicId: spec.id,
      title: spec.title,
      totalPages,
      tier: 'detailed',
      hasDob,
      moduleCMode: 'two_pages_per_question',
      questionCount: 4,
      moduleCRange: [hasDob ? 15 : 14, hasDob ? 22 : 21],
      moduleDRange: [hasDob ? 23 : 22, hasDob ? 24 : 23],
      moduleERange: [hasDob ? 25 : 24, totalPages],
      roadmapTitle: `${spec.title} Strategic Roadmap`,
      actionTitle: `${spec.title} 4-Phase Protocol`,
    };
  }

  // Premium Tier: 34 to 40 pages
  const qCount = spec.suggestedQuestions && spec.suggestedQuestions.length >= 6 ? 6 : 5;
  const totalPages = hasDob ? (qCount === 6 ? 38 : 34) : (qCount === 6 ? 37 : 33);

  return {
    topicId: spec.id,
    title: spec.title,
    totalPages,
    tier: 'premium',
    hasDob,
    moduleCMode: 'two_pages_per_question',
    questionCount: qCount,
    moduleCRange: [hasDob ? 16 : 15, hasDob ? 15 + qCount * 2 : 14 + qCount * 2],
    moduleDRange: [hasDob ? 16 + qCount * 2 : 15 + qCount * 2, hasDob ? 19 + qCount * 2 : 18 + qCount * 2],
    moduleERange: [hasDob ? 20 + qCount * 2 : 19 + qCount * 2, totalPages],
    roadmapTitle: `${spec.title} Sacred Roadmap & Timelines`,
    actionTitle: `${spec.title} Multi-Phase Protocol`,
  };
};

export const getCategoryPageCount = (
  categorySpec: CategorySpec,
  tier: ReadingTier = 'detailed',
  hasDob: boolean = true
): number => {
  const bp = getTopicMasterBlueprint(categorySpec.id, tier, hasDob);
  return bp ? bp.totalPages : (tier === 'standard' ? 17 : tier === 'premium' ? 34 : 27);
};

// Build high-depth 2-page items for Module C
export const buildDeepDiveItems = (
  categorySpec: CategorySpec,
  inputs: ReadingInputs,
  parsedQaInsights: { question: string; answer: string }[],
  card1Name: string,
  card2Name: string,
  card3Name: string,
  lpNumber: number,
  tier: ReadingTier = 'detailed',
  hasDob: boolean = true
): DeepDiveQuestionItem[] => {
  const bp = getTopicMasterBlueprint(categorySpec.id, tier, hasDob);
  const querentName = inputs.name || 'Seeker';
  const personName = inputs.categoryData?.personName || 'the other party';
  const petName = inputs.categoryData?.petName || 'your pet companion';
  const cleanProblem = inputs.problem ? inputs.problem.trim() : 'navigating your sacred crossroads';
  const cleanQuestion = inputs.question ? inputs.question.trim() : 'What is the highest alignment for my path?';

  // Base list of inquiries tailored to each topic
  const baseQuestions: {
    q: string;
    sub: string;
    trans: string;
    som: string;
    subc: string;
    sovr: string;
    tag: string;
    anc: string;
  }[] = [];

  // If AI parsed insights exist, map them with enhanced 2-page depth
  if (parsedQaInsights && parsedQaInsights.length > 0) {
    return parsedQaInsights.slice(0, bp.questionCount).map((qa, idx) => {
      const qNum = idx + 1;
      const cardRef = idx % 3 === 0 ? card1Name : (idx % 3 === 1 ? card2Name : card3Name);
      
      // Ensure transmission reaches 200-250 words of rich, intuitive depth
      let richTransmission = qa.answer;
      if (richTransmission.length < 500) {
        richTransmission = `${qa.answer} Within your energetic field, this inquiry marks a profound turning point in your spiritual development. Reflecting the vibrational medicine of ${cardRef} and the sovereign wisdom of Life Path ${lpNumber}, you are being urged to look beyond immediate surface appearances. When you stop bargaining with ambiguity and allow your intuition to guide your choices, the underlying friction dissolves. Trust that your nervous system knows what true peace feels like; do not second-guess the quiet clarity whispering in your core. The universe is actively aligning external circumstances to match your internal standard of self-respect.`;
      }

      return {
        questionNumber: qNum,
        question: qa.question,
        subTitle: `Channeled Oracle Transmission · Inquiry ${qNum} of ${bp.questionCount}`,
        oracleTransmission: richTransmission,
        somaticKey: `✦ Somatic Anchor: Notice where tension softens in your chest and throat as this truth is accepted.`,
        subconsciousArchitecture: `Beneath the conscious narrative lies an ingrained defense pattern developed to guard against vulnerability or disappointment. Your energetic system has reflexively braced for friction, leading to subconscious hypervigilance, over-analysis, and an urge to control outcomes rather than resting in receptive trust.`,
        sovereignRealignment: `To bring this into physical reality, release the exhausting need for external validation or permission. Ground into your Life Path ${lpNumber} sovereignty through three deep belly breaths, establish one non-negotiable emotional boundary, and let your daily actions reflect quiet, unshakeable self-assurance.`,
        tag: `Inquiry ${qNum} Alignment`,
        anchor: `Truth brings an immediate sense of relief, spaciousness, and authentic sovereignty into your core.`,
      };
    });
  }

  // Topic specific custom generators for all 32 topics
  switch (categorySpec.id) {
    // Topic 1: Deep Love Reading
    case 1:
      baseQuestions.push(
        {
          q: 'What is the true soulmate frequency currently connecting you both?',
          sub: 'Soulmate Connection & Mutual Resonance',
          trans: `The cosmic cards reveal a profound telepathic and energetic tether connecting your hearts on a multi-dimensional level. While surface circumstances may have felt complicated, guarded, or stalled, the underlying soul resonance remains vibrant, sensitive, and actively communicating in the unseen realms. ${card1Name} shows that whenever you step out of anxiety and honor your authentic truth, the mutual resonance expands exponentially between you. You are dealing with a connection that has acted as a spiritual mirror, reflecting back to you your deepest capacities for unconditional love alongside your core vulnerabilities. This person frequently feels your presence during moments of quiet solitude, recognizing that the emotional depth shared between you is rare, unmistakable, and impossible to replace with superficial substitutes. The current cosmic transit is asking you to anchor your heart in serene self-reverence rather than fearful grasping, allowing the pure frequency of authentic affection to dissolve lingering emotional armor.`,
          som: '✦ Somatic Key: Place your left hand on your heart; feel the steady, warm pulse of unconditional love and sovereign safety.',
          subc: `Subconsciously, both of you carry past heart wounds that trigger automatic emotional withdraw or hypervigilance whenever intimacy deepens. The hesitation you sense from them is an internal fear of inadequacy and emotional exposure, not a lack of love.`,
          sovr: `Release the urge to micromanage their timeline. Embody the joyful radiance of ${card3Name}, step into your Life Path ${lpNumber} magnetic center, and trust that divine timing is orchestrating reciprocal clarity and mature vulnerability.`,
          tag: 'Soulmate Resonance',
          anc: 'Authentic love never requires you to diminish your worth or beg to be received.',
        },
        {
          q: 'What emotional or karmic blockage is currently stalling deeper intimacy?',
          sub: 'Karmic Obstacles & Vulnerability Shields',
          trans: `Reflecting the acute tension of ${card2Name}, the current stall in this romantic journey is rooted in unspoken expectations, guarded assumptions, and protective walls erected after past disappointments. You have been waiting for unequivocal confirmation and safety, while the other party is quietly wrestling with their own perceived inadequacies and fear of failing to meet your standards. This mutual hesitation creates an energetic standoff where both souls desire closer union yet fear the risk of total emotional exposure. ${card2Name} reminds you that vulnerability is not weakness; it is the prerequisite for authentic intimacy. The blockage is not a permanent barrier, but rather a temporary threshold requiring conscious communication and the dissolution of outdated self-defense mechanisms that no longer serve either of your spirits.`,
          som: '✦ Somatic Key: Exhale slowly for 6 counts through your mouth, consciously releasing the reflex to analyze their subtle moods.',
          subc: `A deeply rooted fear of abandonment has created an urge to over-analyze every gesture or text message. When you grip tightly out of anxiety, you inadvertently project tension into the connection, stifling the natural, organic flow of affection.`,
          sovr: `Step back into your sovereign energetic container. Grant them the space required to step forward under their own volition, and hold your high standards with quiet, compassionate firmness rather than desperate pleading.`,
          tag: 'Karmic Dissolution',
          anc: 'Spaciousness creates the sacred vacuum where genuine desire, mutual effort, and lasting commitment flourish.',
        },
        {
          q: 'What unspoken romantic feelings and desires are they holding for you?',
          sub: 'Unspoken Heart Confessions & Desires',
          trans: `Deep within their private emotional sanctuary, they hold an intense reverence and admiration for your grace, emotional intelligence, resilience, and magnetic beauty. They frequently replay shared moments of ease, laughter, and genuine comfort in their mind, recognizing that being in your presence feels like coming home to a sanctuary they rarely experience in the outside world. However, their ego and past conditioning have created a hesitation to articulate these feelings aloud, fearing that fully confessing their depth will leave them disempowered or vulnerable to rejection. The intuitive frequency of ${card1Name} assures you that what you feel intuitively in your gut regarding their unspoken affection is completely real and accurate.`,
          som: '✦ Somatic Key: Feel a wave of golden warmth radiating through your solar plexus; accept their silent admiration without urgency.',
          subc: `They fear they might not measure up to your elevated standards or that revealing their full emotional dependence will jeopardize their autonomy. Their silence is a protective mask, not indifference.`,
          sovr: `Remain in your magnetic receptivity. You do not need to coax or interrogate their feelings; allow their authentic feelings to reveal themselves through consistent, aligned actions and steady presence over time.`,
          tag: 'Heart Revelation',
          anc: 'Real feelings naturally find their way into physical expression when met with patience and emotional safety.',
        },
        {
          q: 'What pivotal turning point will unfold in this love connection over the next 3 months?',
          sub: 'Romantic Turning Point & Catalyst',
          trans: `A decisive breakthrough and vibrational turning point is rapidly approaching in your romantic timeline. The repetitive cycles of ambiguity, mixed signals, and emotional distance are exhausting their karmic lease. An unexpected, vulnerable conversation will shatter the superficial silence, allowing both of you to lay your cards on the table with mature transparency and genuine emotional honesty. This conversation will clear away months of accumulated misunderstandings and reset the energetic foundation of your partnership upon mutual reverence, shared boundaries, and clear commitments. Under the forward momentum of ${card3Name}, what once felt confusing or unmanageable will suddenly snap into clear focus.`,
          som: '✦ Somatic Key: Breathe in steady, crisp clarity; trust that what is divinely meant for you will never pass you by.',
          subc: `The subconscious dynamic of hot-and-cold interaction is completing its karmic cycle. Both of your nervous systems are ready to graduate from dramatic turbulence into grounded emotional stability.`,
          sovr: `Prepare for this turning point by clarifying your non-negotiables. Refuse to settle for breadcrumbs of affection when you are fully worthy of a devoted, passionate, and consistent romantic partnership.`,
          tag: 'Breakthrough Catalyst',
          anc: 'A monumental turning point begins the exact moment you decide you will only accept full emotional presence.',
        },
        {
          q: 'What is the highest romantic destiny and potential available to you?',
          sub: 'Ultimate Love Manifestation & Sanctuary',
          trans: `Under the triumphant, radiant blessing of ${card3Name}, your ultimate romantic destiny is anchored in deep mutual devotion, infectious laughter, spiritual companionship, and unshakeable emotional security. You are stepping into a chapter where love no longer feels like a battlefield, a puzzle to solve, or an emotional sacrifice. Instead, your partnership will serve as a fertile sanctuary that nourishes your personal dreams, celebrates your authentic individuality, and reflects back your highest divine potential. As you align with your Life Path ${lpNumber} destiny, you magnetize a union characterized by effortless reciprocity, shared spiritual growth, and profound lifelong peace.`,
          som: '✦ Somatic Key: Smile gently, drop your shoulders away from your ears, and feel your spine lengthen in radiant, joyful confidence.',
          subc: `You are permanently retiring the outdated belief that love must be painful, hard-earned, or accompanied by constant emotional anxiety in order to be deep and meaningful.`,
          sovr: `Embody your full Life Path ${lpNumber} sovereign majesty. Radiate unconditional self-worth, celebrate your sacred boundaries, and allow reciprocal love to meet you at your elevated standard.`,
          tag: 'Highest Destiny',
          anc: 'You are worthy of a love that feels like deep peace, reciprocal passion, and coming home to yourself.',
        }
      );
      break;

    // Topic 11: Brutal Truth
    case 11:
      baseQuestions.push(
        {
          q: 'The Unvarnished Reality: What truth are you actively avoiding or romanticizing?',
          sub: 'Uncompromising Truth & Illusion Shattered',
          trans: `The cosmic cards reveal with zero sugar-coating that you have been rationalizing inconsistent behavior, minimizing glaring red flags, and investing emotional capital into potential rather than reality. ${card1Name} warns that staying in romanticized denial or making excuses for another's lack of effort will only prolong your internal exhaustion and deplete your self-respect. You have known the truth in your gut for weeks, yet your mind has constructed elaborate justifications to avoid the immediate discomfort of setting a boundary or walking away. The universe is removing your rose-colored glasses so that you can finally reclaim your sovereignty and stop pouring your vital life force into an emotional black hole that gives nothing in return.`,
          som: '✦ Somatic Key: Breathe out the heavy knot in your stomach; look at what is real right now without flinching.',
          subc: `You have subconsciously associated admitting the truth with admitting personal failure or facing terrifying loneliness. In truth, acknowledging reality is your very first step toward total spiritual liberation.`,
          sovr: `Stop negotiating with ambiguity. Accept people for who they prove themselves to be through their daily actions, not who you hope they might become in an imaginary future.`,
          tag: 'Unfiltered Truth',
          anc: 'Refusing to acknowledge reality does not change it; it only keeps you captive to an exhausting illusion.',
        },
        {
          q: 'The Uncomfortable Mirror: Where is your fear of conflict keeping you disempowered?',
          sub: 'Shadow Integration & Self-Accountability',
          trans: `Through the piercing mirror of ${card2Name}, it is evident that your desire to keep the peace has become an act of self-betrayal. You have been biting your tongue, swallowing your genuine grievances, and accommodating poor treatment because you fear that speaking your unfiltered truth will trigger conflict, rejection, or abandonment. This counterfeit peace comes at the direct cost of your internal harmony and nervous system health. The resentment and exhaustion you feel are not signs that you are broken; they are warning sirens signaling that your boundaries have been violated and that you have abandoned yourself to protect another person's fragile comfort.`,
          som: '✦ Somatic Key: Plant both feet firmly on the earth; unclench your jaw and claim your right to take up space without apology.',
          subc: `You carry an outdated childhood belief that your worth is tied to being agreeable and easy to manage, fearing that having firm boundaries makes you unlovable.`,
          sovr: `Let anyone who is inconvenienced by your boundaries exit your life. You do not need connections that require you to silence your voice or diminish your dignity to survive.`,
          tag: 'Sovereign Shadow',
          anc: 'A boundary without real-world consequences is merely an empty suggestion; stand firmly behind your words.',
        },
        {
          q: 'The Tough Cosmic Medicine: What toxic dynamic must be severed immediately?',
          sub: 'Radical Boundary & Energetic Severance',
          trans: `You must immediately withdraw your energy, time, and emotional availability from one-sided dynamics, endless explanations, and cyclical guilt trips. Close the door permanently to half-hearted commitments, situationships that lead nowhere, and people who only show up when they need something from you. Under the uncompromising light of ${card2Name}, continuing to participate in this dynamic is an active choice to prolong your own suffering. The universe will not rescue you from situations you refuse to walk away from. Reclaim your energetic investment and allow the silence to communicate what words have failed to teach.`,
          som: '✦ Somatic Key: Place both hands firmly over your solar plexus; feel your power, dignity, and life force returning to your core.',
          subc: `You have been chasing closure or an apology from the very source of the wound. True closure is never granted by the person who hurt you; it is an internal decision to stop engaging.`,
          sovr: `Declare your energetic independence today. As a Life Path ${lpNumber}, your loyalty and emotional depth are sacred treasures that must be earned through consistent reciprocity.`,
          tag: 'Radical Severance',
          anc: 'True closure does not come from a conversation; it arrives the moment you decide you are permanently finished.',
        },
        {
          q: 'The Sovereign Breakthrough: What abundant reality opens when you stop settling?',
          sub: 'Empowered Liberation & Triumph',
          trans: `The exact second you stop tolerating bare-minimum treatment and step into the radiant power of ${card3Name}, your vibrational field instantly clears. The exhaustion lifts, your creative vitality returns, and your aura becomes an irresistible magnet for authentic opportunities, deep mutual respect, and reciprocal partnerships. By removing what is toxic, you create the sacred space necessary for the universe to bless you with the abundance you have always deserved. Stepping into this new chapter is your declaration that you will never settle for less than total alignment again.`,
          som: '✦ Somatic Key: Inhale deeply through your nose and feel your entire ribcage expand with pure, exhilarating liberation.',
          subc: `Your subconscious mind now recognizes that you are your own primary protector and that you will never sacrifice your well-being for anyone else again.`,
          sovr: `Walk with your head high and your heart shielded by healthy discernment. Your destiny is far too expansive to spend another minute begging for scraps.`,
          tag: 'Sovereign Triumph',
          anc: 'The universe cannot fill your hands with true abundance until you have the courage to drop what drains you.',
        }
      );
      break;

    // Default generator for any other topic (Topics 2-10, 12-32)
    default:
      for (let i = 1; i <= bp.questionCount; i++) {
        const activeCardName = i === 1 ? card1Name : (i === 2 ? card2Name : card3Name);
        const customQ = categorySpec.suggestedQuestions && categorySpec.suggestedQuestions[i - 1]
          ? categorySpec.suggestedQuestions[i - 1]
          : `Inquiry ${i}: Channeled Guidance regarding ${cleanProblem}`;
        baseQuestions.push({
          q: customQ,
          sub: `Sacred Oracle Channel · Inquiry ${i} of ${bp.questionCount}`,
          trans: `The channeled oracle reveals that this phase of your life is activating profound soul mastery and conscious elevation. Reflecting the sacred medicine of ${activeCardName}, you are learning to anchor unshakeable clarity within your own center, refusing to let external doubt, delays, or ambiguity dictate your emotional equilibrium. In navigating "${cleanProblem}", your spiritual guides emphasize that every obstacle you have encountered has served to dismantle outdated illusions and strengthen your sovereign discernment. You are being called to trust the wisdom of your lived experience and step forward with quiet, unwavering authority. As you align your mindset with the vibrational frequency of Life Path ${lpNumber}, you will discover that solutions and opportunities begin to manifest with remarkable synchronicity, clearing the path toward lasting peace, creative fulfillment, and empowered self-expression.`,
          som: `✦ Somatic Key: Take three slow, grounding breaths deep into your lower belly; allow tension to melt into the earth as clarity anchors in your core.`,
          subc: `Subconsciously, an outdated defensive belief pattern is being dismantled. You are transitioning out of an old fear of making mistakes or being judged, moving into the grounded understanding that your worth is inherent and unconditional.`,
          sovr: `Align your daily habits with your highest values. Speak your truth with dignity, establish boundaries that fiercely protect your peace, and step boldly into the triumphant expansion awaiting you on this sacred path.`,
          tag: `Dimension ${i} Realization`,
          anc: `Clarity, sovereignty, and profound inner peace are your divine birthright; walk forward with unwavering trust.`,
        });
      }
      break;
  }

  return baseQuestions.slice(0, bp.questionCount).map((item, idx) => ({
    questionNumber: idx + 1,
    question: item.q,
    subTitle: item.sub,
    oracleTransmission: item.trans,
    somaticKey: item.som,
    subconsciousArchitecture: item.subc,
    sovereignRealignment: item.sovr,
    tag: item.tag,
    anchor: item.anc,
  }));
};

// Build 12 Month Forecast Items for Topic 6
export const buildTwelveMonthItems = (
  card1Name: string,
  card2Name: string,
  card3Name: string,
  lpNumber: number
): MonthForecastItem[] => {
  const months = [
    { name: 'Month 1', zodiac: 'Aries / Mars', elem: 'Fire', title: 'Awakening & Fresh Foundations' },
    { name: 'Month 2', zodiac: 'Taurus / Venus', elem: 'Earth', title: 'Heart Softening & Inner Worth' },
    { name: 'Month 3', zodiac: 'Gemini / Mercury', elem: 'Air', title: 'Vocational Pivot & Inspiration' },
    { name: 'Month 4', zodiac: 'Cancer / Moon', elem: 'Water', title: 'Material Stability & Prosperity' },
    { name: 'Month 5', zodiac: 'Leo / Sun', elem: 'Fire', title: 'Relationship Harmony & Reciprocity' },
    { name: 'Month 6', zodiac: 'Virgo / Mercury', elem: 'Earth', title: 'Mid-Year Karmic Graduation' },
    { name: 'Month 7', zodiac: 'Libra / Venus', elem: 'Air', title: 'Creative Spark & Passion Projects' },
    { name: 'Month 8', zodiac: 'Scorpio / Pluto', elem: 'Water', title: 'Fearless Boundary & Power Reclaim' },
    { name: 'Month 9', zodiac: 'Sagittarius / Jupiter', elem: 'Fire', title: 'Unexpected Synchronicity & Travel' },
    { name: 'Month 10', zodiac: 'Capricorn / Saturn', elem: 'Earth', title: 'Home Sanctuary & Domestic Peace' },
    { name: 'Month 11', zodiac: 'Aquarius / Uranus', elem: 'Air', title: 'Intuitive Mastery & Psychic Clarity' },
    { name: 'Month 12', zodiac: 'Pisces / Neptune', elem: 'Water', title: 'Grand Cycle Completion & Triumphant Rebirth' },
  ];

  return months.map((m, idx) => ({
    monthNumber: idx + 1,
    monthName: m.name,
    title: m.title,
    astrologicalSign: m.zodiac,
    element: m.elem,
    forecast: `During ${m.name}, your energetic field experiences a profound calibration toward ${m.title.toLowerCase()}. Under the influence of ${idx < 4 ? card1Name : idx < 8 ? card2Name : card3Name}, you will navigate key decisions with heightened clarity. Obstacles that once felt insurmountable will dissolve as you align with your Life Path ${lpNumber} destiny.`,
    practicalAdvice: `Dedicate regular quiet time for reflection, establish clear emotional boundaries, and take decisive inspired action without overthinking.`,
    affirmation: `&ldquo;I step into ${m.name} with an open heart, sovereign confidence, and absolute trust in my divine timeline.&rdquo;`,
  }));
};
