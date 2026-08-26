export interface ZodiacProfile {
  name: string;
  symbol: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  rulingPlanet: string;
  archetype: string;
  essence: string;
  shadow: string;
  transitFocus: string;
}

export const ZODIAC_PROFILES: Record<string, ZodiacProfile> = {
  Aries: {
    name: 'Aries',
    symbol: '♈',
    dates: 'Mar 21 - Apr 19',
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    archetype: 'The Sovereign Pioneer',
    essence: 'Courageous, instinctual, and unapologetically visionary.',
    shadow: 'Impatience, impulsiveness, and fear of vulnerability.',
    transitFocus: 'Harnessing focused discipline rather than scattered force.',
  },
  Taurus: {
    name: 'Taurus',
    symbol: '♉',
    dates: 'Apr 20 - May 20',
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus',
    archetype: 'The Sacred Grounder',
    essence: 'Sensual, devoted, resilient, and master of somatic stability.',
    shadow: 'Resistance to necessary evolution, stubbornness, and holding on too long.',
    transitFocus: 'Opening to dynamic change while remaining deeply rooted in self-worth.',
  },
  Gemini: {
    name: 'Gemini',
    symbol: '♊',
    dates: 'May 21 - Jun 20',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    archetype: 'The Cosmic Alchemist',
    essence: 'Quick-witted, versatile, communicative, and intellectually curious.',
    shadow: 'Mental dispersion, nervous restlessness, and surface-level detachment.',
    transitFocus: 'Deepening emotional presence beneath cognitive analysis.',
  },
  Cancer: {
    name: 'Cancer',
    symbol: '♋',
    dates: 'Jun 21 - Jul 22',
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'The Moon',
    archetype: 'The Intuitive Sanctuary',
    essence: 'Deeply empathic, fiercely protective, and psychically receptive.',
    shadow: 'Retreating into defensive armor, emotional over-absorption, and clinging to past wounds.',
    transitFocus: 'Honoring clear energetic boundaries while keeping the heart open.',
  },
  Leo: {
    name: 'Leo',
    symbol: '♌',
    dates: 'Jul 23 - Aug 22',
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'The Sun',
    archetype: 'The Radiant Creator',
    essence: 'Magnanimous, charismatic, warm-hearted, and courageous.',
    shadow: 'Pride, reliance on external validation, and fear of being overlooked.',
    transitFocus: 'Reclaiming self-validation as the true source of magnetic radiance.',
  },
  Virgo: {
    name: 'Virgo',
    symbol: '♍',
    dates: 'Aug 23 - Sep 22',
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury / Chiron',
    archetype: 'The Sacred Healer',
    essence: 'Discerning, dedicated, refined, and intrinsically aligned with truth.',
    shadow: 'Hyper-criticism, overthinking small details, and emotional exhaustion from fixing others.',
    transitFocus: 'Embracing divine perfection within organic, messy growth.',
  },
  Libra: {
    name: 'Libra',
    symbol: '♎',
    dates: 'Sep 23 - Oct 22',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus',
    archetype: 'The Harmonious Mirror',
    essence: 'Diplomatic, aesthetically elevated, just, and relationally gifted.',
    shadow: 'People-pleasing, fear of confrontation, and decision paralysis.',
    transitFocus: 'Speaking unvarnished truth without fearing the loss of connection.',
  },
  Scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    dates: 'Oct 23 - Nov 21',
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Pluto & Mars',
    archetype: 'The Mystic Phoenix',
    essence: 'Penetrating, loyal, transformative, and deeply psychic.',
    shadow: 'Vindictiveness, hyper-vigilance, and fear of betrayal.',
    transitFocus: 'Surrendering control to invite true emotional rebirth and trust.',
  },
  Sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    dates: 'Nov 22 - Dec 21',
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    archetype: 'The Cosmic Seeker',
    essence: 'Expansive, philosophical, truth-speaking, and freedom-loving.',
    shadow: 'Restless escapism, dogmatism, and avoiding emotional depth.',
    transitFocus: 'Anchoring philosophical ideals into consistent daily practices.',
  },
  Capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    dates: 'Dec 22 - Jan 19',
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn',
    archetype: 'The Master Builder',
    essence: 'Authoritative, enduring, disciplined, and structurally visionary.',
    shadow: 'Emotional rigidity, fear of vulnerability, and measuring worth by productivity.',
    transitFocus: 'Softening into emotional receptivity alongside worldly mastery.',
  },
  Aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    dates: 'Jan 20 - Feb 18',
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Uranus & Saturn',
    archetype: 'The Visionary Rebel',
    essence: 'Innovative, humanitarian, individualistic, and intuitively ahead of their time.',
    shadow: 'Emotional detachment, contrarianism, and intellectual aloofness.',
    transitFocus: 'Bridging high-frequency vision with grounded, intimate presence.',
  },
  Pisces: {
    name: 'Pisces',
    symbol: '♓',
    dates: 'Feb 19 - Mar 20',
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Neptune & Jupiter',
    archetype: 'The Mystic Dreamer',
    essence: 'Compassionate, transcendent, artistic, and boundless in soul resonance.',
    shadow: 'Escapism, boundary dissolution, and playing the martyr.',
    transitFocus: 'Grounding ethereal intuition into strong physical boundaries.',
  },
};

/**
 * Calculates Zodiac Sign from a Date of Birth string
 */
export function getZodiacFromDob(dobString?: string): ZodiacProfile | null {
  if (!dobString || !dobString.trim()) return null;

  const cleaned = dobString.trim();
  let month = 0;
  let day = 0;

  if (cleaned.includes('/')) {
    const parts = cleaned.split('/');
    month = parseInt(parts[0], 10);
    day = parseInt(parts[1], 10);
  } else if (cleaned.includes('-')) {
    const parts = cleaned.split('-');
    if (parts[0].length === 4) {
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
    }
  } else {
    const parsedDate = new Date(cleaned);
    if (!isNaN(parsedDate.getTime())) {
      month = parsedDate.getMonth() + 1;
      day = parsedDate.getDate();
    }
  }

  if (!month || !day || isNaN(month) || isNaN(day)) {
    return null;
  }

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_PROFILES['Aries'];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_PROFILES['Taurus'];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_PROFILES['Gemini'];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_PROFILES['Cancer'];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_PROFILES['Leo'];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_PROFILES['Virgo'];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_PROFILES['Libra'];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_PROFILES['Scorpio'];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_PROFILES['Sagittarius'];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_PROFILES['Capricorn'];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_PROFILES['Aquarius'];
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return ZODIAC_PROFILES['Pisces'];

  return null;
}

export function getZodiacProfile(nameOrDob?: string): ZodiacProfile {
  if (!nameOrDob) return ZODIAC_PROFILES['Scorpio']; // Elegant default
  const direct = ZODIAC_PROFILES[nameOrDob];
  if (direct) return direct;
  const fromDob = getZodiacFromDob(nameOrDob);
  if (fromDob) return fromDob;
  return ZODIAC_PROFILES['Scorpio'];
}
