'use client';

import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/utils';
import { FiMenu, FiX } from 'react-icons/fi';

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    // Scroll state change for visual styles
    const handleScrollState = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Tracking active section with observer
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger section change near middle of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScrollState);
    return () => {
      window.removeEventListener('scroll', handleScrollState);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Offset for navbar height
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

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500',
          isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
        )}
      >
        {/* Scroll Progress Indicator Bar */}
        <div
          style={{ width: `${progress}%` }}
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold transition-all duration-100 ease-out"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Luxury Logo */}
          <a
            href="#overview"
            onClick={(e) => handleLinkClick(e, '#overview')}
            className="flex flex-col select-none text-left"
          >
            <span className="font-display text-lg md:text-xl font-bold tracking-[0.25em] text-gold uppercase transition-all duration-300 hover:text-gold-light">
              DUBAI MALL
            </span>
            <span className="text-[7px] uppercase tracking-[0.45em] text-text-secondary mt-0.5 font-light">
              Interactive Deck
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    'relative px-3 py-2 text-xs uppercase tracking-[0.18em] font-sans font-light transition-all duration-300 focus-ring',
                    isActive ? 'text-gold font-medium' : 'text-text-secondary hover:text-ivory'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gold" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Menu Actions / Dynamic CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="#leasing"
              onClick={(e) => handleLinkClick(e, '#leasing')}
              className="px-5 py-2.5 rounded border border-gold/40 bg-transparent text-[10px] font-sans uppercase tracking-[0.2em] font-medium text-gold hover:bg-gold hover:text-background transition-all duration-300 shimmer-btn focus-ring"
            >
              Lease Space
            </a>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-text-primary p-2 focus-ring hover:text-gold transition-colors duration-300"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Navigation Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 w-full h-screen bg-[#E4EBF5]/95 border border-white/60 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out lg:hidden',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        )}
      >
        <div className="flex flex-col space-y-6 text-center">
          {NAV_LINKS.map((link, idx) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{ transitionDelay: mobileMenuOpen ? `${idx * 50}ms` : '0ms' }}
                className={cn(
                  'text-xl uppercase tracking-[0.25em] font-sans transition-all duration-300 py-1 border-b border-transparent',
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
                  isActive ? 'text-gold font-semibold border-gold/30' : 'text-text-secondary hover:text-ivory'
                )}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#leasing"
            onClick={(e) => handleLinkClick(e, '#leasing')}
            className={cn(
              'mt-8 px-8 py-3.5 rounded border border-gold text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-background font-semibold transition-all duration-300',
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0'
            )}
          >
            Lease Retail Space
          </a>
        </div>
      </div>
    </>
  );
};
