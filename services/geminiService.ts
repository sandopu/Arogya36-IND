import { GoogleGenAI } from "@google/genai";

export const analyzePatientData = async (
  symptoms: string,
  history: string,
  vitals: string
): Promise<string> => {
  // Always initialize with the direct environment variable as per instructions
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // Using gemini-3-pro-preview for complex reasoning/medical analysis tasks
    const model = 'gemini-3-pro-preview';
    const prompt = `
      Act as an expert medical AI assistant for a doctor. 
      Analyze the following patient data:
      
      Symptoms: ${symptoms}
      Medical History: ${history}
      Vitals: ${vitals}

      Provide a structured response including:
      1. Potential Diagnosis (Top 3 possibilities with probabilities)
      2. Recommended Tests
      3. Suggested Treatment Plan (Generic medicines)
      4. Risk Alerts (e.g., High BP, Drug interactions)

      Keep the tone professional, concise, and clinical. Disclaimer: This is AI assistance, not a final medical verdict.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
    });

    // Directly access the .text property (not a method)
    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please ensure your environment is configured correctly.";
  }
};