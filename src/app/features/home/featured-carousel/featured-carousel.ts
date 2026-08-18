import { Component,  input} from '@angular/core';
import{DecimalPipe} from '@angular/common';
import { Apartment } from '../../../core/models/apartment.model';

@Component({
  selector: 'app-featured-carousel',

  imports: [DecimalPipe],
  templateUrl: './featured-carousel.html',
  styleUrl: './featured-carousel.css'
})
export class FeaturedCarousel {

  apartments = input.required<Apartment[]>();

  currentIndex = 0;

  next(): void {

    if (this.apartments().length === 0) {
      return;
    }

    this.currentIndex =
      (this.currentIndex + 1)
      % this.apartments().length;
  }

  previous(): void {

    if (this.apartments().length === 0) {
      return;
    }

    this.currentIndex =
      this.currentIndex === 0
        ? this.apartments().length - 1
        : this.currentIndex - 1;
  }

  select(index: number): void {

    this.currentIndex = index;

  }
}