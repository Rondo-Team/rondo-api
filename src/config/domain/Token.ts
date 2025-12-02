export const Token = {
  DB_CONFIG: 'DB_CONFIG'
} as const

export type Token = (typeof Token)[keyof typeof Token]