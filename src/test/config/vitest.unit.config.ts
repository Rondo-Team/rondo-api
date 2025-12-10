import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    exclude: ["src/**/*.integration.test.ts", "src/**/*.e2e.test.ts"],
  },
});
