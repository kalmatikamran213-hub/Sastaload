import React, { useState } from 'react';
import { ShieldCheck, Truck, Clock, Banknote, Map, Smartphone, FileText, Umbrella, UserCheck, Route } from 'lucide-react';
import { Feature } from '../types';

const allFeatures: Feature[] = [
  {
    title: "Bid-Based Pricing",
    description: "You set your offer, or let drivers bid. Get the true market price instantly.",
    icon: <Banknote className="w-6 h-6 text-slate-900" />,
  },
  {
    title: "Verified Fleet",
    description: "Every driver undergoes rigorous CNIC and vehicle documentation checks.",
    icon: <ShieldCheck className="w-6 h-6 text-slate-900" />,
  },
  {
    title: "Nationwide Network",
    description: "From Karachi Port to Khyber, we cover every major highway in Pakistan.",
    icon: <Map className="w-6 h-6 text-slate-900" />,
  },
  {
    title: "24/7 Live Tracking",
    description: "Shareable tracking links. Know exactly when your goods will arrive.",
    icon: <Clock className="w-6 h-6 text-slate-900" />,
  },
  {
    title: "Digital POD",
    description: "Receive signed Proof of Delivery instantly via the app upon shipment completion.",
    icon: <FileText className="w-6 h-6 text-slate-900" />,
  },
  {
    title: "Transit Insurance",
    description: "Optional goods-in-transit coverage to protect your high-value cargo.",
    icon: <Umbrella className="w-6 h-6 text-slate-900" />,
  },
  {
    title: "Dedicated Support",
    description: "24/7 priority support line for business clients and fleet partners.",
    icon: <UserCheck className="w-6 h-6 text-slate-900" />,
  },
  {
    title: "Smart Routing",
    description: "AI-optimized routes to save fuel and time for multi-drop deliveries.",
    icon: <Route className="w-6 h-6 text-slate-900" />,
  }
];

const Features: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedFeatures = showAll ? allFeatures : allFeatures.slice(0, 4);

  return (
    <section id="features" className="py-16 lg:py-24 bg-[#F8F9FA] relative overflow-hidden reveal-on-scroll">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-20 gap-8">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-3 py-1 rounded-full mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                     <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">The SastaLoad Advantage</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.15]">
                    Why Logistics Managers <br className="hidden md:block" />
                    <span className="relative inline-block mt-1">
                        <span className="relative z-10">Choose SastaLoad</span>
                        <div className="absolute bottom-2 left-[-4px] right-[-4px] h-4 bg-brand/50 -rotate-1 rounded-sm -z-0"></div>
                    </span>
                </h2>
                
                <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                    We replace chaos with control. Experience a seamless freight booking process designed for modern commerce.
                </p>
            </div>
            
            <button 
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-2 bg-white border border-slate-200 hover:border-brand hover:shadow-lg hover:shadow-brand/10 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all outline-none whitespace-nowrap"
            >
                {showAll ? 'Show Less' : 'View All Features'} 
                <span className="bg-slate-100 group-hover:bg-brand text-slate-900 p-1 rounded-lg transition-colors">
                    {showAll ? <Route size={16} className="rotate-180" /> : <Route size={16} />}
                </span>
            </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 animate-in fade-in duration-500">
          {displayedFeatures.map((feature, index) => (
            <div 
              key={index}
              className="p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] bg-white border border-slate-100 hover:border-brand hover:shadow-xl hover:shadow-brand/10 transition-all duration-300 group animate-in zoom-in-50 fill-mode-both flex flex-col hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#F3F3F3] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand transition-colors duration-300 shadow-sm">
                {React.cloneElement(feature.icon as React.ReactElement, {
                    className: "w-7 h-7 text-slate-900 transition-transform duration-300 group-hover:scale-110"
                })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium text-sm lg:text-base flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;