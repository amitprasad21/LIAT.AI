'use client';

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { luxuryBrands, premiumBrands, anchorStores, retailOpportunities } from '@/data/retailBrands';
import { FiChevronRight, FiMaximize2, FiShield, FiTrendingUp } from 'react-icons/fi';

export const RetailExperience: React.FC = () => {

  const handleScrollToLeasing = () => {
    window.location.hash = 'leasing';
  };

  const getOpportunityIcon = (title: string) => {
    if (title.includes('Flagship')) return <FiMaximize2 size={22} />;
    if (title.includes('Exclusivity')) return <FiShield size={22} />;
    return <FiTrendingUp size={22} />;
  };

  return (
    <section id="retail" className="py-24 bg-background border-b border-gold/10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <SectionHeader
          badge="02 / RETAIL PRESTIGE"
          title="1,300+ Brands. Zero Compromise."
          subtitle="The highest-performing commercial retail environment in existence."
          description="Dubai Mall convenes the most diverse portfolio of premier global brands under a single roof. Spanning three dedicated tiers of shopping space, it sets the international benchmark for retail footfall conversion and brand representation."
        />

        {/* Snapping Horizontal Showcases */}
        <div className="space-y-12 mb-24">
          
          {/* Row 1: Luxury Tier */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-sm font-sans uppercase tracking-[0.25em] text-gold font-semibold">
                Luxury Tier Precinct
              </h3>
              <span className="text-[10px] text-text-secondary uppercase tracking-widest hidden sm:inline">
                Scroll Horizontal &rarr;
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar">
              {luxuryBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-shrink-0 w-64 h-40 snap-start rounded bg-surface border border-gold/15 p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:border-gold/45"
                  style={{
                    boxShadow: 'inset 3px 3px 6px rgba(163, 177, 198, 0.25), inset -3px -3px 6px rgba(255, 255, 255, 0.7)'
                  }}
                >
                  {/* Brand Color Ambient Glow */}
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: brand.logoColor }}
                  />

                  {/* Brand Display Header */}
                  <span className="font-display text-xl tracking-widest text-ivory group-hover:text-gold transition-colors duration-300">
                    {brand.name}
                  </span>

                  {/* Dynamic Hover Spec Reveal */}
                  <div className="absolute inset-0 bg-surface/95 flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <span className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">
                      {brand.category}
                    </span>
                    <span className="text-xs text-text-secondary mb-3">
                      Flagship Footprint
                    </span>
                    <span className="text-sm font-display font-medium text-ivory">
                      {brand.storeSize}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-widest text-text-secondary">
                    Luxury Anchor
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Row 2: Premium Tier */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-sm font-sans uppercase tracking-[0.25em] text-gold font-semibold">
                Premium Tier Brands
              </h3>
              <span className="text-[10px] text-text-secondary uppercase tracking-widest hidden sm:inline">
                Scroll Horizontal &rarr;
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar">
              {premiumBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-shrink-0 w-64 h-40 snap-start rounded bg-surface border border-gold/15 p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:border-gold/45"
                  style={{
                    boxShadow: 'inset 3px 3px 6px rgba(163, 177, 198, 0.25), inset -3px -3px 6px rgba(255, 255, 255, 0.7)'
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: brand.logoColor }}
                  />

                  <span className="font-display text-xl tracking-wider text-ivory group-hover:text-gold transition-colors duration-300">
                    {brand.name}
                  </span>

                  <div className="absolute inset-0 bg-surface/95 flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <span className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">
                      {brand.category}
                    </span>
                    <span className="text-xs text-text-secondary mb-3">
                      Premium Layout
                    </span>
                    <span className="text-sm font-display font-medium text-ivory">
                      {brand.storeSize}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-widest text-text-secondary">
                    Premium Category
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Row 3: Anchor Department Stores */}
          <ScrollReveal delay={0.3}>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-sm font-sans uppercase tracking-[0.25em] text-gold font-semibold">
                Elite Anchor Stores
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {anchorStores.map((brand) => (
                <div
                  key={brand.id}
                  className="rounded bg-surface border border-gold/15 p-8 flex flex-col justify-between h-48 relative overflow-hidden group transition-all duration-500 hover:border-gold/40 hover:-translate-y-1"
                >
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: brand.logoColor }}
                  />
                  
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded bg-gold/10 border border-gold/20 text-[9px] uppercase tracking-widest text-gold mb-4">
                      Mega Anchor
                    </span>
                    <h4 className="font-display text-2xl font-semibold tracking-wide text-ivory mb-2 group-hover:text-gold-light transition-colors duration-300">
                      {brand.name}
                    </h4>
                    <p className="text-xs text-text-secondary font-sans font-light">
                      {brand.category}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between mt-6">
                    <span className="text-[10px] uppercase tracking-widest text-text-secondary">
                      Footprint Size
                    </span>
                    <span className="text-sm font-sans font-semibold text-gold-light">
                      {brand.storeSize}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Opportunity cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {retailOpportunities.map((opp, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="h-full rounded-lg bg-surface/50 p-8 border border-gold/10 hover:border-gold/30 hover:bg-surface transition-all duration-300 flex flex-col">
                <div className="p-3.5 bg-gold/15 rounded border border-gold/20 text-gold w-fit mb-6">
                  {getOpportunityIcon(opp.title)}
                </div>
                <h4 className="text-lg font-display font-medium text-ivory mb-3">
                  {opp.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed font-sans font-light flex-grow">
                  {opp.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA scroll action */}
        <ScrollReveal className="text-center" delay={0.2}>
          <button
            onClick={handleScrollToLeasing}
            className="inline-flex items-center gap-2 group px-8 py-4 rounded bg-transparent border border-gold text-xs uppercase tracking-[0.2em] font-sans font-bold text-gold hover:bg-gold hover:text-background transition-all duration-500 shadow-[0_4px_25px_rgba(201,168,76,0.05)] focus-ring"
          >
            Explore Leasing Space
            <FiChevronRight className="transform group-hover:translate-x-1.5 transition-transform duration-300" size={16} />
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
