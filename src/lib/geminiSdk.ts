import { GoogleGenAI } from "@google/genai";
import { config } from "../config";

const ai = new GoogleGenAI({
  apiKey: config.geminiApiKey,
});

export async function callGeminiSdk({
  messages,
}: {
  messages: { role: "user" | "model"; text: string }[];
}) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    })),
  });

  return response.text;
}
