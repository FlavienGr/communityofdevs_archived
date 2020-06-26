const request = require('supertest');
const app = require('../../app');

const {
  deleteAllinUserTables,
  userOne,
  userLogin
} = require('../fixtures/user');

describe('login / logout operation', () => {
  it('should login a user', async done => {
    const response = await request(app)
      .post('/api/v1/user/auth/login')
      .send(userLogin);
    console.log(response.body, 'response');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.email).toBe(userLogin.email);
    done();
  });
});
