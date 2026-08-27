import { TarotCard } from '../types';

export interface TOCSectionDef {
  number: number;
  title: string;
  subtitle: string;
  key: string;
  description: string;
  tier: 'standard' | 'detailed' | 'premium';
}

export interface CategoryTOCDefinition {
  id: number;
  categoryKey: string;
  title: string;
  headline: string;
  spread: {
    cardCount: number;
    spreadName: string;
    positions: {
      position: number;
      name: string;
      role: string;
      elementFocus: string;
    }[];
  };
  standardTier: {
    name: string;
    pageRange: string;
    focus: string;
    sectionCount: number;
    sections: TOCSectionDef[];
  };
  detailedTier: {
    name: string;
    pageRange: string;
    focus: string;
    sectionCount: number;
    sections: TOCSectionDef[];
  };
  premiumTier: {
    name: string;
    pageRange: string;
    focus: string;
    sectionCount: number;
    sections: TOCSectionDef[];
  };
  inquiries: {
    number: number;
    title: string;
    question: string;
    diagnosisFocus: string;
    shadowRoot: string;
    somaticPractice: string;
    tag: string;
    anchor: string;
  }[];
  spiritualPrescription: {
    crystals: { name: string; description: string; placement: string; vibration: string }[];
    botanicals: { name: string; description: string; usage: string; essence: string }[];
    mindfulness: { name: string; description: string; ritual: string[] };
  };
  vedicRemedies: {
    rudraksha: string;
    yantra: string;
    mantra: string;
    guidelines: string;
  };
  extendedShadowWork?: {
    title: string;
    trapName: string;
    analysis: string;
    releaseProtocol: string;
  };
  lunarGuidelines?: {
    title: string;
    phases: { phase: string; focus: string; recommendation: string }[];
  };
}

export const CATEGORY_TOC_REGISTRY: Record<number, CategoryTOCDefinition> = {
  // Category 1: Deep Love Reading - EXTREMELY DEEP LOVE PSYCHIC READING
  1: {
    id: 1,
    categoryKey: 'deep_love_reading',
    title: 'Deep Love Reading',
    headline: 'EXTREMELY DEEP LOVE PSYCHIC READING',
    spread: {
      cardCount: 5,
      spreadName: '5-Card Deep Love Altar Spread',
      positions: [
        {
          position: 1,
          name: 'Current Energy of the Bond',
          role: 'Present vibrational baseline and mutual heart resonance',
          elementFocus: 'Water (Emotion & Intuition)',
        },
        {
          position: 2,
          name: 'The Core Vulnerability / Subconscious Fear',
          role: 'Hidden resistance, defensive walls, or fear of abandonment/enmeshment',
          elementFocus: 'Fire / Shadow (Subconscious Tension)',
        },
        {
          position: 3,
          name: 'External or Environmental Influences',
          role: 'Outside pressures, third-party dynamics, or timing constraints',
          elementFocus: 'Air / Earth (Circumstance & Atmosphere)',
        },
        {
          position: 4,
          name: 'The Blind Spot / What You Are Missing',
          role: 'Unspoken truths, overlooked blessings, or subtle energetic shifts',
          elementFocus: 'Ether / Spirit (Veiled Insight)',
        },
        {
          position: 5,
          name: 'Immediate Path Forward & Healing Catalyst',
          role: 'The breakthrough action and highest trajectory for love alignment',
          elementFocus: 'Fire / Light (Aligned Action & Union)',
        },
      ],
    },
    standardTier: {
      name: 'Standard Tier — Core Deep Love Reading',
      pageRange: '15–18 Pages',
      focus: 'Direct, powerful emotional insights, relationship energy status, and immediate blockages.',
      sectionCount: 16,
      sections: [
        {
          number: 1,
          title: 'Cover Page',
          subtitle: 'Deep Love & Soul Connection Reading, Querent Name, Date, Seal',
          key: 'cover',
          description: 'Bespoke artistic cover framed with sacred love geometry and querent presentation.',
          tier: 'standard',
        },
        {
          number: 2,
          title: 'Welcome Letter & Heart-Centered Intention Setting',
          subtitle: 'Empathetic reader opening establishing emotional safety',
          key: 'welcome',
          description: 'A sanctuary welcome creating a tranquil space for receptive emotional healing.',
          tier: 'standard',
        },
        {
          number: 3,
          title: 'Numerology Foundation',
          subtitle: 'Life Path & Expression numbers (omitted cleanly if DOB blank)',
          key: 'numerology',
          description: 'Mathematical vibration of love resonance and relational destiny.',
          tier: 'standard',
        },
        {
          number: 4,
          title: 'Querent Love Intake & Relational State Blueprint',
          subtitle: 'Current relationship status, emotional goals, core question',
          key: 'intake-blueprint',
          description: 'Intake anchoring the connection parameters and divine inquiry focus.',
          tier: 'standard',
        },
        {
          number: 5,
          title: 'Astrological Resonance',
          subtitle: 'Venusian Archetype & Water/Fire Elemental Balance',
          key: 'astrology-alignment',
          description: 'Venusian placement, romantic alchemy, and astrological synergy.',
          tier: 'standard',
        },
        {
          number: 6,
          title: '5-Card Deep Love Altar Overview',
          subtitle: 'Current Bond, Hidden Fear, External Influence, Missing Piece, Immediate Path Forward',
          key: 'tarot-overview',
          description: 'Altar architecture organizing the 5 sacred relational cards.',
          tier: 'standard',
        },
        {
          number: 7,
          title: 'Card 1: Current Energy of the Bond',
          subtitle: 'Channeled analysis of present connection frequency',
          key: 'card1-deep',
          description: 'Deep dive into the active vibrational reality between your hearts.',
          tier: 'standard',
        },
        {
          number: 8,
          title: 'Card 2: The Core Vulnerability / Subconscious Fear',
          subtitle: 'Unmasking defense mechanisms and emotional walls',
          key: 'card2-deep',
          description: 'Diagnostic look into hidden relational resistance.',
          tier: 'standard',
        },
        {
          number: 9,
          title: 'Card 3: External or Environmental Influences',
          subtitle: 'Navigating third-party dynamics and timing forces',
          key: 'card3-deep',
          description: 'External pressures affecting communication and connection.',
          tier: 'standard',
        },
        {
          number: 10,
          title: 'Card 4: The Blind Spot / What You Are Missing',
          subtitle: 'Illuminating overlooked feelings and veiled dynamics',
          key: 'card4-deep',
          description: 'Channeled revelation of unspoken truths and subtle signs.',
          tier: 'standard',
        },
        {
          number: 11,
          title: 'Card 5: Immediate Path Forward & Healing Catalyst',
          subtitle: 'Aligned romantic action and highest breakthrough outcome',
          key: 'card5-deep',
          description: 'Empowered path to magnetize reciprocal, enduring intimacy.',
          tier: 'standard',
        },
        {
          number: 12,
          title: 'Focused Love Synthesis & Relational Mirroring',
          subtitle: 'How the cards reflect your emotional dynamics and mutual growth',
          key: 'synthesis-standard',
          description: 'Harmonized synthesis integrating the entire 5-card spread.',
          tier: 'standard',
        },
        {
          number: 13,
          title: 'Strategic Relational Action Steps',
          subtitle: '4 concrete steps for boundary setting or vulnerability',
          key: 'standard-action-plan',
          description: 'Actionable relationship guidance grounded in self-respect and love.',
          tier: 'standard',
        },
        {
          number: 14,
          title: 'Daily Heart-Centered Mantras & Soul Reflections',
          subtitle: '5 "I AM Worthy of Love" affirmations & journaling prompts',
          key: 'standard-mantras-inquiries',
          description: 'Daily affirmations and prompts to anchor unshakeable love worthiness.',
          tier: 'standard',
        },
        {
          number: 15,
          title: 'Spiritual Prescription',
          subtitle: 'Rose Quartz/Rhodonite, Rose/Jasmine Botanicals, and Heart-Coherence Meditation',
          key: 'standard-prescription',
          description: 'Targeted holistic love remedies for emotional harmonization.',
          tier: 'standard',
        },
        {
          number: 16,
          title: 'Sacred Closing Blessing & Ethical Disclaimer',
          subtitle: 'Heartfelt reader benediction, ethical boundaries, and gratitude',
          key: 'closing-blessing',
          description: 'Final blessing sealing the reading in unconditional light.',
          tier: 'standard',
        },
      ],
    },
    detailedTier: {
      name: 'Detailed Tier — Deep Emotional Transformation & Healing',
      pageRange: '25–28 Pages',
      focus: 'Advanced shadow work on attachment styles, multi-part emotional inquiries, and a 30-day relationship integration roadmap.',
      sectionCount: 25,
      sections: [
        {
          number: 1,
          title: 'Cover Page',
          subtitle: 'Deep Love & Soul Connection Reading',
          key: 'cover',
          description: 'Bespoke artistic cover.',
          tier: 'detailed',
        },
        {
          number: 2,
          title: 'Welcome Letter & Heart-Centered Intention Setting',
          subtitle: 'Empathetic reader opening establishing emotional safety',
          key: 'welcome',
          description: 'Sacred sanctuary welcome.',
          tier: 'detailed',
        },
        {
          number: 3,
          title: 'Table of Contents & Chapter Guide',
          subtitle: 'Structured roadmap detailing each page and milestone',
          key: 'table_of_contents',
          description: 'Numbered chapter index.',
          tier: 'detailed',
        },
        {
          number: 4,
          title: 'Sacred Space Grounding & Heart-Opening Ritual',
          subtitle: 'Intention setting, candle invocation, and heart calibration',
          key: 'intention_setting',
          description: 'Grounding ritual for emotional clarity.',
          tier: 'detailed',
        },
        {
          number: 5,
          title: 'Numerology Foundation',
          subtitle: 'Life Path & Expression numbers for love resonance',
          key: 'numerology',
          description: 'Mathematical vibration of romantic destiny.',
          tier: 'detailed',
        },
        {
          number: 6,
          title: 'Personal Year Cycle & Relationship Timing Matrix',
          subtitle: 'Astrological epicycle timing for romantic decisions and breakthroughs',
          key: 'personal-year-cycles',
          description: 'Epicycle timing analysis for relationships.',
          tier: 'detailed',
        },
        {
          number: 7,
          title: 'Querent Love Intake & Relational State Blueprint',
          subtitle: 'Current relationship status, emotional goals, core question',
          key: 'intake-blueprint',
          description: 'Intake and query resonance.',
          tier: 'detailed',
        },
        {
          number: 8,
          title: 'Astrological Resonance',
          subtitle: 'Venusian Archetype & Water/Fire Elemental Balance',
          key: 'astrology-alignment',
          description: 'Cosmic astrological alignment.',
          tier: 'detailed',
        },
        {
          number: 9,
          title: 'Elemental Energy Distribution Analysis',
          subtitle: 'Deep dive into Water/Earth compatibility in love',
          key: 'elemental-energy-balance',
          description: 'Elemental balance and emotional constitution.',
          tier: 'detailed',
        },
        {
          number: 10,
          title: '5-Card Deep Love Altar Overview',
          subtitle: 'Altar architecture organizing the 5 relational cards',
          key: 'tarot-overview',
          description: 'Altar spread overview.',
          tier: 'detailed',
        },
        {
          number: 11,
          title: 'Card 1: Current Energy of the Bond',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card1-deep',
          description: 'Present connection baseline.',
          tier: 'detailed',
        },
        {
          number: 12,
          title: 'Card 2: The Core Vulnerability / Subconscious Fear',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card2-deep',
          description: 'Subconscious resistance and fear of vulnerability.',
          tier: 'detailed',
        },
        {
          number: 13,
          title: 'Card 3: External or Environmental Influences',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card3-deep',
          description: 'Third-party factors and external dynamics.',
          tier: 'detailed',
        },
        {
          number: 14,
          title: 'Card 4: The Blind Spot / What You Are Missing',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card4-deep',
          description: 'Veiled feelings and unseen patterns.',
          tier: 'detailed',
        },
        {
          number: 15,
          title: 'Card 5: Immediate Path Forward & Healing Catalyst',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card5-deep',
          description: 'Actionable path to breakthrough.',
          tier: 'detailed',
        },
        {
          number: 16,
          title: 'Dual-Part Deep Synthesis · Part 1: Macro Relationship Cycles',
          subtitle: 'Larger karmic arc and relational evolution',
          key: 'synthesis-p1',
          description: 'Synthesis Part 1.',
          tier: 'detailed',
        },
        {
          number: 17,
          title: 'Dual-Part Deep Synthesis · Part 2: Micro Trigger Points',
          subtitle: 'Everyday communication friction and healing breakthroughs',
          key: 'synthesis-p2',
          description: 'Synthesis Part 2.',
          tier: 'detailed',
        },
        {
          number: 18,
          title: 'Inquiry 1: Attachment Wound & Abandonment/Enmeshment Triggers',
          subtitle: 'Channeled diagnosis, shadow root cause, and somatic release',
          key: 'deep-dive-1-part1',
          description: 'Inquiry 1 diagnosis & release.',
          tier: 'detailed',
        },
        {
          number: 19,
          title: 'Inquiry 2: Shadow Architecture & Communication Blockages',
          subtitle: 'Channeled diagnosis, shadow root cause, and somatic release',
          key: 'deep-dive-2-part1',
          description: 'Inquiry 2 diagnosis & release.',
          tier: 'detailed',
        },
        {
          number: 20,
          title: 'Inquiry 3: Alignment Indicators & Reciprocity Blueprint',
          subtitle: 'Channeled diagnosis, shadow root cause, and somatic release',
          key: 'deep-dive-3-part1',
          description: 'Inquiry 3 diagnosis & release.',
          tier: 'detailed',
        },
        {
          number: 21,
          title: '30-Day Relational Integration Roadmap',
          subtitle: 'Weeks 1–4 structured milestone calendar for emotional healing',
          key: 'roadmap-p1',
          description: '30-day relationship healing roadmap.',
          tier: 'detailed',
        },
        {
          number: 22,
          title: '4-Phase Connection Protocol',
          subtitle: 'Deconstruct → Align → Embody → Anchor',
          key: 'action-steps',
          description: '4-phase structured action steps.',
          tier: 'detailed',
        },
        {
          number: 23,
          title: 'Daily Heart-Centered Mantras & Soul Reflections',
          subtitle: '5 "I AM" affirmations & soul inquiry journaling',
          key: 'mantras',
          description: 'Daily mantras for love alignment.',
          tier: 'detailed',
        },
        {
          number: 24,
          title: '2-Part Spiritual Prescription · Earth Allies & Somatic Breathwork',
          subtitle: 'Dedicated Rose Quartz crystal grid + Somatic Heart-Coherence page',
          key: 'spiritual-prescription-p1',
          description: 'Holistic crystal, botanical, and somatic prescription.',
          tier: 'detailed',
        },
        {
          number: 25,
          title: 'Sacred Closing Blessing & Ethical Disclaimer',
          subtitle: 'Final benediction and sacred boundary ethics',
          key: 'closing-blessing',
          description: 'Closing blessings.',
          tier: 'detailed',
        },
      ],
    },
    premiumTier: {
      name: 'Premium Tier — Master Esoteric Soulmate & Twin Flame Blueprint',
      pageRange: '34–38 Pages',
      focus: 'The complete masterclass report with chakra alignment, Vedic relationship remedies, and advanced emotional reciprocity matrices.',
      sectionCount: 34,
      sections: [
        {
          number: 1,
          title: 'Cover Page',
          subtitle: 'Deep Love & Soul Connection Reading, Querent Name, Date, Seal',
          key: 'cover',
          description: 'Bespoke artistic cover.',
          tier: 'premium',
        },
        {
          number: 2,
          title: 'Sacred Frontispiece & Cosmic Seal',
          subtitle: 'Formal esoteric invocation declaring planetary auspices',
          key: 'title-subtitle-frontispiece',
          description: 'Sacred frontispiece page.',
          tier: 'premium',
        },
        {
          number: 3,
          title: 'How to Read This Master Love Oracle Report',
          subtitle: 'Integration protocol, emotional pacing, and reader key',
          key: 'navigation-guide',
          description: 'How to navigate this masterclass report.',
          tier: 'premium',
        },
        {
          number: 4,
          title: 'Table of Contents & Chapter Guide',
          subtitle: 'Visual multi-chapter index detailing all 34 sacred milestones',
          key: 'table_of_contents',
          description: 'Table of contents index.',
          tier: 'premium',
        },
        {
          number: 5,
          title: 'Welcome Letter & Heart-Centered Intention Setting',
          subtitle: 'Soul-to-soul alignment welcoming the seeker',
          key: 'welcome',
          description: 'Welcome letter.',
          tier: 'premium',
        },
        {
          number: 6,
          title: 'Sacred Space Grounding & Heart-Opening Ritual',
          subtitle: 'Sanctuary consecration, candle lighting, and heart attunement',
          key: 'intention_setting',
          description: 'Heart-opening ritual.',
          tier: 'premium',
        },
        {
          number: 7,
          title: 'Numerology Foundation',
          subtitle: 'Life Path & Expression numbers for love resonance',
          key: 'numerology',
          description: 'Numerology profile.',
          tier: 'premium',
        },
        {
          number: 8,
          title: 'Personal Year Cycle & Relationship Timing Matrix',
          subtitle: 'Epicycle timing for romantic commitments and milestones',
          key: 'personal-year-cycles',
          description: 'Personal year epicycle analysis.',
          tier: 'premium',
        },
        {
          number: 9,
          title: 'Querent Love Intake & Relational State Blueprint',
          subtitle: 'Current relationship status, emotional goals, core question',
          key: 'intake-blueprint',
          description: 'Intake blueprint.',
          tier: 'premium',
        },
        {
          number: 10,
          title: 'Astrological Resonance',
          subtitle: 'Venusian Archetype & Water/Fire Elemental Balance',
          key: 'astrology-alignment',
          description: 'Astrological alignment.',
          tier: 'premium',
        },
        {
          number: 11,
          title: 'Elemental Energy Distribution Analysis',
          subtitle: 'Deep dive into Water/Earth compatibility in love',
          key: 'elemental-energy-balance',
          description: 'Elemental balance and constitution.',
          tier: 'premium',
        },
        {
          number: 12,
          title: '7-Center Chakra Alignment Matrix',
          subtitle: 'Diagnostic status focusing heavily on the Heart, Sacral, and Throat centers',
          key: 'chakra-matrix-alignment',
          description: 'Chakra matrix analysis.',
          tier: 'premium',
        },
        {
          number: 13,
          title: 'Vedic Upayas & Ancient Remedies',
          subtitle: 'Prescribed Gauri-Shankar Rudraksha & Venus/Shukra Yantra geometry',
          key: 'vedic-esoteric-remedies',
          description: 'Vedic remedies for relationship harmony.',
          tier: 'premium',
        },
        {
          number: 14,
          title: '5-Card Deep Love Altar Overview',
          subtitle: 'Altar architecture organizing the 5 relational cards',
          key: 'tarot-overview',
          description: 'Tarot spread overview.',
          tier: 'premium',
        },
        {
          number: 15,
          title: 'Card 1: Current Energy of the Bond',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card1-deep',
          description: 'Card 1 deep interpretation.',
          tier: 'premium',
        },
        {
          number: 16,
          title: 'Card 2: The Core Vulnerability / Subconscious Fear',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card2-deep',
          description: 'Card 2 deep interpretation.',
          tier: 'premium',
        },
        {
          number: 17,
          title: 'Card 3: External or Environmental Influences',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card3-deep',
          description: 'Card 3 deep interpretation.',
          tier: 'premium',
        },
        {
          number: 18,
          title: 'Card 4: The Blind Spot / What You Are Missing',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card4-deep',
          description: 'Card 4 deep interpretation.',
          tier: 'premium',
        },
        {
          number: 19,
          title: 'Card 5: Immediate Path Forward & Healing Catalyst',
          subtitle: 'Artwork & Channeled Meaning',
          key: 'card5-deep',
          description: 'Card 5 deep interpretation.',
          tier: 'premium',
        },
        {
          number: 20,
          title: 'Dual-Part Deep Synthesis · Part 1: Macro Relationship Cycles',
          subtitle: 'Karmic evolution and higher soul purpose of the bond',
          key: 'synthesis-p1',
          description: 'Synthesis Part 1.',
          tier: 'premium',
        },
        {
          number: 21,
          title: 'Dual-Part Deep Synthesis · Part 2: Micro Trigger Points',
          subtitle: 'Practical communication triggers and emotional realignment',
          key: 'synthesis-p2',
          description: 'Synthesis Part 2.',
          tier: 'premium',
        },
        {
          number: 22,
          title: 'Inquiry 1: Attachment Wound & Abandonment/Enmeshment Triggers',
          subtitle: 'Channeled diagnosis, shadow root cause, and somatic release',
          key: 'deep-dive-1-part1',
          description: 'Inquiry 1 transmission.',
          tier: 'premium',
        },
        {
          number: 23,
          title: 'Inquiry 2: Shadow Architecture & Communication Blockages',
          subtitle: 'Channeled diagnosis, shadow root cause, and somatic release',
          key: 'deep-dive-2-part1',
          description: 'Inquiry 2 transmission.',
          tier: 'premium',
        },
        {
          number: 24,
          title: 'Inquiry 3: Alignment Indicators & Reciprocity Blueprint',
          subtitle: 'Channeled diagnosis, shadow root cause, and somatic release',
          key: 'deep-dive-3-part1',
          description: 'Inquiry 3 transmission.',
          tier: 'premium',
        },
        {
          number: 25,
          title: 'Specialized Soul Blueprint: Soulmate Chemistry & Emotional Reciprocity',
          subtitle: 'Soul contracts, karmic ties vs. divine partnerships, and mutual frequency exchange',
          key: 'love-dynamics-master-blueprint',
          description: 'Soulmate chemistry blueprint.',
          tier: 'premium',
        },
        {
          number: 26,
          title: 'Extended Shadow Work & Attachment Pattern Symbolism',
          subtitle: 'Anxious/Avoidant trap analysis and sovereign detachment protocol',
          key: 'extended-shadow-work',
          description: 'Shadow work on attachment loops.',
          tier: 'premium',
        },
        {
          number: 27,
          title: 'Personalized Relational Sigil & Manifestation Vector',
          subtitle: 'Custom energetic symbol for love attraction and heart coherence',
          key: 'relational-sigil',
          description: 'Manifestation vector and sigil.',
          tier: 'premium',
        },
        {
          number: 28,
          title: 'Auspicious Timing & Lunar Phase Guidelines for Romance',
          subtitle: 'Best moon phases for hard conversations, releasing exes, or deepening commitments',
          key: 'lunar-romance-guidelines',
          description: 'Lunar timing for love.',
          tier: 'premium',
        },
        {
          number: 29,
          title: '30-Day Relational Integration Roadmap · Part I (Weeks 1 & 2)',
          subtitle: 'Days 1–14 milestone calendar for emotional healing',
          key: 'roadmap-p1',
          description: 'Roadmap Part 1.',
          tier: 'premium',
        },
        {
          number: 30,
          title: '30-Day Relational Integration Roadmap · Part II (Weeks 3 & 4)',
          subtitle: 'Days 15–30 breakthrough and conscious embodiment',
          key: 'roadmap-p2',
          description: 'Roadmap Part 2.',
          tier: 'premium',
        },
        {
          number: 31,
          title: '4-Phase Connection Protocol',
          subtitle: 'Deconstruct → Align → Embody → Anchor',
          key: 'action-steps',
          description: 'Action steps protocol.',
          tier: 'premium',
        },
        {
          number: 32,
          title: 'Daily Heart-Centered Mantras & Soul Reflections',
          subtitle: '5 "I AM Worthy of Love" affirmations & soul inquiries',
          key: 'mantras',
          description: 'Mantras and soul inquiries.',
          tier: 'premium',
        },
        {
          number: 33,
          title: '2-Part Spiritual Prescription · Earth Allies & Somatic Heart-Breathwork',
          subtitle: 'Rose Quartz & Rhodonite grid + Jasmine/Rose + Heart-Coherence',
          key: 'spiritual-prescription-p1',
          description: 'Spiritual prescription.',
          tier: 'premium',
        },
        {
          number: 34,
          title: 'Sacred Closing Blessing, Ethical Disclaimer & Esoteric Glossary',
          subtitle: 'Ethical boundaries, glossary of terms, and final benediction',
          key: 'closing-blessing',
          description: 'Closing blessing & glossary.',
          tier: 'premium',
        },
      ],
    },
    inquiries: [
      {
        number: 1,
        title: 'Attachment Wound & Abandonment/Enmeshment Triggers',
        question: 'What subconscious attachment wound or past relational imprint is influencing this connection?',
        diagnosisFocus: 'Attachment style dynamics, fear of vulnerability, and ancestral emotional conditioning.',
        shadowRoot: 'Hyper-vigilance or withdrawal triggered whenever emotional closeness reaches a threshold of genuine intimacy.',
        somaticPractice: 'Heart-hands anchor: Place palms over chest, breathe 4 counts in, 6 counts out, and affirm safety in emotional truth.',
        tag: 'ATTACHMENT HEALING & RECLAIMED SAFETY',
        anchor: 'I am safe to love deeply while remaining completely anchored in my sovereign truth.',
      },
      {
        number: 2,
        title: 'Shadow Architecture & Communication Blockages',
        question: 'Where are unspoken expectations or fear of conflict creating energetic static between you?',
        diagnosisFocus: 'Passive withholding, assuming intentions, or speaking through protective sarcasm/silence.',
        shadowRoot: 'Fear that expressing direct emotional needs will lead to rejection or being perceived as "too much".',
        somaticPractice: 'Throat-chakra release: Gentle neck rolls accompanied by an audible sigh on exhalation to clear suppressed voice.',
        tag: 'AUTHENTIC EXPRESSION & TRANSPARENCY',
        anchor: 'My voice is an instrument of love; expressing my needs brings clarity, not loss.',
      },
      {
        number: 3,
        title: 'Alignment Indicators & Reciprocity Blueprint',
        question: 'What concrete signs distinguish genuine reciprocal devotion from wishful projection in this bond?',
        diagnosisFocus: 'Consistency of action, mutual emotional availability, and equal energetic investment.',
        shadowRoot: 'Over-giving to earn love, or romanticizing potential over observable, consistent reality.',
        somaticPractice: 'Grounding feet scan: Feel soles flat on the earth, establishing firm boundaries before engaging in emotional exchange.',
        tag: 'RECIPROCAL SOUL COMPANIONSHIP',
        anchor: 'I only invest my precious energy where it is received, cherished, and mirrored in equal devotion.',
      },
    ],
    spiritualPrescription: {
      crystals: [
        {
          name: 'Rose Quartz & Rhodonite',
          description:
            'Rose Quartz softens the heart center to receive love freely, while Rhodonite clears emotional scars, balances yin-yang energy, and heals past heartache.',
          placement: 'Bedside altar or worn over the Heart Chakra (Anahata)',
          vibration: 'Unconditional Love, Emotional Healing & Forgiveness',
        },
        {
          name: 'Pink Tourmaline & Moonstone',
          description:
            'Pink Tourmaline infuses the aura with compassion and emotional safety, while Moonstone aligns emotional tides with divine timing.',
          placement: 'Under pillow during sleep or on vanity',
          vibration: 'Emotional Receptivity, Intuitive Clarity & Divine Timing',
        },
      ],
      botanicals: [
        {
          name: 'Damask Rose & Night-Blooming Jasmine',
          description:
            'Rose petals gently open the energetic heart while soothing an overstimulated nervous system. Jasmine elevates sensual confidence and invites romantic harmony.',
          usage: 'Warm herbal tea infusion, sacred bath soak, or pure essential oil mist',
          essence: 'Heart Softening, Romantic Reverence & Sacred Sensuality',
        },
      ],
      mindfulness: {
        name: 'Heart-Coherence & Loving-Kindness Breathwork',
        description:
          'A somatic heart-centering practice to dissolve defensive tension and broadcast the frequency of magnetic emotional worthiness.',
        ritual: [
          '1. Posture: Sit comfortably with an upright spine and both hands resting gently over your heart center.',
          '2. Breath: Inhale for 5 seconds, imagining fresh emerald-golden light entering your chest.',
          '3. Exhale: Breathe out for 5 seconds, allowing all residual tension, doubt, or resentment to melt into the earth.',
          '4. Declaration: Whisper aloud: "My heart is open, my boundaries are sovereign, and I welcome reciprocal love."',
        ],
      },
    },
    vedicRemedies: {
      rudraksha: 'Gauri-Shankar Rudraksha Bead Mukhi (The Sacred Unity of Shiva & Parvati)',
      yantra: 'Venus (Shukra) Sacred Sacred Geometry Yantra in Silver or Copper',
      mantra: 'Om Draam Dreem Droum Sah Shukraya Namaha (108 repetitions on Fridays at sunrise)',
      guidelines:
        'Wear the Gauri-Shankar bead near the heart on a silk cord on Friday mornings during Shukla Paksha (waxing moon) to harmonize marital dynamics, dissolve karmic blocks to union, and attract soulmate alignment.',
    },
    extendedShadowWork: {
      title: 'Attachment Pattern Symbolism & Anxious/Avoidant Trap Analysis',
      trapName: 'The Anxious-Avoidant Feedback Loop',
      analysis:
        'When one partner pulls away to self-regulate, the other perceives silence as abandonment and pursues with urgent demands. This activates deeper withdrawal in a self-perpetuating spiral. Breaking this cycle requires the anxious energy to self-soothe in stillness and the avoidant energy to communicate when taking space.',
      releaseProtocol:
        'Step 1: Notice the somatic panic trigger in your solar plexus before sending an impulsive text. Step 2: Allow 20 minutes of conscious breathwork. Step 3: Communicate from grounded desire rather than anxious desperation.',
    },
    lunarGuidelines: {
      title: 'Auspicious Timing & Lunar Phase Guidelines for Romance',
      phases: [
        {
          phase: 'New Moon in Venusian Signs (Taurus/Libra)',
          focus: 'Planting Seeds of New Love & Heart Intentions',
          recommendation:
            'Write down 5 non-negotiable qualities of your ideal reciprocal partnership. Cleanse your bedroom with rose water.',
        },
        {
          phase: 'Waxing Moon (First Quarter to Gibbous)',
          focus: 'Deepening Vulnerability & Quality Shared Time',
          recommendation:
            'Initiate honest conversations about future goals, express appreciation, and schedule intentional romantic dates.',
        },
        {
          phase: 'Full Moon',
          focus: 'Illumination of Truth & Deep Emotional Breakthroughs',
          recommendation:
            'Acknowledge unspoken truths. A potent time for soul-to-soul confessions or recognizing whether alignment is mutual.',
        },
        {
          phase: 'Waning Moon to Dark Moon',
          focus: 'Releasing Past Karmic Cords & Dissolving Ex-Partner Energy',
          recommendation:
            'Perform cord-cutting rituals, discard physical triggers of unreciprocated past dynamics, and reset emotional boundaries.',
        },
      ],
    },
  },

  // ==========================================
  // CATEGORY 2: EXACT THOUGHTS & FEELINGS (ARCHETYPE A)
  // ==========================================
  2: {
    id: 2,
    categoryKey: 'thoughts_feelings_reading',
    title: 'Exact Thoughts & Feelings',
    headline: 'HIDDEN FEELINGS & SECRET INTENTIONS PSYCHIC READING',
    spread: {
      cardCount: 5,
      spreadName: '5-Card Mind-Decoding Altar Spread',
      positions: [
        {
          position: 1,
          name: 'The Surface Mask',
          role: 'Conscious persona, outer composure, and behavioral projection',
          elementFocus: 'Air / Mental Armor',
        },
        {
          position: 2,
          name: 'The Secret Emotion',
          role: 'Suppressed heart-level feelings, attraction, and private thoughts',
          elementFocus: 'Water / Hidden Longing',
        },
        {
          position: 3,
          name: 'What They Are Hiding',
          role: 'Unspoken fears, ego defense, shame, or hidden reservations',
          elementFocus: 'Earth / Emotional Wall',
        },
        {
          position: 4,
          name: 'Their True Intentions',
          role: 'Subconscious trajectory, future desires, and planned next moves',
          elementFocus: 'Fire / Latent Will',
        },
        {
          position: 5,
          name: 'The Breakthrough Catalyst',
          role: 'The exact shift in sovereign presence that dissolves their defense wall',
          elementFocus: 'Ether / Karmic Awakening',
        },
      ],
    },
    standardTier: {
      name: 'Standard Tier — Telepathic Mind-Decoding Report',
      pageRange: '15–18 Pages',
      focus:
        'Immediate emotional diagnosis, conscious persona vs. secret feelings, channeled confession, and action steps.',
      sectionCount: 17,
      sections: [
        {
          number: 1,
          title: 'Cover Page',
          subtitle: 'Hidden Feelings Psychic Reading, Querent & POI Names, Date, Sacred Seal',
          key: 'cover',
          description: 'Client cover page.',
          tier: 'standard',
        },
        {
          number: 2,
          title: 'Welcome Letter & Sacred Intention Setting',
          subtitle: 'Empathetic psychic attunement & non-judgmental space invocation',
          key: 'welcome',
          description: 'Welcome and telepathic attunement.',
          tier: 'standard',
        },
        {
          number: 3,
          title: 'Numerological Resonance & Core Frequencies',
          subtitle: 'Life Path calculations and vibrational harmony between both minds',
          key: 'numerology-core',
          description: 'Numerology calculations.',
          tier: 'standard',
        },
        {
          number: 4,
          title: 'Querent & Person of Interest Intake Blueprint',
          subtitle: 'Connection context, current communication state, and specific dilemma',
          key: 'querent-intake',
          description: 'Dual-entity context.',
          tier: 'standard',
        },
        {
          number: 5,
          title: 'Astrological Resonance & Mental Filters',
          subtitle: 'Mercury and Moon placements governing communication and emotional suppression',
          key: 'astrology',
          description: 'Astrological communication analysis.',
          tier: 'standard',
        },
        {
          number: 6,
          title: '5-Card Mind-Decoding Altar Spread Overview',
          subtitle: '5-Point Oracle Architecture: Mask, Secret Emotion, Hidden Fear, Intentions, Catalyst',
          key: 'altar-spread',
          description: '5-card spread altar overview.',
          tier: 'standard',
        },
        {
          number: 7,
          title: 'Position 1: The Surface Mask (Conscious Projection)',
          subtitle: 'Card artwork, psychic decoding, and conscious outer behavior',
          key: 'card-1',
          description: 'Card 1 deep dive.',
          tier: 'standard',
        },
        {
          number: 8,
          title: 'Position 2: The Secret Emotion (Subconscious Truth)',
          subtitle: 'Card artwork, psychic decoding, and suppressed heart-level feelings',
          key: 'card-2',
          description: 'Card 2 deep dive.',
          tier: 'standard',
        },
        {
          number: 9,
          title: 'Position 3: What They Are Hiding (The Unspoken Fear)',
          subtitle: 'Card artwork, psychic decoding, and underlying ego defenses',
          key: 'card-3',
          description: 'Card 3 deep dive.',
          tier: 'standard',
        },
        {
          number: 10,
          title: 'Position 4: Their True Intentions (Planned Trajectory)',
          subtitle: 'Card artwork, psychic decoding, and forthcoming energetic shifts',
          key: 'card-4',
          description: 'Card 4 deep dive.',
          tier: 'standard',
        },
        {
          number: 11,
          title: 'Position 5: The Breakthrough Catalyst (The Key to Truth)',
          subtitle: 'Card artwork, psychic decoding, and the action that dissolves the barrier',
          key: 'card-5',
          description: 'Card 5 deep dive.',
          tier: 'standard',
        },
        {
          number: 12,
          title: 'Dual-Entity Psychological Synthesis',
          subtitle: 'Bridging their conscious actions with their secret emotions',
          key: 'synthesis-p1',
          description: 'Psychological synthesis.',
          tier: 'standard',
        },
        {
          number: 13,
          title: 'The Unspoken Confession Box',
          subtitle: 'Channeled direct monologue transcript of their private thoughts',
          key: 'confession-box',
          description: 'First-person channeled transcript.',
          tier: 'standard',
        },
        {
          number: 14,
          title: 'Strategic Behavioral Guidance',
          subtitle: '4 concrete steps on how to respond without chasing or pushing them away',
          key: 'action-steps',
          description: 'Strategic action steps.',
          tier: 'standard',
        },
        {
          number: 15,
          title: 'Sovereign Mantras & Soul Reflections',
          subtitle: '5 "I AM" affirmations for emotional peace & 3 journaling inquiries',
          key: 'mantras',
          description: 'Mantras and soul inquiries.',
          tier: 'standard',
        },
        {
          number: 16,
          title: 'Spiritual Prescription · Telepathic Clarity',
          subtitle: 'Lapis Lazuli, Moonstone, Blue Chamomile botanical allies & breathwork',
          key: 'spiritual-prescription-p1',
          description: 'Spiritual remedies.',
          tier: 'standard',
        },
        {
          number: 17,
          title: 'Sacred Closing Blessing & Ethical Psychic Disclaimer',
          subtitle: 'Final benediction and sovereign emotional boundaries',
          key: 'closing-blessing',
          description: 'Closing blessings.',
          tier: 'standard',
        },
      ],
    },
    detailedTier: {
      name: 'Detailed Tier — Expanded Psychological & Communication Forecast',
      pageRange: '25–28 Pages',
      focus:
        'Comprehensive cognitive dissonance mapping, defense triggers, and 30-day communication timeline.',
      sectionCount: 28,
      sections: [
        {
          number: 1,
          title: 'Cover Page',
          subtitle: 'Hidden Feelings & Secret Intentions Reading, Names, Date, Cosmic Seal',
          key: 'cover',
          description: 'Detailed cover.',
          tier: 'detailed',
        },
        {
          number: 2,
          title: 'Welcome Letter & Telepathic Attunement',
          subtitle: 'Empathetic guidance for interpreting silent and mixed signals',
          key: 'welcome',
          description: 'Welcome letter.',
          tier: 'detailed',
        },
        {
          number: 3,
          title: 'Table of Contents & Chapter Guide',
          subtitle: 'Structured roadmap through your channeled mind-decoding report',
          key: 'toc',
          description: 'Table of Contents.',
          tier: 'detailed',
        },
        {
          number: 4,
          title: 'Sacred Space Grounding & Telepathic Reset',
          subtitle: 'Detaching from mental anxiety and anchoring in energetic clarity',
          key: 'grounding-ritual',
          description: 'Grounding ritual.',
          tier: 'detailed',
        },
        {
          number: 5,
          title: 'Dual-Entity Querent & Person of Interest Intake',
          subtitle: 'Relational dynamic, communication frequency, and primary inquiry',
          key: 'querent-intake',
          description: 'Intake blueprint.',
          tier: 'detailed',
        },
        {
          number: 6,
          title: 'Numerology Foundation: Core Mental Frequencies',
          subtitle: 'Life Path calculation and cognitive synergy analysis',
          key: 'numerology-core',
          description: 'Core numerology.',
          tier: 'detailed',
        },
        {
          number: 7,
          title: 'Personal Year Cycle & Communication Timing Matrix',
          subtitle: 'Active timing epicycles indicating when they will initiate or speak',
          key: 'personal-year',
          description: 'Personal year timing.',
          tier: 'detailed',
        },
        {
          number: 8,
          title: 'Elemental Energy Balance: Air vs. Water Tension',
          subtitle: 'Air/Mercury mental loops vs. Water/Moon emotional suppression',
          key: 'elemental-balance',
          description: 'Elemental balance.',
          tier: 'detailed',
        },
        {
          number: 9,
          title: 'Astrological Resonance & Mental Filters',
          subtitle: 'Mercury, Venus, and Moon placements governing unspoken thoughts',
          key: 'astrology',
          description: 'Astrology report.',
          tier: 'detailed',
        },
        {
          number: 10,
          title: '5-Card Mind-Decoding Altar Spread Overview',
          subtitle: '5-Point Oracle Architecture: Mask, Emotion, Secret, Intentions, Catalyst',
          key: 'altar-spread',
          description: '5-card spread layout.',
          tier: 'detailed',
        },
        {
          number: 11,
          title: 'Position 1: The Surface Mask (Conscious Projection)',
          subtitle: 'Card artwork, psychic decoding, and conscious outer behavior',
          key: 'card-1',
          description: 'Card 1 deep dive.',
          tier: 'detailed',
        },
        {
          number: 12,
          title: 'Position 2: The Secret Emotion (Subconscious Truth)',
          subtitle: 'Card artwork, psychic decoding, and suppressed heart-level feelings',
          key: 'card-2',
          description: 'Card 2 deep dive.',
          tier: 'detailed',
        },
        {
          number: 13,
          title: 'Position 3: What They Are Hiding (The Unspoken Fear)',
          subtitle: 'Card artwork, psychic decoding, and underlying ego defenses',
          key: 'card-3',
          description: 'Card 3 deep dive.',
          tier: 'detailed',
        },
        {
          number: 14,
          title: 'Position 4: Their True Intentions (Planned Trajectory)',
          subtitle: 'Card artwork, psychic decoding, and forthcoming energetic shifts',
          key: 'card-4',
          description: 'Card 4 deep dive.',
          tier: 'detailed',
        },
        {
          number: 15,
          title: 'Position 5: The Breakthrough Catalyst (The Key to Truth)',
          subtitle: 'Card artwork, psychic decoding, and the action that dissolves the barrier',
          key: 'card-5',
          description: 'Card 5 deep dive.',
          tier: 'detailed',
        },
        {
          number: 16,
          title: 'Dual-Part Psychological Synthesis · Part 1: Cognitive Dissonance',
          subtitle: 'Their internal battle between conscious ego defense and suppressed longing',
          key: 'synthesis-p1',
          description: 'Synthesis Part 1.',
          tier: 'detailed',
        },
        {
          number: 17,
          title: 'Dual-Part Psychological Synthesis · Part 2: Behavioral Triggers',
          subtitle: 'Why specific words, demands, or silences cause them to retreat into a shell',
          key: 'synthesis-p2',
          description: 'Synthesis Part 2.',
          tier: 'detailed',
        },
        {
          number: 18,
          title: 'The Unspoken Confession Box',
          subtitle: 'Channeled direct monologue transcript of their private thoughts',
          key: 'confession-box',
          description: 'Unspoken confession transcript.',
          tier: 'detailed',
        },
        {
          number: 19,
          title: 'Inquiry 1: The Subconscious Wall & Vulnerability Fear',
          subtitle: 'Why are they terrified of being seen without their emotional armor?',
          key: 'deep-dive-1-part1',
          description: 'Inquiry 1 deep dive.',
          tier: 'detailed',
        },
        {
          number: 20,
          title: 'Inquiry 2: External Influences & Pride Barriers',
          subtitle: 'Are outside opinions, obligations, or pride dictating their silence?',
          key: 'deep-dive-2-part1',
          description: 'Inquiry 2 deep dive.',
          tier: 'detailed',
        },
        {
          number: 21,
          title: 'Inquiry 3: The Moment of Realization & Tipping Point',
          subtitle: 'What circumstance or realization will compel them to finally speak up?',
          key: 'deep-dive-3-part1',
          description: 'Inquiry 3 deep dive.',
          tier: 'detailed',
        },
        {
          number: 22,
          title: '30-Day Relational Dynamic & Communication Roadmap',
          subtitle: 'Weeks 1–4 behavioral shifts, silence cycles, and expected outreach windows',
          key: 'roadmap-p1',
          description: '30-day communication roadmap.',
          tier: 'detailed',
        },
        {
          number: 23,
          title: '4-Phase Interaction Protocol',
          subtitle: 'Observe → Detach → Realign → Mirror (Mastering your energetic response)',
          key: 'action-steps',
          description: '4-phase protocol.',
          tier: 'detailed',
        },
        {
          number: 24,
          title: 'Daily Sovereign Mantras & Soul Reflections',
          subtitle: '5 "I AM Emotionally Centered" affirmations & soul inquiry journaling',
          key: 'mantras',
          description: 'Daily affirmations & journal.',
          tier: 'detailed',
        },
        {
          number: 25,
          title: 'Spiritual Prescription · Part 1: Crystal Telepathic Grid',
          subtitle: 'Dedicated Lapis Lazuli, Moonstone, and Blue Lace Agate crystal placement',
          key: 'spiritual-prescription-p1',
          description: 'Prescription Part 1.',
          tier: 'detailed',
        },
        {
          number: 26,
          title: 'Spiritual Prescription · Part 2: Botanical Allies & Throat Breathwork',
          subtitle: 'Blue Chamomile, Lavender aura mist, and Vagus nerve calming practice',
          key: 'spiritual-prescription-p2',
          description: 'Prescription Part 2.',
          tier: 'detailed',
        },
        {
          number: 27,
          title: 'Sacred Closing Blessing & Ethical Psychic Boundaries',
          subtitle: 'Closing benediction and ethical sovereignty',
          key: 'closing-blessing',
          description: 'Closing blessings.',
          tier: 'detailed',
        },
      ],
    },
    premiumTier: {
      name: 'Premium Tier — Master Mind-Decoding & Telepathic Truth Blueprint',
      pageRange: '34–38 Pages',
      focus:
        'Master-level telepathic decoding, side-by-side behavioral mirror, Vedic Mercury remedies, sigil vector, and lunar timing.',
      sectionCount: 38,
      sections: [
        {
          number: 1,
          title: 'Cover Page',
          subtitle: 'Hidden Feelings & Secret Intentions Masterclass, Names, Date, Seal',
          key: 'cover',
          description: 'Premium master cover.',
          tier: 'premium',
        },
        {
          number: 2,
          title: 'Sacred Frontispiece & Cosmic Oracle Seal',
          subtitle: 'Invocation of discernment, clarity, and uncorrupted telepathic truth',
          key: 'frontispiece',
          description: 'Frontispiece invocation.',
          tier: 'premium',
        },
        {
          number: 3,
          title: 'Welcome Letter & Sacred Intention Setting',
          subtitle: 'Empathetic space holding for emotional clarity and non-attachment',
          key: 'welcome',
          description: 'Welcome letter.',
          tier: 'premium',
        },
        {
          number: 4,
          title: 'How to Read This Telepathic Mind-Decoding Report',
          subtitle: 'Integration guide: moving from anxiety and overthinking into grounded mastery',
          key: 'reading-guide',
          description: 'Reading guide.',
          tier: 'premium',
        },
        {
          number: 5,
          title: 'Table of Contents & Chapter Guide',
          subtitle: 'Sequential roadmap through your channeled telepathic transmission',
          key: 'toc',
          description: 'Table of Contents.',
          tier: 'premium',
        },
        {
          number: 6,
          title: 'Sacred Space Grounding & Telepathic Reset',
          subtitle: 'Ritual to clear obsessive mental loops and align with universal truth',
          key: 'grounding-ritual',
          description: 'Grounding ritual.',
          tier: 'premium',
        },
        {
          number: 7,
          title: 'Dual-Entity Querent & Person of Interest Intake',
          subtitle: 'Complete connection history, current status, and specific channeled dilemma',
          key: 'querent-intake',
          description: 'Intake blueprint.',
          tier: 'premium',
        },
        {
          number: 8,
          title: 'Numerology Foundation: Core Mental Frequencies',
          subtitle: 'Life Path calculation and cognitive synergy analysis',
          key: 'numerology-core',
          description: 'Core numerology.',
          tier: 'premium',
        },
        {
          number: 9,
          title: 'Personal Year Cycle & Communication Timing Matrix',
          subtitle: 'Epicycle timing indicating the peak windows of outreach and truth disclosure',
          key: 'personal-year',
          description: 'Timing matrix.',
          tier: 'premium',
        },
        {
          number: 10,
          title: 'Elemental Energy Balance: Air vs. Water Tension',
          subtitle: 'Mental overthinking (Air) vs. Suppressed emotional current (Water)',
          key: 'elemental-balance',
          description: 'Elemental balance.',
          tier: 'premium',
        },
        {
          number: 11,
          title: 'Astrological Resonance & Mental Filters',
          subtitle: 'Mercury, Venus, and Moon placements governing unspoken thoughts',
          key: 'astrology',
          description: 'Astrology report.',
          tier: 'premium',
        },
        {
          number: 12,
          title: '7-Center Chakra Alignment: Throat & Third Eye Diagnostic',
          subtitle: 'Scanning Vishuddha (Authentic Speech) and Ajna (Telepathic Intuition) for both',
          key: 'chakra-matrix',
          description: 'Chakra diagnostic.',
          tier: 'premium',
        },
        {
          number: 13,
          title: 'Vedic Upayas for Truth & Telepathic Clarity',
          subtitle: 'Ancient Jyotish remedies: Budha (Mercury) Yantra & Lapis Lazuli ritual',
          key: 'vedic-upayas',
          description: 'Vedic remedies.',
          tier: 'premium',
        },
        {
          number: 14,
          title: '5-Card Mind-Decoding Altar Spread Overview',
          subtitle: '5-Point Oracle Architecture: Mask, Emotion, Secret, Intentions, Catalyst',
          key: 'altar-spread',
          description: '5-card spread layout.',
          tier: 'premium',
        },
        {
          number: 15,
          title: 'Position 1: The Surface Mask (Conscious Projection)',
          subtitle: 'Card artwork, psychic decoding, and conscious outer behavior',
          key: 'card-1',
          description: 'Card 1 deep dive.',
          tier: 'premium',
        },
        {
          number: 16,
          title: 'Position 2: The Secret Emotion (Subconscious Truth)',
          subtitle: 'Card artwork, psychic decoding, and suppressed heart-level feelings',
          key: 'card-2',
          description: 'Card 2 deep dive.',
          tier: 'premium',
        },
        {
          number: 17,
          title: 'Position 3: What They Are Hiding (The Unspoken Fear)',
          subtitle: 'Card artwork, psychic decoding, and underlying ego defenses',
          key: 'card-3',
          description: 'Card 3 deep dive.',
          tier: 'premium',
        },
        {
          number: 18,
          title: 'Position 4: Their True Intentions (Planned Trajectory)',
          subtitle: 'Card artwork, psychic decoding, and forthcoming energetic shifts',
          key: 'card-4',
          description: 'Card 4 deep dive.',
          tier: 'premium',
        },
        {
          number: 19,
          title: 'Position 5: The Breakthrough Catalyst (The Key to Truth)',
          subtitle: 'Card artwork, psychic decoding, and the action that dissolves the barrier',
          key: 'card-5',
          description: 'Card 5 deep dive.',
          tier: 'premium',
        },
        {
          number: 20,
          title: 'The Surface Mask vs. Subconscious Whisper',
          subtitle: 'Deconstructing the cognitive dissonance between projected persona and authentic feelings',
          key: 'specialized-blueprint',
          description: 'Side-by-side psychological comparison.',
          tier: 'premium',
        },
        {
          number: 21,
          title: 'Psychological Defense Breakdown',
          subtitle: 'Why they withhold truth, roots of their fear, and the catalyst that dissolves their armor',
          key: 'extended-shadow-work',
          description: 'Defense breakdown analysis.',
          tier: 'premium',
        },
        {
          number: 22,
          title: 'Dual-Part Psychological Synthesis · Part 1: Cognitive Dissonance',
          subtitle: 'Their internal battle between conscious ego defense and suppressed longing',
          key: 'synthesis-p1',
          description: 'Synthesis Part 1.',
          tier: 'premium',
        },
        {
          number: 23,
          title: 'Dual-Part Psychological Synthesis · Part 2: Behavioral Triggers',
          subtitle: 'Why specific words, demands, or silences cause them to retreat into a shell',
          key: 'synthesis-p2',
          description: 'Synthesis Part 2.',
          tier: 'premium',
        },
        {
          number: 24,
          title: 'The Unspoken Confession Box',
          subtitle: 'Channeled direct monologue transcript of their private thoughts',
          key: 'confession-box',
          description: 'Unspoken confession transcript.',
          tier: 'premium',
        },
        {
          number: 25,
          title: 'Inquiry 1: The Subconscious Wall & Vulnerability Fear',
          subtitle: 'Why are they terrified of being seen without their emotional armor?',
          key: 'deep-dive-1-part1',
          description: 'Inquiry 1 deep dive.',
          tier: 'premium',
        },
        {
          number: 26,
          title: 'Inquiry 2: External Influences & Pride Barriers',
          subtitle: 'Are outside opinions, obligations, or pride dictating their silence?',
          key: 'deep-dive-2-part1',
          description: 'Inquiry 2 deep dive.',
          tier: 'premium',
        },
        {
          number: 27,
          title: 'Inquiry 3: The Moment of Realization & Tipping Point',
          subtitle: 'What circumstance or realization will compel them to finally speak up?',
          key: 'deep-dive-3-part1',
          description: 'Inquiry 3 deep dive.',
          tier: 'premium',
        },
        {
          number: 28,
          title: 'Telepathic Clarity Sigil & Vector',
          subtitle: 'A customized energetic glyph to cut through mental distortion and anchor truth',
          key: 'relational-sigil',
          description: 'Telepathic sigil.',
          tier: 'premium',
        },
        {
          number: 29,
          title: 'Lunar Timing for Honest Communication',
          subtitle: 'Astro-lunar windows predicting when emotional defense walls soften and truth emerges',
          key: 'lunar-romance',
          description: 'Lunar communication timing.',
          tier: 'premium',
        },
        {
          number: 30,
          title: '30-Day Relational Dynamic Roadmap · Days 1–14',
          subtitle: 'First two weeks: Deconstructing silence, noticing subtle shifts, and holding center',
          key: 'roadmap-p1',
          description: 'Roadmap Part 1.',
          tier: 'premium',
        },
        {
          number: 31,
          title: '30-Day Relational Dynamic Roadmap · Days 15–30',
          subtitle: 'Weeks 3 & 4: The breakthrough window, direct communication, and truth integration',
          key: 'roadmap-p2',
          description: 'Roadmap Part 2.',
          tier: 'premium',
        },
        {
          number: 32,
          title: '4-Phase Interaction Protocol',
          subtitle: 'Observe → Detach → Realign → Mirror (Mastering your energetic response)',
          key: 'action-steps',
          description: '4-phase protocol.',
          tier: 'premium',
        },
        {
          number: 33,
          title: 'Daily Sovereign Mantras & Soul Reflections',
          subtitle: '5 "I AM Centered" affirmations & 3 introspective soul inquiry prompts',
          key: 'mantras',
          description: 'Daily affirmations & journal.',
          tier: 'premium',
        },
        {
          number: 34,
          title: 'Spiritual Prescription · Part 1: Crystal Telepathic Grid',
          subtitle: 'Dedicated Lapis Lazuli, Moonstone, and Blue Lace Agate altar arrangement',
          key: 'spiritual-prescription-p1',
          description: 'Prescription Part 1.',
          tier: 'premium',
        },
        {
          number: 35,
          title: 'Spiritual Prescription · Part 2: Botanical Allies & Throat Breathwork',
          subtitle: 'Blue Chamomile, Lavender aura mist, and Vagus nerve calming practice',
          key: 'spiritual-prescription-p2',
          description: 'Prescription Part 2.',
          tier: 'premium',
        },
        {
          number: 36,
          title: 'Esoteric Glossary & Integration Key',
          subtitle: 'Key telepathic, astrological, and psychological terms defined',
          key: 'glossary',
          description: 'Esoteric lexicon.',
          tier: 'premium',
        },
        {
          number: 37,
          title: 'Sacred Closing Blessing & Ethical Psychic Boundaries',
          subtitle: 'Final benediction, psychic protection, and sovereign freedom',
          key: 'closing-blessing',
          description: 'Closing blessings.',
          tier: 'premium',
        },
      ],
    },
    inquiries: [
      {
        number: 1,
        title: 'The Subconscious Armor & Why They Retreat from Vulnerability',
        question: 'What core emotional fear triggers their sudden silence or aloof posture?',
        diagnosisFocus: 'Attachment defense mechanisms, pride, and the fear of losing emotional control',
        shadowRoot: 'Fear of unworthiness and being engulfed or judged if fully seen',
        somaticPractice: 'Throat chakra gentle hum resonance and breath-holding release',
        tag: 'Inquiry 1',
        anchor: 'Inquiry Deep Dive 1',
      },
      {
        number: 2,
        title: 'External Pressures, Third-Party Voices & Pride Obstacles',
        question: 'What outside obligations, social opinions, or inner narratives hold them back?',
        diagnosisFocus: 'Familial expectations, career distractions, and ego-driven hesitation',
        shadowRoot: 'Belief that vulnerability is a weakness or liability in their external world',
        somaticPractice: 'Solar plexus grounding and uncoupling psychic cords',
        tag: 'Inquiry 2',
        anchor: 'Inquiry Deep Dive 2',
      },
      {
        number: 3,
        title: 'The Realization Tipping Point & Breakthrough Outreach Window',
        question: 'What catalyst or realization will cause them to drop their mask and speak honestly?',
        diagnosisFocus: 'The psychological shift from avoidance to active communication',
        shadowRoot: 'Recognition that silence creates greater pain than honest vulnerability',
        somaticPractice: 'Heart-to-throat bridge visualization and magnetic presence',
        tag: 'Inquiry 3',
        anchor: 'Inquiry Deep Dive 3',
      },
    ],
    spiritualPrescription: {
      crystals: [
        {
          name: 'Lapis Lazuli (Throat & Third Eye)',
          description: 'A regal stone of total honesty, dissolving mental fog and telepathic confusion.',
          placement: 'Throat chakra during meditation or worn as a pendant',
          vibration: 'Unfiltered Truth, Spiritual Wisdom & Telepathic Clarity',
        },
        {
          name: 'Blue Lace Agate (Soothing Calamity)',
          description: 'Softens hyper-vigilance, soothing nervous tension and fear of difficult conversations.',
          placement: 'Near the bedside or held in left palm while journaling',
          vibration: 'Peaceful Expression, Soft Boundaries & Emotional Safety',
        },
      ],
      botanicals: [
        {
          name: 'Blue Chamomile & Wild Mint',
          description: 'Calms emotional heat, relaxes tightened vocal cords, and promotes unburdened sleep.',
          usage: 'Nightly warm herbal tea or essential oil aromatic steam',
          essence: 'Nervous System Reset, Cool Clarity & Release of Rumination',
        },
      ],
      mindfulness: {
        name: 'Vagus Nerve Reset & Diaphragmatic Truth Breathing',
        description: 'Regulates your autonomic nervous system so you do not project anxious urgency into the telepathic connection.',
        ritual: [
          '1. Posture: Sit upright with eyes closed and hands resting palms up on your thighs.',
          '2. Inhale (4 seconds): Draw breath deep into your lower belly, expanding in all directions.',
          '3. Hold (4 seconds): Experience the stillness of your sovereign emotional center.',
          '4. Exhale (6 seconds): Let out a soft audible sigh, releasing the need to control another person’s timing.',
        ],
      },
    },
    vedicRemedies: {
      rudraksha: 'Budha (Mercury) 4-Mukhi Rudraksha Bead of Articulate Speech',
      yantra: 'Budha (Mercury) Sacred Yantra in Green or Copper Foil',
      mantra: 'Om Bum Budhaya Namaha (108 repetitions on Wednesdays at sunrise)',
      guidelines:
        'Chant on Wednesday mornings facing North to dissolve communication blocks, clear energetic misunderstandings, and invite honest dialogue.',
    },
    extendedShadowWork: {
      title: 'The Surface Mask vs. Subconscious Armor',
      trapName: 'The Avoidant Withdrawal Paradox',
      analysis:
        'When avoidant defense mechanisms activate, physical or digital silence is used as an illusion of control. Your greatest power lies in withdrawing anxious pressure and anchoring in grounded self-worth.',
      releaseProtocol:
        'Cease repetitive checking of communication channels. Re-orient 100% of your emotional focus onto your own creative vitality.',
    },
    lunarGuidelines: {
      title: 'Auspicious Lunar Windows for Truth & Communication',
      phases: [
        {
          phase: 'New Moon (Internal Awakening)',
          focus: 'Subconscious Realization & Inner Shifts',
          recommendation:
            'Quiet moments of reflection. Do not force physical contact; allow your memory to sprout in their private thoughts.',
        },
        {
          phase: 'Waxing Moon (Building Urge)',
          focus: 'Growing Impatience & Rising Desire to Reach Out',
          recommendation:
            'Emotional resistance weakens. Optimal window for casual check-ins, digital interactions, or spontaneous texts.',
        },
        {
          phase: 'Full Moon (Illumination of Truth)',
          focus: 'Emotional Breakthroughs & Unfiltered Disclosures',
          recommendation:
            'Apex of emotional exposure. Suppressed feelings reach a peak, often sparking direct messages or honest confessions.',
        },
        {
          phase: 'Waning Moon (Integration & Resolution)',
          focus: 'Clarity, Boundary Setting & Solidifying Truth',
          recommendation:
            'A grounding period to evaluate what was revealed. If they spoke honestly, anchor mutual boundaries; if not, step into peace.',
        },
      ],
    },
  },
};

/**
 * Helper to get Category TOC Definition by Topic ID or Title
 */
export function getCategoryTOCDef(topicIdOrTitle: number | string): CategoryTOCDefinition | null {
  if (typeof topicIdOrTitle === 'number') {
    return CATEGORY_TOC_REGISTRY[topicIdOrTitle] || null;
  }
  const search = topicIdOrTitle.toLowerCase().trim();
  for (const def of Object.values(CATEGORY_TOC_REGISTRY)) {
    if (
      def.title.toLowerCase() === search ||
      def.categoryKey.toLowerCase() === search ||
      search.includes(def.title.toLowerCase()) ||
      def.headline.toLowerCase().includes(search)
    ) {
      return def;
    }
  }
  return null;
}
