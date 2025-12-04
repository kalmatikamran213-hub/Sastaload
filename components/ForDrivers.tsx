import React, { useState } from 'react';
import { Truck, CheckCircle, X, User, Phone, FileText, Loader2, ShieldCheck, ChevronRight, MapPin, Info } from 'lucide-react';
import { ForDriversProps } from '../types';
import { saveSubmission, STORAGE_KEYS } from '../services/storageService';

const benefits = [
    {
        title: "Zero Empty Miles",
        desc: "Get return loads instantly. Our AI matches your destination with available shipments so you never drive empty."
    },
    {
        title: "Fast Payments",
        desc: "Get paid within 24 hours of delivery proof. Direct bank transfer or JazzCash/EasyPaisa."
    },
    {
        title: "Direct Access",
        desc: "Deal directly with company logistics managers. No brokers taking a cut from your hard-earned money."
    }
];

const ForDrivers: React.FC<ForDriversProps> = ({ onOpenWaitlist, onNavigate }) => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Extract data from form
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        // Save to storage
        saveSubmission(STORAGE_KEYS.DRIVERS, data);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <section id="drivers" className="py-16 lg:py-24 bg-white relative overflow-hidden reveal-on-scroll">
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100/50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side: Content */}
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full mb-8 shadow-lg shadow-slate-900/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
                            </span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">For Captains & Fleet Owners</span>
                        </div>
                        
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                            Your Truck. Your Rules. <br className="hidden md:block" />
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10">Unlimited Earnings.</span>
                                <div className="absolute bottom-2 left-[-4px] right-[-4px] h-4 sm:h-6 bg-brand/80 -rotate-1 rounded-sm -z-0"></div>
                            </span>
                        </h2>
                        
                        <p className="text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-xl">
                            Join Pakistan's fastest growing digital transport network. Stop chasing agents for loads—let the loads come to you.
                        </p>

                         <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => setIsRegisterOpen(true)}
                                className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 hover:-translate-y-1"
                            >
                                Register Online
                                <ChevronRight size={20} />
                            </button>
                            <button 
                                onClick={onOpenWaitlist}
                                className="bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
                            >
                                Download App
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Benefits */}
                    <div className="grid gap-6">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="bg-slate-50 p-6 lg:p-8 rounded-[32px] border border-slate-100 text-left hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex items-start gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand group-hover:border-brand transition-all duration-300 relative z-10">
                                    <CheckCircle className="w-6 h-6 text-slate-900" />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{benefit.desc}</p>
                                </div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-brand/10 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Registration Modal */}
            {isRegisterOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsRegisterOpen(false)}></div>
                    <div className="bg-white rounded-[32px] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                        
                        {/* Modal Header */}
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Partner Registration</h3>
                                <p className="text-sm text-slate-500">Join SastaLoad Network</p>
                            </div>
                            <button onClick={() => setIsRegisterOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="overflow-y-auto p-6 sm:p-8">
                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    
                                    {/* Section 1: Personal Info */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                            <User size={16} /> Personal Information
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Full Name</label>
                                                <input name="fullName" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="e.g. Muhammad Ali" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                    <input name="phone" type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="0336 3391378" />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">CNIC Number</label>
                                                <div className="relative">
                                                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                    <input name="cnic" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="35202-1234567-1" />
                                                </div>
                                            </div>
                                             <div className="sm:col-span-2">
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Home Address</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                                                    <textarea name="address" required rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all resize-none" placeholder="House No, Street, City..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Professional Details */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                            <Truck size={16} /> Professional Details
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Driving License No.</label>
                                                <input name="licenseNo" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="LHR-12345" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Years of Experience</label>
                                                <input name="experience" type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="e.g. 5" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Vehicle Type</label>
                                                <select name="vehicleType" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all cursor-pointer">
                                                    <option value="">Select Vehicle Type</option>
                                                    <option>Suzuki Ravi / Pickup (up to 1 Ton)</option>
                                                    <option>Shehzore / JAC / Hyundai (1-4 Tons)</option>
                                                    <option>Mazda (3-7 Tons)</option>
                                                    <option>6-Wheeler Rigid (10-15 Tons)</option>
                                                    <option>10-Wheeler Rigid (15-25 Tons)</option>
                                                    <option>12-Wheeler Rigid (25-30 Tons)</option>
                                                    <option>18-Wheeler Trailer (30-45 Tons)</option>
                                                    <option>22-Wheeler Trailer (45-55 Tons)</option>
                                                    <option>Low Bed Trailer (Heavy Machinery, up to 60 Tons)</option>
                                                    <option>Multi-Axle Trailer (Specialized, up to 85 Tons)</option>
                                                    <option>Container 20ft</option>
                                                    <option>Container 40ft</option>
                                                    <option>Refrigerated Truck (Reefer)</option>
                                                    <option>Oil Tanker / Bowser</option>
                                                    <option>Dumper / Tipper</option>
                                                    <option>Car Carrier</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Vehicle Reg. No.</label>
                                                <input name="vehicleReg" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all" placeholder="LEA-1234" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Verification Info (Replaced) */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                            <ShieldCheck size={16} /> Verification Process
                                        </h4>
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                                            <div className="bg-brand/20 p-2.5 rounded-full shrink-0 text-slate-900">
                                                 <Info size={20} />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-slate-900 text-sm mb-1">Document Verification Pending</h5>
                                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                                    You do not need to upload documents right now. Our onboarding team will contact you via phone within 24 hours to verify your details and collect photos of your CNIC, License, and Registration Book.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-2 pt-2">
                                        <div className="mt-1">
                                            <input type="checkbox" required className="rounded border-slate-300 text-brand focus:ring-brand" />
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            I agree to the <button type="button" onClick={() => { setIsRegisterOpen(false); onNavigate('terms'); }} className="text-brand-dark font-bold underline">Terms & Conditions</button> and confirm that all provided details are authentic.
                                        </p>
                                    </div>

                                    <div className="pt-2 sticky bottom-0 bg-white pb-2">
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full bg-brand hover:bg-brand-hover text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Application"}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} className="text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Application Submitted!</h3>
                                    <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                                        Your registration is pending approval. Please download the app to track your status.
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

export default ForDrivers;