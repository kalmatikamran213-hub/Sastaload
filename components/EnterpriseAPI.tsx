import React from 'react';
import { Terminal, Code, Zap, Database, Lock, Globe, ChevronRight, Copy, Check, Info, X } from 'lucide-react';
import { Page } from '../types';

interface EnterpriseAPIProps {
  onNavigate: (page: Page) => void;
}

const EnterpriseAPI: React.FC<EnterpriseAPIProps> = ({ onNavigate }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-in fade-in duration-500 bg-white font-sans text-slate-900 selection:bg-brand selection:text-slate-900">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden text-left px-4">
         <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full mb-8">
                    <Terminal size={14} className="text-brand" />
                    <span className="text-xs font-bold text-brand uppercase tracking-widest">SastaLoad API v1.0</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1] mb-8">
                   Logistics as <br/>
                   <span className="text-brand">Code.</span>
                </h1>
                
                <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-medium mb-10">
                   Integrate Pakistan's largest trucking network directly into your ERP, eCommerce store, or custom software. Automate bookings, tracking, and payments with a single API call.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => onNavigate('contact')}
                        className="bg-brand text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-2"
                    >
                        Get API Keys <ChevronRight size={20} />
                    </button>
                    <button className="px-8 py-4 rounded-xl font-bold text-lg text-white border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                        View Documentation
                    </button>
                </div>
            </div>

            {/* Code Snippet Visual */}
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand to-blue-500 rounded-2xl blur opacity-20"></div>
                <div className="bg-[#0D1117] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#161B22]">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-xs font-mono text-slate-500">POST /v1/shipments/quote</div>
                        <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="font-mono text-sm leading-relaxed">
<span className="text-purple-400">curl</span> <span className="text-slate-300">-X POST https://api.sastaload.com/v1/quote \</span>
<br/>  <span className="text-slate-300">-H</span> <span className="text-green-400">"Authorization: Bearer sk_live_..."</span> <span className="text-slate-300">\</span>
<br/>  <span className="text-slate-300">-H</span> <span className="text-green-400">"Content-Type: application/json"</span> <span className="text-slate-300">\</span>
<br/>  <span className="text-slate-300">-d</span> <span className="text-blue-400">'{'{'}</span>
<br/>    <span className="text-blue-300">"origin"</span><span className="text-slate-300">:</span> <span className="text-orange-300">"Karachi Port Trust"</span><span className="text-slate-300">,</span>
<br/>    <span className="text-blue-300">"destination"</span><span className="text-slate-300">:</span> <span className="text-orange-300">"Lahore Dry Port"</span><span className="text-slate-300">,</span>
<br/>    <span className="text-blue-300">"cargo"</span><span className="text-slate-300">:</span> <span className="text-blue-400">'{'{'}</span>
<br/>      <span className="text-blue-300">"type"</span><span className="text-slate-300">:</span> <span className="text-orange-300">"Container_40ft"</span><span className="text-slate-300">,</span>
<br/>      <span className="text-blue-300">"weight_kg"</span><span className="text-slate-300">:</span> <span className="text-orange-300">25000</span>
<br/>    <span className="text-blue-400">{'}'}</span>
<br/>  <span className="text-blue-400">{'}'}</span><span className="text-blue-400">'</span>
                        </pre>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* What is API Section - For Business Managers */}
      <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 text-brand-dark font-bold mb-6 uppercase tracking-widest text-xs bg-slate-100 px-3 py-1 rounded-full">
                  <Info size={14} /> For Business Managers
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">What is an API?</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                  API stands for <strong>Application Programming Interface</strong>. It acts as a digital bridge that allows your company's software (like an ERP or inventory system) to "talk" directly to SastaLoad without human intervention.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3 text-left">
                      <div className="bg-red-100 p-2 rounded-lg text-red-600"><X size={20} /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Eliminate Manual Entry</p>
                        <p className="text-xs text-slate-500">Stop typing booking details by hand.</p>
                      </div>
                  </div>
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3 text-left">
                      <div className="bg-green-100 p-2 rounded-lg text-green-600"><Check size={20} /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Instant Automation</p>
                        <p className="text-xs text-slate-500">Book trucks automatically 24/7.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">Built for Developers</h2>
                  <p className="text-lg text-slate-500 font-medium">
                      Our RESTful API is documented, versioned, and backed by a 99.9% uptime SLA. Scale your logistics without scaling your ops team.
                  </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Feature 1 */}
                  <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:border-brand hover:shadow-xl hover:shadow-brand/5 transition-all group">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand transition-colors">
                          <Zap size={24} className="text-slate-900" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Rates</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          Get instant spot market rates for any route in Pakistan based on live vehicle availability.
                      </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:border-brand hover:shadow-xl hover:shadow-brand/5 transition-all group">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand transition-colors">
                          <Globe size={24} className="text-slate-900" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Webhooks</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          Subscribe to shipment events like `driver_assigned`, `pickup_completed`, and `delivered`.
                      </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:border-brand hover:shadow-xl hover:shadow-brand/5 transition-all group">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand transition-colors">
                          <Lock size={24} className="text-slate-900" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          Bank-grade encryption, granular API key scopes, and SOC2 compliant infrastructure.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Integration Use Cases */}
      <section className="py-24 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6">Unified Data Model</h2>
                      <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                          Whether you ship via small pickups or 22-wheeler trailers, our API normalizes the data so you don't have to deal with fragmentation.
                      </p>
                      
                      <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                              <Database className="text-brand shrink-0" size={24} />
                              <div>
                                  <h4 className="font-bold text-white">ERP Integration</h4>
                                  <p className="text-sm text-slate-400">SAP, Oracle, NetSuite, Odoo</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                              <Code className="text-brand shrink-0" size={24} />
                              <div>
                                  <h4 className="font-bold text-white">eCommerce Checkout</h4>
                                  <p className="text-sm text-slate-400">Shopify, WooCommerce, Magento</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 font-mono text-sm shadow-2xl">
                      <div className="text-slate-500 mb-4">// Response Example</div>
                      <div className="space-y-1">
                          <span className="text-slate-300">{"{"}</span>
                          <div className="pl-4">
                              <span className="text-purple-400">"id"</span>: <span className="text-green-400">"qt_1928374"</span>,
                              <br/>
                              <span className="text-purple-400">"price"</span>: <span className="text-orange-400">45000</span>,
                              <br/>
                              <span className="text-purple-400">"currency"</span>: <span className="text-green-400">"PKR"</span>,
                              <br/>
                              <span className="text-purple-400">"eta_hours"</span>: <span className="text-orange-400">24</span>,
                              <br/>
                              <span className="text-purple-400">"vehicle"</span>: <span className="text-slate-300">{"{"}</span>
                              <div className="pl-4">
                                  <span className="text-purple-400">"type"</span>: <span className="text-green-400">"10_wheeler_rigid"</span>,
                                  <br/>
                                  <span className="text-purple-400">"capacity_ton"</span>: <span className="text-orange-400">15</span>
                              </div>
                              <span className="text-slate-300">{"}"}</span>
                          </div>
                          <span className="text-slate-300">{"}"}</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
                  Ready to build?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={() => onNavigate('contact')}
                    className="bg-slate-900 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    Contact Sales for API Access
                </button>
              </div>
          </div>
      </section>

    </div>
  );
};

export default EnterpriseAPI;