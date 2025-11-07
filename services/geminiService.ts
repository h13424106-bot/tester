
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY is not set. AI analysis will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function analyzeSolarData(prompt: string): Promise<string> {
  if (!API_KEY) {
    return "API Key not configured. Please set up your environment to use this feature.";
  }
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.3,
            topP: 0.9,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred during analysis: ${error.message}`;
    }
    return "An unknown error occurred during analysis.";
  }
}
