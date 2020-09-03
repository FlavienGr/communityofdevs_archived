const request = require('supertest');
const app = require('../../app');

const { deleteAllinUserTables, userOne } = require('../fixtures/devs');

let token;
beforeAll(async () => {
  await deleteAllinUserTables();

  // / create user
  const response = await request(app)
    .post('/api/v1/devs/auth/signup')
    .send(userOne);
  token = response.body.data.jwt;
});
describe('devs profile', () => {
  it('should GET the devs profile', async () => {
    const response = await request(app)
      .get('/api/v1/devs/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.data.email).toEqual(userOne.email);
  });
  it('Cannot GET the devs profile without token', async () => {
    const response = await request(app).get('/api/v1/devs/profile');

    expect(response.statusCode).toEqual(401);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
});
