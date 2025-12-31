import { Db } from "mongodb";
import { container } from "../../container.ts";
import { MongoCollections } from "../../shared/persistance/infrastructure/mongo/MongoCollections.ts";

export async function clearTestDatabase() {
  const collections = Object.values(MongoCollections);
  const db = await container.getAsync(Db);
  collections.forEach(async (collection) => {
    await db.collection(collection).deleteMany({});
  });
}
