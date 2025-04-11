import React, { createContext, useContext, useState } from 'react';
import { Trip, Vehicle, Reservation, SearchFilters, User } from '@/types';

interface TripContextType {
  trips: Trip[];
  vehicles: Vehicle[];
  reservations: Reservation[];
  users: User[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  addVehicle: (vehicle: Vehicle) => void;
  getDriverTrips: (driverId: string) => Trip[];
  getPassengerReservations: (passengerId: string) => Reservation[];
  searchTrips: (filters: SearchFilters) => Trip[];
  makeReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
  cancelReservation: (reservationId: string) => void;
  getVehiclesByOwnerId: (ownerId: string) => Vehicle[];
}

// Mock data
const mockTrips: Trip[] = [
  {
    id: 't1',
    driverId: 'd1',
    departureCity: 'Paris',
    arrivalCity: 'Lyon',
    departureDate: '2025-04-20',
    departureTime: '08:00',
    price: 25,
    availableSeats: 3,
    allowPets: true,
    allowSmoking: false,
    vehicleId: 'v1',
    description: 'Direct route via A6, comfortable car with AC',
  },
  {
    id: 't2',
    driverId: 'd1',
    departureCity: 'Lyon',
    arrivalCity: 'Marseille',
    departureDate: '2025-04-22',
    departureTime: '10:30',
    price: 30,
    availableSeats: 2,
    allowPets: false,
    allowSmoking: false,
    vehicleId: 'v1',
    description: 'Scenic route with a short coffee break',
  },
  {
    id: 't3',
    driverId: 'd2',
    departureCity: 'Nice',
    arrivalCity: 'Paris',
    departureDate: '2025-04-25',
    departureTime: '06:00',
    price: 45,
    availableSeats: 4,
    allowPets: true,
    allowSmoking: true,
    vehicleId: 'v2',
    description: 'Long journey with stops for meals',
  },
];

const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    brand: 'Renault',
    model: 'Clio',
    licensePlate: 'AB-123-CD',
    ownerId: 'd1',
  },
  {
    id: 'v2',
    brand: 'Peugeot',
    model: '308',
    licensePlate: 'EF-456-GH',
    ownerId: 'd2',
  },
];

const mockReservations: Reservation[] = [
  {
    id: 'r1',
    tripId: 't1',
    passengerId: 'p1',
    status: 'confirmed',
    createdAt: '2025-04-15T10:30:00Z',
    seatsReserved: 1,
  },
];

const mockUsers: User[] = [
  {
    id: 'd1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    role: 'driver',
    rating: 4.8,
    memberSince: '2022-05-15',
  },
  {
    id: 'd2',
    name: 'Marie Martin',
    email: 'marie@example.com',
    role: 'driver',
    rating: 4.2,
    memberSince: '2021-08-10',
  },
  {
    id: 'p1',
    name: 'Lucas Bernard',
    email: 'lucas@example.com',
    role: 'passenger',
    memberSince: '2023-01-20',
  },
];

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: React.ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [users] = useState<User[]>(mockUsers);

  const addTrip = (trip: Omit<Trip, 'id'>) => {
    setTrips([...trips, { ...trip, id: `t${trips.length + 1}` }]);
  };

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles([...vehicles, { ...vehicle, id: `v${vehicles.length + 1}` }]);
  };

  const getDriverTrips = (driverId: string) => {
    return trips.filter(trip => trip.driverId === driverId);
  };

  const getPassengerReservations = (passengerId: string) => {
    return reservations.filter(res => res.passengerId === passengerId);
  };

  const searchTrips = (filters: SearchFilters) => {
    return trips.filter(trip => {
      if (filters.departureCity && !trip.departureCity.toLowerCase().includes(filters.departureCity.toLowerCase())) {
        return false;
      }
      if (filters.arrivalCity && !trip.arrivalCity.toLowerCase().includes(filters.arrivalCity.toLowerCase())) {
        return false;
      }
      if (filters.departureDate && trip.departureDate !== filters.departureDate) {
        return false;
      }
      if (filters.allowPets !== undefined && trip.allowPets !== filters.allowPets) {
        return false;
      }
      if (filters.allowSmoking !== undefined && trip.allowSmoking !== filters.allowSmoking) {
        return false;
      }
      if (filters.maxPrice !== undefined && trip.price > filters.maxPrice) {
        return false;
      }
      return true;
    });
  };

  const makeReservation = (reservation: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `r${reservations.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    setReservations([...reservations, newReservation]);
    
    setTrips(
      trips.map(trip => {
        if (trip.id === reservation.tripId) {
          return {
            ...trip,
            availableSeats: trip.availableSeats - reservation.seatsReserved,
          };
        }
        return trip;
      })
    );
  };

  const cancelReservation = (reservationId: string) => {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    setReservations(
      reservations.map(r => {
        if (r.id === reservationId) {
          return { ...r, status: 'cancelled' as const };
        }
        return r;
      })
    );

    setTrips(
      trips.map(trip => {
        if (trip.id === reservation.tripId) {
          return {
            ...trip,
            availableSeats: trip.availableSeats + reservation.seatsReserved,
          };
        }
        return trip;
      })
    );
  };

  const getVehiclesByOwnerId = (ownerId: string) => {
    return vehicles.filter(vehicle => vehicle.ownerId === ownerId);
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        vehicles,
        reservations,
        users,
        addTrip,
        addVehicle,
        getDriverTrips,
        getPassengerReservations,
        searchTrips,
        makeReservation,
        cancelReservation,
        getVehiclesByOwnerId,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
