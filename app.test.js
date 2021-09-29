const supertest = require('supertest');
const app = require('./app');

const api = supertest(app);

test('Health check route returns json', async () => {
  const response = await api
    .get('/health')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body.ping).toEqual('pong');
});

test('Unknown route returns 404', async () => {
  await api.get('/no-such-route').expect(404);
});
