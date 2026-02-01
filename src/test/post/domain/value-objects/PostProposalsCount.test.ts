import { describe, expect, it } from "vitest";
import { POST_PROPOSALS_UPPER_LIMIT } from "../../../../config/domain/Consts.ts";
import { PostProposalsCountIsInvalidError } from "../../../../post/domain/errors/PostProposalsCountIsInvalidError.ts";
import { PostProposalsCount } from "../../../../post/domain/value-objects/PostProposalsCount.ts";

describe("Post proposals count tests", () => {
  it("does not fail if posts proposals count is valid", () => {
    expect(() => new PostProposalsCount(7)).not.toThrow();
  });

  it("throws an error if posts proposals count is invalid (non integer number)", () => {
    expect(() => new PostProposalsCount(7.7)).toThrowError(
      PostProposalsCountIsInvalidError
    );
  });

  it("throws an error if posts proposals count is invalid (negative number)", () => {
    expect(() => new PostProposalsCount(-7)).toThrowError(
      PostProposalsCountIsInvalidError
    );
  });

  it("throws an error if posts proposals count is invalid (greateer than max)", () => {
    expect(
      () => new PostProposalsCount(POST_PROPOSALS_UPPER_LIMIT + 1)
    ).toThrowError(PostProposalsCountIsInvalidError);
  });
});
