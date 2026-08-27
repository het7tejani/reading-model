import { ReadingInputs, TarotCard } from '../types';
import { calculateLifePath, LIFE_PATH_ARCHETYPES } from './numerology';
import { READING_TOPICS, cleanTopicTitle } from '../data/readingTopics';
import { getCategorySpecByTopic } from '../data/categoryConfig';

// Elemental mappings for dynamic prescription based on the cards drawn
const ELEMENT_CRYSTALS: Record<string, { primary: string; reason: string }> = {
  Fire: { primary: 'Carnelian and Sunstone', reason: 'to reignite creative courage, warm the solar plexus, and dispel stagnation' },
  Water: { primary: 'Moonstone and Rose Quartz', reason: 'to soothe emotional waters, soften heart defenses, and enhance intuitive receptivity' },
  Air: { primary: 'Lapis Lazuli and Blue Lace Agate', reason: 'to clear mental fog, calm overthinking, and invite honest communication' },
  Earth: { primary: 'Smoky Quartz and Green Aventurine', reason: 'to ground physical vitality, relieve stress, and anchor stable abundance' },
  Spirit: { primary: 'Amethyst and Selenite', reason: 'to purify the aura, align crown wisdom, and invite higher spiritual clarity' },
};

const ELEMENT_BOTANICALS: Record<string, { primary: string; reason: string }> = {
  Fire: { primary: 'Rosemary and Cinnamon', reason: 'to stimulate circulation of vital energy, kindle motivation, and purify fatigue' },
  Water: { primary: 'Chamomile and Rose Petals', reason: 'to ease nervous tension, promote restful sleep, and nourish the emotional body' },
  Air: { primary: 'Eucalyptus and Peppermint', reason: 'to expand breath, release mental heaviness, and bring refreshing focus' },
  Earth: { primary: 'Holy Basil (Tulsi) and Cedarwood', reason: 'to restore adrenal balance, ground scattered thoughts, and protect sacred space' },
  Spirit: { primary: 'Frankincense and Lavender', reason: 'to elevate consciousness, still racing thoughts, and create peaceful sanctuary' },
};

export function generateTarotNumerologyReadingMarkdown(inputs: ReadingInputs): string {
  const { name, age, dob, problem, question, topic, cards, categoryData } = inputs;
  const safeTopicTitle = cleanTopicTitle(topic);
  const card1 = cards[0] || ({ name: 'The Star', keywords: ['Hope', 'Renewal', 'Serenity', 'Healing'], element: 'Air', archetype: 'The Guiding Light' } as TarotCard);
  const card2 = cards[1] || ({ name: 'Eight of Swords', keywords: ['Overthinking', 'Mental Cage', 'Hesitation'], element: 'Air', archetype: 'The Bound Seeker' } as TarotCard);
  const card3 = cards[2] || ({ name: 'The Sun', keywords: ['Joy', 'Vitality', 'Radiance', 'Clarity'], element: 'Fire', archetype: 'The Divine Radiance' } as TarotCard);

  const numerology = calculateLifePath(dob) || {
    lifePathNumber: 7,
    mathBreakdown: 'Month: 7, Day: 7, Year: 2+0+0+0=2, Total: 7+7+2=16 -> 1+6=7',
    coreEnergyTitle: 'The Mystic Seeker & Sacred Analyst',
    archetype: 'The Inner Sage',
    governingPlanet: 'Neptune',
  };

  const lpNumber = numerology.lifePathNumber;
  const lpInfo = LIFE_PATH_ARCHETYPES[lpNumber] || {
    coreEnergyTitle: numerology.coreEnergyTitle,
    archetype: numerology.archetype,
    governingPlanet: numerology.governingPlanet,
    description: 'Carries deep spiritual discernment and intuitive alignment.',
  };

  const kw1 = card1.keywords?.slice(0, 6).join(', ') || 'Awareness, Reflection, Awakening';
  const kw2 = card2.keywords?.slice(0, 6).join(', ') || 'Resistance, Uncertainty, Tension';
  const kw3 = card3.keywords?.slice(0, 6).join(', ') || 'Resolution, Wholeness, Light';

  // Determine dominant elements from the cards drawn for dynamic prescription
  const elem1 = card1.element || 'Water';
  const elem2 = card2.element || 'Air';
  const elem3 = card3.element || 'Fire';

  const crystalPair = ELEMENT_CRYSTALS[elem3] || ELEMENT_CRYSTALS[elem1] || ELEMENT_CRYSTALS['Spirit'];
  const botanicalPair = ELEMENT_BOTANICALS[elem2] || ELEMENT_BOTANICALS[elem3] || ELEMENT_BOTANICALS['Spirit'];

  // Match topic object and extract exact main headline
  const matchedTopic = READING_TOPICS.find((t) =>
    safeTopicTitle.toLowerCase().includes(t.title.toLowerCase()) ||
    safeTopicTitle.toLowerCase().includes(t.headline.toLowerCase()) ||
    t.id === Number(topic)
  );
  const mainHeadline = matchedTopic ? matchedTopic.headline : safeTopicTitle.toUpperCase() || 'SACRED TAROT & NUMEROLOGY ORACLE';

  const categorySpec = getCategorySpecByTopic(matchedTopic?.id || (typeof topic === 'number' ? topic : 1));

  // Category specific variables
  const catPerson = categoryData?.personName ? `regarding ${categoryData.personName}` : '';
  const catPet = categoryData?.petName ? `for your beloved ${categoryData.petSpecies || 'companion'} ${categoryData.petName}` : '';
  const catCareer = categoryData?.careerField ? `within your professional field of ${categoryData.careerField}` : '';
  const catItem = categoryData?.lostItem ? `for the recovery of your ${categoryData.lostItem}` : '';
  const catTime = categoryData?.timeframeEvent ? `concerning the timing of ${categoryData.timeframeEvent}` : '';
  const catDream = categoryData?.dreamDescription ? `decoding your sacred dream` : '';

  // Clean problem & question snippet for natural prose
  const baseProblem = problem || categorySpec.suggestedProblem || 'seeking divine clarity';
  const cleanProblem = baseProblem.trim().replace(/[.\n]+$/, '');
  const baseQuestion = question || categorySpec.suggestedQuestion || 'What is the highest wisdom for my path?';
  const cleanQuestion = baseQuestion.trim().replace(/[?\n]+$/, '');

  const is12MonthTopic =
    safeTopicTitle.toLowerCase().includes('12 month') ||
    safeTopicTitle.toLowerCase().includes('year forecast') ||
    safeTopicTitle.toLowerCase().includes('12-month') ||
    safeTopicTitle.toLowerCase().includes('annual forecast') ||
    categorySpec.categoryType === 'twelve_months' ||
    matchedTopic?.id === 6;

  const isEightPredictions =
    safeTopicTitle.toLowerCase().includes('8 future') ||
    safeTopicTitle.toLowerCase().includes('8 prediction') ||
    safeTopicTitle.toLowerCase().includes('future prediction') ||
    categorySpec.categoryType === 'eight_predictions' ||
    matchedTopic?.id === 7;

  let qaSectionContent = '';

  if (is12MonthTopic) {
    const monthThemes = [
      { name: 'Month 1', title: 'Awakening & Fresh Foundations', sign: 'Aries / Mars', elem: 'Fire', forecast: `Month 1 initiates a powerful energetic reset and spiritual clearing for ${name}. Carried by the vibrant force of ${card1.name} and your Life Path ${lpNumber} sovereignty, you step out of previous confusion or hesitation. This month demands clear boundaries, a conscious break from draining dynamics, and setting fearless intentions for the year ahead. Your vitality awakens as you stop seeking external permission and anchor into self-respect.`, advice: 'Perform an energetic boundary audit. Write down 3 non-negotiable standards for this year and honor them daily.', aff: 'I enter Month 1 with sovereign courage, unshakeable confidence, and clear vision.' },
      { name: 'Month 2', title: 'Material Realignment & Emotional Grounding', sign: 'Taurus / Venus', elem: 'Earth', forecast: `Month 2 centers on solidifying your practical foundations, financial clarity, and emotional security. The grounding energy of ${card3.name} supports stabilizing your routines and establishing physical harmony. If past doubts regarding "${cleanProblem}" attempt to surface, remember that steady consistency is your greatest superpower. You are building lasting stability that cannot be easily shaken.`, advice: 'Establish a daily grounding ritual each morning. Align your practical spending and time investments with your highest values.', aff: 'I am grounded in physical security, abundance, and unwavering peace.' },
      { name: 'Month 3', title: 'Crucial Dialogue & Breakthrough Insights', sign: 'Gemini / Mercury', elem: 'Air', forecast: `Month 3 brings decisive communications, social connections, and revelatory conversations. An important exchange or intuitive realization breaks through lingering ambiguity in ${safeTopicTitle}. Reflecting the discernment of ${card1.name}, you speak your authentic truth with grace and composure, dissolving misunderstandings and clearing the path forward.`, advice: 'Express your needs directly without self-censorship or over-explaining. Document new creative inspirations immediately.', aff: 'My communication is clear, authentic, and met with deep respect and reciprocity.' },
      { name: 'Month 4', title: 'Heart Sanctuary & Deep Emotional Healing', sign: 'Cancer / Moon', elem: 'Water', forecast: `Month 4 opens a sacred portal for profound emotional healing, home sanctuary, and inner-child nurture. The soothing vibration of ${card3.name} envelops your heart, allowing old grief or vulnerability fears from ${card2.name} to dissolve permanently. You feel safe within your own skin, anchoring unconditional self-worth and genuine inner peace.`, advice: 'Create a dedicated evening relaxation sanctuary. Release emotional exhaustion through salt baths or gentle breathwork.', aff: 'My heart is safe, healed, and open to receiving pure, reciprocal love.' },
      { name: 'Month 5', title: 'Creative Sovereignty & Radiant Self-Expression', sign: 'Leo / Sun', elem: 'Fire', forecast: `Month 5 radiates with magnetic passion, charismatic visibility, and creative expansion. Under the triumphant blessing of ${card3.name}, your natural gifts and talents take center stage. You are noticed and appreciated for your unique brilliance. Step boldly into the spotlight without diminishing your light for anyone.`, advice: 'Take one bold, creative risk that excites your spirit. Celebrate your achievements and share your gifts openly.', aff: 'I shine my radiant light unapologetically and magnetize joyful opportunities.' },
      { name: 'Month 6', title: 'Refinement, Health & Daily Mastery', sign: 'Virgo / Mercury', elem: 'Earth', forecast: `Month 6 brings meticulous organization, bodily rejuvenation, and aligned productivity. You streamline your daily habits and eliminate unnecessary stress. The medicine of Life Path ${lpNumber} helps you discern between essential priorities and superficial distractions, optimizing your nervous system for long-term endurance.`, advice: 'Declutter your physical workspace and prioritize restorative nutrition and restful sleep cycles.', aff: 'I master my daily energy and create seamless harmony in mind, body, and spirit.' },
      { name: 'Month 7', title: 'Partnership Reciprocity & Sacred Balance', sign: 'Libra / Venus', elem: 'Air', forecast: `Month 7 highlights harmonious relationships, mutually fulfilling agreements, and balanced partnerships. A significant connection deepens or reaches a peaceful resolution. Guided by ${card1.name}, you attract individuals who mirror your elevated frequency of respect, emotional maturity, and genuine companionship.`, advice: 'Hold high standards for mutual reciprocity. Celebrate partnerships that nourish and uplift your spirit.', aff: 'I attract and cultivate relationships built on mutual reverence, trust, and joy.' },
      { name: 'Month 8', title: 'Karmic Transformation & Power Reclamation', sign: 'Scorpio / Pluto', elem: 'Water', forecast: `Month 8 serves as a potent alchemy threshold where old disempowering patterns are completely transmuted. You permanently shed outdated attachments or fears highlighted by ${card2.name}. This is a month of deep personal power, psychic intuition, and stepping into your sovereign authority without hesitation.`, advice: 'Consciously forgive past betrayals and reclaim your vital life force. Trust your gut instinct implicitly.', aff: 'I transmute all past limitations into pure personal power and wisdom.' },
      { name: 'Month 9', title: 'Expanding Horizons & Spiritual Expansion', sign: 'Sagittarius / Jupiter', elem: 'Fire', forecast: `Month 9 expands your worldview, spiritual philosophy, and long-term vision. Synchronicities, auspicious opportunities, and higher guidance guide your steps. You realize how much your consciousness has grown throughout this journey, feeling inspired to explore new intellectual or geographic horizons.`, advice: 'Engage in higher learning, travel, or spiritual study that broadens your perspective.', aff: 'The universe expands my horizons and guides every step of my sacred expansion.' },
      { name: 'Month 10', title: 'Vocational Triumph & Professional Elevation', sign: 'Capricorn / Saturn', elem: 'Earth', forecast: `Month 10 culminates in tangible career milestones, professional recognition, and leadership authority. The diligent efforts you have invested bear bountiful fruit. Reflecting your Life Path ${lpNumber} mastery, you stand as an unshakeable authority in your chosen field, earning the respect of peers and mentors alike.`, advice: 'Take decisive leadership in your key projects. Own your authority and celebrate your hard-earned mastery.', aff: 'I am an empowered leader achieving tangible success and enduring legacy.' },
      { name: 'Month 11', title: 'Soul Tribe Connection & Community Impact', sign: 'Aquarius / Uranus', elem: 'Air', forecast: `Month 11 connects you with like-minded souls, visionary collaborators, and inspiring communities. Your unique ideas receive enthusiastic support. You find belonging among those who value your authentic perspective and share your progressive vision for a conscious future.`, advice: 'Collaborate with forward-thinking communities. Share your visionary insights with confidence.', aff: 'I am surrounded by aligned souls who celebrate, inspire, and elevate my journey.' },
      { name: 'Month 12', title: 'Mastery, Wholeness & Sacred Completion', sign: 'Pisces / Neptune', elem: 'Water', forecast: `Month 12 marks the triumphant completion of this sacred 12-month evolutionary cycle. Under the ultimate blessing of ${card3.name}, you stand in total spiritual wholeness, deep peace, and gratitude. Every challenge faced has been integrated into pure soul wisdom. You step forward into the next chapter as an empowered, fulfilled, and sovereign creator of your reality.`, advice: 'Host a sacred ceremony of gratitude for your 12-month journey. Welcome the next spiral of growth with an open heart.', aff: 'I celebrate my complete transformation, anchored in eternal peace, abundance, and love.' }
    ];

    qaSectionContent = monthThemes.map((m) => {
      return `**${m.name}: ${m.title}**
Astrological Sign: ${m.sign} · Element: ${m.elem}
${m.forecast}

* Practical Aligned Action: ${m.advice}
* Affirmation: "${m.aff}"`;
    }).join('\n\n');

  } else if (isEightPredictions) {
    const predictions = [
      { num: 1, title: 'Immediate Breakthrough & Shift in Perspective', time: 'Weeks 1–4', cat: 'Sovereign Realization', body: `A sudden, unexpected shift in perspective will shatter the lingering confusion surrounding "${cleanProblem}". Reflecting the clarity of ${card1.name}, you will suddenly recognize what is truly worth your energy and what must be immediately released.` },
      { num: 2, title: 'Crucial Truth Revealed & Unmasked Intentions', time: 'Month 2', cat: 'Relational Clarity', body: `An important conversation or revelation will bring transparent honesty to the surface. You will receive definitive confirmation regarding the true intentions of those involved, allowing you to establish firm, self-honoring boundaries.` },
      { num: 3, title: 'Financial & Resource Acceleration', time: 'Months 2–3', cat: 'Material Inflow', body: `A new channel of abundance, unexpected resource, or professional opportunity will materialize, easing previous financial or material tension and validating your persistent dedication.` },
      { num: 4, title: 'Dissolution of the Karmic Standoff', time: 'Month 4', cat: 'Karmic Release', body: `The repetitive emotional loop or stalemate highlighted by ${card2.name} will reach its natural expiration point. You will no longer feel emotionally hooked or drained by previous triggers.` },
      { num: 5, title: 'A New Sacred Alliance / Rekindled Devotion', time: 'Months 5–6', cat: 'Reciprocal Union', body: `A deep, heart-aligned connection will step forward, offering genuine emotional safety, consistent effort, and mutual respect that matches your Life Path ${lpNumber} standard.` },
      { num: 6, title: 'Vocational Expansion & Public Recognition', time: 'Months 7–8', cat: 'Career Elevation', body: `Your skills, creative vision, and leadership will be acknowledged in a visible, rewarding manner. An invitation or promotion will elevate your professional standing significantly.` },
      { num: 7, title: 'Spiritual Homecoming & Intuitive Mastery', time: 'Months 9–10', cat: 'Spiritual Awakening', body: `Your psychic discernment and bodily intuition will sharpen to an unprecedented level. You will trust your instincts instantly, making decisions with effortless certainty and peace.` },
      { num: 8, title: 'Triumphant Manifestation & Long-Term Sanctuary', time: 'Months 11–12', cat: 'Sacred Destiny', body: `Under the radiant blessing of ${card3.name}, you will anchor a permanent sanctuary of emotional fulfillment, joy, and stability, standing in the victorious realization of your sacred intentions.` },
    ];

    qaSectionContent = predictions.map((p) => {
      return `**Prediction ${p.num}: ${p.title}**
Timeframe: ${p.time} · Catalyst: ${p.cat}
${p.body}

* Practical Aligned Action: Stay centered in your Life Path ${lpNumber} sovereignty and take decisive, courageous action when this window opens.
* Affirmation: "I welcome Prediction ${p.num} with open arms, knowing the universe is orchestrating my highest good."`;
    }).join('\n\n');

  } else {
    // Build dynamic Q&A section based on category custom questions if provided or category defaults
    let customQs = categoryData?.customQuestions;
    if (!customQs || !Array.isArray(customQs) || customQs.length === 0) {
      if (categorySpec.suggestedQuestions && categorySpec.suggestedQuestions.length > 0) {
        customQs = categorySpec.suggestedQuestions;
      }
    }

    if (customQs && Array.isArray(customQs) && customQs.length > 0) {
      qaSectionContent = customQs.map((q, idx) => {
        const cleanQ = q.replace(/^\d+\.\s*/, '').trim();
        const cardRef = idx % 3 === 0 ? card1.name : (idx % 3 === 1 ? card2.name : card3.name);
        return `**${cleanQ}**\nChanneled under the vibrational resonance of ${cardRef} and your Life Path ${lpNumber} blueprint, the cosmic cards reveal clear and decisive insight for ${name}. In navigating ${safeTopicTitle} ${catPerson || catPet || catCareer || catItem || catTime || catDream}, your energetic field is undergoing a pivotal calibration. While surface circumstances may have created circular doubt, overthinking, or emotional friction, the underlying spiritual current is urging you to look beyond immediate appearances. When you stop bargaining with ambiguity and honor your internal boundaries, the path forward becomes strikingly clear. You are being invited to release outdated self-protection habits and step into your full sovereign authority. Trust that your nervous system recognizes genuine peace; do not second-guess the quiet clarity in your core. The universe is actively aligning external events to match your elevated frequency of self-respect and authenticity.`;
      }).join('\n\n');
    } else {
      qaSectionContent = `**What is the hidden lesson in my current situation?**
The deeper spiritual lesson illuminated by ${card2.name} is that your emotional peace and spiritual sovereignty cannot remain conditional upon the validation, reactions, or approval of others. This circumstance has served as an essential energetic initiation, teaching you how to anchor unconditional self-worth within your own center rather than seeking permission to stand in your truth. In navigating "${cleanProblem}", you have been confronted with old habits of over-explaining, self-censorship, and tolerating emotional ambiguity. The hidden gift of this friction is the realization that your boundaries are not aggressive walls; they are the sacred architecture that protects your vital life force. By releasing the urge to manage everyone else's comfort, you dismantle decades of subconscious conditioning. You are learning that honoring your inner truth is the highest form of self-reverence, liberating your energy to magnetize authentic, reciprocal opportunities in ${safeTopicTitle}.

**What energy should I embody to attract my desired outcome?**
You are called to embody the magnetic, radiant presence of ${card3.name}—approaching your daily decisions, conversations, and future vision with relaxed nervous-system confidence, joyful optimism, and unwavering self-respect. When you move through the world expecting goodwill, clarity, and reciprocal reverence, your energetic field naturally dissolves lingering resistance and calls forward the exact breakthroughs you desire. Embodying ${card3.name} means refusing to shrink or dim your light to appease smaller minds. It asks you to make decisions rooted in your Life Path ${lpNumber} sovereignty rather than fear of scarcity or conflict. Speak your truth with graceful composure, celebrate your unique gifts, and let your actions reflect total certainty that you are fully worthy of effortless abundance, deep respect, and triumphant clarity.

**What subconscious block do I need to release right now?**
You must gently and permanently release the exhausting, deeply ingrained narrative that choosing your own happiness, peace, or truth will inevitably lead to abandonment, conflict, or guilt. Beneath your conscious thoughts lies an old defense mechanism that equates compliance with safety, compelling you to over-analyze every scenario to avoid making a mistake. Forgive yourself for the times you tolerated lukewarm situations, minimized your legitimate feelings, or settled for breadcrumbs of affection out of fear that nothing better would arrive. You are safe to let go of control, safe to say a clear 'no' to what drains you, and fully supported in choosing the elevated path that honors your soul.

**How will I recognize the right path when it arrives?**
Reflecting the intuitive resonance of ${card1.name} and ${card3.name}, the right path will never announce itself through frantic mental urgency, dread, or inner knotting; instead, it will bring an immediate somatic release in your chest, a quiet exhale of relief, and synchronicities that unfold effortlessly without forceful manipulation. When a path, decision, or relationship is truly aligned with your soul, peace precedes the outcome. You will notice that communication feels straightforward, mutual respect is voluntary, and your energy feels recharged rather than depleted after every interaction. Trust this bodily sensation of spaciousness—it is your spirit's infallible confirmation that you are standing on solid, divinely guided ground.

**What is the ultimate potential of this journey?**
The ultimate potential of this sacred journey is stepping into full spiritual, emotional, and vocational sovereignty as a Life Path ${lpNumber}, experiencing profound alignment, deep reciprocal partnerships, flourishing creative vitality, and an unshakeable sense of joy and inner sanctuary across ${safeTopicTitle}. You are not merely resolving a temporary crossroad; you are graduating from a lifelong karmic cycle of self-doubt and emotional sacrifice. By integrating the wisdom of this spread, you establish a permanent foundation of self-trust that will serve as the bedrock for all future blessings, allowing you to live with authentic freedom, deep fulfillment, and lasting peace.`;
    }
  }

  return `# ${mainHeadline}

## 1. Numerology (Life Path)

${numerology.mathBreakdown}

At ${age} years old, born under the celestial blueprint of ${dob}, you channel the vibrational frequency of Life Path ${lpNumber}—embodying ${lpInfo.coreEnergyTitle} governed by ${lpInfo.governingPlanet}. Your soul's fundamental strength lies in ${lpInfo.description.toLowerCase()} You are wired for genuine depth, conscious integrity, and meaningful purpose, which explains why unresolved tensions, superficial compromises, or unreciprocated dynamics weigh so heavily upon your spirit.

In addressing what you are navigating right now—specifically regarding "${cleanProblem}" within ${safeTopicTitle} ${catPerson || catPet || catCareer || catItem || catTime || catDream}—this Life Path ${lpNumber} energy serves as an essential compass. The friction and emotional weight you have been experiencing is not a sign of failure; rather, it is a sacred catalyst calling you to step out of people-pleasing and realign with your authentic sovereignty as ${lpInfo.archetype}. When you stand firmly in your core vibrational frequency, you naturally access the clarity, discernment, and spiritual authority needed to resolve this chapter with grace and confidence.

---

## 2. 3-Card Energy Overview

### Card 1: ${card1.name} (Position: Current Energy)
**Keywords:** ${kw1}

${card1.name} captures the present state of your aura as you examine your inquiry in ${safeTopicTitle}. Governed by ${elem1}, this archetype reflects an intuitive realization taking root within you. You have arrived at a juncture where continuing to tolerate ambiguity, exhaustion, or emotional strain is no longer acceptable to your spirit. Beneath any surface fatigue lies a deep, quiet resilience ready to reclaim your personal peace and clear direction.

Traditionally, ${card1.name} signals that your perceptions regarding "${cleanProblem}" are accurate and grounded in genuine intuitive awareness. Your inner guidance system is urging you to trust what you are feeling and prepare for a healthy, conscious shift toward emotional spaciousness, self-respect, and empowered discernment.

### Card 2: ${card2.name} (Position: The Blockage)
**Keywords:** ${kw2}

In the position of The Blockage, ${card2.name} sheds compassionate light on the mental loops, doubts, or self-limiting assumptions holding you back. Influenced by the element of ${elem2}, this card mirrors the exhausting habit of overthinking every possible consequence or fearing that choosing your own peace will bring conflict, guilt, or loss.

The sacred medicine of ${card2.name} is to recognize that the hesitation keeping you immobilized is not an objective obstacle, but rather an outdated mental narrative rooted in past conditioning and self-protection. By extending gentle forgiveness to yourself and recognizing your inherent right to be fulfilled and heard, you dismantle this internal obstacle and restore your freedom of decisive action.

### Card 3: ${card3.name} (Position: Path Forward)
**Keywords:** ${kw3}

The arrival of ${card3.name} in the position of The Path Forward brings an empowering, triumphant forecast. Carried by the vibrant force of ${elem3}, this card promises renewed enthusiasm, mutual clarity, and constructive breakthroughs in ${safeTopicTitle}. It offers reassurance that taking decisive, heart-aligned action will unlock immediate relief and energetic momentum.

To manifest the elevated medicine of ${card3.name}, you are invited to direct your energy toward what is life-giving, honest, and reciprocal. As you courageously address "${cleanQuestion}", the transformative frequency of ${card3.name} ensures that your path forward is illuminated with lightness, joy, grounded stability, and profound fulfillment.

---

## 3. Synthesis

Your Oracle reading weaves a transformative spiritual bridge between your Life Path ${lpNumber} vibrational frequency and the dynamic evolutionary passage from ${card1.name}, through ${card2.name}, into the triumphant blessing of ${card3.name}. At this pivotal moment in your journey at age ${age}, you stand at a sacred crossroads where old coping mechanisms and self-sacrificing habits are ready to be lovingly dissolved. Your soul is asking you to stop compromising your well-being for temporary comfort or external approval, inviting you instead to anchor your life in authentic sovereignty, conscious boundaries, and unshakeable peace.

Your core challenge—navigating "${cleanProblem}"—has served as a potent initiation for your boundaries, discernment, and self-worth. While this circumstance has caused genuine emotional weight, circular thoughts, and sleepless reflection, it has simultaneously illuminated what is sacred and non-negotiable for your spirit. The foundational awareness embodied by ${card1.name} proves that you are no longer blind to what requires realignment; your intuition has already sounded the clarion call for renewal, clarity, and self-honoring decisions.

Through the illuminating mirror of ${card2.name}, you are invited to recognize how hesitation, fear of disappointment, or an over-reliance on mental analysis has perpetuated the very impasse you wish to resolve. By honoring the protective instinct behind this hesitation without allowing it to dictate your future actions, you reclaim your personal authority, break the cycle of self-doubt, and allow your nervous system to rest in certainty.

As you consciously pivot toward the radiant frequency of ${card3.name}, your sacred inquiry—"${cleanQuestion}?"—receives a resounding confirmation of cosmic alignment, clarity, and hope. The breakthrough you seek will not arrive through endless worry or forceful control, but through calm, steady, heart-centered presence and decisive action rooted in your inherent dignity as a Life Path ${lpNumber}.

Trust that you are fully equipped, spiritually protected, and ready to welcome this elevated chapter of reciprocal harmony, deep fulfillment, and lasting peace in ${safeTopicTitle}. The universe is actively conspiring to support your highest alignment as you step boldly into your truth and allow your authentic light to lead the way.

---

## 4. Q&A Insights

${qaSectionContent}

---

## 5. Action Steps & Reflection

[1] **Establish Sacred Clarity & Boundary Audit (Days 1–7):** Dedicate 15 minutes each morning to uncensored journaling regarding "${cleanProblem}". Identify every area where your energy is being depleted by people-pleasing, hesitation, or unexpressed needs. Write down three firm, non-negotiable boundaries you will uphold across ${safeTopicTitle}, and practice the sacred boundary mantra: "My peace is non-negotiable, and I choose to honor my authentic needs without apology or explanation." Begin each day by placing your hands over your solar plexus and breathing deeply, anchoring full permission to prioritize your own emotional equilibrium above all else.

[2] **Dissolve the Mental Loop & Regulate the Nervous System (Days 8–15):** Whenever the overthinking and hesitation of ${card2.name} arises, pause immediately and place both hands over your heart center. Take 6 slow diaphragmatic breaths (inhale for 4 seconds, hold for 4, exhale for 6) to signal safety to your nervous system. Speak aloud: "I acknowledge this fear, I thank it for trying to keep me safe, and I choose to release control to divine timing and my inner truth." In the evening, write down the specific worry keeping your mind awake, followed by three objective facts that prove you are safe and fully capable of handling whatever comes.

[3] **Execute One Courageous Shift & Embody Radiant Momentum (Days 16–22):** Take one tangible, heart-aligned action that directly reflects the solution-focused energy of ${card3.name}. Whether having an honest, grounded conversation regarding "${cleanQuestion}", making a long-delayed decision, or saying a clear 'no' to what drains you, act with kindness and unapologetic confidence. Trust that the universe meets courage with immediate support, energetic expansion, and reciprocal respect, clearing the stagnant past to make room for lasting fulfillment.

[4] **Anchor Your Life Path Sovereign Blueprint (Days 23–30):** Create a dedicated evening grounding ritual honoring how much you have grown as a Life Path ${lpNumber} at age ${age}. Light a candle, hold your crystal ally, and meditate quietly on your innate soul gifts and sovereign worth. Seal this 30-day journey by writing a letter of gratitude to your future self, anchoring unwavering trust in your destiny, celebrating your emotional freedom, and declaring your readiness to welcome reciprocal love, joy, and peace.

---

## 6. Your Energetic Mantras

* I AM aligned with the divine wisdom and discernment of my Life Path ${lpNumber} blueprint.
* I AM releasing all hesitation, overthinking, and self-doubt highlighted by ${card2.name}.
* I AM worthy of effortless peace, mutual respect, and absolute clarity in ${safeTopicTitle}.
* I AM stepping boldly into the luminous, joyful, and expansive energy of ${card3.name}.
* I AM honoring my truth and trusting the sacred timing and orchestration of my life.

---

## 7. Soul Inquiries

1. What truth about my situation with "${cleanProblem}" have I been reluctant to acknowledge, and what profound freedom comes from facing it with love?
2. In what ways has the fear or hesitation of ${card2.name} been trying to protect me, and how can I thank it before consciously stepping forward?
3. How will my daily life, energy, and relationships feel once the radiant resolution of ${card3.name} is fully anchored in ${safeTopicTitle}?

---

## 8. Your Spiritual Prescription

* **The Crystal:** ${crystalPair.primary} — ${crystalPair.reason}, harmonizing the energies of ${card1.name} and ${card3.name}.
* **The Botanical:** ${botanicalPair.primary} — ${botanicalPair.reason}, providing soothing support as you navigate ${card2.name}.
* **The Practice:** **Heart-Centered Elemental Realignment.** Dedicate 5 to 10 minutes each morning to sit in quiet stillness. Place one hand over your heart and one on your solar plexus. Inhale deeply through your nose for 4 counts, envisioning golden light filling your heart space, and exhale slowly for 6 counts, releasing all tension and doubt into the earth.`;
}
