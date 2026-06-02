'use client';

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { luxuryBrands, premiumBrands, anchorStores, retailOpportunities } from '@/data/retailBrands';
import { FiChevronRight, FiMaximize2, FiShield, FiTrendingUp } from 'react-icons/fi';

const BRAND_IMAGES: Record<string, string> = {
  // Luxury
  lv: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  chanel: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
  gucci: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=600&q=80',
  hermes: 'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=600&q=80',
  dior: 'https://images.unsplash.com/photo-1590156546746-c237022798aa?auto=format&fit=crop&w=600&q=80',
  cartier: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
  rolex: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=600&q=80',
  tiffany: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80',
  prada: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
  burberry: 'https://images.unsplash.com/photo-1548624149-f7b3e5a332ff?auto=format&fit=crop&w=600&q=80',
  versace: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
  bulgari: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
  vancleef: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
  bottega: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
  ysl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',

  // Premium
  apple: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&q=80',
  samsung: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
  zara: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
  hm: 'https://images.unsplash.com/photo-1567401893930-7be0b1786c30?auto=format&fit=crop&w=600&q=80',
  uniqlo: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
  sephora: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
  mac: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
  jomalone: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
  dyson: 'https://images.unsplash.com/photo-1527515637462-c97d3113907d?auto=format&fit=crop&w=600&q=80',
  lego: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80',

  // Anchors
  lafayette: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80',
  bloomingdales: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  marks: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=600&q=80'
};

export const RetailExperience: React.FC = () => {

  const handleScrollToLeasing = () => {
    window.location.hash = 'leasing';
  };

  const getOpportunityIcon = (title: string) => {
    if (title.includes('Flagship')) return <FiMaximize2 size={22} />;
    if (title.includes('Exclusivity')) return <FiShield size={22} />;
    return <FiTrendingUp size={22} />;
  };

  const getBrandBgImage = (brand: { id: string }) => {
    return BRAND_IMAGES[brand.id] || '/images/leasing_showroom.png';
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
                  className="flex-shrink-0 w-64 h-40 snap-start rounded border border-black/5 p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:border-gold/50 shadow-sm"
                >
                  {/* Category Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                    style={{ backgroundImage: `url(${getBrandBgImage(brand)})` }}
                  />

                  {/* Dark Vignette Overlay for Typography Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/10 z-10 pointer-events-none" />

                  {/* Brand Color Ambient Glow */}
                  <div
                    className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500 z-15 pointer-events-none"
                    style={{ backgroundColor: brand.logoColor }}
                  />

                  {/* Brand Display Header */}
                  <span className="font-display text-lg tracking-widest text-white z-20 group-hover:text-gold-light transition-colors duration-300">
                    {brand.name}
                  </span>

                  {/* Dynamic Hover Spec Reveal */}
                  <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-30 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-gold-light font-bold mb-1">
                      {brand.category}
                    </span>
                    <span className="text-xs text-slate-300 mb-3">
                      Flagship Footprint
                    </span>
                    <span className="text-sm font-display font-medium text-white">
                      {brand.storeSize}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-widest text-slate-300 z-20 font-sans font-medium">
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
                  className="flex-shrink-0 w-64 h-40 snap-start rounded border border-black/5 p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:border-gold/50 shadow-sm"
                >
                  {/* Category Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                    style={{ backgroundImage: `url(${getBrandBgImage(brand)})` }}
                  />

                  {/* Dark Vignette Overlay for Typography Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/10 z-10 pointer-events-none" />

                  {/* Brand Color Ambient Glow */}
                  <div
                    className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500 z-15 pointer-events-none"
                    style={{ backgroundColor: brand.logoColor }}
                  />

                  <span className="font-display text-lg tracking-widest text-white z-20 group-hover:text-gold-light transition-colors duration-300">
                    {brand.name}
                  </span>

                  {/* Dynamic Hover Spec Reveal */}
                  <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-30 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-gold-light font-bold mb-1">
                      {brand.category}
                    </span>
                    <span className="text-xs text-slate-300 mb-3">
                      Premium Layout
                    </span>
                    <span className="text-sm font-display font-medium text-white">
                      {brand.storeSize}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-widest text-slate-300 z-20 font-sans font-medium">
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
                  className="rounded border border-black/5 p-8 flex flex-col justify-between h-48 relative overflow-hidden group transition-all duration-500 hover:border-gold/40 hover:-translate-y-1 shadow-sm"
                >
                  {/* Category Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                    style={{ backgroundImage: `url(${getBrandBgImage(brand)})` }}
                  />

                  {/* Dark Vignette Overlay for Typography Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/10 z-10 pointer-events-none" />

                  {/* Brand Color Ambient Glow */}
                  <div
                    className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500 z-15 pointer-events-none"
                    style={{ backgroundColor: brand.logoColor }}
                  />
                  
                  <div className="z-20">
                    <span className="inline-block px-2.5 py-1 rounded bg-gold/20 border border-gold/40 text-[9px] uppercase tracking-widest text-gold-light mb-4 font-semibold">
                      Mega Anchor
                    </span>
                    <h4 className="font-display text-2xl font-semibold tracking-wide text-white mb-2 group-hover:text-gold-light transition-colors duration-300">
                      {brand.name}
                    </h4>
                    <p className="text-xs text-slate-300 font-sans font-light">
                      {brand.category}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between mt-6 z-20">
                    <span className="text-[10px] uppercase tracking-widest text-slate-300">
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
