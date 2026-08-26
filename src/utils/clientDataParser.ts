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
  cards?: [TarotCard | null, TarotCard | null, TarotCard | null];
  hasDob: boolean;
  rawText: string;
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

  // 1. Parse Name
  const nameMatch = raw.match(/(?:name|client|querent|person|seeker|for)\s*[-:=]\s*([^,\n|\.;]+)/i);
  if (nameMatch && nameMatch[1]) {
    name = nameMatch[1].trim();
  }

  // 2. Parse DOB (Date of birth)
  const dobMatch = raw.match(/(?:dob|birthdate|birth\s*date|birthday|date\s*of\s*birth|born)\s*[-:=]\s*([^,\n|;]+)/i);
  if (dobMatch && dobMatch[1]) {
    const candidate = dobMatch[1].trim();
    if (!/^(none|na|n\/a|no|nil|unknown|-)$/i.test(candidate)) {
      dob = candidate;
    }
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
  const topicMatch = raw.match(/(?:topic|title|category|subject|theme)\s*[-:=]\s*([^,\n|;]+)/i);
  if (topicMatch && topicMatch[1]) {
    topic = topicMatch[1].trim();
  }

  // 4b. Parse Shop / Brand / Studio (if mentioned in text)
  const shopMatch = raw.match(/(?:shop|shop\s*name|store|studio|brand|business)\s*[-:=]\s*([^,\n|;]+)/i);
  if (shopMatch && shopMatch[1]) {
    shopName = shopMatch[1].trim();
  }

  // 5. Parse Problem / Situation
  const problemMatch = raw.match(/(?:problem|situation|issue|concern|context|background|crossroad|dilemma|blockage)\s*[-:=]\s*([^|\n]+?)(?=(?:question|inquiry|ask|dob|age|name|cards|tier|$))/i);
  if (problemMatch && problemMatch[1]) {
    problem = problemMatch[1].trim().replace(/,\s*(?:question|inquiry|dob|age|cards).*$/i, '');
  }

  // 6. Parse Question / Inquiry
  const questionMatch = raw.match(/(?:question|inquiry|ask|asking|query|desire)\s*[-:=]\s*([^|\n]+?)(?=(?:problem|situation|issue|dob|age|name|cards|tier|$))/i);
  if (questionMatch && questionMatch[1]) {
    question = questionMatch[1].trim().replace(/,\s*(?:problem|situation|dob|age|cards).*$/i, '');
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

  const hasDob = Boolean(dob && dob.trim().length > 3);

  return {
    name: name || '',
    age: age || '',
    dob: dob || '',
    problem: problem || '',
    question: question || '',
    topic: topic || '',
    shopName: shopName || '',
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
