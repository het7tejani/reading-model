import { ReadingTier, SectionDefinition } from '../types';

export type ProductBlockNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30;

export interface InjectedSectionItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge?: string;
}

export interface EliminatedSectionItem {
  name: string;
  category: string;
  reason: string;
}

export interface ProductBlockMeta {
  id: ProductBlockNumber;
  code: string;
  title: string;
  name: string;
  targetFocus: string;
  icon: string;
  spreadName: string;
  spreadCardCount: number;
  injectedSections: InjectedSectionItem[];
  eliminatedSections: EliminatedSectionItem[];
}

export const PRODUCT_BLOCKS: Record<ProductBlockNumber, ProductBlockMeta> = {
  // PRODUCT BLOCK 1
  1: {
    id: 1,
    code: 'PRODUCT BLOCK 1',
    title: "What's Coming For You? (12 Psychic Future Predictions)",
    name: "What's Coming For You? (12 Psychic Future Predictions)",
    targetFocus: 'Major upcoming timeline shifts across love, career, and general life.',
    icon: 'CalendarDays',
    spreadName: '12-Card Annual Timeline Grid Spread',
    spreadCardCount: 12,
    injectedSections: [
      {
        id: 'pb1-1',
        name: 'Cover Page & Timeline Portal Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke client cover featuring the 12-month temporal portal seal, querent name, and reading title.',
      },
      {
        id: 'pb1-2',
        name: 'The 12-Month Horizon Blueprint & Energetic Overview',
        category: 'Temporal Blueprint',
        description: 'Comprehensive annual trajectory map detailing astrological shifts and master vibration cycles.',
      },
      {
        id: 'pb1-3',
        name: '12 Sequential Monthly Forecast Cards (Months 1–12 Breakdown)',
        category: 'Chronological Forecast',
        description: 'Dedicated month-by-month card breakdowns with pinpoint energetic milestones, warnings, and opportunities.',
      },
      {
        id: 'pb1-4',
        name: 'Quarterly Seasonal Pivot Analysis (Q1 to Q4 Themes)',
        category: 'Seasonal Trajectory',
        description: 'Macro-level analysis of Spring initiation, Summer expansion, Autumn harvest, and Winter crystallization.',
      },
      {
        id: 'pb1-5',
        name: 'Annual Major Arcana Master Cycle Map',
        category: 'Karmic Arcana',
        description: 'High-level synthesis linking the major lessons and destiny markers across the entire 12-month cycle.',
      },
      {
        id: 'pb1-6',
        name: 'Strategic Timeline Action Steps & Catalyst Windows',
        category: 'Action Protocols',
        description: 'Exact timing windows for high-impact decisions, contracts, love initiation, and wealth moves.',
      },
      {
        id: 'pb1-7',
        name: 'Final Blessings & Closing Epilogue',
        category: 'Benediction',
        description: 'Protective closing prayer, energetic anchoring seal, and sacred reader signature.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Ex-Lover Separation & Reconciliation Blueprint',
        category: 'Relationship',
        reason: 'Eliminated because reading focus is broad 12-month general timeline, not ex-reconciliation.',
      },
      {
        name: 'Dual-Entity Mind Decoding & Confession Box',
        category: 'Mind Reading',
        reason: 'Omitted as this reading maps objective temporal milestones rather than single-person psychology.',
      },
      {
        name: 'Pet Telepathy & Animal Chakra Diagnostic',
        category: 'Specialized',
        reason: 'Irrelevant to human 12-month future prediction timeline.',
      },
      {
        name: 'Court & Legal Adversary Defense Matrix',
        category: 'Legal/Justice',
        reason: 'Omitted unless querent specifically initiates a legal conflict query.',
      },
    ],
  },

  // PRODUCT BLOCK 2
  2: {
    id: 2,
    code: 'PRODUCT BLOCK 2',
    title: 'What Is Their Karma For Hurting You? (Karmic Justice Reading)',
    name: 'What Is Their Karma For Hurting You? (Karmic Justice Reading)',
    targetFocus: 'Uncovering the exact karmic backlash, lessons, and cosmic balance regarding someone who wronged the querent.',
    icon: 'Scale',
    spreadName: '4-Card Karmic Justice Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb2-1',
        name: 'Cover Page & Karmic Balance Seal',
        category: 'Core Front-Matter',
        description: 'Ceremonial cover imbued with the golden Scales of Karmic Retribution and cosmic balance seal.',
      },
      {
        id: 'pb2-2',
        name: 'Karmic Intake & Relationship History Blueprint',
        category: 'Intake & History',
        description: 'Comprehensive mapping of the transgression, emotional injuries, and contractual imbalances.',
      },
      {
        id: 'pb2-3',
        name: 'The 4-Card Karmic Justice Spread',
        category: 'Sacred Spread',
        description: 'Deep dive into: Card 1 (Their Action), Card 2 (Universal Law Response), Card 3 (Current Karmic Debt), Card 4 (Ultimate Lesson).',
      },
      {
        id: 'pb2-4',
        name: 'The Cosmic Mirror: How Their Actions Return to Them',
        category: 'Universal Law',
        description: 'Channeled analysis of the boomerang effect, spiritual lessons, and how karma mirrors their choices.',
      },
      {
        id: 'pb2-5',
        name: 'Karmic Release & Cord-Detachment Ritual Protocol',
        category: 'Cord Cutting',
        description: 'Step-by-step ritual to sever psychic tethers and withdraw your energy so their karma executes fully.',
      },
      {
        id: 'pb2-6',
        name: 'Protection Mantras & Soul Sovereignty Affirmations',
        category: 'Mantras & Sovereignty',
        description: '5 potent decree mantras to reclaim your energetic frequency and seal your aura against psychic residue.',
      },
      {
        id: 'pb2-7',
        name: 'Spiritual Prescription (Black Tourmaline, Protective Botanicals)',
        category: 'Remedies',
        description: 'Grounding crystal layout, rosemary salt baths, and psychic shielding botanical allies.',
      },
    ],
    eliminatedSections: [
      {
        name: '12-Month Chronological Forecast Grid',
        category: 'Timeline',
        reason: 'Eliminated as focus is specifically karmic balance and restitution, not 12-month calendar.',
      },
      {
        name: 'Vocational Wealth & Career Crossroads Matrix',
        category: 'Career',
        reason: 'Omitted since karmic justice concerns relational or personal betrayal.',
      },
      {
        name: 'Dream Symbolism & Oneiric Translation Dictionary',
        category: 'Dreamwork',
        reason: 'Irrelevant to cosmic karma weigh-in.',
      },
    ],
  },

  // PRODUCT BLOCK 3
  3: {
    id: 3,
    code: 'PRODUCT BLOCK 3',
    title: 'Energy Cord Cutting & Entity Clearing Ritual',
    name: 'Energy Cord Cutting & Entity Clearing Ritual',
    targetFocus: 'Releasing toxic energetic tethers, past lovers, or draining emotional ties.',
    icon: 'Scissors',
    spreadName: '3-Card Attachment & Leaking Energy Spread',
    spreadCardCount: 3,
    injectedSections: [
      {
        id: 'pb3-1',
        name: 'Cover Page & Sanctuary Seal',
        category: 'Core Front-Matter',
        description: 'Purification sanctuary cover featuring the Archangel Michael Sword & Etheric Severance Seal.',
      },
      {
        id: 'pb3-2',
        name: 'Energetic Cord Intake & Vulnerability Mapping',
        category: 'Aura Diagnostic',
        description: 'Diagnostic assessment of solar plexus and sacral tethers draining querent vitality.',
      },
      {
        id: 'pb3-3',
        name: 'The 3-Card Attachment & Leaking Energy Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Root of the Cord · Card 2: What It Drains From You · Card 3: The Freedom Catalyst.',
      },
      {
        id: 'pb3-4',
        name: 'The Cord-Cutting Ritual Guide (Step-by-Step Cleansing Protocol)',
        category: 'Ritual Action',
        description: 'Precise ceremonial instructions using obsidian blades, salt circles, and breathwork severance.',
      },
      {
        id: 'pb3-5',
        name: 'Aura Shielding & Boundary Enforcement Matrix',
        category: 'Shielding',
        description: 'Framework to prevent psychic re-attachment and close energetic vulnerabilities permanently.',
      },
      {
        id: 'pb3-6',
        name: 'Daily Energetic Sovereignty Mantras',
        category: 'Mantras',
        description: 'Affirmations for reclaiming 100% of your emotional and psychic sovereignty.',
      },
      {
        id: 'pb3-7',
        name: 'Spiritual Prescription (Sage, Salt Cleansing, Selenite Grid Layout)',
        category: 'Spiritual Remedies',
        description: 'Prescription of Selenite wands, white sage smoke bathing, and dead sea salt auric soak.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Romantic Reconciliation & Reunion Window Analysis',
        category: 'Love',
        reason: 'Eliminated because cord cutting is designed to sever attachments, not facilitate reunion.',
      },
      {
        name: 'Business Enterprise & Kubera Yantra Prosperity Guide',
        category: 'Wealth',
        reason: 'Omitted to keep pure focus on auric clearing and psychic severance.',
      },
    ],
  },

  // PRODUCT BLOCK 4
  4: {
    id: 4,
    code: 'PRODUCT BLOCK 4',
    title: 'Will My Ex Come Back? (Ex Lover Reconciliation Reading)',
    name: 'Will My Ex Come Back? (Ex Lover Reconciliation Reading)',
    targetFocus: 'Analyzing the likelihood, timing, and emotional conditions under which an ex might return.',
    icon: 'HeartHandshake',
    spreadName: '5-Card Reconciliation Altar Spread',
    spreadCardCount: 5,
    injectedSections: [
      {
        id: 'pb4-1',
        name: 'Cover Page & Reunion Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Sacred Knot of Reunion and dual-heart golden seal.',
      },
      {
        id: 'pb4-2',
        name: 'Ex-Lover Intake & Separation Blueprint',
        category: 'Relationship Intake',
        description: 'Full profile analysis of separation root causes, duration of silence, and emotional distance.',
      },
      {
        id: 'pb4-3',
        name: '5-Card Reconciliation Altar',
        category: 'Tarot Spread',
        description: 'Card 1: Their True Regret · Card 2: Obstacle to Return · Card 3: External Influences · Card 4: Reconnection Window · Card 5: Final Outcome.',
      },
      {
        id: 'pb4-4',
        name: 'Psychological & Emotional Reconciliation Matrix',
        category: 'Psychology',
        description: 'Deep dive into their ego defenses, nostalgia triggers, and internal debate over reaching out.',
      },
      {
        id: 'pb4-5',
        name: 'The Communication Opening: What Will Make Them Reach Out',
        category: 'Timing & Outreach',
        description: 'Pinpointing the exact catalyst or realization that prompts their message or call.',
      },
      {
        id: 'pb4-6',
        name: '30-Day Re-alignment & Patience Roadmap',
        category: 'Roadmap',
        description: 'Weekly behavioral guidance to stay in magnetic high-vibration power without chasing.',
      },
      {
        id: 'pb4-7',
        name: 'Spiritual Prescription (Honey Jar Magic principles, Rose Quartz, Reconciliation Affirmations)',
        category: 'Remedies',
        description: 'Heart-chakra harmonization, honey-sweetening energetics, and magnetic attraction affirmations.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Demon & Dark Attachment Exorcism Protocol',
        category: 'Entity Clearing',
        reason: 'Eliminated as reading is focused on romantic psychology and reconciliation timing.',
      },
      {
        name: 'Vocational Career Matrix & Financial Ceilings',
        category: 'Career',
        reason: 'Omitted to maintain strict focus on ex-partner dynamics.',
      },
    ],
  },

  // PRODUCT BLOCK 5
  5: {
    id: 5,
    code: 'PRODUCT BLOCK 5',
    title: '5 Question Psychic Reading (Custom 5-Inquiry Matrix)',
    name: '5 Question Psychic Reading (Custom 5-Inquiry Matrix)',
    targetFocus: 'Fast, high-clarity answers to 5 specific questions provided by the user.',
    icon: 'HelpCircle',
    spreadName: '5-Question Dedicated Oracle Matrix',
    spreadCardCount: 5,
    injectedSections: [
      {
        id: 'pb5-1',
        name: 'Cover Page & Channeled Oracle Seal',
        category: 'Core Front-Matter',
        description: 'Custom inquiry cover with Sacred Pentagram Oracle Seal and querent question summary.',
      },
      {
        id: 'pb5-2',
        name: 'User Question Intake Inventory (Questions 1 through 5)',
        category: 'Question Inventory',
        description: 'Structured index capturing all 5 custom inquiries and the context behind each.',
      },
      {
        id: 'pb5-3',
        name: '5 Dedicated Single-Card Question Modules (Questions 1 to 5)',
        category: 'Channeled Answers',
        description: '5 standalone modules: Question X, Card Drawn, Channeled Direct Answer, and Action Step.',
      },
      {
        id: 'pb5-4',
        name: 'Cross-Question Synthesis & Overarching Theme',
        category: 'Synthesis',
        description: 'Comprehensive thematic thread connecting all 5 answers into a unified spiritual message.',
      },
      {
        id: 'pb5-5',
        name: 'Quick-Reference Summary Table of All 5 Answers',
        category: 'Executive Summary',
        description: 'At-a-glance cheat sheet summarizing the direct takeaway, timeframe, and oracle verdict for each question.',
      },
      {
        id: 'pb5-6',
        name: 'Closing Blessing & Guidance Disclaimer',
        category: 'Benediction',
        description: 'Final words of empowerment, free will guidance, and ethical reader signature.',
      },
    ],
    eliminatedSections: [
      {
        name: '12-Month Sequential Monthly Calendar Grid',
        category: 'Timeline',
        reason: 'Eliminated in favor of direct 5-inquiry modular answers.',
      },
      {
        name: 'Animal Chakra & Pet Telepathy Profile',
        category: 'Specialized',
        reason: 'Omitted unless one of the 5 questions specifically pertains to a pet.',
      },
    ],
  },

  // PRODUCT BLOCK 6
  6: {
    id: 6,
    code: 'PRODUCT BLOCK 6',
    title: 'Third Eye Opening Spell & Reading (Intuition & Psychic Activation)',
    name: 'Third Eye Opening Spell & Reading (Intuition & Psychic Activation)',
    targetFocus: 'Opening the third eye, enhancing inner knowing, and bypassing mental illusions.',
    icon: 'Eye',
    spreadName: '3-Card Third Eye Altar Spread',
    spreadCardCount: 3,
    injectedSections: [
      {
        id: 'pb6-1',
        name: 'Cover Page & Third Eye Portal Seal',
        category: 'Core Front-Matter',
        description: 'Ceremonial cover featuring the Ajna Lotus Glyph and indigo psychic visionary seal.',
      },
      {
        id: 'pb6-2',
        name: 'Spiritual Awakening & Intuitive Baseline Intake',
        category: 'Intuitive Baseline',
        description: 'Assessment of current clairsentience, clairvoyance, dream vividness, and psychic sensitivity.',
      },
      {
        id: 'pb6-3',
        name: '3-Card Third Eye Altar',
        category: 'Sacred Spread',
        description: 'Card 1: Current Block to Sight · Card 2: Active Illusion · Card 3: Visionary Awakening Catalyst.',
      },
      {
        id: 'pb6-4',
        name: 'The Pineal Gland & Third Eye Activation Matrix',
        category: 'Esoteric Anatomy',
        description: 'Esoteric and biological activation methods, decalcification tips, and frequency alignment.',
      },
      {
        id: 'pb6-5',
        name: 'Guided Meditation & Candle Staring Protocol for Sight',
        category: 'Mystical Practice',
        description: 'Trāṭaka flame-gazing technique and third-eye pulsing visualization.',
      },
      {
        id: 'pb6-6',
        name: 'Daily Third-Eye Opening Mantras & Journaling Prompts',
        category: 'Mantras & Journaling',
        description: 'Potent OM mantra chanting, Ajna frequency affirmations, and dream logging prompts.',
      },
      {
        id: 'pb6-7',
        name: 'Spiritual Prescription (Amethyst, Frankincense, Crown-to-Third Eye Flow)',
        category: 'Remedies',
        description: 'High-frequency crystal grid, frankincense anointing oil, and psychic teas.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Court Case Strategy & Legal Evidence Defense',
        category: 'Legal',
        reason: 'Eliminated as focus is spiritual intuition and pineal gland activation.',
      },
      {
        name: 'Attachment Style Synastry & Dating Traps',
        category: 'Romance',
        reason: 'Omitted to maintain sacred focus on intuitive empowerment.',
      },
    ],
  },

  // PRODUCT BLOCK 7
  7: {
    id: 7,
    code: 'PRODUCT BLOCK 7',
    title: 'Soul Purpose Reading (Life Path & Divine Mission)',
    name: 'Soul Purpose Reading (Life Path & Divine Mission)',
    targetFocus: 'Uncovering hidden talents, soul contracts, and career/life spiritual destiny.',
    icon: 'Compass',
    spreadName: '4-Card Soul Purpose Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb7-1',
        name: 'Cover Page & Ascension Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Soul Star Chakra seal and golden sacred geometry glyph.',
      },
      {
        id: 'pb7-2',
        name: 'Numerology Soul Urge & Life Path Matrix',
        category: 'Numerology',
        description: 'Comprehensive math breakdown of Life Path, Expression, and Soul Urge numbers.',
      },
      {
        id: 'pb7-3',
        name: '4-Card Soul Purpose Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Divine Gifts · Card 2: Current Earthly Mission · Card 3: Karmic Obstacle · Card 4: Ultimate Legacy.',
      },
      {
        id: 'pb7-4',
        name: 'Starseed & Soul Origin Energetic Blueprint',
        category: 'Cosmic Lineage',
        description: 'Channeled insights into cosmic soul origin (Pleiadean, Sirian, Arcturian, Earth Soul).',
      },
      {
        id: 'pb7-5',
        name: '90-Day Alignment Roadmap Toward True Calling',
        category: 'Roadmap',
        description: 'Actionable steps across 3 months to pivot work, unleash gifts, and monetize spiritual talents.',
      },
      {
        id: 'pb7-6',
        name: 'Higher-Self Integration Mantras',
        category: 'Mantras',
        description: 'Mantras to dissolve impostor syndrome and embody your divine soul authority.',
      },
      {
        id: 'pb7-7',
        name: 'Spiritual Prescription (Labradorite, Cedarwood, Crown Chakra Alignment)',
        category: 'Remedies',
        description: 'Labradorite stone of magic, cedarwood grounding oil, and Sahasrara activation.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Ex-Partner Longing & Reconciliation Window',
        category: 'Romance',
        reason: 'Eliminated as soul purpose focuses on personal sovereignty and divine mission.',
      },
      {
        name: 'Evil Eye Psychic Attack Diagnostic',
        category: 'Protection',
        reason: 'Omitted to focus on soul alignment rather than adversary defense.',
      },
    ],
  },

  // PRODUCT BLOCK 8
  8: {
    id: 8,
    code: 'PRODUCT BLOCK 8',
    title: 'Hidden Feelings Psychic Reading (What Is Hidden From You?)',
    name: 'Hidden Feelings Psychic Reading (What Is Hidden From You?)',
    targetFocus: 'Uncovering secrets, unexpressed emotions, and blind spots in a dynamic.',
    icon: 'BrainCircuit',
    spreadName: '4-Card Hidden Truth Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb8-1',
        name: 'Cover Page & Veil-Piercing Seal',
        category: 'Core Front-Matter',
        description: 'Mystical cover with the Pierced Veil of Isis and claircognizant insight sigil.',
      },
      {
        id: 'pb8-2',
        name: 'Situation Intake & Target Blueprint',
        category: 'Target Profile',
        description: 'Analysis of the person of interest, current dynamic, and points of confusion.',
      },
      {
        id: 'pb8-3',
        name: '4-Card Hidden Truth Spread',
        category: 'Sacred Spread',
        description: 'Card 1: What They Hide · Card 2: Why They Hide It · Card 3: Deception vs. Reality Check · Card 4: The Ultimate Revelation.',
      },
      {
        id: 'pb8-4',
        name: 'Behavioral Decoding & Subconscious Mask Analysis',
        category: 'Psychology',
        description: 'Comparison of their outward words/actions versus their secret internal reality.',
      },
      {
        id: 'pb8-5',
        name: 'The Unspoken Transcript: Channeled Truth Box',
        category: 'Telepathic Channel',
        description: 'First-person channeled stream of what they want to say but cannot utter aloud.',
      },
      {
        id: 'pb8-6',
        name: 'Actionable Boundary & Truth-Seeking Protocol',
        category: 'Action Steps',
        description: 'Strategic guidance on how to navigate the dynamic without getting caught in games or confusion.',
      },
      {
        id: 'pb8-7',
        name: 'Spiritual Prescription (Sodalite, Clear Quartz, Truth Manifestation Affirmations)',
        category: 'Remedies',
        description: 'Sodalite clarity crystal, throat chakra opening herbs, and truth-revealing mantras.',
      },
    ],
    eliminatedSections: [
      {
        name: '12-Month Annual Financial Milestone Map',
        category: 'Career/Wealth',
        reason: 'Eliminated as inquiry is strictly focused on telepathic and interpersonal hidden truths.',
      },
      {
        name: 'Animal Health & Pet Behavioral Assessment',
        category: 'Pet',
        reason: 'Omitted as irrelevant to human relationship hidden feelings.',
      },
    ],
  },

  // PRODUCT BLOCK 9
  9: {
    id: 9,
    code: 'PRODUCT BLOCK 9',
    title: 'Karma Revenge & Cosmic Justice Reading',
    name: 'Karma Revenge & Cosmic Justice Reading',
    targetFocus: 'Examining cosmic consequences for adversaries and reclaiming personal power.',
    icon: 'Flame',
    spreadName: '3-Card Cosmic Justice Spread',
    spreadCardCount: 3,
    injectedSections: [
      {
        id: 'pb9-1',
        name: 'Cover Page & Retribution Seal',
        category: 'Core Front-Matter',
        description: 'Ceremonial cover stamped with the Wheel of Nemesis and cosmic retribution seal.',
      },
      {
        id: 'pb9-2',
        name: 'Grievance Intake & Dynamic Mapping',
        category: 'Grievance Profile',
        description: 'Detailed recording of the unfair act, injustice, and emotional balance sheet.',
      },
      {
        id: 'pb9-3',
        name: '3-Card Cosmic Justice Spread',
        category: 'Sacred Spread',
        description: 'Card 1: The Transgression Weigh-In · Card 2: Divine Intervention Status · Card 3: The Karmic Lesson for Them.',
      },
      {
        id: 'pb9-4',
        name: 'Power Retrieval & Energy Reclamation Protocol',
        category: 'Power Retrieval',
        description: 'Ritual to call back all fragments of your power, dignity, and confidence stolen by the adversary.',
      },
      {
        id: 'pb9-5',
        name: 'Protection from Malicious Intent Matrix',
        category: 'Protection Shield',
        description: 'Shielding formulas to ensure their negative projection bounces back entirely upon them.',
      },
      {
        id: 'pb9-6',
        name: 'Karmic Closure Affirmations',
        category: 'Affirmations',
        description: '5 high-impact declarations releasing the need for personal revenge into universal law.',
      },
      {
        id: 'pb9-7',
        name: 'Spiritual Prescription (Black Obsidian, Protection Grids)',
        category: 'Remedies',
        description: 'Obsidian mirror shield, dragon’s blood resin incense, and warrior protection grid.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Soulmate Compatibility & Sacred Union Pyramid',
        category: 'Love',
        reason: 'Eliminated because this reading analyzes adversary karma, not romantic union.',
      },
      {
        name: 'Fertility & Conception Moon Phase Guidelines',
        category: 'Fertility',
        reason: 'Omitted as completely outside the domain of cosmic retribution.',
      },
    ],
  },

  // PRODUCT BLOCK 10
  10: {
    id: 10,
    code: 'PRODUCT BLOCK 10',
    title: 'Evil Eye Energy Reading (Jealousy & Negative Intentions)',
    name: 'Evil Eye Energy Reading (Jealousy & Negative Intentions)',
    targetFocus: 'Detecting envy, psychic attacks, or malicious energy directed at the user.',
    icon: 'Shield',
    spreadName: '4-Card Evil Eye Diagnostic Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb10-1',
        name: 'Cover Page & Shielding Seal',
        category: 'Core Front-Matter',
        description: 'Protective cover emblazoned with the Golden Hamsa and Nazar Evil Eye Ward.',
      },
      {
        id: 'pb10-2',
        name: 'Vulnerability Intake & Environmental Check',
        category: 'Aura Scan',
        description: 'Scanning your social circle, workspace, and digital presence for sources of malicious envy.',
      },
      {
        id: 'pb10-3',
        name: '4-Card Evil Eye Diagnostic Spread',
        category: 'Diagnostic Spread',
        description: 'Card 1: Source of Envy · Card 2: Area of Life Affected · Card 3: Impact Level · Card 4: Shielding Strategy.',
      },
      {
        id: 'pb10-4',
        name: 'The Mirror Test: Identifying Energy Vampires in Your Circle',
        category: 'Psychic Armor',
        description: 'Psychological and intuitive cues to identify undercover frenemies and toxic drainers.',
      },
      {
        id: 'pb10-5',
        name: 'Comprehensive Cleansing & Salt Bath Protocol',
        category: 'Purification',
        description: 'Ritual salt, rue, and rosemary bath ceremony to melt away envious projections instantly.',
      },
      {
        id: 'pb10-6',
        name: 'Daily Energy Shielding Mantras',
        category: 'Mantras',
        description: 'Daily invocations to build an impenetrable mirror around your aura.',
      },
      {
        id: 'pb10-7',
        name: 'Spiritual Prescription (Hamsa / Evil Eye Amulet, Sea Salt, Juniper Botanicals)',
        category: 'Remedies',
        description: 'Nazar glass talisman, red thread knotting ritual, and juniper aura mists.',
      },
    ],
    eliminatedSections: [
      {
        name: '12-Month Chronological Forecast Grid',
        category: 'Timeline',
        reason: 'Eliminated to concentrate exclusively on diagnostic aura protection.',
      },
      {
        name: 'Career Promotion & Kubera Wealth Upayas',
        category: 'Career',
        reason: 'Omitted in favor of psychic warding and evil eye removal.',
      },
    ],
  },

  // PRODUCT BLOCK 11
  11: {
    id: 11,
    code: 'PRODUCT BLOCK 11',
    title: 'Deep Love Tarot Reading (Comprehensive Bond Analysis)',
    name: 'Deep Love Tarot Reading (Comprehensive Bond Analysis)',
    targetFocus: 'Extensive, highly detailed look at romantic dynamics, compatibility, and future trajectory.',
    icon: 'HeartHandshake',
    spreadName: '5-Card Relational Pyramid Spread',
    spreadCardCount: 5,
    injectedSections: [
      {
        id: 'pb11-1',
        name: 'Cover Page & Sacred Union Seal',
        category: 'Core Front-Matter',
        description: 'Luxurious cover featuring the Venusian Sacred Rose and eternal twin flame seal.',
      },
      {
        id: 'pb11-2',
        name: 'Relational Synastry & Element Balance (Water/Fire/Earth)',
        category: 'Synastry Balance',
        description: 'Compatibility scan analyzing passion, emotional depth, communication, and stability.',
      },
      {
        id: 'pb11-3',
        name: '5-Card Relational Pyramid Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Core Bond · Card 2: Subconscious Fear · Card 3: External Pressure · Card 4: Missing Piece · Card 5: Evolution Path.',
      },
      {
        id: 'pb11-4',
        name: 'Attachment Style Synastry Wheel (Anxious vs. Avoidant Dynamics)',
        category: 'Psychology',
        description: 'Detailed analysis of trigger cycles, withdrawal habits, and pathways to secure union.',
      },
      {
        id: 'pb11-5',
        name: 'Heart & Sacral Chakra Alignment Matrix',
        category: 'Chakra Matrix',
        description: 'Energetic scan of Anahata (Heart) and Svadhisthana (Intimacy) channels between both souls.',
      },
      {
        id: 'pb11-6',
        name: 'Vedic Gauri-Shankar Upayas for Harmony',
        category: 'Vedic Remedies',
        description: 'Ancient Shukra (Venus) mantras, rose water offerings, and sacred union blessings.',
      },
      {
        id: 'pb11-7',
        name: '30-Day Relational Integration Roadmap',
        category: 'Roadmap',
        description: 'Week-by-week behavioral trajectory to foster genuine vulnerability and deep intimacy.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Vocational Business Strategy & Commercial Crossroads',
        category: 'Wealth',
        reason: 'Eliminated as focus is purely on romantic synastry and heart-chakra union.',
      },
      {
        name: 'Legal Courtroom Verdict & Adversary Mitigation',
        category: 'Legal',
        reason: 'Omitted as irrelevant to deep love analysis.',
      },
    ],
  },

  // PRODUCT BLOCK 12
  12: {
    id: 12,
    code: 'PRODUCT BLOCK 12',
    title: 'How They See You? (Perception & True Impression Reading)',
    name: 'How They See You? (Perception & True Impression Reading)',
    targetFocus: "Discovering how a specific person perceives the querent's appearance, energy, and value.",
    icon: 'Sparkles',
    spreadName: '4-Card Mirror Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb12-1',
        name: 'Cover Page & Reflection Seal',
        category: 'Core Front-Matter',
        description: 'Polished cover featuring the Silver Mirror of Perception and authentic radiance glyph.',
      },
      {
        id: 'pb12-2',
        name: 'Target & Relationship Context Intake',
        category: 'Context Intake',
        description: 'Context profiling who the observer is, frequency of interaction, and mutual history.',
      },
      {
        id: 'pb12-3',
        name: '4-Card Mirror Spread',
        category: 'Sacred Spread',
        description: 'Card 1: How They See Your Energy · Card 2: What Intimidates Them · Card 3: Your Idealized Image in Their Mind · Card 4: Reality vs. Projection Gap.',
      },
      {
        id: 'pb12-4',
        name: 'Subconscious Attraction & Magnetic Factor Analysis',
        category: 'Magnetic Profile',
        description: 'Deep dive into what draws them to you and which traits command their deepest respect.',
      },
      {
        id: 'pb12-5',
        name: 'Confidence & Self-Worth Amplification Protocol',
        category: 'Sovereignty',
        description: 'Techniques to step fully into your queen/king archetype and amplify your natural aura.',
      },
      {
        id: 'pb12-6',
        name: 'Daily Magnetic Presence Affirmations',
        category: 'Affirmations',
        description: '5 potent affirmations to anchor unshakeable self-esteem and effortless magnetism.',
      },
      {
        id: 'pb12-7',
        name: 'Spiritual Prescription (Pyrite, Cinnamon, Solar Plexus Activation)',
        category: 'Remedies',
        description: 'Pyrite stone of confidence, cinnamon prosperity & attraction oils, and Manipura activation.',
      },
    ],
    eliminatedSections: [
      {
        name: '12-Month Chronological Future Forecast',
        category: 'Timeline',
        reason: 'Eliminated in favor of deep psychological perception mapping.',
      },
      {
        name: 'Generational Ancestral Trauma Healing Protocol',
        category: 'Ancestral',
        reason: 'Omitted as focus is immediate romantic/social perception.',
      },
    ],
  },

  // PRODUCT BLOCK 13
  13: {
    id: 13,
    code: 'PRODUCT BLOCK 13',
    title: 'In-Depth Career & Job Tarot Reading',
    name: 'In-Depth Career & Job Tarot Reading',
    targetFocus: 'Professional pivots, job security, promotions, and wealth expansion.',
    icon: 'TrendingUp',
    spreadName: '4-Card Career & Wealth Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb13-1',
        name: 'Cover Page & Enterprise Seal',
        category: 'Core Front-Matter',
        description: 'Executive cover featuring the Golden Key of Enterprise and Wealth Manifestation Seal.',
      },
      {
        id: 'pb13-2',
        name: 'Professional Intake & Career State Blueprint',
        category: 'Career Intake',
        description: 'Mapping current role, workplace dynamics, commercial dilemmas, and income goals.',
      },
      {
        id: 'pb13-3',
        name: '4-Card Career Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Current Standing · Card 2: Hidden Obstacle · Card 3: Growth Vector · Card 4: 6-Month Outcome.',
      },
      {
        id: 'pb13-4',
        name: 'Vocational Destiny & Abundance Matrix',
        category: 'Abundance Strategy',
        description: 'Strategic analysis of market positioning, unique skill sovereignty, and income ceilings.',
      },
      {
        id: 'pb13-5',
        name: 'Solar Plexus & Root Chakra Grounding Diagnostic',
        category: 'Chakra Diagnostic',
        description: 'Balancing Manipura (Willpower/Drive) and Muladhara (Material Security & Cash Flow).',
      },
      {
        id: 'pb13-6',
        name: 'Kubera Yantra & Business Timing Guidelines',
        category: 'Vedic Wealth',
        description: 'Jyotish wealth timings, Lord Kubera abundance mantras, and auspicious contract dates.',
      },
      {
        id: 'pb13-7',
        name: '30-Day Professional Execution Roadmap',
        category: 'Execution Plan',
        description: 'Concrete steps to negotiate raises, launch ventures, or make decisive career transitions.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Twin Flame Heart-Wall Clearing Protocol',
        category: 'Romance',
        reason: 'Eliminated as reading is entirely dedicated to career, wealth, and commercial success.',
      },
      {
        name: 'Past Life Contract Cord-Cutting Ceremony',
        category: 'Past Life',
        reason: 'Omitted to prioritize concrete professional action steps.',
      },
    ],
  },

  // PRODUCT BLOCK 14
  14: {
    id: 14,
    code: 'PRODUCT BLOCK 14',
    title: '10 Question Psychic Reading (Extended Custom Inquiry)',
    name: '10 Question Psychic Reading (Extended Custom Inquiry)',
    targetFocus: 'Deep dive across 10 separate custom questions.',
    icon: 'Layers',
    spreadName: '10-Question Master Channeled Altar',
    spreadCardCount: 10,
    injectedSections: [
      {
        id: 'pb14-1',
        name: 'Cover Page & Master Oracle Seal',
        category: 'Core Front-Matter',
        description: 'Comprehensive master cover with the Decagram Star Seal and querent question directory.',
      },
      {
        id: 'pb14-2',
        name: '10-Question Comprehensive Inventory List',
        category: 'Question Index',
        description: 'Full catalog indexing all 10 life inquiries across love, career, family, and destiny.',
      },
      {
        id: 'pb14-3',
        name: '10 Dedicated Single-Card Question Modules',
        category: 'Channeled Answers',
        description: '10 exhaustive standalone pages: Question X, Tarot Card, In-Depth Oracle Answer & Action Steps.',
      },
      {
        id: 'pb14-4',
        name: 'Cross-Domain Master Synthesis Matrix',
        category: 'Master Synthesis',
        description: 'High-level synthesis correlating all 10 responses into an overarching spiritual life strategy.',
      },
      {
        id: 'pb14-5',
        name: 'Consolidated Summary Action Table',
        category: 'Summary Matrix',
        description: 'Quick-reference master cheat sheet summarizing key dates, answers, and guidance.',
      },
      {
        id: 'pb14-6',
        name: 'Final Empowering Blessing & Disclaimer',
        category: 'Benediction',
        description: 'Closing benediction, sacred energetic sealing prayer, and reader verification.',
      },
    ],
    eliminatedSections: [
      {
        name: '12-Month Chronological Forecast Grid',
        category: 'Timeline',
        reason: 'Replaced by the specialized 10-Question dedicated modules.',
      },
      {
        name: 'Ex-Lover Honey Jar Magic Ritual',
        category: 'Romance',
        reason: 'Omitted unless included in the querent’s 10 custom questions.',
      },
    ],
  },

  // PRODUCT BLOCK 15
  15: {
    id: 15,
    code: 'PRODUCT BLOCK 15',
    title: 'Energy Cleansing & Reset Session',
    name: 'Energy Cleansing & Reset Session',
    targetFocus: 'Deep energetic detox, aura repair, and heavy vibration removal.',
    icon: 'Sparkle',
    spreadName: '3-Card Energetic Baseline Spread',
    spreadCardCount: 3,
    injectedSections: [
      {
        id: 'pb15-1',
        name: 'Cover Page & Purification Seal',
        category: 'Core Front-Matter',
        description: 'Aura cleanse cover featuring the Water of Life Seal and crystalline purification lotus.',
      },
      {
        id: 'pb15-2',
        name: 'Aura State & Heavy Energy Intake Assessment',
        category: 'Aura Scan',
        description: 'Evaluating emotional fatigue, psychic debris, brain fog, and vibrational depletion.',
      },
      {
        id: 'pb15-3',
        name: '3-Card Energetic Baseline Spread',
        category: 'Diagnostic Spread',
        description: 'Card 1: Source of Heavy Residue · Card 2: Current Aura Integrity · Card 3: Cleansing Breakthrough.',
      },
      {
        id: 'pb15-4',
        name: 'The 7-Day Energy Detox Protocol',
        category: 'Detox Plan',
        description: 'Daily morning and evening practices to systematically flush stagnant prana from your field.',
      },
      {
        id: 'pb15-5',
        name: 'Space Clearing & Home Feng Shui Guidelines',
        category: 'Space Clearing',
        description: 'Smudging protocols, threshold salt lines, and sound clearing for your living environment.',
      },
      {
        id: 'pb15-6',
        name: 'Grounding & Earth-Anchoring Meditations',
        category: 'Grounding',
        description: 'Root chakra grounding techniques connecting your energy core to Gaia’s crystalline grid.',
      },
      {
        id: 'pb15-7',
        name: 'Spiritual Prescription (Clear Quartz, Sage, Salt Cleansing Formulas)',
        category: 'Remedies',
        description: 'Clear quartz amplification wand, white sage, lavender essential oil, and Himalayan bath salts.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Courtroom Legal Evidence Strategy',
        category: 'Legal',
        reason: 'Eliminated as focus is purely physical/psychic energetic reset.',
      },
      {
        name: 'Dating Attachment Styles & Synastry Traps',
        category: 'Romance',
        reason: 'Omitted to keep space focused on pure spiritual restoration.',
      },
    ],
  },

  // PRODUCT BLOCK 16
  16: {
    id: 16,
    code: 'PRODUCT BLOCK 16',
    title: 'Karmic Soul Contract Reading (Past Life Ties)',
    name: 'Karmic Soul Contract Reading (Past Life Ties)',
    targetFocus: 'Uncovering past-life contracts, recurring loops, and soul obligations.',
    icon: 'KeyRound',
    spreadName: '4-Card Past Life & Soul Contract Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb16-1',
        name: 'Cover Page & Akashic Seal',
        category: 'Core Front-Matter',
        description: 'Ancient cover featuring the Akashic Records Gate Seal and eternal spiral glyph.',
      },
      {
        id: 'pb16-2',
        name: 'Karmic Pattern & Repeated Loop Intake',
        category: 'Akashic Intake',
        description: 'Recording unexplained déjà vu, irrational fears, and repeating relational cycles.',
      },
      {
        id: 'pb16-3',
        name: '4-Card Past Life & Soul Contract Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Origin Lifetime · Card 2: Unresolved Debt · Card 3: Current Trigger · Card 4: Contract Dissolution Key.',
      },
      {
        id: 'pb16-4',
        name: 'Karmic Debt & Ancestral Clearing Protocol',
        category: 'Karmic Clearing',
        description: 'Methods to pay off or dissolve ancient soul vows of poverty, silence, or servitude.',
      },
      {
        id: 'pb16-5',
        name: 'Cord-Cutting Ritual for Past Life Entities/Vows',
        category: 'Contract Dissolution',
        description: 'Formal soul decree rescinding obsolete karmic contracts across all dimensions of time.',
      },
      {
        id: 'pb16-6',
        name: 'Soul Sovereignty Affirmations',
        category: 'Affirmations',
        description: '5 decrees declaring yourself free from historical debts and sovereign in the present now.',
      },
      {
        id: 'pb16-7',
        name: 'Spiritual Prescription (Moldavite / Apache Tear, Deep Earth Grounding)',
        category: 'Remedies',
        description: 'Apache tear obsidian for past-life grief release, moldavite for rapid cosmic evolution.',
      },
    ],
    eliminatedSections: [
      {
        name: '12-Month Chronological Forecast Grid',
        category: 'Timeline',
        reason: 'Eliminated in favor of multidimensional Akashic soul contract mapping.',
      },
      {
        name: 'Pet Telepathy & Animal Diet Balance',
        category: 'Pet',
        reason: 'Omitted as irrelevant to human past-life contracts.',
      },
    ],
  },

  // PRODUCT BLOCK 17
  17: {
    id: 17,
    code: 'PRODUCT BLOCK 17',
    title: 'Pet Psychic Reading (What Is Your Pet Telling You?)',
    name: 'Pet Psychic Reading (What Is Your Pet Telling You?)',
    targetFocus: 'Understanding animal communication, health needs, behavioral issues, and soul connection with a pet.',
    icon: 'PawPrint',
    spreadName: '4-Card Pet Telepathy Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb17-1',
        name: 'Cover Page & Animal Spirit Seal',
        category: 'Core Front-Matter',
        description: 'Heartwarming cover featuring the Animal Kinship Seal and golden paw glyph.',
      },
      {
        id: 'pb17-2',
        name: 'Pet Intake Profile (Species, Name, Age, Behavioral Concern)',
        category: 'Pet Intake',
        description: 'Comprehensive pet dossier capturing temperament, environment, and recent behavioral changes.',
      },
      {
        id: 'pb17-3',
        name: '4-Card Pet Telepathy Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Direct Message · Card 2: Hidden Discomfort · Card 3: What They Need · Card 4: Soul Contract Together.',
      },
      {
        id: 'pb17-4',
        name: 'Animal Chakra & Emotional Health Assessment',
        category: 'Animal Chakras',
        description: 'Evaluating your pet’s Brachial (Key) Chakra, Root Chakra, and emotional mirror connection to you.',
      },
      {
        id: 'pb17-5',
        name: 'Environmental & Routine Adjustment Guidelines',
        category: 'Care Plan',
        description: 'Practical shifts in resting spots, play routines, and stress reduction for animal wellness.',
      },
      {
        id: 'pb17-6',
        name: 'Animal Bonding & Trust-Building Ritual',
        category: 'Bonding Ritual',
        description: 'Telepathic heart-to-heart visualization technique to communicate reassurance to your pet.',
      },
      {
        id: 'pb17-7',
        name: 'Spiritual Prescription (Pet-Safe Herbal Calmants, Clear Quartz Animal Blessing)',
        category: 'Remedies',
        description: 'Pet-safe chamomile soothing mist, clear quartz infused room water, and gentle crystal petting.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Ex-Partner Love Reconciliation Matrix',
        category: 'Romance',
        reason: 'Eliminated because reading is strictly dedicated to animal communication.',
      },
      {
        name: 'Business Enterprise Wealth & Career Matrix',
        category: 'Career',
        reason: 'Omitted to focus on pet emotional and physical wellbeing.',
      },
    ],
  },

  // PRODUCT BLOCK 18
  18: {
    id: 18,
    code: 'PRODUCT BLOCK 18',
    title: 'Personalized Dream Message Reading',
    name: 'Personalized Dream Message Reading',
    targetFocus: 'Translating recurring dreams, nightmares, or prophetic sleeping visions.',
    icon: 'Moon',
    spreadName: '3-Card Oneiric Spread',
    spreadCardCount: 3,
    injectedSections: [
      {
        id: 'pb18-1',
        name: 'Cover Page & Oneiric Portal Seal',
        category: 'Core Front-Matter',
        description: 'Dreamscape cover featuring the Morpheus Dream Portal Seal and lunar crescent motif.',
      },
      {
        id: 'pb18-2',
        name: 'Dream Log Intake (Recurring Symbols, Emotions Felt, Recent Dream Details)',
        category: 'Dream Log',
        description: 'Documenting the dream narrative, waking sensations, colors, characters, and recurring motifs.',
      },
      {
        id: 'pb18-3',
        name: '3-Card Oneiric Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Subconscious Root Symbol · Card 2: Hidden Message from Spirit · Card 3: Real-World Action Required.',
      },
      {
        id: 'pb18-4',
        name: 'Archetype & Dream Symbolism Translation Dictionary',
        category: 'Symbolism',
        description: 'Jungian and esoteric decoding of specific dream elements (water, teeth, flying, chasing, houses).',
      },
      {
        id: 'pb18-5',
        name: 'Sleep Hygiene & Lucid Dreaming Protection Protocol',
        category: 'Oneiric Practice',
        description: 'Astral shielding prior to sleep to prevent psychic nightmares and encourage prophetic dreams.',
      },
      {
        id: 'pb18-6',
        name: 'Bedtime Affirmations for Prophetic Clarity',
        category: 'Bedtime Mantras',
        description: '5 affirmations to command clear, lucid spiritual guidance while sleeping.',
      },
      {
        id: 'pb18-7',
        name: 'Spiritual Prescription (Amethyst under pillow, Lavender oil, Dream Journaling Setup)',
        category: 'Remedies',
        description: 'Pillow crystal layout, lavender sleep sachet, and mugwort tea for vivid spiritual recall.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Courtroom Dispute & Legal Victory Matrix',
        category: 'Legal',
        reason: 'Eliminated as focus is subconscious dream interpretation.',
      },
      {
        name: 'Vocational Business Crossroad Guidelines',
        category: 'Career',
        reason: 'Omitted in favor of oneiric analysis.',
      },
    ],
  },

  // PRODUCT BLOCK 19
  19: {
    id: 19,
    code: 'PRODUCT BLOCK 19',
    title: 'Demon Removal & Dark Attachment Clearing',
    name: 'Demon Removal & Dark Attachment Clearing',
    targetFocus: 'Severe spiritual oppression, heavy dark energy purging, and deep psychic protection.',
    icon: 'ShieldAlert',
    spreadName: '4-Card Dark Force Diagnostic Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb19-1',
        name: 'Cover Page & Exorcism / Shield Seal',
        category: 'Core Front-Matter',
        description: 'High-potency sacred cover with Archangel Michael’s Flaming Sword of Exorcism seal.',
      },
      {
        id: 'pb19-2',
        name: 'Heavy Oppression Intake Inventory',
        category: 'Oppression Scan',
        description: 'Assessment of unexplained chills, sleep paralysis, chronic fatigue, intrusive thoughts, and dark shadows.',
      },
      {
        id: 'pb19-3',
        name: '4-Card Dark Force Diagnostic',
        category: 'Diagnostic Spread',
        description: 'Card 1: Nature of Attachment · Card 2: Entry Point / Vulnerability · Card 3: Immediate Threat Level · Card 4: Purge Pathway.',
      },
      {
        id: 'pb19-4',
        name: 'The Reclamation Protocol: Reclaiming Your Sovereignty',
        category: 'Sovereignty Reclaim',
        description: 'Spiritual authority activation: commanding entities to depart using universal spiritual law.',
      },
      {
        id: 'pb19-5',
        name: 'Heavy Entity Banishment & Home Protection Ritual',
        category: 'Banishment Ritual',
        description: 'Uncrossing ceremony using sulfur-free banishing herbs, salt boundary lines, and holy smoke.',
      },
      {
        id: 'pb19-6',
        name: 'Archangel Michael Shielding Invocation',
        category: 'Invocations',
        description: 'Ancient, authoritative prayer calling upon the Blue Flame Legion for impenetrable protection.',
      },
      {
        id: 'pb19-7',
        name: 'Spiritual Prescription (Hyssop, Rue, Strong Protection Grids)',
        category: 'Remedies',
        description: 'Hyssop auric wash, fresh rue herb sachets, black obsidian perimeter grids, and consecrated oils.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Dating Synastry & Romantic Soulmate Pyramid',
        category: 'Love',
        reason: 'Eliminated as reading deals strictly with entity banishment and emergency psychic defense.',
      },
      {
        name: '12-Month Future Timeline Forecast',
        category: 'Timeline',
        reason: 'Omitted in favor of immediate dark entity removal protocols.',
      },
    ],
  },

  // PRODUCT BLOCK 20
  20: {
    id: 20,
    code: 'PRODUCT BLOCK 20',
    title: 'Justice Protection Reading (Legal & Adversary Defense)',
    name: 'Justice Protection Reading (Legal & Adversary Defense)',
    targetFocus: 'Court cases, legal disputes, fair outcomes, and protection against malicious opponents.',
    icon: 'Gavel',
    spreadName: '4-Card Justice Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb20-1',
        name: 'Cover Page & Scales of Justice Seal',
        category: 'Core Front-Matter',
        description: 'Dignified cover featuring the Golden Scales of Themis and Unwavering Truth Seal.',
      },
      {
        id: 'pb20-2',
        name: 'Legal / Conflict Situation Intake Blueprint',
        category: 'Legal Blueprint',
        description: 'Documentation of court deadlines, nature of dispute, adversary behavior, and desired verdict.',
      },
      {
        id: 'pb20-3',
        name: '4-Card Justice Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Current Legal Stance · Card 2: Hidden Obstacle or Untruth · Card 3: Neutralizer Factor · Card 4: Final Verdict/Outcome Energy.',
      },
      {
        id: 'pb20-4',
        name: 'Truth & Integrity Shielding Protocol',
        category: 'Integrity Shield',
        description: 'Methods to ensure lies are exposed in arbitration and the querent’s integrity shines undeniable.',
      },
      {
        id: 'pb20-5',
        name: 'Strategic Patience & Documentation Guidelines',
        category: 'Tactical Strategy',
        description: 'Spiritual and practical counsel on staying calm, gathering written evidence, and avoiding traps.',
      },
      {
        id: 'pb20-6',
        name: 'Victory & Justice Affirmations',
        category: 'Affirmations',
        description: '5 high-conviction decrees affirming divine justice, truth prevailing, and absolute protection.',
      },
      {
        id: 'pb20-7',
        name: 'Spiritual Prescription (Tiger’s Eye for courage, Blue Lace Agate for clear communication)',
        category: 'Remedies',
        description: 'Tiger’s Eye courtroom talisman, blue lace agate for calm testimony, and bay leaf victory pouches.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Pet Telepathy & Animal Behavioral Concerns',
        category: 'Pet',
        reason: 'Eliminated as focus is on legal courtroom defense and adversary litigation.',
      },
      {
        name: 'Fertility & Womb Wellness Timing',
        category: 'Fertility',
        reason: 'Omitted as irrelevant to legal conflict outcomes.',
      },
    ],
  },

  // PRODUCT BLOCK 21
  21: {
    id: 21,
    code: 'PRODUCT BLOCK 21',
    title: 'Future Children & Fertility Tarot Reading',
    name: 'Future Children & Fertility Tarot Reading',
    targetFocus: 'Conception timing, fertility blocks, soul children energy, and parenting guidance.',
    icon: 'Baby',
    spreadName: '4-Card Fertility & Child Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb21-1',
        name: 'Cover Page & Fertility Cradle Seal',
        category: 'Core Front-Matter',
        description: 'Tender cover featuring the Sacred Womb Cradle Seal and golden tree of life.',
      },
      {
        id: 'pb21-2',
        name: 'Family Planning & Health Intake Blueprint',
        category: 'Family Intake',
        description: 'Capturing querent fertility journey, conception timeline, and energetic space in the home.',
      },
      {
        id: 'pb21-3',
        name: '4-Card Fertility & Child Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Current Reproductive Energy · Card 2: Energetic Block or Delay · Card 3: Soul Energy of Incoming Child · Card 4: Manifestation & Timing Window.',
      },
      {
        id: 'pb21-4',
        name: 'Womb Healing & Emotional Preparation Protocol',
        category: 'Womb Healing',
        description: 'Clearing somatic anxiety from the pelvic bowl and inviting receptive, warm prana into the womb space.',
      },
      {
        id: 'pb21-5',
        name: 'Auspicious Fertility Timing & Moon Phase Guidelines',
        category: 'Astrological Timing',
        description: 'Full Moon and Waxing lunar transit windows favorable for energetic alignment and conception.',
      },
      {
        id: 'pb21-6',
        name: 'Maternal / Paternal Grounding Mantras',
        category: 'Parenting Mantras',
        description: '5 affirmations anchoring safety, fertile vitality, and welcoming incoming soul children.',
      },
      {
        id: 'pb21-7',
        name: 'Spiritual Prescription (Moonstone, Red Jasper, Womb Wellness Botanicals)',
        category: 'Remedies',
        description: 'Rainbow moonstone fertility talisman, red jasper vitality crystal, raspberry leaf tea, and rose quartz womb grid.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Cosmic Retribution & Enemy Revenge Protocol',
        category: 'Karmic Retribution',
        reason: 'Eliminated as fertility readings require pure nurturing and welcoming frequencies.',
      },
      {
        name: 'Commercial Enterprise & Job Promotion Strategy',
        category: 'Career',
        reason: 'Omitted to focus on family planning and conception energy.',
      },
    ],
  },

  // PRODUCT BLOCK 22
  22: {
    id: 22,
    code: 'PRODUCT BLOCK 22',
    title: 'Ancestral Psychic Reading (Connecting with Lineage Guides)',
    name: 'Ancestral Psychic Reading (Connecting with Lineage Guides)',
    targetFocus: 'Uncovering ancestral blessings, breaking generational curses, and communicating with lineage guides.',
    icon: 'Trees',
    spreadName: '4-Card Lineage Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb22-1',
        name: 'Cover Page & Ancestral Altar Seal',
        category: 'Core Front-Matter',
        description: 'Ancestral cover featuring the Sacred Roots of Yggdrasil and unbroken lineage seal.',
      },
      {
        id: 'pb22-2',
        name: 'Family Lineage & Ancestral Origin Intake',
        category: 'Lineage Intake',
        description: 'Recording family heritage, maternal/paternal patterns, and known generational traits.',
      },
      {
        id: 'pb22-3',
        name: '4-Card Lineage Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Ancestral Gift Passed to You · Card 2: Generational Trauma to Heal · Card 3: Direct Message from Your Lineage Guide · Card 4: Ancestral Protection Status.',
      },
      {
        id: 'pb22-4',
        name: 'Ancestral Altar Setup & Honoring Protocol',
        category: 'Altar Practice',
        description: 'Guidelines on setting up a clean ancestral table with white candles, fresh water, and ancestor food offerings.',
      },
      {
        id: 'pb22-5',
        name: 'Breaking Generational Curses & Behavioral Loops',
        category: 'Curse Breaking',
        description: 'Ritual decree dissolving inherited cycles of financial lack, emotional silence, or relationship sabotage.',
      },
      {
        id: 'pb22-6',
        name: 'Lineage Gratitude Affirmations',
        category: 'Affirmations',
        description: '5 affirmations honoring the bloodline while stepping into healed generational leadership.',
      },
      {
        id: 'pb22-7',
        name: 'Spiritual Prescription (Frankincense, Tobacco/Earth Offerings, Hematite Grounding)',
        category: 'Remedies',
        description: 'Frankincense resin smoke, hematite bloodline stone, earth libations, and ancestor memorial candles.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Legal Courtroom Verdict & Document Strategy',
        category: 'Legal',
        reason: 'Eliminated in favor of spiritual ancestral veneration and curse breaking.',
      },
      {
        name: 'Pet Telepathy & Animal Chakra Diagnostic',
        category: 'Pet',
        reason: 'Omitted as focus is human bloodline ancestry.',
      },
    ],
  },

  // PRODUCT BLOCK 23
  23: {
    id: 23,
    code: 'PRODUCT BLOCK 23',
    title: 'Situationship & Next Moves',
    name: 'Situationship & Next Moves',
    targetFocus: 'Decoding undefined relationships, ambiguity, and mapping out the immediate next phase.',
    icon: 'GitFork',
    spreadName: '4-Card Situationship Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb23-1',
        name: 'Cover Page & Clarity Portal Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Clarity Portal Seal, querent name, and reading title.',
      },
      {
        id: 'pb23-2',
        name: 'Situationship Intake & Ambiguity Blueprint',
        category: 'Relational Blueprint',
        description: 'Assessing connection history, mixed signals, unspoken assumptions, and emotional investment levels.',
      },
      {
        id: 'pb23-3',
        name: 'The 4-Card Situationship Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Current Dynamic · Card 2: Where Their Head Is At · Card 3: The Hidden Roadblock · Card 4: The Next Step / Chapter.',
      },
      {
        id: 'pb23-4',
        name: 'The "What Are We?" Reality Check Matrix',
        category: 'Clarity Matrix',
        description: 'Direct cross-examination of actions vs words, commitment readiness, and boundary misalignment.',
      },
      {
        id: 'pb23-5',
        name: 'Defining the Boundaries vs. Letting Go Guide',
        category: 'Boundary Strategy',
        description: 'Framework for asserting non-negotiable needs, having the defining conversation, or gracefully releasing.',
      },
      {
        id: 'pb23-6',
        name: '30-Day Relational Direction Roadmap',
        category: 'Action Roadmap',
        description: 'Week-by-week protocol for taking emotional agency and establishing relational certainty.',
      },
      {
        id: 'pb23-7',
        name: 'Spiritual Prescription (Citrine for clarity, Communication open-heart meditation)',
        category: 'Remedies',
        description: 'Citrine crystal for mental discernment, throat chakra botanicals, and heart-opening communication meditation.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Legal Courtroom Verdict & Document Strategy',
        category: 'Legal',
        reason: 'Omitted as focus is interpersonal romantic ambiguity and communication.',
      },
      {
        name: 'Past Life & Akashic Soul Contract Decrees',
        category: 'Karmic Debt',
        reason: 'Eliminated to prioritize immediate behavioral clarity and next-phase boundary execution.',
      },
    ],
  },

  // PRODUCT BLOCK 24
  24: {
    id: 24,
    code: 'PRODUCT BLOCK 24',
    title: 'Exact Time Frame (When Will It Happen?)',
    name: 'Exact Time Frame (When Will It Happen?)',
    targetFocus: 'Pinpointing exact chronological timelines, seasons, or catalyst windows for future events.',
    icon: 'Hourglass',
    spreadName: '3-Card Timeframe Spread',
    spreadCardCount: 3,
    injectedSections: [
      {
        id: 'pb24-1',
        name: 'Cover Page & Chronos Temporal Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Chronos Temporal Seal, querent name, and reading title.',
      },
      {
        id: 'pb24-2',
        name: 'Target Event Intake & Desired Outcome Blueprint',
        category: 'Temporal Blueprint',
        description: 'Defining the targeted event, urgency level, past delays, and energetic readiness for manifestation.',
      },
      {
        id: 'pb24-3',
        name: 'The Temporal Suit Matrix (Interpreting Wands, Swords, Cups, Pentacles)',
        category: 'Esoteric Timing System',
        description: 'Wands (Days/Spring), Swords (Weeks/Autumn), Cups (Months/Summer), Pentacles (Years/Winter) timing mechanics.',
      },
      {
        id: 'pb24-4',
        name: '3-Card Timeframe Spread',
        category: 'Sacred Spread',
        description: 'Card 1: The Seed / Catalyst Point · Card 2: The Development Phase · Card 3: The Final Culmination Window.',
      },
      {
        id: 'pb24-5',
        name: 'Micro vs. Macro Timing Indicators',
        category: 'Timing Analytics',
        description: 'Pinpointing rapid acceleration windows vs incubation periods requiring non-interference.',
      },
      {
        id: 'pb24-6',
        name: 'Seasonal & Lunar Phase Cross-Reference Guide',
        category: 'Astrological Timing',
        description: 'Mapping outcome convergence with specific lunar lunations, equinoxes, and planetary retrogrades.',
      },
      {
        id: 'pb24-7',
        name: 'Spiritual Prescription (Hourglass visualization, grounding anchors)',
        category: 'Remedies',
        description: 'Hourglass temporal visualization, hematite grounding anchors, and divine timing surrender ritual.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Entity Exorcism & Demon Removal Decree',
        category: 'Dark Attachment',
        reason: 'Omitted as inquiry is strictly focused on chronological event timing.',
      },
      {
        name: 'Animal Telepathy & Pet Bonding Ritual',
        category: 'Pet',
        reason: 'Eliminated to concentrate on event timeline mapping.',
      },
    ],
  },

  // PRODUCT BLOCK 25
  25: {
    id: 25,
    code: 'PRODUCT BLOCK 25',
    title: '8 Future Predictions',
    name: '8 Future Predictions',
    targetFocus: 'A comprehensive, multi-faceted look across 8 distinct future life vectors.',
    icon: 'Radar',
    spreadName: '8-Card Horizon Spread',
    spreadCardCount: 8,
    injectedSections: [
      {
        id: 'pb25-1',
        name: 'Cover Page & Octave Future Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Octave Future Seal, querent name, and reading title.',
      },
      {
        id: 'pb25-2',
        name: 'Querent Life Path Baseline Intake',
        category: 'Life Intake',
        description: 'Holistic baseline inventory of current standing across career, romance, vitality, and aspirations.',
      },
      {
        id: 'pb25-3',
        name: 'The 8-Card Horizon Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Love · Card 2: Career · Card 3: Inner Growth · Card 4: Finances · Card 5: Health/Vitality · Card 6: Hidden Opportunity · Card 7: Unexpected Surprise · Card 8: Final Outcome.',
      },
      {
        id: 'pb25-4',
        name: '8 Dedicated Focal Mini-Breakdowns (1 paragraph per prediction)',
        category: 'Predictive Synthesis',
        description: 'Detailed analysis for each of the 8 distinct life areas with actionable foresight.',
      },
      {
        id: 'pb25-5',
        name: 'Summary Matrix of Highest Probability Timelines',
        category: 'Probability Matrix',
        description: 'Comparative overview grid highlighting imminent developments and required preparations.',
      },
      {
        id: 'pb25-6',
        name: 'Manifestation & Alignment Anchor Steps',
        category: 'Alignment Protocol',
        description: 'Daily mental and energetic calibration routines to anchor the highest vibrational outcomes.',
      },
      {
        id: 'pb25-7',
        name: 'Closing Blessing & Future Outlook Disclaimer',
        category: 'Closing Wisdom',
        description: 'Empowering closing blessing affirming free will, personal sovereignty, and forward momentum.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Legal Courtroom Verdict & Document Strategy',
        category: 'Legal',
        reason: 'Omitted in favor of an expansive 8-domain holistic life prediction.',
      },
      {
        name: 'Cosmic Retribution & Enemy Revenge Protocol',
        category: 'Karmic Retribution',
        reason: 'Eliminated to maintain constructive, broad-spectrum life progression.',
      },
    ],
  },

  // PRODUCT BLOCK 26
  26: {
    id: 26,
    code: 'PRODUCT BLOCK 26',
    title: 'Life Compass & Path',
    name: 'Life Compass & Path',
    targetFocus: 'Broad, holistic macro-analysis of personal growth, past lessons, current direction, and future destiny.',
    icon: 'Compass',
    spreadName: '5-Card Compass Spread',
    spreadCardCount: 5,
    injectedSections: [
      {
        id: 'pb26-1',
        name: 'Cover Page & True North Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the True North Seal, querent name, and reading title.',
      },
      {
        id: 'pb26-2',
        name: 'Life Path & Soul Origin Intake Assessment',
        category: 'Soul Intake',
        description: 'Mapping the querents core values, defining life crossroads, and current feelings of alignment or stagnation.',
      },
      {
        id: 'pb26-3',
        name: 'The 5-Card Compass Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Where You’ve Been / Past Lessons · Card 2: Where You Are Now / Core Friction · Card 3: Your True North / Growth Vector · Card 4: Future Destination · Card 5: The Inner Guide.',
      },
      {
        id: 'pb26-4',
        name: 'Elemental Life Balance Matrix (Fire, Water, Air, Earth)',
        category: 'Elemental Balance',
        description: 'Evaluating drive (Fire), emotions (Water), intellect/communication (Air), and stability/wealth (Earth).',
      },
      {
        id: 'pb26-5',
        name: 'Core Life Purpose & Destiny Alignment Blueprint',
        category: 'Destiny Blueprint',
        description: 'Synthesizing vocational gifts with spiritual calling to articulate your core soul mission.',
      },
      {
        id: 'pb26-6',
        name: '90-Day Personal Evolution Roadmap',
        category: 'Evolution Roadmap',
        description: 'Phased quarterly blueprint for shedding outdated paradigms and activating authentic purpose.',
      },
      {
        id: 'pb26-7',
        name: 'Spiritual Prescription (Compass meditation, grounding earth crystals)',
        category: 'Remedies',
        description: 'True North meditation protocol, smoky quartz & tiger’s eye grounding crystals, and cedar smudging.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Ex-Partner Reconciliation & Contact Window',
        category: 'Reconciliation',
        reason: 'Omitted as focus is individual life destiny and spiritual compass.',
      },
      {
        name: 'Evil Eye Diagnostic & Return-to-Sender Spell',
        category: 'Hex Clearing',
        reason: 'Eliminated to concentrate on expansive personal growth and life direction.',
      },
    ],
  },

  // PRODUCT BLOCK 27
  27: {
    id: 27,
    code: 'PRODUCT BLOCK 27',
    title: 'Brutal / No Sugar Coating Reading',
    name: 'Brutal / No Sugar Coating Reading',
    targetFocus: 'Raw, unfiltered truth, calling out self-sabotage, and delivering direct unvarnished realities.',
    icon: 'Zap',
    spreadName: '4-Card Unfiltered Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb27-1',
        name: 'Cover Page & Truth Mirror Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Truth Mirror Seal, querent name, and reading title.',
      },
      {
        id: 'pb27-2',
        name: 'Hard Truth Intake & Intention Setup (No-Sugar-Coating Agreement)',
        category: 'Truth Intake',
        description: 'Direct agreement acknowledging querent desire for raw truth without platitudes or softened blows.',
      },
      {
        id: 'pb27-3',
        name: 'The 4-Card Unfiltered Spread',
        category: 'Sacred Spread',
        description: 'Card 1: The Brutal Reality You Are Avoiding · Card 2: Your Blind Spots/Delusions · Card 3: The Harsh External Truth · Card 4: The Hard Awakening Action Required.',
      },
      {
        id: 'pb27-4',
        name: 'Ego Defense Mechanism Deconstruction',
        category: 'Psychological Truth',
        description: 'Dismantling rationalizations, victim narratives, and comfort illusions keeping you trapped.',
      },
      {
        id: 'pb27-5',
        name: 'Reality Check Matrix: Stopping Self-Sabotage',
        category: 'Reality Matrix',
        description: 'Direct, clear diagnosis of self-defeating habits, chronic excuses, and enabling behaviors.',
      },
      {
        id: 'pb27-6',
        name: 'Direct Accountability Action Plan',
        category: 'Accountability Plan',
        description: 'Uncompromising steps to cut toxic dynamics, enforce radical ownership, and initiate immediate changes.',
      },
      {
        id: 'pb27-7',
        name: 'Spiritual Prescription (Obsidian protection, raw clarity affirmations)',
        category: 'Remedies',
        description: 'Black obsidian mirror stone, rosemary cleansing wash, and raw radical honesty affirmations.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Comforting Fairy Tale & Gentle Affirmations',
        category: 'Gentle Support',
        reason: 'Eliminated strictly per user request for direct, raw, unvarnished truth.',
      },
      {
        name: 'Pet Telepathy & Animal Chakra Diagnostic',
        category: 'Pet',
        reason: 'Omitted as focus is personal accountability and unvarnished truth.',
      },
    ],
  },

  // PRODUCT BLOCK 28
  28: {
    id: 28,
    code: 'PRODUCT BLOCK 28',
    title: '3 Hidden Truths Psychic Reading',
    name: '3 Hidden Truths Psychic Reading',
    targetFocus: 'Uncovering three specific, deeply guarded secrets or underlying realities in a situation.',
    icon: 'Eye',
    spreadName: '3-Card Hidden Truths Spread',
    spreadCardCount: 3,
    injectedSections: [
      {
        id: 'pb28-1',
        name: 'Cover Page & Veil Removal Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Veil Removal Seal, querent name, and reading title.',
      },
      {
        id: 'pb28-2',
        name: 'Situation Context Intake Inventory',
        category: 'Intake Context',
        description: 'Capturing the situation, suspected deception, unspoken tensions, and key parties involved.',
      },
      {
        id: 'pb28-3',
        name: 'The 3-Card Hidden Truths Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Truth #1 (The Subconscious Reality) · Card 2: Truth #2 (What They/Others Are Hiding) · Card 3: Truth #3 (The Ultimate Blind Spot).',
      },
      {
        id: 'pb28-4',
        name: 'Channeled Disclosure Transcript Box for Each Truth',
        category: 'Psychic Disclosure',
        description: 'Direct channeled insights peeling back hidden motives, undisclosed actions, and covert dynamics.',
      },
      {
        id: 'pb28-5',
        name: 'Impact Analysis: How Knowing This Changes Your Strategy',
        category: 'Strategic Impact',
        description: 'Evaluating how revealing these concealed facts shifts your leverage, decisions, and trajectory.',
      },
      {
        id: 'pb28-6',
        name: 'Boundary Enforcement & Truth Integration Steps',
        category: 'Integration Strategy',
        description: 'Concrete actions to protect yourself, adjust communications, and eliminate vulnerabilities.',
      },
      {
        id: 'pb28-7',
        name: 'Spiritual Prescription (Lapis Lazuli, Third-Eye clarity drop)',
        category: 'Remedies',
        description: 'Lapis lazuli truth talisman, clary sage botanical oil, and Ajna chakra truth drops meditation.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Fertility & Womb Conception Timing',
        category: 'Fertility',
        reason: 'Omitted to focus strictly on unveiling covert realities and guarded secrets.',
      },
      {
        name: 'Legal Courtroom Verdict & Document Strategy',
        category: 'Legal',
        reason: 'Eliminated unless legal proceedings are explicitly requested.',
      },
    ],
  },

  // PRODUCT BLOCK 29
  29: {
    id: 29,
    code: 'PRODUCT BLOCK 29',
    title: 'Meet Your Spirit Guides',
    name: 'Meet Your Spirit Guides',
    targetFocus: 'Establishing contact with guardian spirits, animal guides, or celestial protectors.',
    icon: 'Feather',
    spreadName: '4-Card Guide Connection Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb29-1',
        name: 'Cover Page & Celestial Guardian Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Celestial Guardian Seal, querent name, and reading title.',
      },
      {
        id: 'pb29-2',
        name: 'Spiritual Background & Seeker Intake',
        category: 'Spiritual Intake',
        description: 'Recording synchronicities, recurring animal sightings, intuitive dreams, and meditation background.',
      },
      {
        id: 'pb29-3',
        name: 'The 4-Card Guide Connection Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Who Is Stepping Forward Now · Card 2: Their Primary Role in Your Life · Card 3: Their Direct Message to You · Card 4: How to Strengthen Your Connection.',
      },
      {
        id: 'pb29-4',
        name: 'Guardian Archetype Identification (Ancestral, Animal, Ascended Master, Angelic)',
        category: 'Guide Identification',
        description: 'Deep profiling of your primary guide’s energetic signature, frequency, and realm of origin.',
      },
      {
        id: 'pb29-5',
        name: 'Channeling Portal & Automatic Writing Protocol',
        category: 'Channeling Practice',
        description: 'Step-by-step method for entering alpha state, holding spiritual resonance, and receiving clear guidance.',
      },
      {
        id: 'pb29-6',
        name: 'Daily Guide Communion Ritual',
        category: 'Communion Ritual',
        description: 'Morning alignment ceremony with candle lighting, symbolic offerings, and intuitive listening.',
      },
      {
        id: 'pb29-7',
        name: 'Spiritual Prescription (Selenite, Frankincense, High-Vibration Meditation)',
        category: 'Remedies',
        description: 'Selenite wand for crown chakra bridging, pure frankincense resin, and 528Hz celestial meditation.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Cosmic Retribution & Enemy Revenge Protocol',
        category: 'Karmic Retribution',
        reason: 'Eliminated as spirit guide communion operates on high-vibrational guidance and benevolence.',
      },
      {
        name: 'Commercial Enterprise & Job Promotion Strategy',
        category: 'Career',
        reason: 'Omitted to focus on spiritual guardianship and metaphysical communion.',
      },
    ],
  },

  // PRODUCT BLOCK 30
  30: {
    id: 30,
    code: 'PRODUCT BLOCK 30',
    title: 'What Is Your Pet Not Telling You?',
    name: 'What Is Your Pet Not Telling You?',
    targetFocus: 'Uncovering silent physical discomforts, emotional needs, or secret messages from animal companions.',
    icon: 'PawPrint',
    spreadName: '4-Card Animal Telepathy Spread',
    spreadCardCount: 4,
    injectedSections: [
      {
        id: 'pb30-1',
        name: 'Cover Page & Paws & Claws Telepathy Seal',
        category: 'Core Front-Matter',
        description: 'Bespoke cover featuring the Paws & Claws Telepathy Seal, querent & pet name, and reading title.',
      },
      {
        id: 'pb30-2',
        name: 'Pet Profile Intake (Name, Species, Age, Behavioral Quirks)',
        category: 'Pet Intake',
        description: 'Capturing pet name, breed/species, age, recent changes in appetite/behavior, and living environment.',
      },
      {
        id: 'pb30-3',
        name: 'The 4-Card Animal Telepathy Spread',
        category: 'Sacred Spread',
        description: 'Card 1: Their Direct Plea to You · Card 2: Hidden Environmental Stressor · Card 3: What Makes Them Feel Safest · Card 4: Their Soul Contract with You.',
      },
      {
        id: 'pb30-4',
        name: 'Animal Chakra & Emotional Well-being Scan',
        category: 'Animal Chakra Scan',
        description: 'Targeted assessment of pet Root, Brachial (Key), Solar Plexus, and Heart centers for trapped distress.',
      },
      {
        id: 'pb30-5',
        name: 'Routine Adjustment & Home Harmonization Plan',
        category: 'Harmonization Plan',
        description: 'Environmental tweaks: scent neutralizing, quiet resting zones, enriched stimulation, and dietary harmony.',
      },
      {
        id: 'pb30-6',
        name: 'Bonding & Trust Amplification Ritual',
        category: 'Bonding Practice',
        description: 'Heart-to-heart breath synchronization, gentle energy stroking, and affirmative verbal reassurance.',
      },
      {
        id: 'pb30-7',
        name: 'Spiritual Prescription (Pet-safe calming herbs, crystal grid around pet bed)',
        category: 'Remedies',
        description: 'Pet-safe chamomile/valerian aroma, rose quartz & green aventurine grid outside reach of pet bed.',
      },
    ],
    eliminatedSections: [
      {
        name: 'Legal Courtroom Verdict & Document Strategy',
        category: 'Legal',
        reason: 'Omitted as focus is domestic animal companion telepathy and comfort.',
      },
      {
        name: 'Akashic Curse Breaking & Past Life Reincarnation Contract',
        category: 'Karmic Debt',
        reason: 'Eliminated to concentrate on immediate pet well-being, feelings, and home environment.',
      },
    ],
  },
};

/**
 * High-Accuracy AI Product Block Detector
 * Analyzes Topic, Problem, Question, Title to map to the exact Product Block (1-30).
 */
export function detectProductBlock(
  topic: string = '',
  problem: string = '',
  question: string = '',
  title: string = ''
): ProductBlockMeta {
  const text = `${topic} ${problem} ${question} ${title}`.toLowerCase();

  // 30. What Is Your Pet Not Telling You? / Pet Reading
  if (
    text.includes('pet not telling') ||
    text.includes('pet telling') ||
    text.includes('pet secret') ||
    text.includes('dog thinking') ||
    text.includes('cat thinking') ||
    text.includes('animal companion') ||
    text.includes('what is my pet')
  ) {
    return PRODUCT_BLOCKS[30];
  }

  // 17. Pet Psychic Reading (General)
  if (
    text.includes('pet') ||
    text.includes('dog') ||
    text.includes('cat') ||
    text.includes('animal') ||
    text.includes('puppy') ||
    text.includes('kitten') ||
    text.includes('vet')
  ) {
    return PRODUCT_BLOCKS[17];
  }

  // 29. Meet Your Spirit Guides
  if (
    text.includes('spirit guide') ||
    text.includes('guardian spirit') ||
    text.includes('meet your guides') ||
    text.includes('angelic guide') ||
    text.includes('celestial protector') ||
    text.includes('spirit animal') ||
    text.includes('guardian angel') ||
    text.includes('guide connection')
  ) {
    return PRODUCT_BLOCKS[29];
  }

  // 27. Brutal / No Sugar Coating Reading
  if (
    text.includes('brutal') ||
    text.includes('no sugar coating') ||
    text.includes('no sugarcoat') ||
    text.includes('unfiltered') ||
    text.includes('harsh truth') ||
    text.includes('hard truth') ||
    text.includes('raw truth') ||
    text.includes('call me out') ||
    text.includes('stop self sabotage')
  ) {
    return PRODUCT_BLOCKS[27];
  }

  // 28. 3 Hidden Truths Psychic Reading
  if (
    text.includes('3 hidden truth') ||
    text.includes('three hidden truth') ||
    text.includes('3 hidden truths') ||
    text.includes('three hidden truths') ||
    text.includes('hidden truths') ||
    text.includes('unveil secrets') ||
    text.includes('what is being hidden')
  ) {
    return PRODUCT_BLOCKS[28];
  }

  // 23. Situationship & Next Moves
  if (
    text.includes('situationship') ||
    text.includes('what are we') ||
    text.includes('undefined relationship') ||
    text.includes('mixed signal') ||
    text.includes('next move') ||
    text.includes('next moves') ||
    text.includes('are we dating') ||
    text.includes('casual dating') ||
    text.includes('no label')
  ) {
    return PRODUCT_BLOCKS[23];
  }

  // 24. Exact Time Frame (When Will It Happen?)
  if (
    text.includes('exact time') ||
    text.includes('time frame') ||
    text.includes('timeframe') ||
    text.includes('when will it happen') ||
    text.includes('when will i') ||
    text.includes('what month') ||
    text.includes('how soon') ||
    text.includes('timing') ||
    text.includes('timing reading')
  ) {
    return PRODUCT_BLOCKS[24];
  }

  // 25. 8 Future Predictions
  if (
    text.includes('8 future') ||
    text.includes('eight future') ||
    text.includes('8 predictions') ||
    text.includes('eight predictions') ||
    text.includes('8 card horizon')
  ) {
    return PRODUCT_BLOCKS[25];
  }

  // 26. Life Compass & Path
  if (
    text.includes('life compass') ||
    text.includes('true north') ||
    text.includes('life direction') ||
    text.includes('where am i going') ||
    text.includes('compass reading') ||
    text.includes('crossroads')
  ) {
    return PRODUCT_BLOCKS[26];
  }

  // 17. Pet Psychic Reading
  if (
    text.includes('pet') ||
    text.includes('dog') ||
    text.includes('cat') ||
    text.includes('animal') ||
    text.includes('puppy') ||
    text.includes('kitten') ||
    text.includes('vet')
  ) {
    return PRODUCT_BLOCKS[17];
  }

  // 19. Demon Removal & Dark Attachment
  if (
    text.includes('demon') ||
    text.includes('exorcism') ||
    text.includes('dark attachment') ||
    text.includes('possession') ||
    text.includes('shadow figure') ||
    text.includes('heavy entity') ||
    text.includes('banish entity')
  ) {
    return PRODUCT_BLOCKS[19];
  }

  // 20. Justice Protection / Court / Legal
  if (
    text.includes('court') ||
    text.includes('lawsuit') ||
    text.includes('legal') ||
    text.includes('judge') ||
    text.includes('custody') ||
    text.includes('lawyer') ||
    text.includes('justice protection')
  ) {
    return PRODUCT_BLOCKS[20];
  }

  // 21. Future Children & Fertility
  if (
    text.includes('fertility') ||
    text.includes('pregnant') ||
    text.includes('pregnancy') ||
    text.includes('conception') ||
    text.includes('future child') ||
    text.includes('baby') ||
    text.includes('womb')
  ) {
    return PRODUCT_BLOCKS[21];
  }

  // 22. Ancestral Psychic Reading
  if (
    text.includes('ancestor') ||
    text.includes('ancestral') ||
    text.includes('lineage') ||
    text.includes('generational') ||
    text.includes('bloodline') ||
    text.includes('forefathers')
  ) {
    return PRODUCT_BLOCKS[22];
  }

  // 18. Dream Message Reading
  if (
    text.includes('dream') ||
    text.includes('nightmare') ||
    text.includes('lucid') ||
    text.includes('sleeping vision') ||
    text.includes('oneiric')
  ) {
    return PRODUCT_BLOCKS[18];
  }

  // 16. Karmic Soul Contract (Past Life)
  if (
    text.includes('past life') ||
    text.includes('soul contract') ||
    text.includes('akashic') ||
    text.includes('reincarnation') ||
    text.includes('past incarnation')
  ) {
    return PRODUCT_BLOCKS[16];
  }

  // 3. Energy Cord Cutting
  if (
    text.includes('cord cutting') ||
    text.includes('cut cord') ||
    text.includes('sever cord') ||
    text.includes('detach') ||
    text.includes('unhealthy attachment') ||
    text.includes('toxic tether')
  ) {
    return PRODUCT_BLOCKS[3];
  }

  // 15. Energy Cleansing & Reset
  if (
    text.includes('energy cleanse') ||
    text.includes('aura cleanse') ||
    text.includes('energy reset') ||
    text.includes('detox') ||
    text.includes('heavy energy') ||
    text.includes('auric reset')
  ) {
    return PRODUCT_BLOCKS[15];
  }

  // 10. Evil Eye Energy Reading
  if (
    text.includes('evil eye') ||
    text.includes('jealous') ||
    text.includes('envy') ||
    text.includes('nazar') ||
    text.includes('psychic attack') ||
    text.includes('hater') ||
    text.includes('hex')
  ) {
    return PRODUCT_BLOCKS[10];
  }

  // 6. Third Eye Opening Spell & Reading
  if (
    text.includes('third eye') ||
    text.includes('pineal') ||
    text.includes('psychic activation') ||
    text.includes('intuition spell') ||
    text.includes('clairvoyan')
  ) {
    return PRODUCT_BLOCKS[6];
  }

  // 7. Soul Purpose Reading
  if (
    text.includes('soul purpose') ||
    text.includes('life path') ||
    text.includes('divine mission') ||
    text.includes('starseed') ||
    text.includes('spiritual destiny') ||
    text.includes('true calling')
  ) {
    return PRODUCT_BLOCKS[7];
  }

  // 2. Karma for Hurting You / 9. Karma Revenge
  if (
    text.includes('karma for hurting') ||
    text.includes('their karma') ||
    text.includes('karmic payback') ||
    text.includes('hurt me') ||
    text.includes('wronged me') ||
    text.includes('betrayal karma')
  ) {
    return PRODUCT_BLOCKS[2];
  }

  if (
    text.includes('karma revenge') ||
    text.includes('retribution') ||
    text.includes('cosmic revenge') ||
    text.includes('punish')
  ) {
    return PRODUCT_BLOCKS[9];
  }

  // 4. Will My Ex Come Back?
  if (
    text.includes('ex come back') ||
    text.includes('will my ex') ||
    text.includes('ex partner') ||
    text.includes('reconciliation') ||
    text.includes('reconnect with ex') ||
    text.includes('breakup')
  ) {
    return PRODUCT_BLOCKS[4];
  }

  // 12. How They See You?
  if (
    text.includes('how they see') ||
    text.includes('how do they see me') ||
    text.includes('impression of me') ||
    text.includes('their perception') ||
    text.includes('do they find me attractive')
  ) {
    return PRODUCT_BLOCKS[12];
  }

  // 8. Hidden Feelings Psychic Reading
  if (
    text.includes('hidden feelings') ||
    text.includes('what is hidden') ||
    text.includes('secret feelings') ||
    text.includes('true feelings') ||
    text.includes('exact thoughts') ||
    text.includes('thoughts and feelings') ||
    text.includes('what they are hiding')
  ) {
    return PRODUCT_BLOCKS[8];
  }

  // 13. In-Depth Career & Job
  if (
    text.includes('career') ||
    text.includes('job') ||
    text.includes('promotion') ||
    text.includes('business') ||
    text.includes('wealth') ||
    text.includes('money') ||
    text.includes('finance') ||
    text.includes('investment')
  ) {
    return PRODUCT_BLOCKS[13];
  }

  // 14. 10 Question Psychic Reading
  if (
    text.includes('10 question') ||
    text.includes('ten question') ||
    text.includes('10 questions') ||
    text.includes('ten questions')
  ) {
    return PRODUCT_BLOCKS[14];
  }

  // 5. 5 Question Psychic Reading
  if (
    text.includes('5 question') ||
    text.includes('five question') ||
    text.includes('5 questions') ||
    text.includes('five questions')
  ) {
    return PRODUCT_BLOCKS[5];
  }

  // 1. 12 Future Predictions / 12 Months
  if (
    text.includes('12 month') ||
    text.includes('12 psychic') ||
    text.includes('what is coming for you') ||
    text.includes("what's coming") ||
    text.includes('future prediction') ||
    text.includes('annual forecast') ||
    text.includes('year ahead')
  ) {
    return PRODUCT_BLOCKS[1];
  }

  // 11. Deep Love Tarot Reading (Default for general love queries)
  if (
    text.includes('love') ||
    text.includes('soulmate') ||
    text.includes('twin flame') ||
    text.includes('relationship') ||
    text.includes('partner') ||
    text.includes('marriage')
  ) {
    return PRODUCT_BLOCKS[11];
  }

  // Fallback to Product Block 1 (What's Coming For You)
  return PRODUCT_BLOCKS[1];
}
