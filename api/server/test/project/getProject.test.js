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
describe('get one project =======>', () => {
  it('failed to retrieve without token', async () => {
    const response = await request(app).get(
      `/api/v1/user/project/${projectId}`
    );

    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
  it("should failed if the project doesn't exists", async () => {
    const response = await request(app)
      .get(`/api/v1/user/project/${667889}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
  it('retrieve successfully', async () => {
    const response = await request(app)
      .get(`/api/v1/user/project/${projectId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.id).toEqual(projectId);
  });
});
describe('get all projects =======>', () => {
  it('failed to retrieve without token', async () => {
    const response = await request(app).get(`/api/v1/user/project`);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0].message).toEqual(
      'Authentication failed, please go back to signug page'
    );
  });
  it('retrieve successfully', async () => {
    const response = await request(app)
      .get(`/api/v1/user/project`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.success).toEqual(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
