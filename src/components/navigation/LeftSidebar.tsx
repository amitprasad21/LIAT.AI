'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import {
  FiGrid,
  FiShoppingBag,
  FiAward,
  FiCoffee,
  FiSmile,
  FiCalendar,
  FiDollarSign,
  FiKey,
  FiLayers,
  FiMessageSquare,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const SIDEBAR_LINKS = [
  { label: 'Overview', href: '/#overview', hash: 'overview', icon: FiGrid },
  { label: 'Retail', href: '/#retail', hash: 'retail', icon: FiShoppingBag },
  { label: 'Luxury', href: '/#luxury', hash: 'luxury', icon: FiAward },
  { label: 'Dining', href: '/#dining', hash: 'dining', icon: FiCoffee },
  { label: 'Entertainment', href: '/#entertainment', hash: 'entertainment', icon: FiSmile },
  { label: 'Events', href: '/#events', hash: 'events', icon: FiCalendar },
  { label: 'Sponsorship', href: '/#sponsorship', hash: 'sponsorship', icon: FiDollarSign },
  { label: 'Leasing', href: '/#leasing', hash: 'leasing', icon: FiKey },
  { label: 'Venues', href: '/#venues', hash: 'venues', icon: FiLayers },
  { label: 'Contact', href: '/#contact', hash: 'contact', icon: FiMessageSquare },
];

export const LeftSidebar: React.FC = () => {
  const progress = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  // Sync hash state with sidebar links
  useEffect(() => {
    const handleHashChange = () => {
      // Default to overview if on home route with no hash
      const hash = window.location.hash.replace('#', '') || 'overview';
      setActiveHash(hash);
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {/* 1. Desktop Vertical Left Pinned Sidebar */}
      <aside
        className="hidden lg:flex flex-col items-center fixed top-4 left-4 bottom-4 w-20 py-8 rounded-2xl glass-panel z-50 select-none border border-slate-200/80 shadow-sm"
        aria-label="Sidebar Navigation"
      >
        {/* Scroll Progress Meter around Logo */}
        <Link
          href="/#overview"
          className="relative w-11 h-11 rounded-full flex items-center justify-center bg-surface border border-slate-200/80 mb-12 cursor-pointer focus-ring group hover:scale-[1.03] transition-all duration-300"
          title="Dubai Mall Home"
        >
          {/* Circular progress arc */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="transparent"
              stroke="rgba(30, 58, 138, 0.08)"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="transparent"
              stroke="#1E3A8A"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 * (1 - progress / 100)}
              className="transition-all duration-150 ease-out"
            />
          </svg>
          <span className="font-display text-[9px] font-bold text-gold tracking-tight">DM</span>
        </Link>

        {/* Links Navigation Group */}
        <div className="flex-1 flex flex-col gap-5 justify-center w-full px-3">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = activeHash === link.hash;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-250 focus-ring',
                  isActive
                    ? 'bg-surface text-gold border border-slate-200/80 shadow-sm'
                    : 'bg-transparent text-text-secondary hover:text-gold hover:bg-surface hover:shadow-sm'
                )}
                title={link.label}
              >
                <Icon size={19} className="transition-transform duration-300 group-hover:scale-105" />
                
                {/* Active Indicator dot */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3.5 bg-gold rounded-r-md" />
                )}

                {/* Floating Premium Label Hook */}
                <span className="absolute left-16 px-3 py-1.5 rounded-lg bg-surface border border-slate-200/80 text-[10px] uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-250 shadow-md">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Global Branding footer tag */}
        <div className="text-[7px] font-light text-text-secondary tracking-[0.2em] uppercase transform -rotate-90 origin-center whitespace-nowrap mt-4">
          DUBAI MALL
        </div>
      </aside>

      {/* 2. Mobile Bottom Horizontal Glass Dock Panel */}
      <nav
        aria-label="Mobile Navigation"
        className="flex lg:hidden fixed bottom-4 left-4 right-4 h-16 rounded-xl glass-panel items-center justify-around px-4 z-50 border border-slate-200/80 shadow-md select-none"
      >
        {SIDEBAR_LINKS.slice(0, 5).map((link) => {
          const isActive = activeHash === link.hash;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-350 focus-ring',
                isActive && !menuOpen
                  ? 'bg-surface text-gold border border-slate-200/80 shadow-sm'
                  : 'bg-transparent text-text-secondary hover:text-gold'
              )}
            >
              <Icon size={17} />
            </Link>
          );
        })}
        {/* Toggleable mobile full menu trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={cn(
            'w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-350 focus-ring',
            menuOpen
              ? 'bg-surface text-gold border border-slate-200/80 shadow-sm'
              : 'bg-transparent text-text-secondary hover:text-gold'
          )}
          aria-expanded={menuOpen}
          aria-label="Toggle Full Navigation Menu"
        >
          {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
        </button>
      </nav>

      {/* 3. Mobile Full-Screen Glass Overlay Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 w-full h-screen bg-background/95 border border-slate-200/85 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out lg:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        )}
      >
        <div className="flex flex-col space-y-4 text-center max-h-[80vh] overflow-y-auto w-full px-12">
          <Link
            href="/#overview"
            onClick={() => setMenuOpen(false)}
            className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block mb-4 hover:text-gold-light transition-colors duration-300 focus-ring cursor-pointer"
          >
            DUBAI MALL SALES DECK
          </Link>
          {SIDEBAR_LINKS.map((link, idx) => {
            const isActive = activeHash === link.hash;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${idx * 40}ms` : '0ms' }}
                className={cn(
                  'flex items-center justify-center gap-3 py-2.5 rounded-xl border text-base uppercase tracking-widest font-sans transition-all duration-300 w-full max-w-sm mx-auto',
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
                  isActive
                    ? 'bg-surface text-gold font-semibold border-slate-200/80 shadow-sm'
                    : 'bg-transparent text-text-secondary border-transparent hover:text-gold hover:bg-surface'
                )}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
