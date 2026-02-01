import { describe, expect, it } from "vitest";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { IdIsNotValidError } from "../../../../shared/domain/errors/IdIsNotValidError.ts";

describe("Proposal ID tests", () => {
  it("should not throw error if id is long enough", () => {
    expect(
      () => new ProposalId("123e4567-e89b-12d3-a456-426614174000")
    ).not.toThrow();
  });

  it("should not throw error if id is long enough", () => {
    expect(() => new ProposalId("1234")).toThrowError(IdIsNotValidError);
  });
});
