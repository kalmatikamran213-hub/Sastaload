import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Kamran Khan",
    role: "CEO, KK Textiles Lahore",
    content: "Excellent service for goods transport. I booked a Shehzore from Lahore to Multan and got a very reasonable rate compared to the stand.",
  },
  {
    name: "Bilal Ahmed",
    role: "Logistics Mgr, FoodPanda",
    content: "SastaLoad style pricing is real. No agent fees. Direct deal with driver saved me 5000 rupees on one trip. Highly recommended for bulk.",
  },
  {
    name: "Zainab Abbas",
    role: "Operations Lead, Daraz PK",
    content: "Handling peak season volume was a nightmare until we integrated SastaLoad's API. The automated dispatch has cut our latency by 40%.",
  },
  {
    name: "Hassan Raza",
    role: "Distributor, Islamabad",
    content: "The app is very easy to use. I posted my load and got calls from drivers within 5 minutes. The tracking feature gives me peace of mind.",
  },
  {
    name: "Rafay Siddiqui",
    role: "Owner, Multan Mango Farms",
    content: "Sending perishable goods to Karachi requires speed. SastaLoad drivers are punctual, and the tracking helps me inform my buyers exactly when to expect the truck.",
  },
  {
    name: "Ayesha Malik",
    role: "Owner, AM Interiors",
    content: "Moved my entire studio furniture using SastaLoad. The driver was professional and the price was transparent. No haggling needed.",
  },
  {
    name: "Omer Sheikh",
    role: "Contractor, Bahria Town",
    content: "We move heavy machinery and raw materials daily. The flatbed trailers available here are well-maintained and the drivers are experienced with heavy loads.",
  },
  {
    name: "Fahad Mustafa",
    role: "Supply Chain Head, RetailCo",
    content: "Finally a platform that understands B2B needs. The GST invoicing and dashboard analytics have streamlined our monthly reporting.",
  },
  {
    name: "Sana Mir",
    role: "Boutique Owner, Islamabad",
    content: "Small business friendly! I don't need a full truck, just partial load space. This platform helped me find shared space for my fabric rolls at a fraction of the cost.",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Trusted by Industry Leaders</h2>
        <p className="text-slate-500 mt-4 text-base lg:text-lg">See what thousands of Pakistani businesses are saying.</p>
      </div>

      <div className="relative w-full">
         <div className="absolute left-0 top-0 bottom-0 w-12 md:w-48 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-12 md:w-48 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none"></div>
         
         <div className="flex animate-scroll hover:[animation-play-state:paused] w-max gap-6 lg:gap-8 px-4">
             {[...testimonials, ...testimonials].map((t, idx) => (
                <div key={idx} className="w-[300px] md:w-[400px] bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex-shrink-0 group cursor-pointer whitespace-normal">
                    <div className="flex gap-1 mb-6">
                        {[1,2,3,4,5].map(star => (
                            <Star key={star} size={14} className="text-orange-400 fill-orange-400" />
                        ))}
                    </div>
                    
                    <div className="mb-8 relative">
                         <Quote className="absolute -top-2 -left-2 text-slate-100 w-8 h-8 fill-slate-100 -z-10" />
                         <p className="text-slate-700 font-medium text-base lg:text-lg leading-relaxed relative z-10 line-clamp-3">"{t.content}"</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shrink-0 ${idx % 2 === 0 ? 'bg-slate-900' : 'bg-brand text-slate-900'}`}>
                            {t.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm lg:text-base">{t.name}</p>
                            <p className="text-xs lg:text-sm text-slate-500 font-bold">{t.role}</p>
                        </div>
                    </div>
                </div>
             ))}
         </div>
      </div>
    </section>
  );
};

export default Testimonials;