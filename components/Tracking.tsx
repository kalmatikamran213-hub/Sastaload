import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Truck, Check, Clock, Maximize2 } from 'lucide-react';

// Declare L for Leaflet since we are using it via CDN
declare const L: any;

const Tracking: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    setIsSearching(true);
    setResult(null);

    // Simulate API lookup
    setTimeout(() => {
      setIsSearching(false);
      setResult({
        id: trackingId.toUpperCase(),
        origin: 'Lahore, Punjab',
        destination: 'Karachi, Sindh',
        status: 'In Transit',
        currentLocation: 'Sukkur Bypass, N-5 Highway',
        coords: {
            origin: [31.5204, 74.3587], // Lahore
            destination: [24.8607, 67.0011], // Karachi
            current: [27.7131, 68.8492] // Sukkur
        },
        eta: 'Tomorrow, 02:00 PM',
        driver: {
          name: 'Asif Ali',
          vehicle: 'Hyundai Shehzore',
          plate: 'LEA-19-402'
        },
        timeline: [
          { status: 'Shipment Booked', time: '10:00 AM, Yesterday', done: true },
          { status: 'Driver Assigned', time: '10:30 AM, Yesterday', done: true },
          { status: 'Picked up from Lahore', time: '02:00 PM, Yesterday', done: true },
          { status: 'Arrived at Sukkur Hub', time: '08:00 AM, Today', done: true, current: true },
          { status: 'Out for Delivery', time: 'Estimated Tomorrow', done: false },
          { status: 'Delivered', time: '-', done: false },
        ]
      });
    }, 1500);
  };

  // Initialize Map
  useEffect(() => {
    // Only proceed if result exists, map container exists, and Leaflet is loaded
    if (!result || !mapRef.current || typeof L === 'undefined') return;

    // Cleanup existing map instance to prevent "Map container is already initialized" error
    if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
    }

    try {
        // Initialize Map centered on current location
        const map = L.map(mapRef.current).setView(result.coords.current, 6);
        mapInstanceRef.current = map;

        // Add Tile Layer (OpenStreetMap)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Custom Icons
        const truckIcon = L.divIcon({
            html: `<div class="w-8 h-8 bg-brand rounded-full border-4 border-white shadow-lg flex items-center justify-center text-slate-900"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg></div>`,
            className: '',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        const pinIcon = L.divIcon({
            html: `<div class="w-3 h-3 bg-slate-900 rounded-full border-2 border-white shadow-md"></div>`,
            className: '',
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });

        // Add Markers
        L.marker(result.coords.origin, { icon: pinIcon }).addTo(map).bindPopup("Origin: Lahore");
        L.marker(result.coords.destination, { icon: pinIcon }).addTo(map).bindPopup("Destination: Karachi");
        L.marker(result.coords.current, { icon: truckIcon }).addTo(map).bindPopup("Current Location: Sukkur").openPopup();

        // Draw Route (Polyline)
        const latlngs = [
            result.coords.origin,
            result.coords.current,
            result.coords.destination
        ];
        
        // Polyline segments
        L.polyline([result.coords.origin, result.coords.current], { color: '#B3F000', weight: 4 }).addTo(map);
        L.polyline([result.coords.current, result.coords.destination], { color: '#94a3b8', weight: 3, dashArray: '10, 10' }).addTo(map);

        // Fit bounds to show full route
        map.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] });

    } catch (err) {
        console.error("Map initialization failed:", err);
    }

    // Cleanup on unmount or re-run
    return () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
    };
  }, [result]);

  // Calculate progress percentage
  const progress = result 
    ? Math.round((result.timeline.filter((t: any) => t.done).length / result.timeline.length) * 100)
    : 0;

  return (
    <section id="tracking" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Track Your Shipment</h2>
          <p className="text-lg text-slate-500">Real-time visibility from pickup to dropoff. Enter your tracking ID below.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 lg:mb-16 relative z-10">
          <form onSubmit={handleTrack} className="relative group">
            <div className="absolute inset-0 bg-slate-200 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative flex items-center bg-white border border-slate-200 rounded-full p-1.5 sm:p-2 shadow-lg shadow-slate-200/50 focus-within:ring-4 focus-within:ring-slate-100 transition-all">
              <div className="pl-4 sm:pl-6 pr-2 sm:pr-4 text-slate-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Enter Tracking ID (e.g. SL-8291)" 
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 font-bold placeholder-slate-400 text-base sm:text-lg outline-none w-full min-w-0"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-brand hover:bg-brand-hover text-slate-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
              >
                {isSearching ? 'Locating...' : 'Track'}
              </button>
            </div>
          </form>
        </div>

        {/* Result Card */}
        {result && (
          <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-white rounded-[24px] lg:rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
              
              {/* Header */}
              <div className="bg-slate-50/50 p-6 lg:p-8 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-6">
                <div>
                   <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">ID: {result.id}</span>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                        {result.status}
                      </span>
                   </div>
                   <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
                      {result.origin} 
                      <span className="text-slate-300">→</span> 
                      {result.destination}
                   </h3>
                </div>
                <div className="text-left md:text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Estimated Arrival</p>
                    <p className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 md:justify-end">
                       <Clock size={20} className="text-brand-dark" />
                       {result.eta}
                    </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-1.5 bg-slate-100">
                <div 
                    className="absolute top-0 left-0 h-full bg-brand transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* MAP Container */}
              <div className="h-[300px] sm:h-[400px] w-full bg-slate-100 relative group">
                  <div ref={mapRef} className="absolute inset-0 z-0"></div>
                  {/* Overlay instructions or controls could go here */}
                  <div className="absolute top-4 right-4 z-[400] bg-white p-2 rounded-lg shadow-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={20} className="text-slate-600" />
                  </div>
              </div>

              <div className="grid md:grid-cols-12 gap-0 border-t border-slate-100">
                {/* Timeline */}
                <div className="md:col-span-7 p-6 lg:p-8 border-b md:border-b-0 md:border-r border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                            <MapPin size={18} /> Shipment Progress
                        </h4>
                        <span className="text-xs font-bold text-slate-500">{progress}% Complete</span>
                    </div>

                    <div className="space-y-0 relative pl-2">
                        {result.timeline.map((event: any, idx: number) => {
                            const isLast = idx === result.timeline.length - 1;
                            return (
                                <div key={idx} className="relative flex items-start gap-4 pb-8 last:pb-0">
                                    {/* Connecting Line */}
                                    {!isLast && (
                                        <div 
                                            className={`absolute top-4 left-[6px] bottom-0 w-0.5 ${event.done && result.timeline[idx + 1]?.done ? 'bg-brand' : 'bg-slate-200 dashed-line'}`}
                                            style={!event.done ? {backgroundImage: 'linear-gradient(to bottom, transparent 50%, #e2e8f0 50%)', backgroundSize: '1px 8px', width: '1px', left: '6.5px'} : {}}
                                        ></div>
                                    )}

                                    {/* Status Node */}
                                    <div className={`
                                        w-4 h-4 rounded-full border-2 z-10 mt-1 flex-shrink-0 flex items-center justify-center transition-all duration-300
                                        ${event.done 
                                            ? 'border-brand bg-brand' 
                                            : event.current 
                                                ? 'border-brand bg-white ring-4 ring-brand/20 scale-110' 
                                                : 'border-slate-300 bg-white'}
                                    `}>
                                        {event.done && <Check size={10} className="text-slate-900 stroke-[4]" />}
                                        {event.current && <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></div>}
                                    </div>

                                    {/* Content */}
                                    <div className={`transition-all duration-300 ${event.current ? 'transform translate-x-1' : ''}`}>
                                        <p className={`text-sm font-bold leading-none mb-1.5 ${event.current ? 'text-brand-dark text-base sm:text-lg' : event.done ? 'text-slate-900' : 'text-slate-400'}`}>
                                            {event.status}
                                        </p>
                                        <p className="text-xs text-slate-500 font-medium">{event.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Driver & Truck Info */}
                <div className="md:col-span-5 p-6 lg:p-8 bg-slate-50/30">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Truck size={18} /> Driver Details
                    </h4>
                    
                    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl">👨🏻‍✈️</div>
                            <div>
                                <p className="font-bold text-slate-900">{result.driver.name}</p>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 text-orange-400 fill-orange-400"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>)}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Vehicle</span>
                                <span className="text-slate-900 font-bold">{result.driver.vehicle}</span>
                             </div>
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Plate No</span>
                                <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded">{result.driver.plate}</span>
                             </div>
                        </div>
                    </div>

                    <div className="bg-brand/10 p-4 rounded-2xl border border-brand/20">
                        <p className="text-xs font-bold text-brand-dark uppercase mb-1">Current Location</p>
                        <p className="text-sm font-bold text-slate-900">{result.currentLocation}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tracking;