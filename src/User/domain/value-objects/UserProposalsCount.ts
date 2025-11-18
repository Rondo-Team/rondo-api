import { ProposalsCountInvalidError } from "../errors/ProposalsCountInvalidError";

export const UPPER_PROPOSALS_LIMIT = 10^5

export class UserProposalsCount {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid()
  }

  private ensureIsValid() {
      if (
        !Number.isInteger(this.value) ||
        this.value < 0 ||
        this.value > UPPER_PROPOSALS_LIMIT
      )
        throw new ProposalsCountInvalidError(this.value);
    }
}
