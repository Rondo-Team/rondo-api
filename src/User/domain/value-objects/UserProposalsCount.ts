import { UPPER_PROPOSALS_LIMIT } from "../../../config";
import { ProposalsCountInvalidError } from "../errors/ProposalsCountInvalidError";

export class UserProposalsCount {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
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
