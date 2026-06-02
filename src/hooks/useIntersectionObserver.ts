'use client';

import { useState, useEffect, RefObject } from 'react';

export const useIntersectionObserver = (
  elementRef: RefObject<Element | null>,
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px' }
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options.threshold, options.rootMargin, options.root]);

  return isIntersecting;
};
