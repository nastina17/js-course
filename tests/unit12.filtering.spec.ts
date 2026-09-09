import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { PowerTools } from "../tests/testData/categories";

test("Verify user can filter products by category", async ({ page, app }) => {
    await page.goto('/');

    await app.homePage.selectSubcategory(PowerTools.Sander);

    await expect(async () => {
        const productNames = await app.homePage.getProductNames();

       expect(
            productNames.every(name =>
                name.includes(PowerTools.Sander)
            )
        ).toBeTruthy();
    }).toPass();
});