import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Apartment } from '../../../core/models/apartment.model';
import {
  ApartmentDraftService,
  ApartmentFormMode,
} from '../../../core/services/apartment-draft.service';
import { ApartmentService } from '../../../core/services/apartment.service';

@Component({
  selector: 'app-apartment-preview',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './apartment-preview.html',
  styleUrl: './apartment-preview.css',
})
export class ApartmentPreviewComponent implements OnInit {
  private readonly draftService = inject(ApartmentDraftService);
  private readonly apartmentService = inject(ApartmentService);
  private readonly router = inject(Router);

  apartment: Apartment | null = null;
  mode: ApartmentFormMode = 'create';

  ngOnInit(): void {
    const draft = this.draftService.getDraft();

    if (!draft) {
      this.router.navigate(['/apartments/create']);
      return;
    }

    this.apartment = draft.apartment;
    this.mode = draft.mode;
  }

  submit(): void {
    if (!this.apartment) {
      return;
    }

    if (this.mode === 'create') {
      this.apartmentService.addApartment(this.apartment);
      this.draftService.clearDraft();
      this.router.navigate(['/home']);
      return;
  } else {
      this.apartmentService.updateApartment(this.apartment);
    }

    const apartmentId = this.apartment.id;
    this.draftService.clearDraft();

    this.router.navigate(['/apartments', apartmentId]);
  }

  backToForm(): void {
    if (this.mode === 'create') {
      this.router.navigate(['/apartments/create']);

      return;
    }

    this.router.navigate(['/apartments/edit',this.apartment?.id  ]);
    }
}