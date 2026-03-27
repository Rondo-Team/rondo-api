import type { Document } from "mongodb";
import type { UserProfileReadModel } from "../../domain/read-model/UserProfileReadModel.ts";

export const mapDocumentToUserProfileReadModel = (
  document: Document,
): UserProfileReadModel => {
  return {
    id: document.id,
    email: document.email,
    username: document.username,
    name: document.name,
    profilePicture: document.profilePicture,
    postsCount: document.postsCount,
    proposalsCount: document.proposalsCount,
    favouritePostsCount: document.favouritePostsCount,
    commentsCount: document.commentsCount,
    createdAt: document.createdAt,
    usernameChangedAt: document.usernameChangedAt,
    recentlyViewedContent: document.recentlyViewedContent.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      openedAt: item.openedAt,
    })),
  };
};
