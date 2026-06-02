'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useDeck } from '@/context/DeckContext';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiShoppingBag, 
  FiAward, 
  FiSliders,
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

const SPEAKER_NOTES: Record<string, { title: string; notes: string[] }> = {
  overview: {
    title: "Dubai Mall Hook & Catchment",
    notes: [
      "Pitch the scale: 105M+ visitors annually (exceeds Disney, Times Sq).",
      "Explain the Gateway funnel to investors: customized spatial routing.",
      "Key stat: Avg visitor dwell time exceeds 3.5 hours."
    ]
  },
  retail: {
    title: "High-Performance Catchment",
    notes: [
      "Detail tenant success: 1,200+ active stores, double-digit YoY growth.",
      "Pitch demographic matching: Custom fit based on brand category.",
      "Footfall capture is organic, driven by anchors."
    ]
  },
  luxury: {
    title: "Luxury District Prestige",
    notes: [
      "Highlight Fashion Avenue expansion corridor.",
      "Luxury average spend: $285 basket size (highest globally).",
      "Exclusivity: Target HNWI shoppers via private valets and lounges."
    ]
  },
  dining: {
    title: "F&B Gastronomy Capture",
    notes: [
      "Highlight fine-dining Promenade waterfront terraces.",
      "Dwell time: Food acts as a lifestyle catalyst, increasing store visits by 27%.",
      "Highlight Michelin-starred chefs and unique café clusters."
    ]
  },
  entertainment: {
    title: "Attractions as Traffic Anchors",
    notes: [
      "Attractions (Aquarium, Rink) are not cost centers—they are anchors.",
      "They generate 45% of first-time visitor flow.",
      "Highlight cross-promotional retail marketing options."
    ]
  },
  events: {
    title: "Global Brand Activations",
    notes: [
      "Grand Atrium booking: 4,000 capacity, ideal for product rollouts.",
      "Fountain Plaza: 8,000 capacity for high-impact celebrity campaigns.",
      "Highlight billboard takeovers and OOH syncing."
    ]
  },
  sponsorship: {
    title: "Sponsorship Matrices",
    notes: [
      "Explain Platinum/Gold/Silver loops.",
      "Reach: Digital OOH network guarantees 10M+ raw monthly impressions.",
      "Mention naming rights and synchronized arena sponsorships."
    ]
  },
  leasing: {
    title: "Leasing Sandbox Walkthrough",
    notes: [
      "Guide prospect through the AI Spatial Matchmaker.",
      "Adjust space/duration sliders dynamically to demonstrate yield.",
      "Emphasize the long-term lease rate discounts (up to 12% off)."
    ]
  },
  venues: {
    title: "Venue Spatial blue-prints",
    notes: [
      "Present digital floor layouts and corridor placements.",
      "Showcase technical specs (loading docks, ceiling height, logistics).",
      "Transition candidate smoothly into formal Letter of Intent (LOI)."
    ]
  },
  contact: {
    title: "Attesting LOI & Deal Closing",
    notes: [
      "Review the auto-compiled Letter of Intent (LOI).",
      "Verify that brand info and corridor matches are pre-filled.",
      "Click Submit to commit terms to the Supabase CRM database."
    ]
  }
};

export const InteractiveDeck: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(-1); // -1 represents the Gateway Entrance
  const [direction, setDirection] = useState<number>(1);

  // Presenter Mode bindings from Global Context
  const {
    isPresenterMode,
    setIsPresenterMode,
    showPresenterHUD,
    setShowPresenterHUD,
    setBrandCategory,
    setSelectedZone
  } = useDeck();

  // Mouse coordinate tracking for virtual laser pointer
  const laserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPresenterMode) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (laserRef.current) {
        laserRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isPresenterMode]);

  // Sync hash updates with slide indexes
  useEffect(() => {
    const handleHashChange = () => {
      const hashParts = window.location.hash.split('#').filter(Boolean);
      const hash = hashParts[hashParts.length - 1] || '';
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
  const navigateToSlide = useCallback((index: number) => {
    setDirection(index > activeSlide ? 1 : -1);
    if (index === -1) {
      window.location.hash = '';
      setActiveSlide(-1);
    } else {
      window.location.hash = SLIDES[index].id;
      setActiveSlide(index);
    }
  }, [activeSlide]);

  // Keyboard navigation listener (left/right arrow keys & presenter hotkeys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Stop keyboard navigation inside text input forms
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) {
        return;
      }

      // Presenter hotkeys
      if (e.key.toLowerCase() === 'p') {
        setIsPresenterMode(prev => !prev);
        return;
      }
      if (e.key.toLowerCase() === 'h') {
        setShowPresenterHUD(prev => !prev);
        return;
      }

      if (activeSlide === -1) return; // Disable on Gateway slide

      // Numeric shortcuts (1-9 go to slides 0-8, 0 goes to slide 9)
      if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key) - 1;
        if (idx < SLIDES.length) navigateToSlide(idx);
        return;
      }
      if (e.key === '0') {
        navigateToSlide(9); // Slide 10 / Contact Registry
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
  }, [activeSlide, setIsPresenterMode, setShowPresenterHUD, navigateToSlide]);

  const selectIntentAndNavigate = (selectedIntent: string, targetSlideId: string) => {
    // Set matching context variables dynamically based on gateway click
    if (selectedIntent === 'leasing') {
      setBrandCategory('luxury-fashion');
      setSelectedZone('Fashion Avenue Ground Floor');
    } else if (selectedIntent === 'events') {
      setBrandCategory('cafes-beverages');
      setSelectedZone('The Grand Atrium Premium Axis');
    }

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
      {/* 🔴 Virtual Laser Pointer Overlay */}
      {isPresenterMode && (
        <div 
          ref={laserRef}
          className="fixed pointer-events-none w-5 h-5 rounded-full bg-red-600/90 shadow-[0_0_15px_#ef4444,0_0_30px_#ef4444] z-[9999] top-0 left-0 will-change-transform"
          style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
        />
      )}

      {/* 🎤 Presenter HUD Notes Overlay */}
      {isPresenterMode && showPresenterHUD && activeSlide !== -1 && (
        <div className="fixed top-4 right-4 bottom-24 w-80 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-6 text-white shadow-2xl z-[90] backdrop-blur-md flex flex-col justify-between font-sans">
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
              <span className="text-[10px] tracking-[0.2em] font-bold text-gold uppercase">
                Presenter HUD Notes
              </span>
              <button 
                onClick={() => setShowPresenterHUD(false)}
                className="text-[10px] text-slate-400 hover:text-white uppercase tracking-wider"
              >
                Hide
              </button>
            </div>
            
            <h4 className="text-sm font-semibold text-gold mb-3">
              {SPEAKER_NOTES[SLIDES[activeSlide].id]?.title || 'Emaar Presentation Script'}
            </h4>
            
            <ul className="space-y-3">
              {(SPEAKER_NOTES[SLIDES[activeSlide].id]?.notes || [
                "Walk through slide sections.",
                "Reinforce Emaar brand heritage.",
                "Highlight target commercial value."
              ]).map((note, nIdx) => (
                <li key={nIdx} className="text-[11px] text-slate-300 leading-relaxed list-disc list-inside">
                  {note}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-slate-800 pt-4 mt-4">
            <div className="flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-widest font-bold">
              <span>Hotkey Guide:</span>
              <span>P: Toggle Mode | H: HUD</span>
            </div>
            <div className="text-[8px] text-slate-500 mt-2 leading-relaxed">
              Use keys 1-9 to jump slides. Press 0 for B2B Registry.
            </div>
          </div>
        </div>
      )}

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
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-50">
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
                Secure the commercial address of the world&apos;s most visited retail and lifestyle destination. Navigate directly to your business objective below.
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
            <div className="w-full flex-1 pl-0 lg:pl-24 pb-36 overflow-y-auto select-text">
              {React.createElement(SLIDES[activeSlide].component)}
            </div>

            {/* Slide Navigation Overlay Dock (Bottom Center, elevated on mobile) */}
            <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2.5 rounded-xl border border-white/60 bg-surface/75 backdrop-blur-md shadow-md neu-outset w-[90%] max-w-sm sm:max-w-md lg:w-auto justify-between lg:justify-start flex-wrap">
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
              <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-text-secondary px-1 sm:px-2 whitespace-nowrap">
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

              <div className="h-4 w-px bg-slate-200/80 mx-0.5 sm:mx-1" />

              {/* Presenter Mode Toggle */}
              <button
                onClick={() => setIsPresenterMode(!isPresenterMode)}
                className={cn(
                  "px-2.5 py-1.5 rounded-lg border border-black/5 text-[9px] uppercase tracking-wider font-bold neu-button focus-ring flex items-center gap-1.5 transition-all duration-300",
                  isPresenterMode ? "bg-gold/15 text-gold border-gold/30" : "bg-surface hover:bg-slate-50 text-text-secondary"
                )}
                title="Toggle Presenter Mode (Key: P)"
              >
                <FiSliders size={12} />
                <span className="hidden md:inline">Presenter</span>
              </button>

              {/* Presenter HUD toggle if Presenter Mode is active */}
              {isPresenterMode && (
                <button
                  onClick={() => setShowPresenterHUD(!showPresenterHUD)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg border border-black/5 text-[9px] uppercase tracking-wider font-bold neu-button focus-ring flex items-center gap-1.5 transition-all duration-300",
                    showPresenterHUD ? "bg-gold/15 text-gold border-gold/30" : "bg-surface hover:bg-slate-50 text-text-secondary"
                  )}
                  title="Toggle Presenter notes HUD (Key: H)"
                >
                  <FiUsers size={12} />
                  <span className="hidden md:inline">HUD</span>
                </button>
              )}

              <div className="h-4 w-px bg-slate-200/80 mx-0.5 sm:mx-1" />

              {/* Return to Gateway screen button */}
              <button
                onClick={() => navigateToSlide(-1)}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-black/5 bg-surface hover:bg-slate-50 text-[9px] uppercase tracking-wider font-bold text-gold neu-button focus-ring whitespace-nowrap"
              >
                Exit
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
