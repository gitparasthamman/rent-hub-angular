import {Component,  inject} from '@angular/core';
import { FormBuilder,  ReactiveFormsModule,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',

  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  errorMessage = '';

  loginForm =
    this.fb.nonNullable.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ]

    });


  onSubmit(): void {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {
      email,
      password
    } =
      this.loginForm.getRawValue();

    const success =
      this.authService.login(
        email,
        password
      );

    if (!success) {
      this.errorMessage =
        'Invalid email or password.';
      return;
    }

    // this.router.navigate(['/home']);
    const returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') ?? '/home';

    this.router.navigateByUrl(returnUrl);
  }

}