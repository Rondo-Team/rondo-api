import { describe, expect, it } from "vitest";
import { TextValue } from "../../../../shared/domain/value-objects/TextValue.ts";
import { DomainError } from "../../../../shared/error-handling/domain/DomainError.ts";

class FakeDomainError extends DomainError {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super("Fake", "FAKE_CODE" as any);
  }
}
// Fake errors
class TooLongError extends FakeDomainError {}
class TooShortError extends FakeDomainError {}
class TooManyNewLinesError extends FakeDomainError {}
class EmptyError extends FakeDomainError {}
class ForbiddenCharsError extends FakeDomainError {}

// Fake TextValue
class TestTextValue extends TextValue {
  protected maxLength() {
    return 20;
  }
  protected minLength() {
    return 3;
  }
  protected maxNewLines() {
    return 1;
  }

  protected tooLongError() {
    return new TooLongError();
  }
  protected tooShortError() {
    return new TooShortError();
  }
  protected tooManyNewLinesError() {
    return new TooManyNewLinesError();
  }
  protected emptyError() {
    return new EmptyError();
  }
  protected forbiddenCharsError() {
    return new ForbiddenCharsError();
  }
}

describe("TextValue tests", () => {
  it("should accept a valid text", () => {
    expect(() => new TestTextValue("hola")).not.toThrow();
  });

  it("should throw too long error", () => {
    expect(() => new TestTextValue("0123456789012345678901234")).toThrowError(
      TooLongError
    );
  });

  it("should throw too short error", () => {
    expect(() => new TestTextValue("hi")).toThrowError(TooShortError);
  });

  it("should throw empty error for whitespace-only text", () => {
    expect(() => new TestTextValue("    ")).toThrowError(EmptyError);
  });

  it("should throw too many new lines error", () => {
    const text = "line1\nline2\nline3";
    expect(() => new TestTextValue(text)).toThrowError(TooManyNewLinesError);
  });

  it("should throw forbidden chars error", () => {
    const bad = "hello\x01world"; // control char
    expect(() => new TestTextValue(bad)).toThrowError(ForbiddenCharsError);
  });
});
