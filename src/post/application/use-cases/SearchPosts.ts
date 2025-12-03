// It will receive a SearchPostDTO as param

import { PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFilters } from "../../domain/value-objects/PostFilters.ts";
import { SearchPostDTO } from "../dtos/SearchPostDTO.ts";

export class GetAll {
  constructor(private postRepository: PostRepository) {}

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
