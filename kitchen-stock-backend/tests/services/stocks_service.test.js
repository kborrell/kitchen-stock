import Category from "../../app/models/category";
import { describe, beforeEach, beforeAll, afterAll, expect, it} from "vitest";
import testDb from "../test_db"
import Product from "../../app/models/product";
import {
    createProductStock,
    deleteProduct,
} from "../../app/services/products";
import Stock from "../../app/models/stock";
import {deleteStock, getAllStocks, updateStock} from "../../app/services/stocks";

const initialStocks = [
    {
        format: "unit",
        amount: 1,
        expireDate: "1970-01-01T00:00:00.000Z"
    },
    {
        format: "unit",
        amount: 5,
        expireDate: "1970-01-01T00:00:00.000Z"
    }
]

const initialProduct = {
    name: "product1",
    trackOpen: "false",
    expires: "false",
    daysToKeep: "1",
    stocks: []
}

let productId = undefined

beforeAll(async () => {
    await testDb.connect()
})

describe('when there are some stocks created', () => {
    beforeEach(async () => {
        await Category.deleteMany({})
        await Product.deleteMany({})
        await Stock.deleteMany({})
        const category = await (new Category({ name: "category" })).save()
        const product = await (new Product({category: category._id, ...initialProduct})).save()
        productId = product._id

        const stockPromises = initialStocks.map(stock => createProductStock(product.id, stock))
        await Promise.all(stockPromises)
    })

    it('should retrieve all stocks', async () => {
        const stocks = await getAllStocks()
        expect(stocks.length).toBe(2)
    });

    it('should update a stock', async () => {
        const stocks = await Stock.find({})
        await updateStock(stocks[0]._id, {
            format: "updatedFormat",
            amount: 10,
            expireDate: "1970-01-01T00:00:00.000Z",
            open: []
        })
        const updatedStock = await Stock.findById(stocks[0]._id)
        expect(updatedStock.format).toBe("updatedFormat")
    });

    it('should delete a stock', async () => {
        const stocks = await Stock.find({})
        const stockId = stocks[0]._id
        await deleteStock(stocks[0]._id)

        const updatedStocks = await Stock.find({})
        const updatedProduct = await Product.findById(productId)
        expect(updatedStocks.length).toBe(1)
        expect(updatedProduct.stocks.length).toBe(1)
        expect(updatedStocks.find(stock => stock._id.equals(stockId))).toBeUndefined()
        expect(updatedProduct.stocks.find(stock => stock._id.equals(stockId))).toBeUndefined()
    });
});

afterAll(async () => {
    await testDb.disconnect()
})