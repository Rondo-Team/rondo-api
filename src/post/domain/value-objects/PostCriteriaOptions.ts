import type { PaginationOptions } from "../../../shared/pagination/domain/PaginationOptions.ts";
import type { PostFilters } from "./PostFilters.ts";
import type { SortableFields } from "./SortableFields.ts";

export class PostCriteriaOptions {
  private readonly query?: string;
  private readonly filters?: PostFilters;
  private readonly paginationOptions: PaginationOptions<SortableFields>;

  constructor(params: {
    query?: string;
    filters?: PostFilters;
    paginationOptions: PaginationOptions<SortableFields>;
  }) {
    this.query = params.query;
    this.filters = params.filters;
    this.paginationOptions = params.paginationOptions;
  }

  static fromPrimitives(params: {
    query?: string;
    filters?: PostFilters;
    paginationOptions: PaginationOptions<SortableFields>;
  }) {
    return new PostCriteriaOptions(params);
  }

  toPrimitives() {
    return {
      query: this.query,
      filters: this.filters?.toPrimitives(),
      paginationOptions: this.paginationOptions,
    };
  }
}
