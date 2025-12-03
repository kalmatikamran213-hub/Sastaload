import React from 'react';

export type Page = 'home' | 'about' | 'contact' | 'terms' | 'privacy' | 'login' | 'signup' | 'trust' | 'admin';

export interface QuoteRequest {
  origin: string;
  destination: string;
  cargoType: string;
  weight: string;
  date?: string;
}

export interface QuoteResult {
  estimatedPriceRange: string;
  distance: string;
  estimatedTime: string;
  routeAdvice: string;
  vehicleRecommendation: string;
  targetBid: string;
  fuelCostEstimate: string;
  demandStatus: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavigationProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onOpenWaitlist: () => void;
}

export interface SharedProps {
  onOpenWaitlist: () => void;
}

export interface ForDriversProps extends SharedProps {
  onNavigate: (page: Page) => void;
}

export interface AuthProps {
  onNavigate: (page: Page) => void;
}