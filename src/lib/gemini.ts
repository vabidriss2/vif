import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getAIInsight(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a helpful browser assistant. The user is searching for: "${query}". 
      Provide a very concise (max 3 sentences) summary or answer if it's a question. 
      If it's just a phrase, explain it briefly.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to get AI insights at the moment.";
  }
}

export async function chatWithAI(messages: { role: string; content: string }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] })),
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I'm having trouble thinking right now.";
  }
}
