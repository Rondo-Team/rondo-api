import { ProposalHistoryEntrieIntentInvalidError } from "../errors/ProposalHistoryEntrieIntentInvalidError.ts";

export const ProposalHistoryEntrieIntentValues = {
  MESSAGE: "MESSAGE",
  CREATE: "CREATE",
  EDIT: "EDIT",
  ACCEPT: "ACCEPT",
  DECLINE: "DECLINE",
} as const;

export type ProposalHistoryEntrieIntentValues =
  (typeof ProposalHistoryEntrieIntentValues)[keyof typeof ProposalHistoryEntrieIntentValues];

export class ProposalHistoryEntrieIntent {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const validValues = Object.values(
      ProposalHistoryEntrieIntentValues,
    ) as string[];
    if (!validValues.includes(this.value))
      throw new ProposalHistoryEntrieIntentInvalidError(this.value);
  }

  static fromPrimitives(value: string) {
    return new ProposalHistoryEntrieIntent(value);
  }

  toPrimitives() {
    return this.value;
  }
}
