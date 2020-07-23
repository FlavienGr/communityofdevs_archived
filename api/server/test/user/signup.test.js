const request = require('supertest');
const app = require('../../app');
const User = require('../../model/User');
const { deleteAllinUserTables, userOne } = require('../fixtures/user');

beforeAll(async () => {
  await deleteAllinUserTables();
});

describe('should signup a user', () => {
  it('create a user', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/signup')
      .send(userOne);

    expect(response.statusCode).toEqual(201);
    const user = await User.findByEmail(userOne.email);
    expect(user.email).toEqual(userOne.email);
  });
});
describe('should failed to create user', () => {
  describe('about password =>', () => {
    it('too short', async () => {
      const response = await request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          ...userOne,
          password: '1234'
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.success).toEqual(false);
      expect(response.body.errors[0].message).toEqual(
        'Password must be at least 8 chars long'
      );
    });
    it('empty', async () => {
      const response = await request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          name: 'usertest',
          email: 'usertest@fake.com'
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.success).toEqual(false);
      expect(response.body.errors[0].message).toEqual(
        'You should add a password'
      );
    });
  });
  it('Incorrect email format', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/signup')
      .send({
        ...userOne,
        email: 'superfailedgmail.com'
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual('Incorrect email format');
  });
  it('create a user with the an email in use', async () => {
    const response = await request(app)
      .post('/api/v1/user/auth/signup')
      .send(userOne);
    expect(response.statusCode).toEqual(400);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, try with another email address'
    );
  });
});
