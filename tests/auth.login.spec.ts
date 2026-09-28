import { test, expect } from '@playwright/test';
import { userAuthJsonPath } from 'auth-constants';

test('Authenticate user', async ({ page }) => {

    await test.step('Open login page', async () => {
        await page.goto('/auth/login');
    });

    await test.step('Login with valid credentials', async () => {
        await page.getByLabel('Email').fill(process.env.USER_EMAIL!);
        await page.getByTestId('password').fill(process.env.USER_PASSWORD!);

        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page).toHaveURL('/account');
    });

    await test.step('Save authentication state', async () => {
        await page.context().storageState({
            path: userAuthJsonPath,
        });
    });
});