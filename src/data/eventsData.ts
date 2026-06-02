import { EventVenue } from '@/types';

export const eventVenues: EventVenue[] = [
  {
    id: 'grand-atrium',
    name: 'Grand Atrium',
    capacity: 4000,
    areaSqM: 1200,
    idealFor: ['Global Product Launches', 'High-Impact Brand Pop-Ups', 'Sponsorship Activations'],
    features: ['360-degree guest visibility', 'Direct luxury corridor access', 'State-of-the-art rigging systems'],
    pastClients: ['Ferrari Reveal', 'Apple Watch Launch', 'Dior Cruise Collection']
  },
  {
    id: 'fashion-catwalk',
    name: 'Fashion Catwalk',
    capacity: 1200,
    areaSqM: 2400,
    idealFor: ['Fashion Shows', 'Luxury Runway Presentations', 'VIP Influencer Galas'],
    features: ['High-resolution LED surround screens', 'Dedicated dressing chambers', 'Premium camera platform angles'],
    pastClients: ['Dubai Fashion Week', 'Vogue Fashion Experience', 'Chanel Cruise Tour']
  },
  {
    id: 'fountain-plaza',
    name: 'Fountain Plaza',
    capacity: 8000,
    areaSqM: 5000,
    idealFor: ['Outdoor Music Concerts', 'Evening Receptions', 'LargeScale Civic Festivals'],
    features: ['Burj Khalifa projection sync', 'Fountain choreography backing', 'Direct outdoor waterfront airflow'],
    pastClients: ['Emaar New Year Concerts', 'Nike Global Campaign Launch']
  },
  {
    id: 'ice-rink-event',
    name: 'Ice Rink Event Mode',
    capacity: 1800,
    areaSqM: 1800,
    idealFor: ['Corporate Banquets', 'Esports Tournaments', 'Ice Shows & Concerts'],
    features: ['Rapid insulated subfloor conversion', 'NHL-spec acoustics', 'Stadium tiered spectator seats'],
    pastClients: ['Red Bull Ice Hockey Finals', 'Emaar Annual Awards Gala']
  },
  {
    id: 'old-town-island',
    name: 'Old Town Island Bridge & Plaza',
    capacity: 5000,
    areaSqM: 3500,
    idealFor: ['Heritage Festivals', 'Art Exhibitions', 'Luxury Dining Galas'],
    features: ['Traditional Arabesque architecture', 'Direct Souk Al Bahar bridge connection', 'Spectacular open sky views'],
    pastClients: ['Art Dubai Afterparty', 'Cartier High Jewelry Gala']
  }
];

export const pastEvents = [
  'Dubai Fashion Week Official Host',
  'Apple iPhone Global Launch Activations',
  'Ferrari SF90 Stradale Middle East Reveal',
  'Cristiano Ronaldo Global Meet & Greet Event',
  'Nike "Run Dubai" Interactive Showcase',
  'Kim Kardashian Beauty Masterclass VIP Event',
  'Samsung Galaxy Unpacked Interactive Experience',
  'Adidas Football "Own The Arena" Pop-up Campaign'
];
