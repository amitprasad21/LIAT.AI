'use client';

import React, { createContext, useContext, useState } from 'react';

// Baseline calculations for Mall Zones
export const ZONE_METRICS = {
  'Fashion Avenue Ground Floor': { baseRate: 350, footfall: 24000000, hnwPct: 94, categoryMatch: 'luxury-fashion' },
  'The Grand Atrium Premium Axis': { baseRate: 300, footfall: 38000000, hnwPct: 82, categoryMatch: 'premium-apparel' },
  'Central Galleria Corridors': { baseRate: 250, footfall: 28000000, hnwPct: 75, categoryMatch: 'consumer-tech' },
  'The Village (Urban Lifestyle)': { baseRate: 180, footfall: 12000000, hnwPct: 55, categoryMatch: 'kiosk-accessories' },
  'Waterfront Promenade Terrace': { baseRate: 220, footfall: 20000000, hnwPct: 80, categoryMatch: 'fine-dining' },
  'Atrium Pedestrian Walkways': { baseRate: 150, footfall: 18000000, hnwPct: 60, categoryMatch: 'cafes-beverages' }
};

interface DeckContextType {
  // Presenter Mode Settings
  isPresenterMode: boolean;
  setIsPresenterMode: React.Dispatch<React.SetStateAction<boolean>>;
  showPresenterHUD: boolean;
  setShowPresenterHUD: React.Dispatch<React.SetStateAction<boolean>>;

  // B2B Investor / Brand Info
  brandName: string;
  setBrandName: (val: string) => void;
  brandCategory: string;
  setBrandCategory: (val: string) => void;
  targetDemographic: string;
  setTargetDemographic: (val: string) => void;

  // Selected Spatial Placement
  selectedZone: string;
  setSelectedZone: (val: string) => void;
  selectedSpaceSqft: number;
  setSelectedSpaceSqft: (val: number) => void;
  leaseDurationYears: number;
  setLeaseDurationYears: (val: number) => void;

  // Calculated Lease / Sponsor Info
  calculatedLeaseRate: number; // monthly
  estimatedImpressions: number; // annual
  sponsorshipTier: 'platinum' | 'gold' | 'silver' | 'event' | '';
  setSponsorshipTier: (val: 'platinum' | 'gold' | 'silver' | 'event' | '') => void;

  // Interactive LOI
  loiAgreed: boolean;
  setLoiAgreed: (val: boolean) => void;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Presenter Mode
  const [isPresenterMode, setIsPresenterMode] = useState(false);
  const [showPresenterHUD, setShowPresenterHUD] = useState(true);

  // B2B Brand Profile
  const [brandName, setBrandName] = useState('');
  const [brandCategory, setBrandCategory] = useState('luxury-fashion');
  const [targetDemographic, setTargetDemographic] = useState('UHNW');

  // Spatial Selection
  const [selectedZone, setSelectedZone] = useState('Fashion Avenue Ground Floor');
  const [selectedSpaceSqft, setSelectedSpaceSqft] = useState(2500);
  const [leaseDurationYears, setLeaseDurationYears] = useState(3);
  const [sponsorshipTier, setSponsorshipTier] = useState<'platinum' | 'gold' | 'silver' | 'event' | ''>('');
  const [loiAgreed, setLoiAgreed] = useState(false);

  // Live lease rate calculation
  const metrics = ZONE_METRICS[selectedZone as keyof typeof ZONE_METRICS] || ZONE_METRICS['Fashion Avenue Ground Floor'];
  
  // Longer lease discount: 1 yr = 0%, 3 yr = 5%, 5 yr = 12%
  const durationDiscount = leaseDurationYears === 1 ? 0 : leaseDurationYears <= 3 ? 0.05 : 0.12;
  const annualRent = metrics.baseRate * selectedSpaceSqft * (1 - durationDiscount);
  const calculatedLeaseRate = Math.round(annualRent / 12);

  // Live exposure / impressions forecast
  // Scale exposure based on space size (larger storefront = higher visibility cap)
  const sizeFactor = Math.min(1.5, Math.max(0.6, selectedSpaceSqft / 3000));
  const estimatedImpressions = Math.round(metrics.footfall * sizeFactor);

  return (
    <DeckContext.Provider
      value={{
        isPresenterMode,
        setIsPresenterMode,
        showPresenterHUD,
        setShowPresenterHUD,
        brandName,
        setBrandName,
        brandCategory,
        setBrandCategory,
        targetDemographic,
        setTargetDemographic,
        selectedZone,
        setSelectedZone,
        selectedSpaceSqft,
        setSelectedSpaceSqft,
        leaseDurationYears,
        setLeaseDurationYears,
        calculatedLeaseRate,
        estimatedImpressions,
        sponsorshipTier,
        setSponsorshipTier,
        loiAgreed,
        setLoiAgreed
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return context;
};
