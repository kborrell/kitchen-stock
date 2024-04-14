import Product from "../models/product";
import Category from "../models/category";
import Stock from "../models/stock";
import {getEntityById} from "./mongoUtils";

type CreateProductProps = {
    name: string,
    categoryId: string,
    trackOpen: boolean,
    expires: boolean,
    daysToKeep: number
}

type UpdateProductProps = {
    name: string,
    categoryId: string,
    trackOpen: boolean,
    expires: boolean,
    daysToKeep: number,
    stocks: []
}

const getAllProducts = async () => {
    return Product.find({}).populate('category').populate('stocks').exec();
}

const getProductById = async (id : string) => {
    const productQuery = getEntityById(id, Product)

    if (productQuery) {
        return await productQuery.populate('category').populate('stocks').exec()
    }
}

const createProduct = async ( { categoryId, name, trackOpen, expires, daysToKeep } : CreateProductProps ) => {
    if (name === undefined || trackOpen === undefined || expires === undefined || daysToKeep === undefined) {
        throw new Error("missing data")
    }

    const category = await getEntityById(categoryId, Category)

    const product = new Product({
        name: name,
        category: category._id,
        trackOpen: trackOpen,
        expires: expires,
        daysToKeep: daysToKeep,
        stocks: []
    })

    const savedProduct = await product.save()
    return  savedProduct.populate('category')
}

const updateProduct = async ( { categoryId, name, trackOpen, expires, daysToKeep, stocks } : UpdateProductProps ) => {
    const category = await getEntityById(categoryId, Category)

    const product = {
        name: name,
        category: category._id,
        trackOpen: trackOpen,
        expires: expires,
        daysToKeep: daysToKeep,
        stocks: stocks
    }

    return product
}

const deleteProduct = async ( id : string ) => {
    const product = await getEntityById(id, Product)

    for (const stockId of product.stocks) {
        await Stock.findByIdAndDelete(stockId)
    }

    await product.deleteOne()
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}