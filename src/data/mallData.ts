import { MallStat } from '@/types';

export const coreStats: MallStat[] = [
  {
    id: 'visitors',
    label: 'Annual Traffic Yield',
    value: 100,
    suffix: 'M+',
    description: 'The world\'s highest-density retail catchment, generating massive organic traffic pipeline.',
  },
  {
    id: 'outlets',
    label: 'Tenancy Density',
    value: 1300,
    suffix: '+',
    description: 'An unparalleled luxury ecosystem featuring elite flagships and premium commercial anchors.',
  },
  {
    id: 'gla',
    label: 'Gross Leasable Area',
    value: 5.9,
    suffix: 'M sq ft',
    description: 'Highly optimized spatial layouts divided into specialized target demographic corridors.',
  },
  {
    id: 'dining',
    label: 'F&B Concessions',
    value: 200,
    suffix: '+',
    description: 'High-margin dining spaces generating prolonged consumer dwell time and retail crossover.',
  },
  {
    id: 'nationalities',
    label: 'Global Markets Served',
    value: 130,
    suffix: '+',
    description: 'A global demographics mix representing premier purchasing power from the GCC, Europe, and Asia.',
  },
  {
    id: 'sales',
    label: 'Annual Sales Velocity',
    value: 3.2,
    suffix: 'B+',
    description: 'Top-tier trade performance consistently driving high-margin corporate returns.',
  },
  {
    id: 'luxury',
    label: 'Luxury Outlets',
    value: 330,
    suffix: '+',
    description: 'The world\'s premier concentration of flagship luxury, driving peak ticket transaction averages.',
  },
  {
    id: 'social',
    label: 'Digital OOH Reach',
    value: 22,
    suffix: 'M+',
    description: 'Enormous organic social amplification and viral brand marketing exposure opportunities.',
  },
];

export const locationData = {
  address: 'Downtown Dubai Catchment Area, adjacent to Burj Khalifa',
  connections: [
    'Direct high-volume Metro connection linking 40M+ commuters annually',
    '20 minutes from Dubai International Airport (DXB) transit hub',
    'Integrated 15,000-bay intelligent parking structure with vehicle guidance systems',
  ],
  catchment: {
    residents: 'Primary capture: 3.3M+ residents within a 30-minute radius',
    markets: 'Secondary capture: Affluent GCC travelers and ultra-high-net-worth global tourists',
  },
};

export const audienceDemographics = {
  ageGroup: '60% of consumers belong to high-purchasing age cohorts (25–44 years)',
  householdIncome: '68% of households earn >$75K annually (premium purchasing tiers)',
  internationalTourists: '45% international tourists representing premier global luxury accounts',
  averageVisitDuration: '3.2 hours average retail dwell time per visit',
  averageSpend: '$285 average transaction amount per visit (industry-leading yield)',
};
