import { MongoClient } from "mongodb";
import { container } from "./testContainer.ts";

export async function setup() {
  const client = await container.getAsync(MongoClient);
  await client.connect();
}

export async function teardown() {
  const client = await container.getAsync(MongoClient);
  await client.close();
}
