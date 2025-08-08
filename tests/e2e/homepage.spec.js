import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if page loads
    await expect(page).toHaveTitle(/EA Soft Lab/);
    
    // Check for main content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Innovative Software Solutions')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('a[href="/services"]')).toBeVisible();
    await expect(page.locator('a[href="/contact"]')).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check meta tags
    await expect(page.locator('meta[name="description"]')).toBeVisible();
    await expect(page.locator('meta[property="og:title"]')).toBeVisible();
    await expect(page.locator('meta[property="og:description"]')).toBeVisible();
  });

  test('should have working contact form link', async ({ page }) => {
    await page.goto('/');
    
    // Click on contact button
    await page.click('text=Start Your Project');
    await expect(page).toHaveURL(/.*contact/);
  });
});
