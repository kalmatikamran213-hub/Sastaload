import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { AuthProps } from '../types';

const Login: React.FC<AuthProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API login
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // In a real app, this would redirect to dashboard
      setTimeout(() => onNavigate('home'), 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex pt-20 lg:pt-0">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#B3F000_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-lg">
           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Welcome Back</span>
           </div>
           <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
             Logistics management <br/> made <span className="text-brand">simple.</span>
           </h2>
           <p className="text-slate-400 text-lg leading-relaxed mb-10">
             "SastaLoad has completely transformed how we book freight. The direct access to drivers saves us 20% on every shipment."
           </p>
           <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-12 h-12 rounded-full border-2 border-brand" />
              <div>
                <p className="text-white font-bold">Ahmed Hassan</p>
                <p className="text-slate-500 text-sm">Supply Chain Mgr, textileCo</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Sign in to your account</h1>
            <p className="text-slate-500 font-medium">
              Don't have an account? <button onClick={() => onNavigate('signup')} className="text-brand-dark font-bold hover:underline">Sign up for free</button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                   <label className="block text-xs font-bold text-slate-900 uppercase">Password</label>
                   <button type="button" className="text-xs font-bold text-slate-500 hover:text-brand-dark">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
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
                <>Success <CheckCircle size={20} /></>
              ) : (
                <>Sign In <ArrowRight size={20} /></>
              )}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl py-3 text-slate-700 font-bold transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl py-3 text-slate-700 font-bold transition-colors">
                 <svg className="w-5 h-5 text-[#1877F2] fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                 Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;