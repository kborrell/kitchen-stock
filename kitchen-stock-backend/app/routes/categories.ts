import {Router} from "express";
import categoriesController from "../controllers/categories"

const router = Router()

export default () => {
    router.get('/', categoriesController.getAllCategories)
    router.post('/', categoriesController.createCategory)
}