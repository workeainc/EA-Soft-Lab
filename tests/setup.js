// Test setup file for Local SEO tests
import { jest } from '@jest/globals';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock fetch for API tests
global.fetch = jest.fn();

// Mock environment variables
process.env.NODE_ENV = 'test';

// Setup test timeout
jest.setTimeout(10000);

// Mock Astro components
jest.mock('astro', () => ({
  __esModule: true,
  default: {
    url: {
      href: 'https://easoftlab.com/test'
    }
  }
}));

console.log('✅ Test setup completed successfully!');
