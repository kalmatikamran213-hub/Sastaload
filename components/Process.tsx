import React, { useState } from 'react';
import { Smartphone, Truck, Map, UserCheck, Search, CreditCard, ArrowRight } from 'lucide-react';

type UserType = 'shippers' | 'drivers';

const processes = {
    shippers: [
        {
            icon: <Smartphone className="w-6 h-6 text-slate-900" />,
            title: "Post your Load",
            desc: "Enter origin, destination, and cargo type. Our AI estimates a fair market price instantly."
        },
        {
            icon: <Truck className="w-6 h-6 text-slate-900" />,
            title: "Match with Fleet",
            desc: "Verified drivers accept your offer or place bids. You select the best driver based on rating and price."
        },
        {
            icon: <Map className="w-6 h-6 text-slate-900" />,
            title: "Track & Pay",
            desc: "Monitor your shipment with real-time GPS. Payment is released only after digital proof of delivery."
        }
    ],
    drivers: [
        {
            icon: <UserCheck className="w-6 h-6 text-slate-900" />,
            title: "Get Verified",
            desc: "Download the app and upload your CNIC & vehicle docs. We approve your account within 24 hours."
        },
        {
            icon: <Search className="w-6 h-6 text-slate-900" />,
            title: "Find Loads",
            desc: "Browse available shipments on your preferred routes. Bid your rate or accept instant-book loads."
        },
        {
            icon: <CreditCard className="w-6 h-6 text-slate-900" />,
            title: "Earn Fast",
            desc: "Complete the trip, upload the POD via app, and get paid directly to your wallet or bank in 24h."
        }
    ]
};

const Process: React.FC = () => {
    const [activeType, setActiveType] = useState<UserType>('shippers');

    const handleAction = () => {
        if (activeType === 'shippers') {
            document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            document.getElementById('drivers')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="process" className="py-16 lg:py-24 bg-white relative overflow-hidden reveal-on-scroll">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 bg-gradient-to-r from-transparent via-slate-50 to-transparent -z-10 opacity-60 transform -skew-y-3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">Simple, Transparent Logistics</h2>
                    
                    {/* Toggle Switch */}
                    <div className="inline-flex bg-slate-100 p-1.5 rounded-full relative">
                        <div 
                            className={`absolute top-1.5 bottom-1.5 w-[50%] bg-white rounded-full shadow-sm transition-all duration-300 ease-out ${activeType === 'shippers' ? 'left-1.5' : 'left-[calc(50%-6px)] translate-x-1.5'}`}
                        ></div>
                        <button 
                            onClick={() => setActiveType('shippers')}
                            className={`relative z-10 px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-300 ${activeType === 'shippers' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            For Shippers
                        </button>
                        <button 
                            onClick={() => setActiveType('drivers')}
                            className={`relative z-10 px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-300 ${activeType === 'drivers' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            For Drivers
                        </button>
                    </div>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100">
                        <div className="absolute top-0 left-0 h-full bg-brand w-full origin-left scale-x-0 animate-[shimmer_2s_infinite]"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
                        {processes[activeType].map((step, idx) => (
                            <div key={idx} className="relative flex flex-col items-center text-center group">
                                {/* Step Number Badge */}
                                <div className="absolute top-0 right-[calc(50%-32px)] md:right-[calc(50%-40px)] w-8 h-8 rounded-full bg-slate-900 text-brand text-xs font-bold flex items-center justify-center border-4 border-white z-20">
                                    {idx + 1}
                                </div>

                                {/* Icon Circle */}
                                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center justify-center mb-6 lg:mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeType === 'shippers' ? 'bg-slate-50 group-hover:bg-brand' : 'bg-slate-50 group-hover:bg-slate-900 group-hover:text-white'}`}>
                                        {React.cloneElement(step.icon as React.ReactElement, {
                                            className: `w-5 h-5 lg:w-6 lg:h-6 transition-colors duration-300 ${activeType === 'drivers' && 'group-hover:text-brand'}`
                                        })}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2 lg:mb-3">{step.title}</h3>
                                <p className="text-sm lg:text-base text-slate-500 leading-relaxed font-medium max-w-xs mx-auto">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 lg:mt-16 text-center">
                    <button 
                        onClick={handleAction}
                        className="inline-flex items-center gap-2 text-slate-900 font-bold hover:gap-3 transition-all cursor-pointer"
                    >
                        {activeType === 'shippers' ? 'Start Shipping Now' : 'Join as a Driver'} 
                        <ArrowRight size={20} className="text-brand-dark" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Process;