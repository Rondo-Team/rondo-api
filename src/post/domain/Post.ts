import type { Primitives } from "../../shared/domain/types/Primitives.ts";
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

export type PostPrimitives = Primitives<Post>;

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

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      userId: this.userId.toPrimitives(),
      title: this.title.toPrimitives(),
      description: this.description.toPrimitives(),
      favoritesCount: this.favouritesCount.toPrimitives(),
      commentsCount: this.commentsCount.toPrimitives(),
      proposalsCount: this.proposalsCount.toPrimitives(),
      createdAt: this.createdAt.toPrimitives(),
      tags: this.tags.toPrimitives(),
      play: this.play.toPrimitives(),
    };
  }

  static fromPrimitives(post: PostPrimitives) {
    return new Post(
      PostId.fromPrimitives(post.id),
      UserId.fromPrimitives(post.userId),
      PostTitle.fromPrimitives(post.title),
      PostDescription.fromPrimitives(post.description),
      PostFavouritesCount.fromPrimitives(post.favoritesCount),
      PostCommentsCount.fromPrimitives(post.commentsCount),
      PostProposalsCount.fromPrimitives(post.proposalsCount),
      CreatedAt.fromPrimitives(post.createdAt),
      PostTags.fromPrimitives(post.tags),
      Play.fromPrimitives(post.play)
    );
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
