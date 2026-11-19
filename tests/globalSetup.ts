import { execSync } from 'node:child_process'

// Fresh schema for every run; reset creates the test database if missing.
export default function setup() {
    execSync('npx prisma migrate reset --force --skip-seed --skip-generate', { stdio: 'inherit' })
}
