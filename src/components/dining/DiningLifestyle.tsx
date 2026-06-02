'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { diningOptions, diningFeatures } from '@/data/diningData';
import { cn } from '@/lib/utils';
import { FiCompass, FiAward, FiSun } from 'react-icons/fi';

const DINING_IMAGES: Record<string, string> = {
  // Fine Dining
  nobu: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
  zuma: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  cipriani: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
  nusret: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80',
  lpmaison: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',

  // Casual
  shack: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  cheesecake: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
  pfchangs: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
  carluccios: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80',
  nandos: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',

  // Cafes
  paul: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  timhortons: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  caribou: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80',
  jones: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80'
};

export const DiningLifestyle: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fine-dining' | 'casual' | 'cafe'>('all');
  const [activeDiningTab, setActiveDiningTab] = useState(0);

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
                className="flex-shrink-0 w-80 snap-start rounded border border-black/5 p-8 flex flex-col justify-between h-72 relative overflow-hidden group transition-all duration-500 hover:border-gold/50 shadow-sm"
              >
                {/* Clear Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                  style={{ backgroundImage: `url(${DINING_IMAGES[opt.id] || '/images/waterfront_dining.png'})` }}
                />

                {/* Dark Vignette Overlay for Typography Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/10 z-10 pointer-events-none" />

                <div className="z-20">
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      'text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded border z-20',
                      opt.tier === 'fine-dining' ? 'bg-gold/25 border-gold/45 text-gold-light' : 'bg-black/45 border-white/10 text-white'
                    )}>
                      {opt.tier.replace('-', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-300 font-light italic z-20">
                      {opt.atmosphere}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold tracking-wide text-white mb-2 z-20 group-hover:text-gold-light transition-colors duration-300">
                    {opt.name}
                  </h4>
                  
                  <span className="block text-[11px] text-gold-light uppercase tracking-wider font-semibold mb-3 z-20">
                    {opt.cuisine}
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-sans font-light border-t border-white/10 pt-4 mt-2 z-20">
                  {opt.highlight}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Precinct Features and AI Image Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left 2/3: 3 designated Dining precincts feature columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {diningFeatures.map((feat, idx) => (
              <ScrollReveal key={feat.id} delay={idx * 0.1}>
                <div className="group h-full rounded-lg bg-surface/30 p-6 border border-gold/10 hover:border-gold/30 hover:bg-surface/50 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Large Stylized Number & Icon Row */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-display text-3xl font-light text-gold/30 group-hover:text-gold transition-colors duration-300">
                        {feat.number}
                      </span>
                      <div className="p-2 bg-gold/10 rounded text-gold border border-gold/15">
                        {getFeatureIcon(feat.title)}
                      </div>
                    </div>

                    <h5 className="text-base font-display font-semibold text-ivory mb-2">
                      {feat.title}
                    </h5>
                    
                    <p className="text-xs text-text-secondary leading-relaxed font-sans font-light">
                      {feat.description}
                    </p>
                  </div>

                  <span className="text-[8.5px] uppercase tracking-widest text-gold mt-6 block font-semibold">
                    Dining Hub &bull; Zone Spec
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right 1/3: Interactive AI Culinary Showcase Gallery */}
          <div className="lg:col-span-4">
            <ScrollReveal delay={0.15} className="rounded-lg overflow-hidden border border-gold/15 bg-surface h-full flex flex-col min-h-[260px] relative group">
              <div className="relative flex-1 h-full min-h-[260px] w-full">
                <img
                  src={activeDiningTab === 0 ? '/images/waterfront_dining.png' : '/images/rooftop_terrace_view.png'}
                  alt={activeDiningTab === 0 ? 'Waterfront Dining at Night' : 'Rooftop Culinary Lounge'}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-[1.03] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Glassmorphic Tabs */}
                <div className="absolute top-4 left-4 right-4 flex gap-2 p-1 rounded bg-black/45 backdrop-blur-md border border-white/10 z-20">
                  <button
                    type="button"
                    onClick={() => setActiveDiningTab(0)}
                    className={`flex-1 py-1 rounded text-[8px] uppercase tracking-wider font-bold transition-all duration-300 ${
                      activeDiningTab === 0 ? 'bg-gold text-background' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Waterfront Vista
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDiningTab(1)}
                    className={`flex-1 py-1 rounded text-[8px] uppercase tracking-wider font-bold transition-all duration-300 ${
                      activeDiningTab === 1 ? 'bg-gold text-background' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Rooftop Lounge
                  </button>
                </div>

                <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.25em] text-white/85 font-sans font-bold z-20">
                  {activeDiningTab === 0 ? 'AI-Imagined Waterfront Vista' : 'AI-Imagined Rooftop Lounge'}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
};
