import Category from "../models/category";

const getAllCategories = async () => {
    return Category.find({}).exec();
}

const createCategory = async ( name: string ) => {
    const category = new Category({
        name: name,
    })

    console.log(category)
    return await category.save()
}

export {
    getAllCategories,
    createCategory
}