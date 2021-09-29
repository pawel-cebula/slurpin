const supertest = require('supertest');
const randomstring = require('randomstring');
const app = require('../../app');
const api = supertest(app);

let randomUsername;
let randomPassword;
let randomWrongPassword;

beforeAll(async () => {
  randomUsername = randomstring.generate(12);
  randomPassword = randomstring.generate(12);
  randomWrongPassword = randomstring.generate(10);
});

test('Registers and new user successfully', async () => {
  const response = await api.post('/api/auth/register').send({
    username: randomUsername,
    email: `${randomUsername}@gmail.com`,
    password: randomPassword,
  });
  expect(response.statusCode).toEqual(201);
  expect(response.body.username).toEqual(randomUsername);
  expect(response.body.email).toEqual(`${randomUsername}@gmail.com`);
});

describe('login route works correctly', () => {
  test('with invalid credentials', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({
        email: `${randomUsername}@gmail.com`,
        password: randomWrongPassword,
      })
      .expect(401);
    expect(response.body).toEqual({ error: 'invalid username or password' });
  });

  test('with valid credentials', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({
        email: `${randomUsername}@gmail.com`,
        password: randomPassword,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toMatchObject({
      email: `${randomUsername}@gmail.com`,
      username: randomUsername,
    });
    expect(response.body).toHaveProperty('token');
  });
});
