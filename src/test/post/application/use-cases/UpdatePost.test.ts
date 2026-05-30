import { beforeEach, describe, expect, it, vi } from "vitest";
import { UpdatePost } from "../../../../post/application/use-cases/UpdatePost.ts";
import { PostNotFoundByIdError } from "../../../../post/domain/errors/PostNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import {
  ONE_STEP_POST,
  TWO_STEPS_POST,
} from "../../../../shared/utils/domain/fixtures/posts.ts";
import { PEDRO_MARTINEZ } from "../../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("Update post use case tests", () => {
  let mockPost;

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

  const updatePost = new UpdatePost(postRepo);

  beforeEach(() => {
    vi.clearAllMocks();

    mockPost = {
      ...ONE_STEP_POST,
      userId: new UserId(ONE_STEP_POST.userId),
      changePlay: vi.fn(),
      changeTitle: vi.fn(),
      changeDescription: vi.fn(),
      changeTags: vi.fn(),
    };

    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
  });

  it("should update all provided fields successfully", async () => {
    await updatePost.run(
      ONE_STEP_POST.id,
      ONE_STEP_POST.userId,
      TWO_STEPS_POST.play,
      TWO_STEPS_POST.title,
      TWO_STEPS_POST.description,
      TWO_STEPS_POST.tags,
    );

    expect(mockPost.changePlay).toBeCalledTimes(1);
    expect(mockPost.changeTitle).toBeCalledTimes(1);
    expect(mockPost.changeDescription).toBeCalledTimes(1);
    expect(mockPost.changeTags).toBeCalledTimes(1);
    expect(postRepo.edit).toBeCalledTimes(1);
  });

  it("should update only provided fields", async () => {
    await updatePost.run(
      ONE_STEP_POST.id,
      ONE_STEP_POST.userId,
      undefined,
      TWO_STEPS_POST.title,
      undefined,
      undefined,
    );

    expect(mockPost.changePlay).not.toBeCalled();
    expect(mockPost.changeTitle).toBeCalledTimes(1);
    expect(mockPost.changeDescription).not.toBeCalled();
    expect(mockPost.changeTags).not.toBeCalled();
    expect(postRepo.edit).toBeCalledTimes(1);
  });

  it("should not update a post if user does not own it", async () => {
    await expect(
      async () =>
        await updatePost.run(
          ONE_STEP_POST.id,
          PEDRO_MARTINEZ.id,
          TWO_STEPS_POST.play,
          TWO_STEPS_POST.title,
          TWO_STEPS_POST.description,
          TWO_STEPS_POST.tags,
        ),
    ).rejects.toThrow(UnauthorizedUserActionError);
  });

  it("should not update a post if it does not exist", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await updatePost.run(
          ONE_STEP_POST.id,
          TWO_STEPS_POST.userId,
          TWO_STEPS_POST.play,
          TWO_STEPS_POST.title,
          TWO_STEPS_POST.description,
          TWO_STEPS_POST.tags,
        ),
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
