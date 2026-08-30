import { Locator, Page } from "@playwright/test";

export class CartPage {
    page: Page;

    cartProducts: Locator;
    productTitle: Locator;
    proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartProducts = page.locator("table tbody tr");
        this.productTitle = page.getByTestId("product-title");
        this.proceedToCheckoutButton = page.getByTestId("proceed-1");
    }
}