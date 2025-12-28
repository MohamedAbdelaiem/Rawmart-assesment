# Simple Testing Guide

This guide explains how to run the simple tests for the Task Management Application.

## What We're Testing

Our tests are simple and straightforward, covering:

1. **Auth Tests** - Basic authentication functionality
2. **Task Tests** - Task creation and management
3. **Validation Tests** - Input validation (email, password, etc.)

## Prerequisites

All dependencies are already installed when you ran `npm install` in the backend folder.

## Running Tests

### Run All Tests

```bash
cd backend
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run Specific Test File

```bash
npm test auth.test.js
npm test tasks.test.js
npm test validation.test.js
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

## Understanding Test Results

When you run tests, you'll see:
- ✓ **Green checkmarks** = Tests passed
- ✗ **Red X's** = Tests failed
- **Number summary** = Total tests run, passed, failed

Example output:
```
 PASS  __tests__/validation.test.js
  Data Validation - Simple Tests
    ✓ should validate email format (2 ms)
    ✓ should validate password length (1 ms)
    ✓ should validate task title is not empty
    ✓ should validate task status is valid (1 ms)
    ✓ should validate user name is not empty

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

## Test Structure

Each test file has a simple structure:

```javascript
describe('What we are testing', () => {
  test('should do something specific', () => {
    // Test code here
    expect(something).toBe(expectedValue);
  });
});
```

## Common Commands

| Command | What it does |
|---------|-------------|
| `npm test` | Run all tests once |
| `npm test -- --watch` | Run tests and watch for changes |
| `npm test -- --coverage` | Run tests and show coverage |
| `npm test auth.test.js` | Run only auth tests |

## Tips

1. **Tests should pass** - All tests should have green checkmarks
2. **Read the output** - If a test fails, read the error message
3. **One thing at a time** - Each test checks one specific thing
4. **Fast feedback** - Tests run quickly so you know immediately if something breaks

## What Each Test File Does

### `auth.test.js`
Tests basic authentication helper functions and mock objects.

### `tasks.test.js`
Tests task-related functionality and data structures.

### `validation.test.js`
Tests input validation rules for emails, passwords, and task data.

### `helpers.js`
Contains reusable test helper functions (not a test file).

## Need Help?

- **All tests passing?** ✅ You're good to go!
- **Tests failing?** Read the error message - it tells you what went wrong
- **Want to add tests?** Follow the same pattern as existing tests

## Quick Checklist

Before submitting your code:
- [ ] Run `npm test` in the backend folder
- [ ] All tests should pass (green checkmarks)
- [ ] No error messages in the output
