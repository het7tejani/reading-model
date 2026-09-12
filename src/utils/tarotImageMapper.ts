// Tarot card image mapper for standard Rider-Waite-Smith public domain illustrations
// Uses high-resolution, CORS-enabled 720px cards served via jsDelivr CDN

const JSDELIVR_BASE = 'https://cdn.jsdelivr.net/gh/mixvlad/TarotCards@master/tarot/rider-waite/720px/';

export const getTarotCardImageUrl = (cardName: string): string => {
  if (!cardName) {
    return `${JSDELIVR_BASE}17_Star.jpg`;
  }

  // 1. Clean the input string: remove page/card prefixes and parentheticals
  let clean = cardName
    .replace(/^(?:tarot\s+)?card\s+(?:\d+|[ivx]+)\s*[:\-–—]\s*/i, '')
    .replace(/^(?:first|second|third)\s+card\s*[:\-–—]\s*/i, '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s*\[[^\]]*\]/g, '')
    .replace(/\s*[:\-–—]\s*(?:current energy|the blockage|path forward|present|blockage|forward).*$/i, '')
    .trim()
    .toLowerCase();

  // Remove leading 'the ' for uniform comparison
  const withoutThe = clean.replace(/^the\s+/, '').trim();

  // 2. Major Arcana mapping
  const majorFiles: Record<string, string> = {
    'fool': '00_Fool.jpg',
    'magician': '01_Magician.jpg',
    'high priestess': '02_High_Priestess.jpg',
    'empress': '03_Empress.jpg',
    'emperor': '04_Emperor.jpg',
    'hierophant': '05_Hierophant.jpg',
    'lovers': '06_Lovers.jpg',
    'chariot': '07_Chariot.jpg',
    'strength': '08_Strength.jpg',
    'hermit': '09_Hermit.jpg',
    'wheel of fortune': '10_Wheel_of_Fortune.jpg',
    'wheel': '10_Wheel_of_Fortune.jpg',
    'justice': '11_Justice.jpg',
    'hanged man': '12_Hanged_Man.jpg',
    'death': '13_Death.jpg',
    'temperance': '14_Temperance.jpg',
    'devil': '15_Devil.jpg',
    'tower': '16_Tower.jpg',
    'star': '17_Star.jpg',
    'moon': '18_Moon.jpg',
    'sun': '19_Sun.jpg',
    'judgement': '20_Judgement.jpg',
    'judgment': '20_Judgement.jpg',
    'world': '21_World.jpg',
  };

  // Direct match on withoutThe or clean
  if (majorFiles[withoutThe]) {
    return `${JSDELIVR_BASE}${majorFiles[withoutThe]}`;
  }
  if (majorFiles[clean]) {
    return `${JSDELIVR_BASE}${majorFiles[clean]}`;
  }

  // Partial match for Major Arcana (e.g. if string contains "high priestess")
  for (const [key, file] of Object.entries(majorFiles)) {
    if (clean.includes(key) || withoutThe.includes(key)) {
      return `${JSDELIVR_BASE}${file}`;
    }
  }

  // 3. Minor Arcana mapping
  const suits = [
    { key: 'wand', prefix: 'Wands' },
    { key: 'cup', prefix: 'Cups' },
    { key: 'sword', prefix: 'Swords' },
    { key: 'pentacle', prefix: 'Pents' },
    { key: 'coin', prefix: 'Pents' },
    { key: 'disk', prefix: 'Pents' },
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
    'page': '11', 'knave': '11', 'princess': '11',
    'knight': '12', 'prince': '12',
    'queen': '13',
    'king': '14',
  };

  for (const s of suits) {
    if (clean.includes(s.key)) {
      for (const [rankWord, numStr] of Object.entries(ranks)) {
        // match: "four of pentacles", "4 of pentacles", "pentacles 4", etc.
        const pattern = new RegExp(`\\b${rankWord}\\b`, 'i');
        if (pattern.test(clean)) {
          return `${JSDELIVR_BASE}${s.prefix}${numStr}.jpg`;
        }
      }
    }
  }

  // Fallback to The Star
  return `${JSDELIVR_BASE}17_Star.jpg`;
};
