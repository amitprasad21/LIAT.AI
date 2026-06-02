'use client';

import React, { useRef } from 'react';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  duration = 2000,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.1, rootMargin: '0px' });
  const animatedValue = useCounterAnimation(value, isVisible, duration);

  return (
    <span ref={containerRef} className={className}>
      {animatedValue}
      {suffix}
    </span>
  );
};
