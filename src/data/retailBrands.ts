import { RetailBrand } from '@/types';

export const luxuryBrands: RetailBrand[] = [
  { id: 'lv', name: 'Louis Vuitton', tier: 'luxury', category: 'High Fashion & Leather Goods', logoColor: '#2C2520', storeSize: '15,000 sq ft' },
  { id: 'chanel', name: 'Chanel', tier: 'luxury', category: 'Haute Couture & Fine Jewelry', logoColor: '#000000', storeSize: '12,500 sq ft' },
  { id: 'gucci', name: 'Gucci', tier: 'luxury', category: 'Luxury Apparel & Accessories', logoColor: '#1D3C34', storeSize: '10,800 sq ft' },
  { id: 'hermes', name: 'Hermès', tier: 'luxury', category: 'Exclusive Leather & Couture', logoColor: '#E65A28', storeSize: '9,000 sq ft' },
  { id: 'dior', name: 'Dior', tier: 'luxury', category: 'Luxury Ready-to-Wear & Beauty', logoColor: '#111111', storeSize: '11,500 sq ft' },
  { id: 'cartier', name: 'Cartier', tier: 'luxury', category: 'High Jewelry & Fine Watches', logoColor: '#7D2228', storeSize: '8,500 sq ft' },
  { id: 'rolex', name: 'Rolex', tier: 'luxury', category: 'Prestigious Horology', logoColor: '#006039', storeSize: '6,200 sq ft' },
  { id: 'tiffany', name: 'Tiffany & Co.', tier: 'luxury', category: 'Iconic Diamond Jewelry', logoColor: '#81D8D0', storeSize: '7,500 sq ft' },
  { id: 'prada', name: 'Prada', tier: 'luxury', category: 'Avant-garde Fashion', logoColor: '#1C1C1C', storeSize: '9,500 sq ft' },
  { id: 'burberry', name: 'Burberry', tier: 'luxury', category: 'British Heritage Couture', logoColor: '#C49A45', storeSize: '8,000 sq ft' },
  { id: 'versace', name: 'Versace', tier: 'luxury', category: 'High-Glamour Apparel', logoColor: '#0A0A0A', storeSize: '7,200 sq ft' },
  { id: 'bulgari', name: 'Bulgari', tier: 'luxury', category: 'Italian Fine Jewelry & Watches', logoColor: '#5E4831', storeSize: '6,800 sq ft' },
  { id: 'vancleef', name: 'Van Cleef & Arpels', tier: 'luxury', category: 'Poetic High Jewelry', logoColor: '#1A2B23', storeSize: '5,500 sq ft' },
  { id: 'bottega', name: 'Bottega Veneta', tier: 'luxury', category: 'Luxurious Woven Leather', logoColor: '#0F261C', storeSize: '7,000 sq ft' },
  { id: 'ysl', name: 'Saint Laurent', tier: 'luxury', category: 'Modern Paris Couture', logoColor: '#050505', storeSize: '9,200 sq ft' }
];

export const premiumBrands: RetailBrand[] = [
  { id: 'apple', name: 'Apple', tier: 'premium', category: 'Consumer Tech Flagship', logoColor: '#555555', storeSize: '24,000 sq ft' },
  { id: 'samsung', name: 'Samsung', tier: 'premium', category: 'Interactive Technology', logoColor: '#0C4DA2', storeSize: '12,000 sq ft' },
  { id: 'zara', name: 'Zara', tier: 'premium', category: 'Global Fast Fashion', logoColor: '#222222', storeSize: '35,000 sq ft' },
  { id: 'hm', name: 'H&M', tier: 'premium', category: 'Contemporary Lifestyle Retail', logoColor: '#CF142B', storeSize: '30,000 sq ft' },
  { id: 'uniqlo', name: 'Uniqlo', tier: 'premium', category: 'High-Quality Minimalist Casuals', logoColor: '#E60012', storeSize: '22,000 sq ft' },
  { id: 'sephora', name: 'Sephora', tier: 'premium', category: 'Prestigious Cosmetics & Beauty', logoColor: '#1F1F1F', storeSize: '10,000 sq ft' },
  { id: 'mac', name: 'MAC', tier: 'premium', category: 'Professional Makeup Artistry', logoColor: '#090909', storeSize: '4,500 sq ft' },
  { id: 'jomalone', name: 'Jo Malone', tier: 'premium', category: 'Bespoke Scents & Colognes', logoColor: '#EFECE1', storeSize: '3,200 sq ft' },
  { id: 'dyson', name: 'Dyson', tier: 'premium', category: 'Premium Styling & Smart Appliances', logoColor: '#3C1053', storeSize: '4,000 sq ft' },
  { id: 'lego', name: 'LEGO', tier: 'premium', category: 'Experiential Toy Flagship', logoColor: '#E60012', storeSize: '6,500 sq ft' }
];

export const anchorStores: RetailBrand[] = [
  { id: 'lafayette', name: 'Galeries Lafayette', tier: 'anchor', category: 'French Luxury Department Store', logoColor: '#E30613', storeSize: '215,000 sq ft' },
  { id: 'bloomingdales', name: 'Bloomingdale\'s', tier: 'anchor', category: 'Upscale US Department Store', logoColor: '#000000', storeSize: '146,000 sq ft' },
  { id: 'marks', name: 'Marks & Spencer', tier: 'anchor', category: 'British Heritage Retail & Food Hall', logoColor: '#005A3C', storeSize: '85,000 sq ft' }
];

export const retailOpportunities = [
  {
    title: 'Flagship Entry',
    description: 'Establish custom, highly specialized storefront structures in primary pedestrian axes that act as key anchors for brand presence.',
  },
  {
    title: 'Category Exclusivity',
    description: 'Negotiate limited vertical category locks in premium designated malls corridors, protecting positioning and market share.',
  },
  {
    title: 'Pop-Up Programme',
    description: 'Leverage flexible short-term leases in high-traffic atrium spaces to test new capsule releases and drive immersive marketing campaigns.',
  }
];
