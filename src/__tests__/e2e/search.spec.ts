import { expect, test } from '@playwright/test';

test.describe('Search functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('shows results for valid character', async ({ page }) => {
    await page.goto('/');

    const input = page.getByPlaceholder('Search characters...');
    const button = page.getByRole('button', { exact: true, name: 'Search' });

    await input.fill('Rick');
    await button.click();

    await expect(page.getByTestId('loader-spinner')).toBeVisible();
    await expect(page.getByTestId('loader-spinner')).toHaveCount(0);

    const cards = page.locator('[data-testid="character-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    const firstCard = cards.first();
    await expect(firstCard).toContainText(/rick/i);
  });

  test('shows no results message for unknown character', async ({ page }) => {
    await page.goto('/');

    const input = page.getByPlaceholder('Search characters...');
    const button = page.getByRole('button', { exact: true, name: 'Search' });

    await input.fill('ThisCharacterDoesNotExist123');
    await button.click();

    await expect(page.getByText(/Nothing was found/i)).toBeVisible();
  });

  test('can clear input and trigger search', async ({ page }) => {
    await page.goto('/');

    const input = page.getByPlaceholder('Search characters...');
    const searchButton = page.getByRole('button', { exact: true, name: 'Search' });

    await input.fill('Morty');

    const clearButton = page.getByRole('button', { name: 'Clear search' });
    await expect(clearButton).toBeVisible();

    await clearButton.click();
    await expect(input).toHaveValue('');

    await input.fill('Rick');
    await searchButton.click();

    await expect(page.getByTestId('loader-spinner')).toBeVisible();
    await expect(page.getByTestId('loader-spinner')).toHaveCount(0);

    const cards = page.locator('[data-testid="character-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
