import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { generateTarotNumerologyReadingMarkdown } from "../utils/fallbackGenerator.ts";
import { calculateLifePath } from "../utils/numerology.ts";
import { READING_TOPICS, cleanTopicTitle, getTopicByTitleOrId } from "../data/readingTopics.ts";
import { getCategorySpecByTopic } from "../data/categoryConfig.ts";
import { TarotCard } from "../types.ts";
import { classifyDynamicTopic, calculateDynamicTemporalAnchor, performCrossSystemTriangulation } from "../utils/dynamicTopicRouter.ts";

/**
 * Resolves the Google Gemini API key from explicit user input or environment variables.
 * Checks GEMINI_API_KEY, VITE_GEMINI_API_KEY, API_KEY, GOOGLE_API_KEY, and GOOGLE_GENAI_API_KEY safely.
 */
export function getGeminiApiKey(userExplicitKey?: string): string | undefined {
  let envKey = "";
  if (typeof process !== "undefined" && process?.env) {
    envKey =
      process.env.GEMINI_API_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      process.env.API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENAI_API_KEY ||
      "";
  }

  const candidate = (userExplicitKey || envKey || "").trim();

  // Strip wrapping double or single quotes if present
  const cleaned = candidate.replace(/^["']|["']$/g, "").trim();

  if (
    !cleaned ||
    cleaned === "MY_GEMINI_API_KEY" ||
    cleaned === "YOUR_GEMINI_API_KEY" ||
    cleaned === "undefined" ||
    cleaned === "null"
  ) {
    return undefined;
  }
  return cleaned;
}

export async function testGeminiApiKey(userExplicitKey?: string) {
  const keyToTest = getGeminiApiKey(userExplicitKey);
  if (!keyToTest) {
    return { success: false, error: "No API key found in request or server environment variables" };
  }

  const ai = new GoogleGenAI({
    apiKey: keyToTest,
    httpOptions: { headers: { "User-Agent": "aistudio-build" } },
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Respond with the single word: OK",
  });

  if (response.text) {
    return { success: true, message: "Connected to Google Gemini AI" };
  } else {
    return { success: false, error: "No response from Gemini API" };
  }
}

export interface ReadingRequestPayload {
  name: string;
  age: number | string;
  dob: string;
  problem: string;
  question: string;
  topic: string;
  cards: Array<{
    name: string;
    arcana?: string;
    element?: string;
    archetype?: string;
    keywords?: string[];
  }>;
  categoryData?: any;
  userApiKey?: string;
}

export async function generateReading(payload: ReadingRequestPayload) {
  const { name, age, dob, problem, question, topic, cards, categoryData, userApiKey } = payload;
  const safeTopicTitle = cleanTopicTitle(topic);

  if (!name || !dob || !cards || cards.length < 3) {
    throw new Error("Missing required inputs (name, dob, 3 cards)");
  }

  const card1 = cards[0];
  const card2 = cards[1];
  const card3 = cards[2];

  const numerology = calculateLifePath(dob);
  const lpMath = numerology?.mathBreakdown || "";
  const lpNumber = numerology?.lifePathNumber || "";

  // Match topic object and extract exact main headline
  const matchedTopic = getTopicByTitleOrId(topic) || READING_TOPICS.find(
    (t) =>
      safeTopicTitle.toLowerCase().includes(t.title.toLowerCase()) ||
      safeTopicTitle.toLowerCase().includes(t.headline.toLowerCase()) ||
      t.id === Number(topic)
  );

  // Run dynamic topic classification & cross-system triangulation
  const dynamicClassification = classifyDynamicTopic(safeTopicTitle, problem, question);
  const generatedModuleTitle = dynamicClassification.detected_attributes.generated_module_title;
  const detectedTone = dynamicClassification.detected_attributes.detected_emotional_tone;
  const toneGuidance = dynamicClassification.detected_attributes.tone_guidance;
  const isKnownStandardTopic = Boolean(matchedTopic);

  // Cross-system triangulation & temporal calculations
  const triangulation = performCrossSystemTriangulation(safeTopicTitle, problem, question, card1.element || 'Water', Number(lpNumber) || 1);
  const temporalAnchor = calculateDynamicTemporalAnchor(card1, card2, card3);

  const mainHeadline = matchedTopic
    ? matchedTopic.headline
    : generatedModuleTitle.toUpperCase() || safeTopicTitle.toUpperCase() || "SACRED TAROT & NUMEROLOGY ORACLE";

  // Resolve Category Spec for defaults
  const topicId = matchedTopic?.id || (typeof topic === 'number' ? topic : 1);
  const categorySpec = getCategorySpecByTopic(topicId);

  // Build category custom context details and ensure customQuestions are populated
  let categoryContextStr = "";
  const catData = { ...(categoryData || {}) };

  // If customQuestions is empty, populate from categorySpec suggestedQuestions or customFields defaults
  if ((!catData.customQuestions || !Array.isArray(catData.customQuestions) || catData.customQuestions.length === 0)) {
    if (categorySpec?.suggestedQuestions && categorySpec.suggestedQuestions.length > 0) {
      catData.customQuestions = [...categorySpec.suggestedQuestions];
    } else if (categorySpec?.customFields) {
      const qField = categorySpec.customFields.find((f: any) => f.key === 'customQuestions');
      if (qField && qField.defaultItems && qField.defaultItems.length > 0) {
        catData.customQuestions = [...qField.defaultItems];
      }
    }
  }

  if (catData.customQuestions && Array.isArray(catData.customQuestions) && catData.customQuestions.length > 0) {
    categoryContextStr += `\n- Specific Channeled Inquiries to Answer in Section 4 (${catData.customQuestions.length} Inquiries):\n` +
      catData.customQuestions.map((q: string, i: number) => `  ${i + 1}. ${q}`).join("\n");
  }
  if (catData.predictions && Array.isArray(catData.predictions)) {
    categoryContextStr += `\n- 8 Future Prediction Target Themes:\n` +
      catData.predictions.map((p: string, i: number) => `  Prediction ${i + 1}: ${p}`).join("\n");
  }
  if (catData.monthlyFocus && Array.isArray(catData.monthlyFocus)) {
    categoryContextStr += `\n- 12 Monthly Almanac Themes:\n` +
      catData.monthlyFocus.map((m: string, i: number) => `  Month ${i + 1}: ${m}`).join("\n");
  }
  if (catData.personName) {
    categoryContextStr += `\n- Focused Person / Partner / Ex Name: "${catData.personName}" (Status/Context: "${catData.relationshipStatus || 'N/A'}")`;
  }
  if (catData.petName) {
    categoryContextStr += `\n- Pet's Profile: Name: "${catData.petName}", Species/Breed: "${catData.petSpecies || 'Pet'}", Age/Stage: "${catData.petAge || 'Companion'}", Concern/Question: "${catData.petConcern || 'N/A'}"`;
  }
  if (catData.lostItem) {
    categoryContextStr += `\n- Lost Item Search: Item: "${catData.lostItem}", Last Seen: "${catData.lastSeen || 'Unknown'}"`;
  }
  if (catData.timeframeEvent) {
    categoryContextStr += `\n- Exact Timeframe Inquired: Event: "${catData.timeframeEvent}", Desired Window: "${catData.desiredWindow || 'Imminent'}"`;
  }
  if (catData.dreamDescription) {
    categoryContextStr += `\n- Dream to Decode: "${catData.dreamDescription}", Key Symbols: "${catData.dreamSymbols || 'N/A'}"`;
  }
  if (catData.auraSymptoms) {
    categoryContextStr += `\n- Aura & Energy Symptoms: "${catData.auraSymptoms}"`;
  }
  if (catData.blockageDetails) {
    categoryContextStr += `\n- Blockage & Obstacle Details: "${catData.blockageDetails}"`;
  }
  if (catData.careerField || catData.careerGoal) {
    categoryContextStr += `\n- Career Profile: Field: "${catData.careerField || 'Current Path'}", Goal/Dilemma: "${catData.careerGoal || 'Growth'}"`;
  }
  if (catData.hiddenTruthFocus && Array.isArray(catData.hiddenTruthFocus)) {
    categoryContextStr += `\n- 3 Hidden Truth Targets:\n` +
      catData.hiddenTruthFocus.map((t: string, i: number) => `  Truth ${i + 1}: ${t}`).join("\n");
  }

  const isTenQuestions = (catData.customQuestions && catData.customQuestions.length >= 8) || safeTopicTitle.toLowerCase().includes("10 question") || topicId === 32;

  const apiKey = getGeminiApiKey(userApiKey);

  if (apiKey) {
    try {
      console.log(`[Gemini API] Channelling reading for ${name} (${mainHeadline}) using Gemini AI...`);
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `### ROLE & CORE IDENTITY ###
You are an exceptionally gifted, empathetic, intuitive Tarot Reader, Master Numerologist, and Wise Life Strategist.
You are generating a completely personalized, deep, authentic spiritual consultation and domain blueprint for ${name}.
The reading topic chosen is: "${safeTopicTitle}" with Main Headline: "${mainHeadline}".

### TOPIC INTELLIGENCE & REAL-WORLD SUBJECT DEPTH (CORE MANDATE) ###
- Your absolute highest priority is to focus directly on the specific subject matter, real-world context, and domain realities of "${safeTopicTitle}".
- The querent's current situation is: "${problem}".
- Their sacred question is: "${question}".
- DO NOT treat this as a generic template or default to unrelated topics. If the topic is about neighbor disputes, pet adoption, career decisions, family boundaries, financial investments, creative launches, or legal dilemmas, bring rich, realistic domain insights, practical nuance, situational psychology, and actionable wisdom into every section.
- NEVER produce repetitious, generic spiritual filler. Every paragraph must directly engage with the real-world mechanics, emotions, and practical realities of "${safeTopicTitle}".

### HUMAN-WRITTEN & SIMPLE, BEAUTIFUL LANGUAGE ###
- Speak like a real, deeply caring, wise human intuitive friend—warm, conversational, articulate, and completely grounded.
- Avoid academic, robotic, stiff, or convoluted jargon. Use simple, vivid, evocative words that touch the heart and bring immediate relief.
- Tone Calibration: The querent's emotional state has been detected as **"${detectedTone.toUpperCase()}"**.
  -> Required Tone Guidance: ${toneGuidance}

### CROSS-SYSTEM TRIANGULATION (CONNECTING CHART TO QUESTION) ###
- Seamlessly weave together their Life Path number (${lpNumber}), their elemental nature (${card1.element || 'Water'}), and their specific inquiry ("${problem}").
- Address any natural tension or synergy: "${triangulation.triangulationInsight}"
- Point out their trap to avoid ("${triangulation.coreFrictionAndGift.potentialTrap}") and their true superpower to unlock ("${triangulation.coreFrictionAndGift.superpowerToUnlock}").

### DYNAMIC TIMEFRAME ANCHOR (CONCRETE TIMELINES) ###
- Provide clear, grounded energetic timelines instead of vague generalities.
- Dominant spread timeframe: **${temporalAnchor.primaryTimeframe}** (Speed: ${temporalAnchor.speedOfManifestation}).
- First Catalyst Window: ${temporalAnchor.catalystWindow} | Culmination Window: ${temporalAnchor.culminationWindow}.
- Timing Wisdom: ${temporalAnchor.temporalAdvice}

### ABSOLUTE PROHIBITION OF TEMPLATES & STOCK PHRASES ###
- You are STRICTLY FORBIDDEN from using pre-defined formulas, fill-in-the-blank sentences, or repetitive opening phrases.
- Treat this as an authentic, real-time intuitive channeling. Write with natural, varied, fluid, and deeply empathetic language.
- Every single sentence must be crafted uniquely from scratch based on the querent's actual life situation, their specific questions in ${safeTopicTitle}, their age (${age}), their birthdate (${dob} -> Life Path ${lpNumber}), and the esoteric synergy of the 3 specific Tarot cards drawn.

### TRADITIONAL TAROT & ELEMENTAL ACCURACY ###
- Base all card meanings on authentic traditional Tarot symbolism, elemental dignity (Fire, Water, Air, Earth, Spirit), and archetypal wisdom.
- Address both the light and shadow dynamics realistically, offering constructive hope and empowering steps forward.
- The Spiritual Prescriptions (Crystals, Botanicals, Practices) in Section 8 MUST be uniquely chosen to balance the exact cards, elements, and somatic needs of this specific topic.

### CONTENT DEPTH & PROPORTIONAL HARMONY ###
- Write with rich, resonant, intuitive depth. Avoid overly brief or curt bullet-like responses.
- For Section 1 (Numerology): Exactly 2 substantial paragraphs (~90-110 words each) exploring the core essence, sovereign gifts, and real-life guidance of Life Path ${lpNumber} applied directly to ${safeTopicTitle}.
- For Section 2 (3-Card Energy Overview): For each of the 3 cards, write EXACTLY 2 substantial, deeply tailored paragraphs (~90-110 words per paragraph, ~180-220 words total per card). Delve into the card's traditional symbolism, elemental nuances, psychological reflection, and actionable wisdom regarding ${safeTopicTitle}.
- For Section 3 (Synthesis): Exactly 4 to 5 substantial, deeply insightful paragraphs (~90 to 120 words each). Weave in the Cross-System Triangulation, Timeframe Anchor, and specific resolution for "${problem}".
- For Section 4 (Q&A Inquiries): ${isTenQuestions ? "Answer ALL 10 specific inquiries with 200–250 words of rich, intuitive prose per question unpacking the psychological, practical, and spiritual layers thoroughly, followed by clear subconscious defense and somatic alignment guidance." : "Answer 5 to 6 profound inquiries with 200–250 words of rich, intuitive prose per question unpacking the psychological, practical, and spiritual layers thoroughly, followed by clear subconscious defense and somatic alignment guidance."}
- For Section 5 (Action Steps): Exactly 1 comprehensive, actionable paragraph per step (~90-120 words each), giving concrete real-world steps tailored to ${safeTopicTitle}.
- For Section 6 (Mantras): 5 personalized affirmations directly empowering ${name} in ${safeTopicTitle}.
- For Section 7 (Soul Inquiries): 3 deep, evocative journaling inquiries, each accompanied by a reflective guiding sub-prompt regarding ${safeTopicTitle}.
- For Section 8 (Spiritual Prescription): 2 to 3 rich sentences per recommendation detailing energetic and metaphysical benefits.

### STRUCTURE (8 CLEAN NUMBERED SECTIONS IN MARKDOWN) ###
Output strictly in Markdown with ZERO conversational greetings, introductions, or closing remarks. Start immediately with "# ${mainHeadline}".

# ${mainHeadline}

## 1. Numerology (Life Path)
${lpMath}

[2 substantial, original paragraphs (~90-110 words each):
1. Speak directly to ${name} about what carrying the Life Path ${lpNumber} blueprint means at age ${age}, unpacking their natural gifts, strengths, and spiritual frequency.
2. Address their current crossroad in "${safeTopicTitle}", validating what they have been carrying emotionally and illuminating their soul's growth and practical mastery.]

---

## 2. 3-Card Energy Overview

### Card 1: ${card1.name} (Position: Current Energy)
* **Keywords:** ${card1.keywords?.join(", ") || "Intuition, Awakening, Alignment"}

[2 substantial, deeply tailored paragraphs (~90-110 words each, ~200 words total) interpreting ${card1.name}'s traditional symbolism, element (${card1.element || "Sacred"}), and how it reflects ${name}'s current energetic field, emotional climate, and readiness regarding ${safeTopicTitle}.]

### Card 2: ${card2.name} (Position: The Blockage)
* **Keywords:** ${card2.keywords?.join(", ") || "Hesitation, Limitation, Tension"}

[2 substantial, compassionate paragraphs (~90-110 words each, ~200 words total) exploring the root of ${card2.name}'s obstacle in ${safeTopicTitle} with zero judgment, revealing the subconscious defense pattern and how to release the mental loop and emotional resistance.]

### Card 3: ${card3.name} (Position: Path Forward)
* **Keywords:** ${card3.keywords?.join(", ") || "Clarity, Resolution, Triumph"}

[2 substantial, empowering paragraphs (~90-110 words each, ~200 words total) illuminating the elevated road ahead with ${card3.name}, detailing tangible breakthroughs, aligned choices, and actionable, uplifting counsel in ${safeTopicTitle}.]

---

## 3. Synthesis
[4 to 5 substantial, deeply insightful paragraphs (~90 to 120 words each) exploring the holistic spiritual alchemy of this reading:
- Paragraph 1: Weave together ${name}'s Life Path ${lpNumber} blueprint, their ${card1.element || 'Water'} nature, and the overarching themes in ${safeTopicTitle}.
- Paragraph 2: Address the cross-system triangulation insight: "${triangulation.triangulationInsight}"
- Paragraph 3: Unpack the specific friction of "${problem}" and provide a clear, direct resolution to "${question}".
- Paragraph 4: Detail the energetic timeframe: Dominant window of ${temporalAnchor.primaryTimeframe}, first catalyst in ${temporalAnchor.catalystWindow}, and culmination in ${temporalAnchor.culminationWindow}.
- Paragraph 5: Provide an uplifting, empowering spiritual horizon, cementing self-trust and lasting peace in ${safeTopicTitle}.]

---

## 4. Q&A Insights
${
  catData.customQuestions && catData.customQuestions.length > 0 && isKnownStandardTopic
    ? catData.customQuestions.map((q: string) => `**${q.replace(/^\d+\.\s*/, '')}**\n[4-6 rich, compassionate sentences (~100-140 words) providing direct, intuitive clarity, somatic validation, and guidance regarding ${safeTopicTitle}.]\n`).join('\n')
    : `[Generate and answer 5 to 6 bespoke, domain-targeted inquiries specifically tailored to investigate every dimension of "${safeTopicTitle}" and "${problem}".
For each inquiry, provide:
**[Specific Channeled Question about ${safeTopicTitle}]**
[4-6 rich, compassionate, and informative sentences (~100-140 words) providing direct intuitive clarity, practical real-world insight, psychological validation, and somatic alignment guidance.]]`
}

---

## 5. Action Steps & Reflection
[1] **[Action Title] (Days 1–7):** [A substantial, actionable protocol (~90-120 words) specially designed for ${name} in ${safeTopicTitle}. Detail an uncensored morning journal practice exploring "${problem}", establish a specific non-negotiable emotional boundary, and outline a daily somatic grounding ritual.]

[2] **[Action Title] (Days 8–15):** [A substantial, actionable protocol (~90-120 words) tackling the shadow blockage of ${card2.name}. Detail a concrete nervous-system soothing exercise, cognitive reframing technique, and practical real-world action addressing "${problem}".]

[3] **[Action Title] (Days 16–22):** [A substantial, actionable protocol (~90-120 words) embodying the vibrant path forward of ${card3.name}. Prescribe a tangible courageous real-world action to directly resolve "${question}", a clear communication milestone, and an empowering breakthrough in ${safeTopicTitle}.]

[4] **[Action Title] (Days 23–30):** [A substantial, actionable protocol (~90-120 words) anchoring their Life Path ${lpNumber} sovereign authority. Provide a sacred long-term integration ceremony, a letter of gratitude to future self, and sustained energetic habits to protect peace and joy.]

---

## 6. Your Energetic Mantras
* I AM [First personalized affirmation tailored to ${name} and Life Path ${lpNumber} for ${safeTopicTitle}]
* I AM [Second affirmation cultivating deep inner peace and self-trust]
* I AM [Third affirmation welcoming clear solutions and harmonious outcomes]
* I AM [Fourth affirmation embodying the empowering energy of ${card3.name}]
* I AM [Fifth affirmation standing in unwavering sovereignty and clarity]

---

## 7. Soul Inquiries
1. [First introspective question for emotional clarity regarding ${safeTopicTitle}.]
2. [Second journaling question exploring the root of hesitation from ${card2.name}.]
3. [Third question envisioning an empowered future with ${card3.name} in ${safeTopicTitle}.]

---

## 8. Your Spiritual Prescription
* **The Crystal:** [Recommend 1-2 specific crystals chosen specifically to balance the elements and energy of ${card1.name}, ${card2.name}, and ${card3.name}, explaining their healing synergy for ${name} in navigating ${safeTopicTitle}.]
* **The Botanical:** [Recommend 1-2 herbal allies/botanicals chosen specifically to complement the elemental medicine of the cards drawn, explaining how they soothe or revitalize ${name}.]
* **The Practice:** **[Name of Practice].** [A 5-10 minute mindfulness or breathwork exercise aligned with this spread.]`;

      const customTopicDirective = !isKnownStandardTopic
        ? `\n\n### TOPIC-CENTERED DOMAIN INTELLIGENCE & RESEARCH MANDATE ###
The querent has submitted a custom inquiry on: "${safeTopicTitle}".
Detected Domain: "${dynamicClassification.detected_attributes.primary_domain}"
Energy Vector: "${dynamicClassification.detected_attributes.energy_vector}"
Generated Custom Module: "${generatedModuleTitle}"

CRITICAL AI RESEARCH & DATA GATHERING REQUIREMENT:
1. Bring in comprehensive, rich, authentic domain-specific information, practical dynamics, and real-world intelligence about "${safeTopicTitle}" (e.g. practical logistics, psychological triggers, boundary frameworks, timing windows, decision matrices, and lasting solutions).
2. Deeply analyze "${problem}" and provide a definitive, concrete answer to "${question}".
3. For Section 4 (Q&A Insights): Generate 5 to 6 profound, bespoke inquiries specifically exploring the distinct real-world dimensions of "${safeTopicTitle}" and provide comprehensive 120–160 word answers per inquiry.
4. For Section 5 (Action Steps): Provide real, practical actions and protocols directly addressing the logistics and challenges of "${safeTopicTitle}".`
        : "";

      const prompt = `Please channel a completely original, personalized, compassionate, and solution-focused reading for this querent:
- Querent: ${name}
- Age: ${age} years old
- Date of Birth: ${dob} (Life Path ${lpNumber}, calculated via: ${lpMath})
- Topic: ${safeTopicTitle}
- What they are navigating: ${problem}
- Their sacred question: ${question}
${categoryContextStr}
- Tarot Spread:
  * Card 1 (Current Energy): ${card1.name} (Arcana: ${card1.arcana || "tarot"}, Element: ${card1.element || "spirit"}, Archetype: ${card1.archetype || "Guide"})
  * Card 2 (The Blockage): ${card2.name} (Arcana: ${card2.arcana || "tarot"}, Element: ${card2.element || "spirit"}, Archetype: ${card2.archetype || "Challenge"})
  * Card 3 (The Path Forward): ${card3.name} (Arcana: ${card3.arcana || "tarot"}, Element: ${card3.element || "spirit"}, Archetype: ${card3.archetype || "Destiny"})
${isTenQuestions ? `\nCRITICAL INSTRUCTION: This is a 10 Question Deep Dive Reading. You MUST answer ALL 10 questions individually in Section 4 with depth, clarity, and compassion.\n` : ""}${customTopicDirective}
Write in the easiest, warmest, most natural human language. Write with genuine human empathy, deep wisdom, completely varied sentences, and no stock templates.`;

      let text = "";
      let modelUsed = "gemini-3.7-flash";

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.8,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        });
        text = response.text?.trim() || "";
      } catch (model37Err: any) {
        console.warn("[Gemini API] gemini-3.7-flash fallback to gemini-2.5-flash:", model37Err?.message);
        modelUsed = "gemini-2.5-flash";
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.8,
          },
        });
        text = response.text?.trim() || "";
      }

      if (text) {
        return {
          markdown: text,
          lifePath: String(lpNumber),
          mathBreakdown: lpMath,
          source: "gemini-ai" as const,
          model: modelUsed,
        };
      }
    } catch (geminiError: any) {
      console.error("[Gemini API Error] Failed to call Gemini API:", geminiError?.message || geminiError);
    }
  }

  // Normalize cards for the fallback generator
  const normalizedCards: [TarotCard, TarotCard, TarotCard] = [card1, card2, card3].map((c, idx) => ({
    id: `card-${idx + 1}`,
    name: c.name || "The Star",
    arcana: ((c.arcana?.toLowerCase() === "minor" ? "minor" : "major")) as "major" | "minor",
    element: ((c.element && ["Fire", "Water", "Air", "Earth", "Spirit"].includes(c.element)) ? c.element : "Spirit") as "Fire" | "Water" | "Air" | "Earth" | "Spirit",
    archetype: c.archetype || "Guide",
    keywords: c.keywords || ["Clarity", "Wisdom", "Intuition"],
    affirmation: "",
    symbol: "",
    color: "",
  })) as [TarotCard, TarotCard, TarotCard];

  // Algorithmic synthesis engine fallback
  const markdown = generateTarotNumerologyReadingMarkdown({
    name,
    age: String(age),
    dob,
    problem,
    question,
    topic,
    cards: normalizedCards,
    categoryData: catData,
  });

  return {
    markdown,
    lifePath: String(lpNumber),
    mathBreakdown: lpMath,
    source: "algorithmic" as const,
  };
}
