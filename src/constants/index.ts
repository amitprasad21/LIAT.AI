export const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Retail', href: '#retail' },
  { label: 'Luxury', href: '#luxury' },
  { label: 'Dining', href: '#dining' },
  { label: 'Entertainment', href: '#entertainment' },
  { label: 'Events', href: '#events' },
  { label: 'Sponsorship', href: '#sponsorship' },
  { label: 'Leasing', href: '#leasing' },
  { label: 'Venues', href: '#venues' },
  { label: 'Contact', href: '#contact' }
];

export const ANIMATION_DURATION = {
  slow: 0.8,
  medium: 0.5,
  fast: 0.3
};

export const MOTION_FADE_IN_UP = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0] // Slow, deliberate ease curve
    }
  }
};

export const MOTION_STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
