export interface CategoryFieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'list';
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  defaultItems?: string[];
  maxItems?: number;
}

export interface CategorySpec {
  id: number;
  title: string;
  headline: string;
  categoryType:
    | 'ten_questions'
    | 'five_questions'
    | 'eight_predictions'
    | 'twelve_months'
    | 'pet_reading'
    | 'lost_item'
    | 'relationship_partner'
    | 'time_frame'
    | 'blind_reading'
    | 'three_truths'
    | 'spirit_guides'
    | 'past_life'
    | 'energy_drain'
    | 'evil_eye_blessings'
    | 'money_flow'
    | 'love_blocks'
    | 'karma'
    | 'cord_cutting'
    | 'energy_reset'
    | 'third_eye'
    | 'dream_message'
    | 'career_job'
    | 'brutal_truth'
    | 'life_compass'
    | 'standard';
  description: string;
  customFields: CategoryFieldDef[];
  pdfSectionTitle: string;
}

export const CATEGORY_SPECS: Record<number, CategorySpec> = {
  // Topic 1: Deep Love Reading
  1: {
    id: 1,
    title: 'Deep Love Reading',
    headline: 'EXTREMELY DEEP LOVE PSYCHIC READING',
    categoryType: 'relationship_partner',
    description: 'Explores soulmate connection, mutual energetic bonds, and love trajectory.',
    pdfSectionTitle: 'SOULMATE CONNECTION & DEEP LOVE MATRIX',
    customFields: [
      {
        key: 'personName',
        label: "Partner / Love Interest's Name (Optional)",
        type: 'text',
        placeholder: 'e.g. Alexander Vance (or leave blank if seeking new love)',
        helpText: 'Helps tune into the specific romantic frequency',
      },
      {
        key: 'relationshipStatus',
        label: 'Relationship Dynamic / Status',
        type: 'text',
        placeholder: 'e.g. In a relationship, Complicated, Long distance, Looking for soulmate',
      },
    ],
  },

  // Topic 2: Exact Thoughts & Feelings
  2: {
    id: 2,
    title: 'Exact Thoughts & Feelings',
    headline: 'EXACT THOUGHTS & FEELINGS READING',
    categoryType: 'relationship_partner',
    description: 'Channeled psychic look into what they consciously think and subconsciously feel.',
    pdfSectionTitle: 'EXACT THOUGHTS & SUBSONSCIOUS FEELINGS SCAN',
    customFields: [
      {
        key: 'personName',
        label: "Specific Person's Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Liam Sterling',
        helpText: 'The person whose thoughts and feelings you wish to read',
      },
      {
        key: 'relationshipStatus',
        label: 'Current Connection Context',
        type: 'text',
        placeholder: 'e.g. No contact, Talking stage, Ex-partner, Partner',
      },
    ],
  },

  // Topic 3: Situationship & Next Moves
  3: {
    id: 3,
    title: 'Situationship & Next Moves',
    headline: 'SITUATIONSHIP STATUS & NEXT CHAPTER',
    categoryType: 'relationship_partner',
    description: 'Clarity on unlabelled bonds, their hidden intentions, and forthcoming moves.',
    pdfSectionTitle: 'SITUATIONSHIP DYNAMICS & PREDICTED NEXT MOVES',
    customFields: [
      {
        key: 'personName',
        label: "Their Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Jordan Grey',
      },
      {
        key: 'relationshipStatus',
        label: 'How long has this situationship been going?',
        type: 'text',
        placeholder: 'e.g. 6 months, on and off for a year',
      },
    ],
  },

  // Topic 4: Will They Come Back?
  4: {
    id: 4,
    title: 'Will They Come Back?',
    headline: 'WILL THEY COME BACK TO ME?',
    categoryType: 'relationship_partner',
    description: 'Psychic analysis on the likelihood of reconciliation, timing, and conditions of return.',
    pdfSectionTitle: 'RECONCILIATION PROBABILITY & REUNION TIMELINE',
    customFields: [
      {
        key: 'personName',
        label: "Ex-Partner / Person's Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Marcus Cole',
      },
      {
        key: 'relationshipStatus',
        label: 'Time Since Separation / Contact Status',
        type: 'text',
        placeholder: 'e.g. 3 months no contact, separated last week',
      },
    ],
  },

  // Topic 5: Exact Time Frame
  5: {
    id: 5,
    title: 'Exact Time Frame',
    headline: 'EXTREMELY EXACT TIME FRAME READING',
    categoryType: 'time_frame',
    description: 'Pinpoints specific seasonal, astrological, and numerical timing for major events.',
    pdfSectionTitle: 'PRECISE TEMPORAL WINDOWS & CATALYST TIMELINES',
    customFields: [
      {
        key: 'timeframeEvent',
        label: 'What event are you seeking exact timing for? *',
        type: 'text',
        required: true,
        placeholder: 'e.g. Meeting my future spouse, New career offer, Moving to a new home',
      },
      {
        key: 'desiredWindow',
        label: 'General Time Window of Interest',
        type: 'text',
        placeholder: 'e.g. Next 3 months, This upcoming year, Autumn/Winter',
      },
    ],
  },

  // Topic 6: Next 12 Months Forecast
  6: {
    id: 6,
    title: 'Next 12 Months Forecast',
    headline: 'NEXT 12 MONTH PREDICTIONS',
    categoryType: 'twelve_months',
    description: 'Comprehensive month-by-month energetic forecasts for the upcoming 12 months.',
    pdfSectionTitle: 'CHRONOLOGICAL 12-MONTH ALMANAC & FORECAST',
    customFields: [
      {
        key: 'monthlyFocus',
        label: '12 Monthly Milestone Focuses (Editable or Keep Defaults)',
        type: 'list',
        maxItems: 12,
        defaultItems: [
          'Month 1: Spiritual Awakening & Fresh Foundations',
          'Month 2: Emotional Healing & Heart Alignment',
          'Month 3: Professional Breakthrough & Career Pivot',
          'Month 4: Financial Abundance & Material Stability',
          'Month 5: Relationship Reciprocity & Deep Bond',
          'Month 6: Mid-Year Karmic Graduation & Shift',
          'Month 7: Creative Spark & Inspired Projects',
          'Month 8: Courageous Boundary & Power Reclaim',
          'Month 9: Unexpected Synchronicity & New Horizon',
          'Month 10: Family & Home Sanctuary Realignment',
          'Month 11: Intuitive Mastery & Inner Confidence',
          'Month 12: Grand Cycle Completion & Celebration',
        ],
      },
    ],
  },

  // Topic 7: 8 Future Predictions
  7: {
    id: 7,
    title: '8 Future Predictions',
    headline: '8 FUTURE PREDICTIONS',
    categoryType: 'eight_predictions',
    description: 'Eight distinct future revelations detailing imminent shifts and milestones.',
    pdfSectionTitle: '8 SACRED FUTURE PREDICTIONS & DESTINY REVELATIONS',
    customFields: [
      {
        key: 'predictions',
        label: '8 Future Prediction Focus Areas (Editable or Keep Defaults)',
        type: 'list',
        maxItems: 8,
        defaultItems: [
          'Prediction 1: Major Romantic Destiny & Soul Connection Shift',
          'Prediction 2: Imminent Career Breakthrough or Role Expansion',
          'Prediction 3: Financial Windfall & Lucrative Abundance Pathway',
          'Prediction 4: Hidden Truth or Secret Revealed to You',
          'Prediction 5: Crucial Relocation, Travel, or Home Upgrade',
          'Prediction 6: Dissolution of an Exhausting Toxic Tether',
          'Prediction 7: Unexpected Gift, Synchronicity, or Cosmic Blessing',
          'Prediction 8: Long-Term Spiritual Mastery & Highest Trajectory',
        ],
      },
    ],
  },

  // Topic 8: Career & Job Reading
  8: {
    id: 8,
    title: 'Career & Job Reading',
    headline: 'IN-DEPTH CAREER & JOB TAROT READING',
    categoryType: 'career_job',
    description: 'Strategic psychic insight into professional growth, workplace dynamics, and promotions.',
    pdfSectionTitle: 'PROFESSIONAL DESTINY & CAREER ELEVATION MATRIX',
    customFields: [
      {
        key: 'careerField',
        label: 'Current Career Field / Job Title',
        type: 'text',
        placeholder: 'e.g. Senior Product Designer in Tech, Freelance Artist, Nurse',
      },
      {
        key: 'careerGoal',
        label: 'Primary Career Goal or Dilemma',
        type: 'text',
        placeholder: 'e.g. Should I leave for a new opportunity, Promotion timeline, Starting my business',
      },
    ],
  },

  // Topic 9: Life Compass & Path
  9: {
    id: 9,
    title: 'Life Compass & Path',
    headline: 'DETAILED LIFE COMPASS PSYCHIC READING',
    categoryType: 'life_compass',
    description: 'High-level soul navigation aligning your decisions with cosmic destiny.',
    pdfSectionTitle: 'SACRED SOUL COMPASS & DESTINY NAVIGATION',
    customFields: [
      {
        key: 'careerGoal',
        label: 'Major Life Crossroads you are facing',
        type: 'text',
        placeholder: 'e.g. Choosing between two distinct paths, feeling called to a new purpose',
      },
    ],
  },

  // Topic 10: Blind Reading (Name Only)
  10: {
    id: 10,
    title: "Blind Reading (Name Only)",
    headline: "DON'T TELL ME ANYTHING JUST YOUR NAME",
    categoryType: 'blind_reading',
    description: 'Pure psychic channeling using only your birth blueprint and name—no questions asked.',
    pdfSectionTitle: 'PURE INTUITIVE CHANNELING (BLIND ORACLE)',
    customFields: [],
  },

  // Topic 11: Brutal / No Sugar Coating
  11: {
    id: 11,
    title: 'Brutal / No Sugar Coating',
    headline: 'BRUTAL TAROT READING',
    categoryType: 'brutal_truth',
    description: 'Direct, unflinching, unfiltered psychic truths to shake off illusion and stagnation.',
    pdfSectionTitle: 'UNFILTERED HARD TRUTHS & REALITY ILLUMINATION',
    customFields: [
      {
        key: 'blockageDetails',
        label: 'Where have you been making excuses or feeling stuck?',
        type: 'text',
        placeholder: 'e.g. Tolerating lukewarm treatment, delaying my real purpose',
      },
    ],
  },

  // Topic 12: 3 Hidden Truths
  12: {
    id: 12,
    title: '3 Hidden Truths',
    headline: '3 HIDDEN TRUTHS PSYCHIC READING',
    categoryType: 'three_truths',
    description: 'Three veiled truths operating in the shadows of your current reality.',
    pdfSectionTitle: '3 VEILED TRUTHS OPERATING IN THE SHADOWS',
    customFields: [
      {
        key: 'hiddenTruthFocus',
        label: '3 Truth Exploration Focuses',
        type: 'list',
        maxItems: 3,
        defaultItems: [
          'Truth 1: What you are subconsciously refusing to admit to yourself',
          'Truth 2: What others or external forces are concealing from you',
          'Truth 3: What the universe is secretly preparing behind the scenes',
        ],
      },
    ],
  },

  // Topic 13: Meet Your Spirit Guides
  13: {
    id: 13,
    title: 'Meet Your Spirit Guides',
    headline: 'MEET YOUR SPIRIT GUIDES',
    categoryType: 'spirit_guides',
    description: 'Connect with your primary guide, their lineage, messages, and synchronicities.',
    pdfSectionTitle: 'SPIRIT GUIDE COMMUNION & CELESTIAL GUIDANCE',
    customFields: [
      {
        key: 'spiritGuideFocus',
        label: 'Specific guidance or sign you have been noticing?',
        type: 'text',
        placeholder: 'e.g. Seeing 11:11, feathers, feeling a comforting presence during meditation',
      },
    ],
  },

  // Topic 14: Past Life Reading
  14: {
    id: 14,
    title: 'Past Life Reading',
    headline: 'PAST LIFE PSYCHIC READING',
    categoryType: 'past_life',
    description: 'Uncovers previous incarnations, unresolved karmic debts, and soul gifts carried forward.',
    pdfSectionTitle: 'AKASHIC RECORD & PAST LIFE INCARNATION REVELATION',
    customFields: [
      {
        key: 'pastLifeFocus',
        label: 'Any recurring unexplainable affinity, phobia, or dream?',
        type: 'text',
        placeholder: 'e.g. Deep connection to ancient Egypt/Celtic lands, fear of deep water, meeting people who feel instant familiar',
      },
    ],
  },

  // Topic 15: Energy Drain / Aura Scan
  15: {
    id: 15,
    title: 'Energy Drain / Aura Scan',
    headline: 'WHY DO YOU FEEL SO DRAINED?',
    categoryType: 'energy_drain',
    description: 'Aura diagnostic scanning for energy leaks, psychic vampires, and vitality depletion.',
    pdfSectionTitle: 'AURA SCAN & VITALITY LEAK DIAGNOSTIC',
    customFields: [
      {
        key: 'auraSymptoms',
        label: 'Physical or Emotional Drain Symptoms',
        type: 'text',
        placeholder: 'e.g. Heavy shoulders, brain fog, sudden exhaustion after meeting certain people',
      },
    ],
  },

  // Topic 16: Pet Psychic Reading
  16: {
    id: 16,
    title: 'Pet Psychic Reading',
    headline: 'PET PSYCHIC READING',
    categoryType: 'pet_reading',
    description: 'Psychic telepathic connection with your living or crossed-over pet companion.',
    pdfSectionTitle: 'TELEPATHIC PET COMMUNION & ANIMAL SOUL BOND',
    customFields: [
      {
        key: 'petName',
        label: "Pet's Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Milo, Luna, Bella',
      },
      {
        key: 'petSpecies',
        label: 'Animal Species & Breed',
        type: 'text',
        placeholder: 'e.g. Golden Retriever, Calico Cat, Rescue Dog',
      },
      {
        key: 'petAge',
        label: 'Pet Age / Life Stage',
        type: 'text',
        placeholder: 'e.g. 4 years old, Senior, In Spirit (Crossed Rainbow Bridge)',
      },
      {
        key: 'petConcern',
        label: 'Specific question or behavior for your pet',
        type: 'text',
        placeholder: 'e.g. Are they happy? Why are they anxious when I leave?',
      },
    ],
  },

  // Topic 17: Lost Item Psychic Reading
  17: {
    id: 17,
    title: 'Lost Item Psychic Reading',
    headline: 'LOST ITEM PSYCHIC READING',
    categoryType: 'lost_item',
    description: 'Remote psychic viewing to locate misplaced items, cardinal directions, and cues.',
    pdfSectionTitle: 'REMOTE VIEWING & LOST ITEM RECOVERY RADAR',
    customFields: [
      {
        key: 'lostItem',
        label: 'Name / Description of the Lost Item *',
        type: 'text',
        required: true,
        placeholder: 'e.g. Gold heirloom ring with emerald, Car key fob, Passport folder',
      },
      {
        key: 'lastSeen',
        label: 'Where and when did you last see it?',
        type: 'text',
        placeholder: 'e.g. On the bedside table on Tuesday morning, In my winter coat pocket',
      },
    ],
  },

  // Topic 18: 5 Custom Questions Reading
  18: {
    id: 18,
    title: '5 Custom Questions Reading',
    headline: '5 QUESTION PSYCHIC READING',
    categoryType: 'five_questions',
    description: 'Five custom inquiries answered in depth by the psychic oracle.',
    pdfSectionTitle: '5 SACRED CUSTOM INQUIRIES & ORACLE ANSWERS',
    customFields: [
      {
        key: 'customQuestions',
        label: 'Enter your 5 Specific Questions below:',
        type: 'list',
        maxItems: 5,
        defaultItems: [
          '1. What is the hidden lesson in my current situation?',
          '2. What energy should I embody to attract my desired outcome?',
          '3. What subconscious block do I need to release right now?',
          '4. How will I recognize the right path when it arrives?',
          '5. What is the ultimate potential of this journey?',
        ],
      },
    ],
  },

  // Topic 19: What’s Blocking Your Blessings / Evil Eye Reading
  19: {
    id: 19,
    title: "What’s Blocking Your Blessings / Evil Eye Reading",
    headline: "WHAT’S BLOCKING YOUR BLESSINGS?",
    categoryType: 'evil_eye_blessings',
    description: 'Diagnoses psychic jealousy, evil eye (mati), and spiritual blockades holding back fortune.',
    pdfSectionTitle: 'EVIL EYE DIAGNOSTIC & BLESSINGS CLEARING PROTOCOL',
    customFields: [
      {
        key: 'blockageDetails',
        label: 'Describe the pattern of blocked blessings you are sensing',
        type: 'text',
        placeholder: 'e.g. Things fall apart at the last second, sudden envy from peers, unexplained bad luck',
      },
    ],
  },

  // Topic 20: What’s Blocking Your Money Flow
  20: {
    id: 20,
    title: "What’s Blocking Your Money Flow",
    headline: "WHAT’S BLOCKING YOUR MONEY FLOW?",
    categoryType: 'money_flow',
    description: 'Pinpoints subconscious poverty loops, money karma, and opening the floodgates of wealth.',
    pdfSectionTitle: 'WEALTH CODE ALIGNMENT & MONEY KARMA CLEARING',
    customFields: [
      {
        key: 'blockageDetails',
        label: 'Your Current Financial Goal or Obstacle',
        type: 'text',
        placeholder: 'e.g. Money leaves as fast as it arrives, breaking past an income plateau',
      },
    ],
  },

  // Topic 21: What’s Blocking Your Love Life
  21: {
    id: 21,
    title: "What’s Blocking Your Love Life",
    headline: "WHAT’S BLOCKING YOUR LOVE LIFE?",
    categoryType: 'love_blocks',
    description: 'Clears heart chakra walls, past heartbreak residue, and pattern of unavailable partners.',
    pdfSectionTitle: 'HEART CHAKRA RESTORATION & LOVE BLOCKAGE RELEASE',
    customFields: [
      {
        key: 'blockageDetails',
        label: 'Recurring Love Patterns you want to break',
        type: 'text',
        placeholder: 'e.g. Attracting emotionally unavailable partners, fear of intimacy, repeating ex patterns',
      },
    ],
  },

  // Topic 22: What Is Their Karma For Hurting You?
  22: {
    id: 22,
    title: 'What Is Their Karma For Hurting You?',
    headline: 'WHAT IS THEIR KARMA?',
    categoryType: 'karma',
    description: 'Cosmic law and karmic boomerang analysis regarding someone who wronged or deceived you.',
    pdfSectionTitle: 'KARMIC RETRIBUTION & COSMIC JUSTICE SCAN',
    customFields: [
      {
        key: 'personName',
        label: "Person's Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Damon Sterling',
      },
      {
        key: 'relationshipStatus',
        label: 'Brief context of what occurred',
        type: 'text',
        placeholder: 'e.g. Betrayal of trust, ghosting after promises, financial deception',
      },
    ],
  },

  // Topic 23: Soul Lesson & Karmic Contract
  23: {
    id: 23,
    title: 'Soul Lesson & Karmic Contract',
    headline: 'WHAT IS YOUR SOUL LESSON?',
    categoryType: 'standard',
    description: 'The higher metaphysical purpose behind this painful or challenging life chapter.',
    pdfSectionTitle: 'SOUL CONTRACT & HIGHER INITIATION MATRIX',
    customFields: [
      {
        key: 'blockageDetails',
        label: 'The core relationship or trial you are questioning',
        type: 'text',
        placeholder: 'e.g. Why did this person enter my life? What is my spirit learning?',
      },
    ],
  },

  // Topic 24: What They Feel But Won't Say
  24: {
    id: 24,
    title: "What They Feel But Won't Say",
    headline: "WHAT THEY FEEL BUT WON'T SAY",
    categoryType: 'relationship_partner',
    description: 'Channeling the words left unspoken, hidden vulnerabilities, and internal conflict.',
    pdfSectionTitle: 'UNSPOKEN TRUTHS & HIDDEN CONFESSIONS MATRIX',
    customFields: [
      {
        key: 'personName',
        label: "Person's Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Julian Hayes',
      },
      {
        key: 'relationshipStatus',
        label: 'Current communication status',
        type: 'text',
        placeholder: 'e.g. Silent, Polite but distant, Superficial conversations',
      },
    ],
  },

  // Topic 25: How They See You (True Impression)
  25: {
    id: 25,
    title: 'How They See You (True Impression)',
    headline: 'HOW THEY SEE YOU?',
    categoryType: 'relationship_partner',
    description: 'Their raw psychological perception, subconscious respect, and fascination with your energy.',
    pdfSectionTitle: 'TRUE PERCEPTION & AURA IMPRESSION SCAN',
    customFields: [
      {
        key: 'personName',
        label: "Their Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Cassandra Stone',
      },
    ],
  },

  // Topic 26: What Is Hidden From You?
  26: {
    id: 26,
    title: 'What Is Hidden From You?',
    headline: 'WHAT IS HIDDEN FROM YOU?',
    categoryType: 'standard',
    description: 'Lifts the veil on behind-the-scenes movements, unspoken alliances, and hidden truths.',
    pdfSectionTitle: 'VEILED CURRENTS & CLANDESTINE DYNAMICS REVEALED',
    customFields: [
      {
        key: 'blockageDetails',
        label: 'What area of life feels mysterious or ambiguous right now?',
        type: 'text',
        placeholder: 'e.g. At work, within my family circle, in my romantic situation',
      },
    ],
  },

  // Topic 27: Energy Cord Cutting Ritual & Reading
  27: {
    id: 27,
    title: 'Energy Cord Cutting Ritual & Reading',
    headline: 'ENERGY CORD CUTTING',
    categoryType: 'cord_cutting',
    description: 'Severing etheric cords of attachment, psychic entanglement, and soul reclamation.',
    pdfSectionTitle: 'ETHERIC CORD CUTTING & PSYCHIC DETACHMENT PROTOCOL',
    customFields: [
      {
        key: 'personName',
        label: "Name of Person/Entity to Sever Cords With *",
        type: 'text',
        required: true,
        placeholder: 'e.g. An ex-partner, toxic former friend, past employer',
      },
      {
        key: 'relationshipStatus',
        label: 'Nature of the lingering emotional attachment',
        type: 'text',
        placeholder: 'e.g. Constant uninvited thoughts, guilt, feeling their heavy energy',
      },
    ],
  },

  // Topic 28: Energy Reset & Soul Detox
  28: {
    id: 28,
    title: 'Energy Reset & Soul Detox',
    headline: 'ENERGY RESET & SOUL DETOX',
    categoryType: 'energy_reset',
    description: 'A complete 7-chakra reset, clearing accumulated psychic sludge and energetic fatigue.',
    pdfSectionTitle: '7-CHAKRA ENERGETIC RESET & SOUL DETOX BLUEPRINT',
    customFields: [
      {
        key: 'detoxIntention',
        label: 'Primary Intention for this Spiritual Reset',
        type: 'text',
        placeholder: 'e.g. Reclaim mental peace, restart my life after a heavy phase, restore vibrant energy',
      },
    ],
  },

  // Topic 29: Third Eye Psychic Reading
  29: {
    id: 29,
    title: 'Third Eye Psychic Reading',
    headline: 'THIRD EYE PSYCHIC READING',
    categoryType: 'third_eye',
    description: 'Awakening your innate clairvoyance, pineal gland frequency, and spiritual visions.',
    pdfSectionTitle: 'THIRD EYE AWAKENING & CLAIR-SENSES ACTIVATION',
    customFields: [
      {
        key: 'thirdEyeFocus',
        label: 'Which intuitive ability are you feeling called to strengthen?',
        type: 'text',
        placeholder: 'e.g. Clairvoyance (inner visions), Clairsentience (feeling energy), Claircognizance (knowing)',
      },
    ],
  },

  // Topic 30: Dream Message Revealed
  30: {
    id: 30,
    title: 'Dream Message Revealed',
    headline: 'DREAM MESSAGE REVEALED',
    categoryType: 'dream_message',
    description: 'Astral plane decoding of symbolic dreams, prophetic warnings, and spiritual visits.',
    pdfSectionTitle: 'ASTRAL DREAM DECODING & SUBCONSCIOUS MESSAGES',
    customFields: [
      {
        key: 'dreamDescription',
        label: 'Describe your Dream or Recurring Astral Experience *',
        type: 'textarea',
        required: true,
        placeholder: 'e.g. I was standing by a stormy sea and an owl flew down holding a golden key...',
      },
      {
        key: 'dreamSymbols',
        label: 'Key Symbols, Colors, or Feelings from the Dream',
        type: 'text',
        placeholder: 'e.g. Ocean, owl, gold key, feeling peaceful despite the storm',
      },
    ],
  },

  // Topic 31: What Is Your Pet Not Telling You?
  31: {
    id: 31,
    title: 'What Is Your Pet Not Telling You?',
    headline: "WHAT CAN'T MY PET TELL ME?",
    categoryType: 'pet_reading',
    description: 'Unspoken desires, hidden anxieties, and soul secrets your pet companion carries.',
    pdfSectionTitle: 'PET SOUL SECRETS & UNSPOKEN TELEPATHIC CONFESSIONS',
    customFields: [
      {
        key: 'petName',
        label: "Pet's Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Oliver, Charlie, Bella',
      },
      {
        key: 'petSpecies',
        label: 'Animal Type & Breed',
        type: 'text',
        placeholder: 'e.g. Tabby Cat, German Shepherd, Rescue Parrot',
      },
      {
        key: 'petConcern',
        label: 'What behavior or mystery has your pet been showing?',
        type: 'text',
        placeholder: 'e.g. Staring at corners, acting extra clingy, changes in sleeping spots',
      },
    ],
  },

  // Topic 32: 10 Question Deep Dive Reading
  32: {
    id: 32,
    title: '10 Question Deep Dive Reading',
    headline: '10 QUESTION PSYCHIC READING',
    categoryType: 'ten_questions',
    description: 'Ten deep, comprehensive individual questions answered by the oracle.',
    pdfSectionTitle: '10 SACRED DEEP DIVE QUESTIONS & ORACLE ANSWERS',
    customFields: [
      {
        key: 'customQuestions',
        label: 'Enter your 10 Specific Deep-Dive Questions:',
        type: 'list',
        maxItems: 10,
        defaultItems: [
          '1. What is the hidden lesson in my current situation?',
          '2. What energy should I embody to attract my desired outcome?',
          '3. What subconscious block do I need to release right now?',
          '4. How will I recognize the right path when it arrives?',
          '5. What is the ultimate potential of this journey?',
          '6. What is the true energetic intention of those around me?',
          '7. What impending financial or career breakthrough is forming?',
          '8. What spiritual protection or guide is watching over me?',
          '9. What major milestone will arrive within the next 6 months?',
          '10. What final advice does the universe have for my soul peace?',
        ],
      },
    ],
  },
};

export const getCategorySpecByTopic = (topic: string | number): CategorySpec => {
  if (typeof topic === 'number') {
    return CATEGORY_SPECS[topic] || CATEGORY_SPECS[1];
  }
  const clean = topic.toLowerCase().trim();
  const found = Object.values(CATEGORY_SPECS).find(
    (spec) =>
      spec.title.toLowerCase() === clean ||
      spec.headline.toLowerCase() === clean ||
      clean.includes(spec.title.toLowerCase()) ||
      clean.startsWith(`${spec.id}.`) ||
      clean.startsWith(`topic ${spec.id}`)
  );
  return found || CATEGORY_SPECS[1];
};
