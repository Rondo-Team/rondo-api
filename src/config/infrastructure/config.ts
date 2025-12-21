export const config = {
  db: {
    username: process.env.DB_USERNAME || "rondo",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "dev",
  },
  app: {
    port: Number.parseInt(process.env.PORT || "3010", 10),
    baseUrl: "/api/v1"
    
  },
  hashing: {
    salt: Number.parseInt(process.env.HASH_SALT || "10", 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
} as const;

export type config = (typeof config)[keyof typeof config];
