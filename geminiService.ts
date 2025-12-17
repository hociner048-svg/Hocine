
import { GoogleGenAI } from "@google/genai";
import { PromptRequest } from "./types";

export const generatePromptAction = async (request: PromptRequest): Promise<string> => {
  // Always use the named parameter and process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  const systemInstruction = `You are an expert Prompt Engineer. Your job is to transform a simple user request into a high-quality, professional-grade AI prompt that will get the best results from ChatGPT, Claude, or Gemini.
  
  Instructions:
  - DO NOT answer the prompt yourself.
  - Return ONLY the final prompt text.
  - Use frameworks like Role, Context, Task, and Constraints (RGC, CO-STAR, etc.).
  - Adapt the style based on the requested Tone and Detail Level.
  - Make the prompt actionable and clear.`;

  const userMessage = `Create a prompt based on:
  - Category: ${request.category}
  - Objective: ${request.objective}
  - Subject: ${request.subject}
  - Tone: ${request.tone}
  - Detail Level: ${request.detail}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    // Use response.text property directly (not as a method)
    return response.text || "Failed to generate prompt. Please try again.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("API request failed");
  }
};
