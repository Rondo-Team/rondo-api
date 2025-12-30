import { Db } from "mongodb";
import { container } from "../../container.ts";

export async function clearTestDatabase() {
  const collections: string[] = ["users", "drafts"];
  const db = await container.getAsync(Db);
  collections.forEach(async (collection) => {
    await db.collection(collection).deleteMany({});
  });
}
