export interface Apartment {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;

  propertyType: 'Apartment' | 'House' | 'Studio';

  furnished: boolean;
  amenities: string[];

  vegetarianPreference:
    | 'Vegetarian Preferred'
    | 'Non-Vegetarian'
    | 'No Preference';

  images: string[];

  landlord: {
    name: string;
    email: string;
    phone: string;
  };

  featured: boolean;
  createdAt: string;
}