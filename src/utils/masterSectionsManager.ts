import { ReadingInputs, ReadingTier, TarotCard } from '../types';
import { getZodiacProfile, getZodiacFromDob, ZodiacProfile } from './astrology';
import { calculateLifePath } from './numerology';
import { CategorySpec, getCategorySpecByTopic } from '../data/categoryConfig';

export type MasterSectionDomain =
  | 'intro_navigation'
  | 'numerology_astrology'
  | 'divination_tarot'
  | 'energy_chakras'
  | 'vedic_remedies'
  | 'action_manifestation'
  | 'specialized_focus'
  | 'conclusion_backmatter';

export interface MasterSectionDef {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  domain: MasterSectionDomain;
  domainName: string;
  defaultTiers: ReadingTier[];
  description: string;
  iconName?: string;
  isDobRequired?: boolean;
}

export const MASTER_48_SECTIONS: MasterSectionDef[] = [
  // 1. Introduction & Navigation
  {
    id: 1,
    code: 'cover_page',
    title: 'Cover Page',
    subtitle: 'Sacred Title & Querent Presentation',
    domain: 'intro_navigation',
    domainName: 'Introduction & Navigation',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Bespoke artistic cover framed with celestial geometry, querent name, and shop insignia.',
  },
  {
    id: 2,
    code: 'title_subtitle',
    title: 'Title & Subtitle Page',
    subtitle: 'Cosmic Invocation & Modality Seal',
    domain: 'intro_navigation',
    domainName: 'Introduction & Navigation',
    defaultTiers: ['premium'],
    description: 'Formal esoteric frontispiece declaring the energetic invocation and planetary auspices.',
  },
  {
    id: 3,
    code: 'table_of_contents',
    title: 'Table of Contents',
    subtitle: 'Sacred Report Navigation & Index',
    domain: 'intro_navigation',
    domainName: 'Introduction & Navigation',
    defaultTiers: ['detailed', 'premium'],
    description: 'Visual multi-chapter index detailing each sacred milestone and transmission page.',
  },
  {
    id: 4,
    code: 'navigation_guide',
    title: 'How to Read & Navigate This Report',
    subtitle: 'Integration Protocol & Reader Key',
    domain: 'intro_navigation',
    domainName: 'Introduction & Navigation',
    defaultTiers: ['premium'],
    description: 'Instructions on integrating the reading, working with timestamps, and holding sacred space.',
  },
  {
    id: 5,
    code: 'welcome_greeting',
    title: 'Welcome Letter & Personal Greeting',
    subtitle: 'Soul-to-Soul Alignment & Reader Greeting',
    domain: 'intro_navigation',
    domainName: 'Introduction & Navigation',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Heartfelt, empathetic opening letter welcoming the querent into their sacred oracle transmission.',
  },
  {
    id: 6,
    code: 'intention_setting',
    title: 'Intention Setting & Sacred Space Invitation',
    subtitle: 'Sanctuary Consecration & Breathwork',
    domain: 'intro_navigation',
    domainName: 'Introduction & Navigation',
    defaultTiers: ['detailed', 'premium'],
    description: 'Ritual grounding invitation, candle lighting invocation, and nervous system calibration.',
  },
  {
    id: 7,
    code: 'client_profile',
    title: 'Client Profile / Birth Chart Snapshot',
    subtitle: 'Cosmic Coordinates & Inquiry Seal',
    domain: 'intro_navigation',
    domainName: 'Introduction & Navigation',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Querent intake summary, core question, current situation, and natal astral snapshot.',
  },

  // 2. Core Numerology & Astrology
  {
    id: 8,
    code: 'numerology_foundation',
    title: 'Numerology Foundation',
    subtitle: 'Life Path, Expression & Soul Urge',
    domain: 'numerology_astrology',
    domainName: 'Core Numerology & Astrology',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Mathematical breakdown of the Life Path number, governing planet, and vibration.',
    isDobRequired: true,
  },
  {
    id: 9,
    code: 'personal_cycles',
    title: 'Personal Year & Epicycle Timing',
    subtitle: 'Annual Vibration & Monthly Rhythms',
    domain: 'numerology_astrology',
    domainName: 'Core Numerology & Astrology',
    defaultTiers: ['detailed', 'premium'],
    description: 'Calculation of current Personal Year (1-9 cycle) and seasonal energetic tides.',
    isDobRequired: true,
  },
  {
    id: 10,
    code: 'astrological_blueprint',
    title: 'Astrological Blueprint',
    subtitle: 'Sun, Moon & Rising Archetype',
    domain: 'numerology_astrology',
    domainName: 'Core Numerology & Astrology',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Zodiac sign breakdown, ruling luminary, element alignment, and cosmic persona.',
  },
  {
    id: 11,
    code: 'natal_highlights',
    title: 'Planetary Placements & Natal Highlights',
    subtitle: 'Key Planetary Dignities & Houses',
    domain: 'numerology_astrology',
    domainName: 'Core Numerology & Astrology',
    defaultTiers: ['premium'],
    description: 'Esoteric examination of Venus, Mars, Mercury, and Saturn influences upon the querent.',
  },
  {
    id: 12,
    code: 'planetary_transits',
    title: 'Current Transits & Retrograde Impact',
    subtitle: 'Current Planetary Shifts & Karmic Gates',
    domain: 'numerology_astrology',
    domainName: 'Core Numerology & Astrology',
    defaultTiers: ['detailed', 'premium'],
    description: 'Real-time transit alignments, outer planet aspects, and retrograde integration.',
  },
  {
    id: 13,
    code: 'lunar_phase',
    title: 'Lunar Phase Influence',
    subtitle: 'Waxing, Waning & Eclipse Harmonics',
    domain: 'numerology_astrology',
    domainName: 'Core Numerology & Astrology',
    defaultTiers: ['detailed', 'premium'],
    description: 'Current Moon phase dynamics, emotional tides, and optimal manifesting windows.',
  },
  {
    id: 14,
    code: 'elemental_balance',
    title: 'Elemental Energy Balance',
    subtitle: 'Fire, Water, Air, Earth Distribution',
    domain: 'numerology_astrology',
    domainName: 'Core Numerology & Astrology',
    defaultTiers: ['detailed', 'premium'],
    description: 'Comprehensive elemental constitution analysis and balancing recommendations.',
  },
  {
    id: 15,
    code: 'modality_breakdown',
    title: 'Modality Breakdown',
    subtitle: 'Cardinal, Fixed & Mutable Energies',
    domain: 'numerology_astrology',
    domainName: 'Core Numerology & Astrology',
    defaultTiers: ['premium'],
    description: 'Initiation, endurance, and adaptability quotient across the querent’s active field.',
  },

  // 3. Divination & Tarot Spreads
  {
    id: 16,
    code: 'primary_spread_overview',
    title: 'Primary Tarot Spread Overview',
    subtitle: 'Layout Geometry & Position Map',
    domain: 'divination_tarot',
    domainName: 'Divination & Tarot Spreads',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'High-level sacred altar view showing Card 1 (Current), Card 2 (Blockage), Card 3 (Path).',
  },
  {
    id: 17,
    code: 'card_by_card_deep_dive',
    title: 'Card-by-Card Deep Dive',
    subtitle: 'Symbology, Keywords & Dual Truths',
    domain: 'divination_tarot',
    domainName: 'Divination & Tarot Spreads',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Full-page bespoke transmissions for each card with rich illustration artwork.',
  },
  {
    id: 18,
    code: 'oracle_companion_card',
    title: 'Oracle / Companion Card',
    subtitle: 'Higher Self & Overarching Etheric Key',
    domain: 'divination_tarot',
    domainName: 'Divination & Tarot Spreads',
    defaultTiers: ['detailed', 'premium'],
    description: 'Companion oracle channel illuminating the soul-level lesson and guardian vibration.',
  },
  {
    id: 19,
    code: 'secondary_spread',
    title: 'Secondary Focused Spread',
    subtitle: 'Targeted Inquiry Cross / Trine Spread',
    domain: 'divination_tarot',
    domainName: 'Divination & Tarot Spreads',
    defaultTiers: ['premium'],
    description: 'Specialized 2nd spread examining hidden motives, timeline accelerators, and subconscious blocks.',
  },
  {
    id: 20,
    code: 'card_interplay_analysis',
    title: 'Card Combination & Interplay Analysis',
    subtitle: 'Elemental Alchemy & Dynamic Dialogue',
    domain: 'divination_tarot',
    domainName: 'Divination & Tarot Spreads',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Synthesis of how the 3 drawn cards interact, clash, harmonize, and resolve.',
  },
  {
    id: 21,
    code: 'suit_court_dominance',
    title: 'Suit & Court Card Dominance Analysis',
    subtitle: 'Arcana Weight & Power Distribution',
    domain: 'divination_tarot',
    domainName: 'Divination & Tarot Spreads',
    defaultTiers: ['detailed', 'premium'],
    description: 'Analysis of Major vs. Minor arcana ratio and suit emphasis (Swords, Cups, Wands, Pentacles).',
  },

  // 4. Energy, Chakras & Subconscious
  {
    id: 22,
    code: 'chakra_alignment_status',
    title: 'Chakra Alignment & Energy Center Status',
    subtitle: '7-Center Diagnostic & Flow Assessment',
    domain: 'energy_chakras',
    domainName: 'Energy, Chakras & Subconscious',
    defaultTiers: ['detailed', 'premium'],
    description: 'In-depth assessment of Root through Crown chakras with identified blocks and remedies.',
  },
  {
    id: 23,
    code: 'aura_energy_field',
    title: 'Aura & Energy Field Analysis',
    subtitle: 'Auric Layers, Hue Resonance & Boundaries',
    domain: 'energy_chakras',
    domainName: 'Energy, Chakras & Subconscious',
    defaultTiers: ['detailed', 'premium'],
    description: 'Evaluation of the etheric boundary, auric color frequencies, and energetic leaks.',
  },
  {
    id: 24,
    code: 'shadow_work_obstacles',
    title: 'Shadow Work & Hidden Obstacles',
    subtitle: 'Subconscious Fears & Blindspot Transmutation',
    domain: 'energy_chakras',
    domainName: 'Energy, Chakras & Subconscious',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Unveiling subconscious defense mechanisms, projections, and shadow gold.',
  },
  {
    id: 25,
    code: 'karmic_lessons_past_life',
    title: 'Karmic Lessons & Past Life Influences',
    subtitle: 'Akashic Imprints & Soul Contracts',
    domain: 'energy_chakras',
    domainName: 'Energy, Chakras & Subconscious',
    defaultTiers: ['detailed', 'premium'],
    description: 'Past life vows, ancestral cords, and recurring karmic motifs completing in this chapter.',
  },
  {
    id: 26,
    code: 'dream_subconscious_messages',
    title: 'Dream Interpretation & Subconscious Messages',
    subtitle: 'Nocturnal Omens & Astral Symbolism',
    domain: 'energy_chakras',
    domainName: 'Energy, Chakras & Subconscious',
    defaultTiers: ['premium'],
    description: 'Decoding subconscious dream symbolism and intuitive nocturnal messages.',
  },
  {
    id: 27,
    code: 'animal_spirit_guide',
    title: 'Animal Spirit Guide / Totem of the Period',
    subtitle: 'Totem Medicine & Guardian Ally',
    domain: 'energy_chakras',
    domainName: 'Energy, Chakras & Subconscious',
    defaultTiers: ['detailed', 'premium'],
    description: 'Channeled spirit animal archetype supporting the querent through this specific transition.',
  },

  // 5. Vedic, Esoteric & Traditional Remedies
  {
    id: 28,
    code: 'rudraksha_talisman_theory',
    title: 'Rudraksha & Talisman Recommendations',
    subtitle: 'Mukhi Selection & Sacred Armor',
    domain: 'vedic_remedies',
    domainName: 'Vedic & Esoteric Remedies',
    defaultTiers: ['premium'],
    description: 'Vedic Rudraksha bead prescription (e.g. 5-Mukhi, 6-Mukhi, 7-Mukhi) and talisman amulets.',
  },
  {
    id: 29,
    code: 'crystal_gemstone_therapy',
    title: 'Crystal & Gemstone Therapy',
    subtitle: 'Mineral Allies, Cleansing & Activation',
    domain: 'vedic_remedies',
    domainName: 'Vedic & Esoteric Remedies',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Bespoke gemstone and crystal prescription tailored specifically to the drawn spread.',
  },
  {
    id: 30,
    code: 'yantra_sacred_geometry',
    title: 'Yantra & Sacred Geometry Recommendations',
    subtitle: 'Geometric Vibrational Seals & Meditation',
    domain: 'vedic_remedies',
    domainName: 'Vedic & Esoteric Remedies',
    defaultTiers: ['premium'],
    description: 'Sacred yantra (Sri Yantra, Gayatri Yantra, etc.) and geometric meditation focus.',
  },
  {
    id: 31,
    code: 'auspicious_timing_muhurat',
    title: 'Auspicious Timing & Days to Watch Out',
    subtitle: 'Lunar Windows, Days of Power & Caution',
    domain: 'vedic_remedies',
    domainName: 'Vedic & Esoteric Remedies',
    defaultTiers: ['detailed', 'premium'],
    description: 'Calculated calendar windows for major decisions, signatures, and energetic caution.',
  },
  {
    id: 32,
    code: 'color_therapy_palettes',
    title: 'Color Therapy & Healing Palettes',
    subtitle: 'Chromotherapy & Environmental Resonance',
    domain: 'vedic_remedies',
    domainName: 'Vedic & Esoteric Remedies',
    defaultTiers: ['detailed', 'premium'],
    description: 'Vibrational color palette to wear and surround oneself with for emotional equilibrium.',
  },
  {
    id: 33,
    code: 'botanicals_aromatherapy',
    title: 'Herb, Essential Oil & Aromatherapy Prescriptions',
    subtitle: 'Plant Allies & Botanical Essences',
    domain: 'vedic_remedies',
    domainName: 'Vedic & Esoteric Remedies',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Herbal teas, essential oil diffuser blends, and botanical aura mists for daily use.',
  },

  // 6. Action, Mindset & Manifestation
  {
    id: 34,
    code: 'success_mantras_affirmations',
    title: 'Success Mantras & Daily Affirmations',
    subtitle: '5 Channeled "I AM" Energetic Seals',
    domain: 'action_manifestation',
    domainName: 'Action & Manifestation',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'High-frequency affirmations designed to rewire neural pathways and elevate confidence.',
  },
  {
    id: 35,
    code: 'personalized_sigil',
    title: 'Personalized Sigil & Manifestation Symbol',
    subtitle: 'Encoded Vector Key for Soul Intent',
    domain: 'action_manifestation',
    domainName: 'Action & Manifestation',
    defaultTiers: ['premium'],
    description: 'Custom sacred geometry sigil synthesized from querent name and core desire.',
  },
  {
    id: 36,
    code: 'rituals_candle_magic',
    title: 'Rituals, Candle Magic & Meditation Practices',
    subtitle: 'Step-by-Step Sacred Ceremonies',
    domain: 'action_manifestation',
    domainName: 'Action & Manifestation',
    defaultTiers: ['detailed', 'premium'],
    description: 'Prescribed candle color, herb dressing, moon phase, and guided meditation ritual.',
  },
  {
    id: 37,
    code: 'energy_shielding_cleansing',
    title: 'Energy Shielding & Aura Cleansing Techniques',
    subtitle: 'Pranic Protection & Salt Cleanses',
    domain: 'action_manifestation',
    domainName: 'Action & Manifestation',
    defaultTiers: ['detailed', 'premium'],
    description: 'Techniques for psychic shielding, cord cutting, and spiritual hygiene.',
  },
  {
    id: 38,
    code: 'qa_journaling_inquiries',
    title: 'Q&A / Deep Soul Inquiries',
    subtitle: 'Channeled Answers & Subconscious Architecture',
    domain: 'action_manifestation',
    domainName: 'Action & Manifestation',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Multi-part channeled answers to core soul questions with somatic somatic keys.',
  },
  {
    id: 39,
    code: '90_day_action_roadmap',
    title: '90-Day Action Roadmap & Milestone Timeline',
    subtitle: 'Phased Evolutionary Blueprint',
    domain: 'action_manifestation',
    domainName: 'Action & Manifestation',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Strategic week-by-week and month-by-month actionable roadmap for tangible results.',
  },

  // 7. Specialized Focus Areas (Modular/Add-ons)
  {
    id: 40,
    code: 'career_wealth_blueprint',
    title: 'Career, Business & Wealth Blueprint',
    subtitle: 'Abundance Vectors & Vocational Destiny',
    domain: 'specialized_focus',
    domainName: 'Specialized Focus Areas',
    defaultTiers: ['detailed', 'premium'],
    description: 'Tailored career path analysis, financial abundance blocks, and monetization portals.',
  },
  {
    id: 41,
    code: 'love_compatibility_dynamics',
    title: 'Love, Compatibility & Relationship Dynamics',
    subtitle: 'Soulmate Chemistry & Emotional Reciprocity',
    domain: 'specialized_focus',
    domainName: 'Specialized Focus Areas',
    defaultTiers: ['detailed', 'premium'],
    description: 'Deep relational matrix, attachment styles, unspoken feelings, and union trajectory.',
  },
  {
    id: 42,
    code: 'health_vitality_biorhythms',
    title: 'Health, Vitality & Biorhythm Cycles',
    subtitle: 'Somatic Equilibrium & Vitality Waves',
    domain: 'specialized_focus',
    domainName: 'Specialized Focus Areas',
    defaultTiers: ['premium'],
    description: 'Nervous system soothing protocols, circadian alignment, and energetic vitality tips.',
  },
  {
    id: 43,
    code: 'home_feng_shui_clearing',
    title: 'Home Feng Shui & Space Clearing Tips',
    subtitle: 'Sanctuary Harmonization & Flow',
    domain: 'specialized_focus',
    domainName: 'Specialized Focus Areas',
    defaultTiers: ['premium'],
    description: 'Spatial energy clearing, bagua placement tips, and altar setup recommendations.',
  },

  // 8. Conclusion & Backmatter
  {
    id: 44,
    code: 'master_synthesis',
    title: 'Master Synthesis & Holistic Summary',
    subtitle: 'Unified Oracle Breakthrough & Convergence',
    domain: 'conclusion_backmatter',
    domainName: 'Conclusion & Backmatter',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'The overarching cosmic convergence connecting numerology, cards, and query.',
  },
  {
    id: 45,
    code: 'final_blessings_signoff',
    title: 'Final Blessings & Inspirational Sign-off',
    subtitle: 'Sacred Benediction & Reader Closure',
    domain: 'conclusion_backmatter',
    domainName: 'Conclusion & Backmatter',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Final words of encouragement, reader blessing, and permanent energetic seal.',
  },
  {
    id: 46,
    code: 'esoteric_glossary',
    title: 'Esoteric Glossary & Symbolism Guide',
    subtitle: 'Reference Index of Sacred Archetypes',
    domain: 'conclusion_backmatter',
    domainName: 'Conclusion & Backmatter',
    defaultTiers: ['detailed', 'premium'],
    description: 'Comprehensive definitions for major astrological, tarot, and numerological terms.',
  },
  {
    id: 47,
    code: 'recommended_reading_resources',
    title: 'Recommended Reading & Sacred Resources',
    subtitle: 'Curated Texts, Tools & Spiritual Guides',
    domain: 'conclusion_backmatter',
    domainName: 'Conclusion & Backmatter',
    defaultTiers: ['premium'],
    description: 'Hand-picked literature, meditation tools, and sacred practices to continue the journey.',
  },
  {
    id: 48,
    code: 'disclaimer_ethical_guidelines',
    title: 'Disclaimer, Copyright & Ethical Guidelines',
    subtitle: 'Professional Standards & Free-Will Statement',
    domain: 'conclusion_backmatter',
    domainName: 'Conclusion & Backmatter',
    defaultTiers: ['standard', 'detailed', 'premium'],
    description: 'Legal disclaimer, entertainment/empowerment statement, and confidentiality pledge.',
  },
];

/**
 * Helper to determine which sections should be active given:
 * 1. Tier (Standard, Detailed, Premium)
 * 2. Has DOB (if false, remove numerology/personal cycles)
 * 3. Topic / Category type (automatically add/prioritize Love vs. Career vs. Spiritual vs. Forecast)
 * 4. Optional user customized overrides
 */
export function resolveActiveSections(
  inputs: ReadingInputs,
  tierOverride?: ReadingTier,
  customSelectedCodes?: string[]
): MasterSectionDef[] {
  const tier = tierOverride || inputs.tier || 'detailed';
  const hasDob = Boolean(inputs.dob && inputs.dob.trim().length > 3);
  const categorySpec = getCategorySpecByTopic(inputs.topic || 1);

  // If user passed explicit selection list, use that
  if (customSelectedCodes && customSelectedCodes.length > 0) {
    return MASTER_48_SECTIONS.filter((sec) => {
      if (sec.isDobRequired && !hasDob) return false;
      return customSelectedCodes.includes(sec.code);
    });
  }

  // Otherwise, compute the optimal sequenced list based on Tier + Category relevance
  return MASTER_48_SECTIONS.filter((sec) => {
    // Check DOB requirement
    if (sec.isDobRequired && !hasDob) return false;

    // Check if included in default for this tier
    const isIncludedInTier = sec.defaultTiers.includes(tier);
    const topicStr = (inputs.topic || '').toLowerCase();
    const isLoveCategory =
      categorySpec.categoryType === 'love_blocks' ||
      categorySpec.categoryType === 'relationship_partner' ||
      categorySpec.categoryType === 'cord_cutting' ||
      topicStr.includes('love') ||
      topicStr.includes('soulmate') ||
      topicStr.includes('feelings') ||
      topicStr.includes('partner') ||
      topicStr.includes('ex');

    const isCareerCategory =
      categorySpec.categoryType === 'career_job' ||
      categorySpec.categoryType === 'money_flow' ||
      topicStr.includes('career') ||
      topicStr.includes('job') ||
      topicStr.includes('business') ||
      topicStr.includes('wealth') ||
      topicStr.includes('money') ||
      topicStr.includes('finance');

    if (!isIncludedInTier) {
      // Check if this is a specialized focus area that matches the category directly
      if (sec.code === 'love_compatibility_dynamics' && isLoveCategory) {
        return true;
      }
      if (sec.code === 'career_wealth_blueprint' && isCareerCategory) {
        return true;
      }
      if (sec.code === 'karmic_lessons_past_life' && (topicStr.includes('karmic') || topicStr.includes('past life') || topicStr.includes('reincarnation'))) {
        return true;
      }
      if (sec.code === 'health_vitality_biorhythms' && (topicStr.includes('health') || topicStr.includes('vitality') || topicStr.includes('body') || topicStr.includes('healing'))) {
        return true;
      }
      if (sec.code === 'home_feng_shui_clearing' && (topicStr.includes('home') || topicStr.includes('feng shui') || topicStr.includes('space') || topicStr.includes('house'))) {
        return true;
      }
      return false;
    }

    // Filter out specialized focus that contradicts the category
    if (sec.code === 'love_compatibility_dynamics' && isCareerCategory && !isLoveCategory) {
      return false;
    }
    if (sec.code === 'career_wealth_blueprint' && isLoveCategory && !isCareerCategory) {
      return false;
    }

    return true;
  });
}

/**
 * Generate calculated esoteric dataset for the querent based on inputs
 */
export function getEsotericCalculations(inputs: ReadingInputs) {
  const hasDob = Boolean(inputs.dob && inputs.dob.trim().length > 3);
  const zodiac = inputs.zodiacSign
    ? getZodiacProfile(inputs.zodiacSign)
    : (hasDob ? getZodiacFromDob(inputs.dob) || getZodiacProfile('Aries') : getZodiacProfile('Aries'));

  const numerology = hasDob ? calculateLifePath(inputs.dob) : null;
  const lpNum = numerology?.lifePathNumber || 7;

  // Derive active elemental balance from cards + zodiac
  const card1 = inputs.cards[0];
  const card2 = inputs.cards[1];
  const card3 = inputs.cards[2];

  const elementsCount: Record<string, number> = { Fire: 0, Water: 0, Air: 0, Earth: 0 };
  if (zodiac) elementsCount[zodiac.element] = (elementsCount[zodiac.element] || 0) + 1.5;
  [card1, card2, card3].forEach((c) => {
    if (c?.element && c.element in elementsCount) {
      elementsCount[c.element]++;
    }
  });

  const totalElem = Object.values(elementsCount).reduce((a, b) => a + b, 0) || 1;
  const elementalPercentages = {
    Fire: Math.round((elementsCount.Fire / totalElem) * 100),
    Water: Math.round((elementsCount.Water / totalElem) * 100),
    Air: Math.round((elementsCount.Air / totalElem) * 100),
    Earth: Math.round((elementsCount.Earth / totalElem) * 100),
  };

  // Modality Breakdown
  const modalities = {
    Cardinal: 40,
    Fixed: 35,
    Mutable: 25,
  };
  if (zodiac) {
    if (['Aries', 'Cancer', 'Libra', 'Capricorn'].includes(zodiac.name)) {
      modalities.Cardinal = 50; modalities.Fixed = 25; modalities.Mutable = 25;
    } else if (['Taurus', 'Leo', 'Scorpio', 'Aquarius'].includes(zodiac.name)) {
      modalities.Fixed = 50; modalities.Cardinal = 25; modalities.Mutable = 25;
    } else {
      modalities.Mutable = 50; modalities.Cardinal = 25; modalities.Fixed = 25;
    }
  }

  // Personal Year Cycle
  const currentYear = new Date().getFullYear();
  let personalYear = 1;
  if (hasDob) {
    const parts = inputs.dob.split(/[/.-]/);
    if (parts.length >= 2) {
      const month = parseInt(parts[0], 10) || 1;
      const day = parseInt(parts[1], 10) || 1;
      const rawSum = month + day + currentYear;
      const reduced = (rawSum % 9) || 9;
      personalYear = reduced;
    }
  }

  const personalYearThemes: Record<number, { title: string; focus: string; mantra: string }> = {
    1: { title: 'Year of New Beginnings & Pioneering Seeds', focus: 'Initiating major projects, fearless self-definition, launching new chapters.', mantra: 'I step forward into uncharted territory with unshakeable courage.' },
    2: { title: 'Year of Patient Alignment & Sacred Partnerships', focus: 'Cultivating emotional reciprocity, intuitive receptivity, and cooperative harmony.', mantra: 'I trust divine timing and allow harmonious connections to flourish.' },
    3: { title: 'Year of Creative Expansion & Self-Expression', focus: 'Vocalizing truth, artistic breakthroughs, social radiance, and optimistic joy.', mantra: 'My authentic voice and joyful spirit illuminate the world.' },
    4: { title: 'Year of Foundation Building & Grounded Discipline', focus: 'Organizing practical systems, physical health, material security, and steady roots.', mantra: 'I build enduring foundations that honor my long-term peace.' },
    5: { title: 'Year of Dynamic Freedom & Pivotal Transformation', focus: 'Embracing unexpected changes, breaking free from restriction, and soul adventure.', mantra: 'I surrender outdated cages and welcome invigorating evolution.' },
    6: { title: 'Year of Heart Nurturing, Domestic Peace & Service', focus: 'Healing family cords, beautifying living sanctuary, and honoring sacred commitments.', mantra: 'I radiate unconditional love and cultivate domestic sanctuary.' },
    7: { title: 'Year of Spiritual Mastery, Solitude & Deep Wisdom', focus: 'Introspection, meditation, studying esoteric arts, and inner psychological renewal.', mantra: 'In sacred stillness, I uncover the infinite wisdom of my soul.' },
    8: { title: 'Year of Sovereign Power, Abundance & Karmic Harvest', focus: 'Stepping into leadership, financial elevation, executive authority, and empowerment.', mantra: 'I claim my sovereign authority and welcome boundless abundance.' },
    9: { title: 'Year of Grand Completion, Release & Transmutation', focus: 'Surrendering what is complete, forgiving the past, and preparing for rebirth.', mantra: 'I release with gratitude, creating space for my next ascension.' },
  };

  // Chakras status determination
  const chakras = [
    { name: 'Root Chakra (Muladhara)', status: 'Grounding & Stabilizing', note: 'Anchoring financial safety and physical presence.', color: '#C0392B', element: 'Earth' },
    { name: 'Sacral Chakra (Svadhisthana)', status: 'Flowing & Receptive', note: 'Awakening emotional passion and creative fertility.', color: '#D35400', element: 'Water' },
    { name: 'Solar Plexus (Manipura)', status: 'Ignited & Sovereign', note: 'Claiming personal boundaries and decision-making power.', color: '#F39C12', element: 'Fire' },
    { name: 'Heart Chakra (Anahata)', status: 'Opening & Receptive', note: 'Dissolving past defenses to welcome reciprocal affection.', color: '#27AE60', element: 'Air' },
    { name: 'Throat Chakra (Vishuddha)', status: 'Calibrating Truth', note: 'Expressing non-negotiables with dignity and clarity.', color: '#2980B9', element: 'Ether' },
    { name: 'Third Eye (Ajna)', status: 'Highly Active & Perceptive', note: 'Direct intuitive hits and heightened synchronicity perception.', color: '#8E44AD', element: 'Light' },
    { name: 'Crown Chakra (Sahasrara)', status: 'Divine Alignment', note: 'Connected to cosmic grace and higher guidance.', color: '#6C3483', element: 'Cosmos' },
  ];

  // Rudraksha / Talisman suggestion
  const rudrakshaRecommendations: Record<number, { mukhi: string; rulingDeity: string; benefits: string }> = {
    1: { mukhi: '1-Mukhi & 12-Mukhi (Surya)', rulingDeity: 'Lord Shiva & Sun', benefits: 'Supreme leadership, unshakeable willpower, removal of self-doubt and vital authority.' },
    2: { mukhi: '2-Mukhi (Ardhanareshwar)', rulingDeity: 'Lord Shiva & Parvati', benefits: 'Emotional harmony, relationship healing, intuitive peace, and balance of opposites.' },
    3: { mukhi: '3-Mukhi (Agni) & 4-Mukhi (Brahma)', rulingDeity: 'Agni & Lord Brahma', benefits: 'Creative genius, public eloquence, releasing past guilt, and vibrant self-expression.' },
    4: { mukhi: '4-Mukhi & 8-Mukhi (Ganesha)', rulingDeity: 'Lord Ganesha & Rahu', benefits: 'Removal of obstacles, grounding focus, career structure, and material stability.' },
    5: { mukhi: '5-Mukhi & 10-Mukhi (Vishnu)', rulingDeity: 'Lord Vishnu & Jupiter', benefits: 'Supreme mental peace, energetic protection, fearlessness during major transitions.' },
    6: { mukhi: '6-Mukhi (Kartikeya) & 13-Mukhi (Kamadeva)', rulingDeity: 'Lord Kartikeya & Venus', benefits: 'Heart attraction, magnetism, emotional wisdom, and graceful boundary management.' },
    7: { mukhi: '7-Mukhi (Mahalakshmi) & 9-Mukhi (Durga)', rulingDeity: 'Goddess Lakshmi & Ketu', benefits: 'Spiritual liberation, financial prosperity, intuition enhancement, and protection.' },
    8: { mukhi: '8-Mukhi (Ganesha) & 14-Mukhi (Deva Mani)', rulingDeity: 'Lord Hanuman & Saturn', benefits: 'Mastery over karmic blockages, executive power, victory in endeavors, and wealth.' },
    9: { mukhi: '9-Mukhi (Durga) & 11-Mukhi (Rudra)', rulingDeity: 'Maa Durga & 11 Rudras', benefits: 'Fearless empowerment, destruction of negative energetic cords, and grand completion.' },
  };

  // Yantra suggestion
  const yantraRecommendations: Record<number, { name: string; focus: string; geometricNotes: string }> = {
    1: { name: 'Surya Yantra & Sri Chakra', focus: 'Illumination of Purpose & Vital Power', geometricNotes: 'Central golden bindu radiating 12 solar rays and interlocking triangles of light.' },
    2: { name: 'Chandra Yantra & Venus Mandala', focus: 'Emotional Serenity & Relational Grace', geometricNotes: 'Concentric silver crescents framing the sacred lotus of inner receptivity.' },
    3: { name: 'Saraswati Yantra', focus: 'Creative Wisdom & Expressive Radiance', geometricNotes: 'Eight-petaled lotus surrounding the triangle of sacred speech and inspiration.' },
    4: { name: 'Kuber & Ganesha Yantra', focus: 'Material Stability & Grounded Prosperity', geometricNotes: 'Square earth enclosure with four gates, anchoring unshakeable material security.' },
    5: { name: 'Durga Beesa Yantra', focus: 'Fearless Protection & Sovereign Momentum', geometricNotes: 'Nine intersecting triangles dissolving external resistance and accelerating breakthrough.' },
    6: { name: 'Shukra (Venus) Yantra & Sri Yantra', focus: 'Heart Elevation, Beauty & Harmonious Union', geometricNotes: 'Nine interlocking triangles of cosmic love, generating magnetic harmony.' },
    7: { name: 'Mahamrityunjaya Yantra', focus: 'Spiritual Awakening, Healing & Deep Peace', geometricNotes: 'Eight-petaled lotus of supreme consciousness and energetic purification.' },
    8: { name: 'Shree Yantra & Shani Yantra', focus: 'Supreme Abundance, Authority & Karmic Victory', geometricNotes: '43 interlocking sub-triangles representing the complete cosmic manifestation.' },
    9: { name: 'Maa Kali & Gayatri Yantra', focus: 'Karmic Liberation & Divine Transmutation', geometricNotes: 'Sacred inverted trine of supreme liberation, clearing ancestral stagnation.' },
  };

  return {
    zodiac,
    numerology,
    lpNum,
    elementalPercentages,
    modalities,
    personalYear,
    personalYearData: personalYearThemes[personalYear] || personalYearThemes[1],
    chakras,
    rudraksha: rudrakshaRecommendations[lpNum] || rudrakshaRecommendations[7],
    yantra: yantraRecommendations[lpNum] || yantraRecommendations[7],
  };
}
