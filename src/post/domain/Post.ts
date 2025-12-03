import { CreatedAt } from "../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../user/domain/value-objects/UserId.ts";
import { PostCommentsCount } from "./value-objects/PostCommentsCount.ts";
import { PostDescription } from "./value-objects/PostDescription.ts";
import { PostFavouritesCount } from "./value-objects/PostFavouritesCount.ts";
import { PostId } from "./value-objects/PostId.ts";
import { PostProposalsCount } from "./value-objects/PostProposalsCount.ts";
import { PostTags } from "./value-objects/PostTags.ts";
import { PostTitle } from "./value-objects/PostTitle.ts";

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

  changeTitle(newTitle: PostTitle) {
    this.title = newTitle;
  }

  changeDescription(newDescription: PostDescription) {
    this.description = newDescription;
  }

  addFavourite() {
    this.favouritesCount = new PostFavouritesCount(
      this.favouritesCount.toPrimitives() + 1
    );
  }

  addComment() {
    this.commentsCount = new PostCommentsCount(
      this.commentsCount.toPrimitives() + 1
    );
  }

  addProposal() {
    this.proposalsCount = new PostProposalsCount(
      this.proposalsCount.toPrimitives() + 1
    );
  }

  changePlay(newPlay: Play) {
    this.play = newPlay;
  }
}
