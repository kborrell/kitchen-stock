const { beforeEach, it, describe} = require('node:test')
import Category from "../../app/models/category";
import {getAllCategories} from "../../app/services/categories";
import * as assert from "assert";

const initialCategories = [
    {
        name: "category1"
    },
    {
        name: "category2"
    }
]

describe('when there are some categories created', () => {
    beforeEach(async () => {
        await Category.deleteMany({})
        const categoryObjects = initialCategories.map(category => new Category(category))
        const promises = categoryObjects.map(category => category.save())
        await Promise.all(promises)
    })

    it('should retrieve all categories', async () => {
        const categories = await getAllCategories()
        assert.strictEqual(categories.countDocuments(), 2)
    });
});