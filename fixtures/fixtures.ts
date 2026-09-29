import { test as base } from "@playwright/test";
import { App } from "../pages/app";

type Fixtures = {
    app: App;
};

export const test = base.extend<Fixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);

        await use(app);
    },
});