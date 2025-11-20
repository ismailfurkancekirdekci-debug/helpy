// src/api/aiClient.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAg-VOgNx5TleDt5F2BHedp-ZhLYkuDBXk"; // seninki
const genAI = new GoogleGenerativeAI(API_KEY);

// Tek model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function analyzeText(text) {
  if (!text || text.trim().length < 3) {
    throw new Error("Metin çok kısa.");
  }

  const prompt = `
  Kullanıcı bir cümle yazdı.

  Cümle: "${text}"

  Aşağıdaki formatta SADECE JSON olarak cevap ver:
  {
    "sentiment": "positive | neutral | negative",
    "summary": "...",
    "suggestion": "..."
  }

  JSON dışında tek bir kelime bile yazma.
  `;

  const result = await model.generateContent(prompt);
  const raw = result.response.text(); // Gemini ham string döner

  console.log("RAW RESPONSE:", raw);

  // JSON'ı direkt parse etmeyi dene
  try {
    return JSON.parse(raw);
  } catch (e) {
    // JSON değilse {…} içinden çek
    const match = raw.match(/\{[\s\S]*?\}/);
    if (!match) throw new Error("Model JSON formatında cevap vermedi.");
    return JSON.parse(match[0]);
  }
}
