import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    benchmark: {
      outputFile: './bench/report.json',
      reporters: process.env.CI ? ['json'] : ['verbose'],
    },
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'plugins'],
    coverage: {
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
      exclude: [
        '**/errors/utils.ts',
        '**/dist/**',
        '**/*.test.ts',
        '**/_test/**',
      ],
    },
    environment: 'node',
    testTimeout: 10_000,
  },
})
