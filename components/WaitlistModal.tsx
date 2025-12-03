import React, { useState } from 'react';
import { X, Smartphone, Bell, Loader2, CheckCircle } from 'lucide-react';
import { saveSubmission, STORAGE_KEYS } from '../services/storageService';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to storage
    saveSubmission(STORAGE_KEYS.WAITLIST, { email });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-[32px] w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500 z-20"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center">
            {!isSuccess ? (
                <>
                    <div className="w-20 h-20 bg-brand/10 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                        <Smartphone size={32} className="text-brand-dark" />
                        <div className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-sm">
                            <Bell size={16} className="text-orange-500 fill-orange-500 animate-pulse" />
                        </div>
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3">App Update in Progress</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        The SastaLoad app is currently in an update phase and will be available soon with exciting new features.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="text-left">
                            <label className="text-xs font-bold text-slate-900 uppercase ml-1 mb-1.5 block">Get Notified</label>
                            <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address" 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all font-medium text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "Notify Me When Ready"}
                        </button>
                    </form>
                </>
            ) : (
                <div className="py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">You're on the list!</h3>
                    <p className="text-slate-500 mb-8 font-medium">
                        We'll send an email to <span className="text-slate-900 font-bold">{email}</span> as soon as the update is live.
                    </p>
                    <button 
                        onClick={onClose}
                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                    >
                        Okay, got it
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;