import { ProposalStatusIsInvalidError } from "../errors/ProposalStatusIsInvalidError.ts";

export const ProposalStatusValues = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
} as const;

export type ProposalStatusValue =
  (typeof ProposalStatusValues)[keyof typeof ProposalStatusValues];

export class ProposalStatus {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const validValues = Object.values(ProposalStatusValues) as string[];
    if (!validValues.includes(this.value))
      throw new ProposalStatusIsInvalidError(this.value);
  }

  static fromPrimitives(value: string) {
    return new ProposalStatus(value);
  }

  toPrimitives() {
    return this.value;
  }
}
