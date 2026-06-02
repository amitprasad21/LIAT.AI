'use client';

import React from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { venueShowcaseData } from '@/data/venueData';
import { FiUsers, FiCompass } from 'react-icons/fi';

export const VenueShowcase: React.FC = () => {

  const handleScrollToVenueEnquiry = () => {
    window.location.hash = 'contact';
  };

  // Render highly premium responsive stylized vector floor plans
  const renderSVGFloorPlan = (type: 'atrium' | 'catwalk' | 'rink' | 'island') => {
    if (type === 'atrium') {
      return (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto text-gold max-h-40" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" rx="8" fill="#D6E0F0" stroke="rgba(43, 89, 195, 0.25)" strokeWidth="1" />
          {/* Circular Atrium Layout */}
          <circle cx="200" cy="120" r="85" stroke="rgba(43, 89, 195, 0.12)" strokeWidth="4" />
          <circle cx="200" cy="120" r="65" stroke="rgba(43, 89, 195, 0.2)" strokeWidth="2" strokeDasharray="5,4" />
          <circle cx="200" cy="120" r="45" stroke="rgba(43, 89, 195, 0.3)" strokeWidth="1.5" />
          {/* Central Stage */}
          <circle cx="200" cy="120" r="22" fill="rgba(43, 89, 195, 0.15)" stroke="#2B59C3" strokeWidth="2" />
          <text x="200" y="124" fill="#2B59C3" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-sans">STAGE</text>
          
          {/* Pillar Nodes */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const px = 200 + Math.cos(rad) * 65;
            const py = 120 + Math.sin(rad) * 65;
            return <circle key={deg} cx={px} cy={py} r="4.5" fill="#4B7BEC" />;
          })}
          <text x="200" y="22" fill="#718096" fontSize="8" textAnchor="middle" letterSpacing="1" className="font-sans uppercase">Radial Atrium Balconies Configuration</text>
        </svg>
      );
    }
    if (type === 'catwalk') {
      return (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto text-gold max-h-40" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" rx="8" fill="#D6E0F0" stroke="rgba(43, 89, 195, 0.25)" strokeWidth="1" />
          {/* Main Runway Center Lane */}
          <line x1="200" y1="210" x2="200" y2="75" stroke="#2B59C3" strokeWidth="6" strokeLinecap="round" />
          <circle cx="200" cy="65" r="20" fill="rgba(43, 89, 195, 0.15)" stroke="#2B59C3" strokeWidth="1.5" />
          
          {/* VIP Seating Rows */}
          {[-1, 1].map((side) => (
            <g key={side}>
              {[100, 130, 160, 190].map((y) => (
                <rect key={y} x={200 + side * 45 - 12} y={y} width="24" height="6" rx="1.5" fill="rgba(43, 89, 195, 0.12)" stroke="rgba(43, 89, 195, 0.25)" strokeWidth="0.8" />
              ))}
              {[100, 130, 160, 190].map((y) => (
                <rect key={y + 5} x={200 + side * 75 - 12} y={y} width="24" height="6" rx="1.5" fill="rgba(43, 89, 195, 0.05)" stroke="rgba(43, 89, 195, 0.15)" strokeWidth="0.8" />
              ))}
            </g>
          ))}
          <text x="200" y="218" fill="#2B59C3" fontSize="7" fontWeight="bold" textAnchor="middle" className="font-sans">RUNWAY ACCESS</text>
          <text x="200" y="22" fill="#718096" fontSize="8" textAnchor="middle" letterSpacing="1" className="font-sans uppercase">Haute Couture Fashion Seating Grid</text>
        </svg>
      );
    }
    if (type === 'rink') {
      return (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto text-gold max-h-40" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" rx="8" fill="#D6E0F0" stroke="rgba(43, 89, 195, 0.25)" strokeWidth="1" />
          {/* Rink Outline Oval */}
          <rect x="70" y="50" width="260" height="140" rx="70" stroke="rgba(43, 89, 195, 0.25)" strokeWidth="2.5" />
          {/* Center Line & Circles */}
          <line x1="200" y1="50" x2="200" y2="190" stroke="rgba(43, 89, 195, 0.35)" strokeWidth="1.5" />
          <circle cx="200" cy="120" r="30" stroke="rgba(43, 89, 195, 0.2)" strokeWidth="1" />
          <circle cx="200" cy="120" r="4.5" fill="#2B59C3" />
          
          {/* Insulated Conversion Floor outline */}
          <rect x="90" y="70" width="220" height="100" rx="8" fill="rgba(43, 89, 195, 0.05)" stroke="rgba(43, 89, 195, 0.2)" strokeWidth="1" strokeDasharray="3,3" />
          <text x="200" y="123" fill="#2B59C3" fontSize="8" fontWeight="bold" textAnchor="middle" className="font-sans">SUB-FLOOR CONVERSION</text>
          <text x="200" y="22" fill="#718096" fontSize="8" textAnchor="middle" letterSpacing="1" className="font-sans uppercase">Olympic Arena Conversion Floor Plan</text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto text-gold max-h-40" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" rx="8" fill="#D6E0F0" stroke="rgba(43, 89, 195, 0.25)" strokeWidth="1" />
        {/* Island Waterfront Coast */}
        <path d="M 50 180 C 130 190, 270 190, 350 180" stroke="rgba(43, 89, 195, 0.25)" strokeWidth="3" />
        {/* Fountain Choreography waves */}
        <path d="M 60 210 C 120 220, 280 220, 340 210" stroke="rgba(43, 89, 195, 0.15)" strokeWidth="1.5" strokeDasharray="5,4" />
        
        {/* Scenic Bridges */}
        <line x1="200" y1="180" x2="200" y2="80" stroke="#2B59C3" strokeWidth="4" />
        <rect x="130" y="60" width="140" height="20" rx="3" fill="rgba(43, 89, 195, 0.15)" stroke="#2B59C3" strokeWidth="1.5" />
        <text x="200" y="72" fill="#2B59C3" fontSize="8" fontWeight="bold" textAnchor="middle" className="font-sans">BRIDGE PROMENADE</text>
        <text x="200" y="140" fill="#718096" textAnchor="middle" className="font-sans uppercase">Outdoor Fountain Frontage</text>
        <text x="200" y="22" fill="#718096" textAnchor="middle" letterSpacing="1" className="font-sans uppercase">Open-Air Plaza & Promenade</text>
      </svg>
    );
  };

  return (
    <section
      id="venues"
      className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-background border-t border-gold/10 overflow-hidden"
      aria-label="Elite Venue Specifications"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badge="09 / PHYSICAL PRECINCTS"
          title="Venue Showcase"
          subtitle="Inspect detailed floor layouts and architectural parameters of our premier spaces."
        />

        {/* 4 Dedicated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {venueShowcaseData.map((venue, idx) => (
            <ScrollReveal key={venue.id} delay={idx * 0.08}>
              <div className="rounded-lg bg-surface border border-gold/15 p-8 flex flex-col justify-between h-full hover:border-gold/35 transition-all duration-300">
                
                {/* Details Top Area */}
                <div>
                  
                  {/* Venue Name & Capacity Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-display font-semibold text-ivory">
                      {venue.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gold/10 border border-gold/20 text-[10px] uppercase tracking-widest text-gold font-bold w-fit">
                      <FiUsers size={12} />
                      {venue.capacityBadge}
                    </span>
                  </div>

                  {/* Floor Plan Placeholder SVG */}
                  <div className="mb-6 rounded-lg overflow-hidden border border-white/50 bg-[#D6E0F0] neu-inset">
                    {renderSVGFloorPlan(venue.svgLayoutType)}
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-sm text-text-secondary leading-relaxed font-sans font-light mb-6">
                    {venue.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-8 border-t border-gold/10 pt-6">
                    {venue.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-text-secondary font-sans font-light">
                        <FiCompass className="text-gold flex-shrink-0 mt-0.5" size={13} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Booking Trigger CTA */}
                <button
                  onClick={handleScrollToVenueEnquiry}
                  className="w-full mt-6 py-4 rounded bg-transparent border border-gold/40 hover:border-gold hover:bg-gold text-[10px] font-sans font-bold uppercase tracking-widest text-gold hover:text-background transition-all duration-350 focus-ring"
                >
                  Configure venue layout &rarr;
                </button>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
