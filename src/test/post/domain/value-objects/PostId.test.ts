import { describe, expect, it } from "vitest";
import { PostId } from "../../../../post/domain/value-objects/PostId.ts";
import { IdIsNotValidError } from "../../../../shared/domain/errors/IdIsNotValidError.ts";

describe("Post ID tests", () => {
  it("should not throw error if id is long enough", () => {
    expect(
      () => new PostId("123e4567-e89b-12d3-a456-426614174000")
    ).not.toThrow();
  });

  it("should not throw error if id is long enough", () => {
    expect(() => new PostId("1234")).toThrowError(IdIsNotValidError);
  });
});
