import React, { useState, useEffect } from 'react';
import { Scale, FileText, Download, ChevronRight, ArrowRight } from 'lucide-react';

const Terms: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'accounts', title: '2. User Accounts' },
    { id: 'obligations', title: '3. Rights & Obligations' },
    { id: 'payments', title: '4. Payments & Fees' },
    { id: 'liability', title: '5. Liability & Insurance' },
    { id: 'termination', title: '6. Termination' },
    { id: 'changes', title: '7. Changes to Terms' },
    { id: 'contact', title: '8. Contact Information' },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Header height + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 bg-white">
        {/* Header */}
        <section className="bg-slate-900 pt-32 pb-16 lg:pt-48 lg:pb-24 text-center px-4 relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
             
             <div className="max-w-4xl mx-auto relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-6">
                    <Scale size={16} className="text-brand" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Legal Center</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">Terms of Service</h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
                    Effective Date: October 1st, 2024
                </p>
             </div>
        </section>

        {/* Content Layout */}
        <section className="py-16 lg:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Sidebar Navigation (Desktop) */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-28 space-y-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 pl-4">Table of Contents</p>
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => handleScrollTo(section.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                                            activeSection === section.id 
                                            ? 'bg-white text-brand-dark shadow-md shadow-slate-200/50 border border-slate-100' 
                                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                    >
                                        {section.title}
                                        {activeSection === section.id && <ChevronRight size={16} className="text-brand" />}
                                    </button>
                                ))}
                            </nav>
                            
                            <div className="pt-8 pl-4">
                                <button className="flex items-center gap-2 text-slate-900 font-bold hover:text-brand-dark transition-colors text-sm">
                                    <Download size={16} />
                                    Download PDF Version
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-sm border border-slate-100">
                            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
                                
                                <div id="intro" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>1. Introduction</h2>
                                    <p>
                                        Welcome to SastaLoad ("Company", "we", "our", "us"). These Terms and Conditions ("Terms") govern your access to and use of our website, mobile application, and logistics facilitation services (collectively, the "Service").
                                    </p>
                                    <p>
                                        By downloading, accessing, or using SastaLoad, you verify that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Service.
                                    </p>
                                </div>

                                <div id="accounts" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>2. User Accounts</h2>
                                    <p>To access certain features of the Platform, you must register for an account. You agree to:</p>
                                    <ul>
                                        <li>Provide accurate, current, and complete information during the registration process.</li>
                                        <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                                        <li>Notify us immediately if you discover or suspect any security breaches related to the Service.</li>
                                    </ul>
                                </div>

                                <div id="obligations" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>3. Rights & Obligations</h2>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-6 not-prose">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-brand"></span>
                                            For Shippers (Business/Individuals)
                                        </h4>
                                        <p className="text-sm text-slate-600 mb-4">
                                            You warrant that you own or have the right to ship the goods. You agree not to ship hazardous, illegal, or prohibited items as defined by Pakistani law. You are solely responsible for proper packaging.
                                        </p>
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                                            For Carriers (Drivers/Fleet Owners)
                                        </h4>
                                        <p className="text-sm text-slate-600">
                                            You must possess a valid commercial driving license, vehicle registration, and route permits. You agree to transport cargo safely and adhere to the agreed timeline.
                                        </p>
                                    </div>
                                </div>

                                <div id="payments" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>4. Payments & Fees</h2>
                                    <p>
                                        SastaLoad operates as a marketplace. Rates are determined via bidding or fixed pricing algorithms.
                                    </p>
                                    <ul>
                                        <li><strong>Shippers:</strong> Payment must be secured via the App (Wallet/Bank Transfer) before dispatch or upon terms agreed with the Enterprise account manager.</li>
                                        <li><strong>Drivers:</strong> Payouts are processed to your linked bank/mobile wallet account within 24 hours of POD (Proof of Delivery) verification.</li>
                                        <li><strong>Service Fees:</strong> SastaLoad may deduct a platform fee from the final transaction amount, which will be clearly displayed before booking.</li>
                                    </ul>
                                </div>

                                <div id="liability" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>5. Liability & Insurance</h2>
                                    <p>
                                        SastaLoad is a technology facilitator, not a transport carrier. We do not own the vehicles and are not responsible for the conduct of drivers.
                                    </p>
                                    <div className="flex items-start gap-4 p-5 bg-yellow-50 text-yellow-900 rounded-2xl border border-yellow-100 not-prose">
                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                            <FileText size={20} className="text-yellow-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wide mb-1">Cargo Insurance Disclaimer</h4>
                                            <p className="text-sm leading-relaxed text-yellow-800">
                                                Unless you purchase "SastaLoad Secure" insurance for a specific shipment, the Company is not liable for loss, theft, or damage to goods during transit. Our liability is strictly limited to the service fees paid to us.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div id="termination" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>6. Termination</h2>
                                    <p>
                                        We reserve the right to suspend or terminate your account immediately, without prior notice, if you breach these Terms (e.g., fraudulent activity, shipping illegal goods, or harassing other users).
                                    </p>
                                </div>

                                <div id="changes" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>7. Changes to Terms</h2>
                                    <p>
                                        We may update these Terms from time to time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                                    </p>
                                </div>

                                <div id="contact" className="scroll-mt-32">
                                    <h2>8. Contact Information</h2>
                                    <p>
                                        If you have any questions about these Terms, please contact our legal team.
                                    </p>
                                    <div className="not-prose mt-6 flex flex-col sm:flex-row gap-4">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Email Us</p>
                                            <a href="mailto:legal@sastaload.com" className="text-slate-900 font-bold hover:text-brand-dark">legal@sastaload.com</a>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Mailing Address</p>
                                            <p className="text-slate-900 font-bold text-sm">Office #212, 2nd Floor, Business Avenue, Karachi, PK</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Terms;