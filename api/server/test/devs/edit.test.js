const request = require('supertest');
const app = require('../../app');

const {
  deleteAllinUserTables,
  userOne,
  userUpdate
} = require('../fixtures/devs');

let token;
const secondUser = {
  email: 'user-test-second@fake.com',
  login: 'tester-second',
  name: 'user-test-2',
  location: 'paris',
  blog: 'www.letester.faker2'
};
beforeAll(async () => {
  await deleteAllinUserTables();

  // / create user
  const response = await request(app)
    .post('/api/v1/devs/auth/signup')
    .send(userOne);
  token = response.body.data.jwt;

  // / create second user
  await request(app)
    .post('/api/v1/devs/auth/signup')
    .send(secondUser);
});
describe('update infos devs', () => {
  it('should failed to update a dev without token', async () => {
    const response = await request(app)
      .put('/api/v1/devs')
      .send(userUpdate);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
  it('should failed to update with a username already taken', async () => {
    const response = await request(app)
      .put('/api/v1/devs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: secondUser.login
      });

    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual(
      'This username is already taken, please choose another one'
    );
  });
  it('should update a dev ', async () => {
    const response = await request(app)
      .put('/api/v1/devs')
      .set('Authorization', `Bearer ${token}`)
      .send(userUpdate);
    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.name).toEqual(userUpdate.name);
  });
});
