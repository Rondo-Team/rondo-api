import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetTrendingPost } from "../../../../post/application/use-cases/GetTrendingPost.ts";
import { PostsNotFoundError } from "../../../../post/domain/errors/PostsNotFoundError.ts";
import {
  ONE_STEP_POST,
  TWO_STEPS_POST,
} from "../../../../shared/utils/domain/fixtures/posts.ts";

describe("Get trending post use case tests", () => {
  const postReadModelRepo = {
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

  beforeEach(() => {
    postReadModelRepo.getMostRatedPostSinceDays = vi.fn();
    postReadModelRepo.getMostRatedPost = vi.fn();
  });

  const getTrendingPost = new GetTrendingPost(postReadModelRepo);

  it("should get a post from the last 7 days if available", async () => {
    postReadModelRepo.getMostRatedPostSinceDays.mockResolvedValueOnce(
      ONE_STEP_POST,
    );

    const result = await getTrendingPost.run();

    expect(result).toEqual(ONE_STEP_POST);
    expect(postReadModelRepo.getMostRatedPostSinceDays).toHaveBeenCalledWith(7);
    expect(postReadModelRepo.getMostRatedPostSinceDays).toHaveBeenCalledTimes(
      1,
    );
  });

  it("should get a post from the last 30 days if 7 days returns null", async () => {
    postReadModelRepo.getMostRatedPostSinceDays.mockResolvedValueOnce(null);
    postReadModelRepo.getMostRatedPostSinceDays.mockResolvedValueOnce(
      TWO_STEPS_POST,
    );

    const result = await getTrendingPost.run();

    expect(result).toEqual(TWO_STEPS_POST);
    expect(postReadModelRepo.getMostRatedPostSinceDays).toHaveBeenCalledWith(
      30,
    );
  });

  it("should get the most rated post of all time if both periods return null", async () => {
    postReadModelRepo.getMostRatedPostSinceDays.mockResolvedValue(null);
    postReadModelRepo.getMostRatedPost.mockResolvedValueOnce(ONE_STEP_POST);

    const result = await getTrendingPost.run();

    expect(result).toEqual(ONE_STEP_POST);
    expect(postReadModelRepo.getMostRatedPost).toHaveBeenCalledTimes(1);
  });

  it("should return undefined if no post is found", async () => {
    postReadModelRepo.getMostRatedPostSinceDays.mockResolvedValue(null);
    postReadModelRepo.getMostRatedPost.mockResolvedValueOnce(undefined);

    await expect(async () => await getTrendingPost.run()).rejects.toThrow(
      PostsNotFoundError,
    );
  });
});
