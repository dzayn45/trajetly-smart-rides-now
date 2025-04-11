
export type UserRole = 'driver' | 'passenger' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  rating?: number;
  memberSince?: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  ownerId: string;
  year?: string;
  color?: string;
}

export interface Trip {
  id: string;
  driverId: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  price: number;
  availableSeats: number;
  allowPets: boolean;
  allowSmoking: boolean;
  vehicleId?: string;
  description?: string;
}

export interface Reservation {
  id: string;
  tripId: string;
  passengerId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  seatsReserved: number;
}

export interface SearchFilters {
  departureCity?: string;
  arrivalCity?: string;
  departureDate?: string;
  allowPets?: boolean;
  allowSmoking?: boolean;
  maxPrice?: number;
}
