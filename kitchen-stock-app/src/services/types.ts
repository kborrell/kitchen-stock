export type Product = {
    name: string,
    id: string,
    category: Category,
    trackOpen: boolean,
    expires: boolean,
    daysToKeep: number,
    stocks: [Stock]
}

export type Category = {
    id: string,
    name: string
}

export type Stock = {
    id: string
    productId: string,
    format: string,
    expireDate?: Date,
    amount: number,
    isOpen: boolean,
    remaining?: string
}