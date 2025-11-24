import { DomainError } from "@/shared/error-handling/domain/DomainError";

export abstract class TextValue {
  protected readonly text: string;
  protected abstract maxLength(): number;
  protected abstract minLength(): number;
  protected abstract maxNewLines(): number;

  protected abstract tooLongError(): DomainError;
  protected abstract tooShortError(): DomainError;
  protected abstract tooManyNewLinesError(): DomainError;
  protected abstract emptyError(): DomainError;
  protected abstract forbiddenCharsError(): DomainError;

  constructor(
    text: string,
  ) {
    this.text = text;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const textLength = this.text.length;
    // Length checks
    if (textLength > this.maxLength()) throw this.tooLongError();
    if (textLength < this.minLength()) throw this.tooShortError()

    // Not only whitespaces
    if (this.text.trim().length === 0) throw this.emptyError();

    // No control chars
    // eslint-disable-next-line no-control-regex
    const regex = /[\x00-\x08\x0E-\x1F\x7F]/
    if (regex.test(this.text)) throw this.forbiddenCharsError();

    if ((this.text.match(/\n/g) || []).length > this.maxNewLines()) throw this.tooManyNewLinesError();

  }
}
