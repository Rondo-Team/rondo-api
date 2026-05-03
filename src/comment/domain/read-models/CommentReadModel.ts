export interface CommentReadModel {
  id: string;
  user: {
    username: string;
    name: string;
  };
  postId: string;
  message: string;
  favouritesCount: number;
  createdAt: Date;
  parentId: string;
}
