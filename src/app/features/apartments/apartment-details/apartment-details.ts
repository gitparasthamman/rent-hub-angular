import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute,  Router} from '@angular/router';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import{ DatePipe } from '@angular/common';

import { ApartmentService} from '../../../core/services/apartment.service';
import { Apartment } from '../../../core/models/apartment.model';
import { Comment} from '../../../core/models/comment';
import { CommentService } from '../../../core/services/comment.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-apartment-details',
  imports: [MatCardModule, MatButtonModule, MatIconModule, FormsModule, DatePipe ],
  templateUrl: './apartment-details.html',
  styleUrl: './apartment-details.css',
})
export class ApartmentDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);
  private readonly apartmentService = inject(ApartmentService);
  private readonly commentService = inject(CommentService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly authService = inject(AuthService);

  apartment: Apartment | undefined;
  notFound = false;
  comments: Comment[] = [];
  newComment = '';
  replyText: {[commentId: number]: string;} = {};

  ngOnInit(): void {
    const id =  Number(this.route.snapshot.paramMap.get('id'));
    this.apartment = this.apartmentService.getApartmentById(id);
    this.comments = this.commentService.getCommentsForApartment(id);
    this.notFound = !this.apartment;
  }

  editApartment(): void {

    if (!this.apartment) {
      return;
    }

    this.router.navigate([
      '/apartments/edit',
      this.apartment.id
    ]);
  }

  addComment(): void {
  if (!this.apartment) {
    return;
  }

  const text = this.newComment.trim();

  if (!text) {
    return;
  }

  this.commentService.addComment(
    this.apartment.id,
    'Current User',
    text
  );

  this.newComment = '';

  this.comments =
    this.commentService
      .getCommentsForApartment(
        this.apartment.id
      );
  }

  addReply(comment: Comment): void {
  const text =
    this.replyText[comment.id]
      ?.trim();

  if (!text) {
    return;
  }

  this.commentService.addReply(
    comment.id,
    'Current User',
    text
  );

  this.replyText[comment.id] = '';

  if (this.apartment) {
    this.comments =
      this.commentService
        .getCommentsForApartment(
          this.apartment.id
        );

    }
  }

isFavorite(): boolean {
    if (!this.apartment) {
      return false;
    }

    return this.favoriteService
      .isFavorite(
        this.apartment.id
      );
}

toggleFavorite(): void {
  if (!this.apartment) {
    return;
  }

  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return;
  }

  this.favoriteService
    .toggleFavorite(
      this.apartment.id
    );
 }
}
