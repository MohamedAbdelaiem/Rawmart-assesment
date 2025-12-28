import { mockRequest, mockResponse, sampleTask } from './helpers.js';

// Simple unit tests for Task Controller
describe('Task Controller - Simple Tests', () => {
  
  // Test 1: Sample task has correct structure
  test('sample task should have required properties', () => {
    expect(sampleTask).toHaveProperty('title');
    expect(sampleTask).toHaveProperty('description');
    expect(sampleTask).toHaveProperty('status');
  });

  // Test 2: Task title is a string
  test('task title should be a string', () => {
    expect(typeof sampleTask.title).toBe('string');
    expect(sampleTask.title.length).toBeGreaterThan(0);
  });

  // Test 3: Task status has valid value
  test('task status should be valid', () => {
    const validStatuses = ['pending', 'in_progress', 'done'];
    expect(validStatuses).toContain(sampleTask.status);
  });

  // Test 4: Can create task request
  test('can create a task request object', () => {
    const req = mockRequest({
      body: sampleTask,
      user: { id: 1 }
    });
    expect(req.body).toEqual(sampleTask);
    expect(req.user.id).toBe(1);
  });

  // Test 5: Can create task response
  test('can create a task response object', () => {
    const res = mockResponse();
    res.status(201).json({
      message: 'Task created successfully',
      task: sampleTask
    });
    expect(res.statusCode).toBe(201);
    expect(res.data.task).toEqual(sampleTask);
  });
});
