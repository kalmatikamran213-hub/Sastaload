import { GoogleGenAI, Type } from "@google/genai";
import { QuoteRequest, QuoteResult } from "../types";

// Enhanced fallback logic with specific Pakistani route pricing
const getFallbackQuote = (request: QuoteRequest): QuoteResult => {
  const weightVal = parseFloat(request.weight) || 1;
  const originSeed = request.origin.toLowerCase().length;
  const destSeed = request.destination.toLowerCase().length;
  const distanceKm = 200 + ((originSeed + destSeed) * 53) % 1300;
  
  const isHeavy = weightVal > 7;
  const basePrice = Math.round(distanceKm * (isHeavy ? 290 : 145));
  const fuelCost = Math.round(basePrice * 0.48);
  const tolls = distanceKm > 500 ? 4500 : 1200;

  let vehicle = "Suzuki Ravi / Pickup";
  if (weightVal > 1.5) vehicle = "Shehzore (10ft)";
  if (weightVal > 3.5) vehicle = "Mazda (16ft)";
  if (weightVal > 8) vehicle = "10-Wheeler Rigid Truck";
  if (weightVal > 25) vehicle = "22-Wheeler Trailer";

  return {
    estimatedPriceRange: `PKR ${(basePrice * 0.92).toLocaleString()} - ${(basePrice * 1.08).toLocaleString()}`,
    targetBid: `PKR ${basePrice.toLocaleString()}`,
    fuelCostEstimate: `PKR ${fuelCost.toLocaleString()}`,
    demandStatus: distanceKm > 900 ? "High Demand" : "Stable",
    distance: `${distanceKm} km`,
    estimatedTime: `${Math.round(distanceKm / 45 + 3)} Hours`,
    routeAdvice: "Advised to use N-5 for heavy cargo or M-2 for time-critical electronics.",
    vehicleRecommendation: vehicle
  };
};

export const getSmartQuote = async (request: QuoteRequest): Promise<QuoteResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Act as a Lead Logistics Analyst specializing in the Pakistan freight market.
      Calculate a highly accurate freight quote based on:
      - Origin: ${request.origin}
      - Destination: ${request.destination}
      - Cargo: ${request.cargoType}
      - Weight: ${request.weight} tons
      - Date: ${request.date || 'Immediate'}
      
      Logistics Context for Pakistan:
      - Current Diesel: ~PKR 280/L.
      - Tolls: Factor in M-1, M-2, M-3, M-4, M-5 and N-5 highway tolls.
      - Return Loads: Consider if the route (e.g. Karachi-Lahore) has high return load potential, lowering the bid.
      - Market Logic: Direct-to-driver wholesale pricing (exclude traditional 5-10% agent commission).
      
      Response Requirements:
      - All currency in PKR.
      - Vehicle must be a common Pakistani type (Ravi, Shehzore, Mazda, 6/10/12-Wheeler, or 22-Wheeler Trailer).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedPriceRange: { type: Type.STRING, description: "Range of bids expected (e.g. PKR 45,000 - 52,000)" },
            targetBid: { type: Type.STRING, description: "The ideal bid to post on the app" },
            fuelCostEstimate: { type: Type.STRING, description: "Estimated diesel cost for the driver" },
            demandStatus: { type: Type.STRING, description: "Current demand level on this lane" },
            distance: { type: Type.STRING },
            estimatedTime: { type: Type.STRING, description: "Estimated driving time including breaks" },
            routeAdvice: { type: Type.STRING, description: "Professional advice on routing or loading" },
            vehicleRecommendation: { type: Type.STRING, description: "Best vehicle type for this weight and cargo" }
          },
          required: [
            "estimatedPriceRange", "targetBid", "fuelCostEstimate", 
            "demandStatus", "distance", "estimatedTime", "routeAdvice", "vehicleRecommendation"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data received");
    return JSON.parse(text) as QuoteResult;
  } catch (error) {
    console.error("AI Quote Failed:", error);
    return getFallbackQuote(request);
  }
};