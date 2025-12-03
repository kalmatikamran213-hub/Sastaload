import { GoogleGenAI, Type } from "@google/genai";
import { QuoteRequest, QuoteResult } from "../types";

// Safely attempt to get the API key. 
// In some client-side environments, accessing process.env might throw a ReferenceError.
let apiKey = '';
try {
  apiKey = process.env.API_KEY || '';
} catch (e) {
  console.warn("API Key environment variable not accessible.");
}

// Initialize AI client only if key is present
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates a fallback quote using local logic if the AI service is unavailable.
 * This ensures the calculator works for demo purposes even without an API key.
 */
const getFallbackQuote = (request: QuoteRequest): QuoteResult => {
  const isHeavy = request.weight.toLowerCase().includes('ton') || 
                  (parseInt(request.weight) > 1000 && !request.weight.toLowerCase().includes('kg'));
  
  // Base calculation logic for demo
  const basePrice = isHeavy ? 85000 : 32000;
  const variance = Math.floor(Math.random() * 5000);
  const target = basePrice + variance;
  const fuel = Math.floor(target * 0.45);
  
  const vehicle = isHeavy 
    ? "10-Wheeler Rigid / Trailer" 
    : "Hyundai Shehzore / Mazda (3-7 Ton)";

  return {
    estimatedPriceRange: `PKR ${(target - 2000).toLocaleString()} - ${(target + 5000).toLocaleString()}`,
    targetBid: `PKR ${target.toLocaleString()}`,
    fuelCostEstimate: `PKR ${fuel.toLocaleString()}`,
    demandStatus: "Normal Demand",
    distance: "Approx. 450 km",
    estimatedTime: "12 - 14 Hours",
    routeAdvice: "Standard commercial route via National Highway (N-5). Advisable to dispatch early morning to avoid urban traffic.",
    vehicleRecommendation: vehicle
  };
};

export const getSmartQuote = async (request: QuoteRequest): Promise<QuoteResult> => {
  // 1. Try AI Generation
  if (ai) {
    try {
      const dateContext = request.date ? `Scheduled Date: ${request.date}.` : 'Date: Immediate dispatch.';

      const prompt = `
        Act as a senior logistics pricing analyst for the Pakistani trucking market.
        Analyze this shipment request and provide a highly accurate, professional quote breakdown.

        Request Details:
        Origin: ${request.origin}
        Destination: ${request.destination}
        Cargo: ${request.cargoType}
        Weight: ${request.weight}
        ${dateContext}

        Contextual Data (Pakistan):
        - Fuel Price Reference: Diesel approx. PKR 260-290/L.
        - Major Routes: N-5 (GT Road), M-2/M-3/M-4/M-5 (Motorways), N-55 (Indus Hwy).
        - Vehicle Types: Shehzore/Jac (1-3 tons), Mazda (3-7 tons), 6-Wheeler (10 tons), 10-Wheeler, 22-Wheeler (Trailers).

        Pricing Strategy (CRITICAL):
        - SastaLoad connects shippers DIRECTLY with drivers, eliminating broker commissions (usually 15-20%).
        - The "Target Bid" MUST be highly competitive and reflect "wholesale" direct-to-driver rates.
        - Discount standard market rates by roughly 15-20% to show the user the savings of using this platform.
        - Provide a "Market Range" that starts low (aggressive) to medium.

        Analysis Required:
        1. Select the most efficient vehicle type.
        2. Calculate distance and drive time via the best commercial route.
        3. Estimate Fuel Cost (Distance / Avg Mileage * Fuel Price).
        4. Determine Market Demand (Is this a busy route? Is it harvest season?).
        5. Provide a "Target Bid" (A very competitive, direct-deal price).
        6. Provide a "Market Range" (Low to High variation).
        7. Give specific Route Advice (e.g., "Avoid N-5 during day due to traffic", "Use Motorway for fragility").

        Output valid JSON matching the schema.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              estimatedPriceRange: { type: Type.STRING, description: "e.g., PKR 40,000 - 45,000" },
              targetBid: { type: Type.STRING, description: "e.g., PKR 42,000" },
              fuelCostEstimate: { type: Type.STRING, description: "e.g., PKR 18,500" },
              demandStatus: { type: Type.STRING, description: "e.g., High Demand (Peak Season), Normal, or Low (Return Loads Available)" },
              distance: { type: Type.STRING, description: "e.g., 350 km" },
              estimatedTime: { type: Type.STRING, description: "e.g., 5 hours 30 mins" },
              routeAdvice: { type: Type.STRING, description: "Specific route advice for Pakistan context." },
              vehicleRecommendation: { type: Type.STRING, description: "e.g., Mazda Truck (Open Body)" }
            },
            required: [
              "estimatedPriceRange", 
              "targetBid", 
              "fuelCostEstimate", 
              "demandStatus", 
              "distance", 
              "estimatedTime", 
              "routeAdvice", 
              "vehicleRecommendation"
            ]
          }
        }
      });

      const text = response.text;
      if (text) {
        return JSON.parse(text) as QuoteResult;
      }
    } catch (error) {
      console.warn("Gemini API Error (falling back to local estimation):", error);
    }
  } else {
    console.log("No API Key detected. Using local fallback estimation.");
  }

  // 2. Fallback if AI fails or no key
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));
  return getFallbackQuote(request);
};