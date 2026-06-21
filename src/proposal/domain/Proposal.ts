import { PostId } from "../../post/domain/value-objects/PostId.ts";
import type { Primitives } from "../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../user/domain/value-objects/UserId.ts";
import { ProposalDescription } from "./value-objects/ProposalDescription.ts";
import { ProposalHistoryEntrie } from "./value-objects/ProposalHistoryEntrie.ts";
import {
  ProposalHistoryEntriePayload,
  type ProposalHistoryEntriePayloadMessage,
} from "./value-objects/ProposalHistoryEntriePayload.ts";
import { ProposalId } from "./value-objects/ProposalId.ts";
import {
  ProposalStatus,
  ProposalStatusValues,
} from "./value-objects/ProposalStatus.ts";
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
  status: ProposalStatus;
  historyEntries: ProposalHistoryEntrie[];

  constructor(
    id: ProposalId,
    userId: UserId,
    postId: PostId,
    title: ProposalTitle,
    description: ProposalDescription,
    createdAt: CreatedAt,
    play: Play,
    status: ProposalStatus,
    historyEntries: ProposalHistoryEntrie[],
  ) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.play = play;
    this.historyEntries = historyEntries;
    this.status = status;
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
      historyEntries: this.historyEntries.map((entrie) =>
        entrie.toPrimitives(),
      ),
      status: this.status.toPrimitives(),
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
      Play.fromPrimitives(proposal.play),
      ProposalStatus.fromPrimitives(proposal.status),
      proposal.historyEntries.map((entrie) =>
        ProposalHistoryEntrie.fromPrimitives(entrie),
      ),
    );
  }

  static create(
    id: ProposalId,
    userId: UserId,
    postId: PostId,
    title: ProposalTitle,
    description: ProposalDescription,
    createdAt: CreatedAt,
    play: Play,
  ) {
    return new Proposal(
      id,
      userId,
      postId,
      title,
      description,
      createdAt,
      play,
      ProposalStatus.fromPrimitives(ProposalStatusValues.OPEN),
      Array.of(ProposalHistoryEntrie.createWithCreateIntent(userId, createdAt)),
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

  changeStatus(newStatus: string) {
    this.status = ProposalStatus.fromPrimitives(newStatus);
  }

  isClosed() {
    return this.status.toPrimitives() === ProposalStatusValues.CLOSED;
  }

  addHistoryEntrie(proposalHistoryEntrie: ProposalHistoryEntrie) {
    this.historyEntries.push(proposalHistoryEntrie);
  }

  accept(userId: UserId, acceptedAt: CreatedAt) {
    this.changeStatus(ProposalStatusValues.CLOSED);
    this.addHistoryEntrie(
      ProposalHistoryEntrie.createWithAcceptIntent(userId, acceptedAt),
    );
  }

  decline(userId: UserId, declinedAt: CreatedAt) {
    this.changeStatus(ProposalStatusValues.CLOSED);
    this.addHistoryEntrie(
      ProposalHistoryEntrie.createWithDeclineIntent(userId, declinedAt),
    );
  }

  reply(
    userId: UserId,
    repliedAt: CreatedAt,
    message: ProposalHistoryEntriePayloadMessage,
  ) {
    this.addHistoryEntrie(
      ProposalHistoryEntrie.createWithMessageIntent(
        userId,
        repliedAt,
        ProposalHistoryEntriePayload.fromPrimitives(message.toPrimitives()),
      ),
    );
  }

  isOwnedBy(user: UserId) {
    return user.toPrimitives() === this.userId.toPrimitives();
  }
}
