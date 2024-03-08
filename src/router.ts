import { Router } from 'express'
import { body } from 'express-validator';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { handleInputErrors } from './modules/middleware';
const router = Router();
/**
 * Product
 */
router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.put('/product/:id', handleInputErrors, updateProduct)
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