const request = require('supertest');
const { app, server } = require('./index'); // Імпортуємо app і server

describe('GET /', () => {
    afterAll((done) => { // Виконуємо після всіх тестів
        server.close(() => { // Закриваємо сервер
            done(); // Повідомляємо Jest про завершення закриття
        });
    });

    it('should return 200 OK', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Hello from Docker!');
    });
});
