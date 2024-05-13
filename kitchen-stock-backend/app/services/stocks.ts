import Stock from "../models/stock";
import Product from "../models/product";
import mongoose from "mongoose";
import {getEntityById, validateObjectId} from "./mongoUtils";

type UpdateStockProps = {
    format: string,
    expireDate: string,
    amount: number,
    remaining: string,
    isOpen: boolean,
    productId: string
}

type CreateStockProps = {
    format: string,
    expireDate?: string,
    amount: number,
    remaining?: string,
    isOpen?: boolean
}

const getAllStocks = async () => {
    return Stock.find({}).exec()
}

const createStock = async (productId: string, { format, expireDate, amount, remaining, isOpen } : CreateStockProps) => {
    if (!productId || !format ||  amount === undefined) {
        throw new Error('missing data')
    }

    const product = await getEntityById(productId, Product)

    const stock = new Stock({
        productId: product._id,
        format: format,
        amount: amount,
        expireDate: expireDate,
        isOpen: isOpen === undefined ? false : isOpen,
        remaining: remaining
    })

    product.stocks.push(stock._id)
    await product.save()

    return stock.save()
}

const updateStock = async ( id: string, { format, expireDate, amount, remaining, isOpen, productId } : UpdateStockProps ) => {
    if (!id || !format || amount === undefined || isOpen === undefined || !productId) {
        throw new Error('missing data')
    }

    const product = await getEntityById(productId, Product)

    const stock = {
        format: format,
        amount: amount,
        expireDate: expireDate,
        remaining: remaining,
        isOpen: isOpen,
        productId: product._id
    }

    if (validateObjectId(id)) {
        const updatedStock= await Stock.findByIdAndUpdate(id, stock, { new: true })

        if (!updatedStock) {
            throw new Error('stock not found')
        }

        return updatedStock
    }
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

const openStock = async (id: string, expireDate: string)=> {
    const stock = await getEntityById(id, Stock)

    if (stock.amount > 0) {
        const newStock = await createStock(stock.productId, {
            format: stock.format,
            expireDate: expireDate,
            amount: 1,
            isOpen: true
        })

        const product = await getEntityById(stock.productId, Product)

        if (stock.amount == 1) {
            product.stocks = product.stocks.filter((x : any) => x._id != stock._id)
            await stock.deleteOne()
        } else {
            stock.amount = stock.amount - 1
            await stock.save()
        }

        await product.save()

        return newStock
    } else {
        throw new Error("not enough stock")
    }
    // Create new stock with the info
    // Add the stock to the product
    // Decrease the amount of the stock
    // Remove it if amount == 0
}

export {
    getAllStocks,
    createStock,
    updateStock,
    deleteStock,
    openStock
}