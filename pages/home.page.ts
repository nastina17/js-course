import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from 'fragments/HeaderFragment';

export class HomePage {
    page: Page;
    header: HeaderFragment;
    products: Locator;
    combinationPliers: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.combinationPliers = this.page.getByText('Combination Pliers');
        this.products = this.page.getByTestId('product-name');
    }

    async selectProduct(productName: string): Promise<void> {
        await this.products
            .filter({ hasText: productName })
            .click();
    }
}