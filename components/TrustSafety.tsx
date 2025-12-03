import React from 'react';
import { ShieldCheck, UserCheck, Lock, AlertTriangle, Phone, FileCheck, Truck, CreditCard } from 'lucide-react';

const TrustSafety: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 bg-white font-sans text-slate-900 selection:bg-brand selection:text-slate-900">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden text-center px-4">
         <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-8">
                <ShieldCheck size={16} className="text-brand" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Safety Center</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
               Your safety is our <br/>
               <span className="text-brand">top priority.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
               From rigorous driver vetting to real-time cargo tracking, we've built a multi-layered security system to ensure peace of mind for every shipment.
            </p>
         </div>
      </section>

      {/* 4 Pillars of Trust */}
      <section className="py-20 bg-white relative -mt-16 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                          <UserCheck size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">100% Vetted Drivers</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          Every driver undergoes CNIC verification, license validation, and vehicle inspection before joining.
                      </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                          <Lock size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Payments</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          Funds are held in escrow and only released after digital proof of delivery is confirmed.
                      </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                          <AlertTriangle size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Crisis Response</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          A dedicated 24/7 emergency team is ready to handle accidents, breakdowns, or theft attempts.
                      </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                          <FileCheck size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Cargo Insurance</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          Comprehensive goods-in-transit coverage options to protect your valuable inventory.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* For Shippers Section */}
      <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <div className="inline-flex items-center gap-2 text-brand-dark font-bold mb-4 uppercase tracking-widest text-xs">
                          <Truck size={16} /> For Shippers
                      </div>
                      <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Ship with confidence.</h2>
                      <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                          We treat your cargo as if it were our own. Our technology ensures visibility and accountability at every mile.
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex gap-4">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                                  <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 text-lg">Real-Time Tracking</h4>
                                  <p className="text-slate-500 text-sm font-medium">Shareable GPS links allow you to monitor location without calling the driver.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                                  <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 text-lg">Digital Documentation</h4>
                                  <p className="text-slate-500 text-sm font-medium">E-signatures and photo proof of loading/unloading prevent disputes.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                                  <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 text-lg">Fraud Prevention</h4>
                                  <p className="text-slate-500 text-sm font-medium">AI detection for suspicious bidding patterns and route deviations.</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 relative">
                       {/* Abstract representation of verification */}
                       <div className="space-y-6">
                           <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                               <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">👨🏻‍✈️</div>
                                   <div>
                                       <p className="font-bold text-slate-900">Driver Verification</p>
                                       <p className="text-xs text-slate-400 font-bold uppercase">Status: Approved</p>
                                   </div>
                               </div>
                               <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                   <ShieldCheck size={12} /> Verified
                               </div>
                           </div>
                           
                           <div className="space-y-3">
                               <div className="flex justify-between items-center text-sm">
                                   <span className="text-slate-500 font-medium">CNIC Check</span>
                                   <span className="text-green-600 font-bold">Passed</span>
                               </div>
                               <div className="flex justify-between items-center text-sm">
                                   <span className="text-slate-500 font-medium">Criminal Record</span>
                                   <span className="text-green-600 font-bold">Clear</span>
                               </div>
                               <div className="flex justify-between items-center text-sm">
                                   <span className="text-slate-500 font-medium">Driving License</span>
                                   <span className="text-green-600 font-bold">Valid</span>
                               </div>
                               <div className="flex justify-between items-center text-sm">
                                   <span className="text-slate-500 font-medium">Vehicle Fitness</span>
                                   <span className="text-green-600 font-bold">Inspected</span>
                               </div>
                           </div>
                           
                           <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 text-xs font-medium text-slate-500">
                               <Lock size={16} />
                               Data encrypted with 256-bit SSL security.
                           </div>
                       </div>
                  </div>
              </div>
          </div>
      </section>

      {/* For Drivers Section */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                   <div className="order-2 lg:order-1 bg-slate-900 p-8 rounded-[40px] shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[radial-gradient(#B3F000_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                       <div className="relative z-10 space-y-6">
                           <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                               <div className="flex justify-between items-center mb-2">
                                   <span className="text-slate-300 text-xs font-bold uppercase">Payment Status</span>
                                   <span className="text-brand font-bold text-xs flex items-center gap-1"><Lock size={12} /> Secured in Escrow</span>
                               </div>
                               <p className="text-3xl font-extrabold text-white tracking-tight">PKR 85,000</p>
                               <p className="text-slate-400 text-xs mt-1">Trip ID: #SL-9921</p>
                           </div>
                           <div className="flex gap-2">
                               <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5">
                                   <p className="text-slate-400 text-xs font-bold uppercase mb-1">Payment Speed</p>
                                   <p className="text-white font-bold">24 Hours</p>
                               </div>
                               <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5">
                                   <p className="text-slate-400 text-xs font-bold uppercase mb-1">Method</p>
                                   <p className="text-white font-bold">Direct Bank</p>
                               </div>
                           </div>
                       </div>
                   </div>

                  <div className="order-1 lg:order-2">
                      <div className="inline-flex items-center gap-2 text-brand-dark font-bold mb-4 uppercase tracking-widest text-xs">
                          <CreditCard size={16} /> For Drivers
                      </div>
                      <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Guaranteed Payments.</h2>
                      <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                          No more chasing shippers for money. We secure the payment before you even start the engine.
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex gap-4">
                              <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-1">
                                  <div className="w-2.5 h-2.5 rounded-full bg-brand-dark"></div>
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 text-lg">Escrow Protection</h4>
                                  <p className="text-slate-500 text-sm font-medium">Shippers deposit funds with SastaLoad upfront. Your earnings are safe.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-1">
                                  <div className="w-2.5 h-2.5 rounded-full bg-brand-dark"></div>
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 text-lg">Fair Dispute Resolution</h4>
                                  <p className="text-slate-500 text-sm font-medium">Our support team mediates fairly based on GPS data and documentation.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-1">
                                  <div className="w-2.5 h-2.5 rounded-full bg-brand-dark"></div>
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 text-lg">Trip Insurance</h4>
                                  <p className="text-slate-500 text-sm font-medium">Coverage options available for vehicle breakdown assistance.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20 bg-red-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Phone size={32} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Emergency Hotline</h2>
              <p className="text-slate-600 font-medium mb-8">
                  For accidents, theft, or severe safety concerns during an active shipment, call our dedicated SOS line immediately.
              </p>
              <a href="tel:911" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                  Call SOS Support
              </a>
          </div>
      </section>

    </div>
  );
};

export default TrustSafety;