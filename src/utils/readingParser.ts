export interface ParsedReadingData {
  mainHeadline: string;
  numerology: {
    math: string;
    coreParagraph: string;
    applicationParagraph: string;
  };
  cards: {
    card1: {
      name: string;
      keywords: string[];
      paragraphs: string[];
    };
    card2: {
      name: string;
      keywords: string[];
      paragraphs: string[];
    };
    card3: {
      name: string;
      keywords: string[];
      paragraphs: string[];
    };
  };
  synthesisParagraphs: string[];
  qaInsights: { question: string; answer: string }[];
  actionSteps: string[];
  mantras: string[];
  soulInquiries: string[];
  spiritualPrescription: {
    crystals: { name: string; description: string }[];
    botanicals: { name: string; description: string }[];
    mindfulness: { name: string; description: string }[];
  };
}

export const parseReadingMarkdown = (markdown: string, fallbackTopic?: string): ParsedReadingData => {
  const lines = markdown.split('\n');

  // Extract main headline (e.g. # EXTREMELY DEEP LOVE PSYCHIC READING)
  let mainHeadline = fallbackTopic || 'SACRED TAROT & NUMEROLOGY ORACLE';
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  if (h1Match) {
    mainHeadline = h1Match[1].trim();
  }

  // Split into sections by H2 (## )
  const sections: Record<string, string> = {};
  let currentHeader = '';
  let currentBuffer: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      if (currentHeader) {
        sections[currentHeader] = currentBuffer.join('\n').trim();
      }
      currentHeader = h2Match[1].toLowerCase().trim();
      currentBuffer = [];
    } else {
      currentBuffer.push(line);
    }
  }
  if (currentHeader) {
    sections[currentHeader] = currentBuffer.join('\n').trim();
  }

  // Find section by partial name
  const findSection = (keySub: string): string => {
    const foundKey = Object.keys(sections).find(k => k.includes(keySub.toLowerCase()));
    return foundKey ? sections[foundKey] : '';
  };

  // 1. Numerology
  const numRaw = findSection('numerology') || findSection('life path') || '';
  const numParagraphs = numRaw.split('\n\n').map(p => p.trim()).filter(p => p && !p.startsWith('#'));
  const mathLine = numParagraphs.find(p => p.includes('=') || p.includes('+')) || '';
  const cleanNumParagraphs = numParagraphs.filter(p => p !== mathLine && p.length > 30);

  const numerology = {
    math: mathLine || 'Life Path Calculation',
    coreParagraph: cleanNumParagraphs[0] || 'Your core vibration governs your inherent strengths, spiritual blueprint, and authentic purpose.',
    applicationParagraph: cleanNumParagraphs[1] || 'In your current circumstances, aligning with your sovereign vibration creates natural ease and dispels friction.'
  };

  // 2. 3-Card Energy Overview
  const cardsRaw = findSection('3-card') || findSection('energy overview') || findSection('cards') || '';
  const cardBlocks = cardsRaw.split(/###\s+/).filter(b => b.trim());

  const parseCardBlock = (block: string, defaultName: string) => {
    const bLines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const name = bLines[0]?.replace(/^Card \d+:\s*/i, '').replace(/^[0-9.]+\s*/, '') || defaultName;
    
    // Find keywords line
    const kwLine = bLines.find(l => l.toLowerCase().includes('keywords:') || l.toLowerCase().includes('**keywords**') || l.includes('•') || l.includes(','));
    let keywords: string[] = [];
    if (kwLine) {
      const cleanKw = kwLine.replace(/^[^:]*:\s*/, '').replace(/\*\*/g, '');
      keywords = cleanKw.split(/[,•|]/).map(k => k.trim()).filter(Boolean);
    }
    if (keywords.length === 0) {
      keywords = ['Intuition', 'Transformation', 'Clarity', 'Alignment', 'Sovereignty'];
    }

    // Extract paragraphs
    const paragraphs = block
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p && !p.startsWith('#') && !p.toLowerCase().includes('keywords:') && p.length > 40);

    return {
      name,
      keywords: keywords.slice(0, 7),
      paragraphs: [
        paragraphs[0] || `${name} reveals deep energetic currents moving beneath the surface of your conscious reality, bringing clarity and illuminated guidance.`,
        paragraphs[1] || `Embracing this insight allows you to navigate the path forward with grounded confidence, authentic trust, and emotional alignment.`
      ]
    };
  };

  const card1 = parseCardBlock(cardBlocks[0] || '', 'Card 1: Current Energy');
  const card2 = parseCardBlock(cardBlocks[1] || '', 'Card 2: The Blockage');
  const card3 = parseCardBlock(cardBlocks[2] || '', 'Card 3: Path Forward');

  // 3. Synthesis
  const synRaw = findSection('synthesis') || findSection('cosmic') || '';
  const synthesisParagraphs = synRaw
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p && !p.startsWith('#') && p.length > 30);

  // 4. Q&A Insights / Category Questions
  const qaRaw = findSection('q&a') || findSection('insights') || findSection('questions') || findSection('predictions') || findSection('forecast') || '';
  const qaParagraphs = qaRaw.split(/\n\n+/).filter(p => p.trim());
  const qaInsights: { question: string; answer: string }[] = [];

  // Robust parser for QA: handles "**Question?** \n Answer" or "### Question \n Answer" or "**Question:** Answer" or "1. **Question?** Answer"
  for (let i = 0; i < qaParagraphs.length; i++) {
    const block = qaParagraphs[i].trim();
    if (!block) continue;

    // Check if the block contains multiple questions separated by lines starting with bold or numbers
    const linesInBlock = block.split('\n').map(l => l.trim()).filter(Boolean);
    
    // If block starts with a question header and has body lines
    if (linesInBlock.length >= 2 && (linesInBlock[0].startsWith('**') || linesInBlock[0].startsWith('###') || linesInBlock[0].startsWith('*') || linesInBlock[0].match(/^\d+[\.\)]/))) {
      const qText = linesInBlock[0].replace(/^[\d.*#\-–—\)\s]+/, '').replace(/[*#]/g, '').trim();
      const aText = linesInBlock.slice(1).join(' ').replace(/^[*#\s]+/, '').trim();
      if (qText && aText && qText.length > 5 && aText.length > 10) {
        qaInsights.push({ question: qText, answer: aText });
        continue;
      }
    }

    // Check if single paragraph has **Question?** Answer or 1. **Question?** Answer
    const matchInline = block.match(/^(?:\d+[\.\)]\s*)?\*\*([^*]+)\*\*\s*[:\-–—]?\s*(.+)$/s);
    if (matchInline) {
      const qClean = matchInline[1].replace(/^[\d.\)\s]+/, '').trim();
      const aClean = matchInline[2].replace(/^[*#\s]+/, '').trim();
      if (qClean && aClean) {
        qaInsights.push({
          question: qClean,
          answer: aClean
        });
        continue;
      }
    }

    // Check if starts with ### or bold
    const qMatch = block.match(/^(###|\*\*|\d+[\.\)])\s*(.+?(\?|:|\*\*))\s*(.*)$/s);
    if (qMatch) {
      const qClean = qMatch[2].replace(/[*#]/g, '').replace(/^[\d.\)\s]+/, '').trim();
      const aClean = (qMatch[4] || '').replace(/^[*#\s]+/, '').trim();
      if (qClean && aClean && qClean.length > 5 && aClean.length > 10) {
        qaInsights.push({ question: qClean, answer: aClean });
        continue;
      }
    }
  }

  // Fallback Q&A if not parsed cleanly
  const isTenQTopic = (fallbackTopic && fallbackTopic.toLowerCase().includes('10 question')) || qaRaw.toLowerCase().includes('impending financial') || qaRaw.toLowerCase().includes('milestone');
  const defaultQA = isTenQTopic
    ? [
        {
          question: 'What is the hidden lesson in my current situation?',
          answer: 'The deeper spiritual lesson invites you to recognize that your emotional peace cannot remain conditional upon the validation or approval of others. This circumstance is actively teaching you how to anchor unconditional self-worth within your own center.'
        },
        {
          question: 'What energy should I embody to attract my desired outcome?',
          answer: 'You are called to embody open-hearted confidence and magnetic peace—approaching your daily decisions with joyful optimism and nervous-system reassurance.'
        },
        {
          question: 'What subconscious block do I need to release right now?',
          answer: 'You must gently release the deeply ingrained belief that choosing your own happiness leads to abandonment or conflict. You are worthy of sovereign clarity.'
        },
        {
          question: 'How will I recognize the right path when it arrives?',
          answer: 'The right path will announce itself through an immediate somatic release in your chest, effortless synchronicities, and transparent reciprocal communication.'
        },
        {
          question: 'What is the ultimate potential of this journey?',
          answer: 'The ultimate potential is stepping into profound emotional freedom, unshakeable sovereignty, flourishing alignment, and true inner sanctuary.'
        },
        {
          question: 'What is the true energetic intention of those around me?',
          answer: 'Those in your sphere are mirroring your internal boundaries. As you clarify what is sacred to you, authentic allies will step forward while misaligned ties dissolve.'
        },
        {
          question: 'What impending financial or career breakthrough is forming?',
          answer: 'A significant portal of abundance is unlocking as you honor your authentic voice and stop underselling your natural wisdom and sovereign skills.'
        },
        {
          question: 'What spiritual protection or guide is watching over me?',
          answer: 'Ancestral guides and divine guardians surround your aura with protective light, shielding your nervous system and guiding intuitive nudges.'
        },
        {
          question: 'What major milestone will arrive within the next 6 months?',
          answer: 'You will experience a definitive breakthrough in personal autonomy, celebrating a long-desired resolution and renewed emotional vitality.'
        },
        {
          question: 'What final advice does the universe have for my soul peace?',
          answer: 'Surrender the need to micromanage timing. Trust that universal reciprocity is meeting you at the exact elevation of your self-respect.'
        }
      ]
    : [
        {
          question: 'What is the hidden lesson in my current situation?',
          answer: 'The deeper spiritual lesson invites you to recognize that your emotional peace cannot remain conditional upon the validation, reactions, or approval of others. This circumstance is actively teaching you how to anchor unconditional self-worth within your own center, establishing compassionate boundaries that protect your peace while refusing to diminish your truth.'
        },
        {
          question: 'What energy should I embody to attract my desired outcome?',
          answer: 'You are called to embody the magnetic, luminous presence of open-hearted confidence—approaching your daily decisions and future vision with joyful optimism, relaxed nervous-system reassurance, and unwavering self-respect. When you move through the world expecting goodwill and reciprocal harmony, your vibrational field naturally calls forward the exact breakthroughs you desire.'
        },
        {
          question: 'What subconscious block do I need to release right now?',
          answer: 'You must gently release the exhausting, deeply ingrained narrative that you are responsible for fixing everyone else’s discomfort or that choosing your own happiness will lead to abandonment. Forgive yourself for the times you tolerated ambiguity, and release the instinct to over-analyze every detail out of fear of making a mistake.'
        },
        {
          question: 'How will I recognize the right path when it arrives?',
          answer: 'The right path will not create frantic mental urgency, defensive tension, or inner knotting; instead, it will announce itself through an immediate somatic release in your chest, a quiet exhale of relief, transparent communication, and synchronicities that flow effortlessly without forceful manipulation.'
        },
        {
          question: 'What is the ultimate potential of this journey?',
          answer: 'The ultimate potential of this sacred journey is stepping into full spiritual and emotional sovereignty, experiencing profound alignment, deep reciprocal partnerships, flourishing creative vitality, and an unshakeable sense of joy and inner sanctuary in all that you do.'
        }
      ];

  // 5. Action Steps
  const actionRaw = findSection('action') || findSection('reflection') || '';
  
  // Extract action steps supporting multi-line blocks, numbered lists [1], 1., 1), etc.
  const rawActionBlocks = actionRaw
    .split(/(?:^|\n+)(?:\[?\d+\]?[\.\)]?|\*|-)\s+/)
    .map(b => b.trim())
    .filter(b => b.length > 5);

  const parsedActionSteps: string[] = [];
  if (rawActionBlocks.length > 0) {
    for (const block of rawActionBlocks) {
      // Normalize line breaks within a single step to preserve paragraph continuity
      const cleanBlock = block.replace(/\r\n/g, '\n').replace(/\n+/g, ' ').trim();
      if (cleanBlock.length > 15) {
        parsedActionSteps.push(cleanBlock);
      }
    }
  }

  // 6. Energetic Mantras
  const mantraRaw = findSection('mantras') || findSection('energetic mantras') || findSection('affirmations') || '';
  const mantras = mantraRaw
    .split('\n')
    .filter(l => l.trim().length > 3)
    .map(l => l.replace(/^[\d.*"'-•]+\s*/, '').replace(/["']/g, '').replace(/\*\*/g, '').trim())
    .filter(l => l.length > 5 && !l.toLowerCase().startsWith('repeat'));

  // 7. Soul Inquiries
  const inquiriesRaw = findSection('soul inquiries') || findSection('inquiries') || findSection('journaling') || '';
  const soulInquiries = inquiriesRaw
    .split('\n')
    .filter(l => l.match(/^(\d+[\.\)]|\*|-|•)/) || l.includes('?'))
    .map(l => l.replace(/^[\d.*-•\)]+\s*/, '').replace(/\*\*/g, '').trim())
    .filter(l => l.length > 10);

  // 8. Spiritual Prescription
  const presRaw = findSection('prescription') || findSection('spiritual prescription') || '';
  const presLines = presRaw.split('\n').filter(Boolean);

  const extractItems = (keyword: string) => {
    return presLines
      .filter(l => l.toLowerCase().includes(keyword.toLowerCase()))
      .map(l => {
        const clean = l.replace(/^[\d.*-]+\s*/, '').trim();
        const parts = clean.split(/[-–:]/);
        return {
          name: parts[0]?.replace(/\*\*/g, '').trim() || clean,
          description: parts.slice(1).join(': ').replace(/\*\*/g, '').trim() || 'Provides energetic alignment and clearing.'
        };
      });
  };

  const crystals = extractItems('crystal').length > 0 ? extractItems('crystal') : [
    { name: 'Rose Quartz & Selenite', description: 'Opens the heart chakra to unconditional compassion while purifying the auric field of lingering heavy resonance.' }
  ];
  const botanicals = extractItems('botanical').length > 0 ? extractItems('botanical') : [
    { name: 'Lavender & White Sage', description: 'Calms anxious nervous system loops and clears mental fog to restore receptive tranquility.' }
  ];
  const mindfulness = extractItems('mindfulness').length > 0 || extractItems('practice').length > 0
    ? extractItems('mindfulness').concat(extractItems('practice'))
    : [
      { name: 'Heart-Centered Grounding Breath', description: 'Place both hands over the high heart, inhale for 4 counts holding golden light, and exhale for 6 counts releasing tension.' }
    ];

  return {
    mainHeadline,
    numerology,
    cards: {
      card1,
      card2,
      card3
    },
    synthesisParagraphs: synthesisParagraphs.length >= 3 ? synthesisParagraphs : [
      'The sacred synthesis of your numbers and cards indicates a profound turning point in your energetic trajectory. Your core vibrational coordinates reveal a soul designed for conscious evolution and authentic sovereignty, calling you to release old coping mechanisms and trust the wisdom of your lived experience.',
      'As you navigate the current crossroads, the intersection between your Life Path blueprint and the cards drawn highlights an invaluable opportunity to transmute past emotional hesitation into expansive clarity and grounded peace.',
      'By releasing the subconscious resistance and mental loops identified in your spread, you allow natural synchronicities and divine timing to realign your circumstances with reciprocal harmony and effortless truth.',
      'Stepping decisively into the elevated medicine of your path forward brings sustainable peace, authentic connection, and joyful abundance into every facet of your life journey.'
    ],
    qaInsights: qaInsights.length >= 3 ? qaInsights : defaultQA,
    actionSteps: parsedActionSteps.length >= 2 ? parsedActionSteps : [
      '[1] Establish Sacred Clarity & Boundary Audit (Days 1–7): Dedicate 15 minutes each morning to uncensored journaling. Identify every area where your energy is being depleted by people-pleasing or hesitation. Practice the sacred boundary mantra: "My peace is non-negotiable, and I choose to honor my authentic needs without apology or explanation."',
      '[2] Dissolve the Mental Loop & Regulate the Nervous System (Days 8–15): Whenever overthinking or hesitation arises, pause immediately and place both hands over your heart center. Take 6 slow diaphragmatic breaths. State aloud: "I acknowledge this fear, I thank it for trying to keep me safe, and I choose to release control to divine timing."',
      '[3] Execute One Courageous Shift & Embody Radiant Momentum (Days 16–22): Take one tangible, heart-aligned action that directly reflects solution-focused energy. Whether having an honest, grounded conversation or setting a firm boundary, act with kindness and confidence, trusting that the universe meets courage with immediate support.',
      '[4] Anchor Your Life Path Sovereign Blueprint (Days 23–30): Create a dedicated evening grounding ritual honoring your growth. Light a candle, hold your crystal ally, and meditate on your core strengths. Seal this 30-day journey by writing a letter of gratitude to your future self, anchoring unwavering trust in your destiny.'
    ],
    mantras: mantras.length >= 3 ? mantras : [
      'I AM grounded in my sacred truth and divine self-worth.',
      'I AM releasing all fear of the unknown with peace and trust.',
      'I AM open to receiving authentic love, abundance, and clarity.',
      'I AM the conscious creator of my energetic reality.',
      'I AM perfectly aligned with the highest trajectory of my soul.'
    ],
    soulInquiries: soulInquiries.length >= 2 ? soulInquiries : [
      'What truth is my heart ready to acknowledge that my mind has been resisting?',
      'Where am I giving away my personal power to appease others, and how can I reclaim it?',
      'How does my life feel when I fully trust my intuition without needing outside validation?'
    ],
    spiritualPrescription: {
      crystals,
      botanicals,
      mindfulness
    }
  };
};
