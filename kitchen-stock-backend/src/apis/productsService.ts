import Product from "../models/product";
import {Express} from "express";
import Category from "../models/category";
import Stock from "../models/stock";

export const loadProductsService = (app : Express) => {
    app.get('/api/products', async (_, response) => {
        const products = await Product.find({}).populate('category').populate('stocks')
        response.json(products)
    })

    app.get('/api/products/:id', async (request, response) => {
        const product = await Product.findById(request.params.id).populate('category').populate('stocks')

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
            category: category._id,
            stocks: []
        })

        console.log(product)
        const savedProduct = await product.save()
        await savedProduct.populate('category')
        response.json(savedProduct)
    })

    app.post('/api/products/:id/stocks', async (request, response) => {
        const body = request.body
        console.log(body)

        if (!body) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        const product = await Product.findById(request.params.id)

        if (!product) {
            return response.status(404).json({
                error: 'product not found'
            })
        }

        const stock = new Stock({
            productId: product.id,
            format: body.format,
            expireDate: body.expireDate,
            isOpen: body.isOpen,
            expires: body.expires,
            remaining: body.remaining
        })

        console.log(stock)
        const savedStock = await stock.save()

        product.stocks.push(savedStock.id)
        await product.save()

        response.json(savedStock)
    })
}