import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { FavoriteService } from './favorite.service';
import { AuthService } from './auth.service';

// This suite tests the FavoriteService behavior.
describe('FavoriteService', () => {
  // service is the real object we want to test.
  let service: FavoriteService;

  // authService is a fake object that mimics the logged-in user.
  // The component/service uses the currentUser value to know which user's favorites to save.
  let authService: {
    currentUser: {
      id: number;
      name: string;
      email: string;
      password: string;
    } | null;
  };

  // This runs before every test to reset the environment.
beforeEach(() => {
    // Clear browser localStorage to avoid data leaking between tests.
    localStorage.clear();

    // Set a default logged-in user for every test.
    authService = {
      currentUser: {
        id: 1,
        name: 'Paras',
        email: 'paras@test.com',
        password: '123456',
      },
    };

    // Tell Angular DI to provide our fake AuthService and the real FavoriteService.
    TestBed.configureTestingModule({
      providers: [
        FavoriteService,
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    });

    // Get a fresh instance of FavoriteService for this test.
    service = TestBed.inject(FavoriteService);
  });

  // This test checks that the service is created successfully.
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // This test checks that toggling a favorite adds it for the logged-in user.
  it('should add favorite', () => {
    service.toggleFavorite(5);

    expect(service.isFavorite(5)).toBe(true);
  });

  // This test checks that toggling the same favorite twice removes it.
  it('should remove favorite', () => {
    service.toggleFavorite(5);
    service.toggleFavorite(5);

    expect(service.isFavorite(5)).toBe(false);
  });

  // This test checks that favorites are stored per user.
  // User 1 adds a favorite, then login switches to User 2.
  // User 2 should not see User 1's favorite.
  it('should keep favorites specific to the user', () => {
    service.toggleFavorite(5);

    expect(service.isFavorite(5)).toBe(true);

    authService.currentUser = {
      id: 2,
      name: 'John',
      email: 'john@test.com',
      password: '123456',
    };

    expect(service.isFavorite(5)).toBe(false);
  });
});
