import { NumerologyBreakdown } from '../types';

/**
 * Reduce a number to a single digit (or leave as master number if relevant,
 * but user prompt specifically mentions reducing to single digit e.g. 23 -> 2+3=5).
 */
export function reduceToSingleDigit(num: number): { reduced: number; steps: string } {
  let current = num;
  const stepList: string[] = [];

  while (current > 9) {
    const digits = current.toString().split('').map(Number);
    const sum = digits.reduce((acc, val) => acc + val, 0);
    stepList.push(`${digits.join('+')}=${sum}`);
    current = sum;
  }

  return {
    reduced: current,
    steps: stepList.join(' -> ')
  };
}

export function calculateLifePath(dobString: string): NumerologyBreakdown | null {
  if (!dobString || !dobString.trim()) return null;

  // Attempt to parse MM/DD/YYYY or YYYY-MM-DD or Month DD, YYYY
  const cleaned = dobString.trim();
  let month = 0;
  let day = 0;
  let year = 0;

  if (cleaned.includes('/')) {
    const parts = cleaned.split('/');
    if (parts.length === 3) {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
  } else if (cleaned.includes('-')) {
    const parts = cleaned.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        day = parseInt(parts[2], 10);
      } else {
        month = parseInt(parts[0], 10);
        day = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
      }
    }
  } else {
    // Try parsing date string like "November 5, 2005" or "May 16, 2005"
    const parsedDate = new Date(cleaned);
    if (!isNaN(parsedDate.getTime())) {
      month = parsedDate.getMonth() + 1;
      day = parsedDate.getDate();
      year = parsedDate.getFullYear();
    } else {
      // Regex check for month names
      const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
      const lower = cleaned.toLowerCase();
      for (let i = 0; i < monthNames.length; i++) {
        if (lower.includes(monthNames[i])) {
          month = i + 1;
          break;
        }
      }
      const numbers = cleaned.match(/\d+/g);
      if (numbers && numbers.length >= 2) {
        if (numbers[0].length === 4) {
          year = parseInt(numbers[0], 10);
          day = parseInt(numbers[1], 10);
        } else {
          day = parseInt(numbers[0], 10);
          year = parseInt(numbers[1], 10);
          if (numbers.length >= 3 && numbers[2].length === 4) {
            year = parseInt(numbers[2], 10);
          }
        }
      }
    }
  }

  if (!month || !day || !year || isNaN(month) || isNaN(day) || isNaN(year)) {
    return null;
  }

  // Reduce Month digits if needed
  const monthStr = month < 10 ? `${month}` : `${month}`;
  const monthSum = monthStr.split('').map(Number).reduce((a, b) => a + b, 0);
  const monthReduced = monthSum > 9 ? reduceToSingleDigit(monthSum).reduced : monthSum;
  const monthMath = month > 9 && monthStr.length > 1 ? `${monthStr.split('').join('+')}=${monthSum}` : `${month}`;

  // Reduce Day digits
  const dayStr = `${day}`;
  const daySum = dayStr.split('').map(Number).reduce((a, b) => a + b, 0);
  const dayReduced = daySum > 9 ? reduceToSingleDigit(daySum).reduced : daySum;
  const dayMath = day > 9 && dayStr.length > 1 ? `${dayStr.split('').join('+')}=${daySum}` : `${day}`;

  // Reduce Year digits
  const yearStr = `${year}`;
  const yearSum = yearStr.split('').map(Number).reduce((a, b) => a + b, 0);
  const yearReduced = yearSum > 9 ? reduceToSingleDigit(yearSum).reduced : yearSum;
  const yearMath = `${yearStr.split('').join('+')}=${yearSum}${yearSum > 9 ? `->${reduceToSingleDigit(yearSum).reduced}` : ''}`;

  // Total sum of components
  const totalSum = monthReduced + dayReduced + yearReduced;
  const totalReducedObj = reduceToSingleDigit(totalSum);
  const lifePathNumber = totalReducedObj.reduced;

  // Breakdown formatting matching: Month: X, Day: Y, Year: Z, Total: X+Y+Z=N -> M
  const mathBreakdown = `Month: ${monthMath}, Day: ${dayMath}, Year: ${yearMath}, Total: ${monthReduced}+${dayReduced}+${yearReduced}=${totalSum}${totalSum > 9 ? ` -> ${totalSum.toString().split('').join('+')}=${lifePathNumber}` : ''}`;

  const archetypeInfo = LIFE_PATH_ARCHETYPES[lifePathNumber] || {
    coreEnergyTitle: 'The Seeker of Wisdom',
    archetype: 'The Divine Conscious Soul',
    governingPlanet: 'Universal Light'
  };

  return {
    lifePathNumber,
    mathBreakdown,
    coreEnergyTitle: archetypeInfo.coreEnergyTitle,
    archetype: archetypeInfo.archetype,
    governingPlanet: archetypeInfo.governingPlanet
  };
}

export const LIFE_PATH_ARCHETYPES: Record<number, { coreEnergyTitle: string; archetype: string; governingPlanet: string; description: string }> = {
  1: {
    coreEnergyTitle: 'The Pioneer & Independent Originator',
    archetype: 'The Visionary Leader',
    governingPlanet: 'Sun',
    description: 'Carries high-voltage primordial creation energy, self-determination, boldness, and the innate drive to forge original paths where none existed before.'
  },
  2: {
    coreEnergyTitle: 'The Peacemaker & Intuitive Diplomat',
    archetype: 'The Sacred Harmonizer',
    governingPlanet: 'Moon',
    description: 'Radiates deep emotional sensitivity, psychic perception, graceful mediation, and the sacred gift of cultivating sublime union, harmony, and empathy.'
  },
  3: {
    coreEnergyTitle: 'The Creative Catalyst & Expressive Channel',
    archetype: 'The Radiant Storyteller',
    governingPlanet: 'Jupiter',
    description: 'Vibrates with boundless joy, artistic brilliance, magnetic communication, social warmth, and the power to uplift collective consciousness through authentic self-expression.'
  },
  4: {
    coreEnergyTitle: 'The Sovereign Architect & Master Builder',
    archetype: 'The Grounded Anchor',
    governingPlanet: 'Uranus / Earth',
    description: 'Embodies rock-solid stability, structural integrity, methodical genius, and the patient endurance required to manifest lasting legacies from the ground up.'
  },
  5: {
    coreEnergyTitle: 'The Free Spirit & Dynamic Catalyst of Change',
    archetype: 'The Adventurous Alchemist',
    governingPlanet: 'Mercury',
    description: 'Channels electric adaptability, sensory exploration, curiosity, fearless reinvention, and the vital power to shatter stagnation through liberating experiences.'
  },
  6: {
    coreEnergyTitle: 'The Nurturing Guardian & Sacred Healer',
    archetype: 'The Heart-Centered Steward',
    governingPlanet: 'Venus',
    description: 'Radiates unconditional love, protective stewardship, aesthetic harmony, community sanctuary, and an unwavering devotion to healing and uplifting loved ones.'
  },
  7: {
    coreEnergyTitle: 'The Mystic Seeker & Sacred Analyst',
    archetype: 'The Inner Sage',
    governingPlanet: 'Neptune',
    description: 'Carries deep spiritual introspection, esoteric discernment, philosophical inquiry, and the sacred thirst to look beyond the veil of physical illusions into eternal truth.'
  },
  8: {
    coreEnergyTitle: 'The Manifestor of Power & Abundance',
    archetype: 'The Sovereign Master of Realms',
    governingPlanet: 'Saturn',
    description: 'Commands karmic balance, material and spiritual authority, strategic mastery, executive vision, and the ability to channel infinite universal abundance into physical reality.'
  },
  9: {
    coreEnergyTitle: 'The Universal Humanitarian & Compassionate Luminary',
    archetype: 'The Awakened Guide',
    governingPlanet: 'Mars / Neptune',
    description: 'Embodies cosmic empathy, spiritual completion, global consciousness, selfless wisdom, and the graceful capacity to release the old to usher in universal healing.'
  }
};
