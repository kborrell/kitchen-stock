import { Request, Response } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
} from "../services/products";
import {Error} from "mongoose";
import {createStock} from "../services/stocks";

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
       try {
           const product = await getProductById(request.params.id)
            response.json(product)
        } catch (error) {
           const errorResponse = response.status(400)
           if (error instanceof  Error) errorResponse.json({ error: error.message })
           errorResponse.end()
        }
    },
    createProduct: async (request: Request<unknown, unknown, CreateProductBodyParams>, response : Response) => {
        const body = request.body

        try {
            const savedProduct = await createProduct(body)
            response.json(savedProduct)
        } catch (error) {
            const errorResponse = response.status(400)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            errorResponse.end()
        }
    },
    updateProduct: async (request : Request<unknown, unknown, UpdateProductBodyParams>, response : Response) => {
        const body = request.body

        if (!body) {
            return response.status(400).json({
                error: 'content missing'
            })
        }

        try {
            //const updatedProduct = await updateProduct(body)
            response.status(200).end()
        } catch (error) {
            const errorResponse = response.status(400)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            errorResponse.end()
        }
    },
    deleteProduct: async (request: Request, response: Response) => {
        try {
            await deleteProduct(request.params.id)
            response.status(204).end()
        } catch (error) {
            const errorResponse = response.status(404)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            errorResponse.end()
        }
    },
    createProductStock: async (request : Request<{ id: string }, unknown, CreateStockBodyParams>, response : Response) => {
        try {
            const savedStock = await createStock(request.params.id, request.body)
            response.json(savedStock)
        } catch (error) {
            const errorResponse = response.status(400)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            errorResponse.end()
        }
    }
}