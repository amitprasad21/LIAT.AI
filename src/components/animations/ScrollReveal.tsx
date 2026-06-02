'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  staggerChildren?: boolean;
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  className = '',
  staggerChildren = false,
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If the user prefers reduced motion, disable transforms and only slide/fade instantly
  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], // Slow, deliberate ease curve
        when: staggerChildren ? 'beforeChildren' : undefined,
        staggerChildren: staggerChildren ? 0.15 : undefined,
      },
    },
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
