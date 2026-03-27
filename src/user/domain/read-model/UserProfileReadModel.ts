export interface UserProfileReadModel {
  id: string;
  email: string;
  username: string;
  name: number;
  profilePicture: number;
  postsCount: number;
  proposalsCount: number;
  favouritePostsCount: number;
  commentsCount: number;
  createdAt: Date;
  usernameChangedAt: Date;
  recentlyViewedContent: {
    id: string;
    type: string;
    title: string;
    openedAt: Date;
  }[];
}
