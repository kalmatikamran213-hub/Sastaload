import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { NavigationProps } from '../types';

const Footer: React.FC<NavigationProps> = ({ onNavigate, currentPage, onOpenWaitlist }) => {
  return (
    <footer className="bg-white pt-8 lg:pt-20 pb-8 border-t border-slate-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8 lg:gap-12 mb-8 lg:mb-16">
          
          {/* Brand Section - Full width on mobile */}
          <div className="col-span-2 space-y-4 lg:space-y-6">
            <span className="text-xl lg:text-2xl font-extrabold tracking-tighter text-slate-900 cursor-pointer" onClick={() => onNavigate('home')}>
              Sasta<span className="text-brand">Load</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block ml-0.5"></span>
            </span>
            <p className="text-slate-500 text-xs lg:text-sm leading-relaxed max-w-sm font-medium">
              Pakistan's smartest logistics platform. We connect shippers directly with carriers, eliminating middlemen and inefficiency.
            </p>
            <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/Sastaload" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-slate-100 rounded-full hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-slate-500"
                  aria-label="Visit SastaLoad Facebook Page"
                >
                    <Facebook size={18} className="fill-current" />
                </a>
                <a 
                  href="https://www.instagram.com/sastaload?igsh=MWRwZnRvaHllZHJ0eQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-slate-100 rounded-full hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-slate-500"
                  aria-label="Visit SastaLoad Instagram Page"
                >
                    <Instagram size={18} />
                </a>
            </div>
          </div>

          {/* Links Sections - Side by side on mobile */}
          <div className="col-span-1">
            <h4 className="font-bold mb-3 lg:mb-6 text-slate-900 text-sm lg:text-base">Company</h4>
            <nav>
              <ul className="space-y-2 lg:space-y-4 text-xs lg:text-sm text-slate-500 font-medium">
                <li><button onClick={() => onNavigate('about')} className="hover:text-brand-dark transition-colors text-left w-full">About us</button></li>
                <li><button onClick={() => document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-dark transition-colors text-left w-full">Careers</button></li>
                <li><a href="mailto:press@sastaload.com" className="hover:text-brand-dark transition-colors block">Press</a></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-brand-dark transition-colors text-left w-full">Contact</button></li>
              </ul>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-3 lg:mb-6 text-slate-900 text-sm lg:text-base">Product</h4>
            <nav>
              <ul className="space-y-2 lg:space-y-4 text-xs lg:text-sm text-slate-500 font-medium">
                <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('business')?.scrollIntoView(), 100); }} className="hover:text-brand-dark transition-colors text-left w-full">For Shippers</button></li>
                <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('drivers')?.scrollIntoView(), 100); }} className="hover:text-brand-dark transition-colors text-left w-full">For Drivers</button></li>
                <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('calculator')?.scrollIntoView(), 100); }} className="hover:text-brand-dark transition-colors text-left w-full">Rate Calculator</button></li>
              </ul>
            </nav>
          </div>

          {/* App Buttons - Full width on mobile, arranged horizontally */}
          <div className="col-span-2 md:col-span-1">
             <h4 className="font-bold mb-3 lg:mb-6 text-slate-900 text-sm lg:text-base">Get the App</h4>
             <div className="flex flex-row md:flex-col gap-3">
                <button 
                  onClick={onOpenWaitlist} 
                  aria-label="Download on App Store"
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-3 py-2 lg:px-4 lg:py-2.5 text-left flex items-center gap-2 lg:gap-3 transition-colors shadow-lg shadow-slate-900/10 flex-1 justify-center md:justify-start"
                >
                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99 1.01-3.15-1.09.05-2.4 1.12-3.17 2.05-.68.81-1.27 2.19-1.08 3.21 1.19.09 2.41-.6 3.24-2.11"/></svg>
                    <div>
                        <div className="text-[9px] uppercase text-slate-400 font-bold">Download on</div>
                        <div className="font-bold text-xs lg:text-sm leading-none">App Store</div>
                    </div>
                </button>
                <button 
                  onClick={onOpenWaitlist} 
                  aria-label="Get it on Google Play"
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-3 py-2 lg:px-4 lg:py-2.5 text-left flex items-center gap-2 lg:gap-3 transition-colors shadow-lg shadow-slate-900/10 flex-1 justify-center md:justify-start"
                >
                     <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.15L13.69,12L3.84,21.85C3.34,21.6,3,21.09,3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08,20.75,11.5,20.75,12C20.75,12.5,20.53,12.92,20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                    <div>
                        <div className="text-[9px] uppercase text-slate-400 font-bold">Get it on</div>
                        <div className="font-bold text-xs lg:text-sm leading-none">Google Play</div>
                    </div>
                </button>
             </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] lg:text-xs text-slate-400 font-medium gap-4">
          <p className="text-center md:text-left">&copy; 2024 SastaLoad Technologies Ltd. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-900 transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-900 transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('trust')} className="hover:text-slate-900 transition-colors">Trust & Safety</button>
            <button onClick={() => onNavigate('admin')} className="text-slate-400 hover:text-brand-dark transition-colors font-bold">Admin</button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;