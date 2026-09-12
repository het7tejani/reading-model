import { LunaReadingRequestPayload } from "../server/lunaService.ts";

export interface LunaClientConfig {
  apiKey?: string;
  apiBaseUrl?: string;
  modelName?: string;
}

/**
 * Validates a Luna 5.6 API Key either via server route or direct client check.
 */
export async function testLunaKeyRobust(config?: LunaClientConfig): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch("/api/test-luna-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config || {}),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, message: data.message || "Connected to Luna 5.6 Model successfully! ✨" };
    }
    return { success: false, error: data.error || "Failed to validate Luna API Key." };
  } catch (err: any) {
    console.warn("[Luna Client] Backend test failed, trying direct endpoint:", err);
    if (config?.apiKey) {
      const baseUrl = (config.apiBaseUrl || "https://api.openai.com/v1").replace(/\/+$/, "");
      const model = config.modelName || "luna-5.6";
      try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: "OK" }],
            max_tokens: 5,
          }),
        });
        if (response.ok) {
          return { success: true, message: `Connected to Luna 5.6 (${model}) directly! ✨` };
        }
        const errText = await response.text();
        return { success: false, error: `Luna API error (${response.status}): ${errText.slice(0, 100)}` };
      } catch (directErr: any) {
        return { success: false, error: directErr.message || "Could not connect to Luna endpoint." };
      }
    }
    return { success: false, error: "No Luna API Key configured in server .env or custom settings." };
  }
}

/**
 * Executes a reading using Luna 5.6 API with fallback
 */
export async function executeLunaReading(payload: LunaReadingRequestPayload) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch("/api/generate-luna", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.markdown) {
        return data;
      }
    }
  } catch (err) {
    console.warn("[Luna Client] Server route unreachable or timeout, falling back to client-side pipeline...", err);
  }

  // If server is not responding, fallback to client fallback generator
  const { generateReading } = await import("../server/geminiService.ts");
  return await generateReading({
    ...payload,
    name: payload.name || "Client",
    problem: payload.clientDetails || payload.problem || "Strategic consultation",
    question: payload.agenda || payload.question || "Core focus and next steps",
    topic: payload.topic || "Strategic Consultation",
  });
}
