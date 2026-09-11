import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { apiBaseURL } from "../auth-constants";

test("Verify 20 products are displayed", async ({ page, app }) => {
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

    await page.goto("/");

    await expect(app.homePage.products).toHaveCount(20);
});