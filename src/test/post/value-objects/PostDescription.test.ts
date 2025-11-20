import { PostDescriptionIsTooLongError } from "@/post/domain/errors/PostDescriptionIsTooLongError";
import { PostDescriptionIsTooShortError } from "@/post/domain/errors/PostDescriptionIsTooShortError";
import { PostDescription } from "@/post/domain/value-objects/PostDescription";
import { describe, expect, it } from "vitest";

describe("Post description tests", () => {
  it("does not fail if post description is valid", () => {
    expect(() => new PostDescription("Example Post Description")).not.toThrow();
  });

  it("throws an error if post description is too short", () => {
    expect(() => new PostDescription("Exam")).toThrowError(
      PostDescriptionIsTooShortError
    );
  });

  it("throws an error if post description is too long", () => {
    expect(() => new PostDescription("example".repeat(100))).toThrowError(
      PostDescriptionIsTooLongError
    );
  });
});
