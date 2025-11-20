import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Play } from "@/shared/domain/value-objects/Play";
import { UserId } from "@/user/domain/value-objects/UserId";
import { PostCommentsCount } from "./value-objects/PostCommentsCount";
import { PostDescription } from "./value-objects/PostDescription";
import { PostFavouritesCount } from "./value-objects/PostFavouritesCount";
import { PostId } from "./value-objects/PostId";
import { PostProposalsCount } from "./value-objects/PostProposalsCount";
import { PostTags } from "./value-objects/PostTags";
import { PostTitle } from "./value-objects/PostTitle";

export class Post {
  id: PostId;
  userId: UserId;
  title: PostTitle;
  description: PostDescription;
  favouritesCount: PostFavouritesCount;
  commentsCount: PostCommentsCount;
  proposalsCount: PostProposalsCount;
  createdAt: CreatedAt;
  tags: PostTags;
  play: Play;

  constructor(
    id: PostId,
    userId: UserId,
    title: PostTitle,
    description: PostDescription,
    favouritesCount: PostFavouritesCount,
    commentsCount: PostCommentsCount,
    proposalsCount: PostProposalsCount,
    createdAt: CreatedAt,
    tags: PostTags = PostTags.empty(),
    play: Play
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.favouritesCount = favouritesCount;
    this.commentsCount = commentsCount;
    this.proposalsCount = proposalsCount;
    this.createdAt = createdAt;
    this.tags = tags;
    this.play = play;
  }
}
