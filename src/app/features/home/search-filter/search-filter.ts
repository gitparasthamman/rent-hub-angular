import {Component,  inject,  output} from '@angular/core';
import {FormBuilder,  ReactiveFormsModule} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ApartmentFilter } from '../../../core/models/apartment-filter.model';

@Component({
  selector: 'app-search-filter',

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],

  templateUrl: './search-filter.html',
  styleUrl: './search-filter.css'
})
export class SearchFilter {

  private readonly fb =
    inject(FormBuilder);

  filterChanged =
    output<ApartmentFilter>();

  filterForm =
    this.fb.nonNullable.group({
      location: [''],
      minPrice: [null as number | null],
      maxPrice: [null as number | null],
      amenities: [[] as string[]]
    });


  applyFilter(): void {

    this.filterChanged.emit(
      this.filterForm.getRawValue()
    );

  }


  clearFilter(): void {

    this.filterForm.reset({
      location: '',
      minPrice: null,
      maxPrice: null,
      amenities: []
    });

    this.applyFilter();

  }
}