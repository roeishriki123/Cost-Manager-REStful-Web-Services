const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');


describe('GET /api/report', () => {
    it('should return a report object for a valid user', async () => {
        const res = await request(app)
            .get('/api/report?id=123123&year=2025&month=6');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('userid');
        expect(res.body).toHaveProperty('costs');
        expect(Array.isArray(res.body.costs)).toBe(true);
    });

    it('should return 400 if query parameters are missing', async () => {
        const res = await request(app).get('/api/report');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
