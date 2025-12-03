import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SharedProps } from '../types';

const CallToAction: React.FC<SharedProps> = ({ onOpenWaitlist }) => {
    return (
        <section className="py-16 lg:py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto bg-slate-900 rounded-[32px] lg:rounded-[48px] p-8 lg:p-20 text-center lg:text-left relative overflow-hidden">
                {/* Background patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(#B3F000_1px,transparent_1px)] [background-size:20px_20px]"></div>
                
                <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6 lg:space-y-8">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Ready to move your business forward?
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-xl">
                            Join 10,000+ shippers who save time and money with SastaLoad. Sign up today and get your first shipment commission-free.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                        <button 
                            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-brand text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20 flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            Get Started
                            <ArrowRight size={20} />
                        </button>
                        <button 
                            onClick={onOpenWaitlist}
                            className="bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors w-full sm:w-auto"
                        >
                            Download App
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
