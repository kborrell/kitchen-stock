import Category from "../../app/models/category";
import { describe, beforeEach, beforeAll, afterAll, expect, it} from "vitest";
import testDb from "../test_db"
import Product from "../../app/models/product";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById
} from "../../app/services/products";
import {populateProducts} from "../utils";

const initialData = [
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

let initialProducts = []

beforeAll(async () => {
    await testDb.connect()
})

beforeEach(async () => {
    initialProducts = await populateProducts(initialData)
})

describe('when there are some products created the service', () => {
    it('should retrieve all products', async () => {
        const products = await getAllProducts()
        expect(products.length).toBe(2)
    });

    it('should return the first product with correct data', async () => {
        const products = await getAllProducts()
        expect(products[0].name).toBe(initialProducts.find(x => x._id.toString() === products[0]._id.toString()).name)
    });

    it('should return a product by id', async () => {
        const product = await getProductById(initialProducts[0].id)
        expect(product.name).toBe("product1")
    });

    it('should return undefined with an invalid id', async () => {
        expect (async () => await getProductById("wrongid")).rejects.toThrowError("invalid")
    });
});

describe('creating a new product', () => {
    it('should succeed with valid data', async () => {
        const categories = await Category.find({})
        const createdProduct = await createProduct({
            categoryId: categories[0]._id,
            name: "newProduct",
            trackOpen: false,
            expires: false,
            daysToKeep: 1
        })
        const products = await Product.find({}).exec();
        expect(createdProduct.name).toBe("newProduct")
        expect(products.length).toBe(3)
        expect(products[2].name).toBe("newProduct")
    });

    it('should fail with missing data', async () => {
        const categories = await Category.find({})
        expect(async () => await createProduct({
            categoryId: categories[0]._id,
            name: "newProduct",
            expires: false,
            daysToKeep: 1
        })).rejects.toThrowError("data")
    });

    it('should fail with wrong category id', async () => {
        const categories = await Category.find({})
        expect(async () => await createProduct({
            categoryId: "wrongid",
            name: "newProduct",
            trackOpen: false,
            expires: false,
            daysToKeep: 1
        })).rejects.toThrowError("invalid")
    });
});

describe('deleting a product', () => {
    it('with a valid id succeeds', async () => {
        await deleteProduct(initialProducts[0].id)
        const products = await Product.find({}).exec()
        expect(products.length).toBe(1)
        expect(products.find(product => product._id.equals(initialProducts[0].id))).toBeUndefined()
    })

    it('with a wrong id throws error', async () => {
        expect(async () => await deleteProduct("wrongid")).rejects.toThrowError("invalid")
    })
})

afterAll(async () => {
    await testDb.disconnect()
})