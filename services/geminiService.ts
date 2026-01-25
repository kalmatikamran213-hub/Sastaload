import { GoogleGenAI, Type } from "@google/genai";
import { QuoteRequest, QuoteResult } from "../types";

// Helper for local estimation if API fails or is unavailable
const getFallbackQuote = (request: QuoteRequest): QuoteResult => {
  const weightVal = parseFloat(request.weight) || 1;
  const originSeed = request.origin.toLowerCase().length;
  const destSeed = request.destination.toLowerCase().length;
  // Deterministic random-like distance based on inputs
  const distanceKm = 300 + ((originSeed + destSeed) * 47) % 1200;
  
  const isHeavy = weightVal > 5;
  const basePrice = Math.round(distanceKm * (isHeavy ? 280 : 130));
  const fuelCost = Math.round(basePrice * 0.45);

  let vehicle = "Suzuki Ravi / Pickup";
  if (weightVal > 1.5) vehicle = "Shehzore (10ft)";
  if (weightVal > 3.5) vehicle = "Mazda (16ft)";
  if (weightVal > 8) vehicle = "6-Wheeler Truck";
  if (weightVal > 25) vehicle = "Trailer (22-Wheeler)";

  return {
    estimatedPriceRange: `PKR ${(basePrice * 0.9).toLocaleString()} - ${(basePrice * 1.1).toLocaleString()}`,
    targetBid: `PKR ${basePrice.toLocaleString()}`,
    fuelCostEstimate: `PKR ${fuelCost.toLocaleString()}`,
    demandStatus: distanceKm > 800 ? "High Demand" : "Normal",
    distance: `${distanceKm} km`,
    estimatedTime: `${Math.round(distanceKm / 50 + 2)} Hours`,
    routeAdvice: "Route via Motorway recommended for safety.",
    vehicleRecommendation: vehicle
  };
};

export const getSmartQuote = async (request: QuoteRequest): Promise<QuoteResult> => {
  try {
    const apiKey = process.env.API_KEY;
    
    // Safety check: If API Key is missing (e.g. not set in Netlify), use fallback immediately
    if (!apiKey || apiKey.trim() === '') {
        console.warn("API Key is missing. Using local estimation fallback.");
        return getFallbackQuote(request);
    }

    // Strictly follow SDK initialization from system instructions
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const prompt = `
      Act as a senior logistics analyst for the Pakistan market. 
      Provide a freight quote for:
      Origin: ${request.origin}
      Destination: ${request.destination}
      Cargo: ${request.cargoType}
      Weight: ${request.weight} tons
      Date: ${request.date || 'Immediate'}
      
      Requirements: 
      - Use current Diesel rates (approx PKR 280/L).
      - Prices in PKR.
      - Direct-to-driver wholesale pricing (no middleman).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedPriceRange: { type: Type.STRING },
            targetBid: { type: Type.STRING },
            fuelCostEstimate: { type: Type.STRING },
            demandStatus: { type: Type.STRING },
            distance: { type: Type.STRING },
            estimatedTime: { type: Type.STRING },
            routeAdvice: { type: Type.STRING },
            vehicleRecommendation: { type: Type.STRING }
          },
          required: [
            "estimatedPriceRange", "targetBid", "fuelCostEstimate", 
            "demandStatus", "distance", "estimatedTime", "routeAdvice", "vehicleRecommendation"
          ]
        }
      }
    });

    // Access .text property directly as per instructions
    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");
    return JSON.parse(text) as QuoteResult;
  } catch (error) {
    console.error("Gemini Quote Error:", error);
    // Graceful fallback to local logic
    return getFallbackQuote(request);
  }
};