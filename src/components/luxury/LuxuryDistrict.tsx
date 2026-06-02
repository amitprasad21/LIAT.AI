'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { luxuryDistrictData } from '@/data/luxuryBrands';

export const LuxuryDistrict: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
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

        {/* Three-Column Grid: Large Stat Callouts, AI Image Showcase, and Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Prestigious Stat Callout Box */}
          <div className="lg:col-span-4 flex flex-col">
            <ScrollReveal className="bg-surface border border-gold/15 rounded-lg p-8 flex flex-col justify-between h-full hover:border-gold/30 transition-colors duration-500">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium block mb-6">
                  PRESTIGE BENCHMARK
                </span>
                
                <h4 className="text-xl font-display font-medium text-ivory mb-4">
                  The Epicenter of High Fashion
                </h4>
                
                <p className="text-xs text-text-secondary leading-relaxed font-sans font-light mb-6">
                  Serving as the premier global home for flagship representations of the world&apos;s leading fashion syndicates. The high concentration of retail stores creates unparalleled brand gravity and customer conversions.
                </p>
              </div>

              <div className="border-t border-gold/10 pt-6 mt-4 space-y-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-widest text-text-secondary mb-1">
                    Luxury Concentration
                  </span>
                  <span className="text-xl font-display font-semibold text-gold-light">
                    {luxuryStats.brandsCount}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-widest text-text-secondary mb-1">
                    Financial Performance
                  </span>
                  <span className="text-xl font-display font-semibold text-gold-light">
                    {luxuryStats.annualRevenue}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Middle Column: Interactive AI Luxury Showcase Gallery */}
          <div className="lg:col-span-4 flex flex-col">
            <ScrollReveal className="rounded-lg overflow-hidden border border-gold/15 bg-surface h-full flex flex-col min-h-[280px] relative group">
              <div className="relative flex-1 h-full min-h-[280px] w-full">
                <img
                  src={activeTab === 0 ? '/images/fashion_avenue_luxury.png' : '/images/luxury_watch_salon.png'}
                  alt={activeTab === 0 ? 'Fashion Avenue Luxury Corridor' : 'Haute Horology Watch Salon'}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-[1.03] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Glassmorphic Tabs */}
                <div className="absolute top-4 left-4 right-4 flex gap-2 p-1 rounded bg-black/45 backdrop-blur-md border border-white/10 z-20">
                  <button
                    type="button"
                    onClick={() => setActiveTab(0)}
                    className={`flex-1 py-1 rounded text-[8px] uppercase tracking-wider font-bold transition-all duration-300 ${
                      activeTab === 0 ? 'bg-gold text-background' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Couture Corridor
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(1)}
                    className={`flex-1 py-1 rounded text-[8px] uppercase tracking-wider font-bold transition-all duration-300 ${
                      activeTab === 1 ? 'bg-gold text-background' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Watch Salon
                  </button>
                </div>

                <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.25em] text-white/85 font-sans font-bold z-20">
                  {activeTab === 0 ? 'AI-Imagined Couture Corridor' : 'AI-Imagined Watch Salon'}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Stacked Editorial Highlights */}
          <div className="lg:col-span-4 space-y-8 flex flex-col justify-between">
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
