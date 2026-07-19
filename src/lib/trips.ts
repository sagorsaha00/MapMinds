import { api } from './api';
import { Trip } from '@/types';

export interface TripQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface TripsResponse {
  trips: Trip[];
  pagination: { total: number; page: number; pages: number };
}

export const fetchTrips = async (params: TripQueryParams): Promise<TripsResponse> => {
  const { data } = await api.get('/trips', { params });
  return data;
};

export const fetchTripById = async (id: string): Promise<{ trip: Trip; related: Trip[] }> => {
  const { data } = await api.get(`/trips/${id}`);
  return data;
};

export interface CreateTripPayload {
  title: string;
  destination: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: number;
  category: string;
  location: { city: string; country: string };
  images?: string[];
  createdBy: string;
}

export const createTrip = async (payload: CreateTripPayload): Promise<Trip> => {
  const { data } = await api.post('/trips', payload);
  return data;
};

export const fetchMyTrips = async (userId: string) => {
  const { data } = await api.get(`/trips/mine?userId=${userId}`);
  return data;
};

export const deleteTripById = async (id: string): Promise<void> => {
  await api.delete(`/trips/${id}`);
};
