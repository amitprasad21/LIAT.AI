'use client';

import React from 'react';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface StatCardProps {
  label: string;
  value: number;
  suffix: string;
  description: string;
  image?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix,
  description,
  image,
  delay = 0,
}) => {
  return (
    <ScrollReveal delay={delay} className="w-full flex flex-col h-full">
      <div className="group relative h-full rounded-lg bg-surface p-6 border border-gold/15 transition-all duration-500 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,168,76,0.08)] flex flex-col justify-between">
        {/* Shimmer line effect on hover */}
        <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-light/40 to-transparent -translate-x-full group-hover:animate-[shimmer-sweep_1.8s_ease-in-out_infinite]" />
        </div>

        <div>
          {image && (
            <div className="h-32 w-full rounded-md overflow-hidden relative border border-slate-200/50 mb-4 shadow-sm shrink-0">
              <img
                src={image}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
            </div>
          )}

          <h3 className="text-xs uppercase tracking-[0.25em] text-text-secondary font-medium mb-3 group-hover:text-gold transition-colors duration-300">
            {label}
          </h3>

          <div className="text-3xl md:text-4xl font-display font-bold text-gold-light mb-4 flex items-baseline">
            <AnimatedCounter value={value} suffix={suffix} className="gold-text-gradient font-bold tracking-tight" />
          </div>
        </div>

        <p className="text-[11px] text-text-secondary leading-relaxed font-sans font-light">
          {description}
        </p>
      </div>
    </ScrollReveal>
  );
};
