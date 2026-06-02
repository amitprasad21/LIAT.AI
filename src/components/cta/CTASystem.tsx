'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FiHome, FiAward, FiCalendar, FiSend } from 'react-icons/fi';

export const CTASystem: React.FC = () => {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get('intent');

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<'lease' | 'sponsor' | 'venue'>('lease');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Pre-select objective tier based on search params intent coordinates
  useEffect(() => {
    if (intentParam === 'lease' || intentParam === 'sponsor' || intentParam === 'venue') {
      setSelectedIntent(intentParam);
    }
  }, [intentParam]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = (window.scrollY / scrollHeight) * 100;
      
      // Show sticky bar after 30% scroll and hide near the very bottom footer
      if (scrollPct > 30 && scrollPct < 90) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          intent: selectedIntent,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      {/* 1. Sticky Bottom Floating Bar (after 30% scroll) */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 w-full glass-panel py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-500 ease-in-out',
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col text-center sm:text-left">
          <span className="font-display text-sm font-semibold tracking-wide text-ivory">
            Ready to be a part of this?
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gold mt-0.5 font-light">
            DUBAI MALL &bull; Interactive Sales Deck
          </span>
        </div>

        {/* Quick-action buttons */}
        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
          <button
            onClick={() => handleScrollTo('leasing')}
            className="px-4 py-2 rounded bg-gold text-background text-[9px] uppercase tracking-[0.18em] font-sans font-bold hover:bg-gold-light transition-all duration-300 focus-ring"
          >
            Lease Space
          </button>
          
          <button
            onClick={() => handleScrollTo('sponsorship')}
            className="px-4 py-2 rounded border border-gold/40 bg-transparent text-[9px] uppercase tracking-[0.18em] font-sans font-bold text-gold hover:bg-gold/10 transition-all duration-300 focus-ring"
          >
            Sponsorship
          </button>

          <button
            onClick={() => handleScrollTo('venues')}
            className="px-4 py-2 rounded border border-gold/25 bg-transparent text-[9px] uppercase tracking-[0.18em] font-sans font-bold text-ivory hover:border-gold hover:bg-gold/10 transition-all duration-300 focus-ring"
          >
            Book Venue
          </button>
        </div>
      </div>

      {/* 2. End Section: Full-Viewport Call-To-Action Footer */}
      <section
        id="contact"
        className="relative w-full py-20 md:py-36 px-4 sm:px-6 md:px-12 bg-background border-t border-gold/10 overflow-hidden flex flex-col justify-center"
        aria-label="General Enquiries"
      >
        {/* Dynamic ambient radial light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Main Playfair Display Editorial Headline */}
          <ScrollReveal className="text-center mb-24 max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3 block">
              10 / THE FINAL OPPORTUNITY
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-semibold tracking-wide text-ivory leading-tight mb-8">
              Your Brand.<br />
              <span className="gold-text-gradient font-bold">Our Stage.</span>
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl mx-auto font-sans font-light">
              Do not simply pitch. Elevate. Join the world\'s most high-performance lifestyle environment and command global consumer attention.
            </p>
          </ScrollReveal>

          {/* Three columns quick gateway card links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-stretch">
            
            {/* Cards 1: Lease */}
            <ScrollReveal delay={0.05}>
              <div className="h-full rounded-lg bg-surface/40 p-8 border border-gold/10 hover:border-gold/30 hover:bg-surface transition-all duration-300 flex flex-col justify-between text-center md:text-left">
                <div>
                  <div className="p-3 bg-gold/10 border border-gold/25 rounded w-fit mx-auto md:mx-0 mb-6 text-gold">
                    <FiHome size={22} />
                  </div>
                  <h3 className="text-lg font-display font-medium text-ivory mb-2">
                    Commercial Leasing
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light mb-6">
                    Acquire premier retail shop fronts inside Fashion Avenue or central gallerias.
                  </p>
                </div>
                <button
                  onClick={() => handleScrollTo('leasing')}
                  className="w-full py-3 border border-gold/30 hover:border-gold rounded text-[10px] font-sans font-semibold uppercase tracking-widest text-gold transition-colors duration-300 focus-ring"
                >
                  View rates &rarr;
                </button>
              </div>
            </ScrollReveal>

            {/* Cards 2: Sponsor */}
            <ScrollReveal delay={0.1}>
              <div className="h-full rounded-lg bg-surface/40 p-8 border border-gold/10 hover:border-gold/30 hover:bg-surface transition-all duration-300 flex flex-col justify-between text-center md:text-left">
                <div>
                  <div className="p-3 bg-gold/10 border border-gold/25 rounded w-fit mx-auto md:mx-0 mb-6 text-gold">
                    <FiAward size={22} />
                  </div>
                  <h3 className="text-lg font-display font-medium text-ivory mb-2">
                    Brand Sponsorship
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light mb-6">
                    Secure continuous digital OOH screens and elite naming rights to anchors.
                  </p>
                </div>
                <button
                  onClick={() => handleScrollTo('sponsorship')}
                  className="w-full py-3 border border-gold/30 hover:border-gold rounded text-[10px] font-sans font-semibold uppercase tracking-widest text-gold transition-colors duration-300 focus-ring"
                >
                  View Packages &rarr;
                </button>
              </div>
            </ScrollReveal>

            {/* Cards 3: Event */}
            <ScrollReveal delay={0.15}>
              <div className="h-full rounded-lg bg-surface/40 p-8 border border-gold/10 hover:border-gold/30 hover:bg-surface transition-all duration-300 flex flex-col justify-between text-center md:text-left">
                <div>
                  <div className="p-3 bg-gold/10 border border-gold/25 rounded w-fit mx-auto md:mx-0 mb-6 text-gold">
                    <FiCalendar size={22} />
                  </div>
                  <h3 className="text-lg font-display font-medium text-ivory mb-2">
                    Venue Bookings
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light mb-6">
                    Reserve Grand Atrium staging or outdoor Fountain bridge promenades.
                  </p>
                </div>
                <button
                  onClick={() => handleScrollTo('venues')}
                  className="w-full py-3 border border-gold/30 hover:border-gold rounded text-[10px] font-sans font-semibold uppercase tracking-widest text-gold transition-colors duration-300 focus-ring"
                >
                  View Layouts &rarr;
                </button>
              </div>
            </ScrollReveal>

          </div>

          {/* Centralized General Contact Form */}
          <ScrollReveal className="max-w-3xl mx-auto rounded-lg bg-surface border border-gold/15 p-8 md:p-12">
            <h3 className="font-display text-xl font-medium text-ivory mb-6 text-center">
              Direct Executive Enquiries
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                    Legal Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alastair Sterling"
                    className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                    Corporate Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. a.sterling@sterlingbrands.com"
                    className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-intent" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                  Primary Objective / Intent
                </label>
                <select
                  id="contact-intent"
                  name="selectedIntent"
                  value={selectedIntent}
                  onChange={(e) => setSelectedIntent(e.target.value as any)}
                  className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                >
                  <option value="lease">Lease space / Permanent retail shop fronts</option>
                  <option value="sponsor">Become corporate partner / Digital OOH packages</option>
                  <option value="venue">Book specialized events venues / Staging domains</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                  Concept Scope & Details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your organization's concept, timing schedules, or sponsorship reach goals..."
                  className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring resize-none placeholder-slate-400"
                />
              </div>

              {/* Success notifications */}
              {status === 'success' && (
                <div className="p-4 rounded border border-green-500/20 bg-green-500/10 text-xs text-green-400 font-sans text-center">
                  Success! Your contact submission has been saved directly to our system registry.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 rounded border border-red-500/20 bg-red-500/10 text-xs text-red-400 font-sans text-center">
                  Error syncing form submission. Please verify your variables.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded bg-gold text-background text-xs uppercase tracking-[0.25em] font-sans font-bold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 focus-ring disabled:opacity-50"
              >
                {status === 'loading' ? (
                  'Securing Database Node...'
                ) : (
                  <>
                    Initialize Strategy Call
                    <FiSend size={13} />
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>

          {/* Luxury Footer Corporate Details */}
          <footer className="mt-32 pt-8 border-t border-gold/10 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-text-secondary font-light">
              &copy; {new Date().getFullYear()} Emaar Properties PJSC &bull; All Rights Reserved.
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">
              DUBAI MALL INTERACTIVE SALES DECK
            </span>
          </footer>

        </div>
      </section>
    </>
  );
};
export default CTASystem;
