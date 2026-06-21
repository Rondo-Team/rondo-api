export interface ProposalHistoryReadModel {
  user: {
    id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  createdAt: Date;
  intent: string;
  payload?: string;
}
