import { PROPOSAL_DESCRIPTION_MAX_NEW_LINES } from "@/config/domain/Consts";
import { ProposalDescriptionContainsForbiddenCharsError } from "@/proposal/domain/errors/ProposalDescriptionContainsForbiddenCharsError";
import { ProposalDescriptionHasTooManyNewLinesError } from "@/proposal/domain/errors/ProposalDescriptionHasTooManyNewLinesError";
import { ProposalDescriptionIsEmptyError } from "@/proposal/domain/errors/ProposalDescriptionIsEmptyError";
import { ProposalDescriptionIsTooLongError } from "@/proposal/domain/errors/ProposalDescriptionIsTooLongError";
import { ProposalDescriptionIsTooShortError } from "@/proposal/domain/errors/ProposalDescriptionIsTooShortError";
import { ProposalDescription } from "@/proposal/domain/value-objects/ProposalDescription";
import { describe, expect, it } from "vitest";

describe("Proposal description tests", () => {
  it("does not fail if proposal description is valid", () => {
    expect(
      () => new ProposalDescription("Example proposal Description")
    ).not.toThrow();
  });

  it("throws an error if proposal description is too short", () => {
    expect(() => new ProposalDescription("Ex")).toThrowError(
      ProposalDescriptionIsTooShortError
    );
  });

  it("throws an error if proposal description is too long", () => {
    expect(() => new ProposalDescription("example".repeat(100))).toThrowError(
      ProposalDescriptionIsTooLongError
    );
  });

  it("throws an error if description is empty", () => {
    expect(() => new ProposalDescription("                   ")).toThrowError(
      ProposalDescriptionIsEmptyError
    );
  });

  it("throws an error if descriprtion contains invalid chars", () => {
    expect(
      () => new ProposalDescription("Example\x01description")
    ).toThrowError(ProposalDescriptionContainsForbiddenCharsError);
  });

  it("throws an error if description has many new Lines", () => {
    expect(
      () =>
        new ProposalDescription(
          "line1\n".repeat(PROPOSAL_DESCRIPTION_MAX_NEW_LINES + 1)
        )
    ).toThrowError(ProposalDescriptionHasTooManyNewLinesError);
  });
});
