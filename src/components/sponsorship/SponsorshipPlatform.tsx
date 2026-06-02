'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useDeck } from '@/context/DeckContext';
import { sponsorshipPackages, sponsorshipReachStats, activationTypes } from '@/data/sponsorshipData';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { FiCheck, FiSend, FiAward } from 'react-icons/fi';

const SUITE_IMAGES: Record<string, string> = {
  platinum: '/images/premium_showroom.png', // AI Premium Showroom
  gold: '/images/luxury_watch_salon.png', // AI Luxury Watch Salon
  silver: '/images/tech_flagship_store.png', // AI Tech Flagship Store
  event: '/images/runway_event_setup.png' // AI Runway Event Setup
};

const ACTIVATION_IMAGES: Record<string, string> = {
  'Pop-Up Zone': '/images/premium_showroom.png', // AI Showroom
  'Digital OOH': '/images/holographic_ooh_ads.png', // AI Holographic Ads
  'Social Integration': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80', // Social/smartphone
  'In-Store Showcase': '/images/luxury_jewelry.png', // AI Luxury Jewelry
  'Event Partnerships': '/images/grand_atrium_setup.png', // AI Grand Atrium Event
  'Sampling Campaigns': 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=600&q=80' // Customer/Sampling
};

export const SponsorshipPlatform: React.FC = () => {
  const {
    brandName,
    sponsorshipTier,
    setSponsorshipTier
  } = useDeck();

  const [formData, setFormData] = useState({
    brandName: brandName || '',
    contactName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [prevBrandName, setPrevBrandName] = useState(brandName);

  // Sync brandName into state when loaded from gateway/leasing sandbox
  if (brandName !== prevBrandName) {
    setPrevBrandName(brandName);
    if (brandName) {
      setFormData(prev => ({ ...prev, brandName }));
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brandName || !formData.contactName || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase.from('sponsorship_enquiries').insert([
        {
          package_tier: sponsorshipTier,
          brand_name: formData.brandName,
          contact_name: formData.contactName,
          email: formData.email,
          message: `${formData.message}\n\n[Active Sponsorship Tier: ${sponsorshipTier.toUpperCase()}]`,
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        brandName: '',
        contactName: '',
        email: '',
        message: ''
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Error registering sponsorship inquiry:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="sponsorship"
      className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-transparent border-t border-white/50 overflow-hidden"
      aria-label="Sponsorship & Brand Partnership Matrix"
    >
      {/* Background Accents */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-crimson/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badge="07 / SPONSORSHIP PORTFOLIO"
          title="100 Million Moments to Own Your Brand Story."
          subtitle="Align your brand presence with the world's most high-volume lifestyle platform."
          description="Establish massive, high-frequency impressions across continuous physical OOH corridors, naming integrations, digital media touchpoints, and exclusive activations designed to engage high-net-worth global shoppers."
        />

        {/* Audience Reach Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 max-w-5xl mx-auto p-8 rounded-lg bg-surface border border-gold/15">
          {sponsorshipReachStats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05} className="text-center">
              <span className="block text-2xl md:text-3xl font-display font-semibold text-gold-light gold-text-gradient mb-1">
                {stat.value}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-text-secondary">
                {stat.label}
              </span>
            </ScrollReveal>
          ))}
        </div>

        {/* Sponsorship Package Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 items-stretch">
          {sponsorshipPackages.map((pkg, idx) => (
            <ScrollReveal key={pkg.id} delay={idx * 0.1}>
              <div className="h-full rounded-lg border border-black/5 p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:border-gold/50 shadow-sm min-h-[460px]">
                {/* Clear Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                  style={{ backgroundImage: `url(${SUITE_IMAGES[pkg.id] || ''})` }}
                />

                {/* Dark Vignette Overlay for Typography Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20 z-10 pointer-events-none" />

                <div className="z-20">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded bg-gold/25 border border-gold/45 text-[10px] uppercase tracking-widest text-gold-light font-bold">
                      {pkg.tier}
                    </span>
                    <span className="text-[10px] text-slate-300 uppercase tracking-widest">
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-white mb-2">
                    {pkg.tier} {pkg.id === 'event' ? '' : 'Suite'}
                  </h3>
                  
                  <span className="block text-lg font-sans font-semibold text-gold-light tracking-tight mb-8">
                    {pkg.price}
                  </span>

                  {/* Bullet Inclusions */}
                  <ul className="space-y-3 mb-6">
                    {pkg.inclusions.map((inc, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-200 font-sans font-light leading-relaxed">
                        <FiCheck className="text-gold-light flex-shrink-0 mt-0.5" size={13} />
                        <span className="line-clamp-4">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSponsorshipTier(pkg.tier.toLowerCase() as 'platinum' | 'gold' | 'silver' | 'event' | '');
                    const el = document.getElementById('sponsorship-inquiry-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={cn(
                    "w-full mt-6 py-3.5 border rounded text-[10px] font-sans font-semibold uppercase tracking-widest transition-all duration-350 focus-ring z-20",
                    sponsorshipTier === pkg.tier.toLowerCase()
                      ? "bg-gold text-background border-gold"
                      : "border-gold hover:bg-gold hover:text-background text-gold"
                  )}
                >
                  {sponsorshipTier === pkg.tier.toLowerCase() ? 'Package Configured ✓' : 'Configure package'}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Activation Gallery Cards */}
        <div className="mb-24">
          <h3 className="text-center font-display text-xl text-gold-light uppercase tracking-wider mb-10">
            Activation Galleries
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {activationTypes.map((act, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <div className="h-48 rounded border border-black/5 p-4 flex flex-col justify-end relative overflow-hidden group transition-all duration-500 hover:border-gold/50 shadow-sm text-left">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                    style={{ backgroundImage: `url(${ACTIVATION_IMAGES[act.name] || ''})` }}
                  />
                  {/* Dark Vignette Overlay for Typography Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20 z-10 pointer-events-none" />
                  
                  <div className="z-20 relative">
                    <span className="block text-[11px] uppercase tracking-widest text-gold-light font-bold mb-1.5 group-hover:text-gold transition-colors duration-300">
                      {act.name}
                    </span>
                    <p className="text-[9.5px] text-slate-300 leading-normal font-sans font-light line-clamp-4">
                      {act.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-xs italic text-text-secondary mt-8 font-accent">
            * Custom tailored sponsorship packages are available for global and seasonal multi-channel brand campaigns.
          </p>
        </div>

        {/* AI-Imagined Holographic OOH Campaign Banner */}
        <ScrollReveal className="mb-16 max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gold/15 bg-surface h-60 relative group shadow-sm">
            <img
              src="/images/holographic_ooh_ads.png"
              alt="AI Holographic OOH Display"
              className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-[1.02] transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-8 z-20 max-w-md text-white">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-light font-bold mb-2">
                AI ADVANCED MEDIA
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">
                Holographic OOH Activations
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                Secure next-generation 3D holographic displays in main pedestrian nodes to achieve high-attention brand dominance.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Inline Booking Request Form */}
        <ScrollReveal id="sponsorship-inquiry-form" className="max-w-3xl mx-auto rounded-lg bg-surface border border-gold/15 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="p-3 bg-gold/15 rounded-full border border-gold/20 text-gold w-fit mx-auto mb-4">
              <FiAward size={24} />
            </div>
            <h3 className="text-2xl font-display font-medium text-ivory">
              Sponsorship Alignment Configurator
            </h3>
            <p className="text-xs text-text-secondary mt-2">
              Submit your brand coordinates and one of our directors will schedule a confidential alignment strategy call.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="brandName" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                  Brand / Corporate Name
                </label>
                <input
                  id="brandName"
                  name="brandName"
                  type="text"
                  required
                  value={formData.brandName}
                  onChange={handleInputChange}
                  placeholder="e.g. Chanel Corporation"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                  Executive Contact Name
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="e.g. Charlotte Dubois"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                  Corporate Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. c.dubois@chanel.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                />
              </div>

              <div>
                <label htmlFor="selectedTierSelect" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                  Select Requested Tier
                </label>
                <div className="w-full px-4 py-3 bg-slate-100 rounded text-xs text-text-secondary border border-slate-200/40 select-none">
                  {(sponsorshipTier || 'platinum').toUpperCase()} PACKAGE
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                Activation Objectives & Scope Summary
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Outline details on desired digital OOH campaign timing, preferred locations, or event activations..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring resize-none placeholder-slate-400"
              />
            </div>

            {/* Submission Status Alerts */}
            {status === 'success' && (
              <div className="p-4 rounded border border-green-500/20 bg-green-500/10 text-xs text-green-400 font-sans text-center">
                Success! Your sponsorship configuration has been saved. Our director will review and connect shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 rounded border border-red-500/20 bg-red-500/10 text-xs text-red-400 font-sans text-center">
                Submission error. Please verify your variables or retry in a few moments.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded bg-gold text-background text-xs uppercase tracking-[0.25em] font-sans font-bold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 focus-ring disabled:opacity-50"
            >
              {status === 'loading' ? (
                'Synchronizing with Database...'
              ) : (
                <>
                  Submit Sponsorship Request
                  <FiSend size={13} />
                </>
              )}
            </button>
          </form>
        </ScrollReveal>

      </div>
    </section>
  );
};
