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
import Stock from "../../app/models/stock";

const initialCategory = {
    name: "category1"
}

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

describe('when there are some products created', () => {
    beforeEach(async () => {
        await Category.deleteMany({})
        await Product.deleteMany({})
        await Stock.deleteMany({})
        const categoryObject = new Category(initialCategory)
        const category = await categoryObject.save()

        const productObjects = initialProducts.map(product => new Product({category: category._id, ...product}))
        const promises = productObjects.map(product => product.save())

        initialIds = productObjects.map(product => product._id)
        await Promise.all(promises)
    })

    it('should retrieve all products', async () => {
        const products = await getAllProducts()
        expect(products.length).toBe(2)
    });

    it('first product has correct data', async () => {
        const products = await getAllProducts()
        expect(products[0].name).toBe("product1")
    });

    it('get product by id has correct data', async () => {
        const allProducts = await getAllProducts()
        const product= await getProductById(initialIds[0])
        expect(product.name).toBe("product1")
    });

    it('create a product adds it', async () => {
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

    it('delete a product removes it', async () => {
        await deleteProduct(initialIds[0])
        const products = await Product.find({}).exec()
        expect(products.length).toBe(1)
        expect(products.find(product => product._id.equals(initialIds[0]))).toBeUndefined()
    })

    it('create a stock for a product adds it', async () => {
        await createProductStock(initialIds[0], {
            format: "units",
            amount: 1,
            expireDate: "1970-01-01T00:00:00.000Z"
        })
        const product = await Product.findById(initialIds[0])
        expect(product.stocks.length).toBe(1)
    })
});

afterAll(async () => {
    await testDb.disconnect()
})