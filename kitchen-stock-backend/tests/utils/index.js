import Category from "../../app/models/category";
import Product from "../../app/models/product";
import Stock from "../../app/models/stock";
import {createProductStock} from "../../app/services/products";

export const populateCategories = async () => {
    const initialCategories = [
        {
            name: "category1"
        },
        {
            name: "category2"
        }
    ]

    await Category.deleteMany({})
    const categoryObjects = initialCategories.map(category => new Category(category))
    const promises = categoryObjects.map(category => category.save())
    await Promise.all(promises)
}

export const populateProducts = async (initialProducts) => {
    const initialCategory = {
        name: "category1"
    }

    await Category.deleteMany({})
    await Product.deleteMany({})
    await Stock.deleteMany({})
    const categoryObject = new Category(initialCategory)
    const category = await categoryObject.save()

    const productObjects = initialProducts.map(product => new Product({category: category._id, ...product}))
    const promises = productObjects.map(product => product.save())

    const products = await Promise.all(promises)
    return products.map(product => product._id)
}

export const populateStocks = async (initialProduct, initialStocks) => {
    await Category.deleteMany({})
    await Product.deleteMany({})
    await Stock.deleteMany({})
    const category = await (new Category({ name: "category" })).save()
    const product = await (new Product({category: category._id, ...initialProduct})).save()

    const stockPromises = initialStocks.map(stock => createProductStock(product.id, stock))
    await Promise.all(stockPromises)

    return product._id
}