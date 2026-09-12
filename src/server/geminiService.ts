import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { generateTarotNumerologyReadingMarkdown } from "../utils/fallbackGenerator.ts";
import { calculateLifePath } from "../utils/numerology.ts";
import { READING_TOPICS, cleanTopicTitle, getTopicByTitleOrId } from "../data/readingTopics.ts";
import { getCategorySpecByTopic } from "../data/categoryConfig.ts";
import { TarotCard } from "../types.ts";
import { classifyDynamicTopic, calculateDynamicTemporalAnchor, performCrossSystemTriangulation } from "../utils/dynamicTopicRouter.ts";
import { buildDaisySystemInstruction, buildDaisyUserPrompt } from "./daisyPrompt.ts";

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
  age?: number | string;
  dob?: string;
  problem?: string;
  question?: string;
  clientDetails?: string;
  agenda?: string;
  tier?: "standard" | "detailed" | "premium";
  lunaApiKey?: string;
  lunaBaseUrl?: string;
  lunaModelName?: string;
  topic?: string;
  cards?: Array<{
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
  const safeTopicTitle = cleanTopicTitle(topic || "Life Direction & Soul Clarity");

  if (!name || name.trim() === "") {
    throw new Error("Missing required input: Client Name");
  }

  const rawCards = cards && Array.isArray(cards) && cards.length >= 3 ? cards : [
    { name: "The Star", arcana: "major", element: "Air", archetype: "Cosmic Healer", keywords: ["Hope", "Healing", "Inspiration", "Renewal"] },
    { name: "Eight of Swords", arcana: "minor", element: "Air", archetype: "Mindful Guardian", keywords: ["Restriction", "Limitation", "Stuck", "Overthinking"] },
    { name: "The Sun", arcana: "major", element: "Fire", archetype: "Divine Radiance", keywords: ["Joy", "Vitality", "Radiance", "Clarity"] },
  ];

  const card1 = rawCards[0];
  const card2 = rawCards[1];
  const card3 = rawCards[2];

  const hasDob = Boolean(dob && dob.trim().length > 3);
  const numerology = hasDob ? calculateLifePath(dob!) : null;
  const lpMath = numerology?.mathBreakdown || "Cosmic Coordinate Alignment";
  const lpNumber = numerology?.lifePathNumber || 7;

  const effectiveProblem = (problem || "").trim() || `Seeking high-level intuitive clarity, domain insight, and empowered breakthrough regarding ${safeTopicTitle}.`;
  const effectiveQuestion = (question || "").trim() || `What is the highest truth, hidden blockage, and sovereign path forward for ${safeTopicTitle}?`;
  const effectiveAge = age || "Adult";

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

  const is12MonthTopic =
    safeTopicTitle.toLowerCase().includes("12 month") ||
    safeTopicTitle.toLowerCase().includes("year forecast") ||
    safeTopicTitle.toLowerCase().includes("12-month") ||
    safeTopicTitle.toLowerCase().includes("annual forecast") ||
    safeTopicTitle.toLowerCase().includes("twelve month") ||
    topicId === 6;

  const isEightPredictions =
    safeTopicTitle.toLowerCase().includes("8 future") ||
    safeTopicTitle.toLowerCase().includes("8 prediction") ||
    safeTopicTitle.toLowerCase().includes("eight prediction") ||
    safeTopicTitle.toLowerCase().includes("future prediction") ||
    topicId === 7;

  const isTenQuestions =
    (catData.customQuestions && catData.customQuestions.length >= 8) ||
    safeTopicTitle.toLowerCase().includes("10 question") ||
    safeTopicTitle.toLowerCase().includes("10 burning") ||
    safeTopicTitle.toLowerCase().includes("ten question") ||
    topicId === 32;

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

      const requestedTier = ((payload.tier || "detailed").toUpperCase()) as "STANDARD" | "DETAILED" | "PREMIUM";
      const systemInstruction = buildDaisySystemInstruction(name, [card1, card2, card3]);
      const prompt = buildDaisyUserPrompt({
        listingTitle: mainHeadline,
        clientName: name,
        age: effectiveAge,
        dob: hasDob ? dob : undefined,
        problem: effectiveProblem,
        question: effectiveQuestion,
        categoryContextStr,
        agenda: payload.agenda,
        readingLevel: requestedTier,
        cards: [card1, card2, card3],
      });

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
