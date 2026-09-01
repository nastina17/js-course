import { test, expect } from '@playwright/test';
import { AccountPage } from 'pages/account.page';
import { userAuthJsonPath } from 'auth-constants';

test.use({
    storageState: userAuthJsonPath,
});

test('Verify login with valid credentials', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await page.goto('/account');

    await expect(accountPage.pageTitle).toBeVisible();
});

