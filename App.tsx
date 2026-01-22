import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Tracking from './components/Tracking';
import Process from './components/Process';
import ForBusiness from './components/ForBusiness';
import ForDrivers from './components/ForDrivers';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import TrustSafety from './components/TrustSafety';
import WaitlistModal from './components/WaitlistModal';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // SEO Optimized Dynamic Title & Meta Description Management
  useEffect(() => {
    let title = "SastaLoad - Online Truck Booking & Logistics Platform Pakistan";
    let description = "Book verified trucks online in Pakistan with SastaLoad. Connect directly with drivers, get wholesale rates, and track shipments in real-time. Save up to 30%.";

    switch (currentPage) {
        case 'home': 
            title = "SastaLoad - Online Truck Booking & Logistics Platform Pakistan"; 
            description = "The smartest way to move freight in Pakistan. Connect with 15,000+ verified drivers for reliable goods transport.";
            break;
        case 'about': 
            title = "About SastaLoad | Best Logistics Company in Pakistan"; 
            description = "Learn how SastaLoad is digitizing Pakistan's supply chain. Our mission is to provide transparent, direct-to-driver freight booking.";
            break;
        case 'contact': 
            title = "Contact SastaLoad Support | 24/7 Logistics Help"; 
            description = "Get in touch with SastaLoad for support, enterprise quotes, or driver onboarding. We are available 24/7 to help your business move.";
            break;
        case 'login': 
            title = "Login to SastaLoad | Shipper & Driver Portal"; 
            description = "Access your SastaLoad dashboard to manage shipments, track vehicles, or view your driver earnings.";
            break;
        case 'signup': 
            title = "Register | Join Pakistan's Largest Trucking Network"; 
            description = "Create a SastaLoad account today. Whether you are a business shipper or a fleet owner, start moving with transparency.";
            break;
        case 'trust': 
            title = "Trust & Safety | Insured Freight Services"; 
            description = "Your cargo safety is our priority. Learn about our driver vetting process, secure payments, and transit insurance options.";
            break;
        case 'terms': 
            title = "Terms of Service | SastaLoad Logistics"; 
            description = "Read our terms and conditions for using the SastaLoad marketplace and transport facilitation services.";
            break;
        case 'privacy': 
            title = "Privacy Policy | Data Protection"; 
            description = "Understand how SastaLoad handles your personal and location data to ensure a secure logistics experience.";
            break;
        case 'admin':
            title = "Admin Portal | SastaLoad";
            description = "Internal management dashboard for SastaLoad operations.";
            break;
    }

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
  }, [currentPage]);

  // Ensure scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleOpenWaitlist = () => {
    setIsWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand selection:text-slate-900">
      <Header onNavigate={handleNavigate} currentPage={currentPage} onOpenWaitlist={handleOpenWaitlist} />
      <main role="main">
        {currentPage === 'home' && (
          <>
            <Hero onOpenWaitlist={handleOpenWaitlist} />
            <Stats />
            <Tracking />
            <Features />
            <Process />
            <ForBusiness onNavigate={handleNavigate} />
            <ForDrivers onOpenWaitlist={handleOpenWaitlist} onNavigate={handleNavigate} />
            <Testimonials />
            <FAQ />
            <CallToAction onOpenWaitlist={handleOpenWaitlist} />
          </>
        )}
        {currentPage === 'about' && (
          <AboutUs />
        )}
        {currentPage === 'contact' && (
          <ContactUs />
        )}
        {currentPage === 'terms' && (
          <Terms />
        )}
        {currentPage === 'privacy' && (
          <Privacy />
        )}
        {currentPage === 'trust' && (
          <TrustSafety />
        )}
        {currentPage === 'login' && (
          <Login onNavigate={handleNavigate} />
        )}
        {currentPage === 'signup' && (
          <Signup onNavigate={handleNavigate} />
        )}
        {currentPage === 'admin' && (
          <AdminDashboard />
        )}
      </main>
      
      {currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'admin' && (
         <Footer onNavigate={handleNavigate} currentPage={currentPage} onOpenWaitlist={handleOpenWaitlist} />
      )}
      
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}

export default App;