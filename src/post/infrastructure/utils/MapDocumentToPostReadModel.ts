import type { Document } from "mongodb";
import type { PostDetailReadModel } from "../../domain/read-models/PostDetailReadModel.ts";

export function mapDocumentToPostReadModel(document: Document) {
  return {
    id: document.id,
    title: document.title,
    description: document.description,
    favoritesCount: document.favoritesCount,
    commentsCount: document.commentsCount,
    proposalsCount: document.proposalsCount,
    createdAt: document.createdAt,
    tags: document.tags,
    play: document.play,
    user: {
      username: document.user.username,
      profilePicture: document.user.profilePicture,
    },
  } as PostDetailReadModel;
}
