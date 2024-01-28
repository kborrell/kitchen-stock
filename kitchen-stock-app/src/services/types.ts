export type Product = {
    name: String,
    id: String,
    category: Category,
    stocks: [Stock]
}

export type Category = {
    id: String,
    name: String
}

export type Stock = {
    productId: String,
    format: String,
    expireDate: Date,
    isOpen: Boolean,
    expires: Boolean,
    remaining: string,
}