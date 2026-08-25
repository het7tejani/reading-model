import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import {
  getGeminiApiKey,
  testGeminiApiKey,
  generateReading,
} from "./src/server/geminiService.ts";

// Explicitly load .env file variables into process.env
dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "10mb" }));

  // API Route: Server and AI status config
  app.get("/api/config", (req, res) => {
    const envKey = getGeminiApiKey();
    res.json({
      status: "ok",
      hasEnvApiKey: Boolean(envKey),
      hasServerKey: Boolean(envKey),
      supportedModels: ["gemini-3.7-flash", "gemini-2.5-flash"],
    });
  });

  // API Route: Test Gemini API key
  app.post("/api/test-key", async (req, res) => {
    try {
      const result = await testGeminiApiKey(req.body?.apiKey);
      if (result.success) {
        return res.json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (err: any) {
      console.error("[Test Key Error]", err);
      return res.status(400).json({ error: err.message || "Invalid Gemini API Key" });
    }
  });

  // API Route: Generate Tarot & Numerology reading
  app.post("/api/reading", async (req, res) => {
    try {
      const result = await generateReading(req.body);
      return res.json(result);
    } catch (err: any) {
      console.error("[Generate Reading Error]", err);
      return res.status(400).json({ error: err.message || "Failed to generate reading" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tarot & Numerology server running on http://localhost:${PORT}`);
  });
}

startServer();
