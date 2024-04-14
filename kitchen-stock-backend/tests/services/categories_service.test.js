import Category from "../../app/models/category";
import {createCategory, getAllCategories} from "../../app/services/categories";
import { describe, beforeEach, beforeAll, afterAll, expect, it} from "vitest";
import testDb from "../test_db"
import { populateCategories } from "../utils"

beforeAll(async () => {
    await testDb.connect()
})

beforeEach(async () => {
    await populateCategories()
})

describe('when there are some categories created the service', () => {
    it('should retrieve all categories', async () => {
        const categories = await getAllCategories()
        expect(categories.length).toBe(2)
    });
});

it('should create a new category', async () => {
    const createdCategory = await createCategory("newCategory")
    const categories = await Category.find({}).exec();
    expect(createdCategory.name).toBe("newCategory")
    expect(categories.length).toBe(3)
    expect(categories[2].name).toBe("newCategory")
});

afterAll(async () => {
    await testDb.disconnect()
})