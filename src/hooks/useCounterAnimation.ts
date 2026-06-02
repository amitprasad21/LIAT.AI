'use client';

import { useState, useEffect } from 'react';

export const useCounterAnimation = (targetValue: number, trigger: boolean, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing curve (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentValue = easeProgress * targetValue;
      
      // Handle floating point decimals vs integers
      if (Number.isInteger(targetValue)) {
        setCount(Math.floor(currentValue));
      } else {
        setCount(Number(currentValue.toFixed(1)));
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetValue, trigger, duration]);

  return count;
};
