import { CategorySpec, getCategorySpecByTopic } from '../data/categoryConfig';
import { ReadingInputs } from '../types';

export interface TopicBlueprintSpec {
  topicId: number;
  title: string;
  totalPages: number;
  moduleCMode: 'two_pages_per_question' | 'one_page_per_month' | 'three_pages_per_question';
  questionCount: number;
  moduleCRange: [number, number];
  moduleDRange: [number, number];
  moduleERange: [number, number];
  roadmapTitle: string;
  actionTitle: string;
}

export interface DeepDiveQuestionItem {
  questionNumber: number;
  question: string;
  subTitle: string;
  // Page 1: Channeled Oracle Transmission
  oracleTransmission: string;
  somaticKey: string;
  // Page 2: Subconscious Architecture & Realignment
  subconsciousArchitecture: string;
  sovereignRealignment: string;
  tag: string;
  anchor: string;
}

export interface MonthForecastItem {
  monthNumber: number;
  monthName: string;
  title: string;
  astrologicalSign: string;
  element: string;
  forecast: string;
  practicalAdvice: string;
  affirmation: string;
}

export const TOPIC_MASTER_BLUEPRINTS: Record<number, TopicBlueprintSpec> = {
  1: {
    topicId: 1,
    title: 'Deep Love Reading',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Love & Soulmate Connection Roadmap',
    actionTitle: 'Heart-Opening & Alignment Steps',
  },
  2: {
    topicId: 2,
    title: 'Exact Thoughts & Feelings',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Emotional Timeline & Reciprocity Roadmap',
    actionTitle: 'Mental Peace & Sovereign Discernment Steps',
  },
  3: {
    topicId: 3,
    title: 'Situationship & Next Moves',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Next Chapter Roadmap & Boundaries',
    actionTitle: 'Boundary Enforcement & Clarity Steps',
  },
  4: {
    topicId: 4,
    title: 'Will They Come Back?',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Reconnection & Energetic Alignment Roadmap',
    actionTitle: 'Sovereign Self-Worth & Reclaim Steps',
  },
  5: {
    topicId: 5,
    title: 'Exact Time Frame',
    totalPages: 30,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 30],
    roadmapTitle: 'Time-Aligned Milestones & Progression',
    actionTitle: 'Timing Acceleration & Grounding Steps',
  },
  6: {
    topicId: 6,
    title: 'Next 12 Months Forecast',
    totalPages: 40,
    moduleCMode: 'one_page_per_month',
    questionCount: 12,
    moduleCRange: [13, 24],
    moduleDRange: [25, 30],
    moduleERange: [31, 40],
    roadmapTitle: 'Quarterly Energetic Roadmap & Milestones',
    actionTitle: 'Annual Realization & Manifestation Steps',
  },
  7: {
    topicId: 7,
    title: '8 Future Predictions',
    totalPages: 36,
    moduleCMode: 'two_pages_per_question',
    questionCount: 8,
    moduleCRange: [13, 28],
    moduleDRange: [29, 30],
    moduleERange: [31, 36],
    roadmapTitle: 'Future Trajectory Synthesis & Timeline',
    actionTitle: 'Predictive Integration & Alignment Steps',
  },
  8: {
    topicId: 8,
    title: 'Career & Job Reading',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Career Milestone & Leadership Roadmap',
    actionTitle: 'Professional Authority & Elevation Steps',
  },
  9: {
    topicId: 9,
    title: 'Life Compass & Path',
    totalPages: 36,
    moduleCMode: 'two_pages_per_question',
    questionCount: 6,
    moduleCRange: [13, 24],
    moduleDRange: [25, 28],
    moduleERange: [29, 36],
    roadmapTitle: 'Life Growth & Destiny Horizon Roadmap',
    actionTitle: 'Soul Alignment & Compass Actions',
  },
  10: {
    topicId: 10,
    title: 'Blind Reading (Name Only)',
    totalPages: 30,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 30],
    roadmapTitle: 'Energy Integration & Reconnection Roadmap',
    actionTitle: 'Psychic Realization & Centering Steps',
  },
  11: {
    topicId: 11,
    title: 'Brutal / No Sugar Coating',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Reality Check & Sovereignty Action Plan',
    actionTitle: 'Radical Truth & Boundary Execution Steps',
  },
  12: {
    topicId: 12,
    title: '3 Hidden Truths',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Unmasking & Breakthrough Roadmap',
    actionTitle: 'Clarity Realization & Discernment Steps',
  },
  13: {
    topicId: 13,
    title: 'Meet Your Spirit Guides',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Channeling & Spirit Guide Ritual Roadmap',
    actionTitle: 'Daily Intuitive Communion Steps',
  },
  14: {
    topicId: 14,
    title: 'Past Life Reading',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Karmic Clearing & Soul Lineage Roadmap',
    actionTitle: 'Past Life Integration & Healing Steps',
  },
  15: {
    topicId: 15,
    title: 'Energy Drain / Aura Scan',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Aura Cleansing & Shielding Roadmap',
    actionTitle: 'Energetic Protection & Boundary Steps',
  },
  16: {
    topicId: 16,
    title: 'Pet Psychic Reading',
    totalPages: 30,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 30],
    roadmapTitle: 'Pet Bonding & Nervous System Harmony Roadmap',
    actionTitle: 'Animal Sanctuary & Blessing Steps',
  },
  17: {
    topicId: 17,
    title: 'Lost Item Psychic Reading',
    totalPages: 28,
    moduleCMode: 'two_pages_per_question',
    questionCount: 3,
    moduleCRange: [13, 18],
    moduleDRange: [19, 22],
    moduleERange: [23, 28],
    roadmapTitle: 'Search Guidance & Recovery Roadmap',
    actionTitle: 'Targeted Retrieval & Calming Steps',
  },
  18: {
    topicId: 18,
    title: '5 Custom Questions Reading',
    totalPages: 36,
    moduleCMode: 'three_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 28],
    moduleDRange: [29, 32],
    moduleERange: [33, 36],
    roadmapTitle: 'Custom Oracle Realization Roadmap',
    actionTitle: 'Deep Resolution & Action Steps',
  },
  19: {
    topicId: 19,
    title: "What's Blocking Your Blessings / Evil Eye Reading",
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Aura Unblocking & Shielding Roadmap',
    actionTitle: 'Blessing Magnetization & Clearing Steps',
  },
  20: {
    topicId: 20,
    title: "What's Blocking Your Money Flow",
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Financial Flow & Abundance Mindset Roadmap',
    actionTitle: 'Wealth Activation & Prosperity Steps',
  },
  21: {
    topicId: 21,
    title: "What's Blocking Your Love Life",
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Heart Sanctuary & Love Unblocking Roadmap',
    actionTitle: 'Romantic Alignment & Receptivity Steps',
  },
  22: {
    topicId: 22,
    title: 'What Is Their Karma For Hurting You?',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Divine Justice & Release Roadmap',
    actionTitle: 'Energetic Severance & Sovereign Peace Steps',
  },
  23: {
    topicId: 23,
    title: 'Soul Lesson & Karmic Contract',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Cycle-Breaking & Karmic Graduation Roadmap',
    actionTitle: 'Soul Contract Elevation Steps',
  },
  24: {
    topicId: 24,
    title: "What They Feel But Won't Say",
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Unspoken Truth & Emotional Translation Roadmap',
    actionTitle: 'Emotional Grounding & Truth Steps',
  },
  25: {
    topicId: 25,
    title: 'How They See You (True Impression)',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Radiance & Magnetic Impression Roadmap',
    actionTitle: 'Unshakeable Self-Respect Steps',
  },
  26: {
    topicId: 26,
    title: 'What Is Hidden From You?',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Blindspot Awareness & Illumination Roadmap',
    actionTitle: 'Clarity Integration & Intuition Steps',
  },
  27: {
    topicId: 27,
    title: 'Energy Cord Cutting Ritual & Reading',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Etheric Cord Severance & Renewal Roadmap',
    actionTitle: 'Aura Sealing & Vitality Reclamation Steps',
  },
  28: {
    topicId: 28,
    title: 'Energy Reset & Soul Detox',
    totalPages: 34,
    moduleCMode: 'two_pages_per_question',
    questionCount: 5,
    moduleCRange: [13, 22],
    moduleDRange: [23, 26],
    moduleERange: [27, 34],
    roadmapTitle: 'Chakra Purification & Soul Detox Protocol',
    actionTitle: 'Holistic Vitality Restoration Steps',
  },
  29: {
    topicId: 29,
    title: 'Third Eye Psychic Reading',
    totalPages: 36,
    moduleCMode: 'two_pages_per_question',
    questionCount: 6,
    moduleCRange: [13, 24],
    moduleDRange: [25, 28],
    moduleERange: [29, 36],
    roadmapTitle: 'Visionary Horizon & Psychic Activation Roadmap',
    actionTitle: 'Third Eye Daily Attunement Steps',
  },
  30: {
    topicId: 30,
    title: 'Dream Message Revealed',
    totalPages: 32,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 32],
    roadmapTitle: 'Astral Integration & Subconscious Roadmap',
    actionTitle: 'Lucid Awareness & Dream Journal Steps',
  },
  31: {
    topicId: 31,
    title: 'What Is Your Pet Not Telling You?',
    totalPages: 30,
    moduleCMode: 'two_pages_per_question',
    questionCount: 4,
    moduleCRange: [13, 20],
    moduleDRange: [21, 24],
    moduleERange: [25, 30],
    roadmapTitle: 'Animal Soul Connection & Healing Roadmap',
    actionTitle: 'Pet Blessing & Silent Harmony Steps',
  },
  32: {
    topicId: 32,
    title: '10 Question Deep Dive Reading',
    totalPages: 40,
    moduleCMode: 'two_pages_per_question',
    questionCount: 10,
    moduleCRange: [13, 32],
    moduleDRange: [33, 36],
    moduleERange: [37, 40],
    roadmapTitle: 'Masterclass Realization & Integration Roadmap',
    actionTitle: 'Exhaustive Sovereignty & Manifestation Steps',
  },
};

export const getTopicMasterBlueprint = (topic: string | number): TopicBlueprintSpec => {
  const spec = getCategorySpecByTopic(topic);
  return TOPIC_MASTER_BLUEPRINTS[spec.id] || TOPIC_MASTER_BLUEPRINTS[1];
};

export const getCategoryPageCount = (categorySpec: CategorySpec): number => {
  const bp = TOPIC_MASTER_BLUEPRINTS[categorySpec.id];
  return bp ? bp.totalPages : 34;
};

// Build high-depth 2-page items for Module C
export const buildDeepDiveItems = (
  categorySpec: CategorySpec,
  inputs: ReadingInputs,
  parsedQaInsights: { question: string; answer: string }[],
  card1Name: string,
  card2Name: string,
  card3Name: string,
  lpNumber: number
): DeepDiveQuestionItem[] => {
  const bp = getTopicMasterBlueprint(categorySpec.id);
  const querentName = inputs.name || 'Seeker';
  const personName = inputs.categoryData?.personName || 'the other party';
  const petName = inputs.categoryData?.petName || 'your pet companion';
  const cleanProblem = inputs.problem ? inputs.problem.trim() : 'navigating your crossroads';

  // Base list of inquiries tailored to each topic
  const baseQuestions: {
    q: string;
    sub: string;
    trans: string;
    som: string;
    subc: string;
    sovr: string;
    tag: string;
    anc: string;
  }[] = [];

  // If AI parsed insights exist, map them with enhanced 2-page depth
  if (parsedQaInsights && parsedQaInsights.length > 0) {
    return parsedQaInsights.slice(0, bp.questionCount).map((qa, idx) => {
      const qNum = idx + 1;
      return {
        questionNumber: qNum,
        question: qa.question,
        subTitle: `${categorySpec.title} • Channeled Inquiry ${qNum} of ${bp.questionCount}`,
        oracleTransmission: qa.answer,
        somaticKey: `✦ Somatic Anchor: Notice where tension softens in your chest as this truth is accepted.`,
        subconsciousArchitecture: `Beneath the conscious narrative lies a habitual defense pattern. Your energetic field has been working overtime to protect you from vulnerability, causing you to hold back your full authentic expression.`,
        sovereignRealignment: `To bring this into physical alignment, release the need for external permission. Ground yourself in Life Path ${lpNumber} sovereignty and let your actions reflect quiet self-assurance.`,
        tag: `Inquiry ${qNum} Alignment`,
        anchor: `Truth brings an immediate sense of relief and spaciousness into your core.`,
      };
    });
  }

  // Topic specific custom generators for all 32 topics
  switch (categorySpec.id) {
    // Topic 1: Deep Love Reading
    case 1:
      baseQuestions.push(
        {
          q: 'What is the true soulmate frequency currently connecting you both?',
          sub: 'Soulmate Connection & Mutual Resonance',
          trans: `The cosmic cards reveal a profound telepathic and energetic tether connecting your hearts. While surface circumstances may have felt complicated, the underlying soul connection remains vibrant and active. ${card1Name} shows that when you honor your authentic truth, the mutual resonance expands exponentially.`,
          som: '✦ Somatic Key: Place your left hand on your heart; feel the steady, warm pulse of unconditional love.',
          subc: `Subconsciously, both of you have experienced past heart wounds that trigger hypervigilance when intimacy deepens. The hesitation you sense is fear of vulnerability, not lack of love.`,
          sovr: `Release anxiety about the future. Embody the joyful radiance of ${card3Name} and trust that divine timing is orchestrating reciprocal clarity.`,
          tag: 'Soulmate Alignment',
          anc: 'Authentic love never requires you to diminish your worth to be received.',
        },
        {
          q: 'What emotional or karmic blockage is currently stalling deeper intimacy?',
          sub: 'Karmic Obstacles & Vulnerability Shields',
          trans: `Reflecting the tension of ${card2Name}, the current stall is rooted in unexpressed expectations and assumptions. You have been waiting for clear confirmation, while the other party is grappling with their own perceived inadequacies.`,
          som: '✦ Somatic Key: Exhale slowly for 6 counts, releasing the impulse to over-analyze their subtle moods.',
          subc: `A fear of abandonment has created an urge to micromanage the connection. When you grip tightly out of fear, it blocks the natural organic flow of affection.`,
          sovr: `Step back into your sovereign container. Let the other party experience the space required to step up and meet you halfway.`,
          tag: 'Karmic Resolution',
          anc: 'Space creates the sacred vacuum where true desire and mutual effort can flourish.',
        },
        {
          q: 'What unspoken romantic feelings and desires are they holding for you?',
          sub: 'Unspoken Heart Confessions',
          trans: `Deep in their heart, they hold profound admiration for your grace, emotional depth, and resilience. They often think about moments of ease and warmth shared between you, even when they struggle to articulate it verbally.`,
          som: '✦ Somatic Key: Feel a wave of warmth radiating through your solar plexus; accept their silent admiration.',
          subc: `They fear they might not measure up to your standards or that revealing their full feelings will make them overly vulnerable to rejection.`,
          sovr: `Remain in your magnetic feminine/masculine receptivity. You do not need to coax their feelings; allow them to speak through consistent action.`,
          tag: 'Heart Revelation',
          anc: 'Real feelings naturally find their way to expression when met with calm emotional safety.',
        },
        {
          q: 'What pivotal turning point will unfold in this love connection over the next 3 months?',
          sub: 'Romantic Turning Point & Catalyst',
          trans: `A decisive breakthrough is approaching. A sincere, vulnerable conversation will dissolve lingering misunderstandings, allowing you both to reset the foundation with mature transparency and renewed affection.`,
          som: '✦ Somatic Key: Breathe in quiet clarity; trust that what is meant for you will not pass you by.',
          subc: `The old dynamic of mixed signals is completing its cycle. Both spirits are ready for stability over emotional turbulence.`,
          sovr: `Set clear standards for what you require in a partnership. Your willingness to walk away from breadcrumbs ensures you receive the whole feast.`,
          tag: 'Breakthrough Milestone',
          anc: 'A turning point begins the moment you decide you will only accept full emotional presence.',
        },
        {
          q: 'What is the highest romantic destiny and potential available to you?',
          sub: 'Ultimate Love Manifestation',
          trans: `Under the triumphant blessing of ${card3Name}, your romantic destiny is anchored in deep mutual reverence, laughter, shared vision, and effortless companionship. You are stepping into a union that feels like true sanctuary.`,
          som: '✦ Somatic Key: Smile gently and feel your spine lengthen in joyful, magnetic confidence.',
          subc: `You are permanently retiring the belief that love must be painful, dramatic, or earned through suffering.`,
          sovr: `Embody your Life Path ${lpNumber} sovereignty. Radiate unconditional self-worth and watch reciprocal love meet you at your elevated standard.`,
          tag: 'Highest Destiny',
          anc: 'You are worthy of a love that feels like peace, reciprocity, and coming home.',
        }
      );
      break;

    // Topic 11: Brutal Truth
    case 11:
      baseQuestions.push(
        {
          q: 'The Unvarnished Reality: What truth are you actively avoiding or romanticizing?',
          sub: 'Uncompromising Truth & Illusion Shattered',
          trans: `The cards show clearly that you have been rationalizing lukewarm behavior and minimizing glaring red flags to protect an emotional fantasy. ${card1Name} warns that staying in denial will only prolong your exhaustion and deplete your self-respect.`,
          som: '✦ Somatic Key: Breathe out the knot in your stomach; face what is real without fear.',
          subc: `You have associated admitting the truth with admitting failure. In reality, acknowledging the truth is your first step to liberation.`,
          sovr: `Stop negotiating with ambiguity. Accept people for how they treat you today, not how they might treat you in a hypothetical future.`,
          tag: 'Reality Check',
          anc: 'Refusing to see reality does not change it; it only keeps you captive to illusion.',
        },
        {
          q: 'The Uncomfortable Mirror: Where is your fear of conflict keeping you disempowered?',
          sub: 'Shadow Integration & Self-Accountability',
          trans: `Through the sharp lens of ${card2Name}, you have been playing small and tiptoeing around uncomfortable conversations to maintain a false sense of peace. That peace is counterfeit because it comes at the direct expense of your inner harmony.`,
          som: '✦ Somatic Key: Feel your feet firmly planted on the ground; claim your right to speak without apology.',
          subc: `You have an outdated subconscious fear that if you are completely honest about your needs, everyone will leave you.`,
          sovr: `Let anyone who is offended by your boundaries leave. You do not need connections that require you to silence your voice.`,
          tag: 'Shadow Illumination',
          anc: 'A boundary without consequences is merely a suggestion; stand firmly behind your words.',
        },
        {
          q: 'The Tough Cosmic Medicine: What toxic dynamic must be severed immediately?',
          sub: 'Radical Boundary & Energetic Cut',
          trans: `You must immediately withdraw your energetic investment from one-sided relationships, unreciprocated effort, and repetitive emotional cycles. Close the door to 'almost' connections and half-hearted commitments.`,
          som: '✦ Somatic Key: Place hands over your solar plexus; feel your power returning to your core.',
          subc: `You have been seeking closure from the very person or circumstance that caused the wound. True closure is an internal decision.`,
          sovr: `Declare your energetic independence. As a Life Path ${lpNumber}, you deserve relationships that match your loyalty and depth.`,
          tag: 'Radical Severance',
          anc: 'True closure does not come from a conversation; it comes from deciding you are done.',
        },
        {
          q: 'The Sovereign Breakthrough: What abundant reality opens when you stop settling?',
          sub: 'Empowered Liberation & Triumph',
          trans: `The exact moment you stop tolerating bare-minimum treatment and step into the radiant power of ${card3Name}, your energetic field instantly clears. True opportunities, deep respect, and aligned partnerships will immediately enter the vacuum.`,
          som: '✦ Somatic Key: Inhale deeply and feel your ribcage expand with pure sovereign liberation.',
          subc: `Your subconscious now knows that you are your own primary protector and that you will never abandon yourself again.`,
          sovr: `Walk with your head high and your heart protected by healthy standards. Your future is too expansive to be spent begging for scraps.`,
          tag: 'Sovereign Triumph',
          anc: 'The universe cannot fill your hands with abundance until you drop what does not serve you.',
        }
      );
      break;

    // Default generator for any other topic
    default:
      for (let i = 1; i <= bp.questionCount; i++) {
        baseQuestions.push({
          q: `Inquiry ${i}: Channeled Guidance regarding ${cleanProblem}`,
          sub: `${categorySpec.title} • Dimension ${i} of ${bp.questionCount}`,
          trans: `The channeled oracle reveals that this phase is activating deep soul mastery within you. Reflecting ${i === 1 ? card1Name : i === 2 ? card2Name : card3Name}, you are learning to anchor clarity within your own center, refusing to let external hesitation dictate your inner state.`,
          som: `✦ Somatic Key: Take three slow breaths into your lower belly; allow clarity to settle into your nervous system.`,
          subc: `Subconsciously, an old belief pattern is being dismantled. You are moving from a fear of making the wrong choice into a sovereign realization that every experience builds your spiritual authority.`,
          sovr: `Align your daily actions with your highest values. Speak your truth with dignity, establish boundaries that protect your peace, and welcome the divine abundance awaiting you.`,
          tag: `Dimension ${i} Realization`,
          anc: `Clarity and peace are your birthright; step forward with unwavering confidence.`,
        });
      }
      break;
  }

  return baseQuestions.slice(0, bp.questionCount).map((item, idx) => ({
    questionNumber: idx + 1,
    question: item.q,
    subTitle: item.sub,
    oracleTransmission: item.trans,
    somaticKey: item.som,
    subconsciousArchitecture: item.subc,
    sovereignRealignment: item.sovr,
    tag: item.tag,
    anchor: item.anc,
  }));
};

// Build 12 Month Forecast Items for Topic 6
export const buildTwelveMonthItems = (
  card1Name: string,
  card2Name: string,
  card3Name: string,
  lpNumber: number
): MonthForecastItem[] => {
  const months = [
    { name: 'Month 1', zodiac: 'Aries / Mars', elem: 'Fire', title: 'Awakening & Fresh Foundations' },
    { name: 'Month 2', zodiac: 'Taurus / Venus', elem: 'Earth', title: 'Heart Softening & Inner Worth' },
    { name: 'Month 3', zodiac: 'Gemini / Mercury', elem: 'Air', title: 'Vocational Pivot & Inspiration' },
    { name: 'Month 4', zodiac: 'Cancer / Moon', elem: 'Water', title: 'Material Stability & Prosperity' },
    { name: 'Month 5', zodiac: 'Leo / Sun', elem: 'Fire', title: 'Relationship Harmony & Reciprocity' },
    { name: 'Month 6', zodiac: 'Virgo / Mercury', elem: 'Earth', title: 'Mid-Year Karmic Graduation' },
    { name: 'Month 7', zodiac: 'Libra / Venus', elem: 'Air', title: 'Creative Spark & Passion Projects' },
    { name: 'Month 8', zodiac: 'Scorpio / Pluto', elem: 'Water', title: 'Fearless Boundary & Power Reclaim' },
    { name: 'Month 9', zodiac: 'Sagittarius / Jupiter', elem: 'Fire', title: 'Unexpected Synchronicity & Travel' },
    { name: 'Month 10', zodiac: 'Capricorn / Saturn', elem: 'Earth', title: 'Home Sanctuary & Domestic Peace' },
    { name: 'Month 11', zodiac: 'Aquarius / Uranus', elem: 'Air', title: 'Intuitive Mastery & Psychic Clarity' },
    { name: 'Month 12', zodiac: 'Pisces / Neptune', elem: 'Water', title: 'Grand Cycle Completion & Triumphant Rebirth' },
  ];

  return months.map((m, idx) => ({
    monthNumber: idx + 1,
    monthName: m.name,
    title: m.title,
    astrologicalSign: m.zodiac,
    element: m.elem,
    forecast: `During ${m.name}, your energetic field experiences a profound calibration toward ${m.title.toLowerCase()}. Under the influence of ${idx < 4 ? card1Name : idx < 8 ? card2Name : card3Name}, you will navigate key decisions with heightened clarity. Obstacles that once felt insurmountable will dissolve as you align with your Life Path ${lpNumber} destiny.`,
    practicalAdvice: `Dedicate regular quiet time for reflection, establish clear emotional boundaries, and take decisive inspired action without overthinking.`,
    affirmation: `&ldquo;I step into ${m.name} with an open heart, sovereign confidence, and absolute trust in my divine timeline.&rdquo;`,
  }));
};
