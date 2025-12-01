import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId";
import { IdIsNotValidError } from "@/shared/domain/errors/IdIsNotValidError";
import { describe, expect, it } from "vitest";

describe("Proposal history entrie ID tests", () => {
  it("should not throw error if id is long enough", () => {
    expect(
      () => new ProposalHistoryEntrieId("123e4567-e89b-12d3-a456-426614174000")
    ).not.toThrow();
  });

  it("should not throw error if id is long enough", () => {
    expect(() => new ProposalHistoryEntrieId("1234")).toThrowError(IdIsNotValidError);
  });
});
