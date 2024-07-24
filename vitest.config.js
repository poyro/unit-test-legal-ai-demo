import { defineConfig } from "vitest/config";

export default defineConfig({
    test: { setupFiles: ["vitest.setup.js"], fileParallelism: false, pool: "forks", reporters: "verbose" },
});
