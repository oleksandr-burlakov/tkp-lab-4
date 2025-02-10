describe('GET /', () => {
    let app, server;

    beforeAll(async () => {
        try {
            const { app: importedApp, server: importedServer } = await import('./index.mjs');
            app = importedApp;
            server = importedServer;
        } catch (error) {
            console.error("Error importing app and server:", error);
        }
    });

    afterAll((done) => {
        if (server) {
            server.close(() => {
                done();
            });
        } else {
            done();
        }
    });

    it('should return 200 OK', async () => {
        const request = (await import('supertest')).default;
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Hello from Docker!');
    });
});