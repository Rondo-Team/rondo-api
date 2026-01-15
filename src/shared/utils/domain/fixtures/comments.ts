import { ONE_STEP_POST } from "./posts.ts";
import { MANOLO_LOPEZ } from "./users.ts";

export const SAMPLE_PARENT_COMMENT = {
  id: "5ccba252-b534-4741-8f49-612d78a58966",
  userId: MANOLO_LOPEZ.id,
  postId: ONE_STEP_POST.id,
  message: "This is my sample parent comment",
  createdAt: new Date(),
  parentId: null,
};
