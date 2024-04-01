import { Request, Response } from "express";
import {
    createProduct,
    createProductStock,
    deleteProduct,
    getAllProducts,
    getProductById,
} from "../services/products";
import {Error} from "mongoose";

type CreateProductBodyParams = {
    name: string,
    categoryId: string,
    trackOpen: boolean,
    expires: boolean,
    daysToKeep: number
}

type UpdateProductBodyParams = {
    name: string,
    categoryId: string,
    trackOpen: boolean,
    expires: boolean,
    daysToKeep: number,
    stocks: []
}

type CreateStockBodyParams = {
    format: string,
    expireDate: string,
    amount: number,
}

export default {
    getAllProducts: async (_ : Request, response : Response) => {
        const products = await getAllProducts()
        response.json(products)
    },
    getProduct: async (request : Request, response : Response) => {
        const product = await getProductById(request.params.id)

        if (product) {
            response.json(product)
        } else {
            response.status(404).end()
        }
    },
    createProduct: async (request: Request<unknown, unknown, CreateProductBodyParams>, response : Response) => {
        const body = request.body
        console.log(body)

        if (!body || !body.categoryId) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        try {
            const savedProduct = await createProduct(body)
            response.json(savedProduct)
        } catch (error) {
            const errorResponse = response.status(404)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            return errorResponse
        }
    },
    updateProduct: async (request : Request<unknown, unknown, UpdateProductBodyParams>, response : Response) => {
        const body = request.body
        console.log(body)

        if (!body) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        try {
            //const updatedProduct = await updateProduct(body)
            response.status(200).end()
        } catch (error) {
            const errorResponse = response.status(404)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            return errorResponse
        }
    },
    deleteProduct: async (request: Request, response: Response) => {
        try {
            await deleteProduct(request.params.id)
            response.status(204).end()
        } catch (error) {
            const errorResponse = response.status(404)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            return errorResponse
        }
    },
    createProductStock: async (request : Request<{ id: string }, unknown, CreateStockBodyParams>, response : Response) => {
        const body = request.body
        console.log(body)

        if (!body) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        try {
            const savedStock = await createProductStock(request.params.id, request.body)
            response.json(savedStock)
        } catch (error) {
            const errorResponse = response.status(404)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            return errorResponse
        }
    }
}