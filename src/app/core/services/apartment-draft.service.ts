import { Service } from '@angular/core';
import { Apartment } from '../models/apartment.model';

export type ApartmentFormMode = 'create' | 'edit';

export interface ApartmentDraft {
  apartment: Apartment;
  mode: ApartmentFormMode;
}

@Service()
export class ApartmentDraftService {
  private draft: ApartmentDraft | null = null;

  setDraft(apartment: Apartment, mode: ApartmentFormMode): void {
    this.draft = { apartment, mode };
  }

  getDraft(): ApartmentDraft | null {
    return this.draft;
  }

  clearDraft(): void {
    this.draft = null;
  }
}