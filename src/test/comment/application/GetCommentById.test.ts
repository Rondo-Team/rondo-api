import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetCommentById } from "../../../comment/application/use-cases/GetCommentById.ts";
import { CommentNotFoundByIdError } from "../../../comment/domain/errors/CommentNotFoundByIdError.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../shared/utils/domain/fixtures/comments.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Get comment by id use case tests", () => {
  const mockComment = {
    ...SAMPLE_PARENT_COMMENT,
    userId: UserId.fromPrimitives(SAMPLE_PARENT_COMMENT.userId),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    commentRepo.getOneById = vi.fn().mockResolvedValue(mockComment);
  });

  const commentRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    existsWithId: vi.fn(),
    getAllByPostId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    detachChildrenFromParent: vi.fn(),
  };

  const getCommentById = new GetCommentById(commentRepo);

  it("Should get comment by id successfully", async () => {
    await getCommentById.run(SAMPLE_PARENT_COMMENT.id);

    expect(commentRepo.getOneById).toBeCalledTimes(1);
  });

  it("should not get comments if post does not exist", async () => {
    commentRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () => await getCommentById.run(SAMPLE_PARENT_COMMENT.id)
    ).rejects.toThrow(CommentNotFoundByIdError);
  });
});
