import Product from "../models/product";
import Category from "../models/category";
import Stock from "../models/stock";

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
    return Product.findById(id).populate('category').populate('stocks').exec();
}

const createProduct = async ( { categoryId, name, trackOpen, expires, daysToKeep } : CreateProductProps ) => {
    const category = await Category.findById(categoryId)

    if (!category) {
        throw new Error("category not found")
    }

    const product = new Product({
        name: name,
        category: category._id,
        trackOpen: trackOpen,
        expires: expires,
        daysToKeep: daysToKeep,
        stocks: []
    })

    console.log(product)
    const savedProduct = await product.save()
    return  savedProduct.populate('category')
}

const updateProduct = async ( { categoryId, name, trackOpen, expires, daysToKeep, stocks } : UpdateProductProps ) => {
    const category = await Category.findById(categoryId)

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
    const product = await Product.findById(id)

    if (!product) {
        throw new Error("product not found")
    }

    for (const stockId of product.stocks) {
        await Stock.findByIdAndDelete(stockId)
    }

    await product.deleteOne()
}

const createProductStock = async ( productId: string, { format, amount, expireDate } : CreateStockProps ) => {
    const product = await Product.findById(productId)

    if (!product) {
        throw new Error("product not found")
    }

    const stock = new Stock({
        productId: product._id,
        format: format,
        amount: amount,
        expireDate: expireDate,
        open: []
    })

    console.log(stock)
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