import { ReadingTier, SectionDefinition } from '../types';

export type ArchetypeId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface ArchetypeMeta {
  id: ArchetypeId;
  name: string;
  code: string;
  tagline: string;
  description: string;
  icon: string;
  spreadType: string;
  spreadCardCount: number;
  highlightModules: string[];
  prohibitedModules: string[];
}

export const ARCHETYPES: Record<ArchetypeId, ArchetypeMeta> = {
  A: {
    id: 'A',
    name: 'Exact Thoughts & Feelings',
    code: 'ARCHETYPE A',
    tagline: 'Dual-Entity Psychological Mirror & Mind-Decoding Architecture',
    description:
      'Channeled scan into another person’s conscious persona vs. secret feelings, unexpressed intentions, and avoidant defense mechanisms.',
    icon: 'BrainCircuit',
    spreadType: '5-Card Mind-Decoding Altar Spread',
    spreadCardCount: 5,
    highlightModules: [
      'The Surface Mask vs. Subconscious Whisper',
      'The Unspoken Confession Box (Channeled Monologue)',
      'Psychological Defense Breakdown (Avoidance & Vulnerability)',
      'Vedic Mercury / Budha Communication Upayas',
      'Lunar Timing for Outreach & Truth',
    ],
    prohibitedModules: [
      '12-Month Chronological Timeline (Irrelevant for mind-reading)',
      'Vocational Wealth & Investment Matrices (Out of scope)',
      'Twin Flame Past Life Contracts (Unless explicitly romantic karmic)',
    ],
  },
  B: {
    id: 'B',
    name: '12-Month Future Predictions',
    code: 'ARCHETYPE B',
    tagline: 'Chronological Timeline Grid & Annual Transits',
    description:
      'Sequential temporal progression forecasting 12 dedicated monthly cycles, seasonal pivots (Q1–Q4), and annual soul themes.',
    icon: 'CalendarDays',
    spreadType: '12-Card Annual Timeline Spread',
    spreadCardCount: 12,
    highlightModules: [
      '12 Dedicated Monthly Forecast Pages',
      'Quarterly Seasonal Pivots (Q1 to Q4)',
      'Annual Major Arcana Master Cycle Map',
      'Personal Year Epicycle Timing',
    ],
    prohibitedModules: [
      'Dual-Entity Mind-Decoding Confession Box',
      'Romantic Attachment Synastry Trap Analysis',
      'Micro Daily Q&A Modules',
    ],
  },
  C: {
    id: 'C',
    name: 'Deep Love & Soulmate Readings',
    code: 'ARCHETYPE C',
    tagline: 'Relational Synastry & Heart-Chakra Matrix',
    description:
      'Comprehensive interpersonal synergy analyzing mutual emotional resonance, attachment style triggers, and energetic reciprocity.',
    icon: 'HeartHandshake',
    spreadType: '5-Card Relational Pyramid Spread',
    spreadCardCount: 5,
    highlightModules: [
      '5-Card Relational Pyramid Altar Spread',
      'Attachment Style Synastry Wheel (Anxious-Avoidant Cycle)',
      'Heart & Sacral Chakra Alignment Matrix',
      'Vedic Gauri-Shankar Upayas & Shukra Yantra',
      '30-Day Soulmate Harmonization Roadmap',
    ],
    prohibitedModules: [
      'Vocational Wealth & Business Growth Matrices',
      'Single-Entity Mind Reading Monologue',
    ],
  },
  D: {
    id: 'D',
    name: 'Career & Wealth Abundance',
    code: 'ARCHETYPE D',
    tagline: 'Vocational Abundance Blueprint & Material Mastery',
    description:
      'Professional navigation mapping skill sovereignty, financial ceilings, commercial crossroads, and income manifestation.',
    icon: 'TrendingUp',
    spreadType: '5-Card Vocational Destiny Spread',
    spreadCardCount: 5,
    highlightModules: [
      'Vocational Destiny & Abundance Matrix',
      'Solar Plexus & Root Chakra Grounding Diagnostic',
      'Kubera Yantra & Material Execution Milestones',
      'Quarterly Financial Milestones',
    ],
    prohibitedModules: [
      'Romantic Attachment Synastry',
      'Heart-Wall Healing Protocols',
      'Dating / Ex-Partner Confession Modules',
    ],
  },
  E: {
    id: 'E',
    name: 'Spiritual Awakening & Karma',
    code: 'ARCHETYPE E',
    tagline: 'Karmic Ascendance & Kundalini Alignment Matrix',
    description:
      'Soul purpose blueprint investigating past-life contracts, spirit guide messages, psychic gifts, and crown-to-root embodiment.',
    icon: 'Sparkle',
    spreadType: '5-Card Akashic Awakening Spread',
    spreadCardCount: 5,
    highlightModules: [
      'Karmic Lessons & Past Life Cord Analysis',
      'Akashic Record & 7-Chakra Vertical Activation',
      'Spiritual Bypass Prevention Diagnostic',
      'Third Eye & Crown Kundalini Gateway',
    ],
    prohibitedModules: [
      'Short-Term Material Timelines',
      'Superficial Dating Trackers',
    ],
  },
  F: {
    id: 'F',
    name: 'Universal / Custom Domain',
    code: 'ARCHETYPE F',
    tagline: 'Dynamic AI Router & Cross-System Triangulation',
    description:
      'Adaptive modular architecture dynamically calibrating domain resonance for custom, novel, or multi-faceted life inquiries.',
    icon: 'Compass',
    spreadType: '3-Card or 5-Card Tailored Altar Spread',
    spreadCardCount: 3,
    highlightModules: [
      'Domain Resonance Matrix (Tailored 3-Page Diagnostic)',
      'Cross-System Triangulation (Elemental + Astrological)',
      'Suit-Weighted Temporal Anchor Box',
      '4-Phase Sovereign Action Protocol',
    ],
    prohibitedModules: [
      'Unsolicited Romantic Attachments (Unless query relates to love)',
      'Hardcoded Static Templates',
    ],
  },
};

/**
 * Intelligent Archetype Detector based on Title, Topic, Problem, and Question
 */
export function detectReadingArchetype(topic: string, problem: string = '', question: string = ''): ArchetypeMeta {
  const combined = `${topic} ${problem} ${question}`.toLowerCase();

  // 1. Archetype A: Thoughts & Feelings / Hidden Intentions
  if (
    combined.includes('feelings') ||
    combined.includes('thoughts') ||
    combined.includes('hidden') ||
    combined.includes('secret') ||
    combined.includes('intending') ||
    combined.includes('intention') ||
    combined.includes('hiding') ||
    combined.includes('what they') ||
    combined.includes('mind') ||
    combined.includes('no contact') ||
    combined.includes('thinking of me') ||
    combined.includes('silent') ||
    combined.includes('why they')
  ) {
    return ARCHETYPES.A;
  }

  // 2. Archetype B: 12-Month Future Predictions
  if (
    combined.includes('12-month') ||
    combined.includes('12 month') ||
    combined.includes('year ahead') ||
    combined.includes('annual') ||
    combined.includes('predictions') ||
    combined.includes('future forecast') ||
    combined.includes('next year') ||
    combined.includes('timeline') ||
    combined.includes('quarterly')
  ) {
    return ARCHETYPES.B;
  }

  // 3. Archetype C: Deep Love & Soulmates
  if (
    combined.includes('love') ||
    combined.includes('soulmate') ||
    combined.includes('twin flame') ||
    combined.includes('relationship') ||
    combined.includes('partner') ||
    combined.includes('marriage') ||
    combined.includes('heart wall') ||
    combined.includes('cord cutting') ||
    combined.includes('reunion') ||
    combined.includes('ex-partner') ||
    combined.includes('divorce')
  ) {
    return ARCHETYPES.C;
  }

  // 4. Archetype D: Career & Wealth
  if (
    combined.includes('career') ||
    combined.includes('job') ||
    combined.includes('business') ||
    combined.includes('wealth') ||
    combined.includes('money') ||
    combined.includes('finance') ||
    combined.includes('promotion') ||
    combined.includes('investment') ||
    combined.includes('crypto') ||
    combined.includes('work') ||
    combined.includes('firm')
  ) {
    return ARCHETYPES.D;
  }

  // 5. Archetype E: Spiritual Awakening
  if (
    combined.includes('spiritual') ||
    combined.includes('awakening') ||
    combined.includes('spirit guide') ||
    combined.includes('angel') ||
    combined.includes('past life') ||
    combined.includes('karma') ||
    combined.includes('third eye') ||
    combined.includes('chakra') ||
    combined.includes('akashic') ||
    combined.includes('aura') ||
    combined.includes('soul purpose')
  ) {
    return ARCHETYPES.E;
  }

  // Default: Archetype F (Universal Dynamic Router)
  return ARCHETYPES.F;
}

/**
 * MASTER CATALOG OF ALL 38 MODULAR SECTIONS
 */
export const MASTER_SECTIONS_LIST: SectionDefinition[] = [
  // 1. Core Front-Matter
  {
    id: 'cover',
    key: 'cover',
    name: '01. Title Cover Page & Sacred Seal',
    category: 'core',
    description: 'Bespoke client cover featuring inquiry title, client names, date, and golden sacred seal.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'frontispiece',
    key: 'frontispiece',
    name: '02. Sacred Frontispiece & Cosmic Oracle Seal',
    category: 'core',
    description: 'Ceremonial opening invocation aligning intention, telepathic clarity, and psychic safety.',
    defaultIncludedInTiers: ['premium'],
    archetypeRestrictions: ['A', 'C', 'E', 'F'],
    exclusionReason: 'Exclusive to Premium Master Tier for ceremonial depth.',
  },
  {
    id: 'welcome',
    key: 'welcome',
    name: '03. Empathetic Welcome Letter & Sacred Space',
    category: 'core',
    description: 'Compassionate letter grounding the querent, setting expectations, and holding sacred space.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'reading-guide',
    key: 'reading-guide',
    name: '04. Reading Integration Guide & Mastery Key',
    category: 'core',
    description: 'Guidelines on how to absorb insights, release anxiety, and integrate truths without reactivity.',
    defaultIncludedInTiers: ['premium'],
    exclusionReason: 'Standard & Detailed tiers provide concise direct interpretation without meta-guide.',
  },
  {
    id: 'toc',
    key: 'toc',
    name: '05. Dynamic Table of Contents & Chapter Navigator',
    category: 'core',
    description: 'Structured index mapping every section and exact page number.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    exclusionReason: 'Standard Tier (16-18p) flows continuously without a separate TOC page.',
  },
  {
    id: 'grounding-ritual',
    key: 'grounding-ritual',
    name: '06. Sacred Space Grounding & Mental Reset',
    category: 'core',
    description: 'Pre-reading somatic reset ritual to release mental chatter and open intuitive receptive channels.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    exclusionReason: 'Included in Detailed & Premium tiers for enhanced energetic grounding.',
  },
  {
    id: 'querent-intake',
    key: 'querent-intake',
    name: '07. Querent & Connection Intake Blueprint',
    category: 'core',
    description: 'Full profile summary capturing querent context, connection dynamic, and focal question.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },

  // 2. Numerology & Astrological Timing
  {
    id: 'numerology-core',
    key: 'numerology-core',
    name: '08. Numerology Foundation & Life Path Core',
    category: 'numerology_astrology',
    description: 'Full math breakdown of Life Path number, ruling archetypes, and core vibration.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
    requiresDob: true,
    exclusionReason: 'Automatically eliminated when Date of Birth is omitted by the user.',
  },
  {
    id: 'personal-year',
    key: 'personal-year',
    name: '09. Personal Year Epicycle & Timing Matrix',
    category: 'numerology_astrology',
    description: 'Annual energetic cycle analysis indicating active windows of initiation, silence, and harvest.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    requiresDob: true,
    exclusionReason: 'Requires Date of Birth; omitted in Standard Tier to maintain 16-18p budget.',
  },
  {
    id: 'elemental-balance',
    key: 'elemental-balance',
    name: '10. Elemental Energy Balance & Cross-Tension',
    category: 'numerology_astrology',
    description: 'Diagnostic of Fire, Water, Air, and Earth distribution revealing mental loops vs emotional depths.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    exclusionReason: 'Included in Detailed & Premium for multi-dimensional elemental diagnostics.',
  },
  {
    id: 'astrology',
    key: 'astrology',
    name: '11. Celestial Astrological Resonance & Planetary Filters',
    category: 'numerology_astrology',
    description: 'Analysis of Sun, Moon, and Mercury/Venus placements governing speech and emotional filters.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },

  // 3. Sacred Altar & Tarot Spread
  {
    id: 'altar-spread',
    key: 'altar-spread',
    name: '12. Sacred Altar Spread Overview & Architecture',
    category: 'tarot_spread',
    description: 'Comprehensive 5-point or 3-point altar spread visual layout mapping all drawn tarot positions.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'card-1',
    key: 'card-1',
    name: '13. Position 1 Deep Dive: Surface Mask / Current Energy',
    category: 'tarot_spread',
    description: 'Full-page analysis with high-definition card artwork and psychological translation.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'card-2',
    key: 'card-2',
    name: '14. Position 2 Deep Dive: Secret Emotion / Subconscious Truth',
    category: 'tarot_spread',
    description: 'Full-page analysis uncovering suppressed heart-level feelings and private longing.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'card-3',
    key: 'card-3',
    name: '15. Position 3 Deep Dive: What Is Hidden / Root Obstacle',
    category: 'tarot_spread',
    description: 'Full-page analysis revealing the unspoken fear, pride barrier, or shadow blockage.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'card-4',
    key: 'card-4',
    name: '16. Position 4 Deep Dive: True Intentions / External Forces',
    category: 'tarot_spread',
    description: 'Full-page analysis mapping their subconscious trajectory and next planned moves.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'card-5',
    key: 'card-5',
    name: '17. Position 5 Deep Dive: Breakthrough Catalyst / Path Forward',
    category: 'tarot_spread',
    description: 'Full-page analysis revealing the exact shift that dissolves the wall and aligns destiny.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },

  // 4. Specialized Archetype Modules
  {
    id: 'specialized-mask-whisper',
    key: 'specialized-blueprint',
    name: '18. The Surface Mask vs. Subconscious Whisper',
    category: 'master_specialized',
    description: 'Side-by-side comparative column decoding outer persona against private suppressed thoughts.',
    defaultIncludedInTiers: ['premium'],
    archetypeRestrictions: ['A'],
    exclusionReason: 'Exclusive to Archetype A (Thoughts & Feelings) in Premium Master Tier.',
  },
  {
    id: 'defense-breakdown',
    key: 'extended-shadow-work',
    name: '19. Psychological Defense Breakdown & Shadow Armor',
    category: 'master_specialized',
    description: 'Detailed breakdown of avoidant withdrawal, vulnerability fears, and the catalyst that dissolves armor.',
    defaultIncludedInTiers: ['premium'],
    archetypeRestrictions: ['A', 'C'],
    exclusionReason: 'Targeted to relationship & mind-decoding archetypes (A & C).',
  },
  {
    id: 'confession-box',
    key: 'confession-box',
    name: '20. The Unspoken Confession Box (Channeled Transcript)',
    category: 'master_specialized',
    description: 'Direct first-person telepathic monologue transcript of what they think but cannot voice aloud.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
    archetypeRestrictions: ['A'],
    exclusionReason: 'Exclusive to Archetype A (Exact Thoughts & Feelings).',
  },
  {
    id: 'timeline-12-month',
    key: 'timeline-12-month',
    name: '21. 12-Month Chronological Forecast Grid',
    category: 'master_specialized',
    description: 'Sequential 12-page calendar matrix detailing monthly astrological transits and cards.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    archetypeRestrictions: ['B'],
    exclusionReason: 'Exclusive to Archetype B (12-Month Future Predictions).',
  },
  {
    id: 'career-wealth-matrix',
    key: 'career-wealth-master-blueprint',
    name: '22. Vocational Destiny & Wealth Abundance Matrix',
    category: 'master_specialized',
    description: 'High-level business sovereignty, financial risk mitigation, and commercial milestone mapping.',
    defaultIncludedInTiers: ['premium'],
    archetypeRestrictions: ['D'],
    exclusionReason: 'Exclusive to Archetype D (Career & Wealth).',
  },
  {
    id: 'universal-dynamic-blueprint',
    key: 'universal-dynamic-page-1',
    name: '23. Domain Resonance & Dynamic Blueprint Matrix',
    category: 'master_specialized',
    description: 'On-the-fly cross-system diagnostic mapping unseen obstacles for custom & novel inquiries.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    archetypeRestrictions: ['F'],
    exclusionReason: 'Exclusive to Archetype F (Universal & Custom Topics).',
  },

  // 5. Synthesis & Deep-Dive Inquiries
  {
    id: 'synthesis-p1',
    key: 'synthesis-p1',
    name: '24. Psychological Synthesis · Part 1: Cognitive Dissonance',
    category: 'synthesis_psychology',
    description: 'Deep synthesis weaving cards and numbers to decode the macro energetic battle.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'synthesis-p2',
    key: 'synthesis-p2',
    name: '25. Psychological Synthesis · Part 2: Behavioral Triggers',
    category: 'synthesis_psychology',
    description: 'Micro-level analysis of specific actions and communication triggers.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    exclusionReason: 'Included in Detailed & Premium tiers for dual-part synthesis depth.',
  },
  {
    id: 'deep-dive-1',
    key: 'deep-dive-1-part1',
    name: '26. Inquiry Deep Dive 1: Subconscious Wall & Core Fear',
    category: 'synthesis_psychology',
    description: '2-page deep inquiry examining why they retreat from vulnerability.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    exclusionReason: 'Reserved for Detailed & Premium editions (2 pages per inquiry).',
  },
  {
    id: 'deep-dive-2',
    key: 'deep-dive-2-part1',
    name: '27. Inquiry Deep Dive 2: External Influences & Pride Barriers',
    category: 'synthesis_psychology',
    description: '2-page deep inquiry analyzing third-party voices, obligations, and pride.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    exclusionReason: 'Reserved for Detailed & Premium editions.',
  },
  {
    id: 'deep-dive-3',
    key: 'deep-dive-3-part1',
    name: '28. Inquiry Deep Dive 3: Realization & Breakthrough Tipping Point',
    category: 'synthesis_psychology',
    description: '2-page deep inquiry pinpointing what circumstance triggers their outreach.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    exclusionReason: 'Reserved for Detailed & Premium editions.',
  },

  // 6. Energetic Upayas, Remedies & Roadmaps
  {
    id: 'chakra-matrix',
    key: 'chakra-matrix',
    name: '29. 7-Center Chakra Diagnostic (Throat & Third Eye Focus)',
    category: 'remedies_action',
    description: 'Energetic scan measuring Vishuddha (truth speech) and Ajna (telepathic intuition) alignment.',
    defaultIncludedInTiers: ['premium'],
    exclusionReason: 'Master-level feature included in Premium Tier.',
  },
  {
    id: 'vedic-upayas',
    key: 'vedic-upayas',
    name: '30. Vedic Upayas for Truth & Telepathic Clarity (Budha Yantra)',
    category: 'remedies_action',
    description: 'Ancient Jyotish remedies, Mercury mantras, and gemstone practices to dissolve silence.',
    defaultIncludedInTiers: ['premium'],
    archetypeRestrictions: ['A', 'C', 'D'],
    exclusionReason: 'Premium Master Tier Vedic remedy protocol.',
  },
  {
    id: 'relational-sigil',
    key: 'relational-sigil',
    name: '31. Telepathic Clarity Sigil & Intention Vector',
    category: 'remedies_action',
    description: 'Custom sacred geometry glyph designed to cut through mental fog and attract unarmored truth.',
    defaultIncludedInTiers: ['premium'],
    archetypeRestrictions: ['A', 'C', 'E', 'F'],
    exclusionReason: 'Premium Master Tier sacred geometry feature.',
  },
  {
    id: 'lunar-timing',
    key: 'lunar-romance',
    name: '32. Lunar Timing for Honest Communication & Outreach',
    category: 'remedies_action',
    description: 'Chronobiological windows predicting New, Waxing, Full, and Waning Moon shifts.',
    defaultIncludedInTiers: ['premium'],
    archetypeRestrictions: ['A', 'C'],
    exclusionReason: 'Included in Premium Tier for detailed astrological timing.',
  },
  {
    id: 'roadmap-p1',
    key: 'roadmap-p1',
    name: '33. 30-Day Relational & Communication Roadmap',
    category: 'remedies_action',
    description: 'Week-by-week behavioral trajectory forecasting silence cycles, shifts, and contact windows.',
    defaultIncludedInTiers: ['detailed', 'premium'],
    exclusionReason: 'Detailed & Premium tiers include structured 30-day integration maps.',
  },
  {
    id: 'action-steps',
    key: 'action-steps',
    name: '34. 4-Phase Interaction Protocol (Observe · Detach · Realign · Mirror)',
    category: 'remedies_action',
    description: 'Strategic actionable behavioral steps on holding emotional sovereignty.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'mantras',
    key: 'mantras',
    name: '35. Daily Sovereign Mantras & Soul Inquiry Reflections',
    category: 'remedies_action',
    description: '5 high-potency "I AM" affirmations paired with 3 introspective journaling prompts.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'spiritual-prescription-p1',
    key: 'spiritual-prescription-p1',
    name: '36. Spiritual Prescription: Crystal Grid & Botanical Allies',
    category: 'remedies_action',
    description: 'Prescription of Lapis Lazuli, Moonstone, Blue Chamomile, and Vagus nerve breathwork.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
  {
    id: 'glossary',
    key: 'glossary',
    name: '37. Esoteric Glossary & Integration Lexicon',
    category: 'core',
    description: 'Comprehensive reference definitions of psychic, psychological, and astrological terminology.',
    defaultIncludedInTiers: ['premium'],
    exclusionReason: 'Premium Master Tier reference section.',
  },
  {
    id: 'closing-blessing',
    key: 'closing-blessing',
    name: '38. Sacred Closing Blessing & Ethical Psychic Disclaimer',
    category: 'core',
    description: 'Final benediction, shop signature, and legal ethical boundary statement.',
    defaultIncludedInTiers: ['standard', 'detailed', 'premium'],
  },
];

/**
 * Calculates which sections are Active (Selected) vs Eliminated (Inactive)
 * taking into account:
 * - Selected Tier (standard, detailed, premium)
 * - Detected Archetype (A, B, C, D, E, F)
 * - Presence of Date of Birth (DOB)
 * - User custom overrides (customSections and excludedSections)
 */
export function calculateSectionState(
  tier: ReadingTier = 'detailed',
  archetype: ArchetypeMeta,
  hasDob: boolean = true,
  customSections?: string[],
  excludedSections?: string[]
): {
  selectedSections: SectionDefinition[];
  eliminatedSections: { section: SectionDefinition; reason: string }[];
  totalPagesCount: number;
} {
  const selected: SectionDefinition[] = [];
  const eliminated: { section: SectionDefinition; reason: string }[] = [];

  MASTER_SECTIONS_LIST.forEach((sec) => {
    // 1. Explicit user exclusion
    if (excludedSections && excludedSections.includes(sec.id)) {
      eliminated.push({ section: sec, reason: 'Manually omitted by user customization.' });
      return;
    }

    // 2. Explicit user inclusion
    if (customSections && customSections.includes(sec.id)) {
      selected.push(sec);
      return;
    }

    // 3. Check DOB requirement
    if (sec.requiresDob && !hasDob) {
      eliminated.push({
        section: sec,
        reason: 'Eliminated because Date of Birth was not provided (clean renumbering).',
      });
      return;
    }

    // 4. Check Archetype restrictions
    if (sec.archetypeRestrictions && !sec.archetypeRestrictions.includes(archetype.id)) {
      eliminated.push({
        section: sec,
        reason: `Eliminated for ${archetype.code} (${archetype.name}) — out of scope for this reading type.`,
      });
      return;
    }

    // 5. Check Tier inclusion
    if (!sec.defaultIncludedInTiers.includes(tier)) {
      eliminated.push({
        section: sec,
        reason:
          sec.exclusionReason ||
          `Omitted in ${tier.toUpperCase()} Tier (included in ${sec.defaultIncludedInTiers.join(' / ').toUpperCase()}).`,
      });
      return;
    }

    // Otherwise included by default
    selected.push(sec);
  });

  return {
    selectedSections: selected,
    eliminatedSections: eliminated,
    totalPagesCount: selected.length,
  };
}
