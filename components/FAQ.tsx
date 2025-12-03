import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How is the shipping rate calculated?",
        answer: "Our AI-powered algorithm analyzes real-time market data, fuel prices, route distance, and vehicle availability to provide a fair, transparent price range. You can also accept bids directly from drivers."
    },
    {
        question: "When do drivers get paid?",
        answer: "Drivers receive payment within 24 hours of successful delivery and proof of delivery (POD) submission. We support direct bank transfers, JazzCash, and EasyPaisa."
    },
    {
        question: "Is my cargo insured during transit?",
        answer: "Yes, SastaLoad offers basic goods-in-transit insurance for all verified shipments. For high-value cargo, we offer premium insurance add-ons during the booking process."
    },
    {
        question: "How do I register as a driver or fleet owner?",
        answer: "Simply download the SastaLoad Driver App from the Google Play Store, upload your CNIC and vehicle documents, and get verified within 24 hours to start accepting loads."
    },
    {
        question: "Which cities does SastaLoad cover?",
        answer: "We currently operate in over 50 major cities across Pakistan, including Karachi, Lahore, Islamabad, Faisalabad, Multan, and Peshawar, covering all major national highways."
    },
    {
        question: "How do I track my shipment?",
        answer: "Once your shipment is active, you'll receive a unique tracking ID (e.g., SL-8291). Enter this ID on our 'Tracking' page to view real-time GPS location, status updates, and estimated arrival time."
    },
    {
        question: "What vehicle types can I book?",
        answer: "We offer a diverse fleet ranging from Suzuki Ravi (1 Ton) and Shehzore for intra-city moves, to Mazda (3-7 Tons), 10-Wheelers, and 22-Wheeler Flatbeds for heavy inter-city logistics."
    },
    {
        question: "Can I book a truck in advance?",
        answer: "Yes, you can schedule shipments up to 30 days in advance. When getting a quote, simply select your desired pickup date to ensure vehicle availability for your planned dispatch."
    },
    {
        question: "Do you handle partial loads (LTL)?",
        answer: "Yes, for smaller shipments that don't require a full truck, you can choose our 'Part Load' service. This allows you to share truck space with other shippers and significantly reduce your costs."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-[#F8F9FA]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-slate-500">Everything you need to know about shipping and driving with us.</p>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand/50 hover:shadow-sm">
                            <button 
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="font-bold text-slate-900 text-lg pr-8">{faq.question}</span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-brand text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
                                    {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;