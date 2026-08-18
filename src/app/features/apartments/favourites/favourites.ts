import {  Component,  inject} from '@angular/core';
import {  Apartment} from '../../../core/models/apartment.model';
import {  ApartmentService} from '../../../core/services/apartment.service';
import {  FavoriteService} from '../../../core/services/favorite.service';
import {ApartmentCard} from '../../home/apartment-card/apartment-card';

@Component({
  selector: 'app-favorites',
  imports: [ApartmentCard],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css'
})
export class FavoritesComponent {

  private readonly apartmentService = inject(ApartmentService);
  private readonly favoriteService = inject(FavoriteService);

  apartments: Apartment[] = [];

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {

    const favoriteIds =
      this.favoriteService.getFavoriteApartmentIds();
    const allApartments = this.apartmentService.getApartments();

    this.apartments = allApartments.filter(apartment =>
          favoriteIds.includes(
            apartment.id
          )
      );
  }
}