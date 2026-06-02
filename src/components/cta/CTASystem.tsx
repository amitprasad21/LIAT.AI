'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useSearchParams } from 'next/navigation';
import { useDeck } from '@/context/DeckContext';
import { cn } from '@/lib/utils';
import { FiHome, FiAward, FiCalendar, FiSend, FiFileText, FiCheckSquare, FiSquare } from 'react-icons/fi';

export const CTASystem: React.FC = () => {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get('intent');

  const {
    brandName,
    brandCategory,
    selectedZone,
    selectedSpaceSqft,
    leaseDurationYears,
    calculatedLeaseRate,
    estimatedImpressions,
    sponsorshipTier,
    loiAgreed,
    setLoiAgreed
  } = useDeck();

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<'lease' | 'sponsor' | 'venue'>('lease');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Pre-select objective tier based on search params intent coordinates
  useEffect(() => {
    if (intentParam === 'lease' || intentParam === 'sponsor' || intentParam === 'venue') {
      setSelectedIntent(intentParam);
    }
  }, [intentParam]);

  // Synchronize brandName into the form state on change
  useEffect(() => {
    if (brandName) {
      setFormData(prev => ({ ...prev, company: brandName }));
    }
  }, [brandName]);

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
    if (!formData.name || !formData.email || !formData.company) {
      alert('Please fill in all fields.');
      return;
    }

    setStatus('loading');

    // Build a compiled commercial message combining sandbox settings & LOI attestation
    const compiledMessage = `
[B2B CORE SPECIFICATIONS]
Company / Brand: ${formData.company}
Representative: ${formData.name}
Email: ${formData.email}
Objective: ${selectedIntent.toUpperCase()}

[SANDBOX SIMULATION DATA]
Preferred Location: ${selectedZone}
Requested Footprint: ${selectedSpaceSqft.toLocaleString()} Sq Ft
Lease Duration: ${leaseDurationYears} Years
Estimated Monthly Lease: AED ${calculatedLeaseRate.toLocaleString()}
Estimated Annual Footfall Exposure: ${estimatedImpressions.toLocaleString()}
Sponsorship Tier Selected: ${sponsorshipTier ? sponsorshipTier.toUpperCase() : 'None'}

[LETTER OF INTENT STATUS]
Attested LOI: ${loiAgreed ? 'YES (Digitally Signed)' : 'NO'}

[USER MEMO]
${formData.message || 'No additional message provided.'}
    `.trim();

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          intent: selectedIntent,
          name: formData.name,
          email: formData.email,
          message: compiledMessage,
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setLoiAgreed(false);
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Helper to compile the dynamic document preview based on current state variables
  const getDraftTitle = () => {
    if (selectedIntent === 'lease') return 'B2B Commercial Letter of Intent';
    if (selectedIntent === 'sponsor') return 'Sponsorship Partnership Charter';
    return 'Spatial Venue Booking Draft';
  };

  const getDraftReference = () => {
    if (selectedIntent === 'lease') return 'EM-DM-2026-LOI-L';
    if (selectedIntent === 'sponsor') return 'EM-DM-2026-SPC-S';
    return 'EM-DM-2026-VAC-V';
  };

  return (
    <>

      {/* 2. End Section: Full-Viewport Call-To-Action Footer */}
      <section
        id="contact"
        className="relative w-full py-16 md:py-28 px-4 sm:px-6 md:px-12 bg-background border-t border-gold/10 overflow-hidden flex flex-col justify-center"
        aria-label="General Enquiries"
      >
        {/* Dynamic ambient radial light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Main Playfair Display Editorial Headline */}
          <ScrollReveal className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3 block">
              10 / THE FINAL OPPORTUNITY
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-wide text-ivory leading-tight mb-6">
              Your Brand.<br />
              <span className="gold-text-gradient font-bold">Our Stage.</span>
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto font-sans font-light">
              Do not simply pitch. Elevate. Join the world's most high-performance lifestyle environment and command global consumer attention.
            </p>
          </ScrollReveal>

          {/* Three columns quick gateway card links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
            
            {/* Cards 1: Lease */}
            <ScrollReveal delay={0.05}>
              <div className="h-full rounded-lg bg-surface/40 p-6 border border-gold/10 hover:border-gold/30 hover:bg-surface transition-all duration-300 flex flex-col justify-between text-center md:text-left">
                <div>
                  <div className="p-3 bg-gold/10 border border-gold/25 rounded w-fit mx-auto md:mx-0 mb-4 text-gold">
                    <FiHome size={20} />
                  </div>
                  <h3 className="text-base font-display font-medium text-ivory mb-2">
                    Commercial Leasing
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light mb-4">
                    Acquire premier retail shop fronts inside Fashion Avenue or central gallerias.
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedIntent('lease'); handleScrollTo('contact'); }}
                  className="w-full py-2.5 border border-gold/30 hover:border-gold rounded text-[10px] font-sans font-semibold uppercase tracking-widest text-gold transition-colors duration-300 focus-ring"
                >
                  Configure Lease &rarr;
                </button>
              </div>
            </ScrollReveal>

            {/* Cards 2: Sponsor */}
            <ScrollReveal delay={0.1}>
              <div className="h-full rounded-lg bg-surface/40 p-6 border border-gold/10 hover:border-gold/30 hover:bg-surface transition-all duration-300 flex flex-col justify-between text-center md:text-left">
                <div>
                  <div className="p-3 bg-gold/10 border border-gold/25 rounded w-fit mx-auto md:mx-0 mb-4 text-gold">
                    <FiAward size={20} />
                  </div>
                  <h3 className="text-base font-display font-medium text-ivory mb-2">
                    Brand Sponsorship
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light mb-4">
                    Secure continuous digital OOH screens and elite naming rights to anchors.
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedIntent('sponsor'); handleScrollTo('contact'); }}
                  className="w-full py-2.5 border border-gold/30 hover:border-gold rounded text-[10px] font-sans font-semibold uppercase tracking-widest text-gold transition-colors duration-300 focus-ring"
                >
                  Configure Sponsor &rarr;
                </button>
              </div>
            </ScrollReveal>

            {/* Cards 3: Event */}
            <ScrollReveal delay={0.15}>
              <div className="h-full rounded-lg bg-surface/40 p-6 border border-gold/10 hover:border-gold/30 hover:bg-surface transition-all duration-300 flex flex-col justify-between text-center md:text-left">
                <div>
                  <div className="p-3 bg-gold/10 border border-gold/25 rounded w-fit mx-auto md:mx-0 mb-4 text-gold">
                    <FiCalendar size={20} />
                  </div>
                  <h3 className="text-base font-display font-medium text-ivory mb-2">
                    Venue Bookings
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light mb-4">
                    Reserve Grand Atrium staging or outdoor Fountain bridge promenades.
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedIntent('venue'); handleScrollTo('contact'); }}
                  className="w-full py-2.5 border border-gold/30 hover:border-gold rounded text-[10px] font-sans font-semibold uppercase tracking-widest text-gold transition-colors duration-300 focus-ring"
                >
                  Configure Venue &rarr;
                </button>
              </div>
            </ScrollReveal>

          </div>

          {/* Centralized B2B Sandbox & Inquiry Registry Dashboard */}
          <ScrollReveal className="max-w-6xl mx-auto rounded-xl bg-surface border border-slate-200/80 p-6 md:p-10 shadow-sm">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Left Column: B2B Dynamic Document Preview */}
              <div className="lg:col-span-6 rounded-xl bg-slate-50 border border-slate-200/60 p-6 flex flex-col justify-between h-[450px] lg:h-auto overflow-y-auto">
                <div className="space-y-4">
                  {/* Document Header */}
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-widest text-gold font-bold block">
                        EMAAR PROPERTIES PJSC
                      </span>
                      <span className="text-[8px] text-text-secondary font-mono">
                        Ref: {getDraftReference()}
                      </span>
                    </div>
                    <FiFileText className="text-gold" size={18} />
                  </div>

                  {/* Document Content */}
                  <div className="text-left font-serif space-y-4 text-text-primary">
                    <h4 className="text-sm font-semibold tracking-wide border-b border-slate-100 pb-1 uppercase text-slate-800">
                      {getDraftTitle()}
                    </h4>
                    
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-light">
                      This formal document serves to register commercial interest in commercial space allocations or sponsorship networks at The Dubai Mall, Downtown Dubai.
                    </p>

                    {selectedIntent === 'lease' && (
                      <div className="bg-white/80 p-3 rounded-lg border border-slate-200/50 text-[10px] space-y-2 font-mono text-slate-700 leading-relaxed">
                        <div><strong>LESSEE PARTY:</strong> {formData.company || '[Configure Nominee Name]'}</div>
                        <div><strong>SPATIAL CORRIDOR:</strong> {selectedZone}</div>
                        <div><strong>ALLOCATION RANGE:</strong> {selectedSpaceSqft.toLocaleString()} Sq Ft</div>
                        <div><strong>TERM COMMITMENT:</strong> {leaseDurationYears} Years</div>
                        <div><strong>EST. INVESTMENT:</strong> AED {calculatedLeaseRate.toLocaleString()} / month</div>
                        <div><strong>ANNUAL VISUAL YIELD:</strong> {estimatedImpressions.toLocaleString()} views/yr</div>
                      </div>
                    )}

                    {selectedIntent === 'sponsor' && (
                      <div className="bg-white/80 p-3 rounded-lg border border-slate-200/50 text-[10px] space-y-2 font-mono text-slate-700 leading-relaxed">
                        <div><strong>PARTNER BRAND:</strong> {formData.company || '[Configure Brand Name]'}</div>
                        <div><strong>PARTNERSHIP LEVEL:</strong> {sponsorshipTier ? sponsorshipTier.toUpperCase() : 'NOT CONFIGURED (Refer to sponsorships slide)'}</div>
                        <div><strong>CPM AUDIENCE EXPOSURE:</strong> 10M+ raw monthly views</div>
                        <div><strong>BILLBOARD PLATFORM:</strong> Digital OOH loops + custom naming rights</div>
                      </div>
                    )}

                    {selectedIntent === 'venue' && (
                      <div className="bg-white/80 p-3 rounded-lg border border-slate-200/50 text-[10px] space-y-2 font-mono text-slate-700 leading-relaxed">
                        <div><strong>ORGANIZING CLIENT:</strong> {formData.company || '[Configure Corporate Client]'}</div>
                        <div><strong>ARENA LOCATION:</strong> {selectedZone}</div>
                        <div><strong>LOGISTICS:</strong> Staging footprint + raw power sync included</div>
                        <div><strong>TARGET WINDOW:</strong> Q3/Q4 presentation slots</div>
                      </div>
                    )}

                    <p className="text-[9px] text-text-secondary leading-normal font-sans font-light border-t border-slate-100 pt-3">
                      *Values are generated based on dynamic inputs from the Interactive presenter deck sandbox. Subject to final corporate signature loops.
                    </p>
                  </div>
                </div>

                {/* Digital Attestation Signature Checkbox */}
                <div 
                  onClick={() => setLoiAgreed(!loiAgreed)}
                  className="mt-6 p-3 rounded-lg border border-gold/20 bg-gold/5 flex items-center gap-3 cursor-pointer hover:bg-gold/10 select-none transition-all duration-300"
                >
                  <button type="button" className="text-gold focus:outline-none" aria-label={loiAgreed ? "Attestation agreed" : "Attestation not agreed"}>
                    {loiAgreed ? <FiCheckSquare size={18} /> : <FiSquare size={18} />}
                  </button>
                  <span className="text-[10px] font-sans font-medium text-slate-700 text-left leading-tight">
                    Digitally attest terms specified above as correct representation of commercial objectives.
                  </span>
                </div>
              </div>

              {/* Right Column: Inquiry Registration Form */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <h3 className="font-display text-base font-medium text-text-primary mb-6 text-center lg:text-left">
                  Inquiry Registry
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-rep" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                        Representative Name
                      </label>
                      <input
                        id="contact-rep"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Alastair Sterling"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-corp" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                        Corporate Nominee Company
                      </label>
                      <input
                        id="contact-corp"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Sterling Brands Group"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email-addr" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                        Corporate Email Address
                      </label>
                      <input
                        id="contact-email-addr"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. a.sterling@sterling.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-type-intent" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                        Primary B2B Objective
                      </label>
                      <select
                        id="contact-type-intent"
                        name="selectedIntent"
                        value={selectedIntent}
                        onChange={(e) => setSelectedIntent(e.target.value as any)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                      >
                        <option value="lease">Lease Space / Permanent Retail</option>
                        <option value="sponsor">Corporate Partnership / Digital OOH</option>
                        <option value="venue">Specialized Arena Venue Booking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message-body" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                      Project Concept Scope & Demands
                    </label>
                    <textarea
                      id="contact-message-body"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Specify fit-out designs, scheduling cycles, target demographics alignment, or unique requirements..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring resize-none placeholder-slate-400"
                    />
                  </div>

                  {/* Status Notifications */}
                  {status === 'success' && (
                    <div className="p-3 rounded border border-green-500/20 bg-green-500/10 text-xs text-green-400 font-sans text-center">
                      Success! Your candidacy has been secured in the commercial registry.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="p-3 rounded border border-red-500/20 bg-red-500/10 text-xs text-red-400 font-sans text-center">
                      Error registering data. Check your fields or config.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || (selectedIntent === 'lease' && !loiAgreed)}
                    className="w-full py-3.5 rounded bg-gold text-background text-xs uppercase tracking-[0.25em] font-sans font-bold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 focus-ring disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <FiSend size={13} />
                    {status === 'loading' ? 'Securing Lead Node...' : 'Initialize Emaar Commercial Call'}
                  </button>

                  {selectedIntent === 'lease' && !loiAgreed && (
                    <span className="block text-[8.5px] text-center text-red-500 font-light italic">
                      *Please attest the B2B Letter of Intent on the left to activate submission.
                    </span>
                  )}
                </form>
              </div>

            </div>

          </ScrollReveal>

          {/* Luxury Footer Corporate Details */}
          <footer className="mt-28 pt-8 border-t border-gold/10 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-text-secondary font-light">
              &copy; {new Date().getFullYear()} Emaar Properties PJSC &bull; All Rights Reserved.
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">
              DUBAI MALL INTERACTIVE PRESENTATION PORTAL
            </span>
          </footer>

        </div>
      </section>
    </>
  );
};

export default CTASystem;
