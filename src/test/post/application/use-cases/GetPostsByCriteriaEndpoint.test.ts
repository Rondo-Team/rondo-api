import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetPostsByCriteria } from "../../../../post/application/use-cases/GetPostsByCriteria.ts";
import { SortableFields } from "../../../../post/domain/value-objects/SortableFields.ts";
import { SortOrder } from "../../../../shared/pagination/domain/SortOrder.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get posts by criteria use case tests", () => {
  beforeEach(() => {
    const mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
    };
    postRepo.getByCriteria = vi.fn().mockResolvedValue({
      items: [mockPost],
      total: 1,
      page: 1,
      limit: 10,
    });
    postRepo.existsWithId = vi.fn().mockResolvedValue(false);
  });

  const postRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAll: vi.fn(),
    getAllByUserId: vi.fn(),
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    getByCriteria: vi.fn(),
    getMostRatedPost: vi.fn(),
    getMostRatedPostSinceDays: vi.fn(),
  };

  const getPostsByCriteria = new GetPostsByCriteria(postRepo);

  it("should forward pagination, query and filters to the repository", async () => {
    const paginationOptions = {
      page: 2,
      limit: 5,
      sortBy: SortableFields.TITLE,
      sortOrder: SortOrder.ASC,
    };
    const minCreationDate = new Date("2025-01-09");

    await getPostsByCriteria.run(paginationOptions, "post", {
      tags: ["433", "attacking"],
      minCreationDate,
      minFavourites: 3,
    });

    expect(postRepo.getByCriteria).toBeCalledTimes(1);

    const criteria = postRepo.getByCriteria.mock.calls[0][0];
    expect(criteria.toPrimitives()).toEqual({
      query: "post",
      filters: {
        tags: ["433", "attacking"],
        minCreationDate,
        minFavourites: 3,
      },
      paginationOptions,
    });
  });

  it("should return the paginated result from the repository", async () => {
    const paginationResult = {
      items: [
        {
          ...ONE_STEP_POST,
          userId: new UserId(ONE_STEP_POST.userId),
        },
      ],
      total: 1,
      page: 1,
      limit: 10,
    };
    postRepo.getByCriteria = vi.fn().mockResolvedValue(paginationResult);

    const result = await getPostsByCriteria.run({
      page: 1,
      limit: 10,
      sortBy: SortableFields.CREATED_AT,
      sortOrder: SortOrder.DESC,
    });

    expect(result).toEqual(paginationResult);
  });
});
