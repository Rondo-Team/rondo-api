export interface ProposalReadModel {
  id: string;
  user: {
    username: string;
    name: string;
    profilePicture: string;
  };
  post: {
    id: string;
    title: string;
  };
  title: string;
  description: string;
  createdAt: Date;
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
  status: string;
}
