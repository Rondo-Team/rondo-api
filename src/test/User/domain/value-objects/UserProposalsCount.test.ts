import { UPPER_PROPOSALS_LIMIT } from "@/config";
import { ProposalsCountInvalidError } from "@/User/domain/errors/ProposalsCountInvalidError";
import { UserProposalsCount } from "@/User/domain/value-objects/UserProposalsCount";
import { describe, expect, it } from "vitest";

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
    expect(() => new UserProposalsCount(UPPER_PROPOSALS_LIMIT + 1)).toThrowError(
      ProposalsCountInvalidError
    );
  });
});
