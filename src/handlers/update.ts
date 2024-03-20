import { PrismaClient } from "@prisma/client"
import { getProducts } from "./product";

// interface Product {
//     id: number,
//     name: string,
//     price: number,
//     quantity: number
// }

const prisma = new PrismaClient();

export const getUpdate = async (req: any, res: any) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id
        }
    })
    if (!update) {
        res.status(404).json({ error: `Update with id: ${req.params.id} not found` })
    }
    else res.json({ data: update })
}

export const getUpdates = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            updates: true
        }
    })
    //res.json({ data: products })
    const updates = products.reduce((allUpdates: any[], product: any) => {
        return [...allUpdates, ...product.updates]
    }, [])
}

export const createUpdate = async (req: any, res: any) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.id
        }
    })
    if (!product) {
        res.status(404).json({ error: `Product with id: ${req.body.id} not found` })
    }
    else {
        const update = await prisma.update.create({
            data: req.body
        })
        res.json({ data: update })
    }
}

export const updateUpdate = async (req: any, res: any) => {
    
}

export const deleteUpdate = async (req: any, res: any) => {}