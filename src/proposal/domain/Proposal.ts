import { PostId } from "../../post/domain/value-objects/PostId.ts";
import type { Primitives } from "../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../user/domain/value-objects/UserId.ts";
import { ProposalDescription } from "./value-objects/ProposalDescription.ts";
import { ProposalId } from "./value-objects/ProposalId.ts";
import { ProposalTitle } from "./value-objects/ProposalTitle.ts";

export type ProposalPrimitives = Primitives<Proposal>;

export class Proposal {
  id: ProposalId;
  userId: UserId;
  postId: PostId;
  title: ProposalTitle;
  description: ProposalDescription;
  createdAt: CreatedAt;
  play: Play;

  constructor(
    id: ProposalId,
    userId: UserId,
    postId: PostId,
    title: ProposalTitle,
    description: ProposalDescription,
    createdAt: CreatedAt,
    play: Play
  ) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.play = play;
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      userId: this.userId.toPrimitives(),
      postId: this.postId.toPrimitives(),
      title: this.title.toPrimitives(),
      description: this.description.toPrimitives(),
      createdAt: this.createdAt.toPrimitives(),
      play: this.play.toPrimitives(),
    };
  }

  static fromPrimitives(proposal: ProposalPrimitives) {
    return new Proposal(
      ProposalId.fromPrimitives(proposal.id),
      UserId.fromPrimitives(proposal.userId),
      PostId.fromPrimitives(proposal.postId),
      ProposalTitle.fromPrimitives(proposal.title),
      ProposalDescription.fromPrimitives(proposal.description),
      CreatedAt.fromPrimitives(proposal.createdAt),
      Play.fromPrimitives(proposal.play)
    );
  }

  changeTitle(newTitle: ProposalTitle) {
    this.title = newTitle;
  }

  changeDescription(newDescription: ProposalDescription) {
    this.description = newDescription;
  }

  changePlay(newPlay: Play) {
    this.play = newPlay;
  }
}
