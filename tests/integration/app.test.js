const request = require('supertest');
const app = require('../../src/app');

describe('Student-Course API integration', () => {
  beforeEach(() => {
    require('../../src/services/storage').reset();
    require('../../src/services/storage').seed();
  });

  test('GET /students should return seeded students', async () => {
    const res = await request(app).get('/students');
    expect(res.statusCode).toBe(200);
    expect(res.body.students.length).toBe(3);
    expect(res.body.students[0].name).toBe('Alice');
  });

  test('POST /students should create a new student', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'David', email: 'david@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('David');
  });

  test('POST /students should not allow duplicate email', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Eve', email: 'alice@example.com' });
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /courses/:id should delete a course even if students are enrolled', async () => {
    const courses = await request(app).get('/courses');
    const courseId = courses.body.courses[0].id;
    await request(app).post(`/courses/${courseId}/students/1`);
    const res = await request(app).delete(`/courses/${courseId}`);
    expect(res.statusCode).toBe(204);
  });

  test('POST /students should require name and email', async () => {
    const res = await request(app).post('/students').send({ name: 'Frank' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('name and email required');
  });

  test('PUT /courses/:id should not allow duplicate title', async () => {
    const res = await request(app).put('/courses/1').send({ title: 'Physics' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Course title must be unique');
  });

  test('PUT /courses/:id should return 404 for non-existent course', async () => {
    const res = await request(app).put('/courses/999').send({ title: 'Updated' });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Course not found');
  });

  test('DELETE /courses/:id should delete a course even if students are enrolled', async () => {
    await request(app).post('/courses/1/students/1');
    const res = await request(app).delete('/courses/1');
    expect(res.statusCode).toBe(204);
  });

  test('POST /courses/:courseId/students/:studentId should return error for non-existent student', async () => {
    const res = await request(app).post('/courses/1/students/999');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Student not found');
  });

  test('DELETE /courses/:courseId/students/:studentId should unenroll student', async () => {
    await request(app).post('/courses/1/students/1');
    const res = await request(app).delete('/courses/1/students/1');
    expect(res.statusCode).toBe(204);
  });
});
