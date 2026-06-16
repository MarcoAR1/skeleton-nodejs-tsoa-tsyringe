import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['reflect-metadata'],
    include: ['src/tests/**/*.test.ts'],
    exclude: ['node_modules', 'dist', 'coverage'],
    // mongodb-memory-server may download a MongoDB binary on first run.
    hookTimeout: 120000,
    testTimeout: 30000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: ['node_modules', 'dist', 'src/tests/**', '**/*.test.ts', 'src/infrastructure/routes/**']
    }
  }
})
