// It will receive a SearchPostDTO as param
import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { SearchPostDTO } from "../dtos/SearchPostDTO";
import { PostFilters } from "@/post/domain/value-objects/PostFilters";

export class GetAll {
  constructor(private postRepository: PostRepository) {}

  async run (params: SearchPostDTO) {
    return this.postRepository.search(new PostFilters({
      tags: params.tags,
      minCreationDate: params.minCreationDate,
      minFavourites: params.minFavourites
    }))
  }
}