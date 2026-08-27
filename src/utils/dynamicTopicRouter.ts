import { TarotCard } from '../types';

export interface DynamicTopicClassification {
  input_topic: string;
  detected_attributes: {
    primary_domain: string;
    energy_vector: string;
    generated_module_title: string;
    mapped_archetype: string;
    detected_emotional_tone: 'anxious' | 'analytical' | 'grieving' | 'hopeful' | 'seeking_clarity';
    tone_guidance: string;
  };
}

export interface TemporalAnchorData {
  primaryTimeframe: string;
  speedOfManifestation: string;
  catalystWindow: string;
  culminationWindow: string;
  astrologicalSeasonTiming: string;
  temporalAdvice: string;
  suitBreakdown: {
    wandsCount: number;
    cupsCount: number;
    swordsCount: number;
    pentaclesCount: number;
    majorCount: number;
  };
}

export interface CrossSystemTriangulationData {
  userElement: string;
  userLifePath: number;
  topicNature: 'logic_business' | 'emotion_love' | 'action_change' | 'stability_home' | 'spirit_purpose';
  triangulationInsight: string;
  coreFrictionAndGift: {
    potentialTrap: string;
    superpowerToUnlock: string;
  };
}

export interface UniversalDynamicBlueprintData {
  classification: DynamicTopicClassification;
  triangulation: CrossSystemTriangulationData;
  temporalAnchor: TemporalAnchorData;
  // Page 1: Domain Resonance Matrix
  page1: {
    moduleTitle: string;
    coreDiagnostic: string;
    elementalShift: {
      userElement: string;
      alchemyTitle: string;
      reactionInsight: string;
      cardInfluence: string;
    };
    cosmicResonanceQuote: string;
  };
  // Page 2: Root Cause & Hidden Friction
  page2: {
    headerTitle: string;
    underlyingBlock: {
      subconsciousFear: string;
      externalObstacle: string;
      karmicChoicePoint: string;
    };
    somaticCheck: {
      bodyLocus: string;
      environmentalTension: string;
      dailyRoutineFriction: string;
      releaseKey: string;
    };
  };
  // Page 3: Tailored Actionable Roadmap & Temporal Anchor
  page3: {
    headerTitle: string;
    temporalHeader: string;
    phase1: {
      days: string;
      title: string;
      focus: string;
      action: string;
    };
    phase2: {
      days: string;
      title: string;
      focus: string;
      action: string;
    };
    phase3: {
      days: string;
      title: string;
      focus: string;
      action: string;
    };
    anchoringAffirmation: string;
  };
}

/**
 * Detects the emotional subtext of the querent's words.
 */
export function detectEmotionalTone(text: string): {
  tone: 'anxious' | 'analytical' | 'grieving' | 'hopeful' | 'seeking_clarity';
  guidance: string;
} {
  const lower = text.toLowerCase();
  if (lower.includes('worried') || lower.includes('scared') || lower.includes('fear') || lower.includes('anxious') || lower.includes('stress') || lower.includes('panic') || lower.includes('afraid')) {
    return {
      tone: 'anxious',
      guidance: 'Soothing, deeply reassuring, calm, grounding, and steadying.',
    };
  }
  if (lower.includes('sad') || lower.includes('hurt') || lower.includes('breakup') || lower.includes('crying') || lower.includes('heartbroken') || lower.includes('grief') || lower.includes('loss') || lower.includes('miss him') || lower.includes('miss her')) {
    return {
      tone: 'grieving',
      guidance: 'Tender, validating, compassionate, soft, and gentle.',
    };
  }
  if (lower.includes('strategy') || lower.includes('scale') || lower.includes('career') || lower.includes('money') || lower.includes('plan') || lower.includes('analyze') || lower.includes('roi') || lower.includes('decision')) {
    return {
      tone: 'analytical',
      guidance: 'Structured, direct, clear, empowering, and practical.',
    };
  }
  if (lower.includes('hope') || lower.includes('excited') || lower.includes('dream') || lower.includes('ready') || lower.includes('future') || lower.includes('start')) {
    return {
      tone: 'hopeful',
      guidance: 'Visionary, catalytic, uplifting, and momentum-building.',
    };
  }
  return {
    tone: 'seeking_clarity',
    guidance: 'Warm, empathetic, clear, grounded, and insightful.',
  };
}

/**
 * Fast deterministic classification pass for custom or unknown topics.
 */
export function classifyDynamicTopic(rawTopic: string, userProblem?: string, userQuestion?: string): DynamicTopicClassification {
  const text = `${rawTopic || ''} ${userProblem || ''} ${userQuestion || ''}`.toLowerCase();
  const { tone, guidance } = detectEmotionalTone(text);

  // 1. Pets & Animals
  if (text.includes('pet') || text.includes('dog') || text.includes('cat') || text.includes('animal') || text.includes('rescue') || text.includes('adopt') || text.includes('vet')) {
    return {
      input_topic: rawTopic,
      detected_attributes: {
        primary_domain: 'Lifestyle & Animal Companion Transition',
        energy_vector: 'Nurturing vs. Commitment & Resource Allocation',
        generated_module_title: 'Sacred Companion & Domestic Harmony Blueprint',
        mapped_archetype: 'General Transition & Choice Matrix',
        detected_emotional_tone: tone,
        tone_guidance: guidance,
      },
    };
  }

  // 2. Neighbor / Home / Relocation / Living Space
  if (text.includes('neighbor') || text.includes('landlord') || text.includes('move') || text.includes('relocat') || text.includes('apartment') || text.includes('house') || text.includes('roommate')) {
    return {
      input_topic: rawTopic,
      detected_attributes: {
        primary_domain: 'Sanctuary & Environmental Boundary Dynamics',
        energy_vector: 'Territorial Equilibrium vs. Sovereignty Protection',
        generated_module_title: 'Sacred Sanctuary & Environmental Peace Blueprint',
        mapped_archetype: 'Boundary & Spatial Resolution Matrix',
        detected_emotional_tone: tone,
        tone_guidance: guidance,
      },
    };
  }

  // 3. Family / Parents / Siblings / In-Laws
  if (text.includes('family') || text.includes('mother') || text.includes('father') || text.includes('sister') || text.includes('brother') || text.includes('parent') || text.includes('child') || text.includes('in-law')) {
    return {
      input_topic: rawTopic,
      detected_attributes: {
        primary_domain: 'Ancestral Lineage & Familial Equilibrium',
        energy_vector: 'Karmic Loyalty vs. Individual Autonomy',
        generated_module_title: 'Ancestral Harmony & Intergenerational Boundary Blueprint',
        mapped_archetype: 'Lineage & Relational Transmutation Matrix',
        detected_emotional_tone: tone,
        tone_guidance: guidance,
      },
    };
  }

  // 4. Legal / Contracts / Official Disputes
  if (text.includes('legal') || text.includes('court') || text.includes('law') || text.includes('contract') || text.includes('lawyer') || text.includes('dispute') || text.includes('settle')) {
    return {
      input_topic: rawTopic,
      detected_attributes: {
        primary_domain: 'Justice, Truth & Sovereign Discernment',
        energy_vector: 'Strategic Patience vs. Decisive Assertion',
        generated_module_title: 'Cosmic Justice & Equitable Resolution Blueprint',
        mapped_archetype: 'Truth & Contractual Integrity Matrix',
        detected_emotional_tone: tone,
        tone_guidance: guidance,
      },
    };
  }

  // 5. Health / Wellness / Vitality / Burnout
  if (text.includes('health') || text.includes('burnout') || text.includes('tired') || text.includes('exhaust') || text.includes('body') || text.includes('wellness') || text.includes('sleep') || text.includes('heal')) {
    return {
      input_topic: rawTopic,
      detected_attributes: {
        primary_domain: 'Somatic Vitality & Nervous System Restoration',
        energy_vector: 'Depletion Reclamation vs. Sustainable Rhythms',
        generated_module_title: 'Holistic Vitality & Somatic Equilibrium Blueprint',
        mapped_archetype: 'Vibrational Restoration & Body Wisdom Matrix',
        detected_emotional_tone: tone,
        tone_guidance: guidance,
      },
    };
  }

  // 6. Creative Calling / Art / Writing / New Project
  if (text.includes('art') || text.includes('write') || text.includes('book') || text.includes('creative') || text.includes('music') || text.includes('launch') || text.includes('project') || text.includes('passion')) {
    return {
      input_topic: rawTopic,
      detected_attributes: {
        primary_domain: 'Creative Expression & Soul Signature',
        energy_vector: 'Inspirational Ignition vs. Material Manifestation',
        generated_module_title: 'Creative Channeling & Magnum Opus Blueprint',
        mapped_archetype: 'Visionary Genesis & Creative Anchor Matrix',
        detected_emotional_tone: tone,
        tone_guidance: guidance,
      },
    };
  }

  // 7. Friendship / Social Circle / Betrayal
  if (text.includes('friend') || text.includes('group') || text.includes('social') || text.includes('betray') || text.includes('gossip') || text.includes('toxic circle')) {
    return {
      input_topic: rawTopic,
      detected_attributes: {
        primary_domain: 'Social Resonance & Communal Reciprocity',
        energy_vector: 'Tribal Belonging vs. Authentic Alignment',
        generated_module_title: 'Conscious Community & Sovereign Alliance Blueprint',
        mapped_archetype: 'Social Discernment & Energetic Reciprocity Matrix',
        detected_emotional_tone: tone,
        tone_guidance: guidance,
      },
    };
  }

  // 8. Spiritual Awakening / Intuition / Existential Dilemma
  if (text.includes('spiritual') || text.includes('purpose') || text.includes('awakening') || text.includes('god') || text.includes('universe') || text.includes('psychic') || text.includes('exist') || text.includes('meaning')) {
    return {
      input_topic: rawTopic,
      detected_attributes: {
        primary_domain: 'Spiritual Initiation & Higher Dimensional Alignment',
        energy_vector: 'Ego Surrender vs. Cosmic Attunement',
        generated_module_title: 'Sacred Initiation & Divine Alignment Blueprint',
        mapped_archetype: 'Soul Calibration & Higher Dimensional Matrix',
        detected_emotional_tone: tone,
        tone_guidance: guidance,
      },
    };
  }

  // 9. Universal Fallback
  const cleanTitle = rawTopic && rawTopic.length > 3 ? rawTopic.trim() : 'Cosmic Crossroads & Sacred Transition';
  let shortDisplayTitle = cleanTitle;
  if (cleanTitle.length > 35) {
    const firstClause = cleanTitle.split(/[,:;—\-\.\?\!]/)[0].trim();
    shortDisplayTitle = firstClause.length <= 35 && firstClause.length >= 3 ? firstClause : 'Sacred Life Transition';
  }
  const capitalizedTitle = shortDisplayTitle.charAt(0).toUpperCase() + shortDisplayTitle.slice(1);
  return {
    input_topic: rawTopic,
    detected_attributes: {
      primary_domain: `${capitalizedTitle} Navigation`,
      energy_vector: 'Discernment, Conscious Choice & Sovereign Alignment',
      generated_module_title: `${capitalizedTitle} Soul Blueprint`,
      mapped_archetype: 'Universal Transition & Choice Matrix',
      detected_emotional_tone: tone,
      tone_guidance: guidance,
    },
  };
}

/**
 * Calculates a precise, realistic timeframe based on the Tarot cards drawn.
 */
export function calculateDynamicTemporalAnchor(
  card1: { name?: string; element?: string; [key: string]: any },
  card2: { name?: string; element?: string; [key: string]: any },
  card3: { name?: string; element?: string; [key: string]: any }
): TemporalAnchorData {
  const cards = [card1, card2, card3];
  let wandsCount = 0;
  let cupsCount = 0;
  let swordsCount = 0;
  let pentaclesCount = 0;
  let majorCount = 0;

  cards.forEach((c) => {
    const name = (c.name || '').toLowerCase();
    if (name.includes('wand')) wandsCount++;
    else if (name.includes('cup')) cupsCount++;
    else if (name.includes('sword')) swordsCount++;
    else if (name.includes('pentacle') || name.includes('coin')) pentaclesCount++;
    else majorCount++;
  });

  let primaryTimeframe = '';
  let speedOfManifestation = '';
  let catalystWindow = '';
  let culminationWindow = '';
  let astrologicalSeasonTiming = '';
  let temporalAdvice = '';

  if (majorCount >= 2) {
    primaryTimeframe = '3 to 6 Months (Karmic Life Milestone)';
    speedOfManifestation = 'Divine Timing & Deep Evolutionary Shifts';
    catalystWindow = 'Next 14 to 28 Days (First major catalyst)';
    culminationWindow = 'Next Solstice / Equinox or Solar/Lunar Eclipse';
    astrologicalSeasonTiming = 'Aligns with Major Astrological Shifts and Eclipses';
    temporalAdvice = 'Because Major Arcana dominate this spread, events are guided by divine timing rather than rushed force. Give each step room to breathe.';
  } else if (wandsCount >= 2 || (wandsCount === 1 && majorCount === 1 && cards[2].name.toLowerCase().includes('wand'))) {
    primaryTimeframe = 'Days to 3 Weeks (High Momentum)';
    speedOfManifestation = 'Rapid Fire Action & Swift Movement';
    catalystWindow = 'Next 3 to 7 Days (Immediate opening)';
    culminationWindow = '14 to 21 Days (Decisive manifestation)';
    astrologicalSeasonTiming = 'Fire Season (Aries, Leo, Sagittarius or Waxing Crescent Moon)';
    temporalAdvice = 'The energy is moving fast! When the opportunity presents itself, do not second-guess—take confident, immediate action.';
  } else if (swordsCount >= 2 || (swordsCount === 1 && majorCount === 1 && cards[2].name.toLowerCase().includes('sword'))) {
    primaryTimeframe = '2 to 5 Weeks (Truth & Mental Breakthrough)';
    speedOfManifestation = 'Fast Mental Realization & Clear Decisions';
    catalystWindow = 'Next 7 to 10 Days (Conversations & Insight)';
    culminationWindow = '21 to 35 Days (Clarity fully established)';
    astrologicalSeasonTiming = 'Air Season (Gemini, Libra, Aquarius or Next Full Moon)';
    temporalAdvice = 'Clarity will strike quickly once you cut away overthinking. Watch for honest conversations or new information in the next two weeks.';
  } else if (cupsCount >= 2 || (cupsCount === 1 && majorCount === 1 && cards[2].name.toLowerCase().includes('cup'))) {
    primaryTimeframe = '1 to 3 Months (Emotional & Relational Tide)';
    speedOfManifestation = 'Gentle, Flowing Organic Unfolding';
    catalystWindow = 'Next New Moon / 2 Weeks (Heart soft opening)';
    culminationWindow = '6 to 12 Weeks (Full emotional harmony)';
    astrologicalSeasonTiming = 'Water Season (Cancer, Scorpio, Pisces or Seasonal Transition)';
    temporalAdvice = 'This situation flows like water. Healing, trust, and connection cannot be rushed with a stopwatch; allow the emotional rhythm to mature naturally.';
  } else {
    // Pentacles dominant or balanced
    primaryTimeframe = '3 to 6 Months (Solid Physical Manifestation)';
    speedOfManifestation = 'Steady, Grounded Building & Tangible Results';
    catalystWindow = 'Next 3 to 4 Weeks (First physical anchor)';
    culminationWindow = '90 to 180 Days (Lasting stability)';
    astrologicalSeasonTiming = 'Earth Season (Taurus, Virgo, Capricorn or Harvest Season)';
    temporalAdvice = 'You are building something durable that will stand the test of time. Focus on consistent, daily micro-steps; the financial and physical results are guaranteed with patience.';
  }

  return {
    primaryTimeframe,
    speedOfManifestation,
    catalystWindow,
    culminationWindow,
    astrologicalSeasonTiming,
    temporalAdvice,
    suitBreakdown: {
      wandsCount,
      cupsCount,
      swordsCount,
      pentaclesCount,
      majorCount,
    },
  };
}

/**
 * Cross-references the user's Life Path and Element against the topic to uncover
 * natural gifts, hidden friction, and direct advice.
 */
export function performCrossSystemTriangulation(
  rawTopic: string,
  userProblem: string,
  userQuestion: string,
  userElement: string,
  lpNumber: number
): CrossSystemTriangulationData {
  const combined = `${rawTopic} ${userProblem} ${userQuestion}`.toLowerCase();
  let topicNature: CrossSystemTriangulationData['topicNature'] = 'action_change';

  if (combined.includes('business') || combined.includes('career') || combined.includes('money') || combined.includes('startup') || combined.includes('job') || combined.includes('scale') || combined.includes('finance')) {
    topicNature = 'logic_business';
  } else if (combined.includes('love') || combined.includes('relationship') || combined.includes('partner') || combined.includes('ex') || combined.includes('heart') || combined.includes('feelings') || combined.includes('soulmate')) {
    topicNature = 'emotion_love';
  } else if (combined.includes('home') || combined.includes('house') || combined.includes('family') || combined.includes('neighbor') || combined.includes('routine')) {
    topicNature = 'stability_home';
  } else if (combined.includes('purpose') || combined.includes('spiritual') || combined.includes('awakening') || combined.includes('path') || combined.includes('soul')) {
    topicNature = 'spirit_purpose';
  }

  const element = userElement || 'Water';
  let triangulationInsight = '';
  let potentialTrap = '';
  let superpowerToUnlock = '';

  // Cross-system logic
  if (element === 'Water' && topicNature === 'logic_business') {
    triangulationInsight = `As a water-attuned soul navigating business and material growth, you might feel pressured to rely solely on cold data and rigid spreadsheets. However, your true competitive advantage is your deep intuitive gut feeling and ability to read emotional currents in people and markets. Don't force yourself into a purely robotic mindset—lead with human connection and trust your instincts.`;
    potentialTrap = 'Over-rationalizing decisions and ignoring intuitive gut warnings.';
    superpowerToUnlock = 'High emotional intelligence, empathetic negotiation, and intuitive market timing.';
  } else if (element === 'Fire' && topicNature === 'emotion_love') {
    triangulationInsight = `As a fire-dominant spirit dealing with delicate matters of the heart, your natural impulse is passion, immediate resolution, and bold honesty. But love and emotional healing require gentle warmth and patience rather than an all-consuming blaze. Give situations room to unfold without demanding instant answers.`;
    potentialTrap = 'Pushing for immediate closure or forcing conversations before the other person is ready.';
    superpowerToUnlock = 'Unconditional warmth, genuine courage, and inspiring enthusiasm.';
  } else if (element === 'Air' && (topicNature === 'emotion_love' || topicNature === 'spirit_purpose')) {
    triangulationInsight = `As an air-dominant thinker, your brilliant mind wants to analyze feelings and "solve" emotional challenges logically. But your heart doesn't speak in bullet points. Give yourself permission to feel your emotions directly in your body rather than endlessly intellectualizing them.`;
    potentialTrap = 'Endless overthinking, analysis paralysis, and disconnecting from bodily sensations.';
    superpowerToUnlock = 'Crystal-clear communication, objective perspective, and enlightened discernment.';
  } else if (element === 'Earth' && (topicNature === 'action_change' || topicNature === 'spirit_purpose')) {
    triangulationInsight = `As an earth-grounded soul facing a major life crossroad, your instinct is to seek 100% safety and predictability before making a move. Yet the universe reminds you that a tree cannot grow new branches without reaching into the open air. Trust that your solid inner foundation will keep you steady even as you step into the new.`;
    potentialTrap = 'Hesitating too long out of fear of losing comfort or routine.';
    superpowerToUnlock = 'Unshakeable consistency, practical execution, and long-term durability.';
  } else {
    triangulationInsight = `Your natural ${element} frequency harmonizes with your Life Path ${lpNumber} energy to bring a grounded, conscious approach to this inquiry. When you blend your core strengths with open-hearted trust, any hesitation turns into purposeful forward momentum.`;
    potentialTrap = 'Doubt in your natural gifts during moments of temporary uncertainty.';
    superpowerToUnlock = `Your innate Life Path ${lpNumber} ability to lead, adapt, and build authentic alignment.`;
  }

  return {
    userElement: element,
    userLifePath: lpNumber,
    topicNature,
    triangulationInsight,
    coreFrictionAndGift: {
      potentialTrap,
      superpowerToUnlock,
    },
  };
}

/**
 * Builds the complete 3-Page Universal Dynamic Blueprint data model.
 */
export function buildUniversalDynamicBlueprintData(
  rawTopic: string,
  userProblem: string,
  userQuestion: string,
  userName: string,
  card1: { name?: string; element?: string; [key: string]: any },
  card2: { name?: string; element?: string; [key: string]: any },
  card3: { name?: string; element?: string; [key: string]: any },
  lpNumber: number
): UniversalDynamicBlueprintData {
  const classification = classifyDynamicTopic(rawTopic, userProblem, userQuestion);
  const { generated_module_title, primary_domain, energy_vector } = classification.detected_attributes;
  const name = userName || 'Beloved Seeker';
  const cleanProblem = userProblem || 'navigating this vital life choice';
  const cleanQuestion = userQuestion || 'What is the highest path forward?';

  // Determine user elemental reaction based on Card 1
  const element = card1.element || 'Spirit';
  let elementalShiftReaction = '';
  if (element === 'Fire') {
    elementalShiftReaction = `Your Fire frequency brings raw courage, passion, and quick momentum. In navigating ${primary_domain}, don't rush a decision just to relieve temporary tension. Direct your inner fire into calm, deliberate, confident action.`;
  } else if (element === 'Water') {
    elementalShiftReaction = `Your Water nature processes this situation through feelings, gut instincts, and empathy. Let your emotions guide your boundaries without taking on other people's stress or baggage.`;
  } else if (element === 'Air') {
    elementalShiftReaction = `Your Air element brings brilliant mental clarity and honest communication. Clear away mental clutter by writing things down and grounding your thoughts into simple, practical reality.`;
  } else if (element === 'Earth') {
    elementalShiftReaction = `Your Earth nature grounds this choice in practicality, real resources, and long-term stability. Trust what is tangible, and know you are safe to grow beyond your familiar comfort zone.`;
  } else {
    elementalShiftReaction = `Your inner wisdom connects this moment directly to your spiritual evolution. Know that this crossroad is a purposeful step in your Life Path ${lpNumber} journey.`;
  }

  const triangulation = performCrossSystemTriangulation(rawTopic, userProblem, userQuestion, element, lpNumber);
  const temporalAnchor = calculateDynamicTemporalAnchor(card1, card2, card3);

  return {
    classification,
    triangulation,
    temporalAnchor,
    page1: {
      moduleTitle: generated_module_title,
      coreDiagnostic: `When bringing your question ("${cleanQuestion}") to the cards, the energy shows an important turning point in ${primary_domain}. Through the mirror of ${card1.name}, you are reminded that this situation is an opportunity to reclaim your personal peace and confidence. While ${cleanProblem} has created tension around ${energy_vector}, your Life Path ${lpNumber} energy gives you everything you need to make the right choice. ${triangulation.triangulationInsight}`,
      elementalShift: {
        userElement: element,
        alchemyTitle: `${element} Energy & Cross-System Triangulation`,
        reactionInsight: elementalShiftReaction,
        cardInfluence: `${card1.name} lights the way forward, showing you how to turn doubt into clear, calm action.`,
      },
      cosmicResonanceQuote: `When you trust your inner truth, the next right step reveals itself with complete ease.`,
    },
    page2: {
      headerTitle: 'UNSEEN OBSTACLES & KARMIC CHOICE POINTS',
      underlyingBlock: {
        subconsciousFear: `Under ${card2.name}, the real sticking point is a fear of making the "wrong" choice or facing conflict. This hesitation drains your daily energy by keeping you stuck in what-if loops.`,
        externalObstacle: `Outside noise, opinions, or pressure from others have made it hard to hear your own voice. You have been carrying other people's expectations instead of trusting what you know is right for you.`,
        karmicChoicePoint: `This is your moment of growth: choose what brings you genuine peace rather than what merely pleases others. Releasing indecision is what opens the door for ${card3.name} to bless your life.`,
      },
      somaticCheck: {
        bodyLocus: `Solar Plexus & Throat (Gut feeling & speaking your truth clearly)`,
        environmentalTension: `Notice where physical clutter or unfinished tasks in your living space mirror your hesitation about this decision.`,
        dailyRoutineFriction: `Putting off small decisions during the day exhausts the mental energy you need for this important choice.`,
        releaseKey: `Take three deep breaths: breathe in calm confidence through your nose, and exhale all tension through a gentle, open-mouth sigh.`,
      },
    },
    page3: {
      headerTitle: '30-DAY DECISION & INTEGRATION PROTOCOL',
      temporalHeader: `Dynamic Timeframe Anchor: ${temporalAnchor.primaryTimeframe}`,
      phase1: {
        days: 'Days 1–10',
        title: 'Calm the Mind & Listen Inward',
        focus: 'Clearing mental noise and regaining your center.',
        action: `Spend 5 to 10 quiet minutes each morning without screens. Write down your honest thoughts regarding ${cleanProblem} and allow your gut instinct to speak clearly.`,
      },
      phase2: {
        days: 'Days 11–20',
        title: 'Set Simple, Healthy Boundaries',
        focus: 'Gathering practical facts and speaking up with kindness.',
        action: `State what you need clearly and without over-explaining. Take one small, courageous action that honors your standards under the guidance of ${card2.name}.`,
      },
      phase3: {
        days: 'Days 21–30',
        title: 'Take Confident Action & Move Forward',
        focus: 'Stepping into your new chapter with complete peace of mind.',
        action: `Make your definitive choice aligned with ${card3.name}. Celebrate your decision and trust that the universe is supporting you every step of the way.`,
      },
      anchoringAffirmation: `I make decisions from calm clarity, and I trust the path ahead.`,
    },
  };
}

