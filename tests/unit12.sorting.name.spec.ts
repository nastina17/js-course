import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/home.page';

const sortOptions = [
    {
        name: 'Name (A - Z)',
        sort: (names: string[]) => names.sort(),
    },
    {
        name: 'Name (Z - A)',
        sort: (names: string[]) => names.sort().reverse(),
    },
];

for (const option of sortOptions) {
    test(`Verify user can perform sorting by ${option.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await page.goto('/');

        await homePage.sortDropdown.selectOption({ label: option.name });

        await expect(async () => {
            const actualNames = await homePage.getProductNames();

            const expectedNames = [...actualNames];

            option.sort(expectedNames);

            expect(actualNames).toEqual(expectedNames);
        }).toPass();
    });
}
