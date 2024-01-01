import Product from "../models/product";
import {Express} from "express";
import Category from "../models/category";

export const loadProductsService = (app : Express) => {
    app.get('/api/products', async (_, response) => {
        const products = await Product.find({})
        response.json(products)
    })

    app.get('/api/products/:id', async (request, response) => {
        const product = await Product.findById(request.params.id)

        if (product) {
            response.json(product)
        } else {
            response.status(404).end()
        }
    })

    app.post('/api/products', async (request, response) => {
        const body = request.body
        console.log(body)

        if (!body || !body.categoryId) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        const category = await Category.findById(body.categoryId)

        if (!category) {
            return response.status(404).json({
                error: 'category not found'
            })
        }

        const product = new Product({
            name: body.name,
            format: body.format,
            category: category._id
        })

        console.log(product)
        const savedProduct = await product.save()
        response.json(savedProduct)
    })
}