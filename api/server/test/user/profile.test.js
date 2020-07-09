const request = require('supertest');
const app = require('../../app');

const { deleteAllinUserTables, userOne } = require('../fixtures/user');

let token;
beforeAll(async () => {
  await deleteAllinUserTables();

  // / create user
  const response = await request(app)
    .post('/api/v1/user/auth/signup')
    .send(userOne);

  token = response.body.data.jwt;
});
describe('user profile', () => {
  it('should GET the user profile', async () => {
    const response = await request(app)
      .get('/api/v1/user/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.data.email).toEqual(userOne.email);
    expect(response.body.data.city).toEqual(userOne.city);
  });
  it('Cannot GET the user profile without token', async () => {
    const response = await request(app).get('/api/v1/user/profile');

    expect(response.statusCode).toEqual(401);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
});
