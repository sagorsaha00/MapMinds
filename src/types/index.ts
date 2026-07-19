export interface Trip {
  _id: string;
  title: string;
  destination: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  price: number;
  duration: number;
  rating: number;
  category: string;
  location: { country: string; city: string };
  itinerary: { day: number; title: string; details: string }[];
  createdBy: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    interests: string[];
    budgetRange: string;
    travelStyle: string;
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}
