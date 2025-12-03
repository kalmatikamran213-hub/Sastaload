import React from 'react';
import { NavigationProps } from '../types';

const Footer: React.FC<NavigationProps> = ({ onNavigate, currentPage, onOpenWaitlist }) => {
  return (
    <footer className="bg-white pt-12 lg:pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="md:col-span-2 space-y-6">
            <span className="text-2xl font-extrabold tracking-tighter text-slate-900 cursor-pointer" onClick={() => onNavigate('home')}>
              Sasta<span className="text-brand">Load</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block ml-0.5"></span>
            </span>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
              Pakistan's smartest logistics platform. We connect shippers directly with carriers, eliminating middlemen and inefficiency.
            </p>
            <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"></div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 lg:mb-6 text-slate-900">Company</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm text-slate-500 font-medium">
              <li><button onClick={() => onNavigate('about')} className="hover:text-brand-dark transition-colors text-left">About us</button></li>
              <li><button onClick={() => document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-dark transition-colors text-left">Careers</button></li>
              <li><a href="mailto:press@sastaload.com" className="hover:text-brand-dark transition-colors">Press</a></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-brand-dark transition-colors text-left">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 lg:mb-6 text-slate-900">Product</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm text-slate-500 font-medium">
              <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('business')?.scrollIntoView(), 100); }} className="hover:text-brand-dark transition-colors text-left">For Shippers</button></li>
              <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('drivers')?.scrollIntoView(), 100); }} className="hover:text-brand-dark transition-colors text-left">For Drivers</button></li>
              <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('calculator')?.scrollIntoView(), 100); }} className="hover:text-brand-dark transition-colors text-left">Rate Calculator</button></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold mb-4 lg:mb-6 text-slate-900">Get the App</h4>
             <div className="flex flex-col gap-3">
                <button onClick={onOpenWaitlist} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 py-2.5 text-left flex items-center gap-3 transition-colors shadow-lg shadow-slate-900/10 w-full sm:w-auto">
                    <div className="w-6 h-6 bg-slate-700 rounded-full flex-shrink-0"></div>
                    <div>
                        <div className="text-[10px] uppercase text-slate-400 font-bold">Download on the</div>
                        <div className="font-bold text-sm leading-none">App Store</div>
                    </div>
                </button>
                <button onClick={onOpenWaitlist} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 py-2.5 text-left flex items-center gap-3 transition-colors shadow-lg shadow-slate-900/10 w-full sm:w-auto">
                    <div className="w-6 h-6 bg-slate-700 rounded-full flex-shrink-0"></div>
                    <div>
                        <div className="text-[10px] uppercase text-slate-400 font-bold">Get it on</div>
                        <div className="font-bold text-sm leading-none">Google Play</div>
                    </div>
                </button>
             </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium gap-4">
          <p className="text-center md:text-left">&copy; 2024 SastaLoad Technologies Ltd. All rights reserved.</p>
          <div className="flex gap-6 md:gap-8">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-900 transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-900 transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('trust')} className="hover:text-slate-900 transition-colors">Trust & Safety</button>
            <button onClick={() => onNavigate('admin')} className="text-slate-400 hover:text-brand-dark transition-colors font-bold">Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;