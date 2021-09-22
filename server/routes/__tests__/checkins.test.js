const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);

const baseUrl = '/api/checkins';

let token;
let userId;
let getCheckins;
let checkins;
let sampleNonUserCheckin;
let sampleUserCheckin;

beforeAll(async () => {
  const response = await api
    .post('/api/auth/login')
    .send({ email: 'admin@gmail.com', password: 'password123' });
  token = response.body.token;
  userId = response.body.id;
  getCheckins = async () => {
    const response = await api
      .get(baseUrl)
      .set('Authorization', `Bearer ${token}`);
    return response.body;
  };
});

describe('/checkins GET', () => {
  test('returns an array of checkins', async () => {
    const response = await api
      .get(baseUrl)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body[0]).toHaveProperty('bowl');
    expect(response.body[0]).toHaveProperty('rating');
    expect(response.body[0]).toHaveProperty('review');
    expect(response.body[0]).toHaveProperty('likes');
    expect(response.body[0]).toHaveProperty('placeId');
    expect(response.body[0]).toHaveProperty('personId');
    expect(
      response.body.find((c) => c.id === 'a3a75c27-705a-4906-ae14-528238ad9ebb')
    ).toBeTruthy();
  });
});

describe('/checkins POST', () => {
  test('works correctly with valid inputs', async () => {
    const newCheckin = {
      bowl: 'Tonkotsu',
      rating: 4,
      review: 'Good stuff - testing',
      placeId: '7181dafc-b2ca-48bf-8d09-a743bd4b2897',
      personId: userId,
    };
    const response = await api
      .post(baseUrl)
      .send(newCheckin)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toMatchObject(newCheckin);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('placeName');
    expect(response.body).toHaveProperty('personUsername');
  });

  describe('does not working with invalid inputs, i.e.', () => {
    test('missing personId', async () => {
      const newCheckin = {
        bowl: 'Tonkotsu',
        rating: 4,
        review: 'Good stuff - testing',
        placeId: '7181dafc-b2ca-48bf-8d09-a743bd4b2897',
      };
      const response = await api
        .post(baseUrl)
        .send(newCheckin)
        .set('Authorization', `Bearer ${token}`)
        .expect(409);
      expect(response.body.error).toMatch('constraint violation');
    });

    test('invalid rating', async () => {
      const newCheckin = {
        bowl: 'Tonkotsu',
        rating: 7,
        review: 'Good stuff - testing',
        placeId: '7181dafc-b2ca-48bf-8d09-a743bd4b2897',
        personId: '68f6cfed-9351-4243-a74d-5512bd610447',
      };
      const response = await api
        .post(baseUrl)
        .send(newCheckin)
        .set('Authorization', `Bearer ${token}`)
        .expect(409);
      expect(response.body.error).toMatch('constraint violation');
    });
  });
});

describe('/checkins/:checkinId', () => {
  beforeEach(async () => {
    checkins = await getCheckins();
    sampleUserCheckin = checkins.find((c) => c.personId === userId);
    sampleNonUserCheckin = checkins.find((c) => c.personId !== userId);
  });

  test('GET returns the checkin with valid id', async () => {
    const response = await api
      .get(`${baseUrl}/${sampleNonUserCheckin.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(sampleNonUserCheckin);
  });

  test('GET returns error with malformatted ID', async () => {
    const response = await api
      .get(`${baseUrl}/notarealid123`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('PATCH returns error for non matching personId', async () => {
    const response = await api
      .patch(`${baseUrl}/${sampleNonUserCheckin.id}`)
      .send({
        rating: sampleNonUserCheckin.rating,
        review: sampleNonUserCheckin.review + '123',
        bowl: sampleNonUserCheckin.rating,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
    expect(response.body).toEqual({
      error: 'You cannot modify the checkin of another user',
    });
  });

  test('PATCH works correctly for matching personId', async () => {
    const response = await api
      .patch(`${baseUrl}/${sampleUserCheckin.id}`)
      .send({
        rating: sampleUserCheckin.rating,
        review: sampleUserCheckin.review + '123',
        bowl: sampleUserCheckin.bowl,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.review).toEqual(sampleUserCheckin.review + '123');
    expect(response.body.rating).toEqual(sampleUserCheckin.rating);
    expect(response.body.bowl).toEqual(sampleUserCheckin.bowl);
    expect(response.body.updatedAt).not.toEqual(sampleUserCheckin.updatedAt);
  });

  test('DELETE returns error for non matching personId', async () => {
    const response = await api
      .delete(`${baseUrl}/${sampleNonUserCheckin.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
    expect(response.body).toEqual({
      error: 'You cannot modify the checkin of another user',
    });
  });

  test('DELETE works correctly for matching personId', async () => {
    const response = await api
      .delete(`${baseUrl}/${sampleUserCheckin.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
    const checkinsAfter = await getCheckins();
    expect(checkinsAfter.length).toEqual(checkins.length - 1);
  });
});

describe('/checkins/:checkinId/like', () => {
  beforeEach(async () => {
    checkins = await getCheckins();
    sampleCheckin = checkins.find((c) => c.likes === 0);
  });

  test('PUT adds a like correctly', async () => {
    const response = await api
      .put(`${baseUrl}/${sampleCheckin.id}/like`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const updatedCheckins = await getCheckins();
    const likedSampleCheckin = updatedCheckins.find(
      (c) => c.id === sampleCheckin.id
    );
    expect(likedSampleCheckin.likes).toEqual(sampleCheckin.likes + 1);
  });
});
