'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiShoppingBag, 
  FiAward, 
  FiSliders,
  FiTrendingUp,
  FiFolder,
  FiUsers,
  FiCalendar,
  FiBookOpen
} from 'react-icons/fi';

// Import slide page structures
import { HeroSection } from '@/components/hero/HeroSection';
import { WhyDubaiMall } from '@/components/overview/WhyDubaiMall';
import { RetailExperience } from '@/components/retail/RetailExperience';
import { LuxuryDistrict } from '@/components/luxury/LuxuryDistrict';
import { DiningLifestyle } from '@/components/dining/DiningLifestyle';
import { EntertainmentShowcase } from '@/components/entertainment/EntertainmentShowcase';
import { EventsPlatform } from '@/components/events/EventsPlatform';
import { SponsorshipPlatform } from '@/components/sponsorship/SponsorshipPlatform';
import { LeasingOpportunities } from '@/components/leasing/LeasingOpportunities';
import { VenueShowcase } from '@/components/venue/VenueShowcase';
import { CTASystem } from '@/components/cta/CTASystem';

// Define layout slide sequence
const SLIDES = [
  { id: 'overview', label: 'Overview', component: () => (
      <div className="w-full flex flex-col">
        <HeroSection />
        <WhyDubaiMall />
      </div>
    ) 
  },
  { id: 'retail', label: 'Retail Experience', component: RetailExperience },
  { id: 'luxury', label: 'Luxury District', component: LuxuryDistrict },
  { id: 'dining', label: 'Dining Lifestyle', component: DiningLifestyle },
  { id: 'entertainment', label: 'Attractions', component: EntertainmentShowcase },
  { id: 'events', label: 'Events Platform', component: EventsPlatform },
  { id: 'sponsorship', label: 'Sponsorship Options', component: SponsorshipPlatform },
  { id: 'leasing', label: 'Leasing Configurations', component: LeasingOpportunities },
  { id: 'venues', label: 'Venue Blueprints', component: VenueShowcase },
  { id: 'contact', label: 'Inquiry Registry', component: CTASystem }
];

export const InteractiveDeck: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(-1); // -1 represents the Gateway Entrance
  const [direction, setDirection] = useState<number>(1);
  const [intent, setIntent] = useState<string | null>(null);

  // Sync hash updates with slide indexes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setActiveSlide(-1);
        return;
      }
      const index = SLIDES.findIndex((s) => s.id === hash);
      if (index !== -1) {
        setActiveSlide(index);
      }
    };

    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync state transitions to address bar hash
  const navigateToSlide = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1);
    if (index === -1) {
      window.location.hash = '';
      setActiveSlide(-1);
    } else {
      window.location.hash = SLIDES[index].id;
      setActiveSlide(index);
    }
  };

  // Keyboard navigation listener (left/right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSlide === -1) return; // Disable on Gateway slide
      
      // Stop keyboard navigation inside text input forms
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Right') {
        if (activeSlide < SLIDES.length - 1) {
          navigateToSlide(activeSlide + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        if (activeSlide > 0) {
          navigateToSlide(activeSlide - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  const selectIntentAndNavigate = (selectedIntent: string, targetSlideId: string) => {
    setIntent(selectedIntent);
    const index = SLIDES.findIndex((s) => s.id === targetSlideId);
    if (index !== -1) {
      navigateToSlide(index);
    }
  };

  // Slide sliding animation configuration
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 220, damping: 25 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 220, damping: 25 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden flex flex-col">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {activeSlide === -1 ? (
          /* ======================================================== */
          /* B2B COMMERCIAL GATEWAY PORTAL (SLIDE 0)                  */
          /* ======================================================== */
          <motion.div
            key="gateway"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-24 select-none relative z-10"
          >
            {/* Drifting sparkle overlay background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 bg-gradient-to-br from-[#E0E9F5]/45 via-[#F8FAFC] to-[#F1F6FA]">
              <img
                src="/images/dubai_skyline.png"
                alt="Downtown Dubai"
                className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-10"
              />
            </div>

            <div className="max-w-5xl w-full text-center">
              <span className="text-[10px] uppercase tracking-[0.45em] text-gold font-bold block mb-4">
                EMAAR PROPERTIES • CORPORATE PORTAL
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-ivory tracking-tight leading-none mb-6">
                The Dubai Mall
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-sans font-light text-text-secondary max-w-2xl mx-auto leading-relaxed mb-16">
                Secure the commercial address of the world's most visited retail and lifestyle destination. Navigate directly to your business objective below.
              </p>

              {/* Segmented Gateway Intent Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
                {/* 1. Retail Card */}
                <div 
                  onClick={() => selectIntentAndNavigate('leasing', 'leasing')}
                  className="rounded-2xl p-8 bg-surface border border-black/5 neu-outset cursor-pointer group hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-105 transition-transform duration-300">
                    <FiShoppingBag size={22} />
                  </div>
                  <h3 className="text-lg font-display font-medium text-gold-light mb-3">
                    Retail & Luxury Leasing
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light">
                    Position your brand among 1,200+ elite global anchors. Explore high-worth space allocations and target footfall capture coordinates.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold mt-6 group-hover:translate-x-1 transition-transform duration-300">
                    Explore Leasing
                  </span>
                </div>

                {/* 2. Sponsorships Card */}
                <div 
                  onClick={() => selectIntentAndNavigate('sponsorship', 'sponsorship')}
                  className="rounded-2xl p-8 bg-surface border border-black/5 neu-outset cursor-pointer group hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-105 transition-transform duration-300">
                    <FiAward size={22} />
                  </div>
                  <h3 className="text-lg font-display font-medium text-gold-light mb-3">
                    Brand Sponsorship & OOH
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light">
                    Secure multi-million impression campaigns across digital OOH matrices, custom spatial takeovers, and integrated partner programs.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold mt-6 group-hover:translate-x-1 transition-transform duration-300">
                    Explore Sponsorships
                  </span>
                </div>

                {/* 3. Events Card */}
                <div 
                  onClick={() => selectIntentAndNavigate('events', 'venues')}
                  className="rounded-2xl p-8 bg-surface border border-black/5 neu-outset cursor-pointer group hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-105 transition-transform duration-300">
                    <FiCalendar size={22} />
                  </div>
                  <h3 className="text-lg font-display font-medium text-gold-light mb-3">
                    Concert & Event Arenas
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light">
                    Book world-class Performing Arts Centers, exposition halls, and ice rinks for premium corporate assemblies and launches.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold mt-6 group-hover:translate-x-1 transition-transform duration-300">
                    Explore Venues
                  </span>
                </div>
              </div>

              {/* General Entry Link */}
              <button
                onClick={() => navigateToSlide(0)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-black/10 bg-surface hover:bg-slate-50 text-gold-light hover:text-gold text-xs uppercase tracking-[0.2em] font-sans font-bold hover:scale-[1.02] shadow-sm neu-outset transition-all duration-300 focus-ring"
              >
                <FiBookOpen size={15} />
                Open Presentation Deck
              </button>
            </div>
          </motion.div>
        ) : (
          /* ======================================================== */
          /* SLIDE DECK DISPLAY CONTAINER                             */
          /* ======================================================== */
          <motion.div
            key={SLIDES[activeSlide].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex-1 flex flex-col relative"
          >
            {/* Render Slide Component */}
            <div className="w-full flex-1 pl-0 lg:pl-24 pb-20 select-none">
              {React.createElement(SLIDES[activeSlide].component)}
            </div>

            {/* Slide Navigation Overlay Dock (Bottom Center) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2.5 rounded-xl border border-white/60 bg-surface/75 backdrop-blur-md shadow-md neu-outset">
              {/* Previous button */}
              <button
                onClick={() => activeSlide > 0 && navigateToSlide(activeSlide - 1)}
                disabled={activeSlide === 0}
                className={`w-9 h-9 rounded-lg flex items-center justify-center border border-black/5 neu-button focus-ring transition-opacity ${
                  activeSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                }`}
                aria-label="Previous Slide"
              >
                <FiChevronLeft size={18} />
              </button>

              {/* Progress Tracker Numbers */}
              <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-text-secondary px-2">
                Slide {activeSlide + 1} / {SLIDES.length}
              </span>

              {/* Next button */}
              <button
                onClick={() => activeSlide < SLIDES.length - 1 && navigateToSlide(activeSlide + 1)}
                disabled={activeSlide === SLIDES.length - 1}
                className={`w-9 h-9 rounded-lg flex items-center justify-center border border-black/5 neu-button focus-ring transition-opacity ${
                  activeSlide === SLIDES.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                }`}
                aria-label="Next Slide"
              >
                <FiChevronRight size={18} />
              </button>

              <div className="h-4 w-px bg-slate-200/80 mx-1" />

              {/* Return to Gateway screen button */}
              <button
                onClick={() => navigateToSlide(-1)}
                className="px-3 py-1.5 rounded-lg border border-black/5 bg-surface hover:bg-slate-50 text-[9px] uppercase tracking-wider font-bold text-gold neu-button focus-ring"
              >
                Exit to Portal
              </button>
            </div>

            {/* Visual Progress Line Indicator */}
            <div className="fixed bottom-0 left-0 right-0 h-1.5 bg-slate-200/40 z-50">
              <div 
                className="h-full bg-gold transition-all duration-300 ease-out" 
                style={{ width: `${((activeSlide + 1) / SLIDES.length) * 100}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
