import { test, expect } from '@playwright/test';

test('home → open detail → submit contact', async ({ page }) => {
  const base = process.env.E2E_BASE || 'http://localhost:3000';
  await page.goto(base);
  await expect(page.locator('text=GPU Market')).toBeVisible();
  // if list is empty, just proceed to contact page
  const details = page.getByRole('button', { name: /details/i }).first();
  if (await details.isVisible()) {
    await details.click();
    await expect(page.getByRole('heading')).toBeVisible();
  }
  await page.goto(base + '/contact');
  await page.getByLabel('Your Name').fill('E2E');
  await page.getByLabel('Email').fill('e2e@example.com');
  await page.getByLabel('Message').fill('hello from e2e');
  await page.getByRole('button', { name: /send/i }).click();
});

test('nav series preset updates URL', async ({ page }) => {
  const base = process.env.E2E_BASE || 'http://localhost:3000';
  await page.goto(base);
  await page.getByRole('button', { name: /shop graphics cards/i }).click();
  await page.getByRole('menuitem', { name: /nvidia 40/i }).click();
  await expect(page).toHaveURL(/brand=NVIDIA/);
});
