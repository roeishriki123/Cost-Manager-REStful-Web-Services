const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');


describe('GET /api/about', () => {
    it('should return an array of team members with first and last names', async () => {
        const res = await request(app).get('/api/about');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty('first_name');
        expect(res.body[0]).toHaveProperty('last_name');
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
