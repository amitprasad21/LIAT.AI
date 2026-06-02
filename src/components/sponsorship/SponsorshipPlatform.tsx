'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { sponsorshipPackages, sponsorshipReachStats, activationTypes } from '@/data/sponsorshipData';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { FiCheck, FiSend, FiAward } from 'react-icons/fi';

export const SponsorshipPlatform: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('PLATINUM');
  const [formData, setFormData] = useState({
    brandName: '',
    contactName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          package_tier: selectedTier,
          brand_name: formData.brandName,
          contact_name: formData.contactName,
          email: formData.email,
          message: formData.message,
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
      console.error('Error submitting sponsorship inquiry:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="sponsorship"
      className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-background border-t border-gold/10 overflow-hidden"
      aria-label="Corporate Sponsorship Platform"
    >
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {sponsorshipPackages.slice(0, 3).map((pkg, idx) => (
            <ScrollReveal key={pkg.id} delay={idx * 0.1}>
              <div className="h-full rounded-lg bg-surface/50 p-8 border border-gold/10 hover:border-gold/30 hover:bg-surface hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded bg-gold/10 border border-gold/25 text-[10px] uppercase tracking-widest text-gold font-bold">
                      {pkg.tier}
                    </span>
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest">
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-semibold text-ivory mb-2">
                    {pkg.tier} Suite
                  </h3>
                  
                  <span className="block text-xl font-sans font-semibold text-gold-light tracking-tight mb-8">
                    {pkg.price}
                  </span>

                  {/* Bullet Inclusions */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.inclusions.map((inc, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2.5 text-xs text-text-secondary font-sans font-light leading-relaxed">
                        <FiCheck className="text-gold flex-shrink-0 mt-0.5" size={13} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedTier(pkg.tier);
                    const el = document.getElementById('sponsorship-inquiry-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full mt-6 py-3.5 border border-gold hover:bg-gold hover:text-background rounded text-[10px] font-sans font-semibold uppercase tracking-widest text-gold transition-all duration-350 focus-ring"
                >
                  Configure package &rarr;
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
                <div className="h-full rounded bg-surface/30 p-6 border border-gold/10 hover:border-gold/30 hover:bg-surface/50 text-center transition-all duration-300">
                  <span className="block text-xs uppercase tracking-widest text-gold font-bold mb-2">
                    {act.name}
                  </span>
                  <p className="text-[10px] text-text-secondary leading-relaxed font-sans font-light">
                    {act.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-xs italic text-text-secondary mt-8 font-accent">
            * Custom tailored sponsorship packages are available for global and seasonal multi-channel brand campaigns.
          </p>
        </div>

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
                  className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
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
                  className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
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
                  className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                />
              </div>

              <div>
                <label htmlFor="selectedTier" className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                  Select Requested Tier
                </label>
                <select
                  id="selectedTier"
                  name="selectedTier"
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                >
                  <option value="PLATINUM">PLATINUM ($500,000 / yr)</option>
                  <option value="GOLD">GOLD ($250,000 / yr)</option>
                  <option value="SILVER">SILVER ($100,000 / yr)</option>
                  <option value="EVENT">SHORT-TERM EVENT ($25K–$75K)</option>
                </select>
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
                className="w-full px-4 py-3 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring resize-none placeholder-slate-400"
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
