import { beforeEach, describe, expect, it } from "vitest";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { Proposal } from "../../../proposal/domain/Proposal.ts";
import { ProposalDescription } from "../../../proposal/domain/value-objects/ProposalDescription.ts";
import { ProposalHistoryEntriePayloadMessage } from "../../../proposal/domain/value-objects/ProposalHistoryEntriePayload.ts";
import { ProposalHistoryEntrieIntentValues } from "../../../proposal/domain/value-objects/ProposalHystoryEntrieIntent.ts";
import { ProposalId } from "../../../proposal/domain/value-objects/ProposalId.ts";
import { ProposalTitle } from "../../../proposal/domain/value-objects/ProposalTitle.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { PlayElement } from "../../../shared/domain/value-objects/PlayElement.ts";
import { PlayElementType } from "../../../shared/domain/value-objects/PlayElementType.ts";
import { PlayStep } from "../../../shared/domain/value-objects/PlayStep.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Proposal model tests", () => {
  let proposal: Proposal;
  const element = new PlayElement(
    "550e8420-e29b-41d4-a716-446655440000",
    20,
    30,
    PlayElementType.TEAMMATE,
  );
  const step = new PlayStep([element]);

  const makeProposal = () =>
    Proposal.create(
      new ProposalId("550e8400-e29b-41d4-a716-446655440000"),
      new UserId("123e4567-e89b-12d3-a456-426614174000"),
      new PostId("123e4567-e89b-12d3-a456-426614174001"),
      new ProposalTitle("Example Title"),
      new ProposalDescription("This is an example description."),
      new CreatedAt(new Date("2023-01-01")),
      new Play([step]),
    );

  beforeEach(() => {
    proposal = makeProposal();
  });

  it("creates a proposal correctly with all fields", () => {
    expect(proposal.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(proposal.userId.value).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(proposal.postId.value).toBe("123e4567-e89b-12d3-a456-426614174001");
    expect(proposal.title.value).toBe("Example Title");
    expect(proposal.description.value).toBe("This is an example description.");
    expect(proposal.createdAt.value).toEqual(new Date("2023-01-01"));
    expect(
      proposal.play.value.steps.map((step) =>
        step.value.elements.map((el) => ({
          id: el.id,
          x: el.x,
          y: el.y,
          elementType: el.elementType,
        })),
      ),
    ).toEqual([
      [
        {
          id: "550e8420-e29b-41d4-a716-446655440000",
          x: 20,
          y: 30,
          elementType: "TEAMMATE",
        },
      ],
    ]);
  });

  it("initializes the history with a single CREATE entry", () => {
    expect(proposal.historyEntries).toHaveLength(1);

    const entrie = proposal.historyEntries[0];
    expect(entrie.intent.toPrimitives()).toBe(
      ProposalHistoryEntrieIntentValues.CREATE,
    );
    expect(entrie.userId.value).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(entrie.createdAt.value).toEqual(new Date("2023-01-01"));
    expect(entrie.payload).toBeUndefined();
  });

  it("allows changing the title", () => {
    const newTitle = new ProposalTitle("New Proposal Title");
    proposal.changeTitle(newTitle);
    expect(proposal.title.value).toBe("New Proposal Title");
  });

  it("allows changing the description", () => {
    const newDesc = new ProposalDescription("New description");
    proposal.changeDescription(newDesc);
    expect(proposal.description.value).toBe("New description");
  });

  it("allows changing the play", () => {
    const newElement = new PlayElement(
      "550e8400-e29b-41d4-a716-446655440000",
      10,
      20,
      PlayElementType.TEAMMATE,
    );
    const newStep = new PlayStep([newElement]);
    const newPlay = new Play([newStep]);

    proposal.changePlay(newPlay);

    expect(
      proposal.play.value.steps.map((step) =>
        step.value.elements.map((el) => ({
          id: el.id,
          x: el.x,
          y: el.y,
          elementType: el.elementType,
        })),
      ),
    ).toEqual([
      [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          x: 10,
          y: 20,
          elementType: "TEAMMATE",
        },
      ],
    ]);
  });

  it("accepts the proposal closing it and appending an ACCEPT history entry", () => {
    const actorUserId = new UserId("123e4567-e89b-12d3-a456-426614174999");
    const acceptedAt = new CreatedAt(new Date("2023-02-01"));

    proposal.accept(actorUserId, acceptedAt);

    expect(proposal.isClosed()).toBe(true);
    expect(proposal.historyEntries).toHaveLength(2);

    const acceptEntrie = proposal.historyEntries[1];
    expect(acceptEntrie.intent.toPrimitives()).toBe(
      ProposalHistoryEntrieIntentValues.ACCEPT,
    );
    expect(acceptEntrie.userId.value).toBe(
      "123e4567-e89b-12d3-a456-426614174999",
    );
    expect(acceptEntrie.createdAt.value).toEqual(new Date("2023-02-01"));
    expect(acceptEntrie.payload).toBeUndefined();
  });

  it("declines the proposal closing it and appending a DECLINE history entry", () => {
    const actorUserId = new UserId("123e4567-e89b-12d3-a456-426614174999");
    const declinedAt = new CreatedAt(new Date("2023-02-01"));

    proposal.decline(actorUserId, declinedAt);

    expect(proposal.isClosed()).toBe(true);
    expect(proposal.historyEntries).toHaveLength(2);

    const declineEntrie = proposal.historyEntries[1];
    expect(declineEntrie.intent.toPrimitives()).toBe(
      ProposalHistoryEntrieIntentValues.DECLINE,
    );
    expect(declineEntrie.userId.value).toBe(
      "123e4567-e89b-12d3-a456-426614174999",
    );
    expect(declineEntrie.createdAt.value).toEqual(new Date("2023-02-01"));
    expect(declineEntrie.payload).toBeUndefined();
  });

  it("replies appending a MESSAGE history entry with the message payload", () => {
    const actorUserId = new UserId("123e4567-e89b-12d3-a456-426614174999");
    const repliedAt = new CreatedAt(new Date("2023-02-01"));
    const message = new ProposalHistoryEntriePayloadMessage(
      "This is a reply message.",
    );

    proposal.reply(actorUserId, repliedAt, message);

    expect(proposal.isClosed()).toBe(false);
    expect(proposal.historyEntries).toHaveLength(2);

    const replyEntrie = proposal.historyEntries[1];
    expect(replyEntrie.intent.toPrimitives()).toBe(
      ProposalHistoryEntrieIntentValues.MESSAGE,
    );
    expect(replyEntrie.userId.value).toBe(
      "123e4567-e89b-12d3-a456-426614174999",
    );
    expect(replyEntrie.createdAt.value).toEqual(new Date("2023-02-01"));
    expect(replyEntrie.payload?.toPrimitives()).toBe(
      "This is a reply message.",
    );
  });

  it("recognizes the owner of the proposal", () => {
    expect(
      proposal.isOwnedBy(new UserId("123e4567-e89b-12d3-a456-426614174000")),
    ).toBe(true);
  });

  it("does not recognize a non-owner of the proposal", () => {
    expect(
      proposal.isOwnedBy(new UserId("123e4567-e89b-12d3-a456-426614174999")),
    ).toBe(false);
  });
});
