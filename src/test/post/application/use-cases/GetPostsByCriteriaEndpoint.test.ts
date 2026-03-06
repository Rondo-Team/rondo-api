import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetPostsByCriteria } from "../../../../post/application/use-cases/GetPostsByCriteria.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Get draft by user id use case tests", () => {
  beforeEach(() => {
    const mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
    };
    postRepo.getByCriteria = vi.fn().mockResolvedValue([mockPost]);
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

  it("Should get posts if not criteria was provided", async () => {
    await getPostsByCriteria.run("post");
    expect(postRepo.getByCriteria).toBeCalledTimes(1);
  });
});
