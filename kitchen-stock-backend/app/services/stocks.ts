import Stock from "../models/stock";
import Product from "../models/product";
import mongoose from "mongoose";

type UpdateStockProps = {
    format: string,
    expireDate: string,
    amount: number,
    expires: boolean,
    remaining: string,
    open: [
        {
            "date": string,
            "remaining": string
        }
    ]
}

const getAllStocks = async () => {
    return Stock.find({}).exec()
}

const updateStock = async ( id: string, { format, amount, expireDate, open } : UpdateStockProps ) => {
    if (!id || !format || amount === undefined || !expireDate || open === undefined) {
        throw new Error('missing data')
    }

    const stock = {
        format: format,
        amount: amount,
        expireDate: expireDate,
        open: open
    }

    const updatedStock = mongoose.Types.ObjectId.isValid(id) ? await Stock.findByIdAndUpdate(id, stock, { new: true }) : undefined

    if (!updatedStock) {
        throw new Error('stock not found')
    }

    return updatedStock
}

const deleteStock = async ( id: string ) => {
    const stock = mongoose.Types.ObjectId.isValid(id) ? await Stock.findById(id) : undefined

    if (!stock) {
        throw new Error('stock not found')
    }

    const product = await Product.findById(stock.productId)

    if (product) {
        product.stocks = product.stocks.filter((stockId) => stockId != stock.id)
        await product.save()
    }

    return stock.deleteOne().exec()
}

export {
    getAllStocks,
    updateStock,
    deleteStock
}