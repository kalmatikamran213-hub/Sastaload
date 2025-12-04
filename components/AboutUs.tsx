import React from 'react';
import { Target, Shield, Zap, Users, MapPin, ArrowRight, Heart, CheckCircle, TrendingUp, Globe, Briefcase, FileText } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-white font-sans text-slate-900 selection:bg-brand selection:text-slate-900">
      
      {/* 1. Hero Section - Typography Focused */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden text-left reveal-on-scroll">
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl">
                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 shadow-sm px-4 py-1.5 rounded-full mb-8">
                    <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Since 2024</span>
                </div>
                
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tight leading-[1] mb-10">
                   We move <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">
                      Pakistan forward.
                   </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-slate-500 max-w-3xl leading-relaxed font-medium">
                   SastaLoad is building the digital infrastructure for modern logistics. We connect shippers and carriers directly, creating a transparent, efficient supply chain for goods transport across Pakistan.
                </p>
            </div>
         </div>
      </section>

      {/* 2. Narrative Section (Text Only) */}
      <article className="py-24 lg:py-32 bg-white border-t border-slate-100 reveal-on-scroll">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4">
                      <h2 className="text-3xl font-extrabold text-slate-900 mb-6 sticky top-32 flex items-center gap-3">
                          <Target className="text-brand w-8 h-8" />
                          Our Mission
                      </h2>
                  </div>
                  <div className="lg:col-span-8 space-y-10">
                      <p className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                          "To empower Pakistani businesses and drivers by providing a transparent, efficient, and technology-driven logistics platform that eliminates intermediaries and fosters direct, trusted partnerships."
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-8 pt-8">
                          <div className="space-y-4">
                              <h3 className="text-lg font-bold text-slate-900">The Logistics Challenge</h3>
                              <p className="text-slate-500 leading-relaxed font-medium">
                                  Shipping goods in Pakistan has historically been fragmented and opaque. Hidden fees, unreliable timelines, and a lack of trust were the norm, hurting both businesses and truck drivers.
                              </p>
                          </div>
                          <div className="space-y-4">
                              <h3 className="text-lg font-bold text-slate-900">Digital Freight Solution</h3>
                              <p className="text-slate-500 leading-relaxed font-medium">
                                  By digitizing the freight booking process, we give fleet owners direct access to market demand. Simultaneously, we provide shippers with the visibility and control they need to scale their supply chain operations.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </article>

      {/* 3. Values (Dark Grid) - Compact Version */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden reveal-on-scroll">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mb-12">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">Our Core Values</h2>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed">
                      We are guided by principles that prioritize people over profit, transparency over secrecy, and innovation over tradition in the freight industry.
                  </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
                  {/* Card 1 */}
                  <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[24px] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                      <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center mb-4 text-slate-900 shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform duration-300">
                          <Shield size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Uncompromising Trust</h3>
                      <p className="text-slate-400 leading-relaxed font-medium text-sm sm:text-base">
                          Trust is the currency of logistics. We vet every driver, insure every load, and protect every transaction. We do what we say we'll do.
                      </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[24px] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                          <Zap size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Relentless Speed</h3>
                      <p className="text-slate-400 leading-relaxed font-medium text-sm sm:text-base">
                          Inefficiency is the enemy. We build software that removes friction from booking to billing. We move fast so our customers can move faster.
                      </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[24px] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                          <Users size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Driver First</h3>
                      <p className="text-slate-400 leading-relaxed font-medium text-sm sm:text-base">
                          Drivers are the backbone of our economy. We ensure they are respected, paid instantly, and given the tools to grow their own businesses.
                      </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[24px] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                          <FileText size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Radical Transparency</h3>
                      <p className="text-slate-400 leading-relaxed font-medium text-sm sm:text-base">
                          No hidden fees. No secret commissions. We show the real market price and let the market decide. Clarity builds long-term partnerships.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. Locations (Text Grid) */}
      <section className="py-24 bg-white reveal-on-scroll">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16">
                  <div>
                      <div className="inline-flex items-center gap-2 text-brand-dark font-bold mb-4 uppercase tracking-widest text-xs">
                          <Globe size={16} /> Global Standards, Local Heart
                      </div>
                      <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Our Offices</h2>
                      <p className="text-lg text-slate-500 font-medium max-w-md leading-relaxed">
                          Headquartered in Karachi with regional hubs strategically placed across the nation to support our on-ground operations.
                      </p>
                  </div>
                  <div className="grid gap-4">
                      {[
                        { city: "Karachi (HQ)", address: "Office #212, 2nd Floor, Business Avenue", role: "Headquarters" },
                        { city: "Lahore", address: "Arfa Software Technology Park, Level 4", role: "Engineering" },
                        { city: "Islamabad", address: "Blue Area, Jinnah Avenue", role: "Government Relations" }
                      ].map((loc, idx) => (
                          <div key={idx} className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 group cursor-default">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shrink-0 text-slate-900 group-hover:bg-slate-900 group-hover:text-brand transition-colors">
                                  <MapPin size={20} />
                              </div>
                              <div className="flex-1">
                                  <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-xl font-bold text-slate-900">{loc.city}</h3>
                                    <p className="text--[10px] font-bold text-slate-400 uppercase tracking-wide bg-white px-2 py-1 rounded-md border border-slate-100">{loc.role}</p>
                                  </div>
                                  <address className="text-slate-500 text-sm font-medium not-italic">{loc.address}</address>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* 5. Careers Section */}
      <section id="careers" className="py-24 bg-slate-50 border-t border-slate-100 reveal-on-scroll">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">Join our team</h2>
                  <p className="text-lg text-slate-500 font-medium">
                      We're looking for passionate problem solvers to help us revolutionize logistics in Pakistan.
                  </p>
              </div>
              
              <div className="space-y-4 max-w-4xl mx-auto">
                   {/* Job 1 */}
                   <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-brand transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                       <div>
                           <h3 className="font-bold text-slate-900 text-xl group-hover:text-brand-dark transition-colors mb-2">Senior Software Engineer (Frontend)</h3>
                           <div className="flex gap-4 text-sm text-slate-500 font-medium">
                               <span className="flex items-center gap-1"><MapPin size={16} className="text-slate-400" /> Lahore, PK</span>
                               <span className="flex items-center gap-1"><Briefcase size={16} className="text-slate-400" /> Full-time</span>
                           </div>
                       </div>
                       <a href="mailto:careers@sastaload.com?subject=Application for Senior Frontend Engineer" className="px-8 py-3 bg-slate-50 text-slate-900 font-bold rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors text-sm border border-slate-200 group-hover:border-slate-900 text-center">
                           Apply Now
                       </a>
                   </div>
               </div>
          </div>
      </section>

      {/* 6. CTA */}
      <section className="py-20 bg-brand reveal-on-scroll">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                  Ready to move with us?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={() => document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    <Briefcase size={20} /> View Open Positions
                </button>
                <a 
                    href="mailto:press@sastaload.com"
                    className="bg-white/20 text-slate-900 border border-slate-900/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/40 transition-all flex items-center justify-center gap-2"
                >
                    Contact Press
                </a>
              </div>
          </div>
      </section>

    </div>
  );
};

export default AboutUs;