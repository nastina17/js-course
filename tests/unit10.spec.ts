import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.getByLabel('Email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

  await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();

  await expect(page.getByRole('menuitem', {name: 'Jane Doe'})).toBeVisible();
});

