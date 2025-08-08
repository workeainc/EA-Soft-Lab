// Test setup file
import { jest } from '@jest/globals';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock fetch for API testing
global.fetch = jest.fn();

// Setup test timeout
jest.setTimeout(10000);
