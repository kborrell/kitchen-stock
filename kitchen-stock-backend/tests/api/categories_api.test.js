import { describe, beforeEach, beforeAll, afterAll, expect, it} from "vitest";
import testDb from "../test_db"
import supertest from "supertest"
import app from "../../app";
import {populateCategories} from "../utils";

const api = supertest(app)

beforeAll(async () => {
    await testDb.connect()
})

beforeEach(async () => {
    await populateCategories()
})

describe('when there are some categories created the api', () => {
    it('should retrieve all categories', async () => {
        const response = await api.get('/api/categories').expect(200)
        expect(response.body.length).toBe(2)
    });

    it('should have correct data on first category', async () => {
        const response = await api.get('/api/categories').expect(200)
        expect(response.body[0].name).toBe("category1")
    });
});

describe('creating a new category', () => {
    it('should fail without body', async () => {
        await api
            .post('/api/categories')
            .send()
            .expect(400)
    });

    it('should succeed with valid data', async () => {
        await api
            .post('/api/categories')
            .send({ name: "newCategory" })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/categories')
        const content = response.body.map(r => r.content)

        expect(response.body.length).toBe(3)
        expect(response.body[2].name).toBe("newCategory")
    });
})

afterAll(async () => {
    await testDb.disconnect()
})