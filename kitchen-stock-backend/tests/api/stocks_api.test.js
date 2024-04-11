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
import supertest from "supertest";
import app from "../../app";
import {populateStocks} from "../utils";
import product from "../../app/models/product";

const initialStocks = [
    {
        format: "unit",
        amount: 1,
        expireDate: "1970-01-01T00:00:00.000Z",
        isOpen: false
    },
    {
        format: "unit",
        amount: 5,
        expireDate: "1970-01-01T00:00:00.000Z",
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

const api = supertest(app)

beforeAll(async () => {
    await testDb.connect()
})

beforeEach(async () => {
    productId = await populateStocks(initialProduct, initialStocks)
})

describe('when there are some stocks created', () => {
    it('should retrieve all stocks', async () => {
        const response = await api.get('/api/stocks').expect(200)
        expect(response.body.length).toBe(2)
    });
});

describe('updating a stock', () => {
    it('should succeed with valid data', async () => {
        const stocks = (await api.get('/api/stocks')).body
        await api
            .put(`/api/stocks/${stocks[0].id}`)
            .send({
                format: "updatedFormat",
                amount: 10,
                expireDate: "1970-01-01T00:00:00.000Z",
                isOpen: false,
                productId: productId
            })
            .expect(200)

        const response = await api.get(`/api/products/${productId}`)
        expect(response.body.stocks[0].format).toBe("updatedFormat")
    });

    it('should throw error with invalid stock id', async () => {
        await api
            .put(`/api/stocks/wrongid`)
            .send({
                format: "updatedFormat",
                amount: 10,
                expireDate: "1970-01-01T00:00:00.000Z",
                isOpen: false
            })
            .expect(400)
    });

    it('should throw error with missing data', async () => {
        const stocks = (await api.get('/api/stocks')).body
        await api
            .put(`/api/stocks/${stocks[0].id}`)
            .send({
                format: "updatedFormat",
                expireDate: "1970-01-01T00:00:00.000Z",
            })
            .expect(400)
    });
});

describe('deleting a stock', () => {
    it('should succeed with valid data', async () => {
        const stocks = (await api.get('/api/stocks')).body
        const stockId = stocks[0].id
        await api.delete(`/api/stocks/${stockId}`).expect(204)

        const updatedStocks = (await api.get('/api/stocks')).body
        const updatedProduct = (await api.get(`/api/products/${productId}`)).body
        expect(updatedStocks.length).toBe(1)
        expect(updatedProduct.stocks.length).toBe(1)
        expect(updatedStocks.find(stock => stock.id === stockId)).toBeUndefined()
        expect(updatedProduct.stocks.find(stock => stock.id === stockId)).toBeUndefined()
    });

    it('should throw error with invalid id', async () => {
        await api.delete(`/api/stocks/wrongid`).expect(404)
    });
});

afterAll(async () => {
    await testDb.disconnect()
})