import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NavItem, NavigationProps } from '../types';

const navItems: NavItem[] = [
  { label: 'Freight', href: '#features' },
  { label: 'City to City', href: '#calculator' },
  { label: 'Tracking', href: '#tracking' },
];

const Header: React.FC<NavigationProps> = ({ onNavigate, currentPage, onOpenWaitlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentPage !== 'home' || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 lg:py-4' : 'bg-transparent py-4 lg:py-6'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
              <div className="flex items-center space-x-2 cursor-pointer z-50 relative" onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}>
                <span className={`text-xl lg:text-2xl font-extrabold tracking-tighter ${isScrolled || currentPage !== 'home' || isMobileMenuOpen ? 'text-slate-900' : 'text-slate-900'}`}>
                  Sasta<span className="text-brand">Load</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block ml-0.5 mb-1"></span>
                </span>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-8 items-center">
                {navItems.map((item) => (
                  <a 
                    key={item.label} 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <button 
                  onClick={() => onNavigate('about')}
                  className={`text-sm font-bold transition-colors ${currentPage === 'about' ? 'text-brand-dark' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  About Us
                </button>
                 <button 
                  onClick={() => onNavigate('contact')}
                  className={`text-sm font-bold transition-colors ${currentPage === 'contact' ? 'text-brand-dark' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Contact
                </button>
              </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="bg-slate-100 p-1 rounded-full flex items-center text-xs font-bold">
                <button 
                  onClick={() => {
                    if (currentPage !== 'home') {
                        onNavigate('home');
                        setTimeout(() => document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    } else {
                        document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white text-slate-900 shadow-sm px-4 py-1.5 rounded-full hover:text-brand-dark transition-colors"
                >
                  For Business
                </button>
                <button 
                  onClick={() => {
                    if (currentPage !== 'home') {
                        onNavigate('home');
                        setTimeout(() => document.getElementById('drivers')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    } else {
                        document.getElementById('drivers')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-slate-500 hover:text-slate-900 px-4 py-1.5 rounded-full transition-colors"
                >
                  For Drivers
                </button>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <button 
              onClick={() => onNavigate('login')}
              className="text-sm font-bold text-slate-900 hover:text-brand-dark"
            >
              Login
            </button>
            <button onClick={onOpenWaitlist} className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
              Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors z-50 relative focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMobileMenuOpen ? 'max-h-[90vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className="flex flex-col p-6 space-y-6">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="flex items-center justify-between text-lg font-bold text-slate-700 hover:text-brand-dark hover:bg-slate-50 p-4 rounded-xl transition-all"
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                  <ChevronRight size={18} className="text-slate-300" />
                </a>
              ))}
              <button 
                className="flex items-center justify-between text-lg font-bold text-slate-700 hover:text-brand-dark hover:bg-slate-50 p-4 rounded-xl transition-all w-full text-left"
                onClick={() => {
                  onNavigate('about');
                  setIsMobileMenuOpen(false);
                }}
              >
                About Us
                <ChevronRight size={18} className="text-slate-300" />
              </button>
              <button 
                className="flex items-center justify-between text-lg font-bold text-slate-700 hover:text-brand-dark hover:bg-slate-50 p-4 rounded-xl transition-all w-full text-left"
                onClick={() => {
                  onNavigate('contact');
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact Us
                <ChevronRight size={18} className="text-slate-300" />
              </button>
            </nav>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                className="bg-slate-100 text-slate-900 px-4 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors text-center"
                onClick={() => {
                  onOpenWaitlist();
                  setIsMobileMenuOpen(false);
                }}
              >
                Driver App
              </button>
              <button 
                className="bg-brand text-slate-900 px-4 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-brand/20 hover:bg-brand-hover transition-colors text-center"
                onClick={() => {
                   if (currentPage !== 'home') {
                      onNavigate('home');
                      setTimeout(() => document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  } else {
                      document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                Business
              </button>
            </div>
            
            <div className="pt-2 flex justify-center space-x-6 text-sm font-medium text-slate-400">
               <button onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }} className="cursor-pointer hover:text-slate-600">Login</button>
               <span className="w-px h-5 bg-slate-200"></span>
               <span className="cursor-pointer hover:text-slate-600">Help Center</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;