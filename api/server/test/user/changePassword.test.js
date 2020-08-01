const request = require('supertest');
const app = require('../../app');

const {
  userOne,
  deleteAllinUserTables,
  changePassword
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
describe('change user Password', () => {
  it('FAILED if no token', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/change-password')
      .send(changePassword);
    expect(response.statusCode).toEqual(401);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
  it('FAILED if password confirmation is different', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: 'testPassword',
        password: 'changedPassword',
        passwordConfirmation: 'changedPasswordDifferent'
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.errors[0].message).toEqual(
      'password confirmation field must have the same value as the password field'
    );
  });
  it('FAILED with the wrong old password', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: 'testPasswordFailed',
        password: 'changedPassword',
        passwordConfirmation: 'changedPassword'
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.errors[0].message).toEqual(
      'Authentification failed, try again'
    );
  });
  it('success to change password', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send(changePassword);

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual([]);
  });
  it('should failed to login with ancient password', async done => {
    const response = await request(app)
      .post('/api/v1/user/auth/login')
      .send({ email: 'user-test@fake.com', password: 'testPassword' });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].message).toEqual(
      'Authentification failed, try again'
    );
    done();
  });
  it('should succeed to login with new password', async done => {
    const response = await request(app)
      .post('/api/v1/user/auth/login')
      .send({ email: 'user-test@fake.com', password: changePassword.password });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.email).toEqual(userOne.email);
    done();
  });
});
