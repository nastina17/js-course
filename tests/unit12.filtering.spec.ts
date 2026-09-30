import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { PowerTools } from "../tests/testData/categories";

test("Verify user can filter products by category", {
    tag: "@regression",
}, async ({ page, app }) => {

    await test.step("Open home page", async () => {
        await page.goto('/');
    });

    await test.step("Filter products by Sander category", async () => {
        await app.homePage.selectSubcategory(PowerTools.Sander);
    });

    await test.step("Verify filtered products", async () => {
        await expect(async () => {
            const productNames = await app.homePage.getProductNames();

            expect(
                productNames.every(name =>
                    name.includes(PowerTools.Sander)
                )
            ).toBeTruthy();
        }).toPass();
    });
});