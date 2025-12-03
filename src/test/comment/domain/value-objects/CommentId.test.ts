import { describe, expect, it } from "vitest";
import { CommentId } from "../../../../comment/domain/value-objects/CommentId.ts";
import { IdIsNotValidError } from "../../../../shared/domain/errors/IdIsNotValidError.ts";

describe("Comment ID tests", () => {
  it("should not throw error if id is long enough", () => {
    expect(
      () => new CommentId("123e4567-e89b-12d3-a456-426614174000")
    ).not.toThrow();
  });

  it("should not throw error if id is long enough", () => {
    expect(() => new CommentId("1234")).toThrowError(IdIsNotValidError);
  });
});
