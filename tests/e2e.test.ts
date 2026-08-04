import { test, expect } from '@playwright/test';

test.describe('fotisp-edge E2E Verification Suite', () => {
  test('Homepage loads correctly with brand title and hero slider', async ({ page }) => {
    await page.goto('http://127.0.0.1:4321/');
    await expect(page).toHaveTitle(/fotisp/i);
    await expect(page.locator('.hero-slider')).toBeVisible();
    await expect(page.locator('.masthead')).toBeVisible();
  });

  test('Services archive renders all CPT cards', async ({ page }) => {
    await page.goto('http://127.0.0.1:4321/services');
    await expect(page.locator('h1')).toContainText('Our Services');
    const cards = page.locator('.card-service');
    await expect(cards).toHaveCount(6);
  });

  test('Portfolio archive category filter works dynamically', async ({ page }) => {
    await page.goto('http://127.0.0.1:4321/portfolio');
    const filterBtn = page.locator('#portfolio-filter button[data-filter="media"]');
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
      const visibleItems = page.locator('#portfolio-grid [data-category="media"]:visible');
      await expect(visibleItems).toHaveCount(2);
    }
  });

  test('Contact form prevents submission on invalid input', async ({ page }) => {
    await page.goto('http://127.0.0.1:4321/contact');
    await page.click('button[type="submit"]');
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toBeFocused();
  });
});
