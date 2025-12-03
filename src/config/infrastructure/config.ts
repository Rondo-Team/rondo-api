export const config = {
  db: {
    username: process.env.DB_USERNAME || 'rondo',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT || '27017', 10),
    database: process.env.DB_DATABASE || 'dev'
  }
} as const

export type config = (typeof config)[keyof typeof config]