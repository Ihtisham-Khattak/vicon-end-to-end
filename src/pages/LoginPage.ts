import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginToggleLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly accessAccountHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.loginToggleLink = page.locator('a.link:has-text("Log In")');
    this.emailInput = page.locator('#email-login');
    this.passwordInput = page.locator('#password-login');
    this.loginButton = page.locator('[data-test="login-btn"]');
    this.rememberMeCheckbox = page.locator('.check');
    this.forgotPasswordLink = page.locator('a.link:has-text("Recover Password")');
    this.errorMessage = page.locator('.message.error');
    this.accessAccountHeading = page.getByRole('heading', { name: 'Access your account' });
  }

  /**
   * Navigate directly to the login page
   */
  async goto(): Promise<void> {
    await this.navigate('/en/login');
  }

  /**
   * The page defaults to the registration form. Click the Log In link to toggle the login form.
   */
  async switchToLoginForm(): Promise<void> {
    if (await this.loginToggleLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.loginToggleLink.click();
      await this.accessAccountHeading.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  /**
   * Fill email and password using sequential keystrokes so Vue v-model updates reactively
   */
  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.click();
    await this.emailInput.fill('');
    await this.emailInput.pressSequentially(email, { delay: 30 });

    await this.passwordInput.click();
    await this.passwordInput.fill('');
    await this.passwordInput.pressSequentially(password, { delay: 30 });
  }

  /**
   * Submit the login form
   */
  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Complete login sequence
   */
  async login(email: string, password: string): Promise<void> {
    await this.switchToLoginForm();
    await this.fillCredentials(email, password);
    await this.submit();
  }

  /**
   * Check if the login submit button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return this.loginButton.isEnabled();
  }

  /**
   * Get the error message text if visible
   */
  async getErrorMessageText(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.errorMessage.textContent())?.trim() || '';
  }
}
