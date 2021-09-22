const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);

const baseUrl = '/api/persons';

let user;
let getPersons;
let samplePerson;

beforeAll(async () => {
  const response = await api
    .post('/api/auth/login')
    .send({ email: 'admin@gmail.com', password: 'password123' });
  user = response.body;
  // token = response.body.token;
  // userId = response.body.id;
  getPersons = async () => {
    const response = await api
      .get(baseUrl)
      .set('Authorization', `Bearer ${user.token}`);
    return response.body;
  };
});

describe('/persons', () => {
  test('GET returns the array of persons', async () => {
    const response = await api
      .get(baseUrl)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const samplePerson = response.body.find((p) => p.checkins.length > 0);
    expect(samplePerson).toHaveProperty('id');
    expect(samplePerson).toHaveProperty('username');
    expect(samplePerson).toHaveProperty('email');
    expect(Array.isArray(samplePerson.checkins)).toBe(true);
    expect(samplePerson.checkins[0]).toHaveProperty('rating');
    expect(samplePerson.checkins[0]).toHaveProperty('review');
    expect(samplePerson.checkins[0]).toHaveProperty('bowl');
  });
});

describe('/persons/:personId', () => {
  beforeEach(async () => {
    const persons = await getPersons();
    samplePerson = persons[0];
  });

  test('GET returns the person object', async () => {
    const response = await api
      .get(`${baseUrl}/${samplePerson.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(samplePerson);
  });

  test('PATCH allows username edit for matching personId', async () => {
    const response = await api
      .patch(`${baseUrl}/${user.id}`)
      .send({
        username: user.username + '123',
        email: user.email,
      })
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.username).toEqual(user.username + '123');
  });

  test('/likes returns an array of checkin IDs', async () => {
    const response = await api
      .get(`${baseUrl}/${user.id}/likes`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
