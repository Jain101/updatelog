import { Router } from 'express'
const router = Router();
/**
 * Product
 */
router.get('/product', (req, res) => {
    console.log('Product List in console!')
    res.send('Product List in browser!')
})
router.post('/product', () => { })
router.get('/product/:id', () => { })
router.put('/product/:id', () => { })
router.delete('/product/:id', () => { })
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