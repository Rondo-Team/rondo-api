export const Token = {
  DB_CONFIG: 'DB_CONFIG',
  COMMENT_REPOSITORY: 'COMMENT_REPOSITORY',
  PASSWORD_HASHER: 'PASSWORD_HASHER'
} as const

export type Token = (typeof Token)[keyof typeof Token]