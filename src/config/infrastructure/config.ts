export const config = {
  db: {
    uri: process.env.MONGO_URI || "mongodb://mongo:27017",
    database: process.env.DB_DATABASE || "dev",
  },
  test_db: {
    uri: process.env.TEST_MONGO_URI || "mongodb://localhost:27017",
    database: process.env.TEST_DATABASE || "test",
  },
  app: {
    port: Number.parseInt(process.env.PORT || "3010", 10),
    baseUrl: "/api/v1",
  },
  hashing: {
    salt: Number.parseInt(process.env.HASH_SALT || "10", 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
} as const;

export type config = (typeof config)[keyof typeof config];
