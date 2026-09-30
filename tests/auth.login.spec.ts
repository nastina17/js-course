import { test, expect } from '@playwright/test';
import { apiBaseURL, userAuthJsonPath } from 'auth-constants';

type LoginResponse = {
    access_token: string;
};

test('Authenticate user', async ({ page, request }) => {
    const response = await request.post(`${apiBaseURL}/users/login`, {
        data: {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD,
        },
    });

    await expect(response).toBeOK();

    const responseBody = await response.json() as LoginResponse;
    const accessToken = responseBody.access_token;

    await page.goto('/');

    await page.evaluate((token) => {
        localStorage.setItem('auth-token', token);
    }, accessToken);

    await page.reload();

    await page.context().storageState({
        path: userAuthJsonPath,
    });
});