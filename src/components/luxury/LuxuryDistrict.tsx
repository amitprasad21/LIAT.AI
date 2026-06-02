'use client';

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { luxuryDistrictData } from '@/data/luxuryBrands';

export const LuxuryDistrict: React.FC = () => {
  const { pullQuote, luxuryStats, highlights } = luxuryDistrictData;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <SectionHeader
          badge="03 / LUXURY WORLD"
          title="Where the World's Most Coveted Brands Call Home"
          subtitle="The global benchmark of haute couture and fine jewelry retail velocity."
        />

        {/* Large Cinematic Editorial Quote Block */}
        <ScrollReveal delay={0.1} className="mb-24 text-center max-w-5xl mx-auto">
          <blockquote className="border-y border-gold/20 py-12 px-4 md:px-12 bg-surface/20">
            <p className="text-3xl md:text-4xl lg:text-5xl font-accent font-light italic leading-relaxed text-gold-light/95">
              &ldquo;{pullQuote}&rdquo;
            </p>
            <footer className="mt-6 text-xs uppercase tracking-[0.3em] text-text-secondary font-sans font-light">
              Executive Director of Luxury Collections &bull; Emaar Properties
            </footer>
          </blockquote>
        </ScrollReveal>

        {/* Two-Column Grid: Large Stat Callouts & Stacked highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Prestigious Stat Callout Box */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <ScrollReveal className="bg-surface border border-gold/15 rounded-lg p-10 flex flex-col justify-between h-full hover:border-gold/30 transition-colors duration-500">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium block mb-6">
                  PRESTIGE BENCHMARK
                </span>
                
                <h4 className="text-2xl md:text-3xl font-display font-medium text-ivory mb-4">
                  The Epicenter of High Fashion
                </h4>
                
                <p className="text-sm text-text-secondary leading-relaxed font-sans font-light mb-8">
                  Serving as the premier global home for flagship representations of the world's leading fashion syndicates. The high concentration of retail stores creates unparalleled brand gravity and customer conversions.
                </p>
              </div>

              <div className="border-t border-gold/10 pt-8 mt-4 space-y-6">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1">
                    Luxury Concentration
                  </span>
                  <span className="text-2xl font-display font-semibold text-gold-light">
                    {luxuryStats.brandsCount}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1">
                    Financial Performance
                  </span>
                  <span className="text-2xl font-display font-semibold text-gold-light">
                    {luxuryStats.annualRevenue}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Stacked Editorial Highlights */}
          <div className="lg:col-span-7 space-y-12">
            {highlights.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="group flex gap-8 pb-8 border-b border-gold/10 last:border-0 items-start">
                  
                  {/* High-Impact Section Number */}
                  <span className="font-display text-4xl sm:text-5xl font-light text-gold/30 tracking-tight group-hover:text-gold transition-colors duration-300">
                    {item.number}
                  </span>
                  
                  <div>
                    <h5 className="text-lg md:text-xl font-display font-semibold text-ivory mb-2 group-hover:text-gold-light transition-colors duration-300">
                      {item.brand}
                    </h5>
                    <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
                      {item.description}
                    </p>
                  </div>
                  
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
