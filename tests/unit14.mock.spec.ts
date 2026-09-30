import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { apiBaseURL } from "../auth-constants";

test("Verify 20 products are displayed", {
    tag: "@regression",
}, async ({ page, app }) => {

    await test.step("Mock products API response", async () => {
        await page.route(`${apiBaseURL}/products*`, async (route) => {
            const products = Array.from({ length: 20 }, (_, index) => ({
                id: index + 1,
                name: `Product ${index + 1}`,
            }));

            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: products,
                }),
            });
        });
    });

    await test.step("Open home page", async () => {
        await page.goto("/");
    });

    await test.step("Verify 20 products are displayed", async () => {
        await expect(app.homePage.products).toHaveCount(20);
    });
});