import { test as base, expect } from "@playwright/test";
import { App } from "../pages/app";
import { apiBaseURL } from "../auth-constants";
import { userData } from "../tests/testData/credentials";

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

    loggedInApp: async ({ app, request }, use) => {
        const resp = await request.post(`${apiBaseURL}/users/login`, {
            data: {
                email: userData.email,
                password: userData.password,
            },
        });

        await expect(resp).toBeOK();

        const jsonData = await resp.json() as LoginResponse;
        const token = jsonData.access_token;

        await app.page.goto("/");

        await app.page.evaluate((token) => {
            localStorage.setItem("auth-token", token);
        }, token);

        await app.page.reload();

        await use(app);
    },
});