import React from 'react';

const stats = [
    { label: "Active Drivers", value: "15,000+" },
    { label: "Cities Covered", value: "50+" },
    { label: "Monthly Deliveries", value: "1.2M" },
    { label: "Business Clients", value: "2,500+" },
];

const Stats: React.FC = () => {
    return (
        <section className="bg-slate-900 py-6 lg:py-8 border-y border-slate-800 reveal-on-scroll">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="space-y-0.5 lg:space-y-1">
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand tracking-tight">{stat.value}</p>
                            <p className="text-slate-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;