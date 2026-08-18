import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Home } from './home';
import { ApartmentService } from '../../core/services/apartment.service';

// "describe" groups related tests together.
// Here we are testing the Home component.
describe('Home', () => {
  // These variables will hold the component instance and its test fixture.
  let component: Home;
  let fixture: ComponentFixture<Home>;

  // This is a fake service object that behaves like ApartmentService.
  // We use a stub so the component can call its methods without hitting real data.
  let apartmentService: {
    getApartments: ReturnType<typeof vi.fn>;
    getFeaturedApartments: ReturnType<typeof vi.fn>;
  };

  // This runs before each test. It resets the environment and creates a fresh component.
beforeEach(async () => {
    // Create a mock service with the same methods the component calls.
    apartmentService = {
      getApartments: vi.fn(),
      getFeaturedApartments: vi.fn(),
    };

    // Tell the mock service: when getApartments() is called, return one apartment.
    apartmentService.getApartments.mockReturnValue([
      {
        id: 1,
        title: 'Apartment A',
        description: 'Nice apartment',
        location: 'Toronto',
        price: 2000,
        bedrooms: 2,
        bathrooms: 1,
        propertyType: 'Apartment',
        furnished: true,
        amenities: ['Parking'],
        vegetarianPreference: 'No Preference',
        images: [],
        landlord: {
          name: 'John',
          email: 'john@test.com',
          phone: '9999999999',
        },
        featured: true,
        createdAt: new Date().toISOString(),
      },
    ]);

    // Tell the mock service: when getFeaturedApartments() is called, return an array too.
    apartmentService.getFeaturedApartments.mockReturnValue([
      {
        id: 1,
        title: 'Apartment A',
        description: 'Nice apartment',
        location: 'Toronto',
        price: 2000,
        bedrooms: 2,
        bathrooms: 1,
        propertyType: 'Apartment',
        furnished: true,
        amenities: ['Parking'],
        vegetarianPreference: 'No Preference',
        images: [],
        landlord: {
          name: 'John',
          email: 'john@test.com',
          phone: '9999999999',
        },
        featured: true,
        createdAt: new Date().toISOString(),
      },
    ]);

    // Set up Angular testing module.
    // We say: for this test, use our fake ApartmentService whenever the component asks for it.
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [{ provide: ApartmentService, useValue: apartmentService }],
    }).compileComponents();

    // Create the Home component instance.
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    // Trigger Angular lifecycle hooks like ngOnInit() so the component loads data.
    fixture.detectChanges();
  });

  // Test 1: the component should be created successfully.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: when component initializes, the apartments list should be filled.
  it('should load apartments', () => {
    expect(component.apartments.length).toBe(1);
  });
});
