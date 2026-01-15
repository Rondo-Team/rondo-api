import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetAllCommentsByPostId } from "../../../comment/application/use-cases/GetAllCommentsByPostId.ts";
import { PostNotFoundByIdError } from "../../../post/domain/errors/PostNotFoundByIdError.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Get all comments by post id use case tests", () => {
  const mockPost = {
    ...ONE_STEP_POST,
    userId: UserId.fromPrimitives(ONE_STEP_POST.userId),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
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
  };

  const commentRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    existsWithId: vi.fn(),
    getAllByPostId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    detachChildrenFromParent: vi.fn(),
  };

  const getAllCommentsByPostId = new GetAllCommentsByPostId(
    commentRepo,
    postRepo
  );

  it("Should get all comments by post id successfully", async () => {
    await getAllCommentsByPostId.run(ONE_STEP_POST.id);

    expect(postRepo.getOneById).toBeCalledTimes(1);
    expect(commentRepo.getAllByPostId).toBeCalledTimes(1);
  });

  it("should not get comments if post does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () => await getAllCommentsByPostId.run(ONE_STEP_POST.id)
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
