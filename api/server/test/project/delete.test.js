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
let projectId;
jest.setTimeout(30000);
beforeAll(async () => {
  await deleteAllinUserTables();
  await deleteAllinProjectTables();
  // / create user
  const response = await request(app)
    .post('/api/v1/user/auth/signup')
    .send(userOne);
  token = response.body.data.jwt;

  const createdProject = await request(app)
    .post('/api/v1/user/project')
    .set('Authorization', `Bearer ${token}`)
    .field('name', project.name)
    .field('summary', project.summary)
    .attach('description', pdf);
  projectId = createdProject.body.data.id;
});
describe('delete a project =======>', () => {
  it('failed without token', async () => {
    const response = await request(app).delete(
      `/api/v1/user/project/${projectId}`
    );

    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
  it('delete successfully', async () => {
    const response = await request(app)
      .delete(`/api/v1/user/project/${projectId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.success).toEqual(true);
    expect(response.body.data).toEqual({});
  });
});
