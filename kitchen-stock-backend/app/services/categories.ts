import Category from "../models/category";

const getAllCategories = async () => {
    return Category.find({})
}

const createCategory = async ( name: string ) => {
    const category = new Category({
        name: name,
    })

    console.log(category)
    return category.save()
}

export {
    getAllCategories,
    createCategory
}