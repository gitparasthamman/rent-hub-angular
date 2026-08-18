import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule,  Validators} from '@angular/forms';

import { Router, RouterLink,ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Apartment } from  '../../../core/models/apartment.model';
import { ApartmentDraftService } from '../../../core/services/apartment-draft.service';
import { ApartmentService } from '../../../core/services/apartment.service';

@Component({
  selector: 'app-create-apartment',

  imports: [
    ReactiveFormsModule,
    RouterLink,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule
  ],

  templateUrl: './create-apartment.html',

  styleUrl: './create-apartment.css'
})
export class CreateApartment implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly router = inject(Router);
  private readonly route =  inject(ActivatedRoute);

  private readonly apartmentService =  inject(ApartmentService);
  private readonly draftService = inject(ApartmentDraftService);
  editingId: number | null = null;

  readonly amenities = [
    'Parking',
    'Wi-Fi',
    'Laundry',
    'Air Conditioning',
    'Gym',
    'Swimming Pool',
    'Security',
    'Balcony'
  ];

  readonly propertyTypes = [
    'Apartment',
    'House',
    'Studio'
  ] as const;


  readonly vegetarianPreferences = [
    'Vegetarian Preferred',
    'Non-Vegetarian',
    'No Preference'
  ] as const;

  apartmentForm = this.fb.nonNullable.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]
    ],

    description: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000)
      ]
    ],

    location: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    price: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    bedrooms: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(10)
      ]
    ],

    bathrooms: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(10)
      ]
    ],

    propertyType: [
      'Apartment' as
        'Apartment' |
        'House' |
        'Studio',

      Validators.required
    ],

    furnished: [
      false
    ],

    amenities: [
      [] as string[]
    ],

    vegetarianPreference: [
      'No Preference' as
        'Vegetarian Preferred' |
        'Non-Vegetarian' |
        'No Preference',

      Validators.required
    ],

    images: [
      ''
    ],

    landlordName: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    landlordEmail: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    landlordPhone: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[0-9+\-\s()]{10,15}$/
        )
      ]
    ]

  });

  onSubmit(): void {
    debugger;
    if (this.apartmentForm.invalid) {
      this.apartmentForm.markAllAsTouched();
      return;
    }

    const apartment =
    this.buildApartment();

    this.draftService.setDraft(
      apartment,
      this.editingId === null
        ? 'create'
        : 'edit'
    );
    
    this.router.navigate(['/apartments/preview']);
  }

  toggleAmenity(  amenity: string,  checked: boolean): void {
  const selected =
    this.apartmentForm.controls
      .amenities.value;

  if (checked) {

    if (!selected.includes(amenity)) {

      this.apartmentForm.controls
        .amenities
        .setValue([
          ...selected,
          amenity
        ]);

    }

    return;
  }

  this.apartmentForm.controls
    .amenities
    .setValue(
      selected.filter(
        item => item !== amenity
      )
    );
  }

  private buildApartment(): Apartment {

  const formValue =
    this.apartmentForm.getRawValue();

  const images =
    formValue.images
      .split(',')
      .map(image => image.trim())
      .filter(image => image.length > 0);

  const existingApartment =
    this.editingId !== null
      ? this.apartmentService
          .getApartmentById(
            this.editingId
          )
      : undefined;

  return {

    id:
      this.editingId ??
      Date.now(),

    title:
      formValue.title,

    description:
      formValue.description,

    location:
      formValue.location,

    price:
      formValue.price,

    bedrooms:
      formValue.bedrooms,

    bathrooms:
      formValue.bathrooms,

    propertyType:
      formValue.propertyType,

    furnished:
      formValue.furnished,

    amenities:
      formValue.amenities,

    vegetarianPreference:
      formValue.vegetarianPreference,

    images,

    landlord: {

      name:
        formValue.landlordName,

      email:
        formValue.landlordEmail,

      phone:
        formValue.landlordPhone

    },

    featured:
      existingApartment?.featured ??
      false,

    createdAt:
      existingApartment?.createdAt ??
      new Date().toISOString()

  };
 }
 
 ngOnInit(): void {
  debugger;
  const id =
    this.route.snapshot.paramMap.get('id');

  if (!id) {
     this.editingId = null;
     return;
  }

  this.editingId =
    Number(id);

  this.loadApartment(
    this.editingId
  );
}

private loadApartment(id: number): void {
 debugger;
  const apartment =
    this.apartmentService
      .getApartmentById(id);

  if (!apartment) {
    this.router.navigate([
      '/home'
    ]);

    return;
  }

  this.apartmentForm.patchValue({
    title:
      apartment.title,

    description:
      apartment.description,

    location:
      apartment.location,

    price:
      apartment.price,

    bedrooms:
      apartment.bedrooms,

    bathrooms:
      apartment.bathrooms,

    propertyType:
      apartment.propertyType,

    furnished:
      apartment.furnished,

    amenities:
      apartment.amenities,

    vegetarianPreference:
      apartment.vegetarianPreference,

    images:
      apartment.images.join(', '),

    landlordName:
      apartment.landlord.name,

    landlordEmail:
      apartment.landlord.email,

    landlordPhone:
      apartment.landlord.phone

  }); 
}
}