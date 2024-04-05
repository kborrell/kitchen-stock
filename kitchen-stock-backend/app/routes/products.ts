import {Router} from "express";
import productsController from "../controllers/products"

const router = Router()

router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProduct)
router.post('/', productsController.createProduct)
router.put('/:id', productsController.updateProduct)
router.delete('/:id', productsController.deleteProduct)
router.post('/:id/stocks', productsController.createProductStock)

export default router