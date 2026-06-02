'use client';

import React, { useState } from 'react';
import { coreStats, locationData, audienceDemographics } from '@/data/mallData';
import { StatCard } from '@/components/shared/StatCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { FiMapPin, FiUsers, FiTrendingUp, FiX, FiChevronLeft, FiChevronRight, FiVideo, FiImage, FiTv } from 'react-icons/fi';

const DOWNTOWN_GALLERY = [
  '/images/downtown_showcase.png',
  '/images/dubai_skyline.png',
];

export const WhyDubaiMall: React.FC = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mediaTab, setMediaTab] = useState<'youtube' | 'local' | 'gallery'>('youtube');
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % DOWNTOWN_GALLERY.length);
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + DOWNTOWN_GALLERY.length) % DOWNTOWN_GALLERY.length);
  };
  return (
    <section
      id="overview"
      className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-background border-t border-gold/10 overflow-hidden"
      aria-label="Overview & Stats"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title & Intro Editorial Paragraph */}
        <div id="stats-overview">
          <SectionHeader
            badge="01 / OVERVIEW"
            title="A City Within a City"
            subtitle="Dubai Mall is the undisputed focal point of global luxury and retail velocity."
            description="Spanning over 5.9 million square feet of gross leasable area adjacent to the Burj Khalifa, it stands not just as a retail destination, but as a towering monument to architectural ambition, premium hospitality, and unmatched economic performance."
          />
        </div>

        {/* 2x4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {coreStats.map((stat, idx) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              description={stat.description}
              delay={idx * 0.05}
            />
          ))}
        </div>

        {/* Dynamic Stylized Map & 3 Opportunity Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3 Editorial Feature Columns */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            {/* Feature Card 1: Prime Location */}
            <ScrollReveal delay={0.1}>
              <div className="flex gap-6 p-6 rounded-lg bg-surface border border-gold/10 hover:border-gold/30 transition-all duration-300">
                <div className="flex-shrink-0 p-3 bg-gold/10 rounded border border-gold/20 h-fit text-gold">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-medium text-gold-light mb-2">
                    Preeminent Location
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-text-secondary mb-3">
                    {locationData.address}
                  </p>
                  <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside font-sans font-light">
                    {locationData.connections.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature Card 2: Elite Audience */}
            <ScrollReveal delay={0.2}>
              <div className="flex gap-6 p-6 rounded-lg bg-surface border border-gold/10 hover:border-gold/30 transition-all duration-300">
                <div className="flex-shrink-0 p-3 bg-gold/10 rounded border border-gold/20 h-fit text-gold">
                  <FiUsers size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-medium text-gold-light mb-2">
                    High-Worth Audiences
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3 font-sans font-light">
                    An ultra-premium visitor base featuring massive dwell times and elevated spending transactions.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans text-gold-light">
                    <div>
                      <span className="block text-text-secondary text-[10px] uppercase tracking-wider">Demographic Core</span>
                      {audienceDemographics.ageGroup.split(' ')[0]} {audienceDemographics.ageGroup.split(' ').slice(4).join(' ')}
                    </div>
                    <div>
                      <span className="block text-text-secondary text-[10px] uppercase tracking-wider">Average Dwell</span>
                      {audienceDemographics.averageVisitDuration}
                    </div>
                    <div>
                      <span className="block text-text-secondary text-[10px] uppercase tracking-wider">Average Spend</span>
                      {audienceDemographics.averageSpend}
                    </div>
                    <div>
                      <span className="block text-text-secondary text-[10px] uppercase tracking-wider">Household Income</span>
                      &gt;$75K (68%)
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature Card 3: Economic Hub */}
            <ScrollReveal delay={0.3}>
              <div className="flex gap-6 p-6 rounded-lg bg-surface border border-gold/10 hover:border-gold/30 transition-all duration-300">
                <div className="flex-shrink-0 p-3 bg-gold/10 rounded border border-gold/20 h-fit text-gold">
                  <FiTrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-medium text-gold-light mb-2">
                    Economic Gateway
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
                    Commanding {locationData.catchment.residents}.
                  </p>
                  <p className="text-sm text-gold/80 italic font-accent mt-2">
                    {locationData.catchment.markets}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* SVG Map Section */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <ScrollReveal className="w-full relative p-4 rounded-lg bg-surface border border-gold/15 flex flex-col items-center">
              <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.25em] text-text-secondary">
                Stylized Dubai Catchment Map
              </span>

              {/* Glowing Map legend */}
              <div className="absolute bottom-4 right-4 text-right bg-slate-50/90 backdrop-blur-md p-2.5 rounded border border-slate-200/60 shadow-sm">
                <span className="inline-block w-2.5 h-2.5 bg-gold rounded-full mr-2 animate-ping" />
                <span className="text-[10px] font-sans text-gold uppercase tracking-widest font-semibold">
                  DUBAI MALL PIN
                </span>
                <span className="block text-[8px] text-text-secondary mt-0.5 font-light">
                  Downtown Hub, adjacent to Burj Khalifa
                </span>
              </div>

              {/* Vector SVG Map */}
              <svg
                viewBox="0 0 800 500"
                className="w-full h-auto text-gold max-h-[380px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Coastal Line Contour */}
                <path
                  d="M100 450 C 220 350, 340 320, 520 200 C 620 120, 700 80, 800 50"
                  stroke="rgba(201, 168, 76, 0.25)"
                  strokeWidth="3"
                  strokeDasharray="8,6"
                />

                {/* The World Islands (Stylized grids) */}
                <g opacity="0.3">
                  <ellipse cx="450" cy="120" rx="35" ry="20" stroke="#C9A84C" strokeWidth="1" />
                  <ellipse cx="440" cy="115" rx="5" ry="3" stroke="#C9A84C" strokeWidth="0.8" />
                  <ellipse cx="455" cy="125" rx="8" ry="4" stroke="#C9A84C" strokeWidth="0.8" />
                  <ellipse cx="465" cy="110" rx="6" ry="3" stroke="#C9A84C" strokeWidth="0.8" />
                </g>

                {/* Palm Jumeirah (Stylized branches) */}
                <g opacity="0.3">
                  <path d="M 220 280 L 180 250 M 225 285 L 190 265 M 230 290 L 200 280 M 235 295 L 210 295" stroke="#C9A84C" strokeWidth="1.5" />
                  <path d="M 220 280 C 240 280, 240 310, 250 320" stroke="#C9A84C" strokeWidth="2" />
                </g>

                {/* Sheikh Zayed Road Axis */}
                <path
                  d="M 50 500 L 750 120"
                  stroke="rgba(154, 143, 126, 0.15)"
                  strokeWidth="4"
                  aria-hidden="true"
                />
                <text x="640" y="165" fill="#9A8F7E" fontSize="8" letterSpacing="2" className="opacity-40 uppercase tracking-widest font-sans">
                  Sheikh Zayed Rd
                </text>

                {/* Dubai International Airport Area (DXB) */}
                <g opacity="0.35">
                  <path d="M 680 70 L 730 40 M 690 60 L 740 30" stroke="#9A8F7E" strokeWidth="1" />
                  <text x="680" y="85" fill="#9A8F7E" fontSize="8" className="uppercase tracking-widest">DXB Airport</text>
                </g>

                {/* Dubai Mall Location Node */}
                <g>
                  {/* Outer Pulsating Rings */}
                  <circle cx="500" cy="275" r="28" fill="rgba(201, 168, 76, 0.05)" className="animate-pulse" />
                  <circle cx="500" cy="275" r="16" stroke="rgba(201, 168, 76, 0.4)" strokeWidth="1" className="animate-ping" style={{ animationDuration: '3s' }} />
                  <circle cx="500" cy="275" r="8" fill="rgba(201, 168, 76, 0.2)" />
                  
                  {/* Burj Khalifa Needle Profile */}
                  <path d="M 495 275 L 500 180 L 505 275 Z" fill="url(#burjGrad)" />
                  
                  {/* Location Core Pin */}
                  <circle cx="500" cy="275" r="4.5" fill="#C9A84C" />
                </g>

                {/* Burj/Mall Label */}
                <text x="515" y="245" fill="#2D3748" fontSize="12" fontWeight="bold" className="font-display">BURJ KHALIFA</text>
                <text x="515" y="260" fill="#C9A84C" fontSize="10" fontWeight="bold" letterSpacing="1" className="font-sans">DUBAI MALL</text>

                {/* Define Gradients */}
                <defs>
                  <linearGradient id="burjGrad" x1="500" y1="180" x2="500" y2="275" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E8D5A3" />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </ScrollReveal>
          </div>
        </div>

        {/* AI-Imagined Future expansion banner */}
        <ScrollReveal className="mt-24 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gold/15 bg-surface h-72 relative group shadow-sm">
            <img
              src="/images/mall_future_expansion.png"
              alt="AI-Imagined Mall Future Expansion"
              className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-[1.02] transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-8 md:p-12 z-20 max-w-lg text-white">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-light font-bold mb-2">
                VISIONARY EXPANSION PREVIEW
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">
                Dubai Mall 2030 Spatial Design
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                An AI-generated conceptual design of the upcoming smart expansion corridor, featuring dynamic double-curved facades and integrated green promenades.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Cinematic Video First Spotlight Card */}
        <ScrollReveal className="mt-16 max-w-4xl mx-auto">
          <div 
            className="rounded-2xl p-6 md:p-8 bg-surface border border-white/60 neu-outset transition-all duration-500 hover:shadow-[0_15px_45px_rgba(43,89,195,0.08)] group"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold block mb-2 text-center">
              CINEMATIC PRESENTATION
            </span>
            <h3 className="text-xl md:text-2xl font-display font-semibold text-ivory text-center mb-6">
              Downtown Dubai: The World&apos;s Premier Lifestyle Destination
            </h3>
            
            {/* Custom Premium Light Video Frame */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/70 neu-inset bg-[#D8E2F0]">
              {!isInlinePlaying ? (
                <div 
                  onClick={() => setIsInlinePlaying(true)}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                >
                  <img
                    src="/images/downtown_showcase.png"
                    alt="Downtown Dubai Showcase"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Glowing Glass Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/20">
                    <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-gold shadow-[0_8px_32px_rgba(43,89,195,0.15)] transform transition-transform duration-300 group-hover:scale-110 border border-white/80 neu-outset">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gold ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Luxury Gradient Bottom Glass Overlay */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/95 to-transparent flex items-center justify-between px-6 backdrop-blur-[1px]">
                    <span className="text-[10px] uppercase tracking-widest text-text-primary font-medium">
                      Official Downtown Scale & Energy Showcase
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-gold/10 border border-gold/25 text-[8px] uppercase tracking-widest text-gold font-bold">
                      Click to Play
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full bg-black">
                  <video
                    className="w-full h-full"
                    src="/videos/dubai_skyline.mp4"
                    autoPlay
                    controls
                    playsInline
                  />
                  {/* Elegant close button in the corner to reset back to cover image */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsInlinePlaying(false);
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-text-primary border border-white/60 flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110"
                    title="Close Video"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => setIsInlinePlaying(!isInlinePlaying)}
                className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold border border-white/60 bg-surface text-gold hover:text-gold-light transition-all duration-300 shadow-sm neu-outset flex items-center justify-center gap-1.5 focus-ring"
              >
                <FiVideo size={14} />
                {isInlinePlaying ? "Stop Video" : "Play Video Inline"}
              </button>
              <button
                onClick={() => setGalleryOpen(true)}
                className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold border border-white/60 bg-surface text-gold hover:text-gold-light transition-all duration-300 shadow-sm neu-outset flex items-center justify-center gap-1.5 focus-ring"
              >
                <FiTv size={14} />
                Launch Media Hub Modal
              </button>
            </div>
            
            <p className="text-xs text-text-secondary text-center leading-relaxed mt-6 max-w-xl mx-auto font-sans font-light">
              Experience the unmatched architectural synergy between Dubai Mall, the Dubai Fountain, and the soaring Burj Khalifa, attracting over 100 million visitors every year.
            </p>
          </div>
        </ScrollReveal>

        {/* Immersive Glassmorphic Media & Gallery Modal */}
        {galleryOpen && (
          <div
            className="fixed inset-0 z-50 w-full h-screen bg-background/90 backdrop-blur-xl flex flex-col justify-center items-center p-4"
            onClick={() => setGalleryOpen(false)}
          >
            <div 
              className="relative w-full max-w-4xl bg-surface border border-white/60 rounded-2xl p-6 md:p-8 neu-outset flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setGalleryOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-gold p-2 rounded-full border border-white/60 neu-button focus-ring z-10"
                aria-label="Close Media Center"
              >
                <FiX size={20} />
              </button>

              <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold block mb-2">
                DOWNTOWN MEDIA HUB
              </span>
              <h3 className="font-display text-xl font-semibold text-ivory mb-6 text-center">
                Immersive Destination Presentation
              </h3>

              {/* Luxury Skeuomorphic Tab Switcher */}
              <div className="flex gap-4 mb-6 p-1.5 rounded-xl border border-white/40 bg-[#D8E2F0] neu-inset">
                <button
                  onClick={() => setMediaTab('youtube')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                    mediaTab === 'youtube'
                      ? 'bg-surface text-gold border border-white/60 shadow-sm'
                      : 'text-text-secondary hover:text-gold'
                  }`}
                >
                  <FiTv size={14} />
                  YouTube HD Stream
                </button>
                <button
                  onClick={() => setMediaTab('local')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                    mediaTab === 'local'
                      ? 'bg-surface text-gold border border-white/60 shadow-sm'
                      : 'text-text-secondary hover:text-gold'
                  }`}
                >
                  <FiVideo size={14} />
                  Local MP4 Loop
                </button>
                <button
                  onClick={() => setMediaTab('gallery')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                    mediaTab === 'gallery'
                      ? 'bg-surface text-gold border border-white/60 shadow-sm'
                      : 'text-text-secondary hover:text-gold'
                  }`}
                >
                  <FiImage size={14} />
                  Luxury Gallery
                </button>
              </div>

              {/* Media Viewport Container */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/70 neu-inset bg-[#D8E2F0]">
                {mediaTab === 'youtube' && (
                  <iframe
                    className="w-full h-full border-none"
                    src="https://www.youtube.com/embed/tL7sYJ3wW2o?autoplay=1&mute=0&rel=0&showinfo=0"
                    title="Downtown Dubai - Fountain Show"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {mediaTab === 'local' && (
                  <video
                    className="w-full h-full object-cover"
                    src="/videos/dubai_skyline.mp4"
                    autoPlay
                    controls
                    loop
                    playsInline
                    poster="/images/dubai_skyline.png"
                  />
                )}

                {mediaTab === 'gallery' && (
                  <div className="relative w-full h-full">
                    <img
                      src={DOWNTOWN_GALLERY[currentSlide]}
                      alt="Dubai Destination Slide"
                      className="w-full h-full object-cover transition-all duration-500"
                    />

                    {/* Navigation Arrows */}
                    <button
                      onClick={handlePrevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gold border border-white/80 hover:scale-115 transition-all duration-300 shadow-md focus-ring"
                      aria-label="Previous Slide"
                    >
                      <FiChevronLeft size={22} />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gold border border-white/80 hover:scale-115 transition-all duration-300 shadow-md focus-ring"
                      aria-label="Next Slide"
                    >
                      <FiChevronRight size={22} />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs text-text-secondary text-center leading-relaxed mt-6 max-w-xl font-sans font-light">
                {mediaTab === 'youtube' && "Streaming Emaar's official Downtown Dubai promotional showcase directly from Emaar Properties' global CDN."}
                {mediaTab === 'local' && "Playing the high-resolution local MP4 loop directly from our local sales deck web asset directory."}
                {mediaTab === 'gallery' && "Experience the grand architectural alignment of Dubai Mall and the Downtown Dubai catchment. Click or swipe the premium visual deck."}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
