const request = require('supertest');
const app = require('../../app');

const {
  userOne,
  userUpdate,
  deleteAllinUserTables
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
describe('update infos user', () => {
  it('should failed to update a user without token', async () => {
    const response = await request(app)
      .put('/api/v1/user')
      .send(userUpdate);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
  it('should failed to update wrong field', async () => {
    const response = await request(app)
      .put('/api/v1/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        immatriculation: 'user-test-dou',
        wrong: 'field',
        name: 'user-test',
        city: 'Paris',
        state: 'Paris',
        country: 'France',
        zipcode: '75001'
      });

    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual('Data not allowed');
  });
  it('should update a user ', async () => {
    const response = await request(app)
      .put('/api/v1/user')
      .set('Authorization', `Bearer ${token}`)
      .send(userUpdate);

    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.name).toEqual(userUpdate.name);
    expect(response.body.data.city).toEqual(userUpdate.city);
  });
});
