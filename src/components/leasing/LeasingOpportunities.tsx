'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useDeck, ZONE_METRICS } from '@/context/DeckContext';
import { keyLeasingTerms } from '@/data/leasingData';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { FiSend, FiInfo, FiSliders, FiActivity, FiMapPin } from 'react-icons/fi';

export const LeasingOpportunities: React.FC = () => {
  const {
    brandName,
    setBrandName,
    brandCategory,
    setBrandCategory,
    selectedZone,
    setSelectedZone,
    selectedSpaceSqft,
    setSelectedSpaceSqft,
    leaseDurationYears,
    setLeaseDurationYears,
    calculatedLeaseRate,
    estimatedImpressions
  } = useDeck();

  const [formData, setFormData] = useState({
    name: '',
    company: brandName || '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [prevBrandName, setPrevBrandName] = useState(brandName);

  // Synchronize form text fields when brand name changes
  if (brandName !== prevBrandName) {
    setPrevBrandName(brandName);
    if (brandName) {
      setFormData(prev => ({ ...prev, company: brandName }));
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase.from('leasing_inquiries').insert([
        {
          name: formData.name,
          company: formData.company,
          category: brandCategory,
          preferred_zone: selectedZone,
          sqft_requirement: `${selectedSpaceSqft} sq ft`,
          message: `${formData.message}\n\n[Sandbox Configuration: ${leaseDurationYears} years, Est. Rent: AED ${calculatedLeaseRate.toLocaleString()}/mo, Est. Annual Impressions: ${estimatedImpressions.toLocaleString()}]`,
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        name: '',
        company: '',
        message: ''
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Error submitting leasing inquiry:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Helper to generate dynamic AI Matching insights on the fly
  const getAIMatchScore = (zoneName: string) => {
    const metrics = ZONE_METRICS[zoneName as keyof typeof ZONE_METRICS];
    if (!metrics) return 70;

    // Direct mapping match gives higher score
    if (metrics.categoryMatch === brandCategory) return 98;
    
    // Luxury category likes Fashion Avenue & Grand Atrium
    if (brandCategory === 'luxury-fashion' && (zoneName.includes('Fashion') || zoneName.includes('Grand Atrium'))) return 95;
    
    // Food category likes Waterfront & Atrium Walkways
    if (brandCategory === 'fine-dining' && zoneName.includes('Waterfront')) return 97;
    if (brandCategory === 'cafes-beverages' && zoneName.includes('Walkways')) return 96;

    return 84; // baseline score for decent placement
  };

  const getAIMatchPitch = () => {
    const score = getAIMatchScore(selectedZone);
    const brandLabel = brandName || 'Your Brand';
    
    if (score >= 95) {
      return `[AI Matching Signal] Highly Recommended: Placement of ${brandLabel} in the "${selectedZone}" yields an optimal synergy rating of ${score}%. This zone aligns precisely with target shopper clusters, capturing high HNW conversion rates (${ZONE_METRICS[selectedZone as keyof typeof ZONE_METRICS]?.hnwPct}% HNWI density) and delivering maximum average transaction velocities.`;
    }
    return `[AI Matching Signal] Qualified: Placement of ${brandLabel} in the "${selectedZone}" is rated at ${score}% suitability. This zone offers strong baseline footfall of ${(ZONE_METRICS[selectedZone as keyof typeof ZONE_METRICS]?.footfall / 1000000).toFixed(1)}M annually, making it a viable alternative allocation for high-visibility brand exposure.`;
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
          title="Leasing Sandbox"
          subtitle="Acquire physical retail real estate footprints inside the world's most lucrative mall."
          description="Do not guess your placement. Use our interactive B2B Sandbox to model target demographics, map physical zones, and compute estimated lease rates based on space size and duration."
        />

        {/* Tabbed interface layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: B2B Commercial Sandbox */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Slide Subheader */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
                1. INTERACTIVE DESIGN PORTAL
              </h3>
            </div>

            {/* Config Card: Brand Profile */}
            <div className="rounded-xl p-6 bg-surface border border-slate-200/80 shadow-sm">
              <span className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-4 flex items-center gap-1.5">
                <FiActivity size={12} />
                Brand Profiler Configuration
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sandbox-brand" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Brand / Nominee Name
                  </label>
                  <input
                    id="sandbox-brand"
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Saint Laurent"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                  />
                </div>

                <div>
                  <label htmlFor="sandbox-cat" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Commercial Category
                  </label>
                  <select
                    id="sandbox-cat"
                    value={brandCategory}
                    onChange={(e) => setBrandCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
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
              </div>
            </div>

            {/* Config Card: Interactive Placement Map Grid */}
            <div className="rounded-xl p-6 bg-surface border border-slate-200/80 shadow-sm">
              <span className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-4 flex items-center gap-1.5">
                <FiMapPin size={12} />
                Select Corridor Placement (Interactive Spatial Map)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.keys(ZONE_METRICS).map((zoneName) => {
                  const data = ZONE_METRICS[zoneName as keyof typeof ZONE_METRICS];
                  const score = getAIMatchScore(zoneName);
                  const isSelected = selectedZone === zoneName;

                  return (
                    <div
                      key={zoneName}
                      onClick={() => setSelectedZone(zoneName)}
                      className={cn(
                        'p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 flex flex-col justify-between h-28 relative overflow-hidden',
                        isSelected 
                          ? 'bg-slate-50 border-gold shadow-md' 
                          : 'bg-transparent border-slate-200 hover:border-gold/30 hover:bg-slate-50/30'
                      )}
                    >
                      <div className="flex justify-between items-start gap-1 z-10">
                        <span className="text-[10px] font-sans font-medium text-text-primary leading-tight max-w-[70%]">
                          {zoneName}
                        </span>
                        <span className={cn(
                          'text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider',
                          score >= 95 ? 'bg-green-500/10 text-green-600 border border-green-500/25' : 'bg-gold/10 text-gold border border-gold/25'
                        )}>
                          {score}% AI Match
                        </span>
                      </div>

                      <div className="flex justify-between items-end z-10 text-[9px] text-text-secondary font-sans font-light mt-2 border-t border-slate-100 pt-1.5">
                        <span>Traffic: {(data.footfall / 1000000).toFixed(1)}M/yr</span>
                        <span>HNW Index: {data.hnwPct}%</span>
                      </div>

                      {/* Small subtle indicator dots */}
                      {isSelected && (
                        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-gold rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Config Card: ROI Sliders */}
            <div className="rounded-xl p-6 bg-surface border border-slate-200/80 shadow-sm space-y-6">
              <span className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-2 flex items-center gap-1.5">
                <FiSliders size={12} />
                Financial ROI & Exposure Simulator
              </span>

              {/* Slider 1: Space Size */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="sqft-slider" className="text-[9px] uppercase tracking-wider text-text-secondary font-medium">
                    Requested Footprint (Square Footage)
                  </label>
                  <span className="text-xs font-semibold text-gold">{selectedSpaceSqft.toLocaleString()} Sq Ft</span>
                </div>
                <input
                  id="sqft-slider"
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={selectedSpaceSqft}
                  onChange={(e) => setSelectedSpaceSqft(parseInt(e.target.value))}
                  className="w-full accent-gold bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-slate-400 mt-1">
                  <span>500 sq ft (Pop-up size)</span>
                  <span>10,000 sq ft (Megastore anchor)</span>
                </div>
              </div>

              {/* Slider 2: Lease Duration */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="duration-slider" className="text-[9px] uppercase tracking-wider text-text-secondary font-medium">
                    Lease Commitment Period
                  </label>
                  <span className="text-xs font-semibold text-gold">{leaseDurationYears} Year{leaseDurationYears > 1 ? 's' : ''}</span>
                </div>
                <input
                  id="duration-slider"
                  type="range"
                  min="1"
                  max="5"
                  step="2"
                  value={leaseDurationYears}
                  onChange={(e) => setLeaseDurationYears(parseInt(e.target.value))}
                  className="w-full accent-gold bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-slate-400 mt-1">
                  <span>1 Year (Short term trial)</span>
                  <span>5 Years (Standard Flagship + 12% Disc.)</span>
                </div>
              </div>

              {/* Simulation Result Panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/50">
                  <span className="block text-[8px] uppercase tracking-wider text-text-secondary mb-1 font-semibold">
                    Estimated Lease Investment
                  </span>
                  <span className="text-base font-display font-bold text-text-primary">
                    AED {calculatedLeaseRate.toLocaleString()} <span className="text-[10px] text-text-secondary font-sans font-normal">/ month</span>
                  </span>
                  <span className="block text-[8px] text-slate-400 mt-0.5">
                    Est. ${(calculatedLeaseRate / 3.67).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD / month
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/50">
                  <span className="block text-[8px] uppercase tracking-wider text-text-secondary mb-1 font-semibold">
                    Target Annual Exposure Yield
                  </span>
                  <span className="text-base font-display font-bold text-gold">
                    {estimatedImpressions.toLocaleString()} <span className="text-[10px] text-text-secondary font-sans font-normal">impressions / yr</span>
                  </span>
                  <span className="block text-[8px] text-slate-400 mt-0.5">
                    Based on corridor catchment velocities
                  </span>
                </div>
              </div>

              {/* Dynamic AI Match Pitch */}
              <div className="p-4 rounded-xl bg-gold/5 border border-gold/15 flex items-start gap-2.5">
                <FiInfo className="text-gold flex-shrink-0 mt-0.5" size={14} />
                <p className="text-[10px] font-sans text-text-secondary leading-relaxed font-light italic">
                  {getAIMatchPitch()}
                </p>
              </div>

            </div>

            {/* Key Lease Terms Checklist */}
            <div className="p-4 rounded bg-slate-50/50 border border-white/50 shadow-[4px_4px_10px_rgba(163,177,198,0.25)] flex items-start gap-3">
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
          <div className="lg:col-span-5">
            
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
                2. REGISTRATION INQUIRY
              </h3>
            </div>

            {/* AI-Generated Showroom Card */}
            <ScrollReveal className="rounded-xl overflow-hidden border border-gold/15 mb-4 bg-surface h-40 relative shadow-sm">
              <img
                src="/images/leasing_showroom.png"
                alt="Emaar Leasing Showroom"
                className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 text-[8.5px] uppercase tracking-[0.25em] text-white/85 font-sans font-bold">
                AI Showroom Concept &bull; Spatial Design
              </span>
            </ScrollReveal>

            <ScrollReveal className="rounded-xl bg-surface border border-slate-200/80 p-8 shadow-sm">
              <h3 className="font-display text-lg font-medium text-text-primary mb-6 text-center lg:text-left">
                Register Leasing Candidacy
              </h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="candidacy-name" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Full Representative Name
                  </label>
                  <input
                    id="candidacy-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Jean-Luc Godard"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="candidacy-company" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Company / Organization Name
                  </label>
                  <input
                    id="candidacy-company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Dior Heritage Ltd."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                      Retail Category
                    </label>
                    <div className="w-full px-4 py-2.5 bg-slate-100 rounded text-xs text-text-secondary border border-slate-200/40 select-none">
                      {brandCategory.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                      Corridor Allocation
                    </label>
                    <div className="w-full px-4 py-2.5 bg-slate-100 rounded text-xs text-text-secondary border border-slate-200/40 select-none overflow-hidden text-ellipsis whitespace-nowrap">
                      {selectedZone}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Requested Size Constraint
                  </label>
                  <div className="w-full px-4 py-2.5 bg-slate-100 rounded text-xs text-text-secondary border border-slate-200/40 select-none">
                    {selectedSpaceSqft.toLocaleString()} Sq Ft
                  </div>
                </div>

                <div>
                  <label htmlFor="candidacy-message" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Executive Summary of Retail Concept
                  </label>
                  <textarea
                    id="candidacy-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your brand's retail presence, architectural design themes, existing global footprints, and estimated target launch cycles..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring resize-none placeholder-slate-400"
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
                  className="w-full py-3 rounded bg-gold text-background text-xs uppercase tracking-[0.2em] font-sans font-bold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 focus-ring disabled:opacity-50"
                >
                  <FiSend size={12} />
                  {status === 'loading' ? 'Submitting Application...' : 'Register Leasing Candidacy'}
                </button>
              </form>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
