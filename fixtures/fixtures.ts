import { test as base, expect } from "@playwright/test";
import { App } from "../pages/app";

type Fixtures = {
    app: App;
    loggedInApp: App;
};

export const test = base.extend<Fixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);

        await use(app);
    },

    loggedInApp: async ({ app }, use) => {
        await app.page.goto('/auth/login');

        await app.loginPage.login(
            "customer@practicesoftwaretesting.com",
            "welcome01",
        );

        await expect(app.page).not.toHaveURL(/\/auth\/login/);

        await use(app);
    },
});