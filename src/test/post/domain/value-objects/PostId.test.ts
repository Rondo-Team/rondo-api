import { PostId } from "@/post/domain/value-objects/PostId";
import { IdIsNotValidError } from "@/shared/domain/errors/IdIsNotValidError";
import { describe, expect, it } from "vitest";

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
