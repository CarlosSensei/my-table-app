export interface Restaurant {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  cuisineType: string;
  address: string;
  rating: number;
  imageUrl: string;
  openingHour: string;
  closingHour: string;
  phone: string;
  averagePrice: number;
  capacity: number;

  city: string;
  email: string;
  availableTables: number;
}