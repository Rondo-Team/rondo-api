// It will receive a SearchPostDTO as param

// It will receive a SearchPostDTO as param
import type { PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFilters } from "../../domain/value-objects/PostFilters.ts";
import type { SearchPostDTO } from "../dtos/SearchPostDTO.ts";

export class GetAll {
  private postRepository: PostRepository;
  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async run(params: SearchPostDTO) {
    return this.postRepository.search(
      new PostFilters({
        tags: params.tags,
        minCreationDate: params.minCreationDate,
        minFavourites: params.minFavourites,
      })
    );
  }
}
