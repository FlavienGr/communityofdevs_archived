const request = require('supertest');
const app = require('../../app');

const {
  userOne,
  deleteAllinUserTables,
  changeEmail
} = require('../fixtures/user');

let token;
beforeAll(async () => {
  await deleteAllinUserTables();

  // / create user
  const response = await request(app)
    .post('/api/v1/user/auth/signup')
    .send(userOne);

  token = response.body.data.jwt;
});
describe('change user email', () => {
  it('FAILED if no token', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/change-email')
      .send(changeEmail);
    expect(response.statusCode).toEqual(401);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
  it('FAILED if email confirmation is different', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/change-email')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'user-test-changed@fake.com',
        emailConfirmation: 'user-test-different@fake.com',
        password: 'testPassword'
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.errors[0].message).toEqual(
      'email confirmation field must have the same value as the email field'
    );
  });
  it('FAILED with the wrong password', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/change-email')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'user-test-changed@fake.com',
        emailConfirmation: 'user-test-changed@fake.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.errors[0].message).toEqual(
      'Authentification failed, try again'
    );
  });
  it('success to change email', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/change-email')
      .set('Authorization', `Bearer ${token}`)
      .send(changeEmail);

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual([]);
  });
});
