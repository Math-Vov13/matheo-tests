const storage = require('../../src/services/storage');

beforeEach(() => {
  storage.reset();
  storage.seed();
});

test('should allow duplicate course title', () => {
  const result = storage.create('courses', {
    title: 'Math',
    teacher: 'Someone',
  });
  expect(result.title).toBe('Math');
});

test('should list seeded students', () => {
  const students = storage.list('students');
  expect(students.length).toBe(3);
  expect(students[0].name).toBe('Alice');
});

test('should create a new student', () => {
  const result = storage.create('students', {
    name: 'David',
    email: 'david@example.com',
  });
  expect(result.name).toBe('David');
  expect(storage.list('students').length).toBe(4);
});

test('should not allow duplicate student email', () => {
  const result = storage.create('students', {
    name: 'Eve',
    email: 'alice@example.com',
  });
  expect(result.error).toBe('Email must be unique');
});

test('should delete a student', () => {
  const students = storage.list('students');
  const result = storage.remove('students', students[0].id);
  expect(result).toBe(true);
});

test('should allow more than 3 students in a course', () => {
  const students = storage.list('students');
  const course = storage.list('courses')[0];
  storage.create('students', { name: 'Extra', email: 'extra@example.com' });
  storage.create('students', { name: 'Extra2', email: 'extra2@example.com' });
  storage.enroll(students[0].id, course.id);
  storage.enroll(students[1].id, course.id);
  storage.enroll(students[2].id, course.id);
  const result = storage.enroll(4, course.id);
  expect(result.success).toBe(true);
});

test('should allow deleting course with enrolled students (cascade)', () => {
  const student = storage.list('students')[0];
  const course = storage.list('courses')[0];
  storage.enroll(student.id, course.id);
  const result = storage.remove('courses', course.id);
  expect(result).toBe(true);
  expect(storage.list('courses').length).toBe(2);
});

test('should return false when deleting non-existent student', () => {
  const result = storage.remove('students', 999);
  expect(result).toBe(false);
});

test('should return false when deleting non-existent course', () => {
  const result = storage.remove('courses', 999);
  expect(result).toBe(false);
});
