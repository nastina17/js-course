import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from 'fragments/HeaderFragment';

export class ProductPage {
    page: Page;
    header: HeaderFragment;
    productName: Locator;
    productPrice: Locator;
    addToCartButton: Locator;
    addToFavoritesButton: Locator;
    alertMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productName = this.page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('unit-price');
        this.addToCartButton = this.page.getByTestId('add-to-cart')
        this.addToFavoritesButton = this.page.getByTestId('add-to-favorites');
        this.alertMessage = page.getByRole("alert");
    }
}