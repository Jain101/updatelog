import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import app from '../src/server'
import { prisma } from '../src/db'

const signUp = async (username = 'alice', password = 'secret123') => {
    const res = await request(app).post('/user').send({ username, password })
    return res.body.token as string
}

beforeEach(async () => {
    await prisma.$executeRawUnsafe('TRUNCATE "UpdatePoint", "Update", "Product", "User" CASCADE')
})

describe('auth', () => {
    it('signs up and returns a token', async () => {
        expect(await signUp()).toEqual(expect.any(String))
    })

    it('signs in with the right password', async () => {
        await signUp()
        const res = await request(app).post('/signin').send({ username: 'alice', password: 'secret123' })
        expect(res.status).toBe(200)
        expect(res.body.token).toEqual(expect.any(String))
    })

    it('rejects a wrong password', async () => {
        await signUp()
        const res = await request(app).post('/signin').send({ username: 'alice', password: 'nope' })
        expect(res.status).toBe(401)
    })

    it('rejects /api without a token', async () => {
        expect((await request(app).get('/api/product')).status).toBe(401)
    })

    it('rejects /api with a bad token', async () => {
        const res = await request(app).get('/api/product').set('Authorization', 'Bearer not-a-jwt')
        expect(res.status).toBe(401)
    })
})

describe('products', () => {
    it('lists only my products', async () => {
        const token = await signUp()
        await signUp('bob')
        const bob = await prisma.user.findUniqueOrThrow({ where: { username: 'bob' } })
        await prisma.product.create({ data: { name: 'not mine', userId: bob.id } })

        const res = await request(app).get('/api/product').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body.data).toEqual([])
    })

    it("returns 404 for another user's product", async () => {
        const token = await signUp()
        await signUp('bob')
        const bob = await prisma.user.findUniqueOrThrow({ where: { username: 'bob' } })
        const product = await prisma.product.create({ data: { name: 'not mine', userId: bob.id } })

        const res = await request(app).get(`/api/product/${product.id}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(404)
    })

    it('deletes my product', async () => {
        const token = await signUp()
        const alice = await prisma.user.findUniqueOrThrow({ where: { username: 'alice' } })
        const product = await prisma.product.create({ data: { name: 'mine', userId: alice.id } })

        const res = await request(app).delete(`/api/product/${product.id}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(await prisma.product.count()).toBe(0)
    })
})

// Known bugs in the original code, fixed (and turned into real tests) in the next PR.
describe('known bugs', () => {
    it.todo('POST /api/product returns the created product, not a "validated" string')
    it.todo('PUT /api/product/:id does not respond twice')
    it.todo('GET /api/updates responds instead of hanging')
    it.todo("GET /api/update/:id hides other users' updates")
    it.todo("POST /api/update rejects another user's product")
    it.todo('auth middleware does not log tokens or JWT_SECRET')
    it.todo('duplicate username returns 409 instead of crashing')
})
