import { getGeminiApiKey, testGeminiApiKey, generateReading } from "../src/server/geminiService.ts";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const url = req.url || "";

  if (url.includes("/config")) {
    const envKey = getGeminiApiKey();
    return res.status(200).json({
      status: "ok",
      hasEnvApiKey: Boolean(envKey),
      hasServerKey: Boolean(envKey),
      supportedModels: ["gemini-3.7-flash", "gemini-2.5-flash"],
    });
  }

  if (url.includes("/test-key")) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const result = await testGeminiApiKey(body.apiKey);
    return res.status(result.success ? 200 : 400).json(result);
  }

  if (url.includes("/reading")) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const result = await generateReading(body);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Failed to generate reading" });
    }
  }

  if (url.includes("/health")) {
    return res.status(200).json({ status: "ok" });
  }

  // Default response
  const envKey = getGeminiApiKey();
  return res.status(200).json({
    name: "Tarot & Numerology Oracle API",
    status: "ok",
    hasEnvApiKey: Boolean(envKey),
  });
}
