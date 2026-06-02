import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines tailwind utility classes safely avoiding conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper to format large numbers for display.
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
