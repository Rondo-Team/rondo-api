import type { PostFilters } from "./PostFilters.ts";

export class PostCriteriaOptions {
  private readonly query?: string;
  private readonly filters?: PostFilters;

  constructor(params: { query?: string; filters?: PostFilters }) {
    this.query = params.query;
    this.filters = params.filters;
  }

  static fromPrimitives(params: { query?: string; filters?: PostFilters }) {
    return new PostCriteriaOptions(params);
  }
}
