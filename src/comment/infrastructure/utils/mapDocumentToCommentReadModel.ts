import type { Document } from "mongodb";
import type { CommentReadModel } from "../../domain/read-models/CommentReadModel.ts";

export function mapDocumentToCommentReadModel(document: Document) {
  return {
    id: document.id,
    user: {
      username: document.user.username,
      name: document.user.name,
    },
    postId: document.postId,
    message: document.message,
    favouritesCount: document.favouritesCount,
    createdAt: document.createdAt,
    parentId: document.parentId,
  } as CommentReadModel;
}
