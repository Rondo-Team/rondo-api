import { config } from "../../config/infrastructure/config.ts";

export const testMongoOptions = {
  ...config.test_db,
};
