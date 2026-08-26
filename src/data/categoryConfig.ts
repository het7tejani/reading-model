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
  suggestedProblem: string;
  suggestedQuestion: string;
  suggestedQuestions: string[];
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
    suggestedProblem: 'Navigating deep feelings and seeking to understand if our romantic connection is aligned for long-term soulmate union.',
    suggestedQuestion: 'What is the true soulmate frequency and long-term potential of our love connection?',
    suggestedQuestions: [
      'What is the true soulmate frequency connecting us?',
      'What are their deepest unspoken feelings toward me?',
      'What energetic block is preventing our full intimacy?',
      'What major romantic milestone will unfold within the next 3 to 6 months?',
      'What advice does the oracle have to magnetize healthy love?',
    ],
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
    suggestedProblem: 'Unsure of their authentic intentions and seeking to see beyond mixed signals and emotional distance.',
    suggestedQuestion: 'What are their exact thoughts, subconscious feelings, and true intentions toward me right now?',
    suggestedQuestions: [
      'What are they consciously thinking about me when we are apart?',
      'What subconscious feelings are they suppressing out of fear?',
      'How do they perceive our energetic connection?',
      'What action are they secretly planning to take next?',
      'What is the most empowering way for me to respond to their energy?',
    ],
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
    suggestedProblem: 'Caught in an ambiguous, unlabelled dynamic without clear commitment and tired of waiting in limbo.',
    suggestedQuestion: 'Where is this situationship truly heading and what will their next moves be?',
    suggestedQuestions: [
      'Why are they holding back from defining this relationship?',
      'Are they seeing or entertaining other options?',
      'Will this situationship evolve into a committed partnership?',
      'What is their next physical move or communication toward me?',
      'Should I set a firm ultimatum or walk away for my own peace?',
    ],
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
    suggestedProblem: 'Experiencing separation or no-contact and wondering if there will be a genuine reconciliation.',
    suggestedQuestion: 'Will they come back to me, and what must change for a healthy reunion?',
    suggestedQuestions: [
      'Do they miss me and regret the separation?',
      'Will they initiate contact and reach out first?',
      'What is the realistic timeline for their return?',
      'If they return, will the dynamic be healed or repeat old patterns?',
      'How can I reclaim my sovereignty and emotional peace while waiting?',
    ],
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
    suggestedProblem: 'Anticipating a major life transition and needing precise cosmic timing and seasonal windows.',
    suggestedQuestion: 'What is the exact timing and astrological window for this breakthrough to manifest?',
    suggestedQuestions: [
      'In which month or season will this major event occur?',
      'What astrological transit or lunar phase will act as the catalyst?',
      'What needs to happen energetically before the door opens?',
      'Is there any delay or resistance I can actively clear right now?',
      'What signs or synchronicities will announce its arrival?',
    ],
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
    suggestedProblem: 'Seeking a complete 12-month energetic roadmap to prepare for forthcoming opportunities, challenges, and blessings.',
    suggestedQuestion: 'What are the major themes, milestones, and soul lessons for each of my next 12 months?',
    suggestedQuestions: [
      'What are the major breakthroughs awaiting me over the next 12 months?',
      'Which month holds the greatest financial and career elevation?',
      'Which month brings the most transformative romantic developments?',
      'What recurring karmic cycle will I permanently graduate from this year?',
      'How can I maximize my highest timeline over the upcoming 12 months?',
    ],
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
    suggestedProblem: 'Desiring a comprehensive psychic reveal of the top 8 pivotal events destined for my path.',
    suggestedQuestion: 'What are the 8 sacred future predictions and destiny milestones awaiting me?',
    suggestedQuestions: [
      'What are the 8 key future predictions destined to unfold in my life?',
      'What unexpected windfall or cosmic blessing is heading my way?',
      'What hidden truth will soon come to light?',
      'What major relationship milestone is written in my destiny?',
      'What career or soul expansion will completely redefine my lifestyle?',
    ],
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
    suggestedProblem: 'Feeling unfulfilled or standing at a pivotal crossroads regarding job growth, recognition, or a new career venture.',
    suggestedQuestion: 'What is the highest trajectory for my career, and when will my next professional breakthrough occur?',
    suggestedQuestions: [
      'Should I stay in my current job or transition to a new opportunity?',
      'When will I receive the financial raise, promotion, or recognition I deserve?',
      'What hidden workplace dynamics or rivalries should I be mindful of?',
      'Is it the right time to launch my own business or creative project?',
      'What is my true soul purpose and legacy in the professional realm?',
    ],
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
    suggestedProblem: 'Feeling adrift or questioning my life direction, purpose, and spiritual calling.',
    suggestedQuestion: 'What is my true soul mission, and which path will lead to my greatest fulfillment?',
    suggestedQuestions: [
      "What is my soul's highest purpose in this incarnation?",
      'Which crossroads option aligns with my authentic destiny?',
      'What dormant spiritual gifts or talents am I ready to awaken?',
      'What old identity or self-limiting belief must I shed immediately?',
      'What daily practices will keep me anchored in divine alignment?',
    ],
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
    suggestedProblem: 'Pure energetic channeling based on name and birth vibration without prior hints or context.',
    suggestedQuestion: 'What does the universe urgently need to reveal to me right now?',
    suggestedQuestions: [
      'What does the universe urgently need me to know today?',
      'What is the dominant energy surrounding my auric field?',
      'What unseen shifts are happening behind the scenes in my favor?',
      'What blindspot am I ignoring that requires immediate attention?',
      'What blessing is coming into my life within the next 30 days?',
    ],
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
    suggestedProblem: 'Tired of illusions, excuses, and comfortable lies—seeking the raw, unfiltered truth of my situation.',
    suggestedQuestion: 'What is the brutal, unfiltered reality of my situation that I have been avoiding?',
    suggestedQuestions: [
      'What hard truth am I refusing to accept about this situation?',
      'Where am I actively sabotaging my own peace and progress?',
      'What is someone really doing or thinking that I am making excuses for?',
      'What will happen if I continue on my current trajectory without change?',
      'What drastic, courageous action must I take immediately to save myself?',
    ],
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
    suggestedProblem: 'Sensing that vital information is concealed beneath the surface and seeking psychic revelation.',
    suggestedQuestion: 'What are the 3 veiled truths operating in the shadows of my life right now?',
    suggestedQuestions: [
      'What is the first hidden truth regarding my personal self-deception?',
      'What is the second hidden truth regarding what others are concealing?',
      'What is the third hidden truth regarding the universe\'s secret plan?',
      'How will the revelation of these truths alter my path?',
      'What protection should I establish once the veil is lifted?',
    ],
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
    suggestedProblem: 'Longing to establish a direct, conscious connection with my spiritual guides and ancestral allies.',
    suggestedQuestion: 'Who are my primary spirit guides, and what sacred message do they have for me?',
    suggestedQuestions: [
      'Who is my primary guardian guide and what is their lineage/energy?',
      'What signs, numbers, or synchronicities are they using to communicate with me?',
      'What specific warning or encouragement are they imparting today?',
      'How can I strengthen my daily telepathic communication with them?',
      'What sacred mission did we agree to accomplish together before incarnating?',
    ],
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
    suggestedProblem: 'Carrying unexplained phobias, recurring relationship patterns, and soul affinities with ancient times.',
    suggestedQuestion: 'What past life incarnation is directly influencing my present circumstances and karma?',
    suggestedQuestions: [
      'Where and when was my most influential past life incarnation?',
      'What karmic debt or vows did I carry forward into this lifetime?',
      'How is my current relationship connected to a past life soul contract?',
      'What master skill or gift did I develop in that past life that I can use now?',
      'How can I permanently clear the karmic residue of that past life trauma?',
    ],
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
    suggestedProblem: 'Feeling persistently exhausted, drained after social interactions, and burdened by heavy energetic residue.',
    suggestedQuestion: 'What or who is draining my life force energy, and how can I repair my aura?',
    suggestedQuestions: [
      'Where is the primary energetic leak located in my auric field?',
      'Is a specific person, environment, or thought pattern acting as an energy vampire?',
      'What psychic cords need to be severed immediately?',
      'How can I seal my aura and create an impenetrable spiritual shield?',
      'What daily ritual will quickly restore my physical and mental vitality?',
    ],
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
    suggestedProblem: 'Desiring to deeply understand my beloved pet\'s thoughts, emotional well-being, and soul purpose.',
    suggestedQuestion: 'What is my pet trying to tell me, and how can I best support their happiness and comfort?',
    suggestedQuestions: [
      'How does my pet truly feel about their home, routine, and our connection?',
      'Are they carrying any physical discomfort or emotional anxiety?',
      'What was our soul contract before meeting in this physical life?',
      'What message do they want to give me that they cannot speak aloud?',
      'If crossed over: How are they experiencing the spirit realm and are they near me?',
    ],
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
    suggestedProblem: 'Misplaced an important item and seeking remote viewing guidance on its location and retrieval.',
    suggestedQuestion: 'Where is my lost item located, and what clues will lead to its recovery?',
    suggestedQuestions: [
      'What room, cardinal direction, or environment is the lost item located in?',
      'What colors, materials, or objects are surrounding it right now?',
      'Is it inside my immediate home/vehicle or at an external location?',
      'Was it moved, covered, or accidentally discarded?',
      'What specific steps will bring it back into my hands quickly?',
    ],
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
    suggestedProblem: 'Seeking answers to 5 specific, tailored life questions with complete psychic precision.',
    suggestedQuestion: 'What are the in-depth psychic answers to my 5 sacred life questions?',
    suggestedQuestions: [
      'What is the hidden lesson in my current situation?',
      'What energy should I embody to attract my desired outcome?',
      'What subconscious block do I need to release right now?',
      'How will I recognize the right path when it arrives?',
      'What is the ultimate potential of this journey?',
    ],
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
    suggestedProblem: 'Feeling as though a wall of envy, negative eye, or spiritual blockade is hindering my blessings.',
    suggestedQuestion: 'What spiritual blockage or evil eye is obstructing my blessings, and how do I clear it?',
    suggestedQuestions: [
      'Is someone projecting envy, jealousy, or malicious intent toward my life?',
      'Where in my life is the spiritual blockade causing the most disruption?',
      'How can I cleanse and repel the evil eye (mati) from my home and aura?',
      'What ritual or talisman will reverse this stagnant energy back to light?',
      'What major blessing will immediately flood in once the blockade is cleared?',
    ],
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
    suggestedProblem: 'Experiencing financial stress, income plateaus, or unexplained expenses draining wealth.',
    suggestedQuestion: 'What subconscious or energetic barrier is restricting my financial abundance and wealth flow?',
    suggestedQuestions: [
      'What ancestral money wound or poverty narrative am I unconsciously holding?',
      'What specific habit or mindset is repelling financial overflow?',
      'When and how will my next major financial breakthrough occur?',
      'What lucrative opportunity or income stream is waiting for my activation?',
      'What daily abundance ritual will permanently rewire my money magnet?',
    ],
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
    suggestedProblem: 'Struggling with heartbreak, unavailable partners, or fear of opening my heart to true intimacy.',
    suggestedQuestion: 'What emotional barrier is blocking love, and how do I magnetize a reciprocal soulmate?',
    suggestedQuestions: [
      'What past heartbreak residue is still lingering in my heart chakra?',
      'Why have I been attracting emotionally unavailable or inconsistent partners?',
      'How can I heal my inner child to feel worthy of unconditional love?',
      'What qualities will my true, aligned soulmate possess when they arrive?',
      'What energetic shift will open the floodgates to passionate, lasting romance?',
    ],
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
    suggestedProblem: 'Deeply wounded by someone\'s betrayal, lies, or abandonment and seeking cosmic justice.',
    suggestedQuestion: 'What is the karmic consequence for what they did to me, and how is divine justice unfolding?',
    suggestedQuestions: [
      'Do they feel guilt or remorse for the pain they inflicted on me?',
      'What karmic lessons and boomerang consequences are unfolding in their life?',
      'Are they facing the exact mirror of what they put me through?',
      'How can I fully release the energetic tether to their karma and find peace?',
      'What divine reward and blessing is the universe preparing for me in return?',
    ],
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
    suggestedProblem: 'Questioning why a painful trial or intense connection occurred and what my soul must learn.',
    suggestedQuestion: 'What was the higher soul contract and spiritual lesson behind this life experience?',
    suggestedQuestions: [
      'What sacred agreement did our souls make before entering this lifetime?',
      'What core spiritual virtue (boundaries, self-worth, courage) did this trial ignite?',
      'Have I completed this karmic cycle, or is there a final test to pass?',
      'How can I thank the experience for the wisdom while releasing the pain?',
      'What higher level of spiritual sovereignty is now accessible to me?',
    ],
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
    suggestedProblem: 'Sensing unexpressed depth, unspoken confessions, and hidden pride in someone\'s silence.',
    suggestedQuestion: 'What are the exact words and confessions they feel in their heart but refuse to say?',
    suggestedQuestions: [
      'What is the raw truth they are too proud or afraid to speak out loud?',
      'What do they confess to themselves in late-night moments of vulnerability?',
      'Why are they maintaining this silence or emotional distance?',
      'Will they eventually break their silence and tell me how they feel?',
      'What is the energetic truth between our souls that words cannot convey?',
    ],
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
    suggestedProblem: 'Curious about how someone genuinely views my presence, character, attractiveness, and worth.',
    suggestedQuestion: 'What is their true psychological perception, impression, and attraction toward me?',
    suggestedQuestions: [
      'What was their immediate first impression when they first met me?',
      'What qualities about my aura, mind, or physical presence captivate them most?',
      'Do they view me as out of their league or intimidating in any way?',
      'How do they describe me when speaking to their closest confidants?',
      'What do they find unforgettable about our interactions?',
    ],
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
    suggestedProblem: 'Feeling that significant moves, secrets, or behind-the-scenes dynamics are kept from my view.',
    suggestedQuestion: 'What critical truth or hidden development is currently concealed from my knowledge?',
    suggestedQuestions: [
      'What is someone deliberately keeping secret or concealing from me?',
      'What unseen opportunities or moves are taking place in my favor?',
      'What hidden motive should I be aware of in my social or professional circle?',
      'How will this hidden truth be revealed, and when?',
      'How can I position myself to stay protected and victorious?',
    ],
    pdfSectionTitle: 'VEILED CURRENTS & CLANDESTINE DYNAMICS REVEALED',
    customFields: [
      {
        key: 'blockageDetails',
        label: 'Specific situation or group you suspect secrets around',
        type: 'text',
        placeholder: 'e.g. Family inheritance, Workplace reorganization, Partner\'s social circle',
      },
    ],
  },

  // Topic 27: Energy Cord Cutting Ritual & Reading
  27: {
    id: 27,
    title: 'Energy Cord Cutting Ritual & Reading',
    headline: 'ENERGY CORD CUTTING',
    categoryType: 'cord_cutting',
    description: 'Etheric cord severance to reclaim life force from past lovers, toxic friends, or family.',
    suggestedProblem: 'Feeling drained by persistent etheric cords attached to an ex, former friend, or toxic dynamic.',
    suggestedQuestion: 'How can I permanently sever energetic cords to reclaim my life force and sovereignty?',
    suggestedQuestions: [
      'Where are the etheric cords anchored in my chakras and energy field?',
      'What energetic hooks is this person still trying to send to me?',
      'What specific cord-cutting ritual will sever this connection permanently?',
      'How can I seal my aura so no past energy can reattach?',
      'What immediate lightness and revitalization will I experience post-severance?',
    ],
    pdfSectionTitle: 'ETHERIC CORD SEVERANCE & AURIC RESTORATION',
    customFields: [
      {
        key: 'personName',
        label: 'Name of person/situation to cut cords with *',
        type: 'text',
        required: true,
        placeholder: 'e.g. Ryan Scott',
      },
      {
        key: 'relationshipStatus',
        label: 'Nature of the connection you are severing',
        type: 'text',
        placeholder: 'e.g. Ex-fiancé, Narcissistic former business partner, Toxic friendship',
      },
    ],
  },

  // Topic 28: Energy Reset & Soul Detox
  28: {
    id: 28,
    title: 'Energy Reset & Soul Detox',
    headline: 'ENERGY RESET & SOUL DETOX',
    categoryType: 'energy_reset',
    description: 'Total spiritual purification, chakra alignment, and shedding spiritual stagnation.',
    suggestedProblem: 'Overwhelmed by energetic sludge, chronic burnout, and needing a complete soul rejuvenation.',
    suggestedQuestion: 'What comprehensive soul detox protocol will purge stagnation and reset my vitality?',
    suggestedQuestions: [
      'What heavy frequencies or stagnant emotions are clogging my chakra system?',
      'What environmental or dietary factors are contributing to this energetic buildup?',
      'What 7-day spiritual cleanse protocol will reset my frequency?',
      'How can I cultivate pristine mental and emotional boundaries moving forward?',
      'What higher vibration will become my new baseline after this reset?',
    ],
    pdfSectionTitle: 'CHAKRA PURIFICATION & SOUL DETOX BLUEPRINT',
    customFields: [
      {
        key: 'auraSymptoms',
        label: 'What heavy energy or fatigue are you looking to shed?',
        type: 'text',
        placeholder: 'e.g. Feeling stuck in a rut, spiritual burnout, emotional heaviness',
      },
    ],
  },

  // Topic 29: Third Eye Psychic Reading
  29: {
    id: 29,
    title: 'Third Eye Psychic Reading',
    headline: 'THIRD EYE PSYCHIC READING',
    categoryType: 'third_eye',
    description: 'Awakening intuitive vision, clairvoyance, and psychic perceptions.',
    suggestedProblem: 'Desiring to activate clairvoyance, expand intuitive vision, and decode psychic messages.',
    suggestedQuestion: 'What psychic visions, prophetic insights, and third eye activations are opening for me?',
    suggestedQuestions: [
      'What stage of activation is my pineal gland / third eye chakra currently in?',
      'What psychic gifts (clairvoyance, clairsentience, clairaudience) are emerging?',
      'What prophetic vision about my future is trying to break through?',
      'What daily meditation or frequency practice will sharpen my psychic sight?',
      'How can I trust my intuitive downloads without second-guessing myself?',
    ],
    pdfSectionTitle: 'PINEAL AWAKENING & CLAIRVOYANT VISION MATRIX',
    customFields: [
      {
        key: 'spiritGuideFocus',
        label: 'Any intuitive downloads, visions, or tingling in third eye?',
        type: 'text',
        placeholder: 'e.g. Pressure between eyebrows, sudden accurate gut feelings, vivid dreams',
      },
    ],
  },

  // Topic 30: Dream Message Revealed
  30: {
    id: 30,
    title: 'Dream Message Revealed',
    headline: 'DREAM MESSAGE REVEALED',
    categoryType: 'dream_message',
    description: 'Astral interpretation decoding symbolic dreams, nocturnal visits, and spirit messages.',
    suggestedProblem: 'Had a powerful, cryptic, or recurring dream and seeking to decode its astral message.',
    suggestedQuestion: 'What is the prophetic meaning, subconscious warning, and cosmic message of my dream?',
    suggestedQuestions: [
      'What was the core archetypal message encoded in this dream?',
      'Was this an astral visitation, past life memory, or prophetic warning?',
      'What subconscious emotion was my spirit attempting to process and release?',
      'What waking-life action is the dream urging me to take immediately?',
      'What recurring symbols should I watch for in upcoming dreams?',
    ],
    pdfSectionTitle: 'ASTRAL DECODING & DREAM SYMBOLISM MATRIX',
    customFields: [
      {
        key: 'dreamDescription',
        label: 'Describe your dream in detail *',
        type: 'textarea',
        required: true,
        placeholder: 'e.g. I was standing in a flooded library with a white owl perched on my shoulder...',
      },
      {
        key: 'dreamSymbols',
        label: 'Key symbols, people, or emotions present in the dream',
        type: 'text',
        placeholder: 'e.g. Water, Owls, An ex-partner, Feeling peaceful but urgent',
      },
    ],
  },

  // Topic 31: What Is Your Pet Not Telling You?
  31: {
    id: 31,
    title: 'What Is Your Pet Not Telling You?',
    headline: "WHAT CAN'T MY PET TELL ME?",
    categoryType: 'pet_reading',
    description: 'Unfiltered animal telepathy uncovering hidden quirks, unspoken wishes, and soul messages.',
    suggestedProblem: 'Sensing an unspoken shift in my pet\'s mood, habits, or spiritual connection with me.',
    suggestedQuestion: 'What secret feelings, unspoken needs, and telepathic messages is my pet holding back?',
    suggestedQuestions: [
      'What is my pet\'s true emotional state and secret feelings toward our household?',
      'Is there an unseen anxiety, discomfort, or environmental stressor bothering them?',
      'What do they perceive in our home that human eyes cannot see?',
      'What special bond or healing role do they play in my daily life?',
      'What simple change in our routine would make them feel most adored and secure?',
    ],
    pdfSectionTitle: 'ANIMAL TELEPATHY & UNFILTERED PET CONFESSIONS',
    customFields: [
      {
        key: 'petName',
        label: "Pet's Name *",
        type: 'text',
        required: true,
        placeholder: 'e.g. Oliver, Cleo, Buster',
      },
      {
        key: 'petSpecies',
        label: 'Pet Breed / Animal Type',
        type: 'text',
        placeholder: 'e.g. Tabby Cat, German Shepherd, Parrot',
      },
      {
        key: 'petConcern',
        label: 'Any specific behavior, food preference, or habit you wonder about?',
        type: 'text',
        placeholder: 'e.g. Why they stare at corners, why they suddenly stopped sleeping in my bed',
      },
    ],
  },

  // Topic 32: 10 Question Deep Dive Reading
  32: {
    id: 32,
    title: '10 Question Deep Dive Reading',
    headline: '10 QUESTION PSYCHIC READING',
    categoryType: 'ten_questions',
    description: 'Comprehensive 10-point psychic master reading answering every vital facet of your reality.',
    suggestedProblem: 'Seeking an exhaustive, masterclass psychic consultation addressing all 10 critical life domains.',
    suggestedQuestion: 'What is the complete psychic revelation across all 10 major inquiries of my life?',
    suggestedQuestions: [
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
    pdfSectionTitle: '10 COMPREHENSIVE PSYCHIC INQUIRIES & REVELATIONS',
    customFields: [
      {
        key: 'customQuestions',
        label: 'Review and Customize your 10 Questions below:',
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
  // Check if browser environment has custom categories or overrides saved
  if (typeof window !== 'undefined') {
    try {
      const rawCustom = localStorage.getItem('tarot_custom_categories_v1');
      const rawOverrides = localStorage.getItem('tarot_category_overrides_v1');
      const customCategories: Record<number | string, CategorySpec> = rawCustom ? JSON.parse(rawCustom) : {};
      const categoryOverrides: Record<number, Partial<CategorySpec>> = rawOverrides ? JSON.parse(rawOverrides) : {};

      if (typeof topic === 'number') {
        if (customCategories[topic]) return customCategories[topic];
        if (CATEGORY_SPECS[topic]) {
          return categoryOverrides[topic]
            ? { ...CATEGORY_SPECS[topic], ...categoryOverrides[topic] }
            : CATEGORY_SPECS[topic];
        }
      }

      const clean = String(topic)
        .trim()
        .toLowerCase()
        .replace(/^topic\s*\d+[:.\s]*/i, '')
        .replace(/^\d+[\.\)]\s*/, '');

      // Check in custom categories first
      const foundCustom = Object.values(customCategories).find((spec) => {
        return (
          spec.title.toLowerCase().includes(clean) ||
          clean.includes(spec.title.toLowerCase()) ||
          spec.headline.toLowerCase().includes(clean) ||
          clean.includes(spec.headline.toLowerCase())
        );
      });
      if (foundCustom) return foundCustom;

      // Check in built-in categories with overrides
      const foundBuiltIn = Object.values(CATEGORY_SPECS).find((spec) => {
        return (
          spec.title.toLowerCase().includes(clean) ||
          clean.includes(spec.title.toLowerCase()) ||
          spec.headline.toLowerCase().includes(clean) ||
          clean.includes(spec.headline.toLowerCase())
        );
      });
      if (foundBuiltIn) {
        return categoryOverrides[foundBuiltIn.id]
          ? { ...foundBuiltIn, ...categoryOverrides[foundBuiltIn.id] }
          : foundBuiltIn;
      }
    } catch (e) {
      // Fall through to default built-ins if JSON parse failed
    }
  }

  if (typeof topic === 'number') {
    return CATEGORY_SPECS[topic] || CATEGORY_SPECS[1];
  }
  const clean = topic
    .trim()
    .toLowerCase()
    .replace(/^topic\s*\d+[:.\s]*/i, '')
    .replace(/^\d+[\.\)]\s*/, '');

  const found = Object.values(CATEGORY_SPECS).find((spec) => {
    return (
      spec.title.toLowerCase().includes(clean) ||
      clean.includes(spec.title.toLowerCase()) ||
      spec.headline.toLowerCase().includes(clean) ||
      clean.includes(spec.headline.toLowerCase())
    );
  });

  return found || CATEGORY_SPECS[1];
};
