import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from '../fragments/HeaderFragment';

export class CheckoutPage{
    page: Page;
    header: HeaderFragment;
    loggedInUserInfo: Locator;
    country: Locator;
    postalCode: Locator;
    houseNumber: Locator;
    proceedBilling: Locator;
    proceedSignin: Locator;

    paymentMethod: Locator;
    cardNumber: Locator;
    expirationDate: Locator;
    cvv: Locator;
    cardHolder: Locator;
    confirmButton: Locator;
    paymentSuccessMessage: Locator;


    constructor(page: Page){
        this.page = page;
        this.header = new HeaderFragment(this.page);
        this.loggedInUserInfo = page.getByText(/you are already logged in/);
        this.country = page.getByTestId('country');
        this.postalCode = page.getByTestId('postal_code');
        this.houseNumber = page.getByTestId('house_number');
        this.proceedBilling = page.getByTestId('proceed-3');
        this.proceedSignin = page.getByTestId('proceed-2');
        this.paymentMethod = page.getByTestId('payment-method');
        this.cardNumber = page.getByTestId('credit_card_number');
        this.expirationDate = page.getByTestId('expiration_date');
        this.cvv = page.getByTestId('cvv');
        this.cardHolder = page.getByTestId('card_holder_name');
        this.confirmButton = page.getByTestId('finish');
        this.paymentSuccessMessage = page.getByTestId('payment-success-message');
    }

}