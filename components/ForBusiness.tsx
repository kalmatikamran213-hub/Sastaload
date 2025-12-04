import React, { useState } from 'react';
import { FileText, PieChart, Globe, ShieldCheck, ArrowRight, X, Loader2, CheckCircle, Building2, Phone } from 'lucide-react';
import { Page } from '../types';
import { saveSubmission, STORAGE_KEYS } from '../services/storageService';

interface ForBusinessProps {
    onNavigate: (page: Page) => void;
}

const brands = [
  { name: "Unilever", color: "text-blue-600" },
  { name: "Nestlé", color: "text-amber-700" },
  { name: "Dawlance", color: "text-red-600" },
  { name: "Haier", color: "text-blue-500" },
  { name: "PepsiCo", color: "text-blue-700" },
  { name: "Daraz", color: "text-orange-500" },
  { name: "Foodpanda", color: "text-pink-600" },
  { name: "Engro", color: "text-green-600" },
  { name: "Shan Foods", color: "text-red-700" },
  { name: "Packages", color: "text-red-600" },
  { name: "Coca-Cola", color: "text-red-600" },
  { name: "Servis", color: "text-blue-800" }
];

const ForBusiness: React.FC<ForBusinessProps> = ({ onNavigate }) => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Save to storage
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        saveSubmission(STORAGE_KEYS.BUSINESS, data);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <section id="business" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden reveal-on-scroll">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Column: Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-1.5 rounded-full mb-8">
                             <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                            </span>
                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Enterprise Solutions</span>
                        </div>
                        
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                            Logistics that <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600">scales with you.</span>
                        </h2>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                            Stop managing spreadsheets. Get a dedicated control tower for your supply chain with automated GST invoicing, real-time analytics, and 100% verified fleets.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={() => setIsRegisterOpen(true)}
                                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                            >
                                Request Access
                                <ArrowRight size={20} />
                            </button>
                            <button 
                                onClick={() => onNavigate('contact')}
                                className="px-8 py-4 rounded-2xl font-bold text-lg text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Phone size={20} />
                                Contact Sales
                            </button>
                        </div>

                        {/* Stats Row */}
                        <div className="mt-12 pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-6">
                            <div>
                                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">30%</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Cost Savings</p>
                            </div>
                             <div>
                                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">100%</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Verified Fleet</p>
                            </div>
                             <div>
                                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">24/7</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Staggered Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        <div className="space-y-5">
                            {/* Card 1 */}
                            <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FileText size={28} className="text-blue-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">GST Compliant</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Automated tax invoices and digital documentation for 100% audit readiness.
                                </p>
                            </div>

                            {/* Card 2 */}
                             <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 group">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <PieChart size={28} className="text-purple-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">Spend Analytics</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Visualize freight spend, carrier performance, and lane efficiency in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5 sm:mt-12">
                            {/* Card 3 */}
                             <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-brand/20 transition-all duration-300 hover:-translate-y-2 group">
                                <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Globe size={28} className="text-brand-dark" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">Control Tower</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Centralized dashboard to manage multiple branches, warehouses, and shipments.
                                </p>
                            </div>

                             {/* Card 4 */}
                             <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2 group">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <ShieldCheck size={28} className="text-orange-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">Verified Partners</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Access a pre-vetted network of 10,000+ reliable carriers and fleet owners.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trusted By Strip - Improved Design */}
                <div className="mt-20 lg:mt-32 relative pt-12">
                    <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Trusted by Pakistan's Leading Supply Chains</p>
                    
                    <div className="relative w-full overflow-hidden">
                        <div className="flex animate-scroll whitespace-nowrap items-center w-max hover:[animation-play-state:paused] py-4">
                            {[...brands, ...brands].map((brand, i) => (
                                <div key={i} className="flex items-center gap-3 px-8 lg:px-12 group/item cursor-default opacity-60 hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-200 group-hover/item:bg-brand flex items-center justify-center text-slate-500 group-hover/item:text-slate-900 font-black text-lg lg:text-xl transition-all duration-300 shadow-sm">
                                        {brand.name.charAt(0)}
                                    </div>
                                    <span className={`text-2xl lg:text-3xl font-black text-slate-300 group-hover/item:text-slate-900 transition-colors duration-300 tracking-tighter uppercase select-none ${brand.color ? `group-hover/item:${brand.color}` : ''}`}>
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Registration Modal */}
            {isRegisterOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsRegisterOpen(false)}></div>
                    <div className="bg-white rounded-[32px] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Book a Demo</h3>
                                <p className="text-sm text-slate-500">See SastaLoad Enterprise in action</p>
                            </div>
                            <button onClick={() => setIsRegisterOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto">
                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Company Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input name="companyName" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="Acme Logistics Ltd." />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Work Email</label>
                                            <input name="email" type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="name@company.com" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Phone</label>
                                            <input name="phone" type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="0336 3391378" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Company Address</label>
                                        <input name="address" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="Headquarters Location" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Website URL</label>
                                        <input name="website" type="url" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="https://..." />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Monthly Volume</label>
                                        <select name="volume" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all cursor-pointer">
                                            <option>1-10 Shipments/mo</option>
                                            <option>11-50 Shipments/mo</option>
                                            <option>50-200 Shipments/mo</option>
                                            <option>200+ Shipments/mo</option>
                                        </select>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 mt-2"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Schedule Demo"}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} className="text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Request Received!</h3>
                                    <p className="text-slate-500 mb-8 font-medium">
                                        Our enterprise team will contact you within 24 hours.
                                    </p>
                                    <button 
                                        onClick={() => { setIsRegisterOpen(false); setIsSuccess(false); }}
                                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ForBusiness;