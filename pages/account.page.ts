import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "fragments/HeaderFragment";

export class AccountPage {
  page: Page;
  headerFragment: HeaderFragment;
  pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerFragment = new HeaderFragment(page);
    this.pageTitle = page.getByRole("heading", { name: "My account" });
  }
};