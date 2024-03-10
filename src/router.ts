import { Router } from 'express'
import { body, validationResult } from 'express-validator';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { handleInputErrors } from './modules/middleware';
const router = Router();
/**
 * Product
 */
// router.get('/product', getProducts)
// router.get('/product/:id', getProduct)
// router.post('/product', body('name').isString(), handleInputErrors, createProduct)
// router.put('/product/:id', handleInputErrors, updateProduct)
// router.delete('/product/:id', handleInputErrors, deleteProduct)
router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.post('/product', body('name').trim().notEmpty().isString(), (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        res.send(`Product with name ${req.body.name} created. Hopefully!`)
    }
    else {
        res.status(400)
        res.send({ errors: result.array() })
    }
    next()
},
    createProduct)
router.put('/product/:id', body('name').trim().notEmpty().isString(), (req: any, res: any, next: any) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        res.send(`Product id: ${req.params.id} validated!`)
    }
    else {
        res.status(400)
        res.send({ errors: result.array() })
    }
    next()
},
    updateProduct)
router.delete('/product/:id', deleteProduct)
/**
 * Update
 */
router.get('/update', () => { })
router.post('/update', () => { })
router.get('/update/:id', () => { })
router.put('/update/:id', () => { })
router.delete('/update/:id', () => { })

/**
 * UpdatePoint
 */

router.get('/updatepoint', () => { })
router.post('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id', () => { })
router.delete('/updatepoint/:id', () => { })

export default router;