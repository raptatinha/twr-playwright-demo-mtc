import { type Page, type Locator , expect } from '@playwright/test';
import messages from '../../utils/messages';
import HeaderPage from './header-page';

class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly loginButton: Locator;
  readonly password: Locator;
  readonly messagePanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByPlaceholder('Username');
    this.loginButton = page.getByText('Login', { exact: true });
    this.password = page.getByPlaceholder('Password');
    this.messagePanel = page.getByTestId('error');
  }

  async fillEmail(email: string) {
    await this.userName.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async doLogin(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.loginButton.click();
  }

  async checkLoggedIn() {
    const headerPage = new HeaderPage(this.page);
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.page).toHaveTitle(/Swag Labs/);
    await expect(headerPage.menuButton).toBeVisible();
  }

  async checkInvalidCredentials(invalidUserType: string) {
    await expect(this.messagePanel).toHaveText(messages.login[invalidUserType]);
  }
}

export default LoginPage;
