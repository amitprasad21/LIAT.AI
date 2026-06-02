import { SponsorshipPackage } from '@/types';

export const sponsorshipPackages: SponsorshipPackage[] = [
  {
    id: 'platinum',
    tier: 'PLATINUM',
    price: '$500,000 / year',
    duration: '12 Months',
    inclusions: [
      'Naming rights to one major high-profile attraction precinct',
      '52 weeks of continuous digital OOH across 800+ smart screens',
      '12 exclusive major activation events in the Grand Atrium (no venue rental fees)',
      'A dedicated semi-permanent brand zone (up to 500 sq m)',
      'Direct monthly access to first-party audience demographic data insights',
      'Full social media co-marketing campaigns to our 22M+ followers'
    ]
  },
  {
    id: 'gold',
    tier: 'GOLD',
    price: '$250,000 / year',
    duration: '12 Months',
    inclusions: [
      '26 weeks of premium digital OOH slots across 400 targeted screens',
      '6 high-impact brand activation events in primary corridors',
      'Exclusive co-branded high-production digital content partnerships',
      'Dedicated social media integration across Emaar/Dubai Mall channels',
      'Strategic logo placement on mall interactive maps and mobile apps'
    ]
  },
  {
    id: 'silver',
    tier: 'SILVER',
    price: '$100,000 / year',
    duration: '12 Months',
    inclusions: [
      '12 weeks of digital OOH slots in key high-traffic thoroughfares',
      '2 corridor-level pop-up brand activation events',
      'Targeted digital and email marketing co-campaign inclusion',
      'Strategic brand listings and interactive directory logo presence'
    ]
  },
  {
    id: 'event',
    tier: 'EVENT',
    price: '$25,000 - $75,000 / event',
    duration: 'Per Event Term',
    inclusions: [
      'Short-term dedicated pop-up retail or exhibition booth activation space',
      'Direct consumer product sampling and interactive demo authorization',
      'Localized event-specific digital OOH promotional support',
      'Pre-event email newsletter and social media announcement push'
    ]
  }
];

export const sponsorshipReachStats = [
  { value: '100M+', label: 'Annual Footfall Impressions' },
  { value: '800+', label: 'Connected Smart OOH Screens' },
  { value: '22M+', label: 'Aggregated Social Media Reach' },
  { value: '3.2 hr', label: 'Average High-Attention Dwell Time' }
];

export const activationTypes = [
  { name: 'Pop-Up Zone', description: 'Immersive custom structures built in primary shopping atriums to capture maximum gaze.' },
  { name: 'Digital OOH', description: 'Dynamic video creatives scheduled across our network of high-density LCD and LED displays.' },
  { name: 'Social Integration', description: 'Targeted brand features pushed directly to our global, hyper-active digital audience.' },
  { name: 'In-Store Showcase', description: 'Cross-promotional retail campaigns in partner boutiques and VIP styling salons.' },
  { name: 'Event Partnerships', description: 'Official alignment and naming roles at marquee corporate and governmental events.' },
  { name: 'Sampling Campaigns', description: 'Strategic pop-ups allowing shoppers to touch, taste, and experience your product lines.' }
];
