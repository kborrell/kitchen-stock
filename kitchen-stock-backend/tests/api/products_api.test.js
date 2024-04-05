import Category from "../../app/models/category";
import { describe, beforeEach, beforeAll, afterAll, expect, it} from "vitest";
import testDb from "../test_db"
import supertest from "supertest";
import app from "../../app";
import {populateProducts} from "../utils";

const initialProducts = [
    {
        name: "product1",
        trackOpen: "false",
        expires: "false",
        daysToKeep: "1",
        stocks: []
    },
    {
        name: "product2",
        trackOpen: "false",
        expires: "false",
        daysToKeep: "1",
        stocks: []
    }
]

let initialIds = []

const api = supertest(app)

beforeAll(async () => {
    await testDb.connect()
})

beforeEach(async () => {
    initialIds = await populateProducts(initialProducts)
})

describe('when there are some products created the api', () => {
    it('should retrieve all products', async () => {
        const response = await api.get('/api/products').expect(200)
        expect(response.body.length).toBe(2)
    });

    it('should return the first product with correct data', async () => {
        const response = await api.get('/api/products').expect(200)
        expect(response.body[0].name).toBe("product1")
    });

    it('should return a product by id', async () => {
        const response = await api.get(`/api/products/${initialIds[0]}`).expect(200)
        expect(response.body.name).toBe("product1")
    });

    it('should return error with an invalid id', async () => {
        await api.get(`/api/products/wrongid`).expect(404)
    });
});

describe('creating a new product', () => {
    it('should succeed with valid data', async () => {
        const categories = await Category.find({})

        await api
            .post('/api/products')
            .send({
                name: "newProduct",
                categoryId: categories[0]._id,
                trackOpen: true,
                expires: true,
                daysToKeep: 5
            })
            .expect(200)

        const response = await api.get('/api/products')
        expect(response.body.length).toBe(3)
        expect(response.body[2].name).toBe("newProduct")
    });

    it('should fail with missing data', async () => {
        const categories = await Category.find({})

        await api
            .post('/api/products')
            .send({
                name: "newProduct",
                categoryId: categories[0]._id,
                expires: true,
                daysToKeep: 5
            })
            .expect(400)
    });

    it('should fail with wrong category id', async () => {
        await api
            .post('/api/products')
            .send({
                name: "newProduct",
                categoryId: "wrongid",
                trackOpen: true,
                expires: true,
                daysToKeep: 5
            })
            .expect(400)
    });
});

describe('deleting a product', () => {
    it('with a valid id succeeds', async () => {
        await api.delete(`/api/products/${initialIds[0]}`)
        const response = await api.get('/api/products')
        expect(response.body.length).toBe(1)
        expect(response.body.find(product => product.id === initialIds[0])).toBeUndefined()
    })

    it('with a wrong id throws error', async () => {
        await api.delete(`/api/products/wrongid`).expect(404)
    })
})

describe('creating a stock for a product', () => {
    it('succeeds with valid data', async () => {
        await api
            .post(`/api/products/${initialIds[0]}/stocks`)
            .send({
                format: "units",
                amount: 1,
                expireDate: "1970-01-01T00:00:00.000Z"
            })
            .expect(200)

        const response = await api.get(`/api/products/${initialIds[0]}`)
        expect(response.body
            .stocks.length).toBe(1)
    })

    it('throws error with missing data', async () => {
        await api
            .post(`/api/products/${initialIds[0]}/stocks`)
            .send({
                format: "units",
                expireDate: "1970-01-01T00:00:00.000Z"
            })
            .expect(400)
    })

    it('throws error with wrong product id', async () => {
        await api
            .post(`/api/products/wrongid/stocks`)
            .send({
                format: "units",
                amount: 1,
                expireDate: "1970-01-01T00:00:00.000Z"
            })
            .expect(400)
    })
});

afterAll(async () => {
    await testDb.disconnect()
})