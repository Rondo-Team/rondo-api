import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    hookTimeout: 30000,

    globalSetup: ["./src/test/setup/globalSetup.ts"],
    setupFiles: ["./src/test/setup/testContainer.ts"],

    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/infrastructure/**"],
    },
  },
});
