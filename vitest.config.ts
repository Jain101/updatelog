import { defineConfig } from 'vitest/config'

const env = {
    DATABASE_URL: process.env.TEST_DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5434/updatelog_test',
    JWT_SECRET: 'test-secret',
}
Object.assign(process.env, env)

export default defineConfig({
    test: {
        env,
        globalSetup: './tests/globalSetup.ts',
        fileParallelism: false,
    },
})
