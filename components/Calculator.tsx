import React, { useState } from 'react';
import { MapPin, Box, Scale, Calendar, Loader2, AlertCircle, Info, Fuel, TrendingUp, Target, ThumbsUp, ThumbsDown, CheckCircle, AlertTriangle } from 'lucide-react';
import { getSmartQuote } from '../services/geminiService';
import { QuoteResult, SharedProps } from '../types';

const Calculator: React.FC<SharedProps> = ({ onOpenWaitlist }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !cargoType || !weight) {
      setError("Please fill all fields");
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
      setError("Could not calculate rate. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="calculator" className="bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 w-full relative overflow-hidden">
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900">Get an instant quote</h3>
            <div className="flex items-center gap-1.5 text-[10px] lg:text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full whitespace-nowrap border border-green-100/50">
                <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-500 animate-pulse"></span>
                AI Powered
            </div>
        </div>
        
        <form onSubmit={handleEstimate} className="space-y-4">
          {/* Origin */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-4 ring-slate-100"></div>
            </div>
            <input 
              type="text" 
              placeholder="Pickup Location" 
              className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:ring-4 focus:ring-slate-100 transition-all outline-none text-base shadow-sm hover:shadow-md focus:shadow-lg"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>

          {/* Destination */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors pointer-events-none">
               <div className="w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-brand/20"></div>
            </div>
            <input 
              type="text" 
              placeholder="Dropoff Location" 
              className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:ring-4 focus:ring-brand/10 transition-all outline-none text-base shadow-sm hover:shadow-md focus:shadow-lg"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Cargo */}
            <div className="relative group">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Box size={18} />
               </div>
               <select 
                  className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-slate-200 rounded-2xl py-3.5 pl-12 pr-2 text-slate-900 font-bold appearance-none focus:ring-4 focus:ring-slate-100 cursor-pointer outline-none text-base shadow-sm hover:shadow-md focus:shadow-lg"
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                >
                  <option value="">Cargo Type</option>
                  <option value="General Goods">General</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Construction">Construction</option>
                  <option value="Food/Perishables">Food/Veg</option>
                  <option value="Textile">Textile</option>
                  <option value="Machinery">Machinery</option>
                </select>
            </div>

            {/* Weight */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Scale size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Weight (tons)" 
                className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:ring-4 focus:ring-slate-100 transition-all outline-none text-base shadow-sm hover:shadow-md focus:shadow-lg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* Date */}
            <div className="relative group col-span-2 lg:col-span-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Calendar size={18} />
              </div>
              <input 
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#F8F9FA] hover:bg-[#F3F3F3] focus:bg-white border border-transparent focus:border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:ring-4 focus:ring-slate-100 transition-all outline-none text-base shadow-sm hover:shadow-md focus:shadow-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold px-2 animate-pulse bg-red-50 p-3 rounded-xl border border-red-100">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-hover text-slate-900 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-wait mt-4 transform active:scale-[0.98] shadow-lg shadow-brand/20 text-lg hover:-translate-y-1"
          >
            {loading ? (
                <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Calculating...</span>
                </>
            ) : "Calculate Rate"}
          </button>
        </form>
      </div>

      {/* Result Card Overlay */}
      {result && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                <h4 className="text-xl font-extrabold text-slate-900">Estimated Quote</h4>
                <button onClick={() => setResult(null)} className="text-slate-400 hover:text-slate-900 bg-slate-50 p-2 rounded-full transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide">
                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 flex gap-3">
                    <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-yellow-800 font-medium leading-relaxed">
                        <strong className="block text-yellow-900">Note:</strong> 
                        These rates are AI estimates and may vary. For best results, use the app to get real bids from verified drivers.
                    </p>
                </div>

                {/* Primary Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F8F9FA] border border-slate-100 rounded-2xl p-4 text-center">
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Target Bid</p>
                         <p className="text-xl font-extrabold text-brand-dark tracking-tight">{result.targetBid}</p>
                    </div>
                    <div className="bg-[#F8F9FA] border border-slate-100 rounded-2xl p-4 text-center">
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Market Range</p>
                         <p className="text-sm font-bold text-slate-600">{result.estimatedPriceRange}</p>
                    </div>
                </div>

                {/* Secondary Info */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                            <Target size={12} className="text-brand-dark" />
                            Vehicle
                        </p>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{result.vehicleRecommendation}</p>
                    </div>
                    <div className="space-y-1 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                            <TrendingUp size={12} className="text-brand-dark" />
                            Demand
                        </p>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{result.demandStatus}</p>
                    </div>
                </div>
                
                {/* Fuel & Route */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex justify-between items-center">
                    <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mb-1">
                            <Fuel size={12} className="text-brand-dark" />
                            Est. Fuel Cost
                        </p>
                        <p className="text-sm font-bold text-slate-900">{result.fuelCostEstimate}</p>
                    </div>
                    <div className="text-right">
                         <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Distance / Time</p>
                         <p className="text-sm font-bold text-slate-900">{result.distance} • {result.estimatedTime}</p>
                    </div>
                </div>

                {/* Advice */}
                <div className="space-y-2">
                     <div className="flex items-center gap-2 mb-1">
                        <Info size={14} className="text-brand-dark" />
                        <p className="text-xs text-slate-900 font-bold uppercase">Logistics Advice</p>
                     </div>
                     <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 shadow-sm leading-relaxed font-medium">
                        {result.routeAdvice}
                     </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                <button 
                    onClick={onOpenWaitlist}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 text-base"
                >
                    Book Now
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>

                {/* Feedback Mechanism */}
                <div className="flex flex-col items-center justify-center gap-2">
                    {!feedbackGiven ? (
                        <>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rate this estimate</p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setFeedbackGiven(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-green-50 border border-slate-100 hover:border-green-200 rounded-full text-xs font-bold text-slate-500 hover:text-green-700 transition-all"
                                >
                                    <ThumbsUp size={14} /> Accurate
                                </button>
                                <button 
                                    onClick={() => setFeedbackGiven(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-200 rounded-full text-xs font-bold text-slate-500 hover:text-red-700 transition-all"
                                >
                                    <ThumbsDown size={14} /> Inaccurate
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full animate-in fade-in zoom-in duration-300">
                            <CheckCircle size={14} />
                            <span>Thanks for your feedback</span>
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