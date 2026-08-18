export interface ApartmentFilter {
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  amenities: string[];
}