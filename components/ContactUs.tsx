import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { saveSubmission, STORAGE_KEYS } from '../services/storageService';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to local storage
    saveSubmission(STORAGE_KEYS.CONTACT, formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 bg-white">
      {/* Header Section */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-slate-900 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
            <span className="text-xs font-bold text-white uppercase tracking-widest">24/7 Support</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Get in touch with our team
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Have a question about a shipment? Need a custom enterprise quote? We're here to help you move forward.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 lg:py-24 relative -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column: Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Card 1: Email */}
              <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Chat to sales</h3>
                <p className="text-slate-500 text-sm mb-4 font-medium">Speak to our friendly team.</p>
                <a href="mailto:sales@sastaload.com" className="text-slate-900 font-bold hover:text-brand-dark transition-colors flex items-center gap-2">
                  sales@sastaload.com
                </a>
              </div>

              {/* Card 2: Office */}
              <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center mb-4 text-slate-900">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Visit us</h3>
                <p className="text-slate-500 text-sm mb-4 font-medium">Visit our office HQ.</p>
                <p className="text-slate-900 font-bold">
                  Office #212, 2nd Floor,<br /> Business Avenue, Karachi
                </p>
              </div>

              {/* Card 3: Phone */}
              <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 text-slate-900">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Call us</h3>
                <p className="text-slate-500 text-sm mb-4 font-medium">Mon-Sat from 9am to 6pm.</p>
                <a href="tel:+923363391378" className="text-slate-900 font-bold hover:text-brand-dark transition-colors">
                  +92 (336) 339-1378
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">First Name</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ali Khan"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ali@company.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">Subject</label>
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium text-slate-900 cursor-pointer"
                        >
                          <option value="">Select a topic</option>
                          <option value="general">General Inquiry</option>
                          <option value="driver_support">Driver Support</option>
                          <option value="business">Business Registration</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">Message</label>
                      <textarea 
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="How can we help you today?"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 mt-4"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : (
                        <>
                          Send Message <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-500 mb-8 max-w-xs mx-auto font-medium">
                      Thank you for contacting us. We will get back to you shortly.
                    </p>
                    <button 
                      onClick={() => { setIsSuccess(false); }}
                      className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;