import type { PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostCriteriaOptions } from "../../domain/value-objects/PostCriteriaOptions.ts";
import { PostFilters } from "../../domain/value-objects/PostFilters.ts";
import type { PostFiltersDTO } from "../dtos/PostFiltersDTO.ts";

export class GetPostsByCriteria {
  private postRepository: PostRepository;
  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async run(query?: string, filtersDTO?: PostFiltersDTO) {
    const filters = filtersDTO
      ? PostFilters.fromPrimitives(filtersDTO)
      : undefined;

    return this.postRepository.getByCriteria(
      PostCriteriaOptions.fromPrimitives({
        query,
        filters,
      })
    );
  }
}
