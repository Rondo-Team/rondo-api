import type { Document } from "mongodb";
import type { UserProfileResumeReadModel } from "../../domain/read-model/UserProfileResumeReadModel.ts";

export const mapDocumentToUserProfileResumeReadModel = (
  document: Document,
): UserProfileResumeReadModel => {
  return {
    id: document.id,
    username: document.username,
    name: document.name,
    profilePicture: document.profilePicture,
    postsCount: document.postsCount,
    proposalsCount: document.proposalsCount,
    favouritePostsCount: document.favouritePostsCount,
    commentsCount: document.commentsCount,
    createdAt: document.createdAt,
  };
};
