import { LeasingTerm } from '@/types';

export const leasingTerms: LeasingTerm[] = [
  {
    id: 'luxury-flagship',
    tierName: 'Luxury Flagship',
    priceRange: 'AED 2,500 – 4,000 / sq ft / year',
    sizeRange: '3,000 – 15,000 sq ft',
    profiles: [
      'Haute couture fashion houses',
      'Exclusive high-jewelry and watch watchmakers',
      'International luxury heritage maisons'
    ],
    zones: [
      'Fashion Avenue Ground Floor',
      'The Grand Atrium Premium Axis',
      'Luxury Boulevard VIP Core'
    ],
    status: 'Limited'
  },
  {
    id: 'premium-retail',
    tierName: 'Premium Retail',
    priceRange: 'AED 1,200 – 2,500 / sq ft / year',
    sizeRange: '500 – 3,000 sq ft',
    profiles: [
      'Contemporary international fashion brands',
      'Flagship cosmetics and cosmetic boutiques',
      'Innovative consumer electronics labels'
    ],
    zones: [
      'The Village (Urban Lifestyle)',
      'Ground and First Level High-Streets',
      'Central Galleria Corridors'
    ],
    status: 'Available'
  },
  {
    id: 'food-beverage',
    tierName: 'Food & Beverage',
    priceRange: 'AED 800 – 1,500 / sq ft / year',
    sizeRange: '200 – 2,000 sq ft',
    profiles: [
      'Michelin-starred dining operators',
      'Bespoke artisanal bakeries & cafes',
      'High-end global food chains'
    ],
    zones: [
      'The Fine Dining Strip',
      'Waterfront Promenade Terrace',
      'Premium Dining Atrium Clusters'
    ],
    status: 'Limited'
  },
  {
    id: 'popup-kiosk',
    tierName: 'Pop-Up / Kiosk',
    priceRange: 'AED 150K – 500K / 6-month term',
    sizeRange: '50 – 150 sq ft',
    profiles: [
      'Capsule product launches',
      'Emerging artisanal designers',
      'Specialty perfume or eyewear counters'
    ],
    zones: [
      'Atrium Pedestrian Walkways',
      'High-Traffic Elevator Plazas',
      'Transition Walkway Corridors'
    ],
    status: 'Enquire'
  }
];

export const keyLeasingTerms = {
  duration: '5 to 10 year lease terms for permanent stores (6 months for kiosks)',
  fitoutContribution: 'Substantial landlord fit-out contributions available for tier-1 anchors',
  marketingSupport: 'Access to joint tenant promotional campaigns and digital mall directories',
  exclusivityZones: 'Available category exclusivity clauses in specific corridors (subject to review)'
};
