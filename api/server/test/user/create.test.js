const request = require('supertest');
const app = require('../../app');

const { userOne, deleteAllinUserTables } = require('../fixtures/user');

beforeAll(async () => {
  await deleteAllinUserTables();
});
describe('create user', () => {
  it('should failed to create a user without the requirements', async () => {
    const user = {
      email: 'user-test@fake.com',
      password: 'testPassword',
      name: 'user-test'
    };
    const response = await request(app)
      .post('/api/v1/user/auth/signup')
      .send(user);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).not.toEqual(false);
  });
  it('create a user ', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/signup')
      .send(userOne);

    expect(response.statusCode).toEqual(201);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.name).toEqual(userOne.name);
  });
});
