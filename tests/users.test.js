const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose');



beforeAll(async () => {
    await User.updateOne(
        { id: 123123 },
        {
            $setOnInsert: {
                first_name: 'mosh',
                last_name: 'israeli'
            }
        },
        { upsert: true }
    );
});


describe('GET /api/users/:id', () => {
    it('should return user info and total if user exists', async () => {
        const res = await request(app).get('/api/users/123123');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 123123);
        expect(res.body).toHaveProperty('first_name');
        expect(res.body).toHaveProperty('last_name');
        expect(res.body).toHaveProperty('total');
    });

    it('should return 404 if user not found', async () => {
        const res = await request(app).get('/api/users/999999');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
