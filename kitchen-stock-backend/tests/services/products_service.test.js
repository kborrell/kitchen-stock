import Category from "../../app/models/category";
import { describe, beforeEach, beforeAll, afterAll, expect, it} from "vitest";
import testDb from "../test_db"
import Product from "../../app/models/product";
import {
    createProduct,
    createProductStock,
    deleteProduct,
    getAllProducts,
    getProductById
} from "../../app/services/products";
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

beforeAll(async () => {
    await testDb.connect()
})

beforeEach(async () => {
    initialIds = await populateProducts(initialProducts)
})

describe('when there are some products created the service', () => {
    it('should retrieve all products', async () => {
        const products = await getAllProducts()
        expect(products.length).toBe(2)
    });

    it('should return the first product with correct data', async () => {
        const products = await getAllProducts()
        expect(products[0].name).toBe("product1")
    });

    it('should return a product by id', async () => {
        const product = await getProductById(initialIds[0])
        expect(product.name).toBe("product1")
    });

    it('should return undefined with an invalid id', async () => {
        const product = await getProductById("wrongid")
        expect(product).toBeUndefined()
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
        })).rejects.toThrowError("category")
    });
});

describe('deleting a product', () => {
    it('with a valid id succeeds', async () => {
        await deleteProduct(initialIds[0])
        const products = await Product.find({}).exec()
        expect(products.length).toBe(1)
        expect(products.find(product => product._id.equals(initialIds[0]))).toBeUndefined()
    })

    it('with a wrong id throws error', async () => {
        expect(async () => await deleteProduct("wrongid")).rejects.toThrowError("product")
    })
})

describe("creating a stock for a product", () => {
    it('succeeds with valid data', async () => {
        await createProductStock(initialIds[0], {
            format: "units",
            amount: 1,
            isOpen: false
        })
        const product = await Product.findById(initialIds[0])
        expect(product.stocks.length).toBe(1)
    })

    it('throws error with wrong product id', async () => {
        expect(async () => await createProductStock("wrongid", {
            format: "units",
            amount: 1,
            expireDate: "1970-01-01T00:00:00.000Z"
        })).rejects.toThrowError("product")
    })

    it('throws error with missing data', async () => {
        expect(async () => await createProductStock(initialIds[0], {
            format: "units",
            expireDate: "1970-01-01T00:00:00.000Z"
        })).rejects.toThrowError("data")
    })
})

afterAll(async () => {
    await testDb.disconnect()
})