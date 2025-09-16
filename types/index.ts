// types/index.ts
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  totalRides: number;
  totalDistance: number;
  totalTime: number;
  badges: Badge[];
  joinedAt: Date;
  racingLevel: "Rookie" | "Pro" | "Champion" | "Legend";
  favoriteVehicle: "F1" | "MotoGP";
}

export interface Ride {
  id: string;
  userId: string;
  driverId: string;
  driverName: string;
  pickup: Location;
  destination: Location;
  distance: number; // in km
  duration: number; // in minutes
  fare: number;
  vehicleType: "F1" | "MotoGP";
  status: "requested" | "confirmed" | "in-progress" | "completed" | "cancelled";
  startTime: Date;
  endTime?: Date;
  rating?: number;
  lapTime?: number; // for gamification
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  vehicle: Vehicle;
  rating: number;
  totalRaces: number;
  currentLocation: Location;
  isAvailable: boolean;
  racingNumber: string;
}

export interface Vehicle {
  type: "F1" | "MotoGP";
  model: string;
  plateNumber: string;
  color: string;
  icon: string; // emoji or icon class
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface RacingStats {
  totalLaps: number;
  totalDistance: number;
  totalTime: number;
  averageSpeed: number;
  fastestLap: number;
  podiumFinishes: number;
  currentStreak: number;
  badges: Badge[];
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  avatar?: string;
  position: number;
  totalLaps: number;
  totalDistance: number;
  averageRating: number;
  badges: Badge[];
  racingLevel: string;
}

export interface RideBookingData {
  pickup: string;
  destination: string;
  vehicleType: "F1" | "MotoGP";
  estimatedFare: number;
  estimatedTime: number;
  estimatedDistance: number;
}
