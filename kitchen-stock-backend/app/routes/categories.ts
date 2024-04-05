import {Router} from "express";
import categoriesController from "../controllers/categories"

const router = Router()

router.get('/', categoriesController.getAllCategories)
router.post('/', categoriesController.createCategory)

export default router