'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  description,
  align = 'center',
  className = '',
}) => {
  const isLeft = align === 'left';

  return (
    <ScrollReveal className={`mb-16 max-w-4xl ${isLeft ? 'mr-auto text-left' : 'mx-auto text-center'} ${className}`}>
      {badge && (
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
          {badge}
        </span>
      )}
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-wide text-ivory leading-tight mb-6">
        {title}
      </h2>

      {subtitle && (
        <p className="text-xl md:text-2xl font-accent font-light italic text-gold-light/90 mb-4 max-w-3xl mx-auto">
          &ldquo;{subtitle}&rdquo;
        </p>
      )}

      {description && (
        <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-sans font-light">
          {description}
        </p>
      )}
      
      <div className={`mt-6 h-[1px] w-24 bg-gradient-to-r from-gold/80 to-transparent ${isLeft ? '' : 'mx-auto'}`} />
    </ScrollReveal>
  );
};
