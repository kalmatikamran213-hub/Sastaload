import React, { useState, useEffect } from 'react';
import { MapPin, Box, Scale, Calendar, Loader2, AlertCircle, Info, Fuel, TrendingUp, Target, ThumbsUp, ThumbsDown, CheckCircle, AlertTriangle, ArrowRight, ChevronDown } from 'lucide-react';
import { getSmartQuote } from '../services/geminiService';
import { QuoteResult, SharedProps } from '../types';

const MAJOR_CITIES = ["Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Gujranwala", "Peshawar", "Multan", "Hyderabad", "Islamabad", "Quetta", "Sialkot", "Sargodha", "Sukkur", "Rahim Yar Khan", "Gawadar"];

const Calculator: React.FC<SharedProps> = ({ onOpenWaitlist }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  // Suggested Cities Logic
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (origin.length > 1) {
      setOriginSuggestions(MAJOR_CITIES.filter(c => c.toLowerCase().includes(origin.toLowerCase()) && c !== origin));
    } else {
      setOriginSuggestions([]);
    }
  }, [origin]);

  useEffect(() => {
    if (destination.length > 1) {
      setDestSuggestions(MAJOR_CITIES.filter(c => c.toLowerCase().includes(destination.toLowerCase()) && c !== destination));
    } else {
      setDestSuggestions([]);
    }
  }, [destination]);

  const steps = [
    "Analyzing route distance...",
    "Calculating fuel & tolls...",
    "Checking vehicle availability...",
    "Estimating target bid..."
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(s => (s + 1) % steps.length);
      }, 800);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !cargoType || !weight) {
      setError("Please provide all shipment details");
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);
    setFeedbackGiven(false);

    try {
      const data = await getSmartQuote({ origin, destination, cargoType, weight, date });
      setResult(data);
    } catch (err) {
      setError("AI engine busy. Using local estimate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="calculator" className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 w-full relative overflow-hidden">
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div className="text-left">
                <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900">Freight Calculator</h3>
                <p className="text-xs text-slate-500 font-bold mt-1">Direct-to-driver wholesale rates</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] lg:text-xs font-bold bg-brand/10 text-brand-dark px-3 py-1.5 rounded-full border border-brand/20">
                <span className="w-2 h-2 rounded-full bg-brand-dark animate-pulse"></span>
                v2.0 Accurate
            </div>
        </div>
        
        <form onSubmit={handleEstimate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Origin with Suggestions */}
              <div className="relative group text-left">
                <div className="absolute left-4 top-[1.1rem] text-slate-400 pointer-events-none z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-4 ring-slate-100"></div>
                </div>
                <input 
                  type="text" 
                  placeholder="Pickup Hub (e.g. Port Trust)" 
                  className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-brand rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder:font-medium placeholder-slate-400 focus:ring-4 focus:ring-brand/10 transition-all outline-none text-sm shadow-sm"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
                {originSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-xl z-30 overflow-hidden">
                    {originSuggestions.map(city => (
                      <button key={city} type="button" onClick={() => {setOrigin(city); setOriginSuggestions([]);}} className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Destination with Suggestions */}
              <div className="relative group text-left">
                <div className="absolute left-4 top-[1.1rem] text-slate-400 pointer-events-none z-10">
                   <div className="w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-brand/20"></div>
                </div>
                <input 
                  type="text" 
                  placeholder="Dropoff City" 
                  className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-brand rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder:font-medium placeholder-slate-400 focus:ring-4 focus:ring-brand/10 transition-all outline-none text-sm shadow-sm"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                {destSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-xl z-30 overflow-hidden">
                    {destSuggestions.map(city => (
                      <button key={city} type="button" onClick={() => {setDestination(city); setDestSuggestions([]);}} className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Cargo */}
            <div className="relative group text-left">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Box size={16} />
               </div>
               <select 
                  className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-brand rounded-2xl py-3.5 pl-12 pr-2 text-slate-900 font-bold appearance-none focus:ring-4 focus:ring-brand/10 cursor-pointer outline-none text-sm shadow-sm"
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                >
                  <option value="">Cargo Type</option>
                  <option value="General Goods">General</option>
                  <option value="Furniture/Home">Furniture</option>
                  <option value="Construction Mat">Construction</option>
                  <option value="Perishables/Food">FMCG / Food</option>
                  <option value="Textiles/Fabrics">Textile</option>
                  <option value="Industrial Mach">Machinery</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown size={14} />
                </div>
            </div>

            {/* Weight */}
            <div className="relative group text-left">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Scale size={16} />
              </div>
              <input 
                type="number" 
                placeholder="Tons" 
                className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-brand rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:ring-4 focus:ring-brand/10 transition-all outline-none text-sm shadow-sm"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* Date */}
            <div className="relative group col-span-2 lg:col-span-1 text-left">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Calendar size={16} />
              </div>
              <input 
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-brand rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:ring-4 focus:ring-brand/10 transition-all outline-none text-sm shadow-sm cursor-pointer"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 p-4 rounded-2xl border border-red-100">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-wait mt-4 transform active:scale-[0.98] shadow-lg shadow-slate-900/10 text-base"
          >
            {loading ? (
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-0.5">
                        <Loader2 className="animate-spin w-5 h-5 text-brand" />
                        <span>Calculating AI Quote...</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider animate-pulse">{steps[loadingStep]}</span>
                </div>
            ) : "Get Intelligence Quote"}
          </button>
        </form>
      </div>

      {/* Result Card Overlay */}
      {result && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-6 duration-500 overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
                <div className="text-left">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight">Market Intelligence</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Route: {origin} to {destination}</p>
                </div>
                <button onClick={() => setResult(null)} className="text-slate-400 hover:text-slate-900 bg-slate-50 p-2.5 rounded-full transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div className="flex-1 space-y-6">
                {/* Pricing Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-brand/5 border border-brand/20 rounded-[28px] p-6 text-left relative overflow-hidden group">
                         <div className="absolute top-0 right-0 bg-brand/10 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-brand-dark">RECOMMENDED</div>
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Target Bid</p>
                         <p className="text-3xl font-black text-slate-900 tracking-tight">{result.targetBid}</p>
                         <p className="text-xs text-slate-500 font-medium mt-1">Post this bid for fastest matches</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-[28px] p-6 text-left">
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Market Range</p>
                         <p className="text-xl font-bold text-slate-700">{result.estimatedPriceRange}</p>
                         <p className="text-xs text-slate-400 font-medium mt-2 flex items-center gap-1">
                             <TrendingUp size={12} /> Rate is {result.demandStatus}
                         </p>
                    </div>
                </div>

                {/* Logistics Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5 mb-2">
                            <Target size={14} className="text-brand-dark" />
                            Ideal Vehicle
                        </p>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{result.vehicleRecommendation}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5 mb-2">
                            <Fuel size={14} className="text-brand-dark" />
                            Fuel Cost
                        </p>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{result.fuelCostEstimate}</p>
                    </div>
                </div>

                {/* Advice Box */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden group">
                     <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand/5 rounded-full blur-2xl group-hover:bg-brand/10 transition-all duration-500"></div>
                     <div className="relative z-10 text-left">
                        <div className="flex items-center gap-2 mb-3">
                            <Info size={16} className="text-brand" />
                            <p className="text-xs font-bold uppercase tracking-widest text-brand">Expert Advice</p>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                            {result.routeAdvice}
                        </p>
                     </div>
                </div>

                {/* Journey Stats */}
                <div className="flex justify-between items-center px-2">
                    <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Distance</p>
                        <p className="text-base font-bold text-slate-900">{result.distance}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-100"></div>
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Drive Time</p>
                        <p className="text-base font-bold text-slate-900">{result.estimatedTime}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-100"></div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Est. Tolls</p>
                        <p className="text-base font-bold text-slate-900">PKR 3,500+</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <button 
                    onClick={onOpenWaitlist}
                    className="w-full bg-brand text-slate-900 font-black py-5 rounded-2xl transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-3 text-lg group hover:-translate-y-1 active:translate-y-0"
                >
                    Post Load & Get Bids
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex flex-col items-center justify-center gap-3">
                    {!feedbackGiven ? (
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Is this quote accurate?</span>
                            <div className="flex gap-2">
                                <button onClick={() => setFeedbackGiven(true)} className="p-2 bg-slate-50 hover:bg-green-50 text-slate-400 hover:text-green-600 rounded-xl transition-all border border-transparent hover:border-green-100"><ThumbsUp size={16} /></button>
                                <button onClick={() => setFeedbackGiven(true)} className="p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all border border-transparent hover:border-red-100"><ThumbsDown size={16} /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full animate-in fade-in zoom-in duration-300 border border-green-100">
                            <CheckCircle size={14} />
                            <span>Thanks for helping improve the AI!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;