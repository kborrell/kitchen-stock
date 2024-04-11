import {Router} from "express";
import stocksController from "../controllers/stocks"

const router = Router()

router.get('/', stocksController.getAllStocks)
router.put('/:id', stocksController.updateStock)
router.delete('/:id', stocksController.deleteStock)
router.post('/:id', stocksController.openStock)

export default router