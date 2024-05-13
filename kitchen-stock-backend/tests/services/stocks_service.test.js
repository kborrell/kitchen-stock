import { describe, beforeEach, beforeAll, afterAll, expect, it} from "vitest";
import testDb from "../test_db"
import Product from "../../app/models/product";
import Stock from "../../app/models/stock";
import {createStock, deleteStock, getAllStocks, openStock, updateStock} from "../../app/services/stocks";
import {populateStocks} from "../utils";

const initialStocks = [
    {
        format: "unit",
        amount: 1,
        isOpen: false,

    },
    {
        format: "unit",
        amount: 5,
        isOpen: false
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

beforeEach(async () => {
    productId = await populateStocks(initialProduct, initialStocks)
})

describe('when there are some stocks created', () => {
    it('should retrieve all stocks', async () => {
        const stocks = await getAllStocks()
        expect(stocks.length).toBe(2)
    });
});

describe('updating a stock', () => {
    it('should succeed with valid data', async () => {
        const stocks = await Stock.find({})
        await updateStock(stocks[0]._id, {
            format: "updatedFormat",
            amount: 10,
            isOpen: false,
            productId: productId
        })
        const updatedStock = await Stock.findById(stocks[0]._id)
        expect(updatedStock.format).toBe("updatedFormat")
    });

    it('should throw error with invalid stock id', async () => {
        expect(async () => await updateStock("wrongid", {
            format: "updatedFormat",
            amount: 10,
            expireDate: "1970-01-01T00:00:00.000Z",
            isOpen: false,
            productId: productId
        })).rejects.toThrowError("invalid entity id")
    });

    it('should throw error with missing data', async () => {
        const stocks = await Stock.find({})
        expect(async () => await updateStock(stocks[0]._id, {
            format: "updatedFormat",
            expireDate: "1970-01-01T00:00:00.000Z",
        })).rejects.toThrowError("data")
    });
})

describe("creating a stock for a product", () => {
    it('succeeds with valid data', async () => {
        await createStock(productId, {
            format: "units",
            amount: 1,
            isOpen: false
        })
        const product = await Product.findById(productId)
        expect(product.stocks.length).toBe(3)
    })

    it('throws error with wrong product id', async () => {
        expect(async () => await createStock("wrongid", {
            format: "units",
            amount: 1,
            expireDate: "1970-01-01T00:00:00.000Z",
            isOpen: false
        })).rejects.toThrowError("invalid")
    })

    it('throws error with missing data', async () => {
        expect(async () => await createStock(productId, {
            format: "units",
            expireDate: "1970-01-01T00:00:00.000Z"
        })).rejects.toThrowError("data")
    })
})

describe('opening a stock', () => {
    it('should succeed with valid data', async () => {
        const stocks = await getAllStocks()
        const stockToOpen = stocks.find(x => x.amount === 5)
        await openStock(stockToOpen._id.toString(), "1970-01-01T00:00:00.000Z")

        const updatedProduct = await Product.findById(stockToOpen.productId).populate('stocks')
        expect(updatedProduct.stocks).toHaveLength(3)
        const openedStock = updatedProduct.stocks.find(x => x._id.equals(stockToOpen._id))
        const newStock = updatedProduct.stocks.find(x => x.isOpen)
        expect(openedStock.amount).toBe(4)
        expect(newStock).not.toBeUndefined()
    });

    it('should remove empty stock after valid open', async () => {
        const stocks = await getAllStocks()
        const stockToOpen = stocks.find(x => x.amount === 1)
        await openStock(stockToOpen._id.toString(), "1970-01-01T00:00:00.000Z")

        const updatedProduct = await Product.findById(stockToOpen.productId).populate('stocks')
        expect(updatedProduct.stocks).toHaveLength(2)
        const openedStock = updatedProduct.stocks.find(x => x._id.equals(stockToOpen._id))
        expect(openedStock).toBeUndefined()
        const newStock = updatedProduct.stocks.find(x => x.isOpen)
        expect(newStock).not.toBeUndefined()
    });

    it('should fail with invalid stock id', async () => {
        expect(async () => await openStock("wrongid", "1970-01-01T00:00:00.000Z"))
            .rejects.toThrowError("invalid")
    });
});

describe('deleting a stock', () => {
    it('should succeed with valid data', async () => {
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

    it('should throw error with invalid id', async () => {
        expect(async () => await deleteStock("wrongid")).rejects.toThrowError("stock")
    });
})

afterAll(async () => {
    await testDb.disconnect()
})