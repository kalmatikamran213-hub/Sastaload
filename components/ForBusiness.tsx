import React, { useState } from 'react';
import { FileText, PieChart, Globe, ShieldCheck, ArrowRight, X, Loader2, CheckCircle, Building2, Phone, Mail, MapPin, Briefcase, ChevronRight, ChevronLeft, BarChart3, Fingerprint, Package, ThermometerSnowflake, AlertTriangle, Layers, Droplet } from 'lucide-react';
import { Page } from '../types';
import { saveSubmission, STORAGE_KEYS } from '../services/storageService';

interface ForBusinessProps {
    onNavigate: (page: Page) => void;
}

const ForBusiness: React.FC<ForBusinessProps> = ({ onNavigate }) => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        ntn: '',
        email: '',
        phone: '',
        address: '',
        industry: '',
        volume: '1-10 Loads',
        cargoType: 'General',
        requirements: [] as string[],
        agreed: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData({ ...formData, [name]: val });
    };

    const toggleRequirement = (req: string) => {
        const current = formData.requirements;
        if (current.includes(req)) {
            setFormData({ ...formData, requirements: current.filter(r => r !== req) });
        } else {
            setFormData({ ...formData, requirements: [...current, req] });
        }
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed) return;
        
        setIsSubmitting(true);
        saveSubmission(STORAGE_KEYS.BUSINESS, formData);

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

    const industries = [
        { label: "Textiles & Apparel", value: "textile" },
        { label: "FMCG / Consumer Goods", value: "fmcg" },
        { label: "Pharmaceuticals", value: "pharma" },
        { label: "Agriculture & Livestock", value: "agri" },
        { label: "Electronics & Appliances", value: "electronics" },
        { label: "Construction & Hardware", value: "construction" },
        { label: "Chemicals & Fertilizers", value: "chemicals" },
        { label: "Automotive & Spare Parts", value: "auto" },
        { label: "E-commerce & Retail", value: "ecommerce" },
        { label: "Paper & Packaging", value: "packaging" }
    ];

    const cargoTypes = [
        { label: "General", icon: <Package size={16} /> },
        { label: "Cold Chain", icon: <ThermometerSnowflake size={16} /> },
        { label: "Fragile", icon: <Layers size={16} /> },
        { label: "Heavy Mach.", icon: <ShieldCheck size={16} /> },
        { label: "HazMat", icon: <AlertTriangle size={16} /> },
        { label: "Bulk Raw", icon: <BarChart3 size={16} /> },
        { label: "Furniture", icon: <Briefcase size={16} /> },
        { label: "Liquid Bulk", icon: <Droplet size={16} /> }
    ];

    return (
        <section id="business" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden reveal-on-scroll">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
                            <button onClick={() => setIsRegisterOpen(true)} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2">
                                Request Access <ArrowRight size={20} />
                            </button>
                            <button onClick={() => onNavigate('contact')} className="px-8 py-4 rounded-2xl font-bold text-lg text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center justify-center gap-2">
                                <Phone size={20} /> Contact Sales
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        <div className="space-y-5">
                            <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                    <FileText size={28} className="text-blue-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">GST Compliant</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">Automated tax invoices and digital documentation for 100% audit readiness.</p>
                            </div>
                            <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                                    <PieChart size={28} className="text-purple-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">Spend Analytics</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">Visualize freight spend, carrier performance, and lane efficiency in real-time.</p>
                            </div>
                        </div>
                        <div className="space-y-5 sm:mt-12">
                             <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-6">
                                    <Globe size={28} className="text-brand-dark" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">Control Tower</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">Centralized dashboard to manage multiple branches, warehouses, and shipments.</p>
                            </div>
                             <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                                    <ShieldCheck size={28} className="text-orange-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">Verified Partners</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">Access a pre-vetted network of 10,000+ reliable carriers and fleet owners.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Polish multi-step Modal */}
            {isRegisterOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/80 transition-opacity" onClick={closeModal}></div>
                    <div className="bg-white rounded-[32px] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in duration-200">
                        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-slate-900">Partner with SastaLoad</h3>
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
                        
                        <div className="p-8 overflow-y-auto scrollbar-hide">
                            {!isSuccess ? (
                                <div className="space-y-6 text-left">
                                    {step === 1 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Company Legal Name</label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input name="companyName" value={formData.companyName} onChange={handleInputChange} type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none transition-all" placeholder="e.g. Indus Textiles Ltd." />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Business NTN Number</label>
                                                <div className="relative">
                                                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input name="ntn" value={formData.ntn} onChange={handleInputChange} type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none transition-all" placeholder="1234567-8" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Industry Category</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <select name="industry" value={formData.industry} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                                                        <option value="">Select Industry</option>
                                                        {industries.map(ind => (
                                                            <option key={ind.value} value={ind.value}>{ind.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <button onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                                                Next: Logistics Needs <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Primary Cargo Type</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {cargoTypes.map((c) => (
                                                        <button key={c.label} type="button" onClick={() => setFormData({...formData, cargoType: c.label})} className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${formData.cargoType === c.label ? 'bg-brand border-brand text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-brand'}`}>
                                                            {c.icon} {c.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Monthly Shipment Volume</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {['1-10 Loads', '11-50 Loads', '51-200 Loads', '200+ Loads'].map((v) => (
                                                        <button key={v} type="button" onClick={() => setFormData({...formData, volume: v})} className={`p-4 rounded-xl border text-sm font-bold transition-all flex items-center gap-2 ${formData.volume === v ? 'bg-brand border-brand text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-brand'}`}>
                                                            <BarChart3 size={16} /> {v}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Service Requirements</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Transit Insurance', 'Tailgate Truck', 'Labor Required', 'Express Deliv.', 'Multi-drop', 'POD Return'].map(r => (
                                                        <button 
                                                            key={r} 
                                                            type="button" 
                                                            onClick={() => toggleRequirement(r)}
                                                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${formData.requirements.includes(r) ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'}`}
                                                        >
                                                            {r}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={handleBack} className="flex-1 bg-slate-100 font-bold py-4 rounded-xl flex items-center justify-center gap-2"><ChevronLeft size={18} /> Back</button>
                                                <button onClick={handleNext} className="flex-[2] bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">Contact Details <ChevronRight size={18} /></button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Work Phone</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                        <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none" placeholder="0300..." />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Work Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                        <input name="email" value={formData.email} onChange={handleInputChange} type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none" placeholder="name@company.com" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Main Logistics Hub</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input name="address" value={formData.address} onChange={handleInputChange} type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:bg-white outline-none" placeholder="City or Warehouse Location" />
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} className="mt-1 w-4 h-4 rounded text-brand focus:ring-brand cursor-pointer" id="agree-biz" />
                                                <label htmlFor="agree-biz" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                                                    I verify that I am an authorized representative of {formData.companyName || 'this company'} and agree to SastaLoad's <button type="button" onClick={() => onNavigate('terms')} className="text-slate-900 font-bold underline">Terms</button>.
                                                </label>
                                            </div>
                                            <div className="flex gap-3">
                                                <button type="button" onClick={handleBack} className="flex-1 bg-slate-100 font-bold py-4 rounded-xl flex items-center justify-center gap-2"><ChevronLeft size={18} /> Back</button>
                                                <button type="submit" disabled={isSubmitting || !formData.agreed} className="flex-[2] bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                                                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Request Access"}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 animate-in zoom-in duration-300">
                                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                        <CheckCircle size={48} className="text-green-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-2">Request Received!</h3>
                                    <p className="text-slate-500 mb-8 font-medium max-w-xs mx-auto">
                                        Our Enterprise Logistics team will contact you within 24 hours to set up your SastaLoad Control Tower.
                                    </p>
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

export default ForBusiness;