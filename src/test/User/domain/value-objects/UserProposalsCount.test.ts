import { describe, expect, it } from "vitest";
import { UPPER_PROPOSALS_LIMIT } from "../../../../config/domain/Consts.ts";
import { ProposalsCountInvalidError } from "../../../../user/domain/errors/ProposalsCountInvalidError.ts";
import { UserProposalsCount } from "../../../../user/domain/value-objects/UserProposalsCount.ts";

describe("UserProposalsCount tests", () => {
  it("does not fail if user proposals count is valid", () => {
    expect(() => new UserProposalsCount(7)).not.toThrow();
  });

  it("throws an error if user proposals count is invalid (non integer number)", () => {
    expect(() => new UserProposalsCount(7.7)).toThrowError(
      ProposalsCountInvalidError
    );
  });

  it("throws an error if user proposals count is invalid (negative number)", () => {
    expect(() => new UserProposalsCount(-7)).toThrowError(
      ProposalsCountInvalidError
    );
  });

  it("throws an error if user proposals count is invalid (greateer than max)", () => {
    expect(
      () => new UserProposalsCount(UPPER_PROPOSALS_LIMIT + 1)
    ).toThrowError(ProposalsCountInvalidError);
  });
});
