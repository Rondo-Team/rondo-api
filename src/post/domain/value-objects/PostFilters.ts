import {
  SEARCH_POSTS_MIN_FAVOURITES_UPPER_LIMIT,
  SEARCH_POSTS_TAGS_UPPER_LIMIT,
} from "../../../config/domain/Consts.ts";
import { PostFilterCreationDateInvalidError } from "../errors/PostFilterCreationDateInvalidError.ts";
import { PostFilterMinFavouritesIsIvalidError } from "../errors/PostFilterMinFavouritesIsIvalidError.ts";
import { PostFilterTagIsInvalidError } from "../errors/PostFilterTagIsInvalidError.ts";
import { PostFilterTagsListHasRepeatedElementsError } from "../errors/PostFilterTagsListHasRepeatedElementsError.ts";
import { PostFilterTagsListIsTooLongError } from "../errors/PostFilterTagsListIsTooLongError.ts";

export class PostFilters {
  tags?: string[];
  minCreationDate?: Date;
  minFavourites?: number;

  constructor(
    params: {
      tags?: string[];
      minCreationDate?: Date;
      minFavourites?: number;
    }
  ) {
    this.tags = params.tags;
    this.minCreationDate = params.minCreationDate;
    this.minFavourites = params.minFavourites;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    this.ensureTagsIsValid();
    this.ensureMinCreationDateIsValid();
    this.ensureMinFavouritesIsValid();
  }

  private ensureTagsIsValid() {
    if (this.tags) {
      if (this.tags.length > SEARCH_POSTS_TAGS_UPPER_LIMIT)
        throw new PostFilterTagsListIsTooLongError();

      const uniqueTags = new Set(this.tags).size;
      if (uniqueTags !== this.tags.length)
        throw new PostFilterTagsListHasRepeatedElementsError();

      // Check each tag with regex (only chars and numbers)
      const regex = /^[a-zA-Z0-9]+$/;
      this.tags.forEach((tag) => {
        if (!regex.test(tag)) throw new PostFilterTagIsInvalidError(tag);
      });
    }
  }

  private ensureMinFavouritesIsValid() {
    if (this.minFavourites) {
      if (
        !Number.isInteger(this.minFavourites) ||
        this.minFavourites < 0 ||
        this.minFavourites > SEARCH_POSTS_MIN_FAVOURITES_UPPER_LIMIT
      )
        throw new PostFilterMinFavouritesIsIvalidError(this.minFavourites);
    }
  }

  private ensureMinCreationDateIsValid() {
    if (this.minCreationDate) {
      if (this.minCreationDate > new Date())
        throw new PostFilterCreationDateInvalidError(this.minCreationDate);
    }
  }
}
