import { GoogleGenAI } from "@google/genai";

// As per project guidelines, process.env.API_KEY is assumed to be available
// in the execution environment (e.g., configured in Netlify).
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeSolarData(prompt: string): Promise<string> {
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
    // Re-throw the error so the calling component's catch block can handle it
    // and display a proper error message in the UI.
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred during AI analysis.");
  }
}
