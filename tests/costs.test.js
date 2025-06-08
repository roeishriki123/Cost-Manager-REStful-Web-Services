const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');


describe('POST /api/add', () => {
    it('should create a cost item with valid input', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                description: 'Test item',
                category: 'food',
                userid: 123123,
                sum: 42
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('description', 'Test item');
    });

    it('should return 400 if fields are missing', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({ userid: 123123 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });


    it('should create a food cost item', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                description: 'Test food',
                category: 'food',
                userid: 123123,
                sum: 100
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('category', 'food');
    });

    it('should create a health cost item', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                description: 'Test health',
                category: 'health',
                userid: 123123,
                sum: 100
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('category', 'health');
    });

    it('should create a housing cost item', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                description: 'Test housing',
                category: 'housing',
                userid: 123123,
                sum: 100
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('category', 'housing');
    });

    it('should create a sport cost item', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                description: 'Test sport',
                category: 'sport',
                userid: 123123,
                sum: 100
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('category', 'sport');
    });

    it('should create an education cost item', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                description: 'Test education',
                category: 'education',
                userid: 123123,
                sum: 100
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('category', 'education');
    });


    it('should create a cost item with a user-provided date', async () => {
        const providedDate = '2025-06-01T00:00:00.000Z';

        const res = await request(app)
            .post('/api/add')
            .send({
                description: 'User date education',
                category: 'education',
                userid: 123123,
                sum: 150,
                date: providedDate
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('category', 'education');
        expect(res.body).toHaveProperty('date');

        const actualDate = new Date(res.body.date).toISOString();
        const expectedDate = new Date(providedDate).toISOString();

        expect(actualDate).toBe(expectedDate);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});
