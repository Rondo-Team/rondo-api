/* eslint-disable @typescript-eslint/no-explicit-any */
export type Endpoint = {
  method: "put" | "post" | "patch" | "delete" | "get";
  path: string;
  handlers: Array<any>;
  secured: boolean;
};
