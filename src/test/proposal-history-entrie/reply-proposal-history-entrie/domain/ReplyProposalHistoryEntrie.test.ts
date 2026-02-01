import { beforeEach, describe, expect, it } from "vitest";
import { ProposalHistoryEntrieId } from "../../../../proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId.ts";
import { ReplyProposalHistoryEntrie } from "../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/ReplyProposalHistoryEntrie.ts";
import { ReplyProposalHistoryEntrieMessage } from "../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/value-objects/ReplyProposalHistoryEntrieMessage.ts";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { CreatedAt } from "../../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Reply proposal history entrie model tests", () => {
  let reply: ReplyProposalHistoryEntrie;

  const makeReply = () =>
    new ReplyProposalHistoryEntrie(
      new ProposalHistoryEntrieId("550e8400-e29b-41d4-a716-446655440000"),
      new ProposalId("550e8400-e29b-41d4-a716-446655440000"),
      new UserId("550e8400-e29b-41d4-a716-446655440000"),
      new CreatedAt(new Date("2020-01-01")),
      new ReplyProposalHistoryEntrieMessage("Sample message")
    );

  beforeEach(() => {
    reply = makeReply();
  });

  it("creates an activity correctly with all fields", () => {
    expect(reply.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(reply.userId.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(reply.proposalId.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(reply.createdAt.value).toEqual(new Date("2020-01-01"));
    expect(reply.message.value).toBe("Sample message");
  });
});
