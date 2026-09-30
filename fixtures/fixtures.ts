import { test as base, expect } from "@playwright/test";
import { App } from "../pages/app";
import { apiBaseURL } from "../auth-constants";

type Fixtures = {
    app: App;
    loggedInApp: App;
};

type LoginResponse = {
    access_token: string;
};

export const test = base.extend<Fixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);

        await use(app);
    },

    loggedInApp: async ({ page, request }, use) => {
        const response = await request.post(`${apiBaseURL}/users/login`, {
            data: {
                email: process.env.USER_EMAIL!,
                password: process.env.USER_PASSWORD!,
            },
        });

        await expect(response).toBeOK();

        const responseBody = (await response.json()) as LoginResponse;

        await page.addInitScript((token) => {
            localStorage.setItem("auth-token", token);
        }, responseBody.access_token);

        const app = new App(page);

        await use(app);
    },
});