const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);

// test('Creates and new user successfully', async () => {
//   const response = await api.post('/api/auth/register').send({
//     username: 'admin',
//     email: 'admin@gmail.com',
//     password: 'password123',
//   });
//   console.log('response.body', response.body);
//   expect(response.statusCode).toEqual(201);
//   expect(response.body.username).toEqual('admin');
//   expect(response.body.email).toEqual('admin@gmail.com');
// });

describe('login route works correctly', () => {
  test('with invalid credentials', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({
        email: 'admin@gmail.com',
        password: 'invalidpassword',
      })
      .expect(401);
    expect(response.body).toEqual({ error: 'invalid username or password' });
  });

  test('with valid credentials', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({
        email: 'admin@gmail.com',
        password: 'password123',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toMatchObject({
      email: 'admin@gmail.com',
      username: 'admin',
    });
    expect(response.body).toHaveProperty('token');
  });
});
