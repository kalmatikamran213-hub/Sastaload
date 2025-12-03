import React, { useState, useEffect } from 'react';
import { Lock, FileText, ChevronRight, Shield } from 'lucide-react';

const Privacy: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'collection', title: '2. Information Collection' },
    { id: 'usage', title: '3. Use of Information' },
    { id: 'sharing', title: '4. Sharing & Disclosure' },
    { id: 'security', title: '5. Data Security' },
    { id: 'rights', title: '6. Your Rights' },
    { id: 'contact', title: '7. Contact Us' },
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
                    <Lock size={16} className="text-brand" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Data Protection</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">Privacy Policy</h1>
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
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-sm border border-slate-100">
                            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
                                
                                <div id="intro" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>1. Introduction</h2>
                                    <p>
                                        SastaLoad ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (the "Platform"). 
                                    </p>
                                    <p>
                                        We respect the privacy of our users (shippers and drivers) and recognize the importance of protecting the information collected about them. By using our Platform, you consent to the practices described in this policy.
                                    </p>
                                </div>

                                <div id="collection" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>2. Information Collection</h2>
                                    <p>We collect information that identifies, relates to, describes, or could reasonably be linked, directly or indirectly, with you ("Personal Data").</p>
                                    <ul>
                                        <li><strong>Personal Information:</strong> Name, email address, phone number, mailing address, CNIC number, and driving license details (for drivers).</li>
                                        <li><strong>Financial Information:</strong> Bank account details, mobile wallet numbers (JazzCash/EasyPaisa), and transaction history.</li>
                                        <li><strong>Location Data:</strong> Real-time GPS location data from drivers to track shipments and from shippers to set pickup/drop-off points.</li>
                                        <li><strong>Device Information:</strong> Device model, operating system, IP address, and unique device identifiers.</li>
                                    </ul>
                                </div>

                                <div id="usage" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>3. Use of Information</h2>
                                    <p>We use the information we collect for various business purposes, including to:</p>
                                    <ul>
                                        <li>Facilitate shipment bookings and connect shippers with drivers.</li>
                                        <li>Process payments and payouts securely.</li>
                                        <li>Provide real-time tracking updates and customer support.</li>
                                        <li>Verify the identity of drivers and vehicles to ensure platform safety.</li>
                                        <li>Improve our AI pricing algorithms and route optimization features.</li>
                                        <li>Send administrative information, such as updates to our terms and policies.</li>
                                    </ul>
                                </div>

                                <div id="sharing" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>4. Sharing & Disclosure</h2>
                                    <p>
                                        We do not sell your personal data. However, we may share information in the following situations:
                                    </p>
                                    <ul>
                                        <li><strong>With Service Providers:</strong> We may share data with third-party vendors (e.g., cloud hosting, payment processors) who perform services on our behalf.</li>
                                        <li><strong>Between Users:</strong> Driver location and contact info is shared with the assigned Shipper, and Shipper pickup details are shared with the assigned Driver to fulfill the service.</li>
                                        <li><strong>Legal Obligations:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities (e.g., law enforcement).</li>
                                    </ul>
                                </div>

                                <div id="security" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>5. Data Security</h2>
                                    <p>
                                        We implement appropriate technical and organizational security measures to protect your personal data. This includes encryption of data in transit and at rest, strict access controls, and regular security audits.
                                    </p>
                                    <div className="flex items-start gap-4 p-5 bg-green-50 text-green-900 rounded-2xl border border-green-100 not-prose mt-4">
                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                            <Shield size={20} className="text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wide mb-1">Security Commitment</h4>
                                            <p className="text-sm leading-relaxed text-green-800">
                                                While we strive to use commercially acceptable means to protect your Personal Data, no method of transmission over the Internet is 100% secure. We cannot guarantee its absolute security.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div id="rights" className="scroll-mt-32 border-b border-slate-100 pb-10 mb-10">
                                    <h2>6. Your Rights</h2>
                                    <p>
                                        You have certain rights regarding your personal data, including the right to access, correct, or delete the information we hold about you. You may also object to processing or request data portability. To exercise these rights, please contact our support team.
                                    </p>
                                </div>

                                <div id="contact" className="scroll-mt-32">
                                    <h2>7. Contact Us</h2>
                                    <p>
                                        If you have questions or comments about this Privacy Policy, please contact us at:
                                    </p>
                                    <div className="not-prose mt-6 flex flex-col sm:flex-row gap-4">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Privacy Officer</p>
                                            <a href="mailto:privacy@sastaload.com" className="text-slate-900 font-bold hover:text-brand-dark">privacy@sastaload.com</a>
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

export default Privacy;