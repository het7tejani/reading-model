import { generateReading as generateGeminiReading, ReadingRequestPayload } from "./geminiService.ts";
import { buildDaisySystemInstruction, buildDaisyUserPrompt } from "./daisyPrompt.ts";

/**
 * Resolves Luna 5.6 / OpenAI-compatible API Key
 */
export function getLunaApiKey(userExplicitKey?: string): string | undefined {
  let envKey = "";
  if (typeof process !== "undefined" && process?.env) {
    envKey =
      process.env.LUNA_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.VITE_LUNA_API_KEY ||
      process.env.VITE_OPENAI_API_KEY ||
      "";
  }

  const candidate = (userExplicitKey || envKey || "").trim();
  const cleaned = candidate.replace(/^["']|["']$/g, "").trim();

  if (
    !cleaned ||
    cleaned === "MY_LUNA_API_KEY" ||
    cleaned === "MY_OPENAI_API_KEY" ||
    cleaned === "YOUR_API_KEY" ||
    cleaned === "undefined" ||
    cleaned === "null"
  ) {
    return undefined;
  }
  return cleaned;
}

export function getLunaApiBaseUrl(userExplicitBaseUrl?: string): string {
  let envBaseUrl = "";
  if (typeof process !== "undefined" && process?.env) {
    envBaseUrl =
      process.env.LUNA_API_BASE_URL ||
      process.env.OPENAI_API_BASE_URL ||
      process.env.VITE_LUNA_API_BASE_URL ||
      "";
  }
  const candidate = (userExplicitBaseUrl || envBaseUrl || "").trim();
  if (candidate) {
    return candidate.replace(/\/+$/, "");
  }
  return "https://api.openai.com/v1";
}

export function getLunaModelName(userExplicitModel?: string): string {
  let envModel = "";
  if (typeof process !== "undefined" && process?.env) {
    envModel =
      process.env.LUNA_MODEL_NAME ||
      process.env.OPENAI_MODEL_NAME ||
      process.env.VITE_LUNA_MODEL_NAME ||
      "";
  }
  const candidate = (userExplicitModel || envModel || "").trim();
  if (candidate) return candidate;
  return "luna-5.6";
}

/**
 * Tests connection to the Luna 5.6 / OpenAI API
 */
export async function testLunaApiKey(options?: {
  apiKey?: string;
  apiBaseUrl?: string;
  modelName?: string;
}) {
  const apiKey = getLunaApiKey(options?.apiKey);
  if (!apiKey) {
    return { success: false, error: "No Luna API Key provided or found in server environment." };
  }

  const baseUrl = getLunaApiBaseUrl(options?.apiBaseUrl);
  const modelName = getLunaModelName(options?.modelName);
  const endpoint = `${baseUrl}/chat/completions`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: "You are Luna 5.6 AI assistant." },
          { role: "user", content: "Respond with the single word: OK" },
        ],
        max_tokens: 10,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedErr = errText;
      try {
        const json = JSON.parse(errText);
        parsedErr = json.error?.message || errText;
      } catch {}
      return {
        success: false,
        error: `Luna API error (${response.status}): ${parsedErr}`,
      };
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "";
    return {
      success: true,
      message: `Connected to Luna 5.6 (${modelName}) successfully! ✨ Response: "${reply || "OK"}"`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Network error connecting to Luna API at ${endpoint}: ${err.message || String(err)}`,
    };
  }
}

export interface LunaReadingRequestPayload extends ReadingRequestPayload {
  clientDetails?: string;
  agenda?: string;
  tier?: "standard" | "detailed" | "premium";
  lunaApiKey?: string;
  lunaBaseUrl?: string;
  lunaModelName?: string;
}

/**
 * Generates reading using custom-trained Luna 5.6 API model
 */
export async function generateLunaReading(payload: LunaReadingRequestPayload) {
  const apiKey = getLunaApiKey(payload.lunaApiKey || payload.userApiKey);
  const baseUrl = getLunaApiBaseUrl(payload.lunaBaseUrl);
  const modelName = getLunaModelName(payload.lunaModelName);

  const clientName = payload.name?.trim() || "Valued Client";
  const clientDetails = payload.clientDetails || payload.problem || "Individual seeking strategic guidance, clarity, and sovereign action steps.";
  const agenda = payload.agenda || payload.question || "Core objectives, current challenges, key insights, and actionable next steps.";
  const tier = payload.tier || "detailed";
  const topic = payload.topic || "Strategic Roadmap & Life Direction";
  const requestedTier = ((payload.tier || "detailed").toUpperCase()) as "STANDARD" | "DETAILED" | "PREMIUM";

  const cards = payload.cards && Array.isArray(payload.cards) && payload.cards.length >= 3 ? payload.cards : [
    { name: "The Star", keywords: ["Hope", "Healing", "Inspiration"] },
    { name: "Eight of Swords", keywords: ["Restriction", "Overthinking", "Shadow"] },
    { name: "The Sun", keywords: ["Joy", "Vitality", "Radiance", "Clarity"] },
  ];

  const systemInstruction = buildDaisySystemInstruction(clientName, cards, payload.shopName);
  const userPrompt = buildDaisyUserPrompt({
    listingTitle: topic,
    clientName,
    shopName: payload.shopName,
    age: payload.age,
    dob: payload.dob,
    problem: payload.problem || clientDetails,
    question: payload.question || agenda,
    agenda: payload.agenda || agenda,
    readingLevel: requestedTier,
    cards,
  });

  if (apiKey) {
    try {
      console.log(`[Luna 5.6 API] Requesting generation for ${clientName} (${tier}) via ${baseUrl} [model: ${modelName}]...`);
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content?.trim();
        if (text) {
          return {
            markdown: text,
            lifePath: "7",
            mathBreakdown: "Strategic Profile Coordinate",
            source: "luna-ai" as const,
            model: modelName,
          };
        }
      } else {
        const errText = await response.text();
        console.warn(`[Luna 5.6 API] Non-OK response (${response.status}):`, errText);
      }
    } catch (lunaErr: any) {
      console.error("[Luna 5.6 API Error]", lunaErr?.message || lunaErr);
    }
  }

  // Graceful fallback to Gemini AI or algorithmic generator
  console.log(`[Luna Service] Falling back to primary high-fidelity generator...`);
  const fallbackResult = await generateGeminiReading({
    ...payload,
    name: clientName,
    problem: clientDetails,
    question: agenda,
    topic: topic,
  });

  return {
    ...fallbackResult,
    source: fallbackResult.source || "algorithmic",
    model: fallbackResult.model || "Luna 5.6 (Synthesized)",
  };
}
