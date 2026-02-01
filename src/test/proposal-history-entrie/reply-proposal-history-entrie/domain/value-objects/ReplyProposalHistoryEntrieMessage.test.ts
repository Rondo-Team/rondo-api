import { describe, expect, it } from "vitest";
import { REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_MAX_NEW_LINES } from "../../../../../config/domain/Consts.ts";
import { ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/errors/ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError.ts";
import { ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/errors/ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError.ts";
import { ReplyProposalHistoryEntrieMessageIsEmptyError } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/errors/ReplyProposalHistoryEntrieMessageIsEmptyError.ts";
import { ReplyProposalHistoryEntrieMessageIsTooLongError } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/errors/ReplyProposalHistoryEntrieMessageIsTooLongError.ts";
import { ReplyProposalHistoryEntrieMessageIsTooShortError } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/errors/ReplyProposalHistoryEntrieMessageIsTooShortError.ts";
import { ReplyProposalHistoryEntrieMessage } from "../../../../../proposal-history-entrie/reply-proposal-history-entrie/domain/value-objects/ReplyProposalHistoryEntrieMessage.ts";

describe("message tests", () => {
  it("does not fail if message is valid", () => {
    expect(
      () =>
        new ReplyProposalHistoryEntrieMessage(
          "Example ReplyProposalHistoryEntrieMessage"
        )
    ).not.toThrow();
  });

  it("throws an error if  message is too short", () => {
    expect(() => new ReplyProposalHistoryEntrieMessage("")).toThrowError(
      ReplyProposalHistoryEntrieMessageIsTooShortError
    );
  });

  it("throws an error if message is too long", () => {
    expect(
      () => new ReplyProposalHistoryEntrieMessage("example".repeat(100))
    ).toThrowError(ReplyProposalHistoryEntrieMessageIsTooLongError);
  });

  it("throws an error if message is empty", () => {
    expect(
      () => new ReplyProposalHistoryEntrieMessage("                   ")
    ).toThrowError(ReplyProposalHistoryEntrieMessageIsEmptyError);
  });

  it("throws an error if message contains invalid chars", () => {
    expect(
      () => new ReplyProposalHistoryEntrieMessage("Example\x01description")
    ).toThrowError(
      ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError
    );
  });

  it("throws an error if message has many new Lines", () => {
    expect(
      () =>
        new ReplyProposalHistoryEntrieMessage(
          "line1\n".repeat(
            REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_MAX_NEW_LINES + 1
          )
        )
    ).toThrowError(ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError);
  });
});
