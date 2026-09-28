import { test, expect } from '@playwright/test';
import { userAuthJsonPath } from '../auth-constants';

test('Authenticate user', async ({ page }) => {
    await page.goto('/auth/login');

    await page
        .getByLabel('Email')
        .fill(process.env.USER_EMAIL!);

    await page
        .getByTestId('password')
        .fill(process.env.USER_PASSWORD!);

    await page
        .getByRole('button', { name: 'Login' })
        .click();

    await expect(page).toHaveURL('/account');

    await page.context().storageState({
        path: userAuthJsonPath,
    });
});

