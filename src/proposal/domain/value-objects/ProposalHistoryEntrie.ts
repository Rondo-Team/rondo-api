import type { Primitives } from "../../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalHistoryEntrieRequiresPayloadError } from "../errors/ProposalHistoryEntrieRequiresPayloadError.ts";
import { ProposalHistoryEntriePayload } from "./ProposalHistoryEntriePayload.ts";
import {
  ProposalHistoryEntrieIntent,
  ProposalHistoryEntrieIntentValues,
} from "./ProposalHystoryEntrieIntent.ts";

export type ProposalHistoryEntriePrimitives = Primitives<ProposalHistoryEntrie>;
export class ProposalHistoryEntrie {
  userId: UserId;
  createdAt: CreatedAt;
  intent: ProposalHistoryEntrieIntent;
  payload?: ProposalHistoryEntriePayload;

  private constructor(
    userId: UserId,
    createdAt: CreatedAt,
    intent: ProposalHistoryEntrieIntent,
    payload?: ProposalHistoryEntriePayload,
  ) {
    this.userId = userId;
    this.createdAt = createdAt;
    this.intent = intent;
    this.payload = payload;
  }

  static createWithMessageIntent(
    userId: UserId,
    createdAt: CreatedAt,
    payload: ProposalHistoryEntriePayload,
  ) {
    return new ProposalHistoryEntrie(
      userId,
      createdAt,
      ProposalHistoryEntrieIntent.fromPrimitives(
        ProposalHistoryEntrieIntentValues.MESSAGE,
      ),
      payload,
    );
  }

  static createWithCreateIntent(userId: UserId, createdAt: CreatedAt) {
    return new ProposalHistoryEntrie(
      userId,
      createdAt,
      ProposalHistoryEntrieIntent.fromPrimitives(
        ProposalHistoryEntrieIntentValues.CREATE,
      ),
    );
  }

  static createWithEditIntent(userId: UserId, createdAt: CreatedAt) {
    return new ProposalHistoryEntrie(
      userId,
      createdAt,
      ProposalHistoryEntrieIntent.fromPrimitives(
        ProposalHistoryEntrieIntentValues.EDIT,
      ),
    );
  }

  static createWithAcceptIntent(userId: UserId, createdAt: CreatedAt) {
    return new ProposalHistoryEntrie(
      userId,
      createdAt,
      ProposalHistoryEntrieIntent.fromPrimitives(
        ProposalHistoryEntrieIntentValues.ACCEPT,
      ),
    );
  }

  static createWithDeclineIntent(userId: UserId, createdAt: CreatedAt) {
    return new ProposalHistoryEntrie(
      userId,
      createdAt,
      ProposalHistoryEntrieIntent.fromPrimitives(
        ProposalHistoryEntrieIntentValues.DECLINE,
      ),
    );
  }

  toPrimitives() {
    return {
      userId: this.userId.toPrimitives(),
      createdAt: this.createdAt.toPrimitives(),
      intent: this.intent.toPrimitives(),
      payload: this.payload ? this.payload.toPrimitives() : undefined,
    };
  }

  static fromPrimitives(primitives: ProposalHistoryEntriePrimitives) {
    if (primitives.intent === ProposalHistoryEntrieIntentValues.MESSAGE) {
      if (primitives.payload === undefined)
        throw new ProposalHistoryEntrieRequiresPayloadError(primitives.intent);

      return new ProposalHistoryEntrie(
        UserId.fromPrimitives(primitives.userId),
        CreatedAt.fromPrimitives(primitives.createdAt),
        ProposalHistoryEntrieIntent.fromPrimitives(primitives.intent),
        ProposalHistoryEntriePayload.fromPrimitives(primitives.payload),
      );
    }
    return new ProposalHistoryEntrie(
      UserId.fromPrimitives(primitives.userId),
      CreatedAt.fromPrimitives(primitives.createdAt),
      ProposalHistoryEntrieIntent.fromPrimitives(primitives.intent),
    );
  }
}
