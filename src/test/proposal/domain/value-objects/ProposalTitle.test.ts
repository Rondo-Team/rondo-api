import { POST_TITLE_MAX_NEW_LINES } from "@/config/domain/Consts";
import { ProposalTitleContainsForbiddenCharsError } from "@/proposal/domain/errors/ProposalTitleContainsForbiddenCharsError";
import { ProposalTitleHasTooManyNewLinesError } from "@/proposal/domain/errors/ProposalTitleHasTooManyNewLinesError";
import { ProposalTitleIsEmptyError } from "@/proposal/domain/errors/ProposalTitleIsEmptyError";
import { ProposalTitleIsTooLongError } from "@/proposal/domain/errors/ProposalTitleIsTooLongError";
import { ProposalTitleIsTooShortError } from "@/proposal/domain/errors/ProposalTitleIsTooShortError";
import { ProposalTitle } from "@/proposal/domain/value-objects/ProposalTitle";
import { describe, expect, it } from "vitest";

describe("Proposal title tests", () => {
  it("does not fail if proposal title is valid", () => {
    expect(() => new ProposalTitle("Example Proposal Title")).not.toThrow();
  });

  it("throws an error if proposal title is too short", () => {
    expect(() => new ProposalTitle("Ex")).toThrowError(
      ProposalTitleIsTooShortError
    );
  });

  it("throws an error if proposal title is too long", () => {
    expect(
      () => new ProposalTitle("Example Proposal Title Extra Super Looooooong")
    ).toThrowError(ProposalTitleIsTooLongError);
  });

  it("throws an error if title is empty", () => {
    expect(() => new ProposalTitle("    ")).toThrowError(
      ProposalTitleIsEmptyError
    );
  });

  it("throws an error if title contains invalid chars", () => {
    expect(() => new ProposalTitle("Example\x01title")).toThrowError(
      ProposalTitleContainsForbiddenCharsError
    );
  });

  it("throws an error if title has many new Lines", () => {
    expect(
      () => new ProposalTitle("line1\n".repeat(POST_TITLE_MAX_NEW_LINES + 1))
    ).toThrowError(ProposalTitleHasTooManyNewLinesError);
  });
});
