'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

export const HeroSection: React.FC = () => {

  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Fade-in stagger sequences
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], // Elegant ease
      },
    },
  };

  return (
    <section
      id="overview"
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-6 md:px-12 py-24 select-none"
      aria-label="Welcome Presentation"
    >
      {/* Cinematic Sunset Background Video (with Image Fallback) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-50">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-35 scale-[1.02]"
          poster="/images/dubai_skyline.png"
        >
          <source src="/videos/dubai_skyline.mp4" type="video/mp4" />
          {/* Fallback Image */}
          <img
            src="/images/dubai_skyline.png"
            alt="Downtown Dubai Cinematic Sunset"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-35 scale-[1.02] blur-[0.5px] animate-[pulse_12s_ease-in-out_infinite]"
          />
        </video>
      </div>

      {/* Cinematic Premium Light Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(228,235,245,0.45)_50%,rgba(228,235,245,0.95)_95%)] pointer-events-none" />

      {/* Hero Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl flex flex-col items-center"
      >
        {/* Subtle Luxury Category Label */}
        <motion.span
          variants={itemVariants}
          className="text-xs md:text-sm uppercase tracking-[0.45em] text-gold font-medium mb-6"
        >
          EMAAR PROPERTIES PRESENTS
        </motion.span>

        {/* Cinematic Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight text-ivory leading-[1.05] mb-8"
        >
          The World <br />
          <span className="gold-text-gradient font-bold">Shops Here.</span>
        </motion.h1>

        {/* editorial Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-accent font-light italic text-text-secondary max-w-3xl leading-relaxed mb-12"
        >
          Dubai Mall. 100 Million Annual Visitors. <br className="hidden sm:inline" />
          One Unrivalled Platform for Premium Global Brands.
        </motion.p>

        {/* Staggered CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto"
        >
          <button
            onClick={() => window.location.hash = 'leasing'}
            className="px-8 py-4 rounded bg-gold text-background text-xs uppercase tracking-[0.2em] font-sans font-bold hover:bg-gold-light transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,76,0.2)] hover:shadow-[0_4px_30px_rgba(201,168,76,0.35)] shimmer-btn focus-ring"
          >
            Lease Space
          </button>
          
          <button
            onClick={() => window.location.hash = 'sponsorship'}
            className="px-8 py-4 rounded border border-gold bg-transparent text-xs uppercase tracking-[0.2em] font-sans font-bold text-gold hover:bg-gold/10 transition-all duration-300 shimmer-btn focus-ring"
          >
            Become a Sponsor
          </button>

          <button
            onClick={() => window.location.hash = 'venues'}
            className="px-8 py-4 rounded border border-gold/40 bg-transparent text-xs uppercase tracking-[0.2em] font-sans font-bold text-ivory hover:border-gold hover:bg-gold/10 transition-all duration-300 shimmer-btn focus-ring"
          >
            Book a Venue
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Bouncing Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
        onClick={() => handleScrollTo('stats-overview')}
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-text-secondary mb-2 hover:text-gold transition-colors duration-300 font-light">
          Discover More
        </span>
        <div className="animate-scroll-bounce p-1 border border-gold/30 rounded-full hover:border-gold transition-colors duration-300">
          <FiChevronDown className="text-gold" size={18} />
        </div>
      </motion.div>
    </section>
  );
};
