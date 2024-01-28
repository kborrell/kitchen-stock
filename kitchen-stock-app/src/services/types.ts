export type Product = {
    name: String,
    id: String,
    category: Category,
    trackOpen: Boolean,
    expires: Boolean,
    daysToKeep: Number,
    stocks: [Stock]
}

export type Category = {
    id: String,
    name: String
}

export type Stock = {
    id: String
    productId: String,
    format: String,
    expireDate: Date,
    amount: Number,
    open: [{
        remaining: String,
        date: Date
    }],
}