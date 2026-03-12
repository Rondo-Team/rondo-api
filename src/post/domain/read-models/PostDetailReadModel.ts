export interface PostDetailReadModel {
  id: string;
  title: string;
  description: string;
  favouritesCount: number;
  commentsCount: number;
  proposalsCount: number;
  createdAt: Date;
  tags: string[];
  play: {
    steps: {
      elements: {
        id: string;
        x: number;
        y: number;
        elementType: string;
      }[];
    }[];
  };
  user: {
    username: string;
    name: string;
    profilePicture: string;
  };
}
