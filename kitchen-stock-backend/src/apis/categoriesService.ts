import {Express} from "express";
import Category from "../models/category";

export const loadCategoriesService = (app : Express) => {
    app.get('/api/categories', async (_, response) => {
        const categories = await Category.find({})
        response.json(categories)
    })

    app.post('/api/categories', async (request, response) => {
        const body = request.body
        console.log(body)

        if (!body) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        const category = new Category({
            name: body.name,
        })

        console.log(category)
        category.save().then(savedCategory => {
            response.json(savedCategory)
        })
    })
}