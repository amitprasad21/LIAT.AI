import { DiningOption } from '@/types';

export const diningOptions: DiningOption[] = [
  // Fine Dining
  { id: 'nobu', name: 'Nobu', cuisine: 'Japanese-Peruvian', tier: 'fine-dining', atmosphere: 'Elite & Dramatic', highlight: 'Signature black cod miso, premium sake bar, and VIP lounges.' },
  { id: 'zuma', name: 'Zuma', cuisine: 'Contemporary Japanese', tier: 'fine-dining', atmosphere: 'Energetic Luxury', highlight: 'Award-winning Robata grill and high-society Izakaya dining.' },
  { id: 'cipriani', name: 'Cipriani', cuisine: 'Classic Italian', tier: 'fine-dining', atmosphere: 'Sophisticated Yacht-Style', highlight: 'World-famous Carpaccio and original Bellini cocktail hospitality.' },
  { id: 'nusret', name: 'Nusr-Et', cuisine: 'Premium Steakhouse', tier: 'fine-dining', atmosphere: 'Theatrical Editorial', highlight: 'Exceptional cuts of gold-leaf steaks served by internet icon Salt Bae.' },
  { id: 'lpmaison', name: 'La Petite Maison', cuisine: 'French Mediterranean', tier: 'fine-dining', atmosphere: 'Light & Artistic', highlight: 'Exquisite Niçoise gastronomy served in elegant Riviera gallery layouts.' },

  // Casual
  { id: 'shack', name: 'Shake Shack', cuisine: 'American Premium Fast Casual', tier: 'casual', atmosphere: 'Vibrant & Modern', highlight: '100% all-natural Angus beef burgers, custom shakes, and crinkle fries.' },
  { id: 'cheesecake', name: 'The Cheesecake Factory', cuisine: 'Global Eclectic', tier: 'casual', atmosphere: 'Grand & Warm', highlight: 'Over 250 freshly prepared menu items and 30+ signature cheesecakes.' },
  { id: 'pfchangs', name: 'PF Chang\'s', cuisine: 'Asian Fusion', tier: 'casual', atmosphere: 'Bold & Stylized', highlight: 'Legendary dynamite shrimp and wok-fired classics in a majestic setting.' },
  { id: 'carluccios', name: 'Carluccio\'s', cuisine: 'Casual Italian', tier: 'casual', atmosphere: 'Fresh & Friendly', highlight: 'Authentic pasta dishes and wood-fired flatbreads with Italian deli goods.' },
  { id: 'nandos', name: 'Nando\'s', cuisine: 'Afro-Portuguese', tier: 'casual', atmosphere: 'Rhythmic & Spicy', highlight: 'Signature flame-grilled PERi-PERi chicken skewers and specialty bastes.' },

  // Cafes
  { id: 'paul', name: 'Paul Bakery', cuisine: 'French Boulangerie', tier: 'cafe', atmosphere: 'Rustic French Elegance', highlight: 'Freshly baked artisanal croissants, rustic baguettes, and fine patisseries.' },
  { id: 'timhortons', name: 'Tim Hortons', cuisine: 'Canadian Coffee & Baked Goods', tier: 'cafe', atmosphere: 'Cozy & Familiar', highlight: 'Premium double-double coffee blend, classic donuts, and bite-sized Timbits.' },
  { id: 'caribou', name: 'Caribou Coffee', cuisine: 'Artisanal Coffee & Roasters', tier: 'cafe', atmosphere: 'Warm Timber Lounge', highlight: 'Sustainably sourced direct-trade espresso beverages and fresh sandwiches.' },
  { id: 'jones', name: 'Jones the Grocer', cuisine: 'Australian Gourmet', tier: 'cafe', atmosphere: 'Bright & Gastronomic', highlight: 'Exceptional walk-in cheese room, single-origin coffees, and organic breakfast.' }
];

export const diningFeatures = [
  {
    id: 'dining-strip',
    number: '01',
    title: 'The Fine Dining Strip',
    description: 'A curated cluster of Michelin-caliber concepts and elite culinary brands with custom entrances and private valet services.'
  },
  {
    id: 'food-court',
    number: '02',
    title: 'The Global Food Court',
    description: 'Offering over 50 international culinary concepts in an expansive, high-throughput environment designed for rapid dining.'
  },
  {
    id: 'waterfront-terrace',
    number: '03',
    title: 'The Waterfront Terrace',
    description: 'Premium outdoor tables directly overlooking the spectacular Dubai Fountain water shows and iconic Burj Khalifa views.'
  }
];
