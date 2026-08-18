import { inject, Service } from '@angular/core';
import { AuthService } from './auth.service';

@Service()
export class FavoriteService {
  private readonly STORAGE_KEY = 'rent-hub-favorites';
  private readonly authService = inject(AuthService);

  private loadFavorites(): Record<number, number[]> {
    const stored =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (!stored) {
      return {};
    }

    try {
      return JSON.parse(stored) as Record<number, number[]>;
    } catch {
      return {};
    }
  }

  private saveFavorites(
    favorites: Record<number, number[]>
  ): void {

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }

  isFavorite(
    apartmentId: number
  ): boolean {

    const user =
      this.authService.currentUser;

    if (!user) {
      return false;
    }

    const favorites =
      this.loadFavorites();

    const userFavorites =
      favorites[user.id] ?? [];

    return userFavorites.includes(
      apartmentId
    );

  }

  toggleFavorite(
    apartmentId: number
  ): boolean {

    const user =
      this.authService.currentUser;

    if (!user) {
      return false;
    }

    const favorites =
      this.loadFavorites();

    const userFavorites =
      favorites[user.id] ?? [];

    const index =
      userFavorites.indexOf(
        apartmentId
      );

    let isFavorite: boolean;

    if (index >= 0) {
      userFavorites.splice(
        index,
        1
      );

      isFavorite = false;
    } else {
      userFavorites.push(
        apartmentId
      );

      isFavorite = true;
    }

    favorites[user.id] =
      userFavorites;

    this.saveFavorites(
      favorites
    );

    return isFavorite;
  }

  getFavoriteApartmentIds():
    number[] {
    const user =
      this.authService.currentUser;

    if (!user) {
      return [];
    }

    const favorites =
      this.loadFavorites();

    return favorites[user.id] ?? [];
  }
}
