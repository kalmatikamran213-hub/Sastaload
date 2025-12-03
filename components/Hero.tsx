import React from 'react';
import { Star, CheckCircle, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import Calculator from './Calculator';
import { SharedProps } from '../types';

const Hero: React.FC<SharedProps> = ({ onOpenWaitlist }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-28 overflow-hidden bg-slate-50">
      
      {/* Modern Background Gradient Mesh */}
      <div className="absolute inset-0 bg-white/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] opacity-60 mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center items-start">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 lg:pr-10 pt-4">
            
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-1.5 rounded-full reveal-on-scroll">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Live in 50+ Cities</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.05] reveal-on-scroll reveal-delay-100">
              Freight booking, <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
                Direct to Driver.
                <svg className="absolute w-full h-3 lg:h-4 -bottom-1 left-0 text-brand z-[-1]" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.6" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium reveal-on-scroll reveal-delay-200">
              Eliminate middlemen and save up to 30%. Connect directly with verified fleet owners for transparent, reliable shipping across Pakistan.
            </p>

            {/* Feature Pills - Mobile Optimized: Single Line */}
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 lg:gap-3 w-full sm:w-auto pb-1 reveal-on-scroll reveal-delay-300">
                <div className="flex-shrink-0 flex items-center gap-1.5 bg-white px-2.5 py-2 lg:px-4 lg:py-2.5 rounded-xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1 whitespace-nowrap">
                    <ShieldCheck className="text-green-600 w-3.5 h-3.5 lg:w-5 lg:h-5" />
                    <span className="text-[11px] lg:text-sm font-bold text-slate-700">Fully Insured</span>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5 bg-white px-2.5 py-2 lg:px-4 lg:py-2.5 rounded-xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1 whitespace-nowrap">
                    <Zap className="text-orange-500 w-3.5 h-3.5 lg:w-5 lg:h-5" />
                    <span className="text-[11px] lg:text-sm font-bold text-slate-700">Instant Quotes</span>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5 bg-white px-2.5 py-2 lg:px-4 lg:py-2.5 rounded-xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1 whitespace-nowrap">
                    <TrendingUp className="text-blue-500 w-3.5 h-3.5 lg:w-5 lg:h-5" />
                    <span className="text-[11px] lg:text-sm font-bold text-slate-700">Real-time Rates</span>
                </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6 pt-2 lg:pt-4 reveal-on-scroll reveal-delay-300">
               <div className="flex -space-x-3 lg:-space-x-4">
                   {[1,2,3,4].map(i => (
                       <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border-[3px] border-white shadow-md hover:scale-105 transition-transform" />
                   ))}
                   <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] lg:text-xs border-[3px] border-white shadow-md relative z-10">
                     +15k
                   </div>
               </div>
               <div>
                   <div className="flex items-center gap-1">
                       <Star className="w-4 h-4 lg:w-5 lg:h-5 text-orange-400 fill-orange-400" />
                       <span className="font-bold text-slate-900 text-base lg:text-lg">4.9/5</span>
                   </div>
                   <p className="text-[10px] lg:text-xs text-slate-500 font-bold uppercase tracking-wide">TrustScore Rating</p>
               </div>
            </div>
          </div>

          {/* Right Column: Calculator Widget */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 w-full reveal-on-scroll reveal-delay-300">
             <div className="absolute -inset-4 bg-gradient-to-r from-brand/30 to-blue-200/30 rounded-[40px] blur-2xl opacity-50"></div>
             
             <div className="relative">
                <Calculator onOpenWaitlist={onOpenWaitlist} />
             </div>
             
             {/* Floating Badge (Removed on Desktop as per previous request, usually kept for visual balance in code but hidden via CSS if needed, though user asked to remove it from view previously) */}
             {/* Keeping it hidden or removed based on previous instruction 'Remove badge that driver assigned status in desktop view' - which I did by removing the block entirely. */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;