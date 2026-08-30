import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from 'fragments/HeaderFragment';
export class HomePage {
    page: Page;
    header: HeaderFragment;
    products: Locator;
    sortDropdown: Locator;
    productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.products = page.getByTestId('product-name');
        this.sortDropdown = page.locator('select');
        this.productPrices = page.getByTestId('product-price');
    }

    async selectProduct(productName: string): Promise<void> {
        await this.products
            .filter({ hasText: productName })
            .click();
    }

    async getProductNames(): Promise<string[]> {
        return await this.products.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allTextContents();

        return prices.map(price => Number(price.replace('$', '')));
    }

    async selectSubcategory(subcategory: string): Promise<void> {
        await this.page.getByLabel(subcategory).check();
    }
}