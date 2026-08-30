import { test, expect } from '@playwright/test';
import { AccountPage } from 'pages/account.page';

test.use({
    storageState: 'playwright/.auth/user.json',
});

test('Verify login with valid credentials', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await page.goto('/account');

    await expect(accountPage.pageTitle).toBeVisible();
});

