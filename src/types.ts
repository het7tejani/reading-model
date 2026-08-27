export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  keywords: string[];
  element: 'Fire' | 'Water' | 'Air' | 'Earth' | 'Spirit';
  archetype: string;
  affirmation: string;
  symbol: string;
  color: string;
}

export interface CategoryCustomData {
  customQuestions?: string[];
  predictions?: string[];
  monthlyFocus?: string[];
  personName?: string;
  relationshipStatus?: string;
  petName?: string;
  petSpecies?: string;
  petAge?: string;
  petConcern?: string;
  lostItem?: string;
  lastSeen?: string;
  timeframeEvent?: string;
  desiredWindow?: string;
  dreamDescription?: string;
  dreamSymbols?: string;
  auraSymptoms?: string;
  blockageDetails?: string;
  careerField?: string;
  careerGoal?: string;
  spiritGuideFocus?: string;
  pastLifeFocus?: string;
  hiddenTruthFocus?: string[];
  detoxIntention?: string;
  thirdEyeFocus?: string;
}

export type ReadingTier = 'standard' | 'detailed' | 'premium';

export interface SectionDefinition {
  id: string;
  key: string;
  name: string;
  category: 'core' | 'numerology_astrology' | 'tarot_spread' | 'synthesis_psychology' | 'remedies_action' | 'master_specialized';
  description: string;
  defaultIncludedInTiers: ('standard' | 'detailed' | 'premium')[];
  archetypeRestrictions?: ('A' | 'B' | 'C' | 'D' | 'E' | 'F')[];
  requiresDob?: boolean;
  exclusionReason?: string;
}

export interface ReadingInputs {
  name: string;
  age: string;
  dob: string; // MM/DD/YYYY (optional - if omitted, numerology is cleanly removed)
  zodiacSign?: string; // Optional or auto-calculated (Aries, Taurus, etc.)
  tier?: ReadingTier; // 'standard' (15-18 pages), 'detailed' (25-28 pages), 'premium' (32+ pages)
  problem: string;
  question: string;
  topic: string;
  shopName?: string; // Shop / Studio name for PDF header & branding
  cards: [TarotCard | null, TarotCard | null, TarotCard | null];
  categoryData?: CategoryCustomData;
  customSections?: string[]; // IDs of explicitly enabled sections
  excludedSections?: string[]; // IDs of explicitly excluded sections
}

export interface NumerologyBreakdown {
  lifePathNumber: number;
  mathBreakdown: string;
  coreEnergyTitle: string;
  archetype: string;
  governingPlanet: string;
}

export interface StoredReading {
  id: string;
  createdAt: string;
  inputs: {
    name: string;
    age: string;
    dob: string;
    zodiacSign?: string;
    tier?: ReadingTier;
    problem: string;
    question: string;
    topic: string;
    shopName?: string;
    cardNames: [string, string, string];
  };
  lifePath: number;
  markdownContent: string;
  source?: 'gemini-ai' | 'algorithmic';
  model?: string;
}
