import { GoogleGenerativeAI } from "@google/generative-ai";

// Log to check if API key is defined
console.log("Gemini API key available:", !!process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Initialize the Gemini API
export const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function generateTextContent(prompt: string): Promise<string> {
  try {
    console.log("Starting text generation with model:", "gemini-1.5-flash");
    
    // For text-only input, use the Gemini 2.0 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log("Sending prompt to Gemini API:", prompt.substring(0, 50) + "...");
    const result = await model.generateContent(prompt);
    console.log("Received response from Gemini API");
    
    const response = await result.response;
    const text = response.text();
    console.log("Generated text length:", text.length);
    
    return text;
  } catch (error: any) {
    console.error("Error generating content with Gemini:", error.message || error);
    console.error("Error details:", error);
    
    // Return a user-friendly error message instead of throwing
    return `I encountered an issue processing your request: ${error.message || "Unknown error"}. Please try again.`;
  }
}

export async function generateCaseAnalysis(caseData: any): Promise<string> {
  console.log("Generating case analysis for:", caseData);
  
  const prompt = `
    Analyze the following drug case information:
    Location: ${caseData.location}
    Substances involved: ${caseData.substances}
    Quantity: ${caseData.quantity}
    Suspects: ${caseData.suspects}
    
    Provide insights on:
    1. Potential trafficking routes based on the location
    2. Associated crime networks
    3. Recommended surveillance approach
    4. Risk assessment
  `;
  
  return generateTextContent(prompt);
}