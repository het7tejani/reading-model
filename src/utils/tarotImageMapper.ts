// Tarot card image mapper for standard Rider-Waite-Smith public domain illustrations
// & high-fidelity illuminated representations

export const getTarotCardImageUrl = (cardName: string): string => {
  const raw = cardName.toLowerCase().trim();
  const nameLower = raw.replace(/^the\s+/, '').replace(/\s+/g, ' ');

  // Major Arcana map (both with and without 'the')
  const majorMap: Record<string, string> = {
    'fool': 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
    'the fool': 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
    'magician': 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
    'the magician': 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
    'high priestess': 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
    'the high priestess': 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
    'empress': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
    'the empress': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
    'emperor': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',
    'the emperor': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',
    'hierophant': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg',
    'the hierophant': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg',
    'lovers': 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
    'the lovers': 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
    'chariot': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    'the chariot': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    'strength': 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
    'hermit': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg',
    'the hermit': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg',
    'wheel of fortune': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg',
    'the wheel of fortune': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg',
    'justice': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',
    'hanged man': 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg',
    'the hanged man': 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg',
    'death': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',
    'temperance': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg',
    'devil': 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
    'the devil': 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
    'tower': 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    'the tower': 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    'star': 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
    'the star': 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
    'moon': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
    'the moon': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
    'sun': 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
    'the sun': 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
    'judgement': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg',
    'world': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg',
    'the world': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg',
  };

  if (majorMap[raw] || majorMap[nameLower]) {
    return majorMap[raw] || majorMap[nameLower];
  }

  // Check Minor Arcana
  const suits = [
    { key: 'wand', prefix: 'Wands' },
    { key: 'cup', prefix: 'Cups' },
    { key: 'sword', prefix: 'Swords' },
    { key: 'pentacle', prefix: 'Pents' },
    { key: 'coin', prefix: 'Pents' },
  ];

  const ranks: Record<string, string> = {
    'ace': '01', '1': '01',
    'two': '02', '2': '02',
    'three': '03', '3': '03',
    'four': '04', '4': '04',
    'five': '05', '5': '05',
    'six': '06', '6': '06',
    'seven': '07', '7': '07',
    'eight': '08', '8': '08',
    'nine': '09', '9': '09',
    'ten': '10', '10': '10',
    'page': '11', 'knave': '11',
    'knight': '12',
    'queen': '13',
    'king': '14',
  };

  for (const s of suits) {
    if (raw.includes(s.key)) {
      for (const [rankWord, numStr] of Object.entries(ranks)) {
        if (
          raw.startsWith(rankWord + ' ') ||
          raw.includes(' ' + rankWord + ' ') ||
          raw.endsWith(' ' + rankWord) ||
          raw.startsWith(rankWord + 'of')
        ) {
          return `https://upload.wikimedia.org/wikipedia/commons/${getWikiFolder(s.prefix, numStr)}/${s.prefix}${numStr}.jpg`;
        }
      }
    }
  }

  // Default fallback to Star
  return 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg';
};

function getWikiFolder(suit: string, num: string): string {
  // Known standard Wikimedia directory hashes for RWS Minor Arcana
  const hashLookup: Record<string, string> = {
    'Wands01': '1/11', 'Wands02': '0/0f', 'Wands03': 'f/ff', 'Wands04': 'a/a4', 'Wands05': '9/9d',
    'Wands06': '3/3b', 'Wands07': 'e/e4', 'Wands08': '6/6b', 'Wands09': '4/4d', 'Wands10': '0/0b',
    'Wands11': '6/6a', 'Wands12': '1/16', 'Wands13': '0/0d', 'Wands14': 'c/ce',
    'Cups01': '3/36', 'Cups02': 'f/f8', 'Cups03': '7/7a', 'Cups04': '3/35', 'Cups05': 'd/d7',
    'Cups06': '1/17', 'Cups07': 'a/ae', 'Cups08': '6/60', 'Cups09': '2/24', 'Cups10': '8/84',
    'Cups11': 'a/ad', 'Cups12': 'f/fa', 'Cups13': '6/62', 'Cups14': '0/04',
    'Swords01': '1/1a', 'Swords02': '9/9e', 'Swords03': '0/02', 'Swords04': 'b/bf', 'Swords05': '2/23',
    'Swords06': '2/29', 'Swords07': '3/34', 'Swords08': 'a/a7', 'Swords09': '2/2f', 'Swords10': 'd/d4',
    'Swords11': '4/4b', 'Swords12': 'b/b0', 'Swords13': 'd/d4', 'Swords14': '3/33',
    'Pents01': 'f/fd', 'Pents02': '9/9f', 'Pents03': '4/42', 'Pents04': '3/35', 'Pents05': '9/96',
    'Pents06': 'a/a6', 'Pents07': '6/6a', 'Pents08': '4/49', 'Pents09': 'f/f0', 'Pents10': '4/42',
    'Pents11': 'e/ec', 'Pents12': 'd/d5', 'Pents13': '8/88', 'Pents14': '1/1c'
  };

  const key = `${suit}${num}`;
  return hashLookup[key] || 'd/db';
}
