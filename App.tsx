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

  // Ensure scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

  // Handle Scroll Animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
    };
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
      <main>
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
      
      {/* Footer is typically hidden on login/signup in many apps, but keeping it here for consistency or simple navigation */}
      {currentPage !== 'login' && currentPage !== 'signup' && (
         <Footer onNavigate={handleNavigate} currentPage={currentPage} onOpenWaitlist={handleOpenWaitlist} />
      )}
      
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}

export default App;