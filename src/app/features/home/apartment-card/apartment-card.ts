import { Component,inject,input } from '@angular/core';
import { Apartment } from '../../../core/models/apartment.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe} from '@angular/common';
import { Router } from '@angular/router';
import {FavoriteService} from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-apartment-card',
  imports: [ DecimalPipe, MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './apartment-card.html',
  styleUrl: './apartment-card.css',
})
export class ApartmentCard {
  apartment = input.required<Apartment>();
  private readonly router =  inject(Router);
  private readonly favoriteService = inject(FavoriteService);
  private readonly authService = inject(AuthService);

  editApartment(): void {
    const apartment = this.apartment();
    if (!apartment) {
      return;
    }

    this.router.navigate([
      '/apartments', apartment.id
    ]);
  }
  
  isFavorite(apartmentId: number): boolean {
  return this.favoriteService.isFavorite(apartmentId);
  }

toggleFavorite(apartment: Apartment): void {
  if (!this.authService.isLoggedIn()) {

    this.router.navigate([
      '/login'
    ]);

    return;

  }

  this.favoriteService
    .toggleFavorite(
      apartment.id
    );
  }
}
