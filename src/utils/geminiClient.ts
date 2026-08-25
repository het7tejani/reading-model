import { GoogleGenAI } from "@google/genai";
import { generateReading, ReadingRequestPayload } from "../server/geminiService.ts";

/**
 * Safely parse JSON from a fetch Response without throwing SyntaxError on HTML 404 pages.
 */
async function safeParseJsonResponse(response: Response): Promise<any> {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  if (contentType.includes("application/json") || text.trim().startsWith("{") || text.trim().startsWith("[")) {
    try {
      return JSON.parse(text);
    } catch {
      return { error: text.slice(0, 150) };
    }
  }
  return { error: text.slice(0, 150), isHtmlOrText: true };
}

/**
 * Validates a Gemini API Key either via backend endpoint or direct client SDK call.
 */
export async function testGeminiKeyRobust(apiKey?: string): Promise<{ success: boolean; message?: string; error?: string }> {
  const cleanKey = (apiKey || "").trim();

  // 1. Try server endpoint first
  try {
    const response = await fetch("/api/test-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: cleanKey || undefined }),
    });

    const data = await safeParseJsonResponse(response);

    if (response.ok && data.success) {
      return { success: true, message: data.message || "Connected to Google Gemini AI! ✨" };
    }

    if (!data.isHtmlOrText && data.error && !cleanKey) {
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.warn("[API Test] Backend /api/test-key unreachable, trying direct client verification...");
  }

  // 2. If user entered a specific key and backend is not responding or static, test directly via client GoogleGenAI SDK
  if (cleanKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey: cleanKey,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } },
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Respond with the single word: OK",
      });

      if (response.text) {
        return { success: true, message: "Google Gemini AI Connected Successfully! ✨" };
      } else {
        return { success: false, error: "No response received from Gemini API." };
      }
    } catch (sdkErr: any) {
      const msg = sdkErr?.message || String(sdkErr);
      if (msg.includes("API_KEY_INVALID") || msg.includes("invalid API key") || msg.includes("400") || msg.includes("403")) {
        return { success: false, error: "Invalid Gemini API Key. Please check the key at Google AI Studio." };
      }
      return { success: false, error: `Gemini Connection Error: ${msg}` };
    }
  }

  return { success: false, error: "No API key configured in .env or custom settings." };
}

/**
 * Generates reading with multi-tier fallback:
 * 1. Server API (/api/reading)
 * 2. Client-side Gemini SDK (@google/genai)
 * 3. Client-side Algorithmic engine
 */
export async function executeReading(payload: ReadingRequestPayload) {
  // Tier 1: Try serverless / Express backend with a 15-second timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await safeParseJsonResponse(response);

    if (response.ok && data.markdown) {
      return data;
    }
  } catch (backendErr) {
    console.warn("[Execute Reading] Server route timeout or unreachable, falling back to direct service...", backendErr);
  }

  // Tier 2 & 3: Run unified service directly in client (works even on 100% static hosting!)
  return await generateReading(payload);
}
