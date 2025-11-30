import { ActivityProposalHistoryEntrie } from "@/proposal-history-entrie/activity-proposal-history-entrie/domain/ActivityProposalHistoryEntrie";
import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId";
import { ReplyProposalHistoryEntrie } from "@/proposal-history-entrie/reply-proposal-history-entrie/domain/ReplyProposalHistoryEntrie";
import { ReplyProposalHistoryEntrieMessage } from "@/proposal-history-entrie/reply-proposal-history-entrie/domain/value-objects/ReplyProposalHistoryEntrieMessage";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { UserId } from "@/user/domain/value-objects/UserId";
import { beforeEach, describe, expect, it } from "vitest";

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