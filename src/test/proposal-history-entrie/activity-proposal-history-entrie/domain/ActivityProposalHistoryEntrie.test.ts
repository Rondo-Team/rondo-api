import { beforeEach, describe, expect, it } from "vitest";
import { ActivityProposalHistoryEntrie } from "../../../../proposal-history-entrie/activity-proposal-history-entrie/domain/ActivityProposalHistoryEntrie.ts";
import { ProposalHistoryEntrieId } from "../../../../proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId.ts";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { CreatedAt } from "../../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Activity proposal history entrie model tests", () => {
  let activity: ActivityProposalHistoryEntrie;

  const makeActivity = () =>
    new ActivityProposalHistoryEntrie(
      new ProposalHistoryEntrieId("550e8400-e29b-41d4-a716-446655440000"),
      new ProposalId("550e8400-e29b-41d4-a716-446655440000"),
      new UserId("550e8400-e29b-41d4-a716-446655440000"),
      new CreatedAt(new Date("2020-01-01"))
    );

  beforeEach(() => {
    activity = makeActivity();
  });

  it("creates an activity correctly with all fields", () => {
    expect(activity.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(activity.userId.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(activity.proposalId.value).toBe(
      "550e8400-e29b-41d4-a716-446655440000"
    );
    expect(activity.createdAt.value).toEqual(new Date("2020-01-01"));
  });
});
