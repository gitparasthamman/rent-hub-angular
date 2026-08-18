export interface Comment {
  id: number;
  apartmentId: number;
  userName: string;
  text: string;
  createdAt: string;
  replies: CommentReply[];
}

export interface CommentReply {
  id: number;
  userName: string;
  text: string;
  createdAt: string;
}