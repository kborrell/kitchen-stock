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
            trackOpen: body.trackOpen,
            expires: body.expires,
            daysToKeep: body.daysToKeep,
            stocks: []
        })

        console.log(product)
        const savedProduct = await product.save()
        await savedProduct.populate('category')
        response.json(savedProduct)
    })

    app.get('/api/stocks', async (_, response) => {
        const stocks = await Stock.find({})
        response.json(stocks)
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
            amount: body.amount,
            expireDate: body.expireDate,
            open: []
        })

        console.log(stock)
        const savedStock = await stock.save()

        product.stocks.push(savedStock.id)
        await product.save()

        response.json(savedStock)
    })

    app.put('/api/stocks/:stockId', async (request, response) => {
        const body = request.body
        console.log(body)

        if (!body) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        const stock = {
            format: body.format,
            amount: body.amount,
            expireDate: body.expireDate,
            open: body.open
        }

        const updatedStock = await Stock.findByIdAndUpdate(request.params.stockId, stock, { new: true })

        if (!updatedStock) {
            return response.status(404).json({
                error: 'stock not found'
            })
        }

        console.log(updatedStock)
        response.json(updatedStock)
    })

    app.delete('/api/stocks/:id', async (request, response) => {
        const stock = await Stock.findById(request.params.id)

        if (!stock) {
            return response.status(404).json({
                error: 'stock not found'
            })
        }

        const product = await Product.findById(stock.productId)

        if (product) {
            product.stocks = product.stocks.filter((stockId) => stockId != stock.id)
            await product.save()
        }

        await stock.deleteOne()
        response.status(204).end()
    })
}