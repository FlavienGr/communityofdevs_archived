const request = require('supertest');
const app = require('../../app');

const { userOne, deleteAllinUserTables } = require('../fixtures/user');

let token;
beforeAll(async () => {
  await deleteAllinUserTables();
  // / create user
  const response = await request(app)
    .post('/api/v1/user/auth/signup')
    .send(userOne);

  token = response.body.data.jwt;
});
describe('delete a user', () => {
  it('should failed to delete a user without token', async () => {
    const response = await request(app).delete('/api/v1/user');

    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });

  it('should succeed', async () => {
    const response = await request(app)
      .delete('/api/v1/user')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data).toMatchObject({});
  });
});
