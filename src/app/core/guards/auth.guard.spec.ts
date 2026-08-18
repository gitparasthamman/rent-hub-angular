import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

// This suite tests the Auth guard behavior.
describe('authGuard', () => {
  // Fake auth service. We only care about the isLoggedIn() method.
  let authService: {
    isLoggedIn: ReturnType<typeof vi.fn>;
  };

  // Fake router. We want to know if the guard redirects to /login.
  let router: {
    createUrlTree: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Every test starts with a fresh mocked auth service.
    authService = {
      isLoggedIn: vi.fn(),
    };

    // Every test starts with a fresh mocked router.
    router = {
      createUrlTree: vi.fn(),
    };

    // Angular DI setup: when the guard asks for AuthService or Router,
    // it gets our mocked versions instead of the real ones.
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
    });
  });

  // Test 1: if the user is logged in, the guard should allow access.
  it('should allow authenticated user', () => {
    authService.isLoggedIn.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    expect(result).toBe(true);
  });

  // Test 2: if the user is not logged in, the guard should redirect to /login.
  it('should redirect anonymous user', () => {
    authService.isLoggedIn.mockReturnValue(false);

    // This simulates the current route the user was trying to access.
    const state = {
      url: '/apartments/create',
    } as any;

    // This is what the router would normally return.
    const urlTree = {} as any;
    router.createUrlTree.mockReturnValue(urlTree);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, state)
    );

    // We assert that the guard asked Angular Router to redirect to /login
    // with a returnUrl query param containing the original route.
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login'], {
      queryParams: {
        returnUrl: '/apartments/create',
      },
    });

    // The guard should return the router tree, not true.
    expect(result).toBe(urlTree);
  });
});
