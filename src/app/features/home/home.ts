import { Component, OnInit, inject } from '@angular/core';
import { Apartment } from '../../core/models/apartment.model';
import { ApartmentService } from '../../core/services/apartment.service';
import { ApartmentCard } from './apartment-card/apartment-card';
import { MatButtonModule } from '@angular/material/button';
import { FeaturedCarousel } from './featured-carousel/featured-carousel';
import { SearchFilter } from './search-filter/search-filter';
import { ApartmentFilter } from '../../core/models/apartment-filter.model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule,  MatSelectModule, MatFormFieldModule, MatPaginatorModule,
            ApartmentCard, FeaturedCarousel, SearchFilter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly apartmentService = inject(ApartmentService);
  allApartments: Apartment[] = [];
  apartments: Apartment[] = [];
  featuredApartments: Apartment[] = [];
 
  sortBy:
  'priceLow' |
  'priceHigh' |
  'newest' = 'newest';
 
  currentPage = 0;
  pageSize = 6;
 
 ngOnInit(): void {

    this.allApartments =
      this.apartmentService.getApartments();
 
      this.apartments = [...this.allApartments];

      this.featuredApartments =
        this.apartmentService.getFeaturedApartments();
  }

onFilterChanged(filter: ApartmentFilter): void {

  this.apartments =
    this.allApartments
      .filter(apartment => {

        const matchesLocation =
          !filter.location ||
          apartment.location
            .toLowerCase()
            .includes(
              filter.location.toLowerCase()
            );

        const matchesMinPrice =
          filter.minPrice === null ||
          apartment.price >= filter.minPrice;

        const matchesMaxPrice =
          filter.maxPrice === null ||
          apartment.price <= filter.maxPrice;


        return (
          matchesLocation &&
          matchesMinPrice &&
          matchesMaxPrice
        );

      });

}

onSortChanged(
  sort:
    'priceLow' |
    'priceHigh' |
    'newest'
): void {

  this.sortBy = sort;

  this.applySorting();

}

private applySorting(): void {

  switch (this.sortBy) {

    case 'priceLow':

      this.apartments =
        [...this.apartments]
          .sort(
            (a, b) =>
              a.price - b.price
          );

      break;


    case 'priceHigh':

      this.apartments =
        [...this.apartments]
          .sort(
            (a, b) =>
              b.price - a.price
          );

      break;


    case 'newest':

      this.apartments =
        [...this.apartments]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime()
              -
              new Date(a.createdAt).getTime()
          );

      break;

  }

}

get paginatedApartments(): Apartment[] {

  const start =
    this.currentPage * this.pageSize;

  const end =
    start + this.pageSize;

  return this.apartments.slice(start, end);

}

onPageChanged(event: PageEvent): void {

  this.currentPage =
    event.pageIndex;

  this.pageSize =
    event.pageSize;

}
}
