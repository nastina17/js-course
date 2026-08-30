import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
    page: Page;
    homeButton: Locator;
    categoriesButton: Locator;
    contactButton: Locator;
    signInButton: Locator;
    languageButton: Locator;
    cartButton: Locator;
    cartQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeButton = this.page.getByRole('link', { name: 'Home' });
        this.categoriesButton = this.page.getByRole('link', { name: 'Categories' });
        this.contactButton = this.page.getByRole('link', { name: 'Contact' });
        this.signInButton = this.page.getByRole('link', { name: 'Sign in' });
        this.languageButton = this.page.getByRole('button', { name: 'en' });
        this.cartButton = page.getByTestId("nav-cart");
        this.cartQuantity = page.getByTestId("cart-quantity");
    }
}