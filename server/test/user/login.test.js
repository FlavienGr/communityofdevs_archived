const request = require('supertest');
const app = require('../../app');

const {
  deleteAllinUserTables,
  userOne,
  userLogin
} = require('../fixtures/user');

beforeAll(async () => {
  await deleteAllinUserTables();

  // / create user
  await request(app)
    .post('/api/v1/user/auth/signup')
    .send(userOne);
});
describe('login / logout operation', () => {
  it('should login a user', async done => {
    const response = await request(app)
      .post('/api/v1/user/auth/login')
      .send(userLogin);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.email).toBe(userLogin.email);
    done();
  });
  describe('should send an error', () => {
    it('password too short', async () => {
      const response = await request(app)
        .post('/api/v1/user/auth/login')
        .send({ ...userLogin, password: '1234' });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.errors[0].message).toBe(
        'Password must be at least 8 chars long'
      );
    });
    it('email too short', async () => {
      const response = await request(app)
        .post('/api/v1/user/auth/login')
        .send({ ...userLogin, email: 'testfailed/fake.com' });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.errors[0].message).toBe('Incorrect email format');
    });
  });
});
