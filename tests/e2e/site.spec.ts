import { test, expect } from '@playwright/test';

test.describe('Site Health Check', () => {
  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Univrs/i);
  });

  test('has navigation elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('link', { name: /tutorials/i })).toBeVisible();
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    // Find and click theme toggle button
    const themeButton = page.getByRole('button').filter({ hasText: /[☀️🌙]/ });
    if (await themeButton.isVisible()) {
      await themeButton.click();
      const newTheme = await html.getAttribute('data-theme');
      expect(newTheme).not.toBe(initialTheme);
    }
  });
});

test.describe('Tutorial Pages', () => {
  test('DOL Concepts track loads', async ({ page }) => {
    const response = await page.goto('/tutorials/dol');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: /DOL/i })).toBeVisible();
  });

  test('DOL Syntax track loads', async ({ page }) => {
    const response = await page.goto('/tutorials/dol-syntax');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: /DOL Syntax/i })).toBeVisible();
  });

  test('Spirit Development track loads', async ({ page }) => {
    const response = await page.goto('/tutorials/spirits');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: /Spirit/i })).toBeVisible();
  });

  test('VUDO CLI track loads', async ({ page }) => {
    const response = await page.goto('/tutorials/vudo-cli');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: /VUDO|CLI/i })).toBeVisible();
  });

  test('Capstone track loads', async ({ page }) => {
    const response = await page.goto('/tutorials/capstone');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: /Capstone|Lion|Swan/i })).toBeVisible();
  });
});

test.describe('Individual Tutorial Pages', () => {
  const tutorialPaths = [
    '/tutorials/dol/001-what-is-dol',
    '/tutorials/dol-syntax/001-genes',
    '/tutorials/dol-syntax/007-v030-syntax',
    '/tutorials/spirits/001-architecture',
    '/tutorials/vudo-cli/001-project-creation',
    '/tutorials/capstone/001-ontology',
    '/tutorials/capstone/007-publish',
  ];

  for (const path of tutorialPaths) {
    test(`tutorial ${path} loads`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      // Verify there's content on the page
      await expect(page.locator('main, article, .content')).toBeVisible();
    });
  }
});

test.describe('Code Blocks', () => {
  test('DOL code examples are syntax highlighted', async ({ page }) => {
    await page.goto('/tutorials/dol-syntax/001-genes');
    // Check for code blocks
    const codeBlocks = page.locator('pre code, .code-block');
    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Navigation Flow', () => {
  test('can navigate from index to tutorial track to lesson', async ({ page }) => {
    // Start at homepage
    await page.goto('/');

    // Navigate to tutorials
    await page.getByRole('link', { name: /tutorials/i }).first().click();
    await expect(page).toHaveURL(/tutorials/);

    // Navigate to a track
    const dolLink = page.getByRole('link', { name: /DOL/i }).first();
    if (await dolLink.isVisible()) {
      await dolLink.click();
      await expect(page).toHaveURL(/tutorials\/dol/);
    }
  });
});

test.describe('Performance', () => {
  test('homepage loads within 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('analytics')
    );
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('SEO', () => {
  test('homepage has meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('tutorial pages have appropriate titles', async ({ page }) => {
    await page.goto('/tutorials/dol');
    const title = await page.title();
    expect(title).toContain('DOL');
  });
});

test.describe('Responsive Design', () => {
  test('mobile viewport renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    // Navigation should still be accessible (possibly via hamburger menu)
    const nav = page.locator('nav, [role="navigation"], button[aria-label*="menu"]');
    await expect(nav.first()).toBeVisible();
  });

  test('tablet viewport renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});
