import Stock from "../models/stock";
import Product from "../models/product";

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
    return Stock.find({})
}

const updateStock = async ( id: string, { format, amount, expireDate, open } : UpdateStockProps ) => {
    const stock = {
        format: format,
        amount: amount,
        expireDate: expireDate,
        open: open
    }

    const updatedStock = await Stock.findByIdAndUpdate(id, stock, { new: true })

    if (!updatedStock) {
        throw new Error('stock not found')
    }

    console.log(updatedStock)
    return updatedStock
}

const deleteStock = async ( id: string ) => {
    const stock = await Stock.findById(id)

    if (!stock) {
        throw new Error('stock not found')
    }

    const product = await Product.findById(stock.productId)

    if (product) {
        product.stocks = product.stocks.filter((stockId) => stockId != stock.id)
        await product.save()
    }

    await stock.deleteOne()
}

export {
    getAllStocks,
    updateStock,
    deleteStock
}