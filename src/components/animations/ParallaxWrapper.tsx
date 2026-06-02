'use client';

import React, { useRef, useState, useEffect } from 'react';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number; // positive for moving slower, negative for faster
  className?: string;
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  speed = 0.08,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const windowHeight = window.innerHeight;

      // Only apply parallax if element is currently in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate dynamic parallax translation amount
        const scrollDelta = scrollY - elementTop + windowHeight / 2;
        setOffset(scrollDelta * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </div>
  );
};
