export interface MallStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface RetailBrand {
  id: string;
  name: string;
  tier: 'luxury' | 'premium' | 'anchor';
  category: string;
  logoColor: string;
  storeSize: string;
}

export interface DiningOption {
  id: string;
  name: string;
  cuisine: string;
  tier: 'fine-dining' | 'casual' | 'cafe' | 'food-court';
  atmosphere: string;
  highlight: string;
}

export interface EntertainmentAttraction {
  id: string;
  name: string;
  keyStat: string;
  hook: string;
  iconName: string;
  description: string;
}

export interface EventVenue {
  id: string;
  name: string;
  capacity: number;
  areaSqM?: number;
  idealFor: string[];
  features: string[];
  pastClients?: string[];
}

export interface SponsorshipPackage {
  id: string;
  tier: 'PLATINUM' | 'GOLD' | 'SILVER' | 'EVENT';
  price: string;
  inclusions: string[];
  duration: string;
}

export interface LeasingTerm {
  id: string;
  tierName: string;
  priceRange: string;
  sizeRange: string;
  profiles: string[];
  zones: string[];
  status: 'Limited' | 'Available' | 'Enquire';
}

export interface VenueDetail {
  id: string;
  name: string;
  capacityBadge: string;
  features: string[];
  svgLayoutType: 'atrium' | 'catwalk' | 'rink' | 'island';
  description: string;
}

export interface ContactSubmission {
  id?: string;
  intent: 'lease' | 'sponsor' | 'venue';
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface LeasingInquiry {
  id?: string;
  name: string;
  company: string;
  category: string;
  preferredZone: string;
  sqftRequirement: string;
  message: string;
  createdAt?: string;
}

export interface VenueEnquiry {
  id?: string;
  venueName: string;
  eventType: string;
  expectedAttendance: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  eventDate: string;
  createdAt?: string;
}

export interface SponsorshipEnquiry {
  id?: string;
  packageTier: string;
  brandName: string;
  contactName: string;
  email: string;
  message: string;
  createdAt?: string;
}
