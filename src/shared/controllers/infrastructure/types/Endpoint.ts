import { RequestHandler } from "express"

export type Endpoint = {
  method: 'put' | 'post' | 'patch' | 'delete' | 'get',
  path: string
  handlers: RequestHandler[],
  secured?: boolean
}