import {Request, Response} from "express";
import {deleteStock, getAllStocks, openStock, updateStock} from "../services/stocks";
import {Error} from "mongoose";

type UpdateStockBodyParams = {
    format: string,
    expireDate: string,
    amount: number,
    remaining: string,
    isOpen: boolean,
    productId: string
}

export default {
    getAllStocks: async (_ : Request, response : Response) => {
        const stocks = await getAllStocks()
        response.json(stocks)
    },
    updateStock: async (request : Request<{ id: string }, unknown, UpdateStockBodyParams>, response : Response) => {
        const body = request.body

        try {
            const updatedStock = await updateStock( request.params.id, body)
            response.json(updatedStock)
        } catch (error) {
            const errorResponse = response.status(400)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            errorResponse.end()
        }
    },
    deleteStock: async (request: Request, response: Response) => {
        try {
            await deleteStock( request.params.id)
            response.status(204).end()
        } catch (error) {
            const errorResponse = response.status(404)
            if (error instanceof  Error) errorResponse.json({ error: error.message })
            errorResponse.end()
        }
    },
    openStock: async (request: Request, response: Response) => {
        try {
            const newStock = await openStock(request.params.id, request.body.expireDate)
            response.json(newStock)
        } catch (error) {
            const errorResponse = response.status(400)
            if (error instanceof Error) errorResponse.json({ error: error.message })
            errorResponse.end()
        }
    }
}