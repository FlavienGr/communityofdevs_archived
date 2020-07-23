const request = require('supertest');
const path = require('path');
const app = require('../../app');

const pdf = path.join(__dirname, '..', 'fixtures', 'app.pdf');

const {
  userOne,
  project,
  deleteAllinUserTables,
  deleteAllinProjectTables
} = require('../fixtures/user');

let token;
jest.setTimeout(30000);

beforeAll(async () => {
  await deleteAllinUserTables();
  await deleteAllinProjectTables();
  // / create user
  const response = await request(app)
    .post('/api/v1/user/auth/signup')
    .send(userOne);
  token = response.body.data.jwt;
});
describe('Project =======>', () => {
  it('should failed to create a project without the token', async () => {
    const response = await request(app)
      .post('/api/v1/user/project')
      .field('name', project.name)
      .field('summary', project.summary)
      .attach('description', pdf);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).not.toEqual(0);
  });
  it('should failed to create a project without the name', async () => {
    const response = await request(app)
      .post('/api/v1/user/project')
      .set('Authorization', `Bearer ${token}`)
      .field('summary', project.summary)
      .attach('description', pdf);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).not.toEqual(0);
  });
  it('should failed to create a project without the summary', async () => {
    const response = await request(app)
      .post('/api/v1/user/project')
      .set('Authorization', `Bearer ${token}`)
      .field('name', project.name)
      .attach('description', pdf);
    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).not.toEqual(0);
  });
  it('create a project ', async () => {
    const response = await request(app)
      .post('/api/v1/user/project')
      .set('Authorization', `Bearer ${token}`)
      .field('name', project.name)
      .field('summary', project.summary)
      .attach('description', pdf);
    expect(response.statusCode).toEqual(201);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.description.length).toBeGreaterThan(0);
  });
});
