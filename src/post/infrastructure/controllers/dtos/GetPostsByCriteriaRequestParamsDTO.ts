import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

// Check is in base64 format
const base64String = z.string().refine((val) => {
  try {
    atob(val);
    return true;
  } catch {
    return false;
  }
});

export const GetPostsByCriteriaRequestParamsDTO = z
  .object({
    query: z.string().min(1).optional().openapi({ example: "sample search" }),
    filters: base64String.optional().openapi({
      example:
        "eyJ0YWdzIjpbIjQzMyIsIkF0dGFja2luZyJdLCJtaW5DcmVhdGlvbkRhdGUiOiIyMDI0LTEwLTEyVDAwOjAwOjAwLjAwMFoiLCJtaW5GYXZvdXJpdGVzIjowfQ==",
    }),
  })
  .openapi({
    description: "Query params for searching posts with optional filters",
  });
