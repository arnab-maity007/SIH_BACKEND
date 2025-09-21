// Types for the Train Traffic Optimization System

export interface Train {
  id: string;
  name: string;
  route: string;
  status: 'On Time' | 'Delayed' | 'Cancelled' | 'Boarding' | 'Running Late';
  currentLocation: string;
  nextStation: string;
  delay?: number;
  speed?: number;
  capacity?: number;
  occupancy?: number;
  type?: string;
  platform?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Schedule {
  id: string;
  trainId: string;
  departure: string;
  arrival: string;
  route: string;
  platform: string;
  status: 'Scheduled' | 'Delayed' | 'Cancelled' | 'On Time' | 'Running Late';
  stops?: string[];
}

export interface Station {
  id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  platforms: number;
  capacity: number;
}

export interface RouteOptimization {
  id: string;
  trainId: string;
  originalRoute: string[];
  optimizedRoute: string[];
  timeSaved: number;
  fuelSaved: number;
  status: 'Pending' | 'Applied' | 'Rejected';
}

export interface AnalyticsData {
  totalTrains: number;
  onTimePercentage: number;
  delayedTrains: number;
  averageDelay: number;
  routeEfficiency: number;
  fuelEfficiency: number;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}