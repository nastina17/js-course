import { test, expect } from '@playwright/test';

test('authenticate user', async ({ page }) => {
    await page.goto('/auth/login');

  await page.getByLabel('Email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

    await page.context().storageState({
        path: 'playwright/.auth/user.json',
    });
});