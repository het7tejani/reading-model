import { ReadingInputs, ReadingTier, TarotCard } from '../types';
import { TAROT_DECK } from '../data/tarotCards';
import { getZodiacFromDob } from './astrology';

export interface ParsedClientData {
  name: string;
  age: string;
  dob: string;
  problem: string;
  question: string;
  topic?: string;
  shopName?: string;
  cards?: [TarotCard, TarotCard, TarotCard];
  cardNames?: [string, string, string];
  cardDetails?: [string, string, string];
  detectedFromPrompt: boolean;
  hasDob: boolean;
  rawText: string;
}

/**
 * Normalizes query string for tarot card matching (handles numbers, aliases, suits).
 */
export function normalizeTarotQuery(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b1\s*of\b/g, 'ace of')
    .replace(/\b2\s*of\b/g, 'two of')
    .replace(/\b3\s*of\b/g, 'three of')
    .replace(/\b4\s*of\b/g, 'four of')
    .replace(/\b5\s*of\b/g, 'five of')
    .replace(/\b6\s*of\b/g, 'six of')
    .replace(/\b7\s*of\b/g, 'seven of')
    .replace(/\b8\s*of\b/g, 'eight of')
    .replace(/\b9\s*of\b/g, 'nine of')
    .replace(/\b10\s*of\b/g, 'ten of')
    .replace(/\bcoins?\b/g, 'pentacles')
    .replace(/\bdisks?\b/g, 'pentacles')
    .replace(/\bdiscs?\b/g, 'pentacles')
    .replace(/\bjudgment\b/g, 'judgement')
    .replace(/\bwheel\b(?! of)/g, 'wheel of fortune');
}

/**
 * Finds matching TarotCard from TAROT_DECK with flexible naming.
 */
export function findDeckCard(rawStr: string): { card: TarotCard; details: string } | null {
  if (!rawStr || !rawStr.trim()) return null;

  // Clean common position prefixes: "Card 1:", "1.", "Current Energy:"
  const cleanLine = rawStr.replace(
    /^(?:card\s*[1-3]|position\s*[1-3]|[1-3][.)]|\bcard\s*(?:one|two|three)\b|current\s*energy|the\s*blockage|path\s*forward)[\s:.-]*/i,
    ''
  ).trim();

  const normLine = normalizeTarotQuery(cleanLine);
  
  // Sort cards by name length descending so "Ten of Swords" matches before "Ten"
  const sortedDeck = [...TAROT_DECK].sort((a, b) => b.name.length - a.name.length);

  for (const deckCard of sortedDeck) {
    const normDeckName = normalizeTarotQuery(deckCard.name);
    const withoutThe = normDeckName.replace(/^the\s+/, '');
    
    // Match either with or without "the"
    const pattern = `\\b(?:the\\s+)?${withoutThe.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`;
    const reg = new RegExp(pattern, 'i');

    if (reg.test(normLine)) {
      // Extract details: text remaining after card name
      let details = '';
      const afterCard = cleanLine.replace(new RegExp(`^(?:the\\s+)?${deckCard.name.replace(/^the\\s+/i, '')}`, 'i'), '').trim();
      if (afterCard) {
        details = afterCard
          .replace(/^[\s\-–—:\/|,]+/, '')
          .replace(/^\(|\)$/g, '')
          .trim();
      } else {
        // Check for hyphen, colon or parens anywhere in cleanLine
        const detailMatch = cleanLine.match(/(?:[-–—:]|\s*\()\s*(.+)/);
        if (detailMatch && detailMatch[1]) {
          details = detailMatch[1].replace(/\)$/, '').trim();
        }
      }

      // If details was just the card name itself, clear it
      if (details.toLowerCase() === deckCard.name.toLowerCase() || details.toLowerCase() === withoutThe.toLowerCase()) {
        details = '';
      }

      const enrichedCard: TarotCard = {
        ...deckCard,
        customDetails: details || undefined,
        keywords: details && details.includes(',')
          ? details.split(/[,;|]+/).map((k) => k.trim()).filter(Boolean)
          : deckCard.keywords,
      };

      return { card: enrichedCard, details };
    }
  }

  return null;
}

/**
 * Helper to extract keywords or descriptive details associated with a card in prompt or prompt output text.
 */
export function extractCardSectionDetails(fullText: string, cardName: string): string {
  if (!fullText || !cardName) return '';
  const lines = fullText.split('\n');
  const withoutThe = cardName.replace(/^The\s+/i, '(?:The\\s+)?');
  const cardRegex = new RegExp(`\\b${withoutThe}\\b`, 'i');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (cardRegex.test(line)) {
      // 1. Check inline on the exact same line first
      const afterCard = line.replace(new RegExp(`.*?\\b${withoutThe}\\b[\\s*_:-]*`, 'i'), '').trim();
      const cleanInline = afterCard.replace(/^[\s\-–—:\/|,]+/, '').replace(/^\(|\)$/g, '').trim();
      if (cleanInline && !/^(?:current energy|the blockage|path forward)$/i.test(cleanInline)) {
        return cleanInline;
      }

      // 2. Look at subsequent lines until next card / heading / blank line
      for (let j = i + 1; j < Math.min(lines.length, i + 6); j++) {
        const next = lines[j].trim();
        if (!next) continue;
        if (/^(?:#{1,4}|\bcard\s*[1-3]\b|\b[1-3][.)])/i.test(next)) break;

        // Match **Keywords:** or Keywords:
        const kw = next.match(/(?:\*\*keywords?:?\*\*|keywords?:?)\s*(.+)/i);
        if (kw && kw[1]) {
          return kw[1].replace(/^[\s*_:-]+/, '').replace(/[\s*_]+$/, '').trim();
        }

        // Match Nuance / Meaning / Description line
        if (!next.startsWith('#') && next.length > 5) {
          return next.replace(/^\*+|\*+$/g, '').trim();
        }
      }
    }
  }
  return '';
}

/**
 * Extracts 3 Tarot Cards and their descriptions directly from Master Prompt text or Prompt Output.
 */
export function extractTarotCardsFromText(raw: string): {
  cards: [TarotCard, TarotCard, TarotCard] | null;
  cardNames: [string, string, string] | null;
  cardDetails: [string, string, string] | null;
  detectedFromPrompt: boolean;
} {
  if (!raw || !raw.trim()) {
    return { cards: null, cardNames: null, cardDetails: null, detectedFromPrompt: false };
  }

  // Strategy 1: Explicit labels (Card 1, Card 2, Card 3, 1., 2., 3., Current Energy, The Blockage, Path Forward)
  const labeledRegex = /(?:(?:card|position|spread)\s*[1-3]|(?:\b[1-3]\b[.)])|\bcard\s*(?:one|two|three)\b|current\s*energy|the\s*blockage|path\s*forward)[\s:.-]+([^\n]+)/gi;
  let lm;
  const labeledCards: TarotCard[] = [];
  const labeledDetails: string[] = [];

  while ((lm = labeledRegex.exec(raw)) !== null) {
    const line = lm[0];
    const match = findDeckCard(line);
    if (match && !labeledCards.some((c) => c.name === match.card.name)) {
      const sectionDetails = match.details || extractCardSectionDetails(raw, match.card.name);
      const enrichedCard: TarotCard = {
        ...match.card,
        customDetails: sectionDetails || undefined,
        keywords: sectionDetails && sectionDetails.includes(',')
          ? sectionDetails.split(/[,;|]+/).map((k) => k.trim()).filter(Boolean)
          : match.card.keywords,
      };
      labeledCards.push(enrichedCard);
      labeledDetails.push(sectionDetails);
    }
  }

  if (labeledCards.length >= 3) {
    return {
      cards: [labeledCards[0], labeledCards[1], labeledCards[2]],
      cardNames: [labeledCards[0].name, labeledCards[1].name, labeledCards[2].name],
      cardDetails: [labeledDetails[0] || '', labeledDetails[1] || '', labeledDetails[2] || ''],
      detectedFromPrompt: true,
    };
  }

  // Strategy 2: Look within a dedicated Tarot Cards section
  const cardsSectionMatch = raw.match(
    /(?:tarot\s*cards?|three\s*cards?|cards?\s*drawn|cards?)\s*[-:=]+([\s\S]+?)(?=(?:problem|situation|question|inquiry|agenda|dob|age|name|client|tier|$))/i
  );
  if (cardsSectionMatch && cardsSectionMatch[1]) {
    const sectionText = cardsSectionMatch[1];
    const lines = sectionText.split(/[\n;]+/).map((l) => l.trim()).filter(Boolean);
    const sectionCards: TarotCard[] = [];
    const sectionDetails: string[] = [];

    for (const line of lines) {
      // Also check if line has comma-separated cards e.g. "The Star, 8 of Swords, The Sun"
      if (line.includes(',') && !line.includes(':') && !line.includes('-')) {
        const parts = line.split(',').map((p) => p.trim()).filter(Boolean);
        for (const part of parts) {
          const m = findDeckCard(part);
          if (m && !sectionCards.some((c) => c.name === m.card.name)) {
            const details = m.details || extractCardSectionDetails(raw, m.card.name);
            const enrichedCard: TarotCard = {
              ...m.card,
              customDetails: details || undefined,
              keywords: details && details.includes(',')
                ? details.split(/[,;|]+/).map((k) => k.trim()).filter(Boolean)
                : m.card.keywords,
            };
            sectionCards.push(enrichedCard);
            sectionDetails.push(details);
          }
        }
      } else {
        const m = findDeckCard(line);
        if (m && !sectionCards.some((c) => c.name === m.card.name)) {
          const details = m.details || extractCardSectionDetails(raw, m.card.name);
          const enrichedCard: TarotCard = {
            ...m.card,
            customDetails: details || undefined,
            keywords: details && details.includes(',')
              ? details.split(/[,;|]+/).map((k) => k.trim()).filter(Boolean)
              : m.card.keywords,
          };
          sectionCards.push(enrichedCard);
          sectionDetails.push(details);
        }
      }
    }

    if (sectionCards.length >= 3) {
      return {
        cards: [sectionCards[0], sectionCards[1], sectionCards[2]],
        cardNames: [sectionCards[0].name, sectionCards[1].name, sectionCards[2].name],
        cardDetails: [sectionDetails[0] || '', sectionDetails[1] || '', sectionDetails[2] || ''],
        detectedFromPrompt: true,
      };
    }
  }

  // Strategy 3: Inline search for any 3 tarot cards mentioned across the text
  const sortedDeck = [...TAROT_DECK].sort((a, b) => b.name.length - a.name.length);
  const inlineFound: Array<{ card: TarotCard; index: number }> = [];

  for (const deckCard of sortedDeck) {
    const norm = normalizeTarotQuery(raw);
    const normDeckName = normalizeTarotQuery(deckCard.name);
    const withoutThe = normDeckName.replace(/^the\s+/, '');
    const pattern = `\\b(?:the\\s+)?${withoutThe.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`;
    const reg = new RegExp(pattern, 'i');
    const m = norm.match(reg);
    if (m && m.index !== undefined) {
      inlineFound.push({ card: deckCard, index: m.index });
    }
  }

  inlineFound.sort((a, b) => a.index - b.index);
  if (inlineFound.length >= 3) {
    const unique = inlineFound.filter((val, idx, self) =>
      self.findIndex((other) => other.card.name === val.card.name) === idx
    );
    if (unique.length >= 3) {
      const top3Cards: TarotCard[] = [];
      const top3Details: string[] = [];
      for (const item of unique.slice(0, 3)) {
        const details = extractCardSectionDetails(raw, item.card.name);
        const enrichedCard: TarotCard = {
          ...item.card,
          customDetails: details || undefined,
          keywords: details && details.includes(',')
            ? details.split(/[,;|]+/).map((k) => k.trim()).filter(Boolean)
            : item.card.keywords,
        };
        top3Cards.push(enrichedCard);
        top3Details.push(details);
      }

      return {
        cards: [top3Cards[0], top3Cards[1], top3Cards[2]],
        cardNames: [top3Cards[0].name, top3Cards[1].name, top3Cards[2].name],
        cardDetails: [top3Details[0] || '', top3Details[1] || '', top3Details[2] || ''],
        detectedFromPrompt: true,
      };
    }
  }

  return { cards: null, cardNames: null, cardDetails: null, detectedFromPrompt: false };
}

/**
 * Intelligent parser that extracts Name, DOB, Age, Problem, and Question from a single paragraph or key-value text.
 * Works with any format:
 * - "Name - Julianne Thorne, DOB - 04/18/1991, Age - 33, Problem - ..., Question - ..."
 * - "Name: Sarah, Age: 28, Problem: ..., Question: ..." (Omitted DOB)
 * - "Client: Alex | 42 | DOB: 1982-10-15 | Question: ... | Problem: ..."
 */
export function parseClientParagraph(text: string): ParsedClientData {
  if (!text || typeof text !== 'string') {
    return {
      name: '',
      age: '',
      dob: '',
      problem: '',
      question: '',
      detectedFromPrompt: false,
      hasDob: false,
      rawText: '',
    };
  }

  const raw = text.trim();
  let name = '';
  let age = '';
  let dob = '';
  let problem = '';
  let question = '';
  let topic = '';
  let shopName = '';

  // Helper to extract multi-line or single-line field values
  const extractField = (labels: string[]): string => {
    const labelPattern = labels.join('|');
    const nextLabels =
      '(?:(?:name|dob|birthdate|age|problem|situation|question|inquiry|topic|title|shop|studio|tarot\\s*cards?|three\\s*cards?|cards?|tier)\\s*[-:=])|(?:\\bcard\\s*[1-3]\\b|\\b[1-3][.)])';
    const reg = new RegExp(
      `(?:^|[\\n,;|])\\s*(?:${labelPattern})\\s*[-:=]\\s*([\\s\\S]*?)(?=(?:[\\n,;]+\\s*(?:${nextLabels}))|$)`,
      'i'
    );
    const m = raw.match(reg);
    return m ? m[1].trim() : '';
  };

  // 1. Parse Name
  const parsedName = extractField(['name', 'client', 'querent', 'person', 'seeker']);
  if (parsedName) {
    name = parsedName.replace(/[,;].*$/, '').trim();
  }

  // 2. Parse DOB (Date of birth)
  const parsedDob = extractField(['dob', 'birthdate', 'birth\\s*date', 'birthday', 'date\\s*of\\s*birth', 'born']);
  if (parsedDob && !/^(none|na|n\/a|no|nil|unknown|-)$/i.test(parsedDob)) {
    dob = parsedDob.replace(/[,;].*$/, '').trim();
  } else {
    // Attempt to extract standard date formats if preceded by date patterns
    const dateRegexMatch = raw.match(/\b(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})\b/);
    if (dateRegexMatch && dateRegexMatch[1]) {
      dob = dateRegexMatch[1].trim();
    } else {
      const spelledDateMatch = raw.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b/i);
      if (spelledDateMatch) {
        dob = spelledDateMatch[0].trim();
      }
    }
  }

  // 3. Parse Age
  const ageMatch = raw.match(/(?:age|years\s*old)\s*[-:=]\s*(\d{1,3})/i);
  if (ageMatch && ageMatch[1]) {
    age = ageMatch[1].trim();
  } else {
    // Match "34 yo", "34 yrs", "34 years"
    const yoMatch = raw.match(/\b(\d{1,3})\s*(?:yo|yrs|years\s*old)\b/i);
    if (yoMatch && yoMatch[1]) {
      age = yoMatch[1].trim();
    } else if (dob) {
      // Auto-calculate age from DOB if age was not explicitly written
      try {
        const parsedDate = new Date(dob);
        if (!isNaN(parsedDate.getTime())) {
          const diffMs = Date.now() - parsedDate.getTime();
          const calculatedAge = Math.floor(diffMs / (365.25 * 24 * 3600 * 1000));
          if (calculatedAge > 0 && calculatedAge < 120) {
            age = String(calculatedAge);
          }
        }
      } catch {
        // ignore
      }
    }
  }

  // 4. Parse Topic / Title (if mentioned in text)
  const parsedTopic = extractField(['topic', 'title', 'category', 'subject', 'theme']);
  if (parsedTopic) {
    topic = parsedTopic.split('\n')[0].trim();
  }

  // 4b. Parse Shop / Brand / Studio (if mentioned in text)
  const parsedShop = extractField(['shop', 'shop\\s*name', 'store', 'studio', 'brand', 'business']);
  if (parsedShop) {
    shopName = parsedShop.split('\n')[0].trim();
  }

  // 5. Parse Problem / Situation
  const parsedProblem = extractField([
    'problem',
    'situation',
    'issue',
    'concern',
    'context',
    'background',
    'crossroad',
    'dilemma',
    'blockage',
  ]);
  if (parsedProblem) {
    problem = parsedProblem
      .split(/\n\s*(?:tarot\s*cards?|three\s*cards?|cards?|card\s*[1-3]|[1-3][.)]|question)/i)[0]
      .trim();
  }

  // 6. Parse Question / Inquiry
  const parsedQuestion = extractField([
    'question',
    'inquiry',
    'ask',
    'asking',
    'query',
    'desire',
  ]);
  if (parsedQuestion) {
    question = parsedQuestion
      .split(/\n\s*(?:tarot\s*cards?|three\s*cards?|cards?|card\s*[1-3]|[1-3][.)]|problem)/i)[0]
      .trim();
  }

  // Fallback heuristic: If name or problem is still empty, inspect line by line or comma separation
  if (!name && !problem && !question) {
    const lines = raw.split(/[\n,]+/).map((l) => l.trim()).filter(Boolean);
    if (lines.length >= 1 && !lines[0].includes(':') && !lines[0].includes('-')) {
      name = lines[0];
    }
    if (lines.length >= 2 && /^\d+$/.test(lines[1])) {
      age = lines[1];
    }
  }

  // Check if any sentence ends with a question mark if question is not found
  if (!question) {
    const questionSentence = raw.match(/([A-Z][^\.!\?]*\?)/);
    if (questionSentence && questionSentence[1]) {
      question = questionSentence[1].trim();
    }
  }

  // 7. Extract Tarot Cards & Card Details directly from master prompt text
  const extractedCards = extractTarotCardsFromText(raw);

  const hasDob = Boolean(dob && dob.trim().length > 3);

  return {
    name: name || '',
    age: age || '',
    dob: dob || '',
    problem: problem || '',
    question: question || '',
    topic: topic || '',
    shopName: shopName || '',
    cards: extractedCards.cards || undefined,
    cardNames: extractedCards.cardNames || undefined,
    cardDetails: extractedCards.cardDetails || undefined,
    detectedFromPrompt: extractedCards.detectedFromPrompt,
    hasDob,
    rawText: raw,
  };
}

/**
 * Intelligent 3-card auto-drawer that selects resonant cards based on domain and situational themes.
 */
export function autoDrawSacredCards(topic: string, problem: string): [TarotCard, TarotCard, TarotCard] {
  const seed = `${topic} ${problem} ${Date.now()}`.toLowerCase();
  
  // High-resonance selection across the deck
  const deck = [...TAROT_DECK];
  
  // Shuffle deterministically based on seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const shuffled = deck.sort((a, b) => {
    const h1 = (hash * 31 + a.name.charCodeAt(0)) % 100;
    const h2 = (hash * 17 + b.name.charCodeAt(0)) % 100;
    return h1 - h2;
  });

  const card1 = shuffled[0] || TAROT_DECK[0];
  const card2 = shuffled[Math.floor(shuffled.length / 2)] || TAROT_DECK[1];
  const card3 = shuffled[shuffled.length - 1] || TAROT_DECK[2];

  return [card1, card2, card3];
}
