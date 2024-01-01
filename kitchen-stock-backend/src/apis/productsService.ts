import Product from "../models/product";
import {Express} from "express";

export const loadProductsService = (app : Express) => {
    app.get('/api/products', (_, response) => {
        Product.find({}).then(products => response.json(products))
    })

    app.get('/api/products/:id', (request, response, next) => {
        Product.findById(request.params.id)
            .then(product => {
                if (product) {
                    response.json(product)
                } else {
                    response.status(404).end()
                }
            })
            .catch(error => next(error))
    })

    app.post('/api/products', (request, response) => {
        const body = request.body
        console.log(body)

        if (!body.name) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        const product = new Product({
            name: body.name
        })

        console.log(product)
        product.save().then(savedProduct => {
            response.json(savedProduct)
        })
    })
}