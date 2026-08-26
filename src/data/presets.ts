import { ReadingInputs } from '../types';
import { TAROT_DECK } from './tarotCards';

const findCard = (name: string) => TAROT_DECK.find(c => c.name.toLowerCase() === name.toLowerCase()) || TAROT_DECK[0];

export const PRESET_READINGS: { id: string; title: string; subtitle: string; icon: string; data: ReadingInputs }[] = [
  {
    id: 'deep-love',
    title: '1. Deep Love Reading',
    subtitle: 'Marcus, 28 (DOB: 11/05/1997) • Life Path 6',
    icon: '❤️',
    data: {
      name: 'Marcus Vance',
      age: '28',
      dob: '11/05/1997',
      topic: '1. Deep Love Reading',
      shopName: 'Heart & Soul Sanctuary',
      problem: 'After a painful betrayal two years ago, I keep keeping potential partners at arm\'s length. I have met someone wonderful with whom I feel deep soul resonance, but my unconscious instinct is to withdraw or find flaws before they can hurt me.',
      question: 'What must I heal within my heart center to allow deep emotional intimacy without fear of abandonment?',
      cards: [
        findCard('Two of Cups'),        // Current Energy
        findCard('Nine of Swords'),     // The Blockage
        findCard('The Star')            // Path Forward
      ]
    }
  },
  {
    id: 'career-job',
    title: '8. Career & Job Reading',
    subtitle: 'Elena, 31 (DOB: 05/14/1994) • Life Path 6',
    icon: '✨',
    data: {
      name: 'Elena Rostova',
      age: '31',
      dob: '05/14/1994',
      topic: '8. Career & Job Reading',
      shopName: 'Solaris Vision Studio',
      problem: 'I feel deeply unfulfilled in my current corporate executive role despite external success. I dream of launching my own conscious consultancy and creative studio, but I am paralyzed by imposter syndrome, fear of losing financial security, and dread of disappointing my family expectations.',
      question: 'How can I release the fear of stepping into my true creative vocation and build financial stability in my new venture?',
      cards: [
        findCard('Eight of Pentacles'), // Current Energy
        findCard('Eight of Swords'),    // The Blockage
        findCard('The Sun')             // Path Forward
      ]
    }
  },
  {
    id: 'life-compass',
    title: '9. Life Compass & Path',
    subtitle: 'Aria, 35 (DOB: 09/27/1990) • Life Path 1',
    icon: '🧭',
    data: {
      name: 'Aria Chen',
      age: '35',
      dob: '09/27/1990',
      topic: '9. Life Compass & Path',
      shopName: 'Celestial Path Sanctuary',
      problem: 'I am experiencing a massive spiritual shift where old friendships, habits, and life structures no longer resonate. I feel isolated in the void between who I was and who I am becoming, questioning if I am making the right choices.',
      question: 'What is the higher cosmic purpose of this solitude and how do I navigate this initiation into my sovereign power?',
      cards: [
        findCard('The Hermit'),         // Current Energy
        findCard('The Moon'),           // The Blockage
        findCard('The World')           // Path Forward
      ]
    }
  },
  {
    id: 'exact-thoughts',
    title: '2. Exact Thoughts & Feelings',
    subtitle: 'Chloe, 26 (DOB: 03/18/1999) • Life Path 4',
    icon: '💭',
    data: {
      name: 'Chloe Bennett',
      age: '26',
      dob: '03/18/1999',
      topic: '2. Exact Thoughts & Feelings',
      shopName: 'Luna & Light Tarot',
      problem: 'My partner has become distant and emotionally withdrawn lately. We haven\'t argued, but there is an unspoken silence between us that makes me second-guess where we stand.',
      question: 'What are their genuine thoughts and feelings toward me right now that they haven\'t voiced?',
      cards: [
        findCard('Four of Cups'),       // Current Energy
        findCard('The High Priestess'), // The Blockage
        findCard('Ten of Cups')         // Path Forward
      ]
    }
  },
  {
    id: 'blind-reading',
    title: "10. Blind Reading (Name Only)",
    subtitle: 'Julian, 42 (DOB: 08/12/1983) • Life Path 5',
    icon: '🔮',
    data: {
      name: 'Julian Thorne',
      age: '42',
      dob: '08/12/1983',
      topic: "10. Blind Reading (Name Only)",
      shopName: 'Mystic Horizon Oracle',
      problem: "Blind Reading - Name and birthdate only (Don't tell me anything)",
      question: 'What is the primary message the universe wants me to know right now?',
      cards: [
        findCard('The Magician'),      // Current Energy
        findCard('The Tower'),         // The Blockage
        findCard('Ace of Pentacles')   // Path Forward
      ]
    }
  },
  {
    id: 'money-flow',
    title: "20. What’s Blocking Your Money Flow",
    subtitle: 'Devon, 33 (DOB: 12/04/1992) • Life Path 11',
    icon: '🪙',
    data: {
      name: 'Devon Miller',
      age: '33',
      dob: '12/04/1992',
      topic: "20. What’s Blocking Your Money Flow",
      shopName: 'Abundance Oracle Studio',
      problem: 'I earn decent income but unexpected expenses always drain my savings. I feel an energetic ceiling preventing me from scaling my business beyond its current revenue mark.',
      question: 'What subconscious scarcity block or ancestral belief is constricting my financial abundance?',
      cards: [
        findCard('Four of Pentacles'), // Current Energy
        findCard('Five of Pentacles'), // The Blockage
        findCard('Ten of Pentacles')  // Path Forward
      ]
    }
  }
];
