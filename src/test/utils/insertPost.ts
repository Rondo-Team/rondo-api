import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";
import type { CreatePost } from "../../post/application/use-cases/CreatePost.ts";
import type { PlayDTO } from "../../shared/application/dtos/PlayDTO.ts";

type TestPost = {
  id: string;
  userId: string;
  title: string;
  description: string;
  favouritesCount: number;
  commentsCount: number;
  proposalsCount: number;
  createdAt: Date;
  tags: string[];
  play: PlayDTO;
};

export async function insertPost(TEST_POST: TestPost) {
  const createPost = await container.getAsync<CreatePost>(Token.CREATE_POST);
  await createPost.run(
    TEST_POST.id,
    TEST_POST.userId,
    TEST_POST.title,
    TEST_POST.description,
    TEST_POST.favouritesCount,
    TEST_POST.commentsCount,
    TEST_POST.proposalsCount,
    TEST_POST.createdAt,
    TEST_POST.tags,
    TEST_POST.play
  );
}
