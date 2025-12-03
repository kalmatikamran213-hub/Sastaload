import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, CheckCircle, User, Phone, Truck, Package } from 'lucide-react';
import { AuthProps } from '../types';
import { saveSubmission, STORAGE_KEYS } from '../services/storageService';

const Signup: React.FC<AuthProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<'shipper' | 'driver'>('shipper');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Save to local storage (excluding password for partial security simulation, though it's local)
    saveSubmission(STORAGE_KEYS.USERS, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: role
    });

    // Simulate API login
    setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => onNavigate('home'), 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex pt-20 lg:pt-0">
      {/* Right Side - Visual (Swapped for variety) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 relative overflow-hidden items-center justify-center p-12 lg:order-2">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-lg text-center">
            <div className="w-24 h-24 bg-brand rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand/30">
                <Truck size={48} className="text-slate-900" />
            </div>
            
           <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
             Join 15,000+ businesses moving goods faster.
           </h2>
           
           <div className="grid grid-cols-2 gap-4 text-left mt-10">
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                   <h4 className="font-bold text-slate-900 text-lg mb-1">Zero Fees</h4>
                   <p className="text-sm text-slate-500">No hidden agent commissions.</p>
               </div>
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                   <h4 className="font-bold text-slate-900 text-lg mb-1">Real-time</h4>
                   <p className="text-sm text-slate-500">Live GPS tracking 24/7.</p>
               </div>
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                   <h4 className="font-bold text-slate-900 text-lg mb-1">Direct</h4>
                   <p className="text-sm text-slate-500">Chat directly with drivers.</p>
               </div>
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                   <h4 className="font-bold text-slate-900 text-lg mb-1">Insured</h4>
                   <p className="text-sm text-slate-500">Goods in transit coverage.</p>
               </div>
           </div>
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white lg:order-1">
        <div className="w-full max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Create your account</h1>
            <p className="text-slate-500 font-medium">
              Already have an account? <button onClick={() => onNavigate('login')} className="text-brand-dark font-bold hover:underline">Log in</button>
            </p>
          </div>

          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl">
              <button 
                type="button"
                onClick={() => setRole('shipper')}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                    role === 'shipper' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                  <Package size={18} /> I am a Shipper
              </button>
              <button 
                type="button"
                onClick={() => setRole('driver')}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                    role === 'driver' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                  <Truck size={18} /> I am a Driver
              </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                    placeholder="Ali Khan"
                  />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase mb-2">Email</label>
                    <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                        placeholder="Email"
                    />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase mb-2">Phone</label>
                    <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                        placeholder="0300..."
                    />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                    placeholder="Create a password"
                  />
                </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isSuccess}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg ${
                isSuccess 
                ? 'bg-green-500 text-white shadow-green-500/20' 
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isSuccess ? (
                <>Account Created <CheckCircle size={20} /></>
              ) : (
                <>Create Account <ArrowRight size={20} /></>
              )}
            </button>

            <p className="text-center text-xs text-slate-500 font-medium px-4">
                By creating an account, you agree to our <button onClick={() => onNavigate('terms')} className="text-slate-900 hover:underline">Terms of Service</button> and <button onClick={() => onNavigate('privacy')} className="text-slate-900 hover:underline">Privacy Policy</button>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;