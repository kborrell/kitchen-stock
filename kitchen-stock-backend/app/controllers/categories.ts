import { Request, Response } from "express";
import {createCategory, getAllCategories} from "../services/categories";

export default {
    getAllCategories: async (_ : Request, response : Response) => {
        const categories = await getAllCategories()
        response.json(categories)
    },
    createCategory: async (request : Request<unknown, unknown, { name: string }>, response : Response) => {
        const body = request.body

        if (!body) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        const savedCategory = await createCategory(request.body.name)
        response.json(savedCategory)
    }
}