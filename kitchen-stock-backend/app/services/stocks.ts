import Stock from "../models/stock";
import Product from "../models/product";
import mongoose from "mongoose";

type UpdateStockProps = {
    format: string,
    expireDate: string,
    amount: number,
    remaining: string,
    isOpen: boolean,
    productId: string
}

type OpenStockProps = {

}

const getAllStocks = async () => {
    return Stock.find({}).populate("product").exec()
}

const updateStock = async ( id: string, { format, expireDate, amount, remaining, isOpen, productId } : UpdateStockProps ) => {
    if (!id || !format || amount === undefined || isOpen === undefined || !productId) {
        throw new Error('missing data')
    }

    const product = mongoose.Types.ObjectId.isValid(productId) ? await Product.findById(productId) : undefined

    if (!product) {
        throw new Error('product not found')
    }

    const stock = {
        format: format,
        amount: amount,
        expireDate: expireDate,
        remaining: remaining,
        isOpen: isOpen,
        product: product._id
    }

    const updatedStock = mongoose.Types.ObjectId.isValid(id) ? await Stock.findByIdAndUpdate(id, stock, { new: true }) : undefined

    if (!updatedStock) {
        throw new Error('stock not found')
    }

    return updatedStock.populate("product")
}

const deleteStock = async ( id: string ) => {
    const stock = mongoose.Types.ObjectId.isValid(id) ? await Stock.findById(id) : undefined

    if (!stock) {
        throw new Error('stock not found')
    }

    const product = await Product.findById(stock.product)

    if (product) {
        product.stocks = product.stocks.filter((stockId) => stockId != stock.id)
        await product.save()
    }

    return stock.deleteOne().exec()
}

const openStock = async (_: string, {  } : OpenStockProps)=> {

}

export {
    getAllStocks,
    updateStock,
    deleteStock,
    openStock
}