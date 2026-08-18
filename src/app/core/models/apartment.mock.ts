import { Apartment } from './apartment.model';

export const APARTMENTS: Apartment[] = [

  {
    id: 1,

    title: 'Modern 2 BHK Apartment',
    description:
      'Beautiful modern apartment located in a peaceful residential area.',

    location: 'Chandigarh',

    price: 25000,

    bedrooms: 2,
    bathrooms: 2,

    propertyType: 'Apartment',

    furnished: true,

    amenities: [
      'Parking',
      'Wi-Fi',
      'Air Conditioning',
      'Gym'
    ],

    vegetarianPreference: 'No Preference',

    images: [
      '/assets/prop_1_1.jpg',
      '/assets/prop_1_2.jpg'
    ],

    landlord: {
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9876543210'
    },

    featured: true,

    createdAt: '2026-08-01'
  },

  {
    id: 2,

    title: 'Luxury 3 BHK Apartment',

    description:
      'Spacious luxury apartment with modern interiors and premium amenities.',

    location: 'Mohali',

    price: 38000,

    bedrooms: 3,
    bathrooms: 3,

    propertyType: 'Apartment',

    furnished: true,

    amenities: [
      'Parking',
      'Wi-Fi',
      'Swimming Pool',
      'Gym',
      'Security'
    ],

    vegetarianPreference: 'No Preference',

    images: [
      '/assets/prop_2_1.jpg',
      '/assets/prop_2_2.jpg'
    ],

    landlord: {
      name: 'Neha Kapoor',
      email: 'neha@example.com',
      phone: '9876543211'
    },

    featured: true,

    createdAt: '2026-07-28'
  },

  {
    id: 3,

    title: 'Affordable 1 BHK Studio',

    description:
      'Compact and affordable studio apartment suitable for working professionals.',

    location: 'Panchkula',

    price: 15000,

    bedrooms: 1,
    bathrooms: 1,

    propertyType: 'Studio',

    furnished: false,

    amenities: [
      'Wi-Fi',
      'Parking'
    ],

    vegetarianPreference: 'Vegetarian Preferred',

    images: [
      '/assets/prop_3_1.jpg',
    ],

    landlord: {
      name: 'Amit Verma',
      email: 'amit@example.com',
      phone: '9876543212'
    },

    featured: false,

    createdAt: '2026-07-25'
  },

  {
    id: 4,

    title: 'Family 3 BHK House',

    description:
      'Independent house ideal for families with spacious rooms and parking.',

    location: 'Zirakpur',

    price: 32000,

    bedrooms: 3,
    bathrooms: 2,

    propertyType: 'House',

    furnished: false,

    amenities: [
      'Parking',
      'Garden',
      'Security'
    ],

    vegetarianPreference: 'No Preference',

    images: [
      '/assets/prop_4_1.jpg'
    ],

    landlord: {
      name: 'Manpreet Singh',
      email: 'manpreet@example.com',
      phone: '9876543213'
    },

    featured: true,

    createdAt: '2026-07-20'
  },

  {
    id: 5,

    title: 'Fully Furnished 2 BHK',

    description:
      'Fully furnished apartment with excellent connectivity to the city.',

    location: 'Chandigarh',

    price: 28000,

    bedrooms: 2,
    bathrooms: 2,

    propertyType: 'Apartment',

    furnished: true,

    amenities: [
      'Parking',
      'Wi-Fi',
      'Air Conditioning'
    ],

    vegetarianPreference: 'No Preference',

    images: [
      '/assets/prop_5_1.jpg'
    ],

    landlord: {
      name: 'Simran Kaur',
      email: 'simran@example.com',
      phone: '9876543214'
    },

    featured: false,

    createdAt: '2026-07-15'
  },

  {
    id: 6,

    title: 'Premium 4 BHK Apartment',

    description:
      'Large premium apartment suitable for families looking for spacious living.',

    location: 'Chandigarh',

    price: 55000,

    bedrooms: 4,
    bathrooms: 4,

    propertyType: 'Apartment',

    furnished: true,

    amenities: [
      'Parking',
      'Wi-Fi',
      'Gym',
      'Swimming Pool',
      'Security',
      'Air Conditioning'
    ],

    vegetarianPreference: 'No Preference',

    images: [
      '/assets/prop_6_1.jpg'
    ],

    landlord: {
      name: 'Karan Malhotra',
      email: 'karan@example.com',
      phone: '9876543215'
    },

    featured: true,

    createdAt: '2026-07-10'
  }
];