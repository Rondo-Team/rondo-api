import type { PostReadModelRepository } from "../../domain/repositories/PostReadModelRepository.ts";
import { PostCriteriaOptions } from "../../domain/value-objects/PostCriteriaOptions.ts";
import { PostFilters } from "../../domain/value-objects/PostFilters.ts";
import type { PostFiltersDTO } from "../dtos/PostFiltersDTO.ts";

export class GetPostsByCriteria {
  private postReadModelRepository: PostReadModelRepository;
  constructor(postReadModelRepository: PostReadModelRepository) {
    this.postReadModelRepository = postReadModelRepository;
  }

  async run(query?: string, filtersDTO?: PostFiltersDTO) {
    const filters = filtersDTO
      ? PostFilters.fromPrimitives(filtersDTO)
      : undefined;

    return this.postReadModelRepository.getByCriteria(
      PostCriteriaOptions.fromPrimitives({
        query,
        filters,
      }),
    );
  }
}
