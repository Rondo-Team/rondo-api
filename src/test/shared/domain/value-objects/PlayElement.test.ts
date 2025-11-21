import { IdIsNotValidError } from "@/shared/domain/errors/IdIsNotValidError";
import { PlayElementXIsOutOfRangeError } from "@/shared/domain/errors/PlayElementXIsOutOfRangeError";
import { PlayElementYIsOutOfRangeError } from "@/shared/domain/errors/PlayElementYIsOutOfRangeError";
import { PlayElement } from "@/shared/domain/value-objects/PlayElement";
import { PlayElementType } from "@/shared/domain/value-objects/PlayElementType";
import { describe, expect, it } from "vitest";

describe("Play Element tests", () => {
  it("should not throw error if play element is valid", () => {
    expect(
      () =>
        new PlayElement(
          "123e4567-e89b-12d3-a456-426614174000",
          55,
          20,
          PlayElementType.BALL
        )
    ).not.toThrow();
  });

  it("should throw error if x is invalid ", () => {
    expect(
      () =>
        new PlayElement(
          "123e4567-e89b-12d3-a456-426614174000",
          110,
          20,
          PlayElementType.BALL
        )
    ).toThrowError(PlayElementXIsOutOfRangeError);
  });

  it("should throw error if y is invalid ", () => {
    expect(
      () =>
        new PlayElement(
          "123e4567-e89b-12d3-a456-426614174000",
          55,
          110,
          PlayElementType.BALL
        )
    ).toThrowError(PlayElementYIsOutOfRangeError);
  });

  it("should throw error if id is invalid ", () => {
    expect(
      () => new PlayElement("2", 55, 20, PlayElementType.BALL)
    ).toThrowError(IdIsNotValidError);
  });
});
