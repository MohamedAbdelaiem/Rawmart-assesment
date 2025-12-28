// Simple helper functions for testing

/**
 * Creates a mock request object
 */
export const mockRequest = (data = {}) => ({
  body: data.body || {},
  params: data.params || {},
  query: data.query || {},
  user: data.user || null,
  headers: data.headers || {}
});

/**
 * Creates a mock response object
 */
export const mockResponse = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.data = data;
    return res;
  };
  return res;
};

/**
 * Creates a mock next function
 */
export const mockNext = () => jest.fn();

/**
 * Sample test user data
 */
export const sampleUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

/**
 * Sample test task data
 */
export const sampleTask = {
  title: 'Test Task',
  description: 'This is a test task',
  status: 'pending'
};
