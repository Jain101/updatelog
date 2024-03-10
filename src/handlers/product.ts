import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createProduct = async (req: any, res: any) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      userId: req.user.id
    }
  })
}

export const getProducts = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  })
  res.json({ data: user?.products });
}

export const getProduct = async (req: any, res: any) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id: id,
      userId: req.user.id
    }
  })
  if (!product) {
    res.status(404).json({ error: `Product with id: ${id} not found` });
  }
  else res.json({ data: product });
}

export const updateProduct = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: id,
        userId: req.user.id
      },
      data: {
        name: req.body.name
      }
    })
    res.json({ data: updatedProduct });
  } catch (error) {
    res.status(404).json({ error: `Product with ${id} not found. Update Failed!` });
  }
}

export const deleteProduct = async (req: any, res: any) => {
  const id = req.params.id;
  try{
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
        userId: req.user.id
      }
    })
    res.json({ data: deletedProduct });
  } catch (error) {
    res.status(404).json({ error: `Product with id: ${id} not found. Delection Failed!` });
  }
}
