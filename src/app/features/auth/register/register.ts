import { Component,  inject} from '@angular/core';
import { FormBuilder,  ReactiveFormsModule,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',

  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],

  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private readonly fb =
    inject(FormBuilder);

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);


  errorMessage = '';


  registerForm =
    this.fb.nonNullable.group({

      // firstName: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.minLength(2)
      //   ]
      // ],

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

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
          Validators.required,
          Validators.minLength(8)
        ]
      ],

      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]

    });


  onSubmit(): void {
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue =
      this.registerForm.getRawValue();


    if (
      formValue.password !==
      formValue.confirmPassword
    ) {

      this.errorMessage =
        'Passwords do not match.';

      return;

    }


    const newUser = {
      id: Date.now(),
      // firstName: formValue.firstName,
      // lastName: formValue.lastName,
      name: formValue.name,
      email: formValue.email,
      password: formValue.password

    };


    const registered =
      this.authService.register(
        newUser.name,
        newUser.email,
        newUser.password
      );


    if (!registered) {
      this.errorMessage =
        'An account with this email already exists.';
      return;
    }

    this.router.navigate(['/login']);
  }

}