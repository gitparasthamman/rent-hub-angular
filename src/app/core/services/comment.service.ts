import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment, CommentReply } from '../models/comment';

@Service()
export class CommentService {

    private readonly STORAGE_KEY = 'rent-hub-comments';

  private readonly commentsSubject =
    new BehaviorSubject<Comment[]>(
      this.loadFromStorage()
    );

  readonly comments$ = this.commentsSubject.asObservable();

  getCommentsForApartment(
    apartmentId: number
  ): Comment[] {
    return this.commentsSubject.value
      .filter(
        comment =>
          comment.apartmentId === apartmentId
      );
  }

  addComment(
    apartmentId: number,
    userName: string,
    text: string
  ): void {

    const comment: Comment = {
      id: Date.now(),
      apartmentId,
      userName,
      text,
      createdAt:
        new Date().toISOString(),

      replies: []
    };


    const updated = [
      ...this.commentsSubject.value,
      comment
    ];

    this.save(updated);
  }


  addReply(
    commentId: number,
    userName: string,
    text: string
  ): void {

    const reply: CommentReply = {
      id: Date.now(),
      userName,
      text,
      createdAt:
        new Date().toISOString()
    };

    const updated =
      this.commentsSubject.value.map(
        comment => {
          if (
            comment.id !== commentId
          ) {
            return comment;
          }

          return {
            ...comment,
            replies: [
              ...comment.replies,
              reply
            ]
          };

        }
      );

    this.save(updated);
  }


  private save(
    comments: Comment[]
  ): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(comments)
    );

    this.commentsSubject.next(
      comments
    );
  }

  private loadFromStorage():
    Comment[] {

    const stored =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as Comment[];
    }
    catch {
      return [];
    }
 }
}
