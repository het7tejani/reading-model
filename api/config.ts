import { getGeminiApiKey } from "../src/server/geminiService.ts";

export default async function handler(req: any, res: any) {
  // Enable CORS if needed
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const envKey = getGeminiApiKey();
  return res.status(200).json({
    status: "ok",
    hasEnvApiKey: Boolean(envKey),
    hasServerKey: Boolean(envKey),
    supportedModels: ["gemini-3.7-flash", "gemini-2.5-flash"],
  });
}
