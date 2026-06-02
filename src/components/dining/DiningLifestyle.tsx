'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { diningOptions, diningFeatures } from '@/data/diningData';
import { cn } from '@/lib/utils';
import { FiCompass, FiAward, FiSun } from 'react-icons/fi';

export const DiningLifestyle: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fine-dining' | 'casual' | 'cafe'>('all');

  const filteredOptions = activeFilter === 'all'
    ? diningOptions
    : diningOptions.filter((opt) => opt.tier === activeFilter);

  const getFeatureIcon = (title: string) => {
    if (title.includes('Fine Dining')) return <FiAward size={22} />;
    if (title.includes('Food Court')) return <FiCompass size={22} />;
    return <FiSun size={22} />;
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <SectionHeader
          badge="04 / CULINARY LIFESTYLE"
          title="200+ Dining Experiences. Every Craving. Every Occasion."
          subtitle="A global gastronomic crossroad ranging from street-food velocity to Michelin-caliber intimacy."
        />

        {/* Gourmet Filter Tabs */}
        <ScrollReveal className="flex justify-center flex-wrap gap-2 mb-12">
          {(['all', 'fine-dining', 'casual', 'cafe'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold border transition-all duration-300 focus-ring',
                activeFilter === filter
                  ? 'bg-gold text-background border-gold'
                  : 'bg-transparent border-gold/25 text-gold hover:bg-gold/10'
              )}
            >
              {filter === 'all' ? 'All Dining' : filter.replace('-', ' ')}
            </button>
          ))}
        </ScrollReveal>

        {/* Snapping Horizontal Dining Outlets Showcase */}
        <ScrollReveal className="mb-24">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar">
            {filteredOptions.map((opt) => (
              <div
                key={opt.id}
                className="flex-shrink-0 w-80 snap-start rounded bg-surface/40 backdrop-blur-md border border-gold/15 p-8 flex flex-col justify-between h-72 hover:border-gold/40 hover:bg-surface/75 transition-all duration-350"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      'text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded border',
                      opt.tier === 'fine-dining' ? 'bg-gold/10 border-gold/30 text-gold-light' : 'bg-white/5 border-white/10 text-ivory'
                    )}>
                      {opt.tier.replace('-', ' ')}
                    </span>
                    <span className="text-[10px] text-text-secondary font-light italic">
                      {opt.atmosphere}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold tracking-wide text-ivory mb-2">
                    {opt.name}
                  </h4>
                  
                  <span className="block text-[11px] text-gold uppercase tracking-wider font-semibold mb-3">
                    {opt.cuisine}
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed font-sans font-light border-t border-gold/10 pt-4 mt-2">
                  {opt.highlight}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 3 designated Dining precints feature columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diningFeatures.map((feat, idx) => (
            <ScrollReveal key={feat.id} delay={idx * 0.1}>
              <div className="group h-full rounded-lg bg-surface/30 p-8 border border-gold/10 hover:border-gold/30 hover:bg-surface/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Large Stylized Number & Icon Row */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-display text-3xl font-light text-gold/30 group-hover:text-gold transition-colors duration-300">
                      {feat.number}
                    </span>
                    <div className="p-2.5 bg-gold/10 rounded text-gold border border-gold/15">
                      {getFeatureIcon(feat.title)}
                    </div>
                  </div>

                  <h5 className="text-lg font-display font-semibold text-ivory mb-3">
                    {feat.title}
                  </h5>
                  
                  <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
                    {feat.description}
                  </p>
                </div>

                <span className="text-[9px] uppercase tracking-widest text-gold mt-6 block font-semibold">
                  Primary Dining Hub &bull; Zone Spec
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
