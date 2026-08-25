export interface ReadingTopic {
  id: number;
  title: string;
  headline: string;
}

export const cleanTopicTitle = (topic: string): string => {
  if (!topic) return '';
  return topic
    .trim()
    .replace(/^topic\s*\d+[:.\s]*/i, '')
    .replace(/^\d+[\.\)]\s*/, '')
    .trim();
};

export const READING_TOPICS: ReadingTopic[] = [
  {
    id: 1,
    title: 'Deep Love Reading',
    headline: 'EXTREMELY DEEP LOVE PSYCHIC READING',
  },
  {
    id: 2,
    title: 'Exact Thoughts & Feelings',
    headline: 'EXACT THOUGHTS & FEELINGS READING',
  },
  {
    id: 3,
    title: 'Situationship & Next Moves',
    headline: 'SITUATIONSHIP STATUS & NEXT CHAPTER',
  },
  {
    id: 4,
    title: 'Will They Come Back?',
    headline: 'WILL THEY COME BACK TO ME?',
  },
  {
    id: 5,
    title: 'Exact Time Frame',
    headline: 'EXTREMELY EXACT TIME FRAME READING',
  },
  {
    id: 6,
    title: 'Next 12 Months Forecast',
    headline: 'NEXT 12 MONTH PREDICTIONS',
  },
  {
    id: 7,
    title: '8 Future Predictions',
    headline: '8 FUTURE PREDICTIONS',
  },
  {
    id: 8,
    title: 'Career & Job Reading',
    headline: 'IN-DEPTH CAREER & JOB TAROT READING',
  },
  {
    id: 9,
    title: 'Life Compass & Path',
    headline: 'DETAILED LIFE COMPASS PSYCHIC READING',
  },
  {
    id: 10,
    title: "Blind Reading (Name Only)",
    headline: "DON'T TELL ME ANYTHING JUST YOUR NAME",
  },
  {
    id: 11,
    title: 'Brutal / No Sugar Coating',
    headline: 'BRUTAL TAROT READING',
  },
  {
    id: 12,
    title: '3 Hidden Truths',
    headline: '3 HIDDEN TRUTHS PSYCHIC READING',
  },
  {
    id: 13,
    title: 'Meet Your Spirit Guides',
    headline: 'MEET YOUR SPIRIT GUIDES',
  },
  {
    id: 14,
    title: 'Past Life Reading',
    headline: 'PAST LIFE PSYCHIC READING',
  },
  {
    id: 15,
    title: 'Energy Drain / Aura Scan',
    headline: 'WHY DO YOU FEEL SO DRAINED?',
  },
  {
    id: 16,
    title: 'Pet Psychic Reading',
    headline: 'PET PSYCHIC READING',
  },
  {
    id: 17,
    title: 'Lost Item Psychic Reading',
    headline: 'LOST ITEM PSYCHIC READING',
  },
  {
    id: 18,
    title: '5 Custom Questions Reading',
    headline: '5 QUESTION PSYCHIC READING',
  },
  {
    id: 19,
    title: "What’s Blocking Your Blessings / Evil Eye Reading",
    headline: "WHAT’S BLOCKING YOUR BLESSINGS?",
  },
  {
    id: 20,
    title: "What’s Blocking Your Money Flow",
    headline: "WHAT’S BLOCKING YOUR MONEY FLOW?",
  },
  {
    id: 21,
    title: "What’s Blocking Your Love Life",
    headline: "WHAT’S BLOCKING YOUR LOVE LIFE?",
  },
  {
    id: 22,
    title: 'What Is Their Karma For Hurting You?',
    headline: 'WHAT IS THEIR KARMA?',
  },
  {
    id: 23,
    title: 'Soul Lesson & Karmic Contract',
    headline: 'WHAT IS YOUR SOUL LESSON?',
  },
  {
    id: 24,
    title: "What They Feel But Won't Say",
    headline: "WHAT THEY FEEL BUT WON'T SAY",
  },
  {
    id: 25,
    title: 'How They See You (True Impression)',
    headline: 'HOW THEY SEE YOU?',
  },
  {
    id: 26,
    title: 'What Is Hidden From You?',
    headline: 'WHAT IS HIDDEN FROM YOU?',
  },
  {
    id: 27,
    title: 'Energy Cord Cutting Ritual & Reading',
    headline: 'ENERGY CORD CUTTING',
  },
  {
    id: 28,
    title: 'Energy Reset & Soul Detox',
    headline: 'ENERGY RESET & SOUL DETOX',
  },
  {
    id: 29,
    title: 'Third Eye Psychic Reading',
    headline: 'THIRD EYE PSYCHIC READING',
  },
  {
    id: 30,
    title: 'Dream Message Revealed',
    headline: 'DREAM MESSAGE REVEALED',
  },
  {
    id: 31,
    title: 'What Is Your Pet Not Telling You?',
    headline: "WHAT CAN'T MY PET TELL ME?",
  },
  {
    id: 32,
    title: '10 Question Deep Dive Reading',
    headline: '10 QUESTION PSYCHIC READING',
  }
];

export const getTopicByTitleOrId = (identifier: string | number): ReadingTopic | undefined => {
  if (typeof identifier === 'number') {
    return READING_TOPICS.find(t => t.id === identifier);
  }
  const clean = cleanTopicTitle(identifier).toLowerCase();
  return READING_TOPICS.find(t => 
    t.title.toLowerCase() === clean || 
    t.headline.toLowerCase() === clean ||
    clean.startsWith(`${t.id}.`) ||
    t.title.toLowerCase().includes(clean)
  );
};
