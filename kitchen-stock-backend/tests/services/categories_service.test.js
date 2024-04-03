import Category from "../../app/models/category";
import {createCategory, getAllCategories} from "../../app/services/categories";
import { describe, beforeEach, beforeAll, afterAll, expect, it} from "vitest";
import testDb from "../test_db"

const initialCategories = [
    {
        name: "category1"
    },
    {
        name: "category2"
    }
]

beforeAll(async () => {
    await testDb.connect()
})

describe('when there are some categories created', () => {
    beforeEach(async () => {
        await Category.deleteMany({})
        const categoryObjects = initialCategories.map(category => new Category(category))
        const promises = categoryObjects.map(category => category.save())
        await Promise.all(promises)
    })

    it('should retrieve all categories', async () => {
        const categories = await getAllCategories()
        expect(categories.length).toBe(2)
    });

    it('first note has correct data', async () => {
        const categories = await getAllCategories()
        expect(categories[0].name).toBe("category1")
    });

    it('create a note adds it', async () => {
        const createdCategory = await createCategory("newCategory")
        const categories = await Category.find({}).exec();
        expect(createdCategory.name).toBe("newCategory")
        expect(categories.length).toBe(3)
        expect(categories[2].name).toBe("newCategory")
    });
});

afterAll(async () => {
    await testDb.disconnect()
})