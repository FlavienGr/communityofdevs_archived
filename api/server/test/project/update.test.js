const request = require('supertest');
const path = require('path');
const app = require('../../app');

const pdf = path.join(__dirname, '..', 'fixtures', 'app.pdf');
const updatedPdf = path.join(__dirname, '..', 'fixtures', 'programming.pdf');

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
describe('update Project wihtout a pdf =======>', () => {
  const newProjectUpdated = {
    name: 'project name updated',
    summary: 'I want to try with a new summary'
  };
  it('should failed without the token', async () => {
    const response = await request(app)
      .put(`/api/v1/user/project/${projectId}`)
      .send(newProjectUpdated);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
  it('should failed with a name already taken', async () => {
    const response = await request(app)
      .put(`/api/v1/user/project/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(project);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
  it("should failed if the project doesn't exists", async () => {
    const response = await request(app)
      .put(`/api/v1/user/project/${667889}`)
      .set('Authorization', `Bearer ${token}`)
      .send(project);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
  it('should succeed to update name + summary', async () => {
    const response = await request(app)
      .put(`/api/v1/user/project/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newProjectUpdated);
    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.description.length).toBeGreaterThan(0);
  });
  it('should succeed to update just summary', async () => {
    const response = await request(app)
      .put(`/api/v1/user/project/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        summary: 'I just wanted to change the summary'
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.description.length).toBeGreaterThan(0);
  });
});
describe('update the pdf =======>', () => {
  it('should failed without the token', async () => {
    const response = await request(app)
      .put(`/api/v1/user/project/upload/${projectId}`)
      .attach('description', updatedPdf);
    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
  it("should failed if the project doesn't exists", async () => {
    const response = await request(app)
      .put(`/api/v1/user/project/upload/${667889}`)
      .set('Authorization', `Bearer ${token}`)
      .attach('description', updatedPdf);

    expect(response.body.success).toEqual(false);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
  it('should succeed to update', async () => {
    const response = await request(app)
      .put(`/api/v1/user/project/upload/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .attach('description', updatedPdf);
    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.description.length).toBeGreaterThan(0);
  });
});
