// Core entity types for Cargolinked

export type UserRole = 'individual' | 'business' | 'agent';

export type FreightRequestStatus = 'draft' | 'active' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';

export type QuoteStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export type CargoType = 'general' | 'fragile' | 'hazardous' | 'perishable' | 'oversized' | 'liquid' | 'other';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  companyName?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
}

export interface FreightRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  origin: Location;
  destination: Location;
  cargoType: CargoType;
  weight?: number; // in kg
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  budget?: number;
  currency: string;
  preferredPickupDate?: string;
  preferredDeliveryDate?: string;
  status: FreightRequestStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface Quote {
  id: string;
  freightRequestId: string;
  agentId: string;
  price: number;
  currency: string;
  message: string;
  estimatedPickupDate?: string;
  estimatedDeliveryDate?: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface AgentProfile {
  id: string;
  userId: string;
  companyName: string;
  businessRegistrationNumber?: string;
  description: string;
  services: string[];
  coverageAreas: string[];
  rating: number;
  totalJobs: number;
  isVerified: boolean;
  verificationDocuments?: string[];
  contactEmail: string;
  contactPhone: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  freightRequestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyName?: string;
  phone?: string;
}

// Form types
export interface CreateFreightRequestData {
  title: string;
  description: string;
  origin: Location;
  destination: Location;
  cargoType: CargoType;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  budget?: number;
  currency: string;
  preferredPickupDate?: string;
  preferredDeliveryDate?: string;
}

export interface CreateQuoteData {
  freightRequestId: string;
  price: number;
  currency: string;
  message: string;
  estimatedPickupDate?: string;
  estimatedDeliveryDate?: string;
}

export interface UpdateAgentProfileData {
  companyName?: string;
  description?: string;
  services?: string[];
  coverageAreas?: string[];
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
}
