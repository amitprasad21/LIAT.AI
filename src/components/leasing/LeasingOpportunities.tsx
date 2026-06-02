'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { leasingTerms, keyLeasingTerms } from '@/data/leasingData';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { FiMaximize, FiCheck, FiSend, FiInfo } from 'react-icons/fi';

export const LeasingOpportunities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('luxury-flagship');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    category: 'luxury-fashion',
    preferredZone: 'Fashion Avenue Ground Floor',
    sqftRequirement: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const activeTerm = leasingTerms.find((t) => t.id === activeTab) || leasingTerms[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.sqftRequirement || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase.from('leasing_inquiries').insert([
        {
          name: formData.name,
          company: formData.company,
          category: formData.category,
          preferred_zone: formData.preferredZone,
          sqft_requirement: formData.sqftRequirement,
          message: formData.message,
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        name: '',
        company: '',
        category: 'luxury-fashion',
        preferredZone: 'Fashion Avenue Ground Floor',
        sqftRequirement: '',
        message: ''
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Error submitting leasing inquiry:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="leasing"
      className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-transparent border-t border-white/50 overflow-hidden"
      aria-label="Retail Space Leasing Opportunities"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badge="08 / RETAIL LEASING"
          title="Leasing Opportunities"
          subtitle="Acquire physical real estate footprints inside the world's most lucrative mall."
          description="We offer highly flexible commercial lease structures spanning elite luxury flagship fronts, premium modern high-streets, specialized F&B waterfront zones, and short-term experiential pop-up kiosks."
        />

        {/* Tabbed interface layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Premium Tabs & Spec Grid */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Category Tab Buttons */}
            <div className="flex gap-2 border-b border-gold/15 pb-4 overflow-x-auto no-scrollbar">
              {leasingTerms.map((term) => (
                <button
                  key={term.id}
                  onClick={() => setActiveTab(term.id)}
                  className={cn(
                    'px-4 py-2.5 rounded text-xs uppercase tracking-widest font-semibold border transition-all duration-300 shrink-0 focus-ring',
                    activeTab === term.id
                      ? 'bg-gold text-background border-gold'
                      : 'bg-transparent border-gold/10 text-text-secondary hover:text-gold hover:border-gold/30'
                  )}
                >
                  {term.tierName}
                </button>
              ))}
            </div>

            {/* Selected Category Details Card */}
            <ScrollReveal key={activeTerm.id} delay={0.05} className="rounded-lg bg-surface p-8 border border-gold/15 flex flex-col justify-between">
              <div>
                {/* Header status badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-display font-medium text-ivory">
                    {activeTerm.tierName} Specifications
                  </span>
                  
                  <span className={cn(
                    'text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border',
                    activeTerm.status === 'Limited' && 'bg-crimson/10 border-crimson/30 text-red-400',
                    activeTerm.status === 'Available' && 'bg-gold/10 border-gold/35 text-gold-light',
                    activeTerm.status === 'Enquire' && 'bg-white/5 border-white/10 text-text-secondary'
                  )}>
                    {activeTerm.status} Status
                  </span>
                </div>

                {/* Price and size highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded bg-[#E4EBF5] neu-inset border border-white/60">
                    <span className="block text-[8px] uppercase tracking-wider text-text-secondary mb-1">
                      Target Investment Rates
                    </span>
                    <span className="text-sm sm:text-base font-display font-semibold text-gold">
                      {activeTerm.priceRange}
                    </span>
                  </div>
                  <div className="p-4 rounded bg-[#E4EBF5] neu-inset border border-white/60">
                    <span className="block text-[8px] uppercase tracking-wider text-text-secondary mb-1">
                      Footprint Window Size
                    </span>
                    <span className="text-sm sm:text-base font-display font-semibold text-gold">
                      {activeTerm.sizeRange}
                    </span>
                  </div>
                </div>

                {/* Target Profiles */}
                <div className="mb-6">
                  <span className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2.5 font-medium">
                    Target Tenant Profile
                  </span>
                  <div className="space-y-1.5">
                    {activeTerm.profiles.map((profile, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-text-secondary font-sans font-light">
                        <FiCheck className="text-gold flex-shrink-0" size={12} />
                        <span>{profile}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Designated Zones */}
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-text-secondary mb-2.5 font-medium">
                    Pre-designated Mall Zones
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTerm.zones.map((zone, zIdx) => (
                      <span key={zIdx} className="text-[10px] font-sans px-2.5 py-1 rounded bg-[#E4EBF5] neu-inset border border-white/60 text-gold font-medium">
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Key Lease Terms Checklist */}
            <div className="p-4 rounded bg-[#E4EBF5]/50 border border-white/50 shadow-[4px_4px_10px_rgba(163,177,198,0.25)] flex items-start gap-3">
              <FiInfo className="text-gold flex-shrink-0 mt-0.5" size={16} />
              <div className="text-[11px] font-sans text-text-secondary font-light leading-relaxed">
                <span className="font-semibold text-gold uppercase tracking-wider block mb-1">Key Contractual Frameworks</span>
                - Lease Terms: {keyLeasingTerms.duration} <br />
                - Support Packages: {keyLeasingTerms.fitoutContribution} &bull; {keyLeasingTerms.marketingSupport} <br />
                - Protections: {keyLeasingTerms.exclusivityZones}
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-6">
            <ScrollReveal className="rounded-lg bg-surface border border-gold/15 p-8 md:p-10">
              <h3 className="font-display text-xl font-medium text-ivory mb-6 text-center lg:text-left">
                Register Leasing Candidacy
              </h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                      Full Legal Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Jean-Luc Godard"
                      className="w-full px-4 py-2.5 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                      Company / Organization Name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Dior Heritage Ltd."
                      className="w-full px-4 py-2.5 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                      Retail Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                    >
                      <option value="luxury-fashion">Luxury Fashion & Couture</option>
                      <option value="premium-apparel">Premium Apparel & Accessories</option>
                      <option value="cosmetics-beauty">Cosmetics & Fragrances</option>
                      <option value="fine-dining">Michelin Fine Dining</option>
                      <option value="cafes-beverages">Bespoke Cafes & Beverages</option>
                      <option value="consumer-tech">Consumer Technology</option>
                      <option value="kiosk-accessories">Specialty Kiosk & Pop-Up</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredZone" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                      Preferred Mall Corridor Zone
                    </label>
                    <select
                      id="preferredZone"
                      name="preferredZone"
                      value={formData.preferredZone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                    >
                      <option value="Fashion Avenue Ground Floor">Fashion Avenue Ground Floor</option>
                      <option value="The Grand Atrium Premium Axis">The Grand Atrium Premium Axis</option>
                      <option value="Central Galleria Corridors">Central Galleria Corridors</option>
                      <option value="The Village (Urban Lifestyle)">The Village (Urban Lifestyle)</option>
                      <option value="Waterfront Promenade Terrace">Waterfront Promenade Terrace</option>
                      <option value="Atrium Pedestrian Walkways">Atrium Pedestrian Walkways</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="sqftRequirement" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Requested Square Footage Requirement
                  </label>
                  <input
                    id="sqftRequirement"
                    name="sqftRequirement"
                    type="text"
                    required
                    value={formData.sqftRequirement}
                    onChange={handleInputChange}
                    placeholder="e.g. 4,500 sq ft"
                    className="w-full px-4 py-2.5 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Executive Summary of Retail Concept
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your brand's retail presence, architectural design themes, existing global footprints, and estimated target launch cycles..."
                    className="w-full px-4 py-2.5 bg-[#E4EBF5] neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring resize-none placeholder-slate-400"
                  />
                </div>

                {/* Form status notices */}
                {status === 'success' && (
                  <div className="p-3 rounded border border-green-500/20 bg-green-500/10 text-xs text-green-400 font-sans text-center">
                    Success! Your retail inquiry has been filed directly with our leasing portfolio registry.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-3 rounded border border-red-500/20 bg-red-500/10 text-xs text-red-400 font-sans text-center">
                    Submission error. Please check your credentials or configuration.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-4 py-3.5 rounded bg-gold text-background text-xs uppercase tracking-[0.25em] font-sans font-bold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 focus-ring disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    'Saving Retail Inquiry...'
                  ) : (
                    <>
                      File Retail Space Request
                      <FiSend size={12} />
                    </>
                  )}
                </button>
              </form>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
export default LeasingOpportunities;
