import { type Page, type Locator, expect } from '@playwright/test';

interface UserData {
  firstName: string;
  lastName: string;
  zip: string;
}

class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zip: Locator;
  readonly continueButton: Locator;
  readonly inputFields: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.zip = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByText('Continue', { exact: true });
    this.inputFields = page.getByRole('textbox');
  }

  async fillFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastName.fill(lastName);
  }

  async fillZip(zip: string) {
    await this.zip.fill(zip);
  }

  async fillInformationAndContinue(userData: UserData) {
    let { firstName, lastName, zip } = userData;
    for (const input of await this.inputFields.all()){
      await expect(input).toBeEmpty();
  }
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillZip(zip);
    await this.continueButton.click();
  }
}

export default CheckoutStepOnePage;
