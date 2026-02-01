import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    environment: "node",
    globals: true,

    clearMocks: true,
    restoreMocks: true,

    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/infrastructure/**"],
    },
  },
});
