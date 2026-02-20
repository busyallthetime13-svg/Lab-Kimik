
import { GoogleGenAI } from "@google/genai";

export const getAIResponse = async (prompt: string, context: string) => {
  if (!process.env.API_KEY) {
    return "Gabim: Nuk u gjet çelësi i API-t.";
  }

  // Krijojmë instancën e re të AI
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `Ti je Mësuesi Virtual i Kimisë për Gjimnazin Shqiptar. 
        MISIONI YT:
        1. Ndihmo nxënësin me konceptet e kimisë, veçanërisht për: ${context}.
        2. DURIMI: Nxënësi mund të bëjë gabime gramatikore ose të shkruajë pa pika/presje. TI DUHET T'I KUPTOSH DHE TË MOS E KORRIGJOSH PËR GJUHËN, POR TË PËRGJIGJESH THJESHTË.
        3. KUFIZIMI: Mos u përgjigj për gjëra që nuk janë kimi. Nëse pyetja është jashtë teme, thuaj miqësisht: "Unë jam mësues kimie, pyetmë për atomet ose reaksionet."
        4. STILI: Miqësor, inkurajues dhe shpjegues. Përdor gjuhë të thjeshtë shqipe.`,
        temperature: 0.9,
      },
    });
    
    // Përdorim pronën .text direkt siç kërkohet në udhëzime
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Më vjen keq, sistemi është i ngarkuar. Provo përsëri pas pak!";
  }
};
