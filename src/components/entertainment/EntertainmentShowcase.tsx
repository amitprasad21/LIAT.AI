'use client';

import React, { useRef, useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { entertainmentAttractions } from '@/data/entertainmentData';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFish, FaSnowflake, FaGamepad, FaChild, FaFilm, FaTree } from 'react-icons/fa';
import { FiX, FiChevronLeft, FiChevronRight, FiVideo, FiImage, FiTv } from 'react-icons/fi';

const AQUARIUM_GALLERY = [
  '/images/aquarium_showcase.png',
  '/images/dubai_skyline.png',
];

const ATTRACTION_IMAGES: Record<string, string> = {
  aquarium: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
  'ice-rink': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
  'vr-park': '/images/futuristic_vr_arena.png', // AI-Imagined VR Arena
  kidzania: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80',
  cinemas: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
  rainforest: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80'
};

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const EntertainmentShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mediaTab, setMediaTab] = useState<'youtube' | 'local' | 'gallery'>('youtube');
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % AQUARIUM_GALLERY.length);
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + AQUARIUM_GALLERY.length) % AQUARIUM_GALLERY.length);
  };

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    // Only activate desktop scroll-pinning on viewports 1024px and up
    if (window.innerWidth < 1024) return;

    // Build the GSAP ScrollTrigger Pin animation
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top+=100',
      end: 'bottom bottom-=200',
      pin: leftColRef.current,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    return () => {
      pinTrigger.kill();
    };
  }, { scope: containerRef });

  const getAttractionIcon = (iconName: string) => {
    const size = 38;
    const colorClass = 'text-gold';
    switch (iconName) {
      case 'GiShark':
        return <FaFish size={size} className={colorClass} />;
      case 'GiIceSkate':
        return <FaSnowflake size={size} className={colorClass} />;
      case 'GiVrHeadset':
        return <FaGamepad size={size} className={colorClass} />;
      case 'GiBriefcase':
        return <FaChild size={size} className={colorClass} />;
      case 'GiFilmProjector':
        return <FaFilm size={size} className={colorClass} />;
      default:
        return <FaTree size={size} className={colorClass} />;
    }
  };

  return (
    <section
      id="entertainment"
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-12 bg-background border-t border-gold/10"
      aria-label="Entertainment Attractions"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        
        {/* Left Column: Pinned Section Header */}
        <div ref={leftColRef} className="lg:col-span-4 lg:h-fit lg:sticky lg:top-32 self-start">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3 block">
            05 / EXPERIENTIAL ANCHORS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-wide text-ivory leading-tight mb-6">
            Not a Mall.<br />
            <span className="gold-text-gradient font-bold">An Experience.</span>
          </h2>
          <p className="text-lg font-accent font-light italic text-gold-light/90 mb-6 leading-relaxed">
            &ldquo;Dubai Mall is a highly active lifestyle destination centered on world-record attractions.&rdquo;
          </p>
          <p className="text-sm text-text-secondary leading-relaxed font-sans font-light mb-8">
            Each anchor attraction acts as a massive primary regional magnet, driving millions of high-attention global tourists and GCC families directly into our integrated commercial corridors.
          </p>
          
          <div className="h-[1px] w-32 bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Right Column: Alternating Cards that Scroll Beneath the Pinned Header */}
        <div className="lg:col-span-8 space-y-12">
          {entertainmentAttractions.map((attraction, idx) => {
            return (
              <ScrollReveal key={attraction.id} delay={0.15}>
                <div className="group rounded-2xl bg-surface border border-slate-200/60 p-6 md:p-8 hover:border-gold/30 hover:shadow-[0_15px_45px_rgba(30,58,138,0.04)] transition-all duration-500 flex flex-col md:flex-row gap-6 md:gap-8 items-stretch shadow-sm">
                  
                  {/* Left Side: Spec Content (2/3 width) */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      {/* Card Header with Icon & Title */}
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                        <div className="p-3 bg-gold/5 rounded-full border border-gold/15 flex items-center justify-center text-gold">
                          {getAttractionIcon(attraction.iconName)}
                        </div>
                        <div>
                          <h4 className="text-lg md:text-xl font-display font-semibold text-ivory group-hover:text-gold transition-colors duration-300">
                            {attraction.name}
                          </h4>
                          <span className="text-[9px] uppercase tracking-widest text-text-secondary">
                            Anchor Attraction &bull; {idx + 1}
                          </span>
                        </div>
                      </div>

                      {/* Editorial Hook & Description */}
                      <p className="text-xs font-accent italic text-gold/90 leading-relaxed mb-3">
                        &ldquo;{attraction.hook}&rdquo;
                      </p>
                      <p className="text-xs text-text-secondary leading-relaxed font-sans font-light">
                        {attraction.description}
                      </p>
                    </div>

                    {/* High Impact Stat Box */}
                    <div className="mt-6 p-3 rounded-lg bg-slate-50 border border-slate-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-[9px] uppercase tracking-wider text-text-secondary font-medium">
                        Key Performance Indicator
                      </span>
                      <span className="text-sm font-display font-semibold text-gold">
                        {attraction.keyStat}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Framed Image (1/3 width, responsive size) */}
                  <div className="w-full md:w-56 lg:w-64 h-48 md:h-auto rounded-xl overflow-hidden relative shrink-0 border border-slate-200/40 shadow-sm">
                    <img
                      src={ATTRACTION_IMAGES[attraction.id] || ''}
                      alt={attraction.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Cinematic Experiential Video Spotlight */}
        <ScrollReveal className="lg:col-span-12 mt-16 max-w-4xl mx-auto w-full">
          <div 
            className="rounded-2xl p-6 md:p-8 bg-surface border border-white/60 neu-outset transition-all duration-500 hover:shadow-[0_15px_45px_rgba(43,89,195,0.08)] group"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold block mb-2 text-center">
              EXPERIENTIAL SPOTLIGHT
            </span>
            <h3 className="text-xl md:text-2xl font-display font-semibold text-ivory text-center mb-6">
              Dubai Aquarium & Underwater Zoo: Immersive Scale
            </h3>
            
            {/* Custom Premium Light Video Frame */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/70 neu-inset bg-[#D8E2F0]">
              {!isInlinePlaying ? (
                <div 
                  onClick={() => setIsInlinePlaying(true)}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                >
                  <img
                    src="/images/aquarium_showcase.png"
                    alt="Dubai Aquarium Showcase"
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
                      Underwater Zoo Walking Tour Spotlight
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-gold/10 border border-gold/25 text-[8px] uppercase tracking-widest text-gold font-bold">
                      Click to Play
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full bg-black">
                  <iframe
                    className="w-full h-full border-none"
                    src="https://www.youtube.com/embed/pKay2ZPY7bE?autoplay=1&mute=0&rel=0&showinfo=0"
                    title="Dubai Aquarium Walkthrough"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
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
              Walk through the 270-degree acrylic walkthrough tunnel holding over 10 million liters of water and 33,000 marine animals, driving millions of tourists directly into adjacent retail blocks.
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
                AQUARIUM MEDIA HUB
              </span>
              <h3 className="font-display text-xl font-semibold text-ivory mb-6 text-center">
                Immersive Attractions Presentation
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
                    src="https://www.youtube.com/embed/pKay2ZPY7bE?autoplay=1&mute=0&rel=0&showinfo=0"
                    title="Dubai Aquarium and Underwater Zoo"
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
                    poster="/images/aquarium_showcase.png"
                  />
                )}

                {mediaTab === 'gallery' && (
                  <div className="relative w-full h-full">
                    <img
                      src={AQUARIUM_GALLERY[currentSlide]}
                      alt="Dubai Aquarium Showcase Slide"
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
                {mediaTab === 'youtube' && "Streaming Emaar's official 4K Dubai Aquarium walkthrough showcasing the 270-degree viewing tunnel."}
                {mediaTab === 'local' && "Playing the high-resolution local MP4 loop directly from our local sales deck web asset directory."}
                {mediaTab === 'gallery' && "Experience the breathtaking visual beauty of the Dubai Aquarium and Underwater Zoo. Click or swipe the premium visual deck."}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
