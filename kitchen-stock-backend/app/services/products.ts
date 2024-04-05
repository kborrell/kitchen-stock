import Product from "../models/product";
import Category from "../models/category";
import Stock from "../models/stock";
import mongoose from "mongoose";

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

type CreateStockProps = {
    format: string,
    expireDate: string,
    amount: number,
}

const getAllProducts = async () => {
    return Product.find({}).populate('category').populate('stocks').exec();
}

const getProductById = async (id : string) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return Product.findById(id).populate('category').populate('stocks').exec();
    }

    return undefined
}

const createProduct = async ( { categoryId, name, trackOpen, expires, daysToKeep } : CreateProductProps ) => {
    const category = mongoose.Types.ObjectId.isValid(categoryId) ? (await Category.findById(categoryId)) : undefined

    if (!category ) {
        throw new Error("category not found")
    }

    if (name === undefined || trackOpen === undefined || expires === undefined || daysToKeep === undefined) {
        throw new Error("missing data")
    }

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
    const category = mongoose.Types.ObjectId.isValid(categoryId) ? (await Category.findById(categoryId)) : undefined

    if (!category) {
        throw new Error("category not found")
    }

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
    const product = mongoose.Types.ObjectId.isValid(id) ? await Product.findById(id) : undefined

    if (!product) {
        throw new Error("product not found")
    }

    for (const stockId of product.stocks) {
        await Stock.findByIdAndDelete(stockId)
    }

    await product.deleteOne()
}

const createProductStock = async ( productId: string, { format, amount, expireDate } : CreateStockProps ) => {
    const product = mongoose.Types.ObjectId.isValid(productId) ? await Product.findById(productId) : undefined

    if (!product) {
        throw new Error("product not found")
    }

    if (format === undefined || amount === undefined || expireDate === undefined) {
        throw new Error("missing data")
    }

    const stock = new Stock({
        productId: product._id,
        format: format,
        amount: amount,
        expireDate: expireDate,
        open: []
    })

    const savedStock = await stock.save()

    product.stocks.push(savedStock._id)
    return product.save()
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductStock
}