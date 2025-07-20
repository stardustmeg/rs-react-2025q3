import { expect, test } from '@playwright/test';

test.describe('Error Boundary flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking error button triggers error boundary', async ({ page }) => {
    const errorButton = page.getByRole('button', { name: 'Throw an Error' });
    await errorButton.click();

    await expect(page.getByText('Congrats! It was successfully handled')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Error illustration' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Fix it back' })).toBeVisible();
  });

  test('clicking fix button returns from error boundary', async ({ page }) => {
    await page.getByRole('button', { name: 'Throw an Error' }).click();
    await expect(page.getByText('Congrats! It was successfully handled')).toBeVisible();

    const fixButton = page.getByRole('button', { name: 'Fix it back' });
    await fixButton.click();

    await expect(page.getByRole('button', { name: 'Throw an Error' })).toBeVisible();
    await expect(page.getByText('Congrats! It was successfully handled')).toHaveCount(0);
  });
});
