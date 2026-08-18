import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { MatButtonModule }  from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet, MatButtonModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rent-hub');
   
  protected readonly authService =
    inject(AuthService);

  readonly currentUser$ = this.authService.currentUser$;

  private readonly router =
    inject(Router);


  logout(): void {

    this.authService.logout();

    this.router.navigate(['/home']);

  }
}
