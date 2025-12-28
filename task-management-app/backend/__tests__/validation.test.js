// Simple validation tests
describe('Data Validation - Simple Tests', () => {
  
  // Test 1: Email format validation
  test('should validate email format', () => {
    const validEmail = 'test@example.com';
    const invalidEmail = 'notanemail';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(validEmail)).toBe(true);
    expect(emailRegex.test(invalidEmail)).toBe(false);
  });

  // Test 2: Password length validation
  test('should validate password length', () => {
    const shortPassword = '123';
    const validPassword = 'password123';
    
    const minLength = 8;
    expect(shortPassword.length >= minLength).toBe(false);
    expect(validPassword.length >= minLength).toBe(true);
  });

  // Test 3: Task title validation
  test('should validate task title is not empty', () => {
    const emptyTitle = '';
    const validTitle = 'Complete homework';
    
    expect(emptyTitle.trim().length > 0).toBe(false);
    expect(validTitle.trim().length > 0).toBe(true);
  });

  // Test 4: Task status validation
  test('should validate task status is valid', () => {
    const validStatuses = ['pending', 'in_progress', 'done'];
    const validStatus = 'pending';
    const invalidStatus = 'completed';
    
    expect(validStatuses.includes(validStatus)).toBe(true);
    expect(validStatuses.includes(invalidStatus)).toBe(false);
  });

  // Test 5: User name validation
  test('should validate user name is not empty', () => {
    const emptyName = '   ';
    const validName = 'John Doe';
    
    expect(emptyName.trim().length > 0).toBe(false);
    expect(validName.trim().length > 0).toBe(true);
  });
});
