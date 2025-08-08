import { jest } from '@jest/globals';

// Mock the AI content engine
jest.mock('../src/lib/aiContentEngine.js', () => ({
  AIContentEngine: jest.fn().mockImplementation(() => ({
    generateContent: jest.fn().mockResolvedValue({
      content: 'Test content',
      metaDescription: 'Test meta description',
      title: 'Test title'
    }),
    generateBlogPost: jest.fn().mockResolvedValue({
      title: 'Test Blog Post',
      content: 'Test blog content',
      metaDescription: 'Test blog meta description'
    })
  }))
}));

describe('AI Content Engine', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should generate content successfully', async () => {
    const { AIContentEngine } = await import('../src/lib/aiContentEngine.js');
    const engine = new AIContentEngine();
    
    const result = await engine.generateContent('blog_post', 'Test Topic', ['test', 'keyword']);
    
    expect(result).toBeDefined();
    expect(result.content).toBe('Test content');
    expect(result.metaDescription).toBe('Test meta description');
  });

  test('should generate blog post with proper structure', async () => {
    const { AIContentEngine } = await import('../src/lib/aiContentEngine.js');
    const engine = new AIContentEngine();
    
    const result = await engine.generateBlogPost('Test Topic', ['test', 'keyword']);
    
    expect(result).toBeDefined();
    expect(result.title).toBe('Test Blog Post');
    expect(result.content).toBe('Test blog content');
  });
});
