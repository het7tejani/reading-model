import React from 'react';

export interface MonthForecastParsedItem {
  monthNumber: number;
  monthName: string;
  title: string;
  astrologicalSign: string;
  element: string;
  forecast: string;
  practicalAdvice: string;
  affirmation: string;
}

export interface PageByPageItem {
  pageNumber: number;
  title: string;
  content: string;
  paragraphs: string[];
  alignment?: 'left' | 'center' | 'right' | 'justify';
  isCover?: boolean;
  isWelcomeLetter?: boolean;
  isTarotSpread?: boolean;
  isTarotCardArt?: boolean;
  isTarotInterpretation?: boolean;
  isNumerology?: boolean;
  cardIndex?: number;
  isClosingDisclaimer?: boolean;
}

export interface ParsedReadingData {
  mainHeadline: string;
  pageByPage?: PageByPageItem[];
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
  monthlyForecasts?: MonthForecastParsedItem[];
  actionSteps: string[];
  mantras: string[];
  soulInquiries: string[];
  spiritualPrescription: {
    crystals: { name: string; description: string }[];
    botanicals: { name: string; description: string }[];
    mindfulness: { name: string; description: string }[];
  };
  customSections?: { title: string; paragraphs: string[] }[];
}

/**
 * Strips all stray leading/trailing markdown characters (*, **, _, #, bullets, numbers, colons)
 */
export const cleanHeadingText = (text: string | undefined, defaultVal = ''): string => {
  if (!text) return defaultVal;
  const cleaned = text
    .replace(/^[\s*#_~•\-–—\d\.\)\]\[:]+/g, '')
    .replace(/[\s*#_~:]+$/g, '')
    .replace(/\*+/g, '')
    .replace(/_+/g, '')
    .trim();
  return cleaned || defaultVal;
};

/**
 * Strips markdown asterisks, underscores, and leading list markers from body text while preserving sentences
 */
export const cleanMarkdownText = (text: string | undefined, defaultVal = ''): string => {
  if (!text) return defaultVal;
  const cleaned = text
    // Strip HTML tags completely so non-tech users never have to see <div>, <p>, etc.
    .replace(/<\/?(?:div|p|span|section)[^>]*>/gi, '')
    // Strip markdown alignment comments if present
    .replace(/<!--\s*align:\s*(?:left|center|right|justify)\s*-->/gi, '')
    .replace(/^[\s*#_~•\-–—:]+/g, '')
    .replace(/[\s*#_~:]+$/g, '')
    .replace(/\*+/g, '')
    .replace(/_{2,}/g, '')
    .trim();
  return cleaned || defaultVal;
};

export interface TextWithAlignment {
  text: string;
  align: 'left' | 'center' | 'right' | 'justify';
}

/**
 * Extracts alignment (left, center, right, justify) from markdown alignment directives
 * or legacy wrapped HTML tags (<div align="justify">...</div>) while stripping all HTML tags.
 */
export function parseTextAlignment(rawText: string | undefined): TextWithAlignment {
  if (!rawText) return { text: '', align: 'center' };
  const trimmed = rawText.trim();

  // Match: <!-- align: left|center|right|justify -->
  const commentMatch = trimmed.match(/<!--\s*align:\s*(left|center|right|justify)\s*-->/i);
  if (commentMatch) {
    const rawAlign = commentMatch[1].toLowerCase() as 'left' | 'center' | 'right' | 'justify';
    const clean = trimmed
      .replace(/<!--\s*align:\s*(?:left|center|right|justify)\s*-->/gi, '')
      .replace(/<\/?(?:div|p|span)[^>]*>/gi, '')
      .trim();
    return {
      text: clean,
      align: rawAlign,
    };
  }

  // Match: <div align="left|center|right|justify">...</div> or <p align="...">...</p>
  const match =
    trimmed.match(/^<(?:div|p)[^>]*align=["'](left|center|right|justify)["'][^>]*>([\s\S]*?)<\/(?:div|p)>$/i) ||
    trimmed.match(/^<(?:div|p)[^>]*style=["'][^"']*text-align:\s*(left|center|right|justify)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p)>$/i);

  if (match) {
    const rawAlign = match[1].toLowerCase() as 'left' | 'center' | 'right' | 'justify';
    const inner = match[2].replace(/<\/?(?:div|p|span)[^>]*>/gi, '').trim();
    return {
      text: inner,
      align: rawAlign,
    };
  }

  // Also check if text has embedded alignment tags anywhere
  const embeddedMatch = trimmed.match(/<(?:div|p)[^>]*align=["'](left|center|right|justify)["'][^>]*>/i);
  if (embeddedMatch) {
    const rawAlign = embeddedMatch[1].toLowerCase() as 'left' | 'center' | 'right' | 'justify';
    const stripped = trimmed.replace(/<\/?(?:div|p|span)[^>]*>/gi, '').trim();
    return {
      text: stripped,
      align: rawAlign,
    };
  }

  // Always strip any orphan <div> or </div> tags so non-tech users never see raw HTML
  const cleanStripped = trimmed.replace(/<\/?(?:div|p|span)[^>]*>/gi, '').trim();

  return {
    text: cleanStripped,
    align: 'center',
  };
}

/**
 * Renders string text with support for embedded \n newlines and <br/> / <br> tags as JSX elements.
 */
export function renderTextWithLineBreaks(rawText: string | undefined): React.ReactNode {
  if (!rawText) return null;
  const parts = rawText.split(/(?:<br\s*\/?>|\r?\n)/gi);
  if (parts.length <= 1) {
    return rawText;
  }
  return parts.map((part, index) =>
    React.createElement(
      React.Fragment,
      { key: index },
      index > 0 ? React.createElement('br') : null,
      part
    )
  );
}

export function parsePageByPageOutput(rawMarkdown: string): PageByPageItem[] {
  const pages: PageByPageItem[] = [];
  if (!rawMarkdown) return pages;

  // Match lines like: PAGE 1 — Cover Page or ## PAGE 2: Welcome Letter or PAGE 1: Title
  const pageRegex = /(?:^|\n)(?:#{1,3}\s*)?PAGE\s*(\d+)[\s:—–\-]+([^\n]+)\n([\s\S]*?)(?=(?:(?:\r?\n)(?:#{1,3}\s*)?PAGE\s*\d+[\s:—–\-])|$)/gi;
  let match: RegExpExecArray | null;
  while ((match = pageRegex.exec(rawMarkdown)) !== null) {
    const pageNumber = parseInt(match[1], 10);
    const rawTitle = match[2]?.trim() || `Page ${pageNumber}`;
    const title = cleanHeadingText(rawTitle, `Page ${pageNumber}`);
    const rawContent = match[3]?.trim() || '';

    // Automatically detect alignment from comment <!-- align: justify --> or legacy <div align="...">
    let pageAlignment: 'left' | 'center' | 'right' | 'justify' = 'center';
    const commentAlign = rawContent.match(/<!--\s*align:\s*(left|center|right|justify)\s*-->/i);
    if (commentAlign) {
      pageAlignment = commentAlign[1].toLowerCase() as 'left' | 'center' | 'right' | 'justify';
    } else {
      const tagAlign = rawContent.match(/<(?:div|p)[^>]*align=["'](left|center|right|justify)["']/i);
      if (tagAlign) {
        pageAlignment = tagAlign[1].toLowerCase() as 'left' | 'center' | 'right' | 'justify';
      }
    }

    // Clean out all tags and directives from rawContent so paragraphs and content are 100% clean plain text
    const sanitizedContent = rawContent
      .replace(/<!--\s*align:\s*(?:left|center|right|justify)\s*-->/gi, '')
      .replace(/<\/?(?:div|p|span)[^>]*>/gi, '')
      .trim();

    // Split into clean paragraphs
    const paragraphs = sanitizedContent
      .split(/\n\s*\n/)
      .map(p => cleanMarkdownText(p.trim()))
      .filter(p => p.length > 0 && !p.toLowerCase().startsWith('page '));

    const content = paragraphs.join('\n\n');
    const lowerTitle = title.toLowerCase();

    const isCover = pageNumber === 1 || lowerTitle.includes('cover');
    const isWelcomeLetter = lowerTitle.includes('welcome') || lowerTitle.includes('letter');
    const isTarotSpread =
      lowerTitle.includes('card energy overview') ||
      lowerTitle.includes('cards energy overview') ||
      lowerTitle.includes('energy overview') ||
      lowerTitle.includes('tarot spread') ||
      lowerTitle.includes('spread overview') ||
      lowerTitle.includes('3-card energy') ||
      lowerTitle.includes('3 card energy') ||
      lowerTitle.includes('3-card spread') ||
      lowerTitle.includes('3 card spread') ||
      lowerTitle.includes('oracle spread') ||
      lowerTitle.includes('cards drawn') ||
      lowerTitle.includes('cards overview') ||
      lowerTitle.includes('tarot overview') ||
      lowerTitle.includes('triad alchemy') ||
      lowerTitle.includes('triad overview');

    let cardIndex: number | undefined = undefined;
    if (!isTarotSpread) {
      if (
        lowerTitle.includes('card 1') ||
        lowerTitle.includes('card i ') ||
        lowerTitle.includes('card i:') ||
        lowerTitle.includes('card i—') ||
        lowerTitle.includes('card i-') ||
        lowerTitle.includes('first card') ||
        lowerTitle.includes('present energy')
      ) {
        cardIndex = 0;
      } else if (
        lowerTitle.includes('card 2') ||
        lowerTitle.includes('card ii') ||
        lowerTitle.includes('second card') ||
        lowerTitle.includes('the blockage') ||
        lowerTitle.includes('shadow resistance')
      ) {
        cardIndex = 1;
      } else if (
        lowerTitle.includes('card 3') ||
        lowerTitle.includes('card iii') ||
        lowerTitle.includes('third card') ||
        lowerTitle.includes('path forward') ||
        lowerTitle.includes('highest potential')
      ) {
        cardIndex = 2;
      }
    }

    const isDeepInterpretation =
      lowerTitle.includes('interpretation') ||
      lowerTitle.includes('full interpretation') ||
      lowerTitle.includes('deep interpretation') ||
      lowerTitle.includes('deep analysis') ||
      lowerTitle.includes('channeled meaning') ||
      lowerTitle.includes('channeled interpretation');

    // Individual introduction page for a card (shows the card image)
    const isTarotCardArt =
      !isTarotSpread &&
      !isDeepInterpretation &&
      (lowerTitle.includes('visual') ||
        lowerTitle.includes('intro') ||
        lowerTitle.includes('introduction') ||
        lowerTitle.includes('keyword') ||
        lowerTitle.includes('keywords') ||
        lowerTitle.includes('artwork') ||
        lowerTitle.includes('embodiment') ||
        (cardIndex !== undefined && (lowerTitle.includes('keywords / energy') || lowerTitle.includes('overview') || lowerTitle.includes('focal point'))));

    // Deep interpretation page for a card (text only, NO card image)
    const isTarotInterpretation =
      !isTarotSpread &&
      !isTarotCardArt &&
      (isDeepInterpretation ||
        lowerTitle.includes('interpretation') ||
        (cardIndex !== undefined && !isTarotCardArt) ||
        (lowerTitle.includes('tarot card') && !isTarotCardArt));

    const isNumerology =
      lowerTitle.includes('numerology') ||
      lowerTitle.includes('life path') ||
      lowerTitle.includes('core vibrations') ||
      lowerTitle.includes('pythagorean');

    const isClosingDisclaimer =
      lowerTitle.includes('closing') ||
      lowerTitle.includes('disclaimer') ||
      lowerTitle.includes('review message');

    pages.push({
      pageNumber,
      title,
      content,
      paragraphs,
      alignment: pageAlignment,
      isCover,
      isWelcomeLetter,
      isTarotSpread,
      isTarotCardArt,
      isTarotInterpretation,
      isNumerology,
      cardIndex,
      isClosingDisclaimer,
    });
  }

  return pages;
}

export const parseReadingMarkdown = (markdown: string, fallbackTopic?: string): ParsedReadingData => {
  const pageByPage = parsePageByPageOutput(markdown);
  const lines = markdown.split('\n');

  // Extract main headline (e.g. # EXTREMELY DEEP LOVE PSYCHIC READING or from PAGE 1)
  let mainHeadline = fallbackTopic || 'SACRED TAROT & NUMEROLOGY ORACLE';
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  if (h1Match) {
    mainHeadline = cleanHeadingText(h1Match[1], fallbackTopic || 'SACRED TAROT & NUMEROLOGY ORACLE');
  } else if (pageByPage.length > 0 && pageByPage[0].title && !pageByPage[0].title.toLowerCase().includes('cover page')) {
    mainHeadline = cleanHeadingText(pageByPage[0].title, fallbackTopic || 'SACRED TAROT & NUMEROLOGY ORACLE');
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

  // 4. Q&A Insights / Category Questions / Monthly Forecasts
  const qaRaw = findSection('q&a') || findSection('insights') || findSection('questions') || findSection('predictions') || findSection('forecast') || findSection('monthly') || '';
  const qaParagraphs = qaRaw.split(/\n\n+/).filter(p => p.trim());
  const qaInsights: { question: string; answer: string }[] = [];
  const monthlyForecasts: MonthForecastParsedItem[] = [];

  // Parse Month-by-Month sections if present (e.g. Month 1: ..., ### Month 1, **Month 1:**)
  const monthRegex = /(?:###|\*\*|##)?\s*(?:Month\s*(\d+)|Quarter\s*(\d+))\s*[:\-–—]\s*([^*\n]+?)(?:\*\*)?(?:\n|$)([\s\S]*?)(?=(?:(?:###|\*\*|##)?\s*(?:Month\s*\d+|Quarter\s*\d+)\s*[:\-–—])|$)/gi;
  let monthMatch: RegExpExecArray | null;
  const monthSearchText = qaRaw || markdown;
  
  while ((monthMatch = monthRegex.exec(monthSearchText)) !== null) {
    const mNum = parseInt(monthMatch[1] || monthMatch[2], 10);
    const mTitle = cleanHeadingText(monthMatch[3] || `Theme for Month ${mNum}`, `Month ${mNum} Alignment`);
    const mBody = (monthMatch[4] || '').trim();

    if (mNum >= 1 && mNum <= 12 && mBody.length > 20) {
      // Extract practical advice and affirmation if present
      const advMatch = mBody.match(/(?:practical advice|action|aligned action|steps?)[^\n:]*:\s*([^\n]+)/i);
      const affMatch = mBody.match(/(?:affirmation|mantra)[^\n:]*:\s*([^\n]+)/i);
      const cleanForecast = mBody
        .replace(/(?:practical advice|action|aligned action|steps?)[^\n:]*:[^\n]+/gi, '')
        .replace(/(?:affirmation|mantra)[^\n:]*:[^\n]+/gi, '')
        .replace(/[*#_~]/g, '')
        .trim();

      const zodiacs = ['Aries / Mars', 'Taurus / Venus', 'Gemini / Mercury', 'Cancer / Moon', 'Leo / Sun', 'Virgo / Mercury', 'Libra / Venus', 'Scorpio / Pluto', 'Sagittarius / Jupiter', 'Capricorn / Saturn', 'Aquarius / Uranus', 'Pisces / Neptune'];
      const elements = ['Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water'];

      monthlyForecasts.push({
        monthNumber: mNum,
        monthName: `Month ${mNum}`,
        title: mTitle,
        astrologicalSign: zodiacs[(mNum - 1) % 12],
        element: elements[(mNum - 1) % 12],
        forecast: cleanForecast || mBody,
        practicalAdvice: advMatch ? advMatch[1].replace(/[*_~]/g, '').trim() : `Ground your intentions, maintain regular self-reflection, and take aligned action without hesitation.`,
        affirmation: affMatch ? affMatch[1].replace(/[*_~"']/g, '').trim() : `I step into Month ${mNum} with sovereign confidence and absolute trust in my divine path.`,
      });
    }
  }

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
      let cleanBlock = block.replace(/\r\n/g, '\n').replace(/\n+/g, ' ').trim();
      // Strip any stray markdown asterisks or underscores from the whole block
      cleanBlock = cleanBlock.replace(/^[\s*#_~•\-–—\d\.\)\]\[:]+/g, '').replace(/[\s*#_~]+$/g, '').trim();
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
    .map(l => l.replace(/^[\d.*"'_~•\-–—]+\s*/, '').replace(/["']/g, '').replace(/\*+/g, '').replace(/_+/g, '').trim())
    .filter(l => l.length > 5 && !l.toLowerCase().startsWith('repeat'));

  // 7. Soul Inquiries
  const inquiriesRaw = findSection('soul inquiries') || findSection('inquiries') || findSection('journaling') || '';
  const soulInquiries = inquiriesRaw
    .split('\n')
    .filter(l => l.match(/^(\d+[\.\)]|\*|-|•)/) || l.includes('?'))
    .map(l => l.replace(/^[\d.*_~•\-–—\)]+\s*/, '').replace(/\*+/g, '').replace(/_+/g, '').trim())
    .filter(l => l.length > 10);

  // 8. Spiritual Prescription
  const presRaw = findSection('prescription') || findSection('spiritual prescription') || '';
  const presLines = presRaw.split('\n').filter(Boolean);

  const extractItems = (keyword: string) => {
    return presLines
      .filter(l => l.toLowerCase().includes(keyword.toLowerCase()))
      .map(l => {
        const clean = l.replace(/^[\d.*_~•\-–—]+\s*/, '').replace(/\*+/g, '').replace(/_+/g, '').trim();
        const parts = clean.split(/[-–:]/);
        return {
          name: parts[0]?.replace(/\*+/g, '').replace(/_+/g, '').trim() || clean,
          description: parts.slice(1).join(': ').replace(/\*+/g, '').replace(/_+/g, '').trim() || 'Provides energetic alignment and clearing.'
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

  // Extract any additional custom markdown sections that aren't mapped to standard categories
  const knownKeywords = [
    'numerology', 'life path', '3-card', 'energy overview', 'cards',
    'synthesis', 'cosmic', 'q&a', 'insights', 'questions', 'predictions',
    'forecast', 'monthly', 'action', 'reflection', 'mantras', 'affirmations',
    'soul inquiries', 'inquiries', 'journaling', 'prescription'
  ];

  const customSections: { title: string; paragraphs: string[] }[] = [];
  for (const [secKey, secContent] of Object.entries(sections)) {
    const isKnown = knownKeywords.some(kw => secKey.includes(kw));
    if (!isKnown && secContent.trim().length > 30) {
      const pList = secContent
        .split('\n\n')
        .map(p => cleanMarkdownText(p.trim()))
        .filter(p => p.length > 20 && !p.startsWith('#'));
      if (pList.length > 0) {
        customSections.push({
          title: cleanHeadingText(secKey.replace(/[-_]/g, ' ').toUpperCase(), 'SACRED TRANSMISSION'),
          paragraphs: pList
        });
      }
    }
  }

  return {
    mainHeadline,
    pageByPage: pageByPage.length > 0 ? pageByPage : undefined,
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
    monthlyForecasts: monthlyForecasts.length > 0 ? monthlyForecasts : undefined,
    spiritualPrescription: {
      crystals,
      botanicals,
      mindfulness
    },
    customSections: customSections.length > 0 ? customSections : undefined
  };
};
