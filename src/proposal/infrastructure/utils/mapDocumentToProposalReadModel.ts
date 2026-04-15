import type { Document } from "mongodb";
import type { ProposalReadModel } from "../../domain/read-models/ProposalReadModel.ts";

export function mapDocumentToProposalReadModel(document: Document) {
  return {
    id: document.id,
    user: {
      username: document.user.username,
      name: document.user.name,
      profilePicture: document.user.profilePicture,
    },
    post: {
      id: document.post.id,
      title: document.post.title,
    },
    title: document.title,
    description: document.description,
    createdAt: document.createdAt,
    play: document.play,
    status: document.status,
  } as ProposalReadModel;
}
