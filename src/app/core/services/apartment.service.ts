 import { Service } from '@angular/core';

// @Service()
// export class Apartment {}
import { Injectable } from '@angular/core';

import { Apartment } from '../models/apartment.model';
import { APARTMENTS } from '../models/apartment.mock';
import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Service()
export class ApartmentService {

  private readonly apartments: Apartment[] = APARTMENTS;
  private readonly STORAGE_KEY = 'rent-hub-apartments';

  private readonly apartmentsSubject =
    new BehaviorSubject<Apartment[]>(
      this.loadFromStorage()
    );

  readonly apartments$ =
    this.apartmentsSubject.asObservable();

  getApartments(): Apartment[] {
    return this.apartmentsSubject.value;
  }

  getApartmentById(id: number): Apartment | undefined {
    return this.apartmentsSubject.value.find(
        apartment =>
          apartment.id === id
      );
  }

  addApartment( apartment: Apartment): void {
    const apartments = this.apartmentsSubject.value;

    const updated = [
      ...apartments,
      apartment
    ];

    this.save(updated);
  }

  updateApartment(apartment: Apartment): void {
    const updated =
      this.apartmentsSubject.value.map(
        existing =>
          existing.id === apartment.id
            ? apartment
            : existing
      );

    this.save(updated);
  }

  deleteApartment( id: number ): void {
    const updated = this.apartmentsSubject.value.filter(
        apartment => apartment.id !== id
      );

    this.save(updated);
  }

  private save(apartments: Apartment[]): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(apartments)
    );

    this.apartmentsSubject.next(apartments);
  }

  private loadFromStorage():Apartment[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (!stored) {
      return APARTMENTS;
    }

    try 
    {
      return JSON.parse(stored) as Apartment[];
    }
    catch {
      console.error(
        'Unable to parse apartment data.'
      );

      return APARTMENTS;
    }
  }

  getFeaturedApartments(): Apartment[] {
    return this.apartments.filter(
      apartment => apartment.featured
    );
  }
}