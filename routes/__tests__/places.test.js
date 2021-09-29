const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);

const baseUrl = '/api/places';

let token;
let placesLength;
let getPlaces;
let samplePlace;

beforeAll(async () => {
  const response = await api
    .post('/api/auth/login')
    .send({ email: 'admin@gmail.com', password: 'password123' });
  token = response.body.token;
  getPlaces = async () => {
    const response = await api
      .get('/api/places')
      .set('Authorization', `Bearer ${token}`);
    return response.body;
  };
});

test('/places GET returns an array of places', async () => {
  const response = await api
    .get(baseUrl)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body[0]).toHaveProperty('name');
  expect(response.body[0]).toHaveProperty('id');
  expect(response.body[0]).toHaveProperty('createdAt');
  expect(
    response.body.find((p) => p.id === 'c8647c26-0c20-414a-88ca-35906b346585')
  ).toBeTruthy();
});

describe('/places POST', () => {
  beforeEach(async () => {
    const places = await getPlaces();
    placesLength = places.length;
  });

  test('works correctly with valid inputs', async () => {
    const response = await api
      .post(baseUrl)
      .send({
        name: 'Test Place',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveProperty('name', 'Test Place');
    const places = await getPlaces();
    expect(places).toHaveLength(placesLength + 1);
  });

  test('does not work with invalid inputs', async () => {
    const response = await api
      .post(baseUrl)
      .send({ placeName: 'Failed Test Place' })
      .set('Authorization', `Bearer ${token}`)
      .expect(409);
    expect(response.body.error).toMatch('constraint violation');
    const places = await getPlaces();
    expect(places).toHaveLength(placesLength);
  });

  test('does not work with missing inputs', async () => {
    const response = await api
      .post(baseUrl)
      .set('Authorization', `Bearer ${token}`)
      .expect(409);
    expect(response.body.error).toMatch('constraint violation');
    const places = await getPlaces();
    expect(places).toHaveLength(placesLength);
  });
});

describe('/places/:placeId', () => {
  beforeEach(async () => {
    const places = await getPlaces();
    samplePlace = places.find((place) => place.checkins.length > 0);
  });

  test('GET returns the place with valid id', async () => {
    const response = await api
      .get(`${baseUrl}/${samplePlace.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toEqual(samplePlace);
  });

  test('GET returns error with malformatted ID', async () => {
    const response = await api
      .get(`${baseUrl}/abcdef123456`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
    expect(response.body.error).toMatch('malformatted ID');
  });

  test('PUT edits correctly', async () => {
    const response = await api
      .put(`${baseUrl}/${samplePlace.id}`)
      .send({ name: samplePlace.name + '123' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.name).toEqual(samplePlace.name + '123');
    expect(response.body.updatedAt).not.toEqual(samplePlace.updatedAt);
  });

  test('/places/:placeId/checkins GET returns the array of checkins', async () => {
    const response = await api
      .get(`${baseUrl}/${samplePlace.id}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(samplePlace.checkins.length);
    // Doesn't work because json_agg removes TZ info from dates
    // expect(response.body).toEqual(samplePlace.checkins);
  });
});
