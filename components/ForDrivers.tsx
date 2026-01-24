import React, { useState } from 'react';
import { Truck, CheckCircle, X, User, Phone, FileText, Loader2, ChevronRight, ChevronLeft, MapPin, Car, Shield, Navigation, Fuel, Boxes, Settings } from 'lucide-react';
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

const VEHICLE_CATEGORIES = [
    { label: "Suzuki Ravi / Pickup", value: "light_1", icon: <Car size={20} /> },
    { label: "Shehzore (10ft)", value: "light_2", icon: <Truck size={20} /> },
    { label: "Mazda (16ft)", value: "medium_1", icon: <Truck size={22} /> },
    { label: "6-Wheeler (17ft)", value: "medium_2", icon: <Truck size={24} /> },
    { label: "10-Wheeler", value: "heavy_1", icon: <Truck size={26} /> },
    { label: "12-Wheeler", value: "heavy_2", icon: <Truck size={28} /> },
    { label: "22-Wheeler Trailer", value: "heavy_3", icon: <Truck size={30} /> },
    { label: "Lowbed / Flatbed", value: "heavy_4", icon: <Boxes size={24} /> }
];

const BODY_TYPES = [
    'Open Body', 
    'Containerized (Fixed)', 
    'Detachable Container', 
    'Flatbed', 
    'Refrigerated (Chiller)', 
    'Curtain Sider', 
    'Tanker (Liquid)', 
    'Dumper / Tipper'
];

const ForDrivers: React.FC<ForDriversProps> = ({ onOpenWaitlist, onNavigate }) => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        cnic: '',
        address: '',
        licenseNo: '',
        experience: '3',
        vehicleType: 'Suzuki Ravi / Pickup',
        bodyType: 'Open Body',
        vehicleReg: '',
        preferredRoute: 'Intra-city',
        agreed: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData({ ...formData, [name]: val });
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed) return;
        
        setIsSubmitting(true);
        saveSubmission(STORAGE_KEYS.DRIVERS, formData);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    const closeModal = () => {
        setIsRegisterOpen(false);
        setStep(1);
        setIsSuccess(false);
    };

    return (
        <section id="drivers" className="py-16 lg:py-24 bg-white relative overflow-hidden reveal-on-scroll">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full mb-8 shadow-lg shadow-slate-900/20">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
                            </span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">For Captains & Fleet Owners</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                            Your Truck. Your Rules. <br className="hidden md:block" />
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 text-slate-900">Unlimited Earnings.</span>
                                <div className="absolute bottom-2 left-[-4px] right-[-4px] h-4 sm:h-6 bg-brand/80 -rotate-1 rounded-sm -z-0"></div>
                            </span>
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-xl">
                            Join Pakistan's fastest growing digital transport network. Stop chasing agents for loads—let the loads come to you.
                        </p>
                         <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setIsRegisterOpen(true)} className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 hover:-translate-y-1">
                                Register Online <ChevronRight size={20} />
                            </button>
                            <button onClick={onOpenWaitlist} className="bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                                Download App
                            </button>
                        </div>
                    </div>

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

            {/* Polish Driver Wizard Modal */}
            {isRegisterOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/80 transition-opacity" onClick={closeModal}></div>
                    <div className="bg-white rounded-[32px] w-full max-w-xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in duration-200">
                        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-left">
                                    <h3 className="text-xl font-black text-slate-900">Captain Onboarding</h3>
                                    <p className="text-sm text-slate-500">Step {step} of 3</p>
                                </div>
                                <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                    <X size={20} />
                                </button>
                            </div>
                            {!isSuccess && (
                                <div className="flex gap-2">
                                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-brand' : 'bg-slate-200'}`}></div>
                                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-brand' : 'bg-slate-200'}`}></div>
                                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-brand' : 'bg-slate-200'}`}></div>
                                </div>
                            )}
                        </div>

                        <div className="overflow-y-auto p-6 sm:p-8 scrollbar-hide">
                            {!isSuccess ? (
                                <div className="space-y-6 text-left">
                                    {step === 1 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Your Full Name (As per CNIC)</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none transition-all" placeholder="e.g. Asif Ali" />
                                                </div>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Active Phone Number</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                        <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none transition-all" placeholder="0336..." />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">CNIC Number</label>
                                                    <div className="relative">
                                                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                        <input name="cnic" value={formData.cnic} onChange={handleInputChange} type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none transition-all" placeholder="35202-..." />
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                                                Next: Vehicle Details <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Select Your Vehicle</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {VEHICLE_CATEGORIES.map((cat) => (
                                                        <button key={cat.value} type="button" onClick={() => setFormData({...formData, vehicleType: cat.label})} className={`flex flex-col items-center p-3 rounded-xl border text-[10px] font-black uppercase tracking-tight transition-all ${formData.vehicleType === cat.label ? 'bg-brand border-brand text-slate-900 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-brand hover:bg-white'}`}>
                                                            {cat.icon}
                                                            <span className="mt-1">{cat.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Vehicle Body Type</label>
                                                    <select name="bodyType" value={formData.bodyType} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand outline-none appearance-none cursor-pointer">
                                                        {BODY_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Registration Number</label>
                                                    <input name="vehicleReg" value={formData.vehicleReg} onChange={handleInputChange} type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand outline-none" placeholder="LEA-19-402" />
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={handleBack} className="flex-1 bg-slate-100 font-bold py-4 rounded-xl flex items-center justify-center gap-2"><ChevronLeft size={18} /> Back</button>
                                                <button onClick={handleNext} className="flex-[2] bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">Operating Details <ChevronRight size={18} /></button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">License No.</label>
                                                    <input name="licenseNo" value={formData.licenseNo} onChange={handleInputChange} type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand outline-none" placeholder="ABC-123" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Exp (Years)</label>
                                                    <input name="experience" value={formData.experience} onChange={handleInputChange} type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand outline-none" placeholder="e.g. 5" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Preferred Route Coverage</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {['Intra-city Only', 'Inter-city (Punjab)', 'Inter-city (Sindh)', 'Nationwide'].map(r => (
                                                        <button key={r} type="button" onClick={() => setFormData({...formData, preferredRoute: r})} className={`p-3 rounded-xl border text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-2 ${formData.preferredRoute === r ? 'bg-brand border-brand text-slate-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-brand'}`}>
                                                            <Navigation size={14} /> {r}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} className="mt-1 w-4 h-4 rounded text-brand focus:ring-brand cursor-pointer" id="agree-driver" />
                                                <label htmlFor="agree-driver" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                                                    I confirm my vehicle is fit for transport and agree to SastaLoad's <button type="button" onClick={() => onNavigate('terms')} className="text-slate-900 font-bold underline">Terms & Safety Policies</button>.
                                                </label>
                                            </div>
                                            <div className="flex gap-3">
                                                <button type="button" onClick={handleBack} className="flex-1 bg-slate-100 font-bold py-4 rounded-xl flex items-center justify-center gap-2"><ChevronLeft size={18} /> Back</button>
                                                <button type="submit" disabled={isSubmitting || !formData.agreed} className="flex-[2] bg-brand text-slate-900 font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand/20">
                                                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Complete Registration"}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 animate-in zoom-in duration-300">
                                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={48} className="text-green-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-2">Shabash Captain!</h3>
                                    <p className="text-slate-500 mb-8 max-w-xs mx-auto font-medium">Your registration is received. Our verification team will call you within 24 hours.</p>
                                    <button onClick={closeModal} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">Back to Home</button>
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