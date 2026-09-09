import { Page } from "@playwright/test";
import { AccountPage } from './account.page';
import { CartPage } from './cart.page';
import { HomePage } from "./home.page";
import { LoginPage } from './login.page';
import { ProductPage } from "./product.page";
import { HeaderFragment } from '../fragments/HeaderFragment';
import { CheckoutPage } from './checkout.page';

export class App {
    page: Page;
    accountPage: AccountPage;
    cartPage: CartPage;
    homePage: HomePage;
    loginPage: LoginPage;
    productPage: ProductPage;
    header: HeaderFragment;
    checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.accountPage = new AccountPage(page);
        this.cartPage = new CartPage(page);
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.productPage = new ProductPage(page);
        this.header = new HeaderFragment(page);
        this.page = page;
        this.checkoutPage = new CheckoutPage(page);
    }
}