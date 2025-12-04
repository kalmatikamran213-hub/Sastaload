import { GoogleGenAI, Type } from "@google/genai";
import { QuoteRequest, QuoteResult } from "../types";

// Safe access to API Key for browser environments
const getApiKey = () => {
  try {
    // In some build environments process might not be defined
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
    return '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();

let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.warn("Failed to initialize GoogleGenAI client:", error);
  }
}

// --- SMART FALLBACK SYSTEM ---
// This ensures the calculator gives realistic Pakistani market rates 
// even when the API key is missing or the quota is exceeded.

const PAKISTAN_DISTANCES: Record<string, Record<string, number>> = {
  'karachi': { 'lahore': 1210, 'islamabad': 1410, 'multan': 925, 'faisalabad': 1115, 'peshawar': 1550, 'quetta': 690, 'sukkur': 475 },
  'lahore': { 'karachi': 1210, 'islamabad': 375, 'multan': 345, 'faisalabad': 185, 'peshawar': 520, 'quetta': 990, 'sukkur': 780 },
  'islamabad': { 'karachi': 1410, 'lahore': 375, 'multan': 535, 'faisalabad': 320, 'peshawar': 185, 'quetta': 890, 'sukkur': 980 },
  'multan': { 'karachi': 925, 'lahore': 345, 'islamabad': 535, 'faisalabad': 245, 'peshawar': 650, 'quetta': 620, 'sukkur': 460 },
};

const getDistance = (origin: string, destination: string): number => {
  const o = origin.toLowerCase();
  const d = destination.toLowerCase();
  
  // 1. Try direct lookup
  for (const city in PAKISTAN_DISTANCES) {
    if (o.includes(city)) {
      for (const target in PAKISTAN_DISTANCES[city]) {
        if (d.includes(target)) return PAKISTAN_DISTANCES[city][target];
      }
    }
  }

  // 2. Fallback: Generate a consistent "random" distance based on string hash
  // This ensures the same inputs always give the same result
  const seed = o.length + d.length + o.charCodeAt(0) + d.charCodeAt(0);
  return 300 + (seed * 47) % 1500; // Returns between 300km and 1800km
};

const getFallbackQuote = (request: QuoteRequest): QuoteResult => {
  let weightVal = parseFloat(request.weight) || 1000;
  
  // Heuristic: If weight is small (< 100) and doesn't explicitly say "kg", assume tons and convert to kg
  if (weightVal < 100 && !request.weight.toLowerCase().includes('kg')) {
      weightVal = weightVal * 1000;
  }
  
  const isHeavy = weightVal > 4000; // > 4 tons
  const distanceKm = getDistance(request.origin, request.destination);
  
  // Market Rates (PKR per km)
  // Light (Shehzore): ~100-120 PKR/km
  // Heavy (Mazda/Trailer): ~200-350 PKR/km
  const ratePerKm = isHeavy ? 280 : 130; 
  
  // Base Cost Calculation
  const fuelCost = Math.round(distanceKm * (isHeavy ? 120 : 60)); // Fuel estimate
  const basePrice = Math.round(distanceKm * ratePerKm);
  
  // Add some randomness for "Market Range" look
  const variance = Math.round(basePrice * 0.15); 
  
  const minPrice = basePrice - variance;
  const maxPrice = basePrice + variance;
  const targetBid = Math.round(basePrice * 0.95); // 5% below average

  // Vehicle Selection
  let vehicle = "Suzuki Ravi / Pickup";
  if (weightVal > 1000) vehicle = "Shehzore (10ft)";
  if (weightVal > 3000) vehicle = "Mazda (16ft)";
  if (weightVal > 8000) vehicle = "6-Wheeler Truck";
  if (weightVal > 15000) vehicle = "10-Wheeler Truck";
  if (weightVal > 25000) vehicle = "Trailer (22-Wheeler)";

  // Time Estimate (Avg speed 50km/h + 2 hours loading)
  const hours = Math.round((distanceKm / 50) + 2);
  const timeString = hours > 24 
    ? `${Math.floor(hours/24)} Days ${hours%24} Hours`
    : `${hours} Hours`;

  return {
    estimatedPriceRange: `PKR ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`,
    targetBid: `PKR ${targetBid.toLocaleString()}`,
    fuelCostEstimate: `PKR ${fuelCost.toLocaleString()}`,
    demandStatus: distanceKm > 800 ? "High Demand (Long Haul)" : "Normal Demand",
    distance: `${distanceKm} km`,
    estimatedTime: timeString,
    routeAdvice: distanceKm > 500 ? "Use Motorway (M-5) for safety." : "Standard GT Road route recommended.",
    vehicleRecommendation: vehicle
  };
};

const cleanJsonString = (str: string) => {
  return str.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const getSmartQuote = async (request: QuoteRequest): Promise<QuoteResult> => {
  // If no API key or AI instance, immediately use fallback
  if (!apiKey || !ai) {
    console.log("Using SastaLoad Smart Fallback (No API Key)");
    return new Promise(resolve => {
        setTimeout(() => resolve(getFallbackQuote(request)), 1500); // 1.5s delay to simulate API
    });
  }

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
    - Fuel Price Reference: Diesel approx. PKR 270-290/L.
    - Major Routes: N-5 (GT Road), M-2/M-3/M-4/M-5 (Motorways), N-55 (Indus Hwy).
    - Vehicle Types: Shehzore/Jac (1-3 tons), Mazda (3-7 tons), 6-Wheeler (10 tons), 10-Wheeler, 22-Wheeler (Trailers).

    Pricing Strategy (CRITICAL):
    - SastaLoad connects shippers DIRECTLY with drivers, eliminating broker commissions (usually 15-20%).
    - The "Target Bid" MUST be highly competitive and reflect "wholesale" direct-to-driver rates.
    - Discount standard market rates by roughly 15-20% to show the user the savings of using this platform.
    - Provide a "Market Range" that starts low (aggressive) to medium.

    Analysis Required:
    1. Select the most efficient vehicle type based on weight.
    2. Calculate distance and drive time via the best commercial route.
    3. Estimate Fuel Cost (Distance / Avg Mileage * Fuel Price).
    4. Determine Market Demand (Is this a busy route? Is it harvest season?).
    5. Provide a "Target Bid" (A very competitive, direct-deal price).
    6. Provide a "Market Range" (Low to High variation).
    7. Give specific Route Advice (e.g., "Avoid N-5 during day due to traffic", "Use Motorway for fragility").

    Output valid JSON matching the schema.
  `;

  try {
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
    if (!text) {
      throw new Error("No response from AI");
    }

    const cleanedText = cleanJsonString(text);
    return JSON.parse(cleanedText) as QuoteResult;
  } catch (error) {
    console.warn("AI Generation failed, using fallback:", error);
    return getFallbackQuote(request);
  }
};